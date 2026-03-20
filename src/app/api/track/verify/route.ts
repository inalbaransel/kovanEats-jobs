import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "E-posta ve doğrulama kodu gereklidir." }, { status: 400 });
    }

    if (!adminDb) {
      console.error("Admin DB not initialized.");
      return NextResponse.json({ error: "Sunucu hatası: Veritabanı bağlantısı kurulamadı." }, { status: 500 });
    }

    // 1. Verify Code from Firestore using Admin SDK
    const codeDocs = await adminDb
      .collection("verification_codes")
      .where("email", "==", email)
      .where("code", "==", code)
      .get();

    if (codeDocs.empty) {
      return NextResponse.json({ error: "Geçersiz veya süresi dolmuş kod." }, { status: 400 });
    }

    const codeDoc = codeDocs.docs[0];
    const codeData = codeDoc.data();
    const expiresAt = codeData.expiresAt.toDate();

    if (new Date() > expiresAt) {
      // Code expired, delete it and return error
      const batch = adminDb.batch();
      codeDocs.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      return NextResponse.json({ error: "Kodun süresi dolmuş. Lütfen yeni bir kod isteyin." }, { status: 400 });
    }

    // 2. Clear used codes
    const batch = adminDb.batch();
    codeDocs.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // 3. Fetch Applications for this email
    const appDocs = await adminDb
      .collection("applications")
      .where("email", "==", email)
      .orderBy("createdAt", "desc")
      .get();
    
    const applications = appDocs.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        jobTitle: data.jobTitle,
        jobSlug: data.jobSlug,
        status: data.status || "pending",
        createdAt: data.createdAt?.toDate?.() || new Date(),
      };
    });

    return NextResponse.json({ success: true, applications });
  } catch (error: unknown) {
    console.error("Track Verify Error:", error);
    const message = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
