export type Question = {
  id: string;
  label: string;
  placeholder: string;
};

export type JobContent = {
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  expectations: string[];
  customQuestions: Question[];
};

export type Job = JobContent & {
  id: string;
  slug: string;
  en: JobContent;
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
    en: {
      title: "Mobile Product & Software Engineer",
      subtitle:
        "Build KovanEats' mobile presence and perfect the user experience on mobile.",
      description:
        "We're looking for a talented mobile engineer who will develop KovanEats' iOS and Android applications using React Native and bring critical features like map services and real-time tracking to life.",
      responsibilities: [
        "Develop high-performance and smooth mobile applications using React Native.",
        "Integrate map APIs and GPS services into the system.",
        "Manage Push Notification and real-time data synchronization processes.",
      ],
      expectations: [
        "Experience with React Native, TypeScript, and the mobile ecosystem (Xcode, Android Studio).",
        "Deep knowledge of the mobile application lifecycle and performance optimization.",
        "Ability to develop pixel-perfect applications while adhering to UI/UX principles.",
      ],
      customQuestions: [
        {
          id: "mb_q1",
          label:
            "What was the most complex application you developed with React Native and the biggest challenge you faced?",
          placeholder: "Project details and technical challenges...",
        },
        {
          id: "mb_q2",
          label:
            "What is your experience with map integration and real-time location tracking?",
          placeholder: "Libraries and approaches you used...",
        },
        {
          id: "mb_q3",
          label:
            "Can you tell us about your experience in the App Store and Play Store submission process?",
          placeholder: "Publishing process and store policies you encountered...",
        },
        {
          id: "mb_q4",
          label:
            "What techniques do you use for performance optimization (Bridge bottleneck, JS thread lag, etc.)?",
          placeholder: "Your optimization strategies...",
        },
        {
          id: "mb_q5",
          label:
            "What operating system do you use in your development process? (macOS, Windows, Linux, etc.)",
          placeholder: "macOS (M1/M2/M3), Windows, etc...",
        },
      ],
    },
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
    en: {
      title: "Brand Ambassador & Creative Content Leader",
      subtitle: "Be the digital face of the KovanEats brand.",
      description:
        "We're looking for a visionary communicator who will represent our brand values on digital platforms, develop creative content strategies, and manage community engagement.",
      responsibilities: [
        "Create video and digital content strategies aligned with corporate identity.",
        "Increase brand awareness on social media platforms (Reels, TikTok).",
        "Build a professional and sustainable connection with the KovanEats community.",
      ],
      expectations: [
        "Strong presentation skills and effective diction.",
        "Command of digital media trends and content production experience.",
        "Professional and confident representation ability in front of the camera.",
      ],
      customQuestions: [
        {
          id: "bf_q1",
          label:
            "How would you rate your competency in corporate communication and content production? (1-10)",
          placeholder: "You can talk about your experiences...",
        },
        {
          id: "bf_q2",
          label:
            "Have you had a project where you represented a brand or produced content?",
          placeholder: "You can share project details...",
        },
        {
          id: "bf_q3",
          label:
            "What are your methods for following and applying digital media trends?",
          placeholder: "Tools you use and channels you follow...",
        },
        {
          id: "bf_q4",
          label:
            "Can you share a social media account or portfolio that demonstrates your representation ability?",
          placeholder: "@username or link...",
        },
      ],
    },
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
    en: {
      title: "Visual Identity & Brand Designer",
      subtitle:
        "Shape the visual standards and design language of our brand identity.",
      description:
        "We're looking for skilled designers who will define the visual standards of our brand, create corporate identity documentation, and harmonize the design language across all digital channels.",
      responsibilities: [
        "Create and maintain the brand identity guide (Brand Book).",
        "Design in-app visual components and iconography sets.",
        "Produce high-standard visual materials for marketing activities.",
      ],
      expectations: [
        "Advanced proficiency in Figma, Adobe Illustrator, and Photoshop.",
        "Command of modern and minimalist design principles.",
        "Familiarity with systematic design (Design Systems) processes.",
      ],
      customQuestions: [
        {
          id: "vd_q1",
          label: "What tools and methodologies do you use in your design process?",
          placeholder: "Tell us about your workflow...",
        },
        {
          id: "vd_q2",
          label:
            "Have you worked on corporate identity or brand positioning projects before?",
          placeholder: "Your sample projects...",
        },
        {
          id: "vd_q3",
          label:
            "How do you integrate visual trends into your professional projects?",
          placeholder: "You can explain your approach...",
        },
        {
          id: "vd_q4",
          label:
            "Can you share your portfolio (Behance, Dribbble, etc.) with us?",
          placeholder: "https://behance.net/...",
        },
      ],
    },
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
    en: {
      title: "Video Production & Motion Graphics Specialist",
      subtitle: "Bring our brand story to life with creative video productions.",
      description:
        "We're looking for a specialist with professional editing and animation skills to manage all video processes, from promotional films to social media content.",
      responsibilities: [
        "Manage the production of corporate promotional videos and advertising materials.",
        "Bring static content to life with Motion Graphics work.",
        "Complete video and audio post-production processes at the highest quality.",
      ],
      expectations: [
        "Professional proficiency in After Effects and Premiere Pro.",
        "Ability to apply motion graphics trends to work processes.",
        "Experience in visual storytelling.",
      ],
      customQuestions: [
        {
          id: "vm_q1",
          label:
            "How much professional experience do you have in After Effects and Motion Design?",
          placeholder: "Years of experience and areas of focus...",
        },
        {
          id: "vm_q2",
          label:
            "How do you balance editing (Premiere) and animation (AE) in your projects?",
          placeholder: "Which area do you feel stronger in?",
        },
        {
          id: "vm_q3",
          label:
            "In your view, what is the importance of sound design and SFX in video quality?",
          placeholder: "Share your approach...",
        },
        {
          id: "vm_q4",
          label: "Can you share a Showreel link containing your latest work?",
          placeholder: "Video/Drive link...",
        },
      ],
    },
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
    en: {
      title: "Strategic Partnerships & Field Operations Specialist",
      subtitle: "Grow KovanEats by expanding our partner network.",
      description:
        "We're looking for field specialists with strong corporate representation skills to grow our restaurant and business network in line with KovanEats' growth strategies.",
      responsibilities: [
        "Manage commercial negotiations with potential business partners and secure deals.",
        "Coordinate field operations and conduct region-based market analysis.",
        "Track customer satisfaction and efficiency in partnership processes.",
      ],
      expectations: [
        "High persuasion ability and result-oriented work discipline.",
        "Strong representation skills and professional communication abilities.",
        "Ability to adapt to a dynamic work environment.",
      ],
      customQuestions: [
        {
          id: "gs_q1",
          label:
            "Can you explain your communication and persuasion skills with a professional example?",
          placeholder: "Tell us about your success story...",
        },
        {
          id: "gs_q2",
          label:
            "Have you previously taken a role in a sales or operational process?",
          placeholder: "Your work experiences...",
        },
        {
          id: "gs_q3",
          label:
            "How do you manage your motivation during difficult negotiation processes?",
          placeholder: "Your approach...",
        },
        {
          id: "gs_q4",
          label:
            "What value do you aim to bring to KovanEats operational processes?",
          placeholder: "Your goals and motivation...",
        },
      ],
    },
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
    en: {
      title: "Performance Marketing & Growth Analyst",
      subtitle: "Optimize marketing performance with data-driven strategies.",
      description:
        "We're looking for a data analytics-focused marketing strategist who will effectively use digital advertising channels (Meta, Google) to contribute to our growth goals.",
      responsibilities: [
        "Manage advertising budgets and perform ROI and ROAS optimizations.",
        "Improve marketing performance through A/B testing and data analysis.",
        "Manage Conversion Funnel tracking and technical integrations.",
      ],
      expectations: [
        "Expertise in Meta Ads Manager and Google Ads platforms.",
        "Ability to use data analytics tools (Google Analytics, etc.).",
        "Experience managing performance-oriented advertising campaigns.",
      ],
      customQuestions: [
        {
          id: "ms_q1",
          label:
            "What budgets have you managed using Meta Ads or Google Ads and what results have you achieved?",
          placeholder: "You can provide information through metrics...",
        },
        {
          id: "ms_q2",
          label:
            "What is your proficiency with technical integrations (Pixel, API, GTM)?",
          placeholder: "Your experiences...",
        },
        {
          id: "ms_q3",
          label:
            "What tools do you prefer in data-driven decision-making processes?",
          placeholder: "Your analysis methods...",
        },
        {
          id: "ms_q4",
          label:
            "Can you tell us about a growth strategy you successfully executed?",
          placeholder: "Campaign details...",
        },
      ],
    },
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
    en: {
      title: "Frontend & UI Developer",
      subtitle: "Build KovanEats on the web.",
      description:
        "We're looking for a performance and aesthetics-driven engineer to build high-quality interfaces in the Next.js and Tailwind CSS ecosystem, with a focus on animation and interaction.",
      responsibilities: [
        "Translate visual designs into high-fidelity code with precision and optimization.",
        "Create smooth user experiences using GSAP and Framer Motion.",
        "Develop responsive and accessible interfaces compliant with modern web standards.",
      ],
      expectations: [
        "Proficiency in Next.js, TypeScript, and Tailwind CSS.",
        "Command of modern animation libraries (GSAP, etc.).",
        "Aesthetic sensibility and detail-oriented work discipline.",
      ],
      customQuestions: [
        {
          id: "fe_q1",
          label:
            "What do you focus on when converting design outputs (Figma, etc.) into code?",
          placeholder: "Your workflow and sensitivities...",
        },
        {
          id: "fe_q2",
          label:
            "How would you describe your technical level in Next.js and Tailwind CSS?",
          placeholder: "Advanced features you utilize...",
        },
        {
          id: "fe_q3",
          label:
            "What animation libraries and techniques do you use for interactive websites?",
          placeholder: "GSAP, Framer Motion, etc. experiences...",
        },
        {
          id: "fe_q4",
          label:
            "What methods do you follow to improve web performance and user experience?",
          placeholder: "Your optimization approaches...",
        },
      ],
    },
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
    en: {
      title: "Backend & Infrastructure Architect",
      subtitle:
        "Design a powerful and secure infrastructure for our system architecture.",
      description:
        "We're looking for an architect who will design our system architecture, ensure the highest level of data security, and be responsible for our services running at peak performance.",
      responsibilities: [
        "Design and manage scalable API architectures based on Node.js.",
        "Conduct database design, optimization, and data security processes.",
        "Ensure system security (Auth, Encryption) and take preventive measures against potential threats.",
      ],
      expectations: [
        "Professional experience with Node.js, PostgreSQL, and Prisma technologies.",
        "Deep knowledge of security protocols (JWT, OAuth, Data Encryption).",
        "Systematic coding and performance-oriented architectural mindset.",
      ],
      customQuestions: [
        {
          id: "be_q1",
          label:
            "What architectural structures and libraries do you prefer in your API projects?",
          placeholder: "Express, NestJS, etc. experience...",
        },
        {
          id: "be_q2",
          label:
            "Can you tell us about data optimizations you've implemented with PostgreSQL and Prisma?",
          placeholder: "Complex queries or architectural solutions...",
        },
        {
          id: "be_q3",
          label:
            "What is your experience with cloud infrastructure services (AWS, Vercel, Hetzner) and deployment processes?",
          placeholder: "Your go-live processes...",
        },
        {
          id: "be_q4",
          label:
            "What is your proficiency with container technologies (Docker) or server management?",
          placeholder: "(Ops) experiences...",
        },
      ],
    },
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}

export function getLocalizedJob(job: Job, lang: "TR" | "EN"): JobContent & Pick<Job, "id" | "slug" | "en"> {
  if (lang === "EN") {
    return { ...job, ...job.en };
  }
  return job;
}
