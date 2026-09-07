import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const resend = new Resend(process.env.RESEND_API_KEY || "");

const esc = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

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
        ? "Customer drop-off & collection"
        : metadata.delivery === "nw11"
          ? "Collection & return - NW11"
          : "Collection & return - NW4";

    const repairText = metadata.repairType === "full"
      ? "All 4 corners"
      : `${metadata.corners || "Unknown"} corner(s)`;

    const addressText = metadata.delivery === "dropoff"
      ? "Not required - customer is dropping off and collecting"
      : `${metadata.address || "Not provided"}${metadata.postcode ? `, ${metadata.postcode}` : ""}`;

    const name = metadata.name || "Customer";
    const phone = metadata.phone || "Not provided";
    const email = metadata.email || session.customer_email || "Not provided";
    const quantity = metadata.quantity || "Not provided";
    const repairNotes = metadata.repairNotes || "None provided";
    const preferredTimes = metadata.preferredTimes || "None provided";

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 0;color:#6b7280;font-size:14px;width:42%;vertical-align:top;">${esc(label)}</td>
        <td style="padding:10px 0;color:#172033;font-size:14px;font-weight:600;vertical-align:top;">${esc(value)}</td>
      </tr>`;

    const html = `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#172033;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f7;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 18px rgba(23,32,51,.08);">
        <tr>
          <td style="background:#172033;padding:28px 34px;text-align:center;">
            <div style="font-family:Georgia,'Times New Roman',serif;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:.2px;">London Tzitzis Repair</div>
            <div style="color:#d7c7a4;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-top:7px;">Professional Tzitzis Repair Service</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 34px 8px;">
            <div style="display:inline-block;background:#eaf7ef;color:#176b3a;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;letter-spacing:.5px;">✓ PAYMENT CONFIRMED</div>
            <h1 style="font-family:Georgia,'Times New Roman',serif;margin:18px 0 6px;font-size:28px;line-height:1.2;color:#172033;">New paid order</h1>
            <p style="margin:0;color:#6b7280;font-size:14px;">Everything needed to process this order is below.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 34px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8f6f1;border:1px solid #eee8dc;border-radius:12px;">
              <tr><td style="padding:20px 22px;">
                <div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1.4px;">Amount paid</div>
                <div style="font-family:Georgia,'Times New Roman',serif;color:#172033;font-size:32px;font-weight:700;margin-top:4px;">£${esc(totalPaid)}</div>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr><td style="padding:4px 34px 0;"><h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;margin:0;padding-bottom:8px;border-bottom:1px solid #e5e7eb;">Customer</h2></td></tr>
        <tr><td style="padding:4px 34px 22px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${row("Name", name)}${row("Phone", phone)}${row("Email", email)}</table></td></tr>
        <tr><td style="padding:4px 34px 0;"><h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;margin:0;padding-bottom:8px;border-bottom:1px solid #e5e7eb;">Order details</h2></td></tr>
        <tr><td style="padding:4px 34px 22px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${row("Repair required", repairText)}${row("Number of talleisim", quantity)}${row("Handover method", deliveryText)}${row("Collection / return address", addressText)}</table></td></tr>
        <tr><td style="padding:4px 34px 0;"><h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;margin:0;padding-bottom:8px;border-bottom:1px solid #e5e7eb;">Customer notes</h2></td></tr>
        <tr><td style="padding:14px 34px 24px;color:#374151;font-size:14px;line-height:1.6;">${esc(repairNotes)}</td></tr>
        <tr><td style="padding:4px 34px 0;"><h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;margin:0;padding-bottom:8px;border-bottom:1px solid #e5e7eb;">Preferred times</h2></td></tr>
        <tr><td style="padding:14px 34px 30px;color:#374151;font-size:14px;line-height:1.6;">${esc(preferredTimes)}</td></tr>
        <tr>
          <td style="background:#f8f6f1;padding:18px 34px;text-align:center;color:#7a7468;font-size:11px;line-height:1.5;">
            Payment confirmed by Stripe<br>Session: ${esc(session.id)}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await resend.emails.send({
      from: process.env.ORDER_EMAIL_FROM || "London Tzitzis Repair <onboarding@resend.dev>",
      to: process.env.ORDER_EMAIL_TO || "londontzitzisrepair@gmail.com",
      subject: `PAID ORDER - £${totalPaid} - ${name}`,
      html,
      text: `PAID ORDER - PAYMENT CONFIRMED\n\nAmount paid: £${totalPaid}\n\nCUSTOMER\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nORDER DETAILS\nRepair required: ${repairText}\nNumber of talleisim: ${quantity}\nHandover method: ${deliveryText}\nCollection / return address: ${addressText}\n\nCUSTOMER NOTES\n${repairNotes}\n\nPREFERRED TIMES\n${preferredTimes}\n\nStripe checkout session: ${session.id}`,
    });
  }

  return NextResponse.json({ received: true });
}