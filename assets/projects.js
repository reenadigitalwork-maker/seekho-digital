/* =====================================================
   SEEKHO DIGITAL - assets/projects.js
   PROJECTS mein content hai. Har project ki quality
   checklist mein 5 items rakho. Progress keys: P1-1, P1-2...
   ===================================================== */
(function () {
  "use strict";
  var PROJECTS = [
    { t: "Business research aur buyer persona", d: "Beginner",
      obj: "Ek fictional business ko samajhna aur uske ideal customer ka profile banana.",
      pre: "Roadmap Level 1 aur 3.", tools: "Google Docs, Google Sheets.",
      steps: ["Ek fictional business chuno (naam, product, sheher).", "Likho wo kya bechta hai aur kis dikkat ko hal karta hai.", "Ek buyer persona banao: umar, kaam, dikkat, zaroorat, jahan wo online time bitata hai.", "Customer ke 5 sawal likho jo wo Google par poochh sakta hai.", "Ek page ka summary likho."],
      out: "Ek 2-page Google Doc: business profile aur buyer persona.",
      files: "Doc ka PDF, aur persona section ka ek screenshot.",
      mistakes: ["Persona mein 'sab log' likhna.", "Asli kisi insaan ki jaankari daal dena. Persona kalpanik rakho."],
      check: ["Business saaf likha", "Persona mein dikkat aur zaroorat hai", "5 sawal likhe", "Fictional hone ka note likha", "Doc save aur PDF banaya"],
      imp: ["Persona ko kisi dost ko padhao aur pucho kya wo samajh paya.", "Ek doosra persona bana kar fark dekho."] },
    { t: "Competitor analysis", d: "Beginner",
      obj: "Dekhna ki doosre log kya sahi kar rahe hain aur aap kahan alag ho sakte ho.",
      pre: "Project 1.", tools: "Google Sheets, browser.",
      steps: ["Is fictional business jaise 3 asli competitors chuno (sirf public jaankari dekho).", "Sheet mein columns banao: naam, kya bechte hain, website ka message, social presence, kamzori.", "Har competitor ki website aur ek social page dekh kar likho.", "Likho aap kahan alag ho sakte ho.", "3 lines ka nishkarsh likho."],
      out: "Ek comparison sheet aur 3 lines ka summary.",
      files: "Sheet ka link aur ek screenshot.",
      mistakes: ["Sirf achhi baatein likhna.", "Competitor ki private ya galat jaankari likhna. Sirf jo public hai wahi likho."],
      check: ["3 competitors chune", "Sab columns bhare", "Kamzori likhi", "Apna alag point likha", "Summary likhi"],
      imp: ["Ek aur competitor jodo.", "Har cell ke saath source link likho."] },
    { t: "Keyword research", d: "Intermediate",
      obj: "Aisi searches dhoondhna jinke liye aapka page bana ho.",
      pre: "Project 1, Level 4.", tools: "Google Trends, Google search suggestions, Google Sheets.",
      steps: ["Persona ke 5 sawal sheet mein likho.", "Google Trends aur search suggestions se 15 keywords ikatthe karo.", "Har keyword ke saamne search intent likho.", "Ek mukhya keyword aur 2 sahayak keywords chuno.", "Chune hue keyword ka reason ek line mein likho."],
      out: "Ek keyword sheet: 15 keywords, intent aur final selection.",
      files: "Sheet ka link aur Trends comparison ka screenshot.",
      mistakes: ["Sirf bade ya popular keywords chunna.", "Intent ko dekhe bina chunna."],
      check: ["15 keywords likhe", "Intent likha", "Mukhya keyword chuna", "Reason likha", "Screenshot liya"],
      imp: ["Keywords ko groups mein baanto.", "Trends par 2 keywords compare karo."] },
    { t: "SEO-friendly blog page aur on-page audit", d: "Intermediate",
      obj: "Ek blog page likhna aur uska on-page SEO check karna.",
      pre: "Project 3.", tools: "Google Docs, Google Search Central (docs), browser.",
      steps: ["Mukhya keyword ke liye blog likho, apne shabdon mein.", "Title, meta description, ek H1 aur kuch H2 likho.", "Ek audit table banao: title, headings, intent match, readability.", "Har kami ke saamne sudhaar likho.", "Sudhaar ke baad dobara check karo."],
      out: "Ek blog page (Doc ya HTML) aur ek audit table.",
      files: "Final blog, audit table aur before-after screenshot.",
      mistakes: ["Keyword ko baar-baar zabardasti dohrana.", "Kisi aur ka blog copy karna."],
      check: ["Blog apne shabdon mein likha", "Title aur meta likhe", "Audit table banayi", "Sudhaar kiye", "Before-after screenshot liya"],
      imp: ["Blog ek dost ko padhao.", "Internal link ke liye ek aur page plan karo."] },
    { t: "Social media content calendar", d: "Intermediate",
      obj: "14 din ki planned posting ka calendar banana.",
      pre: "Project 1, Level 5.", tools: "Google Sheets, Google Slides ya Canva (free plan ki shartein check karo).",
      steps: ["1 ya 2 platform chuno.", "3 content pillars likho.", "14 din ka calendar banao: tareekh, pillar, idea, caption, CTA.", "3 posts ke design draft banao.", "Har post ka maqsad ek line mein likho."],
      out: "14 din ka calendar aur 3 post drafts.",
      files: "Sheet ka link aur 3 design screenshots.",
      mistakes: ["Har platform par ek saath aana.", "Har post mein sirf bechna."],
      check: ["Platform chune", "Pillars likhe", "Calendar bhara", "3 drafts banaye", "Maqsad likha"],
      imp: ["Ek hafte ka dusra version banao.", "Post ke ideas ko pillars se match karo."] },
    { t: "Email campaign plan", d: "Intermediate",
      obj: "3 emails ka ek simple campaign plan banana.",
      pre: "Project 1, Level 6.", tools: "Google Docs, Google Sheets.",
      steps: ["Likho list mein log kaise judenge (form, signup).", "Welcome email likho.", "2 aur emails likho jinka alag maqsad ho.", "Har email ke liye 3 subject line likho.", "Plan sheet mein din aur maqsad likho."],
      out: "Ek campaign plan aur 3 email drafts.",
      files: "Plan sheet aur emails ka Doc.",
      mistakes: ["Bina permission ke emails ka plan banana.", "Ek email mein kai CTA."],
      check: ["List ka source likha", "Welcome email likha", "3 emails bane", "Subject lines likhi", "Plan sheet bhari"],
      imp: ["Emails chhote karo.", "Ek email ka dusra CTA test idea likho."] },
    { t: "Ads simulation aur analytics report", d: "Advanced",
      obj: "Bina asli paisa lagaye ek ad ka plan aur uski report banana.",
      pre: "Project 3 ya 5, Level 7 aur 8.", tools: "Google Sheets, Google Docs.",
      steps: ["Ad ka goal likho.", "Sheet mein simulation banao: budget, impressions, clicks, CTR, CPC.", "Har numeric column par SIMULATED likho.", "2 ad copies likho.", "1-page report: goal, numbers, insight, 3 agle kadam."],
      out: "Ek simulation sheet aur 1-page report.",
      files: "Sheet, report PDF aur ek screenshot jisme SIMULATED dikhe.",
      mistakes: ["Practice mein asli paisa lagana.", "Simulated data ko asli batana."],
      check: ["Goal likha", "Simulation bana", "SIMULATED likha", "Insights likhe", "Asli paisa kharch nahi kiya"],
      imp: ["Alag budget par dobara simulate karo.", "Numbers ke piche ki wajah likho."] },
    { t: "Capstone case study", d: "Advanced",
      obj: "Apne poore kaam ko ek case study mein jodna.",
      pre: "Kam se kam 3 projects poore.", tools: "Google Docs, Google Drive.",
      steps: ["Ek fictional business chuno aur uske projects ikatthe karo.", "Case study likho: maqsad, kya kiya, kya galat hua, kaise sudhaara, natija.", "Screenshots aur files jodo.", "Drive folder organise karo.", "View-only link check karo."],
      out: "Ek case study aur ek Drive folder ka view-only link.",
      files: "Case study PDF, saare screenshots aur folder link.",
      mistakes: ["Galtiyan chhupana.", "Bina saboot ke dava karna."],
      check: ["Projects ikatthe kiye", "Case study likhi", "Screenshots jode", "Folder organise kiya", "View-only link check kiya"],
      imp: ["Case study dost ko padhao.", "Natija ko behtar likho."] }
  ];

  var C = window.SEEKHO, App = window.SeekhoApp, host = document.getElementById("projects");
  if (!C || !App || !host) return;
  var tagCls = { Beginner: "b", Intermediate: "i", Advanced: "a" };
  function li(a) { return a.map(function (t) { return "<li>" + t + "</li>"; }).join(""); }

  host.innerHTML = PROJECTS.map(function (p, i) {
    var n = i + 1;
    var boxes = p.check.map(function (t, k) {
      return '<li><label><input type="checkbox" data-key="P' + n + "-" + (k + 1) + '"><span>' + t + "</span></label></li>";
    }).join("");
    return '<details class="mod" id="project-' + n + '" data-d="' + p.d + '" data-n="' + n + '">' +
      '<summary><span class="lvl-n">' + n + '</span><span class="m-title">' + p.t + '<span class="m-sub"><span class="tag ' + tagCls[p.d] + '">' + p.d + '</span></span></span><span class="m-pct" data-pct>0/5</span></summary>' +
      '<div class="body">' +
      "<h4>1. Objective</h4><p>" + p.obj + "</p>" +
      "<h4>2. Prerequisites</h4><p>" + p.pre + "</p>" +
      "<h4>3. Tools</h4><p>" + p.tools + "</p>" +
      "<h4>4. Step-by-step</h4><ol>" + li(p.steps) + "</ol>" +
      '<h4>5. Expected output</h4><p class="out">' + p.out + "</p>" +
      "<h4>6. Files aur screenshots</h4><p>" + p.files + "</p>" +
      '<h4>7. Aam galtiyan</h4><ul class="mistakes">' + li(p.mistakes) + "</ul>" +
      '<h4>8. Quality checklist</h4><ul class="chk">' + boxes + "</ul>" +
      "<h4>9. Behtar banane ke tareeke</h4><ul>" + li(p.imp) + "</ul>" +
      '<p style="margin-top:14px;font-size:.9rem;color:var(--muted)">Kuch galat ho jaye to: step dobara padho, apna kaam kisi dost ko dikhao, aur galti Improvement log mein likho.</p>' +
      "</div></details>";
  }).join("");

  function paint() {
    host.querySelectorAll("input[data-key]").forEach(function (b) { b.checked = App.Store.isChecked(b.getAttribute("data-key")); });
    host.querySelectorAll(".mod").forEach(function (m) {
      m.querySelector("[data-pct]").textContent = m.querySelectorAll("input:checked").length + "/5";
    });
  }
  host.addEventListener("change", function (e) {
    if (!e.target.matches("input[data-key]")) return;
    if (!App.Store.setChecked(e.target.getAttribute("data-key"), e.target.checked)) { alert("Progress save nahi ho paayi."); }
    paint();
  });

  var chips = document.querySelectorAll(".chip"), count = document.getElementById("count");
  function filter(d) {
    var shown = 0;
    host.querySelectorAll(".mod").forEach(function (m) {
      var ok = !d || m.getAttribute("data-d") === d;
      m.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = shown + " project" + (shown === 1 ? "" : "s") + " dikh rahe hain";
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      c.setAttribute("aria-pressed", "true");
      filter(c.getAttribute("data-d"));
    });
  });

  function openFromHash() {
    if (location.hash.indexOf("#project-") !== 0) return;
    var m = document.querySelector(location.hash);
    if (m && m.tagName === "DETAILS") { m.hidden = false; m.open = true; m.scrollIntoView(); }
  }
  window.addEventListener("hashchange", openFromHash);
  paint(); filter(""); openFromHash();
})();
