import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

interface EmailBody {
  email: string;
  tel: string;
  subject: string;
  message: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EmailBody = await req.json();
    const { email, tel, subject, message, name } = body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sziligalaron@gmail.com",
      replyTo: email,
      subject: `Weboldal megkeresés: ${subject}`,
      html: `
        <h2>Új üzenet érkezett a weboldalról</h2>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${tel}</p>
        <hr />
        <p><strong>Üzenet:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
