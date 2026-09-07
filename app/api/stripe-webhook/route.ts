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

    const deliveryText =
      metadata.delivery === "dropoff"
        ? "Customer will drop off and collect themselves"
        : metadata.delivery === "nw11"
          ? "We collect and return to an NW11 address"
          : "We collect and return to an NW4 address";

    const addressSection =
      metadata.delivery === "dropoff"
        ? "Collection / return address: Not required - customer selected drop-off & collection"
        : `Collection / return address: ${metadata.address || "Not provided"}${metadata.postcode ? `, ${metadata.postcode}` : ""}`;

    await resend.emails.send({
      from: process.env.ORDER_EMAIL_FROM || "London Tzitzis Repair <onboarding@resend.dev>",
      to: process.env.ORDER_EMAIL_TO || "londontzitzisrepair@gmail.com",
      subject: `PAID ORDER - £${totalPaid} - ${metadata.name || "Customer"}`,
      text: `
PAID ORDER - PAYMENT CONFIRMED

Amount paid: £${totalPaid}
Stripe checkout session: ${session.id}

CUSTOMER
Name: ${metadata.name || "Not provided"}
Phone: ${metadata.phone || "Not provided"}
Email: ${metadata.email || session.customer_email || "Not provided"}

ORDER
Repair required: ${metadata.repairType === "full" ? "All 4 corners" : `${metadata.corners || "Unknown"} corner(s)`}
Number of talleisim: ${metadata.quantity || "Not provided"}
Handover method: ${deliveryText}
${addressSection}

CUSTOMER'S REPAIR NOTES
${metadata.repairNotes || "None provided"}

PREFERRED TIMES
${metadata.preferredTimes || "None provided"}
      `.trim(),
    });
  }

  return NextResponse.json({ received: true });
}