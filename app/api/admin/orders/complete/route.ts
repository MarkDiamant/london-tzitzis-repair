import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { isAdmin } from '../../../../../lib/adminAuth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const resend = new Resend(process.env.RESEND_API_KEY || '');
const FROM = 'London Tzitzis Repair <orders@londontzitzisrepair.co.uk>';
const REPLY_TO = 'londontzitzisrepair@gmail.com';
const COLLECTION_ADDRESS = '4 Eastville Avenue, London, NW11 0HD';
const esc = (v: unknown) => String(v ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { sessionId } = await request.json();
  if (!sessionId) return NextResponse.json({ error: 'Missing order id' }, { status: 400 });

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') return NextResponse.json({ error: 'Order is not paid' }, { status: 400 });
  if (session.metadata?.status === 'completed') return NextResponse.json({ ok: true, alreadyCompleted: true });

  const m = session.metadata || {};
  const name = m.name || 'Customer';
  const email = m.email || session.customer_email || '';
  const orderNumber = `LTR-${session.id.slice(-8).toUpperCase()}`;
  const address = `${m.address || ''}${m.postcode ? `, ${m.postcode}` : ''}`.trim().replace(/^,\s*/, '');
  const isDropoff = m.delivery === 'dropoff';
  const completionTitle = isDropoff ? 'Your tallis is ready for collection' : 'Your tzitzis repair is complete';
  const actionBlock = isDropoff
    ? `<p style="font-size:15px;line-height:1.7;color:#374151;">Your order is now ready to collect from:<br><strong>${esc(COLLECTION_ADDRESS)}</strong></p>`
    : `<p style="font-size:15px;line-height:1.7;color:#374151;">Your order has now been completed. We’ll be returning it to:<br><strong>${esc(address || 'the address supplied with your order')}</strong></p>`;

  if (email) {
    const html = `<!doctype html><html><body style="margin:0;background:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#172033;"><table width="100%" cellspacing="0" cellpadding="0" style="padding:28px 12px;"><tr><td align="center"><table width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border-radius:16px;overflow:hidden;"><tr><td style="background:#172033;padding:30px 34px;text-align:center;"><div style="font-family:Georgia,serif;color:#fff;font-size:27px;font-weight:700;">London Tzitzis Repair</div><div style="color:#d7c7a4;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-top:7px;">Professional Tzitzis Repair Service</div></td></tr><tr><td style="padding:32px 34px;"><div style="display:inline-block;background:#eaf7ef;color:#176b3a;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;">✓ ORDER COMPLETED</div><h1 style="font-family:Georgia,serif;margin:18px 0 8px;font-size:28px;color:#172033;">${esc(completionTitle)}</h1><p style="font-size:15px;line-height:1.7;color:#374151;">Hi ${esc(name)},</p>${actionBlock}<p style="font-size:14px;color:#6b7280;">Order number: <strong>${esc(orderNumber)}</strong></p><p style="font-size:13px;color:#6b7280;">Questions? Reply to this email, call <strong>07562 717278</strong>, or email <strong>londontzitzisrepair@gmail.com</strong>.</p></td></tr><tr><td style="background:#f8f6f1;padding:20px 34px;text-align:center;color:#7a7468;font-size:11px;">London Tzitzis Repair<br>${esc(COLLECTION_ADDRESS)}</td></tr></table></td></tr></table></body></html>`;
    const text = isDropoff
      ? `Hi ${name},\n\nYour order ${orderNumber} is now ready for collection from:\n${COLLECTION_ADDRESS}\n\nLondon Tzitzis Repair`
      : `Hi ${name},\n\nYour order ${orderNumber} has now been completed. We’ll be returning it to:\n${address || 'the address supplied with your order'}\n\nLondon Tzitzis Repair`;
    await resend.emails.send({ from: FROM, to: email, replyTo: REPLY_TO, subject: `${completionTitle} - ${orderNumber}`, html, text });
  }

  const completedAt = new Date().toISOString();
  await stripe.checkout.sessions.update(sessionId, { metadata: { ...m, status: 'completed', completedAt } });
  return NextResponse.json({ ok: true, completedAt });
}
