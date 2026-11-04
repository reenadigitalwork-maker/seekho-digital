/* =====================================================
   SEEKHO DIGITAL - assets/roadmap.js
   Upar LEVELS mein content hai (edit karna aasan).
   Neeche renderer hai. Har level ki checklist mein
   EXACTLY 5 items rakho (config.js ke "checks" se match).
   ===================================================== */
(function () {
  "use strict";

  var G = { n: "Google Skillshop", u: "https://skillshop.withgoogle.com/" };
  var H = { n: "HubSpot Academy", u: "https://academy.hubspot.com/" };
  var M = { n: "Meta Blueprint", u: "https://www.facebook.com/business/learn" };
  var S = { n: "Semrush Academy", u: "https://www.semrush.com/academy/" };
  var SC = { n: "Google Search Central", u: "https://developers.google.com/search" };
  var GSC = { n: "Google Search Console", u: "https://search.google.com/search-console" };
  var GT = { n: "Google Trends", u: "https://trends.google.com/" };

  var LEVELS = [
    {
      learn: ["Digital marketing kya hai aur uske main channels", "Organic aur paid ka fark", "Basic terms: traffic, lead, conversion, CTR"],
      why: "Basics ke bina tools seekhna sirf rattna ban jata hai. Pehle samjho, phir karo.",
      pre: "Koi nahi. Ek phone ya laptop aur internet kaafi hai.",
      res: [{ n: "Seekho Digital Beginner Guide", u: "beginners-guide.html", int: true }, H, G],
      steps: [
        "Beginner Guide poora padho.",
        "Google Docs mein ek fictional business chuno (naam, kya bechta hai, kis sheher mein).",
        "Chhe channels mein se 3 chuno aur ek-ek line likho ki us business ko wo kyun chahiye.",
        "10 terms apne shabdon mein likho. Copy-paste mat karo.",
        "Doc ko save karke naam rakho, jaise Level1-Foundations."
      ],
      out: "Ek Google Doc: fictional business, 3 channels ke reason aur 10 terms ki apni definition.",
      mistakes: ["Ek saath saare tools seekhna shuru kar dena.", "Terms ko bina samjhe yaad karna.", "Practice ke liye asli business par paisa lagana."],
      check: ["Beginner Guide poora padha", "Fictional business chuna", "3 channels ke reason likhe", "10 terms apne shabdon mein likhe", "Doc save kiya"],
      next: "Level 2: Website and Landing Page Basics"
    },
    {
      learn: ["Website ke hisse: header, content, CTA, footer", "Landing page kya hota hai aur uska ek goal", "Mobile par page kaisa dikhna chahiye"],
      why: "Aapki saari marketing kisi na kisi page par aati hai. Kharab page par aaya visitor wapas chala jata hai.",
      pre: "Level 1 poora.",
      res: [H, SC],
      steps: [
        "Kisi bhi 3 websites ke landing page dekho. Likho kaun sa clear laga aur kaun sa confusing.",
        "Apne fictional business ke liye ek page ka wireframe banao (kaagaz par ya Google Slides mein).",
        "Ek headline, 3 benefits aur ek CTA likho.",
        "Wireframe ko phone ki chhoti screen ke hisaab se dekho. Kya sab padha ja sakta hai?",
        "Chahein to simple HTML page bana lo (optional)."
      ],
      out: "Ek wireframe aur landing page ka copy: headline, 3 benefits, 1 CTA.",
      mistakes: ["Ek page par 4-5 alag CTA daalna.", "Bahut lambi headline likhna.", "Mobile ko bhool jana."],
      check: ["3 landing pages dekhe", "Wireframe banaya", "Headline, benefits aur CTA likhe", "Mobile ke hisaab se check kiya", "File save ki"],
      next: "Level 3: Content Marketing and Copywriting"
    },
    {
      learn: ["Audience kaun hai aur use kya chahiye", "Feature aur benefit ka fark", "Headline, blog ka structure aur CTA likhna"],
      why: "Achha content logon ke sawalon ka jawab deta hai. Wahi baad mein SEO, social aur email sab mein kaam aata hai.",
      pre: "Level 1 aur 2 poore.",
      res: [H],
      steps: [
        "Apne fictional business ka ek buyer persona likho: umar, kaam, dikkat, zaroorat.",
        "Us persona ke 5 sawal likho jo wo Google par poochh sakta hai.",
        "Ek sawal chuno aur uska blog draft likho. Apne shabdon mein.",
        "Headline ke 3 alag versions likho aur ek chuno.",
        "Draft ko dobara padho aur mushkil shabd aasan karo."
      ],
      out: "Ek persona, 5 blog topic ideas aur ek poora blog draft.",
      mistakes: ["Kisi aur ka content copy karna.", "Sirf features gina dena, benefit na batana.", "Zyada technical shabd use karna."],
      check: ["Buyer persona likha", "5 sawal likhe", "Blog draft poora kiya", "Headline ke 3 versions likhe", "Draft dobara padh kar sudhaara"],
      next: "Level 4: Search Engine Optimization"
    },
    {
      learn: ["Keyword aur search intent", "On-page SEO: title, meta description, headings, URL", "Google Search Console kya dikhata hai"],
      why: "SEO se aapka content sahi logon ko Google par dikh sakta hai. Ranking ki guarantee koi nahi de sakta, par sahi tareeke se chance badhta hai.",
      pre: "Level 3 ka blog draft.",
      res: [SC, GSC, GT, S],
      steps: [
        "Google Trends aur Google ke search suggestions se 10 keywords ek sheet mein likho.",
        "Har keyword ke saamne likho ki search karne wala kya chahta hai (jaankari, kharidari ya kuch aur).",
        "Ek page ke liye ek mukhya keyword chuno.",
        "Apne blog ke liye title, meta description, ek H1 aur do H2 likho.",
        "Search Console ki official help padho. Agar aapki apni site hai to use verify karke dekho."
      ],
      out: "Ek keyword sheet aur ek blog page jisme title, meta description aur headings theek hon.",
      mistakes: ["Keyword ko baar-baar zabardasti dohrana.", "Search intent ko ignore karna.", "Jaldi ranking milne ka wada karna."],
      check: ["10 keywords likhe", "Intent likha", "Ek mukhya keyword chuna", "Title, meta aur headings likhe", "Search Console ki help padhi"],
      next: "Level 5: Social Media Marketing"
    },
    {
      learn: ["Platform ke hisaab se content", "Content pillars (3-4 mukhya vishay)", "Content calendar banana"],
      why: "Social media par regular aur planned posting se log aapko pehchanne lagte hain. Bina plan ke posting jaldi ruk jati hai.",
      pre: "Level 3 ka persona.",
      res: [M, H],
      steps: [
        "Persona ke hisaab se 1 ya 2 platform chuno. Sab par ek saath mat jao.",
        "3 content pillars likho, jaise sikhane wala, behind-the-scenes, sawal-jawab.",
        "Google Sheet mein 14 din ka calendar banao: tareekh, pillar, idea, caption.",
        "Teen posts ke caption aur design idea likho.",
        "Dekho har post ka ek saaf maqsad hai ya nahi."
      ],
      out: "14 din ka content calendar (Google Sheet) aur 3 post drafts.",
      mistakes: ["Har platform par ek saath aana.", "Roz ek hi type ki post daalna.", "Bina maqsad ke post karna."],
      check: ["Platform chune", "3 pillars likhe", "14 din ka calendar banaya", "3 post drafts likhe", "Har post ka maqsad check kiya"],
      next: "Level 6: Email Marketing"
    },
    {
      learn: ["Permission-based email list", "Welcome email aur subject line", "Ek email campaign ka plan"],
      why: "Email se aap un logon se seedha baat karte ho jinhone khud interest dikhaya hai.",
      pre: "Level 3 ka content.",
      res: [H],
      steps: [
        "Likho ki aapki fictional list mein log kaise judenge (form, signup).",
        "Ek welcome email likho: kaun ho, kya milega, ek CTA.",
        "Subject line ke 3 versions likho.",
        "Ek 3-email campaign ka plan banao: kis din kya bhejna hai.",
        "Ye emails kisi asli ajnabi ko mat bhejo. Sirf draft rakho."
      ],
      out: "Ek campaign plan aur 3 email drafts.",
      mistakes: ["Bina permission ke emails bhejna.", "Subject line bahut bhadkau ya jhootha rakhna.", "Ek email mein kai CTA daalna."],
      check: ["List kaise banegi likha", "Welcome email likha", "Subject line ke 3 versions likhe", "3-email plan banaya", "Drafts save kiye"],
      next: "Level 7: Paid Advertising"
    },
    {
      learn: ["Campaign, ad group aur ad ka structure", "Audience, budget aur targeting", "CTR aur CPC ko samajhna"],
      why: "Ads se tez reach mil sakti hai, par galat setup mein paisa jaldi khatam hota hai. Isliye pehle simulation.",
      pre: "Level 1 se 4 poore.",
      res: [G, M],
      steps: [
        "Fictional business ke liye ek ad ka goal likho.",
        "Google Sheet mein ek simulation banao: budget, impressions, clicks, CTR, CPC.",
        "Har numeric column ke upar likho: SIMULATED (kalpanik data).",
        "2 alag ad copies likho aur batao kaun behtar ho sakti hai aur kyun.",
        "Official course padho, par practice mein asli ad par paisa mat lagao."
      ],
      out: "Ek ad plan aur ek simulation sheet jisme saara data SIMULATED likha ho.",
      mistakes: ["Practice ke liye asli paisa lagana.", "Targeting bahut bada rakhna.", "Sirf ek ad copy banana."],
      check: ["Ad ka goal likha", "Simulation sheet banayi", "Data par SIMULATED likha", "2 ad copies likhi", "Asli paisa kharch nahi kiya"],
      next: "Level 8: Analytics and Reporting"
    },
    {
      learn: ["Sessions, clicks aur conversions", "Numbers se insight nikalna", "Simple report likhna"],
      why: "Numbers batate hain kya kaam kar raha hai. Bina analytics ke aap sirf andaza lagate ho.",
      pre: "Level 4, 5 ya 7 ka koi ek project.",
      res: [G, GSC, GT],
      steps: [
        "Ek sheet banao jisme practice data ho aur uspar SIMULATED likha ho.",
        "Teen numbers chuno jo aapke goal se jude hain.",
        "Har number ke baare mein ek insight likho: kya dikha aur uska matlab kya hai.",
        "Teen agle kadam likho jo aap in numbers ke baad loge.",
        "Report ko ek page mein likho."
      ],
      out: "Ek 1-page analytics report: goal, numbers, insight aur agle kadam.",
      mistakes: ["Sirf numbers dikhana, matlab na batana.", "Sirf bade numbers par khush hona jo goal se nahi jude.", "Simulated data ko asli batana."],
      check: ["Practice data banaya", "3 numbers chune", "Har number ka insight likha", "3 agle kadam likhe", "1-page report tayyar ki"],
      next: "Level 9: Portfolio and Capstone Project"
    },
    {
      learn: ["Apne kaam ko case study mein likhna", "Evidence aur screenshots jodna", "Google Drive folder aur view-only link"],
      why: "Portfolio mein aapka asli kaam dikhta hai. Isi se koi bhi dekh sakta hai ki aapne kya kiya.",
      pre: "Kam se kam 3 poore kiye hue projects.",
      res: [{ n: "Submission aur Portfolio page", u: "submission.html", int: true }],
      steps: [
        "Apne saare outputs ek Google Drive folder mein ikattha karo.",
        "Ek capstone chuno: ek fictional business, jisme research se report tak sab ho.",
        "Case study likho: maqsad, kya kiya, kya galat hua, kaise sudhaara, natija.",
        "Screenshots aur files jodo. Har screenshot ke saath ek line likho.",
        "Drive link ko view-only share karke dusre device par khol kar check karo."
      ],
      out: "Ek capstone case study aur ek organised Drive folder ka view-only link.",
      mistakes: ["Galtiyan chhupana. Unhe likhna aapki takat hai.", "Bina screenshot ya saboot ke case study.", "Link ko edit access ke saath share karna."],
      check: ["Outputs ek folder mein rakhe", "Capstone chuna", "Case study likhi", "Screenshots jode", "View-only link check kiya"],
      next: "Improvement page: galtiyon se seekhne ka process"
    }
  ];

  var C = window.SEEKHO, App = window.SeekhoApp, host = document.getElementById("levels");
  if (!C || !App || !host) return;

  function li(a) { return a.map(function (t) { return "<li>" + t + "</li>"; }).join(""); }
  function links(a) {
    return a.map(function (r) {
      var ext = r.int ? "" : ' target="_blank" rel="noopener noreferrer"';
      return '<li><a href="' + r.u + '"' + ext + ">" + r.n + (r.int ? "" : " (official)") + "</a></li>";
    }).join("");
  }

  host.innerHTML = LEVELS.map(function (d, i) {
    var n = i + 1, cfg = C.levels[i];
    var boxes = d.check.map(function (t, k) {
      var id = "L" + n + "-" + (k + 1);
      return '<li><label><input type="checkbox" data-key="' + id + '"><span>' + t + "</span></label></li>";
    }).join("");
    return '<details class="mod" id="level-' + n + '" data-level="' + n + '">' +
      '<summary><span class="lvl-n">' + n + '</span><span class="m-title">' + cfg.title + '<span class="m-sub">' + cfg.short + '</span></span><span class="m-pct" data-pct>0%</span></summary>' +
      '<div class="body">' +
      "<h4>Kya seekhna hai</h4><ul>" + li(d.learn) + "</ul>" +
      "<h4>Ye kyun zaroori hai</h4><p>" + d.why + "</p>" +
      "<h4>Pehle kya aana chahiye</h4><p>" + d.pre + "</p>" +
      '<h4>Bharosemand resources</h4><ul class="links">' + links(d.res) + '</ul><p style="margin-top:8px;font-size:.9rem;color:var(--muted)">Fee, certificate aur exam ki details provider ki official site par check karo.</p>' +
      "<h4>Practical steps</h4><ol>" + li(d.steps) + "</ol>" +
      '<h4>Aapka output</h4><p class="out">' + d.out + "</p>" +
      '<h4>Aam galtiyan</h4><ul class="mistakes">' + li(d.mistakes) + "</ul>" +
      '<h4>Self-checklist</h4><ul class="chk">' + boxes + "</ul>" +
      '<div class="nextstep">Agla kadam: ' + d.next + (n < 9 ? ' <a href="#level-' + (n + 1) + '">Wahan jao</a>' : ' <a href="improvement.html">Page kholo</a>') + "</div>" +
      "</div></details>";
  }).join("");

  function paint() {
    host.querySelectorAll("input[data-key]").forEach(function (b) { b.checked = App.Store.isChecked(b.getAttribute("data-key")); });
    host.querySelectorAll(".mod").forEach(function (m) {
      m.querySelector("[data-pct]").textContent = App.Progress.level(parseInt(m.getAttribute("data-level"), 10)).pct + "%";
    });
    App.refresh();
  }

  host.addEventListener("change", function (e) {
    var b = e.target;
    if (!b.matches("input[data-key]")) return;
    var ok = App.Store.setChecked(b.getAttribute("data-key"), b.checked);
    if (!ok) { alert("Progress save nahi ho paayi. Shayad browser ne storage band rakha hai."); }
    paint();
  });

  function openFromHash() {
    var m = location.hash && document.querySelector(location.hash.indexOf("#level-") === 0 ? location.hash : "#none");
    if (m && m.tagName === "DETAILS") { m.open = true; m.scrollIntoView(); }
  }
  window.addEventListener("hashchange", openFromHash);

  document.getElementById("open-all").addEventListener("click", function () { host.querySelectorAll("details").forEach(function (d) { d.open = true; }); });
  document.getElementById("close-all").addEventListener("click", function () { host.querySelectorAll("details").forEach(function (d) { d.open = false; }); });
  document.getElementById("reset").addEventListener("click", function () {
    if (confirm("Saari checklist progress hata di jayegi. Pakka reset karna hai?")) { App.Store.write({ checks: {} }); paint(); }
  });

  paint();
  openFromHash();
})();
