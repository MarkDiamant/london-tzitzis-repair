import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const totalPaid = session.amount_total ? (session.amount_total / 100).toFixed(2) : metadata.total || "Unknown";

    await resend.emails.send({
      from: process.env.ORDER_EMAIL_FROM || "London Tzitzis Repair <onboarding@resend.dev>",
      to: process.env.ORDER_EMAIL_TO || "londontzitzisrepair@gmail.com",
      subject: `Paid London Tzitzis Repair order - £${totalPaid}`,
      text: `
Paid London Tzitzis Repair order

Amount paid: £${totalPaid}
Stripe checkout session: ${session.id}

Customer
Name: ${metadata.name || "Not provided"}
Phone: ${metadata.phone || "Not provided"}
Email: ${metadata.email || session.customer_email || "Not provided"}

Order
Repair type: ${
        metadata.repairType === "full"
          ? "All 4 corners"
          : `${metadata.corners || "Unknown"} corner(s)`
      }
Quantity of talleisim: ${metadata.quantity || "Not provided"}
Collection option: ${
        metadata.delivery === "dropoff"
          ? "Customer drop-off and customer collection"
          : metadata.delivery === "nw11"
            ? "Collected and delivered to an NW11 address"
            : "Collected and delivered to an NW4 address"
      }

Address
${metadata.address || "No address needed"}
${metadata.postcode || ""}

What needs repairing
${metadata.repairNotes || "Not provided"}

Preferred times
${metadata.preferredTimes || "Not provided"}
      `.trim(),
    });
  }

  return NextResponse.json({ received: true });
}