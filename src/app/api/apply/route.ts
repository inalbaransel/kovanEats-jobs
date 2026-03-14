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
    const { jobSlug, jobTitle, name, email, portfolio, answers } = data;

    if (!name || !email) {
      return NextResponse.json(
        { error: "İsim ve E-posta zorunludur." },
        { status: 400 },
      );
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
    } catch (firebaseErr: any) {
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
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; overflow: hidden; }
                .header { padding: 40px 20px; text-align: center; background-color: #ffffff; }
                .content { padding: 0 40px 40px 40px; color: #171717; }
                .footer { padding: 30px; text-align: center; background-color: #f9f9f9; border-top: 1px solid #eaeaea; }
                .badge { display: inline-block; padding: 6px 12px; border-radius: 6px; background-color: #f0f0f0; color: #666; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; }
                h1 { font-size: 24px; font-weight: 800; margin: 0 0 16px 0; color: #000; }
                p { font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 20px 0; }
                .highlight { font-weight: bold; color: #000; }
                .footer-text { font-size: 12px; color: #999; margin: 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div style="background-color: #ffffff; padding: 20px; display: inline-block; border-radius: 20px;">
                    <img src="https://jobs.kovaneats.com/kahverengi_kovanEats.png" alt="KovanEats" style="height: 150px; width: auto; display: block;">
                  </div>
                </div>
                <div class="content">
                  <div class="badge">BAŞVURU ALINDI</div>
                  <h1>Merhaba ${name},</h1>
                  <p>KovanEats ekibi olarak <span class="highlight">${jobTitle}</span> pozisyonu için yaptığın başvuruyu büyük bir heyecanla aldık!</p>
                  <p>Ekibimiz şu an başvurunu titizlikle inceliyor. En kısa sürede seninle iletişime geçeceğiz.</p>
                  <p>Kovanımızda görüşmek üzere!</p>
                  <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
                    <p style="font-size: 14px; color: #888;"><strong>KovanEats İşe Alım Ekibi</strong></p>
                  </div>
                </div>
                <div class="footer">
                  <p class="footer-text">© 2026 KovanEats · Developed by Baransel</p>
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
  } catch (error: any) {
    console.error("API Apply Error:", error);
    return NextResponse.json(
      { error: error.message || "Bilinmeyen bir hata oluştu." },
      { status: 500 },
    );
  }
}
