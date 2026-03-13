export type Job = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  expectations: string[];
  customQuestion: string;
  customQuestionLabel: string;
  customQuestionPlaceholder: string;
};

export const jobs: Job[] = [
  {
    id: "1",
    slug: "backend-security",
    title: "Backend & Security Architect",
    subtitle: "Sistemin beyni ve koruyucusu ol.",
    description:
      "Node.js, PostgreSQL ve Prisma’ya fısıldayan; sistemin güvenliğini (Auth, veri şifreleme) en üst seviyede tutacak, 'hacker' zihninde bir mimar arıyoruz.",
    responsibilities: [
      "Ölçeklenebilir API mimarileri tasarlamak ve güvenliği sağlamak.",
      "Veritabanı optimizasyonu ve veri şifreleme süreçlerini yönetmek.",
      "Sistemi olası siber saldırılara karşı monitor etmek ve zırhlamak.",
    ],
    expectations: [
      "Node.js ve PostgreSQL tecrübesi.",
      "Siber güvenlik protokollerine (JWT, OAuth, Encryption) hakimiyet.",
      "Hızlı ve temiz kod yazımı.",
    ],
    customQuestion: "security_approach",
    customQuestionLabel:
      "Bir SQL Injection saldırısını veya yetkisiz erişimi engellemek için ilk 3 savunma hattın nedir?",
    customQuestionPlaceholder: "Örn: Middleware doğrulaması, veri temizleme...",
  },
  {
    id: "2",
    slug: "frontend",
    title: "Frontend Developer",
    subtitle: "Temiz ve modern arayüzler tasarla.",
    description:
      "Next.js ve Tailwind CSS ile piksel mükemmeliyetinde işler çıkaran, GSAP ile animasyonun dibine vuran, estetik takıntılı bir büyücü arıyoruz.",
    responsibilities: [
      "Kullanıcıyı yormayan, 'premium' hissettiren arayüzler kodlamak.",
      "GSAP ve Framer Motion ile akışkan animasyonlar oluşturmak.",
      "Responsive tasarımı her cihazda kusursuz çalıştırmak.",
    ],
    expectations: [
      "Next.js ve Tailwind CSS ustalığı.",
      "GSAP kütüphanesine hakimiyet.",
      "Göz yormayan estetik bakış açısı.",
    ],
    customQuestion: "frontend_showcase",
    customQuestionLabel:
      "En çok gurur duyduğun projenin linki veya performans taktiğin?",
    customQuestionPlaceholder: "https://...",
  },
  {
    id: "3",
    slug: "visual-designer",
    title: "Görsel Tasarımcı & Art Director (2 Kişi)",
    subtitle: "Kovan'ın dijital kimliğini sen tasarla.",
    description:
      "Markanın logosundan ikonlarına, uygulama içi renk paletinden tipografisine kadar her şeyi sıfırdan yaratacak 2 vizyoner tasarımcı arıyoruz.",
    responsibilities: [
      "Marka kimliğini ve kurumsal görsel dili oluşturmak.",
      "Uygulama içi ikon ve illüstrasyon setleri hazırlamak.",
      "Sosyal medya için yüksek kaliteli görsel içerikler üretmek.",
    ],
    expectations: [
      "Figma ve Adobe Illustrator/Photoshop ustalığı.",
      "Minimalist ve modern tasarım çizgisi.",
      "Güçlü bir portfolyo.",
    ],
    customQuestion: "portfolio_link",
    customQuestionLabel: "Behance veya Dribbble portfolyonu buraya bırak.",
    customQuestionPlaceholder: "https://behance.net/...",
  },
  {
    id: "4",
    slug: "video-motion",
    title: "Video Designer (After Effects Master)",
    subtitle: "Videolarımıza ruh ve hareket kat.",
    description:
      "After Effects'i piyano gibi çalan, videolarımıza o 'pro' geçişleri ekleyecek, kurgu ve animasyon dehası birini arıyoruz.",
    responsibilities: [
      "Uygulama tanıtım videoları ve reklam filmleri kurgulamak.",
      "2D/3D motion graphics çalışmaları üretmek.",
      "Ham görüntüleri After Effects ile sanat eserine dönüştürmek.",
    ],
    expectations: [
      "After Effects ve Premiere Pro'da ileri seviye.",
      "Motion design trendlerine hakimiyet.",
      "Hızlı kurgu yeteneği.",
    ],
    customQuestion: "showreel",
    customQuestionLabel: "En iyi işlerinden oluşan showreel linkin?",
    customQuestionPlaceholder: "YouTube/Drive/Vimeo linki...",
  },
  {
    id: "5",
    slug: "brand-face",
    title: "Dijital İçerik Üreticisi (Reklam Yüzü)",
    subtitle: "KovanEats'in enerjisi sen ol.",
    description:
      "Kamera karşısında kasmayan, TikTok ve Reels dilini ana dili gibi bilen, enerjisiyle uygulamayı binlerce kişiye indirecek o starı arıyoruz.",
    responsibilities: [
      "Günlük viral Reels ve TikTok içerikleri üretmek.",
      "KovanEats topluluğu ile aktif etkileşim kurmak.",
      "Markayı canlı yayınlarda ve etkinliklerde temsil etmek.",
    ],
    expectations: [
      "Yüksek özgüven ve akıcı diksiyon.",
      "Video kurgu (CapCut vb.) ve trend bilgisi.",
      "Kamera önünde doğal ve enerjik olmak.",
    ],
    customQuestion: "social_media",
    customQuestionLabel:
      "Kamera önündeki enerjini görebileceğimiz bir profil linki (Instagram/TikTok)?",
    customQuestionPlaceholder: "@kullaniciadi",
  },
  {
    id: "6",
    slug: "growth-sales",
    title: "İş Geliştirme ve Saha Temsilcisi (6 Kişi)",
    subtitle: "Buzdolabını eskimoya satacak kadar iddialı mısın?",
    description:
      "Sahaya inecek, esnafı masaya oturtacak ve restoranları tek tek Kovan'a bağlayacak, ağzı iyi laf yapan 6 kaplan arıyoruz.",
    responsibilities: [
      "Restoran ve esnaf ziyaretleri yaparak iş ortaklığı kurmak.",
      "Müşteri bulma süreçlerini (Cold calling & Saha) yönetmek.",
      "Satış hedeflerini tutturmak ve bölge analizi yapmak.",
    ],
    expectations: [
      "Yüksek ikna kabiliyeti ve pes etmeyen yapı.",
      "Diksiyonu düzgün ve temsil yeteneği olan.",
      "Hedef odaklı çalışma disiplini.",
    ],
    customQuestion: "sales_pitch",
    customQuestionLabel:
      "Teknolojiye karşı olan bir esnafı ikna edecek ilk cümlen ne olurdu?",
    customQuestionPlaceholder: "Kısa bir cevap yaz kanka...",
  },
  {
    id: "7",
    slug: "marketing-strategist",
    title: "Dijital Pazarlama & Meta Ads Uzmanı",
    subtitle: "Algoritmaları Kovan için çalıştır.",
    description:
      "Meta (Instagram/Facebook) ve Google Ads'in algoritmasını çözmüş, kuruşu kuruşuna hedefleme yaparak bizi mahallenin en popüler uygulaması yapacak stratejist.",
    responsibilities: [
      "Reklam bütçesini yönetmek ve ROI/ROAS takibi yapmak.",
      "A/B testleri ile reklam kreatiflerini optimize etmek.",
      "Piksel kurulumu ve conversion tracking süreçlerini yönetmek.",
    ],
    expectations: [
      "Meta Ads Manager ve Google Ads ustalığı.",
      "Veri analitiği ve raporlama becerisi.",
      "Daha önce yönetilmiş başarılı reklam bütçeleri.",
    ],
    customQuestion: "ads_strategy",
    customQuestionLabel:
      "Elimizdeki kısıtlı bütçeyle en hızlı dönüşümü (conversion) hangi kanaldan alırdın?",
    customQuestionPlaceholder: "Stratejini kısaca anlat...",
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
