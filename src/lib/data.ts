export type Question = {
  id: string;
  label: string;
  placeholder: string;
};

export type Job = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  expectations: string[];
  customQuestions: Question[];
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
    customQuestions: [
      {
        id: "be_q1",
        label:
          "Node.js ile hiç REST API geliştirdin mi? Hangi kütüphaneleri kullandın? (Express, NestJS vb.)",
        placeholder: "Evet/Hayır. Express/NestJS kullandım...",
      },
      {
        id: "be_q2",
        label: "Daha önce hiç PostgreSQL ve Prisma ikilisiyle çalıştın mı?",
        placeholder: "Evet/Hayır. Şu projede kullandım...",
      },
      {
        id: "be_q3",
        label:
          "Projelerini canlıya alırken hiç Hetzner, AWS veya Vercel gibi platformları kullandın mı?",
        placeholder: "Evet, Vercel/Hetzner kullandım...",
      },
      {
        id: "be_q4",
        label:
          "Docker veya basit sunucu yönetimi (Ubuntu/Nginx) hakkında bilgin var mı?",
        placeholder: "Evet, Docker kullanabiliyorum...",
      },
    ],
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
    customQuestions: [
      {
        id: "fe_q1",
        label:
          "Hiç Figma/Adobe XD tasarımını birebir kodladığın bir projen oldu mu?",
        placeholder: "Evet, pixel-perfect çalışma tecrübem var...",
      },
      {
        id: "fe_q2",
        label:
          "Next.js ve Tailwind CSS ikilisine ne kadar hakimsin? (1-10 arası puanla)",
        placeholder: "10 üzerinden 8 diyebilirim...",
      },
      {
        id: "fe_q3",
        label:
          "Basit animasyonlar için hiç GSAP veya Framer Motion kullandın mı?",
        placeholder: "Evet/Hayır. Framer Motion kullandım...",
      },
      {
        id: "fe_q4",
        label:
          "Kullanıcının mobil ve web deneyimi arasındaki farklara ne kadar dikkat edersin?",
        placeholder: "Responsive tasarıma çok önem veririm...",
      },
    ],
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
    customQuestions: [
      {
        id: "vd_q1",
        label:
          "Tasarım süreçlerinde ağırlıklı olarak hangi araçları (Figma, Adobe vb.) kullanıyorsun?",
        placeholder: "Genelde Figma ve Illustrator kullanıyorum...",
      },
      {
        id: "vd_q2",
        label:
          "Daha önce hiç sıfırdan bir marka logosu veya kurumsal kimlik tasarladın mı?",
        placeholder: "Evet, birkaç marka için logo tasarımı yaptım...",
      },
      {
        id: "vd_q3",
        label:
          "Sosyal medya içeriği tasarlarken trendleri nasıl takip edersin?",
        placeholder: "Behance ve Pinterest üzerinden takip ediyorum...",
      },
      {
        id: "vd_q4",
        label:
          "İnceleyebileceğimiz bir Behance/Dribbble linki bırakabilir misin?",
        placeholder: "https://behance.net/...",
      },
    ],
  },
  {
    id: "4",
    slug: "video-motion",
    title: "Video Designer",
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
    customQuestions: [
      {
        id: "vm_q1",
        label:
          "After Effects'te motion grafik yapma konusunda ne kadar tecrübelisin?",
        placeholder: "2 yıldır After Effects ile çalışıyorum...",
      },
      {
        id: "vm_q2",
        label:
          "Daha çok kurgu mu (Premiere) yoksa animasyon mu (AE) tarafını seviyorsun?",
        placeholder: "Animasyon tarafı daha ağır basıyor...",
      },
      {
        id: "vm_q3",
        label:
          "Bir videoya ses efekti (SFX) ekleme konusunda ne kadar dikkatlisin?",
        placeholder: "Videonun ruhu sestir, çok dikkat ederim...",
      },
      {
        id: "vm_q4",
        label: "En son hazırladığın bir işin (Showreel) veya portfolyo linkin?",
        placeholder: "YouTube/Drive linki...",
      },
    ],
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
    customQuestions: [
      {
        id: "bf_q1",
        label:
          "Kamera karşısında konuşma ve içerik üretme konusunda kendine ne kadar güveniyorsun? (1-10 arası)",
        placeholder: "10 üzerinden 9 diyebilirim...",
      },
      {
        id: "bf_q2",
        label:
          "Daha önce TikTok veya Reels için hiç içerik çektin mi? Kendi kurgunu yapabilir misin?",
        placeholder: "Evet, CapCut ile kurgularımı yaparım...",
      },
      {
        id: "bf_q3",
        label: "Sosyal medyadaki güncel trendleri ne sıklıkla takip ediyorsun?",
        placeholder: "Her gün düzenli takip ediyorum...",
      },
      {
        id: "bf_q4",
        label:
          "Senin göründüğün örnek bir sosyal medya hesabın veya video linkin?",
        placeholder: "@kullaniciadi",
      },
    ],
  },
  {
    id: "6",
    slug: "growth-sales",
    title: "İş Geliştirme ve Saha Temsilcisi (4 Kişi)",
    subtitle: "Buzdolabını eskimoya satacak kadar iddialı mısın?",
    description:
      "Sahaya inecek, esnafı masaya oturtacak ve restoranları tek tek Kovan'a bağlayacak, ağzı iyi laf yapan 4 kaplan arıyoruz.",
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
    customQuestions: [
      {
        id: "gs_q1",
        label: "İnsanları ikna etme kabiliyetine 10 üzerinden kaç verirsin?",
        placeholder: "10 üzerinden 9...",
      },
      {
        id: "gs_q2",
        label: "Daha önce hiç satış, anket veya saha çalışması yaptın mı?",
        placeholder: "Evet, daha önce anket çalışması yapmıştım...",
      },
      {
        id: "gs_q3",
        label: "Reddedildiğinde motivasyonunu nasıl korursun?",
        placeholder: "Hemen bir sonrakine odaklanırım...",
      },
      {
        id: "gs_q4",
        label: "Neden KovanEats ekibinde yer almak istiyorsun?",
        placeholder: "Büyüyen bir startup'ın parçası olmak istiyorum...",
      },
    ],
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
    customQuestions: [
      {
        id: "ms_q1",
        label:
          "Daha önce Facebook/Instagram üzerinden hiç reklam yönetimi yaptın mı?",
        placeholder: "Evet, Meta Ads Manager kullandım...",
      },
      {
        id: "ms_q2",
        label:
          "Google Analytics veya piksel kurulumu gibi teknik terimlere ne kadar hakimsin?",
        placeholder: "Evet, piksel kurabiliyorum...",
      },
      {
        id: "ms_q3",
        label:
          "Reklam bütçesini en verimli şekilde kullanmak senin için ne ifade ediyor?",
        placeholder: "Düşük maliyetle yüksek dönüşüm odaklıyım...",
      },
      {
        id: "ms_q4",
        label:
          "Hiç başarılı bir reklam kampanyanı veya sonucunu bizimle paylaşabilir misin?",
        placeholder: "Evet, şu projede ROAS değerini 4 yaptım...",
      },
    ],
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
