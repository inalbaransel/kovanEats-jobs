import { NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export async function POST(request: Request) {
  try {
    const { id, name, email, jobTitle } = await request.json();

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1. Update Firestore
    await updateDoc(doc(db, "applications", id), { status: "rejected" });

    // 2. Send rejection email
    let emailSent = false;
    let emailError = null;

    if (process.env.BREVO_API_KEY) {
      try {
        await sendBrevoEmail(
          email,
          name,
          "KovanEats Başvurun Hakkında",
          `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; overflow: hidden; }
                .header { padding: 40px 20px; text-align: center; background-color: #ffffff; }
                .content { padding: 40px; color: #171717; }
                .badge { display: inline-block; padding: 6px 14px; border-radius: 30px; background-color: #f0f0f0; color: #666; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
                h1 { font-size: 24px; font-weight: 800; margin: 0 0 16px 0; color: #000; }
                p { font-size: 15px; line-height: 1.7; color: #555; margin: 0 0 16px 0; }
                .footer { padding: 24px; text-align: center; background-color: #f9f9f9; border-top: 1px solid #eaeaea; }
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
                  <div class="badge">BAŞVURU GÜNCELLEME</div>
                  <h1>Merhaba ${name},</h1>
                  <p><strong>${jobTitle}</strong> pozisyonu için yaptığın başvuruyu değerlendirdik.</p>
                  <p>Maalesef şu an bu pozisyon için ilerleyemeyeceğiz. Bu karar birçok nitelikli başvuru arasında zor bir seçimin sonucudur ve senin potansiyelini yansıtmamaktadır.</p>
                  <p>Harcadığın zaman ve gösterdiğin ilgi için içtenlikle teşekkür ederiz. Gelecekte tekrar yollarımızın kesişmesini umuyoruz.</p>
                  <p>Başarılar diliyoruz! 🍀</p>
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
          `,
        );
        emailSent = true;
      } catch (err: unknown) {
        emailError = err instanceof Error ? err.message : String(err);
        console.error("Brevo Error:", err);
      }
    }

    return NextResponse.json({ success: true, emailSent, emailError });
  } catch (err) {
    console.error("Reject API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
