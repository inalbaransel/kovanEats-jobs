import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { jobSlug, jobTitle, name, email, portfolio, answers } = data;

    // Validate
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
      throw new Error(
        "Veritabanına kaydedilirken bir hata oluştu. Ayarlarınızı kontrol edin.",
      );
    }

    // 2. Send Email with Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          // Note: Change 'onboarding@resend.dev' to your verified domain (e.g. 'kariyer@kovaneats.com')
          // Testing without a verified domain only allows sending to your own Resend account email.
          from: "KovanEats Kariyer <onboarding@resend.dev>",
          to: [email],
          subject: "Başvurun kovanımıza ulaştı! 🐝",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; }
                  .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
                  .header { padding: 40px 20px; text-align: center; background-color: #ffffff; }
                  .content { padding: 0 40px 40px 40px; color: #171717; }
                  .footer { padding: 30px; text-align: center; background-color: #f9f9f9; border-top: 1px solid #eaeaea; }
                  .badge { display: inline-block; padding: 6px 12px; border-radius: 6px; background-color: #f0f0f0; color: #666; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; }
                  h1 { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0 0 16px 0; color: #000; }
                  p { font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 20px 0; }
                  .highlight { font-weight: bold; color: #000; }
                  .button { display: inline-block; padding: 14px 28px; background-color: #000; color: #ffffff !important; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; margin-top: 20px; }
                  .footer-text { font-size: 12px; color: #999; margin: 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <img src="https://pub-543c785b9b4940d6a934d856a8a91c99.r2.dev/kovanEats_logo.png" alt="KovanEats" style="height: 180px; width: auto;">
                  </div>
                  <div class="content">
                    <div class="badge">BAŞVURU ALINDI</div>
                    <h1>Merhaba ${name},</h1>
                    <p>KovanEats ekibi olarak <span class="highlight">${jobTitle}</span> pozisyonu için yaptığın başvuruyu büyük bir heyecanla aldık!</p>
                    <p>Seninle aynı vizyonda buluşmak bizim için çok değerli. Ekibimiz şu an başvurunu ve detaylarını titizlikle inceliyor.</p>
                    <p>Sürece dair bir sonraki adımda seninle bu mail adresi üzerinden iletişime geçeceğiz. Bu süre zarfında heyecanını bizimle paylaştığın için teşekkürler.</p>
                    <p>Kovanımızda görüşmek üzere!</p>
                    <div style="margin-top: 40px; border-top: 1px solid #eee; pt-20">
                      <p style="font-size: 14px; color: #888;"><strong>KovanEats İşe Alım Ekibi</strong></p>
                    </div>
                  </div>
                  <div class="footer">
                    <p class="footer-text">© 2026 KovanEats. Tüm hakları saklıdır.</p>
                    <p class="footer-text" style="margin-top: 8px;">Developed by Baransel</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });
      } catch (resendErr) {
        console.error("Resend Error:", resendErr);
        // We log the error but still return success to the user since the DB save was successful
      }
    } else {
      console.log("No RESEND_API_KEY provided. Skipping email dispatch.");
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
