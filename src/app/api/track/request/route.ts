import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import * as admin from "firebase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "E-posta adresi gereklidir." }, { status: 400 });
    }

    if (!adminDb) {
      console.error("Admin DB not initialized. Check environment variables.");
      return NextResponse.json({ error: "Sunucu hatası: Veritabanı bağlantısı kurulamadı." }, { status: 500 });
    }

    // 1. Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // 2. Clear old codes for this email (Admin SDK bypasses security rules)
    const oldCodes = await adminDb.collection("verification_codes").where("email", "==", email).get();
    const batch = adminDb.batch();
    oldCodes.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // 3. Save new code to Firestore using Admin SDK
    await adminDb.collection("verification_codes").add({
      email,
      code,
      expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 4. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "KovanEats Kariyer <kariyer@kovaneats.com>",
        to: [email],
        subject: "Başvuru Takip Doğrulama Kodu",
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #111; text-align: center;">KovanEats Başvuru Takibi</h2>
            <p>Merhaba,</p>
            <p>Başvurunu takip etmek için kullanabileceğin tek kullanımlık doğrulama kodun aşağıdadır:</p>
            <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; margin: 20px 0; color: #000;">
              ${code}
            </div>
            <p style="color: #666; font-size: 14px; text-align: center;">Bu kod 10 dakika boyunca geçerlidir. Eğer bu isteği siz yapmadıysanız lütfen bu e-postayı dikkate almayın.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px; text-align: center;">KovanEats Kariyer Ekibi</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Track Request Error:", error);
    const message = error instanceof Error ? error.message : "Kod gönderilirken bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
