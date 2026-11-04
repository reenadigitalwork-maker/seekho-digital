/* =====================================================
   SEEKHO DIGITAL - assets/resources.js
   RES mein content hai. Fee/certificate/exam ki details
   tabhi badlo jab official page khol kar verify kar lo.
   ===================================================== */
(function () {
  "use strict";
  var CHECK = "Official site par check karo.";
  var NOTE_PLATFORM = "Hamne ye official page se verify nahi kiya. " + CHECK;

  var RES = [
    {
      name: "Google Skillshop", type: "Course", level: "Beginner se Intermediate",
      url: "https://skillshop.withgoogle.com/",
      teaches: "Google ke marketing aur analytics products ki official learning, jaise Google Ads aur Google Analytics.",
      cost: "Kayi third-party sites ise free batati hain, par " + NOTE_PLATFORM,
      cert: "Yahan certifications ka zikr milta hai. Kaun si certification hai aur kab tak valid hai: " + CHECK,
      exam: "Certification ke liye assessment ho sakta hai. " + CHECK,
      after: "Ek course chuno, notes banao aur Level 7 ya Level 8 ke project mein use karke dekho."
    },
    {
      name: "HubSpot Academy", type: "Course", level: "Beginner",
      url: "https://academy.hubspot.com/",
      teaches: "Marketing, content aur email jaise topics par courses.",
      cost: NOTE_PLATFORM,
      cert: "Certificate hai ya nahi aur kis type ka hai: " + CHECK,
      exam: CHECK,
      after: "Level 3 ya Level 6 ka ek course karo aur seekhi hui baat se apne fictional business ka ek draft likho."
    },
    {
      name: "Meta Blueprint", type: "Course", level: "Beginner se Intermediate",
      url: "https://www.facebook.com/business/learn",
      teaches: "Meta ke platforms par marketing aur ads ki official learning.",
      cost: NOTE_PLATFORM,
      cert: "Certification ki details, fee aur validity: " + CHECK,
      exam: "Certification ke liye exam ho sakta hai aur uski fee alag ho sakti hai. " + CHECK,
      after: "Level 5 ya 7 ka project karo. Practice ke liye asli ad par paisa mat lagao."
    },
    {
      name: "Semrush Academy", type: "Course", level: "Beginner se Intermediate",
      url: "https://www.semrush.com/academy/",
      teaches: "SEO aur online marketing ki learning, Semrush tool ke saath.",
      cost: NOTE_PLATFORM + " Tool ke kuch features ke liye alag subscription lag sakta hai.",
      cert: "Certificate ki details: " + CHECK,
      exam: CHECK,
      after: "Level 4 ka keyword research project karo aur dekho tool aur manual research mein kya fark hai."
    },
    {
      name: "Google Search Central", type: "Tool", level: "Intermediate",
      url: "https://developers.google.com/search",
      teaches: "Google Search ki official documentation: Google aapki site ko kaise dekhta hai aur SEO ki basics.",
      cost: "Ye documentation website hai, aur isse padhne ke liye account nahi chahiye.",
      cert: "Ye certificate wala course nahi hai.",
      exam: "Koi exam nahi.",
      after: "Level 4 ke SEO blog page ke title aur headings ko is documentation ke hisaab se dobara check karo."
    },
    {
      name: "Google Search Console", type: "Tool", level: "Intermediate",
      url: "https://search.google.com/search-console",
      teaches: "Aapki apni site Google Search mein kaisi dikh rahi hai, ye batane wala Google ka tool.",
      cost: "Ye Google ka tool hai. Aapko apni website ka ownership verify karna padta hai. Taaza shartein: " + CHECK,
      cert: "Ye tool hai, certificate nahi.",
      exam: "Koi exam nahi.",
      after: "Agar aapki apni site hai to use verify karo aur do hafte baad queries aur clicks dekho. Warna sirf official help padho."
    },
    {
      name: "Google Trends", type: "Tool", level: "Beginner",
      url: "https://trends.google.com/",
      teaches: "Dekhna ki logon ka kisi vishay mein interest samay ke saath kaise badal raha hai.",
      cost: "Ye Google ka public tool hai. Taaza shartein: " + CHECK,
      cert: "Ye tool hai, certificate nahi.",
      exam: "Koi exam nahi.",
      after: "Level 4 ke keyword research mein 2-3 keywords ko Trends par compare karo aur sheet mein note likho."
    }
  ];

  var list = document.getElementById("rlist"), count = document.getElementById("count");
  var q = document.getElementById("q"), lvl = document.getElementById("lvl");
  var chips = document.querySelectorAll(".chip"), type = "";
  if (!list) return;

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function draw() {
    var term = q.value.trim().toLowerCase();
    var out = RES.filter(function (r) {
      var hay = (r.name + " " + r.teaches + " " + r.type).toLowerCase();
      return (!term || hay.indexOf(term) > -1) && (!lvl.value || r.level === lvl.value) && (!type || r.type === type);
    });
    count.textContent = out.length + " resource" + (out.length === 1 ? "" : "s") + " dikh rahe hain";
    if (!out.length) { list.innerHTML = '<p class="empty">Koi resource nahi mila. Search ya filter badal kar dekho.</p>'; return; }
    list.innerHTML = out.map(function (r) {
      return '<article class="rcard"><h3>' + esc(r.name) + "</h3>" +
        '<div class="meta"><span class="tag n">' + (r.type === "Course" ? "Learning platform" : "Tool ya docs") + '</span><span class="tag b">' + esc(r.level) + "</span></div>" +
        "<p>" + esc(r.teaches) + "</p><dl>" +
        "<div><dt>Free ya paid</dt><dd>" + esc(r.cost) + "</dd></div>" +
        "<div><dt>Certificate</dt><dd>" + esc(r.cert) + "</dd></div>" +
        "<div><dt>Exam ya assessment</dt><dd>" + esc(r.exam) + "</dd></div>" +
        "<div><dt>Fee lag sakti hai?</dt><dd>Fee badal sakti hai. Pakka jaanne ke liye provider ka official page dekho.</dd></div></dl>" +
        '<p class="after"><strong>Khatam karne ke baad:</strong> ' + esc(r.after) + "</p>" +
        '<a class="btn btn-teal btn-sm" href="' + r.url + '" target="_blank" rel="noopener noreferrer">Official site kholo</a></article>';
    }).join("");
  }

  q.addEventListener("input", draw);
  lvl.addEventListener("change", draw);
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      c.setAttribute("aria-pressed", "true");
      type = c.getAttribute("data-type");
      draw();
    });
  });
  draw();
})();
