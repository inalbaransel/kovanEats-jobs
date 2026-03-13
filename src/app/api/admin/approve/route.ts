import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

async function sendBrevoEmail(to: string, toName: string, subject: string, html: string) {
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

export async function POST(request: Request) {
  try {
    const { id, name, email, jobTitle } = await request.json();

    if (!id || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Update Firestore
    await updateDoc(doc(db, "applications", id), { status: "approved" });

    // 2. Send approval email
    let emailSent = false;
    let emailError = null;

    if (process.env.BREVO_API_KEY) {
      try {
        await sendBrevoEmail(
          email,
          name,
          "🎉 Tebrikler! KovanEats'e Hoş Geldin!",
          `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; overflow: hidden; }
                .header { padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #052e16, #14532d); }
                .content { padding: 40px; color: #171717; }
                .badge { display: inline-block; padding: 6px 14px; border-radius: 30px; background-color: #dcfce7; color: #16a34a; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
                h1 { font-size: 26px; font-weight: 800; margin: 0 0 16px 0; color: #000; }
                p { font-size: 15px; line-height: 1.7; color: #555; margin: 0 0 16px 0; }
                .highlight { font-weight: bold; color: #16a34a; }
                .footer { padding: 24px; text-align: center; background-color: #f9f9f9; border-top: 1px solid #eaeaea; }
                .footer-text { font-size: 12px; color: #999; margin: 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="https://pub-543c785b9b4940d6a934d856a8a91c99.r2.dev/kovanEats_logo.png" alt="KovanEats" style="height: 160px; width: auto;">
                </div>
                <div class="content">
                  <div class="badge">✓ BAŞVURU ONAYLANDI</div>
                  <h1>Tebrikler, ${name}! 🎉</h1>
                  <p><span class="highlight">${jobTitle}</span> pozisyonu için yaptığın başvuru <strong>onaylandı!</strong></p>
                  <p>Kovanımıza resmi olarak hoş geldin. Ekibimiz seninle iletişime geçmek için sabırsızlanıyor.</p>
                  <p>En kısa sürede bu mail adresi üzerinden sana ulaşacağız.</p>
                  <p>Birlikte harika şeyler inşa edeceğiz. Hazır mısın?</p>
                  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
                    <p style="font-size: 14px; color: #888;"><strong>KovanEats İşe Alım Ekibi</strong></p>
                  </div>
                </div>
                <div class="footer">
                  <p class="footer-text">© 2026 KovanEats · Developed by Baransel</p>
                </div>
              </div>
            </body>
          </html>
          `
        );
        emailSent = true;
      } catch (err: any) {
        emailError = String(err);
        console.error("Brevo Error:", err);
      }
    }

    return NextResponse.json({ success: true, emailSent, emailError });
  } catch (err) {
    console.error("Approve API Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
