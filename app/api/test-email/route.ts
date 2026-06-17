import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: process.env.ORDER_EMAIL_FROM || "London Tzitzis Repair <onboarding@resend.dev>",
      to: process.env.ORDER_EMAIL_TO || "londontzitzisrepair@gmail.com",
      subject: "Test email from London Tzitzis Repair",
      text: "This is a test email. If you received this, Resend is working.",
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}