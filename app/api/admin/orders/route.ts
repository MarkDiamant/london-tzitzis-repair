import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isAdmin } from '../../../../lib/adminAuth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sessions = await stripe.checkout.sessions.list({ limit: 100 });
  const orders = sessions.data
    .filter((s) => s.payment_status === 'paid')
    .map((s) => ({
      id: s.id,
      created: s.created,
      amount: s.amount_total || 0,
      customerEmail: s.customer_email || s.metadata?.email || '',
      name: s.metadata?.name || 'Customer',
      phone: s.metadata?.phone || '',
      delivery: s.metadata?.delivery || '',
      address: s.metadata?.address || '',
      postcode: s.metadata?.postcode || '',
      quantity: s.metadata?.quantity || '',
      repairType: s.metadata?.repairType || '',
      corners: s.metadata?.corners || '',
      repairNotes: s.metadata?.repairNotes || '',
      preferredTimes: s.metadata?.preferredTimes || '',
      completed: s.metadata?.status === 'completed',
      completedAt: s.metadata?.completedAt || '',
      orderNumber: `LTR-${s.id.slice(-8).toUpperCase()}`,
    }));
  return NextResponse.json({ orders });
}
