"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "TR" | "EN";

export const translations = {
  TR: {
    menu: {
      open: "Menüyü aç",
      theme: "Tema",
      themeLight: "Açık",
      themeSystem: "Sistem",
      themeDark: "Koyu",
      trackApp: "Başvurumu Takip Et",
      comingSoon: "Yakında geliyor",
      language: "Dil",
    },
    home: {
      career: "Kariyer",
      tagline: "KovanEats'te kariyer fırsatlarını keşfet.",
    },
    jobCard: {
      viewDetails: "Detayları İncele",
    },
    jobDetail: {
      backToAll: "Tüm Pozisyonlara Dön",
      departmentBadge: (title: string) => `${title} Departmanı`,
      roleHeading: (title: string) => `${title} Rolü`,
      joinHive: "Kovana Katıl",
      responsibilities: "Sorumluluklar",
      expectations: "Beklentiler",
      summary: "Özet Bilgi",
      workType: "Çalışma Şekli",
      workTypeValue: "Esnek & Sorumluluk Odaklı",
      location: "Konum",
      locationValue: "Hibrit / Freelance / İstanbul",
      department: "Departman",
    },
    applyPage: {
      backToJob: (title: string) => `İlana Geri Dön (${title})`,
      badge: "Başvuru",
      heading: "Bir Adım Kaldı",
      description:
        "Kovanımıza katılma şansını yakalamak için aşağıdaki formu doldur. Uzun ve çok soru olacak dedin, yerini ayırdık.",
    },
    form: {
      title: "Başvuru Formu",
      fullName: "Ad Soyad",
      fullNamePlaceholder: "Ahmet Yılmaz",
      email: "E-Posta",
      emailPlaceholder: "ahmet@example.com",
      portfolio: "Portfolyo / LinkedIn / Web Sitesi",
      portfolioPlaceholder: "https://linkedin.com/in/ahmetyilmaz",
      positionQuestions: "Pozisyona Özel Sorular",
      sending: "Kovana Gönderiliyor...",
      submit: "Başvurumu Tamamla",
      verifyHuman: "Lütfen bot olmadığınızı doğrulayın.",
      errorGeneric: "Özür dileriz, bir hata oluştu.",
      errorUnknown: "Bilinmeyen bir hata oluştu.",
      successTitle: "Başvurunuz Kovanımıza Düştü!",
      successText:
        "Harika bir adım attın. Başvurun elimize ulaştı, ekibimiz heyecanla incelemeye başlıyor. Seninle en kısa sürede iletişime geçeceğiz.",
      successNote: "Mail kutunu sık sık kontrol etmeyi unutma!",
      backToHome: "← Ana Sayfaya Dön",
    },
    mascot: {
      question: "Neden KovanEats'i tercih etmelisin? 😑",
      readStory: "Hikayeyi Oku",
      storyTitle: "Bir Startup Vizyonu: Birlikte Büyüyeceğiz",
      storyParagraphs: [
        "Yemeksepeti'nin hikayesini bilirsin; ilk kurulduğunda ekipteki kimseye devasa maaşlar vaat edilememişti. Kurucusu o günleri anlatırken, tek vaatlerinin bir gün başarılı olurlarsa bu başarıyı herkesle paylaşmak olduğunu söyler.",
        "İşler büyüyüp milyonluk cirolar geldiğinde ise sözlerini tuttular. O büyük kazancı ekipteki herkesle, sanki her biri şirketin ortağıymış gibi paylaştılar. Çünkü gerçek bir startup ruhu, başarıyı tek başına değil, o yolu beraber yürüyenlerle kucaklamayı gerektirir.",
        "Biz de tam bu ruhla yola çıkıyoruz. Şu an bir startup'ız ve en büyük sermayemiz hayallerimiz. Yarın o büyük sıçramayı yaptığımızda, başarımızı sadece kurucuların değil, bu kovanı bugün beraber örenlerin başarısı olarak göreceğiz.",
        "Senin de bizi tercih etmen için bu hikayeyi anlattık. Bu vizyonu beraber gerçeğe dönüştürmeye, kovanın bir parçası olmaya var mısın? 🤗",
      ],
    },
  },
  EN: {
    menu: {
      open: "Open menu",
      theme: "Theme",
      themeLight: "Light",
      themeSystem: "System",
      themeDark: "Dark",
      trackApp: "Track My Application",
      comingSoon: "Coming soon",
      language: "Language",
    },
    home: {
      career: "Careers",
      tagline: "Discover career opportunities at KovanEats.",
    },
    jobCard: {
      viewDetails: "View Details",
    },
    jobDetail: {
      backToAll: "Back to All Positions",
      departmentBadge: (title: string) => `${title} Department`,
      roleHeading: (title: string) => `${title} Role`,
      joinHive: "Join the Hive",
      responsibilities: "Responsibilities",
      expectations: "Expectations",
      summary: "Summary",
      workType: "Work Type",
      workTypeValue: "Flexible & Responsibility-Driven",
      location: "Location",
      locationValue: "Hybrid / Freelance / Istanbul",
      department: "Department",
    },
    applyPage: {
      backToJob: (title: string) => `Back to Listing (${title})`,
      badge: "Application",
      heading: "One Step Away",
      description:
        "Fill out the form below to seize the chance to join our hive. We saved a spot just for you — questions and all.",
    },
    form: {
      title: "Application Form",
      fullName: "Full Name",
      fullNamePlaceholder: "John Smith",
      email: "Email",
      emailPlaceholder: "john@example.com",
      portfolio: "Portfolio / LinkedIn / Website",
      portfolioPlaceholder: "https://linkedin.com/in/johnsmith",
      positionQuestions: "Position-Specific Questions",
      sending: "Sending to the Hive...",
      submit: "Complete My Application",
      verifyHuman: "Please verify you are not a robot.",
      errorGeneric: "We're sorry, an error occurred.",
      errorUnknown: "An unknown error occurred.",
      successTitle: "Your Application Reached Our Hive!",
      successText:
        "Great step forward. Your application is in our hands and our team is excitedly reviewing it. We'll be in touch with you as soon as possible.",
      successNote: "Don't forget to check your inbox frequently!",
      backToHome: "← Back to Home",
    },
    mascot: {
      question: "Why should you choose KovanEats? 😑",
      readStory: "Read the Story",
      storyTitle: "A Startup Vision: We'll Grow Together",
      storyParagraphs: [
        "You know Yemeksepeti's story — when it was first founded, nobody on the team was promised huge salaries. The founder recalls those early days, saying their only promise was to share success with everyone if they ever made it big.",
        "When things grew and millions in revenue came in, they kept their word. They shared that great success with everyone on the team, as if each one were a co-owner of the company. Because a true startup spirit requires embracing success not alone, but with those who walked the path together.",
        "We set out with exactly this spirit. Right now we're a startup, and our biggest asset is our dreams. When we make that big leap tomorrow, we'll see our success not just as the founders', but as the success of everyone who built this hive together today.",
        "We told you this story so you'd choose us. Are you in to turn this vision into reality together — to become part of the hive? 🤗",
      ],
    },
  },
};

export type Translations = typeof translations.TR;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("TR");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "TR" || stored === "EN") {
      setLangState(stored);
    } else {
      // Tarayıcı dilini tespit et, Türkçe değilse EN yap
      const browserLang = navigator.language || "";
      const detected: Lang = browserLang.startsWith("tr") ? "TR" : "EN";
      setLangState(detected);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
