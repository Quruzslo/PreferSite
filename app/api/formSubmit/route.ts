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
      from: "Prefersite Weboldal <info@prefersite.hu>",
      to: "sziligalaron@gmail.com",
      replyTo: email,
      subject: `Weboldal megkeresés: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="hu">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Új weboldal megkeresés</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f5f7; padding: 40px 10px;">
            <tr>
              <td align="center">
                <!-- Fő konténer -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); border: 1px solid #eaedf1;">
                  
                  <!-- Fejléc sáv -->
                  <tr>
                    <td style="background-color: #52be80; padding: 28px 32px; text-align: left;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.3px;">Új weboldal megkeresés</h1>
                      <p style="color: rgba(255, 255, 255, 0.85); margin: 6px 0 0 0; font-size: 13px;">Érkezett egy új üzenet a prefersite.hu kapcsolati űrlapjáról.</p>
                    </td>
                  </tr>

                  <!-- Tartalom -->
                  <tr>
                    <td style="padding: 32px;">
                      
                      <!-- Küldő adatai kártya -->
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 20px;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td style="padding-bottom: 12px; font-size: 14px; color: #64748b; width: 90px; vertical-align: top;"><strong>Név:</strong></td>
                                <td style="padding-bottom: 12px; font-size: 14px; color: #0f172a; font-weight: 600; vertical-align: top;">${name}</td>
                              </tr>
                              <tr>
                                <td style="padding-bottom: 12px; font-size: 14px; color: #64748b; width: 90px; vertical-align: top;"><strong>E-mail:</strong></td>
                                <td style="padding-bottom: 12px; font-size: 14px; vertical-align: top;">
                                  <a href="mailto:${email}" style="color: #52be80; text-decoration: none; font-weight: 500;">${email}</a>
                                </td>
                              </tr>
                              <tr>
                                <td style="font-size: 14px; color: #64748b; width: 90px; vertical-align: top;"><strong>Telefon:</strong></td>
                                <td style="font-size: 14px; color: #0f172a; vertical-align: top;">
                                  ${tel ? `<a href="tel:${tel}" style="color: #0f172a; text-decoration: none;">${tel}</a>` : '<span style="color: #94a3b8; font-style: italic;">Nincs megadva</span>'}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Üzenet tárgya -->
                      <div style="margin-bottom: 16px;">
                        <span style="font-size: 12px; text-transform: uppercase; tracking: 0.5px; font-weight: 700; color: #52be80; display: block; margin-bottom: 4px;">Tárgy</span>
                        <h2 style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 600;">${subject}</h2>
                      </div>

                      <!-- Üzenet szövege -->
                      <div style="margin-bottom: 24px;">
                        <span style="font-size: 12px; text-transform: uppercase; tracking: 0.5px; font-weight: 700; color: #52be80; display: block; margin-bottom: 8px;">Üzenet</span>
                        <div style="background-color: #ffffff; border-left: 3px solid #52be80; padding: 16px 20px; color: #334155; font-size: 14px; line-height: 1.6; border-radius: 0 8px 8px 0; background-color: #f8fafc;">
                          ${message.replace(/\n/g, "<br />")}
                        </div>
                      </div>

                      <!-- Válasz gomb -->
                      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #f1f5f9;">
                        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #52be80; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(82, 190, 128, 0.25);">
                          Válasz küldése E-mailben
                        </a>
                      </div>

                    </td>
                  </tr>

                  <!-- Lábléc -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                        Ez egy automatikus értesítés a <strong>Prefersite</strong> weboldalról.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
