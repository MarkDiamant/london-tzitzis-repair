import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

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
              description: `${quantity} garment(s), ${
                repairType === "full" ? "all 4 corners" : `${corners} corner(s)`
              }`,
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