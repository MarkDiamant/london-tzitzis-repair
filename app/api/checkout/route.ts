import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      repairType,
      corners,
      quantity,
      delivery,
      total,
      name,
      phone,
      email,
      address,
      postcode,
      repairNotes,
      preferredTimes,
    } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Missing customer details" }, { status: 400 });
    }

    if (!total || total < 1) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const deliveryText =
      delivery === "dropoff"
        ? "Customer drop-off and customer collection"
        : delivery === "nw11"
          ? "Collected and delivered to an NW11 address"
          : "Collected and delivered to an NW4 address";

    const repairText =
      repairType === "full" ? "All 4 corners" : `${corners} corner(s)`;

    await resend.emails.send({
      from: process.env.ORDER_EMAIL_FROM || "London Tzitzis Repair <onboarding@resend.dev>",
      to: process.env.ORDER_EMAIL_TO || "londontzitzisrepair@gmail.com",
      subject: `New London Tzitzis Repair order - £${total}`,
      text: `
New London Tzitzis Repair order

Amount: £${total}

Customer
Name: ${name}
Phone: ${phone}
Email: ${email}

Order
Repair: ${repairText}
Quantity of talleisim: ${quantity}
Collection option: ${deliveryText}

Address
${address || "No address needed"}
${postcode || ""}

What needs repairing
${repairNotes || "Not provided"}

Preferred times
${preferredTimes || "Not provided"}
      `.trim(),
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(Number(total) * 100),
            product_data: {
              name: "London Tzitzis Repair",
              description: `${quantity} garment(s), ${repairText}`,
            },
          },
        },
      ],
      metadata: {
        name,
        phone,
        email,
        repairType,
        corners: String(corners),
        quantity: String(quantity),
        delivery,
        address: address || "",
        postcode: postcode || "",
        repairNotes: repairNotes || "",
        preferredTimes: preferredTimes || "",
        total: String(total),
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#order`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 500 });
  }
}