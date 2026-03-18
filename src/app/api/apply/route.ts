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
          "KovanEats: Başvurunuz Alındı",
          `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif; 
                  background-color: #ffffff; 
                  margin: 0; 
                  padding: 0; 
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
                .wrapper {
                  width: 100%;
                  background-color: #ffffff;
                }
                .container { 
                  max-width: 560px; 
                  margin: 0 auto; 
                  padding: 64px 24px;
                  background-color: #ffffff; 
                }
                .header {
                  text-align: center;
                  margin-bottom: 48px;
                }
                .logo {
                  height: 64px;
                  width: auto;
                  margin: 0 auto;
                }
                .content { 
                  color: #1d1d1f; 
                  text-align: center;
                }
                h1 { 
                  font-size: 32px; 
                  line-height: 1.125;
                  font-weight: 600; 
                  margin: 0 0 24px 0; 
                  color: #1d1d1f; 
                  letter-spacing: -0.004em; 
                }
                p { 
                  font-size: 17px; 
                  line-height: 1.47059; 
                  font-weight: 400;
                  color: #1d1d1f; 
                  margin: 0 0 24px 0; 
                  letter-spacing: -0.022em;
                }
                .highlight { 
                  font-weight: 600; 
                }
                .divider {
                  height: 1px;
                  background-color: #d2d2d7;
                  margin: 48px 0;
                  border: none;
                }
                .footer { 
                  text-align: center; 
                }
                .footer-text { 
                  font-size: 12px; 
                  line-height: 1.33337;
                  font-weight: 400;
                  color: #86868b; 
                  margin: 0; 
                  letter-spacing: -0.01em;
                }
                .mt-2 {
                  margin-top: 8px;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    <img src="https://pub-543c785b9b4940d6a934d856a8a91c99.r2.dev/kahverengi_kovanEats.png" alt="KovanEats" class="logo">
                  </div>
                  
                  <div class="content">
                    <h1>Başvurunuz Alındı</h1>
                    
                    <p>Merhaba ${name},</p>
                    
                    <p>KovanEats ekibi olarak <span class="highlight">${jobTitle}</span> pozisyonu için yaptığınız başvuruyu büyük bir heyecanla aldık.</p>
                    
                    <p>Ekibimiz şu an başvurunuzu titizlikle inceliyor. Sizinle tanışmak için sabırsızlanıyoruz.</p>
                    
                    <p>Kovanımızda görüşmek üzere.</p>
                  </div>

                  <hr class="divider" />
                  
                  <div class="footer">
                    <p class="footer-text">KovanEats İşe Alım Ekibi</p>
                    <p class="footer-text mt-2">© 2026 KovanEats. Developed by Baransel</p>
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
          error instanceof Error
            ? error.message
            : "Bilinmeyen bir hata oluştu.",
      },
      { status: 500 },
    );
  }
}
