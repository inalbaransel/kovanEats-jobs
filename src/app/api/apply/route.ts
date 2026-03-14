import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function sendBrevoEmail(
  to: string,
  toName: string,
  subject: string,
  html: string,
) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY || "",
    },
    body: JSON.stringify({
      sender: { name: "KovanEats Kariyer", email: "noreply@kovaneats.com" },
      to: [{ email: to, name: toName }],
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return res.json();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      jobSlug,
      jobTitle,
      name,
      email,
      portfolio,
      answers,
      turnstileToken,
    } = data;

    if (!name || !email) {
      return NextResponse.json(
        { error: "İsim ve E-posta zorunludur." },
        { status: 400 },
      );
    }

    // 0. Verify Turnstile Token
    if (process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
            response: turnstileToken,
          }),
        },
      );

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json(
          { error: "Bot doğrulaması başarısız oldu. Lütfen tekrar deneyin." },
          { status: 403 },
        );
      }
    }

    // 1. Save to Firebase Firestore
    try {
      await addDoc(collection(db, "applications"), {
        jobSlug,
        jobTitle,
        name,
        email,
        portfolio: portfolio || "",
        answers: answers || {},
        status: "pending",
        read: false,
        createdAt: serverTimestamp(),
      });
    } catch (firebaseErr: unknown) {
      console.error("Firebase Error:", firebaseErr);
      throw new Error("Veritabanına kaydedilirken bir hata oluştu.");
    }

    // 2. Send Email via Brevo HTTP API
    if (process.env.BREVO_API_KEY) {
      try {
        await sendBrevoEmail(
          email,
          name,
          "Başvurun kovanımıza ulaştı! 🐝",
          `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                  background-color: #f8fafc; 
                  margin: 0; 
                  padding: 0; 
                  -webkit-font-smoothing: antialiased;
                }
                .wrapper {
                  width: 100%;
                  table-layout: fixed;
                  background-color: #f8fafc;
                  padding-bottom: 40px;
                }
                .container { 
                  max-width: 600px; 
                  margin: 40px auto; 
                  background-color: #ffffff; 
                  border-radius: 24px; 
                  overflow: hidden; 
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .content { padding: 48px; color: #1e293b; }
                .footer { padding: 32px; text-align: center; background-color: #f1f5f9; }
                .badge { 
                  display: inline-block; 
                  padding: 8px 16px; 
                  border-radius: 99px; 
                  background-color: #f1f5f9; 
                  color: #475569; 
                  font-size: 11px; 
                  font-weight: 700; 
                  text-transform: uppercase; 
                  letter-spacing: 0.05em; 
                  margin-bottom: 24px; 
                }
                h1 { font-size: 28px; font-weight: 800; margin: 0 0 20px 0; color: #0f172a; letter-spacing: -0.02em; }
                p { font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; }
                .highlight { font-weight: 600; color: #0f172a; }
                .footer-text { font-size: 12px; color: #64748b; margin: 0; }
                .signature-section {
                  margin-top: 48px;
                  padding-top: 32px;
                  border-top: 1px solid #f1f5f9;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="content">
                    <div class="badge">Başvuru Alındı</div>
                    <h1>Merhaba ${name},</h1>
                    <p>KovanEats ekibi olarak <span class="highlight">${jobTitle}</span> pozisyonu için yaptığın başvuruyu büyük bir heyecanla aldık!</p>
                    <p>Ekibimiz şu an başvurunu titizlikle inceliyor. Seninle tanışmak için sabırsızlanıyoruz.</p>
                    <p>Kovanımızda görüşmek üzere!</p>
                    
                    <div class="signature-section">
                      <p style="font-size: 14px; color: #64748b; margin-bottom: 32px;"><strong>KovanEats İşe Alım Ekibi</strong></p>
                      
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">
                            <div style="background-color: #ffffff; padding: 16px; display: inline-block; border-radius: 20px; border: 1px solid #f1f5f9;">
                              <img src="https://jobs.kovaneats.com/kahverengi_kovanEats.png" alt="KovanEats" height="120" style="height: 120px; width: auto; display: block;">
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="footer">
                    <p class="footer-text">© 2026 KovanEats · Developed by Baransel</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
          `,
        );
      } catch (mailErr: unknown) {
        console.error("Brevo Error:", mailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("API Apply Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.",
      },
      { status: 500 },
    );
  }
}
