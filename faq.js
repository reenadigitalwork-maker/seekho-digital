/* =====================================================
   SEEKHO DIGITAL - assets/faq.js
   FAQS mein sawal-jawab edit karo. cat = topic ka naam.
   ===================================================== */
(function () {
  "use strict";
  var FAQS = [
    { cat: "Learning order", q: "Main kahan se shuru karun?", a: "Pehle Beginner Guide padho, phir Roadmap ke Level 1 se shuru karo." },
    { cat: "Learning order", q: "Kya main levels skip kar sakta hoon?", a: "Behtar hai ki nahi. Har level pichhle level par banta hai, isliye prerequisites dekh kar hi aage badho." },
    { cat: "Tools", q: "Kya mujhe paid tools kharidne padenge?", a: "Seekhne ke liye zaroori nahi. Zyadatar kaam Google Docs, Sheets, Google Trends aur free plans par ho sakta hai. Free plan ki shartein badal sakti hain, isliye provider ki site par check karo." },
    { cat: "Tools", q: "Kya ye sab phone par ho sakta hai?", a: "Docs, Sheets aur padhna phone par ho sakta hai. Lambe kaam laptop par aasan lagte hain, par phone se shuru karna theek hai." },
    { cat: "Certificates", q: "Kya certificate se naukri milti hai?", a: "Nahi, naukri ki koi guarantee nahi hoti. Practical kaam aur portfolio zyada kaam aate hain." },
    { cat: "Certificates", q: "Completion certificate aur professional certification mein kya fark hai?", a: "Completion certificate batata hai ki aapne course poora kiya. Professional certification mein aam taur par assessment ya exam pass karna padta hai." },
    { cat: "Certificates", q: "Kya official providers ke certificates free hain?", a: "Ye provider aur samay ke hisaab se badalta hai. Fee, exam aur validity hamesha provider ke official page par dekho. Resources page par bhi yahi likha hai." },
    { cat: "Practice", q: "Practice ke liye asli business par kaam karun?", a: "Shuru mein fictional business par karo. Asli business par tabhi karo jab uska malik permission de." },
    { cat: "Practice", q: "Kya practice ke liye ads par paisa lagana chahiye?", a: "Nahi. Practice ke liye simulation karo aur data par SIMULATED likho." },
    { cat: "Projects", q: "Pehle kaun sa project karun?", a: "Project 1, Business research aur buyer persona. Baaki projects usi par bante hain." },
    { cat: "Projects", q: "Project mein atak jaun to?", a: "Chhota hissa karo, apna kaam kisi ko dikhao, official help dekho aur problem ko improvement log mein likho." },
    { cat: "Submission", q: "Project kahan submit karun?", a: "Abhi is website par upload ya submit karne ki suvidha nahi hai. Apna kaam Google Drive mein rakho aur view-only link sambhal kar rakho." },
    { cat: "Submission", q: "Mere kaam ko kaun review karega?", a: "Abhi website par review system nahi hai. Aap checklist se khud check karo aur kisi bharosemand dost ya mentor ko dikhao." },
    { cat: "Progress", q: "Meri progress kahan save hoti hai?", a: "Sirf isi browser aur device ke localStorage mein. Browser data clear karne ya doosre device par kholne par ye nahi dikhegi." },
    { cat: "Portfolio", q: "Kya portfolio mein galtiyan bhi likhni chahiye?", a: "Haan. Kya galat hua aur kaise sudhaara, ye likhna aapki samajh dikhata hai." },
    { cat: "Portfolio", q: "Portfolio mein kya hona chahiye?", a: "Project reports, screenshots, ek capstone case study, ek improvement log aur Drive ke view-only links." }
  ];

  var list = document.getElementById("faq"), q = document.getElementById("q"),
      cats = document.getElementById("cats"), count = document.getElementById("count");
  if (!list) return;
  var cat = "";
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  var names = [""];
  FAQS.forEach(function (f) { if (names.indexOf(f.cat) < 0) names.push(f.cat); });
  cats.innerHTML = names.map(function (n) {
    return '<button type="button" class="chip" data-c="' + esc(n) + '" aria-pressed="' + (n === "" ? "true" : "false") + '">' + (n || "Sab") + "</button>";
  }).join("");

  function draw() {
    var term = q.value.trim().toLowerCase();
    var out = FAQS.filter(function (f) {
      return (!cat || f.cat === cat) && (!term || (f.q + " " + f.a).toLowerCase().indexOf(term) > -1);
    });
    count.textContent = out.length + " sawal dikh rahe hain";
    list.innerHTML = out.length ? out.map(function (f) {
      return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>";
    }).join("") : '<p class="empty">Koi sawal nahi mila. Search ya topic badal kar dekho.</p>';
  }
  q.addEventListener("input", draw);
  cats.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    cats.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
    b.setAttribute("aria-pressed", "true");
    cat = b.getAttribute("data-c");
    draw();
  });
  draw();
})();
