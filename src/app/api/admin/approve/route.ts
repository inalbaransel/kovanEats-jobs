import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

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
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    try {
      if (!adminAuth) {
        throw new Error("Firebase Admin not initialized. Check your environment variables.");
      }
      await adminAuth.verifyIdToken(token);
    } catch (err) {
      console.error("Auth Error:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { id, name, email, jobTitle } = await request.json();

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1. Update Firestore using Admin SDK (bypasses security rules)
    if (!adminDb) {
      throw new Error("Firebase Admin DB not initialized");
    }
    await adminDb.collection("applications").doc(id).update({ status: "approved" });

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
                  background-color: #dcfce7; 
                  color: #166534; 
                  font-size: 11px; 
                  font-weight: 700; 
                  text-transform: uppercase; 
                  letter-spacing: 0.05em; 
                  margin-bottom: 24px; 
                }
                h1 { font-size: 28px; font-weight: 800; margin: 0 0 20px 0; color: #0f172a; letter-spacing: -0.02em; }
                p { font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; }
                .highlight { font-weight: 600; color: #166534; }
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
                    <div class="badge">✓ Kovan Girişi Onaylandı</div>
                    <h1>Hoş Geldin ${name}! 🎉</h1>
                    <p>Harika haber! <span class="highlight">${jobTitle}</span> pozisyonu için yaptığın başvuru ekibimiz tarafından onaylandı.</p>
                    <p>Artık kovanın bir parçası olmaya çok yakınsın. Ekipten bir arkadaşımız seninle detayları konuşmak için en kısa sürede iletişime geçecek.</p>
                    <p>Aramıza katılmanı heyecanla bekliyoruz!</p>
                    
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
        emailSent = true;
      } catch (err: unknown) {
        emailError = err instanceof Error ? err.message : String(err);
        console.error("Brevo Error:", err);
      }
    }

    return NextResponse.json({ success: true, emailSent, emailError });
  } catch (err) {
    console.error("Approve API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
