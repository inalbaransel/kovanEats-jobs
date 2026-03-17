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
    id: "8",
    slug: "mobile-developer",
    title: "Mobil Ürün ve Yazılım Mühendisi",
    subtitle:
      "KovanEats'in mobil dünyadaki yüzünü inşa edin ve kullanıcı deneyimini mobilde kusursuzlaştırın.",
    description:
      "KovanEats'in iOS ve Android uygulamalarını React Native kullanarak geliştirecek, harita servisleri ve gerçek zamanlı takip gibi kritik özellikleri hayata geçirecek yetenekli bir mobil mühendis arıyoruz.",
    responsibilities: [
      "React Native kullanarak yüksek performanslı ve akıcı mobil uygulamalar geliştirmek.",
      "Harita API'ları ve GPS servisleri sisteme entegre etmek.",
      "Push Notification ve gerçek zamanlı veri senkronizasyonu süreçlerini yönetmek.",
    ],
    expectations: [
      "React Native, TypeScript ve mobil ekosistem (XCode, Android Studio) konularında deneyim.",
      "Mobil uygulama yaşam döngüsü ve performans optimizasyonu hakkında derin bilgi.",
      "UI/UX prensiplerine sadık kalarak piksel hassasiyetinde uygulama geliştirme becerisi.",
    ],
    customQuestions: [
      {
        id: "mb_q1",
        label:
          "React Native ile geliştirdiğiniz en karmaşık uygulama ve karşılaştığınız en büyük zorluk neydi?",
        placeholder: "Proje detayları ve teknik zorluklar...",
      },
      {
        id: "mb_q2",
        label:
          "Harita entegrasyonu ve gerçek zamanlı lokasyon takibi konularındaki tecrübeniz nedir?",
        placeholder: "Kullandığınız kütüphaneler ve yaklaşımlar...",
      },
      {
        id: "mb_q3",
        label:
          "App Store ve Play Store yayınlama süreçlerindeki deneyiminizden bahseder misiniz?",
        placeholder:
          "Yayınlama süreci ve karşılaştığınız store politikaları...",
      },
      {
        id: "mb_q4",
        label:
          "Performans optimizasyonu (Bridge bottleneck, JS thread lag vb.) için hangi teknikleri kullanıyorsunuz?",
        placeholder: "Optimizasyon stratejileriniz...",
      },
      {
        id: "mb_q5",
        label:
          "Geliştirme süreçlerinizde hangi işletim sistemini kullanıyorsunuz? (macOS, Windows, Linux vb.)",
        placeholder: "macOS (M1/M2/M3), Windows vb...",
      },
    ],
  },
  {
    id: "5",
    slug: "brand-ambassador",
    title: "Marka Elçisi ve Yaratıcı İçerik Lideri",
    subtitle: "KovanEats markasının dijital yüzü olun.",
    description:
      "Marka değerlerimizi dijital platformlarda temsil edecek, yaratıcı içerik stratejileri geliştirecek ve topluluk etkileşimini yönetecek vizyoner bir iletişimci arıyoruz.",
    responsibilities: [
      "Kurumsal kimliğe uygun video ve dijital içerik stratejileri oluşturmak.",
      "Sosyal medya platformlarında (Reels, TikTok) marka bilinirliğini artırmak.",
      "KovanEats topluluğu ile profesyonel ve sürdürülebilir bir bağ kurmak.",
    ],
    expectations: [
      "Güçlü sunum becerisi ve etkili diksiyon.",
      "Dijital medya trendlerine hakimiyet ve içerik üretim tecrübesi.",
      "Kamera önünde profesyonel ve özgüvenli temsil yeteneği.",
    ],
    customQuestions: [
      {
        id: "bf_q1",
        label:
          "Kurumsal iletişim ve içerik üretimi konusundaki yetkinliğinizi nasıl değerlendirirsiniz? (1-10)",
        placeholder: "Tecrübelerinizden bahsedebilirsiniz...",
      },
      {
        id: "bf_q2",
        label:
          "Daha önce bir markayı temsil ettiğiniz veya içerik ürettiğiniz bir proje oldu mu?",
        placeholder: "Proje detaylarını paylaşabilirsiniz...",
      },
      {
        id: "bf_q3",
        label:
          "Dijital medya trendlerini takip etme ve uygulama yöntemleriniz nelerdir?",
        placeholder: "Kullandığınız araçlar ve takip ettiğiniz mecralar...",
      },
      {
        id: "bf_q4",
        label:
          "Temsil yeteneğinizi gösterdiğiniz bir sosyal medya hesabı veya portfolyo paylaşabilir misiniz?",
        placeholder: "@kullaniciadi veya link...",
      },
    ],
  },
  {
    id: "3",
    slug: "visual-identity-designer",
    title: "Kurumsal Kimlik ve Marka Tasarımcısı",
    subtitle:
      "Marka kimliğimizin görsel standartlarını ve tasarım dilini kurgulayın.",
    description:
      "Markamızın görsel standartlarını belirleyecek, kurumsal kimlik dokümantasyonunu oluşturacak ve tüm dijital kanallardaki tasarım dilini harmonize edecek yetkin tasarımcılar arıyoruz.",
    responsibilities: [
      "Marka kimlik rehberini (Brand Book) oluşturmak ve güncel tutmak.",
      "Uygulama içi görsel bileşenleri ve ikonografi setini tasarlamak.",
      "Pazarlama faaliyetleri için yüksek standartlı görsel materyaller üretmek.",
    ],
    expectations: [
      "Figma, Adobe Illustrator ve Photoshop uygulamalarında ileri seviye yetkinlik.",
      "Modern ve minimalist tasarım prensiplerine hakimiyet.",
      "Sistematik tasarım (Design Systems) süreçlerine aşinalık.",
    ],
    customQuestions: [
      {
        id: "vd_q1",
        label:
          "Tasarım süreçlerinizde hangi araçları ve metodolojileri kullanıyorsunuz?",
        placeholder: "İş akışınızdan bahsedebilirsiniz...",
      },
      {
        id: "vd_q2",
        label:
          "Daha önce kurumsal kimlik veya marka konumlandırma çalışması yaptınız mı?",
        placeholder: "Örnek çalışmalarınız...",
      },
      {
        id: "vd_q3",
        label:
          "Görsel trendleri profesyonel projelerinize nasıl entegre edersiniz?",
        placeholder: "Yaklaşımınızı açıklayabilirsiniz...",
      },
      {
        id: "vd_q4",
        label:
          "Portfolyonuzu (Behance, Dribbble vb.) bizimle paylaşabilir misiniz?",
        placeholder: "https://behance.net/...",
      },
    ],
  },
  {
    id: "4",
    slug: "video-motion-specialist",
    title: "Video Prodüksiyon ve Hareketli Grafik Uzmanı",
    subtitle:
      "Yaratıcı video prodüksiyonları ile marka hikayemizi dinamikleştirin.",
    description:
      "Tanıtım filmlerimizden sosyal medya içeriklerimize kadar tüm video süreçlerini yönetecek, profesyonel kurgu ve animasyon yeteneğine sahip bir uzman arıyoruz.",
    responsibilities: [
      "Kurumsal tanıtım videoları ve reklam materyallerinin prodüksiyonunu yönetmek.",
      "Motion Graphics çalışmaları ile statik içerikleri dinamikleştirmek.",
      "Video ve ses post-prodüksiyon süreçlerini en üst kalitede tamamlamak.",
    ],
    expectations: [
      "After Effects ve Premiere Pro programlarında profesyonel yetkinlik.",
      "Hareketli grafik trendlerini iş süreçlerine uygulama becerisi.",
      "Görsel hikaye anlatımı (Storytelling) konusunda deneyim.",
    ],
    customQuestions: [
      {
        id: "vm_q1",
        label:
          "After Effects ve Motion Design alanındaki profesyonel deneyiminiz ne kadar?",
        placeholder: "Yıllık tecrübeniz ve odaklandığınız alanlar...",
      },
      {
        id: "vm_q2",
        label:
          "Kurgu (Premiere) ve animasyon (AE) dengesini projelerinizde nasıl kuruyorsunuz?",
        placeholder: "Hangi alanda daha güçlü hissediyorsunuz?",
      },
      {
        id: "vm_q3",
        label:
          "Ses tasarımı ve efekt (SFX) kullanımının video kalitesindeki önemi size göre nedir?",
        placeholder: "Yaklaşımınızı paylaşın...",
      },
      {
        id: "vm_q4",
        label:
          "En son çalışmalarınızı içeren bir Showreel linki paylaşabilir misiniz?",
        placeholder: "Video/Drive linki...",
      },
    ],
  },
  {
    id: "6",
    slug: "strategic-partnership",
    title: "Stratejik Ortaklıklar ve Saha Operasyon Uzmanı",
    subtitle: "İş ortağı ağımızı genişleterek KovanEats'i büyütün.",
    description:
      "KovanEats'in büyüme stratejileri doğrultusunda restoran ve işletme ağımızı büyütecek, kurumsal temsil yeteneği yüksek saha uzmanları arıyoruz.",
    responsibilities: [
      "Potansiyel iş ortakları ile ticari görüşmeleri yönetmek ve anlaşmalar sağlamak.",
      "Saha operasyonlarını koordine ederek bölge bazlı pazar analizi yapmak.",
      "İş ortaklığı süreçlerinde müşteri memnuniyetini ve verimliliği takip etmek.",
    ],
    expectations: [
      "Yüksek ikna kabiliyeti ve sonuç odaklı çalışma disiplini.",
      "Temsil yeteneği güçlü ve profesyonel iletişim becerilerine sahip.",
      "Dinamik çalışma ortamına uyum sağlayabilen.",
    ],
    customQuestions: [
      {
        id: "gs_q1",
        label:
          "İletişim ve ikna becerilerinizi profesyonel bir örnekle açıklayabilir misiniz?",
        placeholder: "Başarı hikayenizden bahsedin...",
      },
      {
        id: "gs_q2",
        label: "Daha önce satış veya operasyonel bir süreçte görev aldınız mı?",
        placeholder: "İş deneyimleriniz...",
      },
      {
        id: "gs_q3",
        label:
          "Zorlu pazarlık süreçlerinde motivasyonunuzu nasıl yönetirsiniz?",
        placeholder: "Yaklaşımınız...",
      },
      {
        id: "gs_q4",
        label:
          "KovanEats operasyonel süreçlerine nasıl bir değer katmayı hedefliyorsunuz?",
        placeholder: "Hedefleriniz ve motivasyonunuz...",
      },
    ],
  },
  {
    id: "7",
    slug: "performance-marketing",
    title: "Performans Pazarlama ve Büyüme Analisti",
    subtitle: "Stratejilerle pazarlama performansını optimize edin.",
    description:
      "Dijital reklam kanallarını (Meta, Google) verimli kullanarak büyüme hedeflerimize katkı sağlayacak, veri analitiği odaklı bir pazarlama stratejisti arıyoruz.",
    responsibilities: [
      "Reklam bütçelerini yönetmek, ROI ve ROAS optimizasyonlarını gerçekleştirmek.",
      "A/B testleri ve veri analizleri ile pazarlama performansını artırmak.",
      "Dönüşüm hunisi (Conversion Funnel) takibi ve teknik entegrasyonları yönetmek.",
    ],
    expectations: [
      "Meta Ads Manager ve Google Ads platformlarında uzmanlık.",
      "Veri analitiği araçlarını (Google Analytics vb.) kullanabilme becerisi.",
      "Performans odaklı reklam kampanyaları yönetmiş olma tecrübesi.",
    ],
    customQuestions: [
      {
        id: "ms_q1",
        label:
          "Meta Ads veya Google Ads kullanarak yönettiğiniz bütçeler ve ulaştığınız sonuçlar nelerdir?",
        placeholder: "Metrikler üzerinden bilgi verebilirsiniz...",
      },
      {
        id: "ms_q2",
        label:
          "Teknik entegrasyonlar (Pixel, API, GTM) konusundaki yetkinliğiniz nedir?",
        placeholder: "Deneyimleriniz...",
      },
      {
        id: "ms_q3",
        label:
          "Veriye dayalı karar alma süreçlerinde hangi araçları tercih edersiniz?",
        placeholder: "Analiz yöntemleriniz...",
      },
      {
        id: "ms_q4",
        label:
          "Başarıyla sonuçlandırdığınız bir büyüme stratejisinden bahsedebilir misiniz?",
        placeholder: "Kampanya detayı...",
      },
    ],
  },
  {
    id: "2",
    slug: "frontend-engineer",
    title: "Frontend ve Arayüz Geliştiricisi",
    subtitle: "Webde KovanEats'i inşa edin.",
    description:
      "Next.js ve Tailwind CSS ekosisteminde, yüksek performanslı ve estetik arayüzler geliştirecek, animasyon ve etkileşim odaklı bir mühendis arıyoruz.",
    responsibilities: [
      "Görsel tasarımları yüksek hassasiyetle kodlamak ve optimize etmek.",
      "GSAP ve Framer Motion kullanarak akıcı kullanıcı deneyimleri oluşturmak.",
      "Modern web standartlarına uygun, responsive ve erişilebilir arayüzler geliştirmek.",
    ],
    expectations: [
      "Next.js, TypeScript ve Tailwind CSS teknolojilerinde yetkinlik.",
      "Modern animasyon kütüphanelerine (GSAP vb.) hakimiyet.",
      "Estetik bakış açısı ve detay odaklı çalışma disiplini.",
    ],
    customQuestions: [
      {
        id: "fe_q1",
        label:
          "Tasarım çıktılarını (Figma vb.) koda dönüştürürken nelere dikkat edersiniz?",
        placeholder: "İş akışınız ve hassasiyetleriniz...",
      },
      {
        id: "fe_q2",
        label:
          "Next.js ve Tailwind CSS konusundaki teknik seviyenizi nasıl tanımlarsınız?",
        placeholder: "Kullandığınız ileri seviye özellikler...",
      },
      {
        id: "fe_q3",
        label:
          "Etkileşimli web siteleri için kullandığınız animasyon kütüphaneleri ve teknikleri nelerdir?",
        placeholder: "GSAP, Framer Motion vb. deneyimleriniz...",
      },
      {
        id: "fe_q4",
        label:
          "Web performansını ve kullanıcı deneyimini artırmak için izlediğiniz yöntemler?",
        placeholder: "Optimizasyon yaklaşımlarınız...",
      },
    ],
  },
  {
    id: "1",
    slug: "backend-infrastructure",
    title: "Backend ve Altyapı Mimarı",
    subtitle: "Güçlü ve güvenli bir altyapı ile sistem mimarimizi kurgulayın.",
    description:
      "Sistem mimarimizi kurgulayacak, veri güvenliğini en üst düzeyde sağlayacak ve servislerimizin performanslı çalışmasından sorumlu olacak bir mimar arıyoruz.",
    responsibilities: [
      "Node.js tabanlı, ölçeklenebilir API mimarileri kurgulamak ve yönetmek.",
      "Veritabanı tasarımı, optimizasyonu ve veri güvenliği süreçlerini yürütmek.",
      "Sistem güvenliğini (Auth, Encryption) sağlamak ve olası tehditlere karşı önlem almak.",
    ],
    expectations: [
      "Node.js, PostgreSQL ve Prisma teknolojilerinde profesyonel deneyim.",
      "Güvenlik protokolleri (JWT, OAuth, Veri Şifreleme) konusunda derin bilgi.",
      "Sistematik kodlama ve performans odaklı mimari anlayışı.",
    ],
    customQuestions: [
      {
        id: "be_q1",
        label:
          "Geliştirdiğiniz API projelerinde hangi mimari yapıları ve kütüphaneleri tercih ediyorsunuz?",
        placeholder: "Express, NestJS vb. tecrübeniz...",
      },
      {
        id: "be_q2",
        label:
          "PostgreSQL ve Prisma ile gerçekleştirdiğiniz veri optimizasyonlarından bahseder misiniz?",
        placeholder: "Karmaşık sorgu veya mimari çözümleriniz...",
      },
      {
        id: "be_q3",
        label:
          "Bulut altyapı servisleri (AWS, Vercel, Hetzner) ve dağıtım süreçleri hakkındaki tecrübeniz?",
        placeholder: "Canlıya alma süreçleriniz...",
      },
      {
        id: "be_q4",
        label:
          "Container teknolojileri (Docker) veya sunucu yönetimi konusundaki yetkinliğiniz nedir?",
        placeholder: "(Ops) deneyimleriniz...",
      },
    ],
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
