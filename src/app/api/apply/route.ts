import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { jobSlug, jobTitle, name, email, portfolio, customQuestion } = data;

    // Validate
    if (!name || !email) {
      return NextResponse.json({ error: "İsim ve E-posta zorunludur." }, { status: 400 });
    }

    // 1. Save to Firebase Firestore
    try {
      await addDoc(collection(db, "applications"), {
        jobSlug,
        jobTitle,
        name,
        email,
        portfolio: portfolio || "",
        customQuestion: customQuestion || "",
        createdAt: serverTimestamp(),
      });
    } catch (firebaseErr: any) {
      console.error("Firebase Error:", firebaseErr);
      throw new Error("Veritabanına kaydedilirken bir hata oluştu. Ayarlarınızı kontrol edin.");
    }

    // 2. Send Email with Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          // Note: Change 'onboarding@resend.dev' to your verified domain (e.g. 'kariyer@kovaneats.com')
          // Testing without a verified domain only allows sending to your own Resend account email.
          from: "KovanEats Kariyer <onboarding@resend.dev>", 
          to: [email],
          subject: "Başvurunu aldık, kovanımıza ulaştı! 🐝",
          html: `
            <div style="font-family: Arial, sans-serif; color: #171717; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px;">
              <h2 style="color: #000; margin-bottom: 24px;">Merhaba ${name},</h2>
              <p style="line-height: 1.6;"><strong>${jobTitle}</strong> pozisyonu için yaptığın başvuruyu başarıyla aldık. KovanEats ekibine gösterdiğin ilgi için teşekkür ederiz!</p>
              <p style="line-height: 1.6;">Başvurunu inceleyip en kısa sürede sana geri dönüş yapacağız. Bu süreçte portfolyonu ve yanıtlarını detaylıca inceliyor olacağız.</p>
              <br/>
              <p style="line-height: 1.6;">Harika işler başarmak ümidiyle,<br/><strong>KovanEats İşe Alım Ekibi</strong></p>
            </div>
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
    return NextResponse.json({ error: error.message || "Bilinmeyen bir hata oluştu." }, { status: 500 });
  }
}
