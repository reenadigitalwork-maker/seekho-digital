/* =====================================================
   SEEKHO DIGITAL - assets/config.js
   Saari editable settings yahin hain. Naya page ya level
   add karna ho to sirf is file mein badlav karo.
   ===================================================== */
window.SEEKHO = {
  brand: "Seekho Digital",
  tagline: "Digital marketing, confusion se practical skills tak.",

  /* Header aur footer ke links. Har page par same rahenge. */
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Beginner Guide", href: "beginners-guide.html" },
    { label: "Roadmap", href: "roadmap.html" },
    { label: "Resources", href: "resources.html" },
    { label: "Projects", href: "projects.html" },
    { label: "Portfolio", href: "submission.html" },
    { label: "Improvement", href: "improvement.html" },
    { label: "FAQ", href: "faq.html" }
  ],

  /* 9 learning levels. "checks" = us level ki checklist mein kitne items honge.
     Phase 2 mein roadmap.html banate waqt yahi number rakhna. */
  levels: [
    { n: 1, title: "Digital Marketing Foundations", short: "Basics, terms aur sahi learning order.", checks: 5 },
    { n: 2, title: "Website and Landing Page Basics", short: "Website kaise kaam karti hai aur landing page kya hota hai.", checks: 5 },
    { n: 3, title: "Content Marketing and Copywriting", short: "Aisa content likhna jo log padhein aur samjhein.", checks: 5 },
    { n: 4, title: "Search Engine Optimization", short: "Google par page dhoondhne layak banana.", checks: 5 },
    { n: 5, title: "Social Media Marketing", short: "Content calendar aur platform ke hisaab se posting.", checks: 5 },
    { n: 6, title: "Email Marketing", short: "List, campaign plan aur email likhna.", checks: 5 },
    { n: 7, title: "Paid Advertising", short: "Ads ka logic, bina asli paisa lagaye simulation.", checks: 5 },
    { n: 8, title: "Analytics and Reporting", short: "Numbers padhna aur report banana.", checks: 5 },
    { n: 9, title: "Portfolio and Capstone Project", short: "Apna kaam ek case study mein dikhana.", checks: 5 }
  ],

  /* Progress sirf is browser/device ke localStorage mein save hota hai. */
  storageKey: "seekho-digital:progress:v1",

  /* Baad mein submission form ka link yahan daalna. Abhi khaali hai,
     isliye site koi fake upload nahi dikhati. */
  submissionFormUrl: "",

  /* Supabase ke liye jagah taiyar hai, par is release mein use nahi hota.
     Kabhi bhi password ya secret key yahan mat likhna. */
  supabase: { enabled: false, url: "", anonKey: "" }
};
