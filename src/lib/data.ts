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
    slug: "tech",
    title: "Tech",
    subtitle: "Sistemin kalbini inşa et.",
    description: "KovanEats'in altyapısını güçlendirecek, ölçeklenebilir ve modern yazılım çözümleri üretecek, yüksek trafikli anlarda bile sorunsuz çalışan bir ekosistem yaratacak yetenekler arıyoruz. Kod kalitesine önem veriyorsan ve modern teknolojilerle üretmek seni heyecanlandırıyorsa, tam yerindesin.",
    responsibilities: [
      "Modern teknolojiler (Next.js, Node.js) kullanarak web ve mobil uygulamalar geliştirmek.",
      "Yüksek performanslı, ölçeklenebilir ve güvenli kod yazmak.",
      "Mevcut sistemin performans iyileştirmelerini ve hata çözümlerini yapmak.",
      "Ürün ekibiyle birlikte çalışarak yeni özellikleri hayata geçirmek."
    ],
    expectations: [
      "Modern JavaScript/TypeScript ekosistemine hakimiyet.",
      "Problem çözme yeteneği ve analitik düşünce yapısı.",
      "Takım çalışmasına yatkınlık ve sürekli öğrenme motivasyonu."
    ],
    customQuestion: "github",
    customQuestionLabel: "GitHub Linkiniz",
    customQuestionPlaceholder: "https://github.com/kullaniciadiniz"
  },
  {
    id: "2",
    slug: "creative",
    title: "Creative",
    subtitle: "Görsel dünyamızı şekillendir.",
    description: "Kullanıcı deneyimini sanatla buluşturan, markamızın ruhunu yansıtacak yaratıcı fikirler üreten, estetik detaylara önem veren vizyoner takım arkadaşları arıyoruz. Tasarımın sadece görsel olmadığını, aynı zamanda bir iletişim aracı olduğuna inanıyorsan bekliyoruz.",
    responsibilities: [
      "Web ve mobil platformlar için kullanıcı dostu arayüzler tasarlamak (UI/UX).",
      "Sosyal medya ve pazarlama kampanyaları için görsel içerikler üretmek.",
      "Marka kimliğini koruyarak yaratıcı konseptler geliştirmek."
    ],
    expectations: [
      "Figma, Adobe Creative Suite programlarına hakimiyet.",
      "Estetik algısı yüksek ve trendleri takip eden biri olmak.",
      "Detaylara dikkat etmek ve kullanıcı odaklı düşünebilmek.",
      "Güçlü bir tasarım portfolyosu sunabilmek."
    ],
    customQuestion: "portfolio",
    customQuestionLabel: "Behance / Dribbble veya Portfolyo Linkiniz",
    customQuestionPlaceholder: "https://behance.net/kullaniciadiniz"
  },
  {
    id: "3",
    slug: "growth",
    title: "Growth",
    subtitle: "Sınırları zorla ve büyüt.",
    description: "Veri odaklı stratejilerle, kullanıcı tabanımızı hızla büyütecek, yenilikçi fikirleri test edecek ve KovanEats'in dijital dünyadaki varlığını en üst seviyeye taşıyacak Growth Hacker'lar arıyoruz. Büyüme senin için bir hedef değil, tutkuysa bize katıl.",
    responsibilities: [
      "Kullanıcı edinme ve elde tutma stratejileri geliştirmek.",
      "A/B testleri kurgulamak, metrikleri analiz etmek ve raporlamak.",
      "Yeni büyüme kanalları keşfetmek ve optimize etmek."
    ],
    expectations: [
      "Veri analizi araçlarına aşinalık.",
      "Hızlı test edebilen, analitik ve pragmatik bir yapıya sahip olmak.",
      "Growth hacking konseptine hakimiyet ve sonuç odaklılık."
    ],
    customQuestion: "growth_tactic",
    customQuestionLabel: "Bizi ilk 3 ayda nasıl büyütürdünüz? (Kısa İkna Taktiği)",
    customQuestionPlaceholder: "Örnek: Kampüslerde etkinlikler yaparak viral büyüme sağlardım."
  },
  {
    id: "4",
    slug: "marketing",
    title: "Marketing",
    subtitle: "Hikayemizi herkese duyur.",
    description: "Markamızın sesini en doğru şekilde hedef kitleye ulaştıracak, yaratıcı ve ölçülebilir pazarlama kampanyaları kurgulayacak, topluluğumuzu bir araya getirecek iletişim uzmanları arıyoruz. Trendleri sadece takip eden değil, trend yaratan olmak istiyorsan seni arıyoruz.",
    responsibilities: [
      "Sosyal medya platformlarını yönetmek ve içerik stratejileri oluşturmak.",
      "Marka bilinirliğini artıracak kampanyalar planlamak.",
      "İçerik takvimini oluşturmak ve metin yazarlığı süreçlerini yürütmek."
    ],
    expectations: [
      "Dijital pazarlama trendlerine ve sosyal medya dinamiklerine hakimiyet.",
      "Güçlü iletişim becerileri ve yaratıcı metin yazarlığı yeteneği.",
      "Kampanya yönetiminde tecrübe."
    ],
    customQuestion: "campaign",
    customQuestionLabel: "En sevdiğiniz sosyal medya kampanyası nedir ve neden?",
    customQuestionPlaceholder: "Örnek: X markasının kampanyası çünkü..."
  }
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
