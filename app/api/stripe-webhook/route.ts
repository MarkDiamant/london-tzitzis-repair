import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const resend = new Resend(process.env.RESEND_API_KEY || "");
const FROM = "London Tzitzis Repair <orders@londontzitzisrepair.co.uk>";
const REPLY_TO = "londontzitzisrepair@gmail.com";

const esc = (value: unknown) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || ""); }
  catch { return NextResponse.json({ error: "Invalid Stripe signature" }, { status: 400 }); }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status !== "paid") return NextResponse.json({ received: true });
    const metadata = session.metadata || {};
    const totalPaid = session.amount_total ? (session.amount_total / 100).toFixed(2) : metadata.total || "Unknown";
    const deliveryText = metadata.delivery === "dropoff" ? "Customer drop-off & collection" : metadata.delivery === "nw11" ? "Collection & return - NW11" : "Collection & return - NW4";
    const repairText = metadata.repairType === "full" ? "All 4 corners" : `${metadata.corners || "Unknown"} corner(s)`;
    const addressText = metadata.delivery === "dropoff" ? "Not required - customer is dropping off and collecting" : `${metadata.address || "Not provided"}${metadata.postcode ? `, ${metadata.postcode}` : ""}`;
    const name = metadata.name || "Customer";
    const phone = metadata.phone || "Not provided";
    const email = metadata.email || session.customer_email || "Not provided";
    const quantity = metadata.quantity || "Not provided";
    const repairNotes = metadata.repairNotes || "None provided";
    const preferredTimes = metadata.preferredTimes || "None provided";
    const orderNumber = `LTR-${session.id.slice(-8).toUpperCase()}`;
    const dropoffAddress = "4 Eastville Avenue, London, NW11 0HD";
    const row = (label: string, value: string) => `<tr><td style="padding:10px 0;color:#6b7280;font-size:14px;width:42%;vertical-align:top;">${esc(label)}</td><td style="padding:10px 0;color:#172033;font-size:14px;font-weight:600;vertical-align:top;">${esc(value)}</td></tr>`;
    const adminHtml = `<html><body><h2>London Tzitzis Repair - Paid Order</h2><p><b>Order:</b> ${esc(orderNumber)}</p><p><b>Amount:</b> £${esc(totalPaid)}</p><p><b>Name:</b> ${esc(name)}</p><p><b>Phone:</b> ${esc(phone)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Repair:</b> ${esc(repairText)}</p><p><b>Quantity:</b> ${esc(quantity)}</p><p><b>Handover:</b> ${esc(deliveryText)}</p><p><b>Address:</b> ${esc(addressText)}</p><p><b>Notes:</b> ${esc(repairNotes)}</p><p><b>Preferred times:</b> ${esc(preferredTimes)}</p></body></html>`;
    await resend.emails.send({ from: FROM, to: process.env.ORDER_EMAIL_TO || REPLY_TO, replyTo: REPLY_TO, subject: `PAID ORDER - £${totalPaid} - ${name}`, html: adminHtml });
    if (email !== "Not provided") {
      const nextStep = metadata.delivery === "dropoff"
        ? `<div style="background:#f8f6f1;border:1px solid #eee8dc;border-radius:12px;padding:20px 22px;margin:20px 0;"><div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1.3px;">Your next step</div><h2 style="font-family:Georgia,serif;color:#172033;font-size:20px;margin:7px 0 8px;">Drop off your tallis</h2><p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">Please drop it off at:<br><strong>${esc(dropoffAddress)}</strong><br><br>We’ll contact you when it is ready for collection.</p></div>`
        : `<div style="background:#f8f6f1;border:1px solid #eee8dc;border-radius:12px;padding:20px 22px;margin:20px 0;"><div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1.3px;">Collection details</div><h2 style="font-family:Georgia,serif;color:#172033;font-size:20px;margin:7px 0 8px;">We’ll collect and return your tallis</h2><p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">Collection address:<br><strong>${esc(addressText)}</strong><br><br>We’ll use the details supplied with your order to arrange collection and return.</p></div>`;
      const customerHtml = `<!doctype html><html><body style="margin:0;padding:0;background:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#172033;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f7;padding:28px 12px;"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border-radius:16px;overflow:hidden;"><tr><td style="background:#172033;padding:30px 34px;text-align:center;"><div style="font-family:Georgia,serif;color:#fff;font-size:27px;font-weight:700;">London Tzitzis Repair</div><div style="color:#d7c7a4;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-top:7px;">Professional Tzitzis Repair Service</div></td></tr><tr><td style="padding:32px 34px;"><div style="display:inline-block;background:#eaf7ef;color:#176b3a;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;">✓ ORDER CONFIRMED & PAID</div><h1 style="font-family:Georgia,serif;margin:18px 0 8px;font-size:28px;color:#172033;">Thank you for your order, ${esc(name)}.</h1><p>We’ve received your payment and your London Tzitzis Repair order is confirmed.</p>${nextStep}<h2>Order summary</h2><table width="100%">${row("Order number", orderNumber)}${row("Amount paid", `£${totalPaid}`)}${row("Repair", repairText)}${row("Number of talleisim", quantity)}${row("Handover", deliveryText)}${metadata.delivery !== "dropoff" ? row("Collection address", addressText) : ""}</table><p style="color:#6b7280;font-size:13px;">Questions? Simply reply to this email, call <strong>07562 717278</strong>, or email <strong>londontzitzisrepair@gmail.com</strong>.</p></td></tr><tr><td style="background:#f8f6f1;padding:20px 34px;text-align:center;color:#7a7468;font-size:11px;">London Tzitzis Repair<br>4 Eastville Avenue, London, NW11 0HD<br>${esc(orderNumber)}</td></tr></table></td></tr></table></body></html>`;
      await resend.emails.send({ from: FROM, to: email, replyTo: REPLY_TO, subject: `Order confirmed - ${orderNumber} | London Tzitzis Repair`, html: customerHtml, text: `Thank you for your order, ${name}.\n\nYour payment of £${totalPaid} has been received and your order is confirmed.\n\nOrder number: ${orderNumber}\nRepair: ${repairText}\nNumber of talleisim: ${quantity}\nHandover: ${deliveryText}\n${metadata.delivery === "dropoff" ? `\nPlease drop off your tallis at:\n${dropoffAddress}\n\nWe’ll contact you when it is ready for collection.\n` : `\nCollection address:\n${addressText}\n\nWe’ll use the details supplied with your order to arrange collection and return.\n`}\nQuestions? Simply reply to this email, call 07562 717278 or email londontzitzisrepair@gmail.com.\n\nLondon Tzitzis Repair` });
    }
  }
  return NextResponse.json({ received: true });
}
