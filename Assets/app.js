/* =====================================================
   SEEKHO DIGITAL - assets/app.js
   Har page par config.js ke BAAD load hota hai.
   ===================================================== */
(function () {
  "use strict";
  var C = window.SEEKHO;

  /* ---------- 1. Storage (baad mein Supabase se badla ja sakta hai) ---------- */
  var Store = {
    read: function () {
      try {
        var raw = localStorage.getItem(C.storageKey);
        var data = raw ? JSON.parse(raw) : null;
        return data && data.checks ? data : { checks: {} };
      } catch (e) {
        return { checks: {} };
      }
    },
    write: function (data) {
      try { localStorage.setItem(C.storageKey, JSON.stringify(data)); return true; }
      catch (e) { return false; }
    },
    /* Checklist item ka key: "L4-2" = Level 4, item 2 */
    isChecked: function (key) { return !!Store.read().checks[key]; },
    setChecked: function (key, on) {
      var d = Store.read();
      if (on) { d.checks[key] = true; } else { delete d.checks[key]; }
      return Store.write(d);
    }
  };

  /* ---------- 2. Progress ---------- */
  var Progress = {
    level: function (n) {
      var lvl = C.levels[n - 1], done = 0, checks = Store.read().checks;
      for (var i = 1; i <= lvl.checks; i++) { if (checks["L" + n + "-" + i]) done++; }
      return { done: done, total: lvl.checks, pct: Math.round((done / lvl.checks) * 100) };
    },
    overall: function () {
      var done = 0, total = 0;
      C.levels.forEach(function (l) { var p = Progress.level(l.n); done += p.done; total += p.total; });
      return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
    },
    /* Pehla level jo poora nahi hua */
    nextLevel: function () {
      for (var i = 0; i < C.levels.length; i++) {
        if (Progress.level(C.levels[i].n).pct < 100) return C.levels[i];
      }
      return null;
    }
  };

  /* ---------- 3. Icons (chhote inline SVG) ---------- */
  var P = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
  };
  function icon(name, size) {
    var s = size || 22;
    return '<svg class="ico" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" ' + P + ' aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }
  function paintIcons() {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      el.innerHTML = icon(el.getAttribute("data-icon"), parseInt(el.getAttribute("data-size"), 10) || 22);
    });
  }

  /* ---------- 4. Header aur footer ---------- */
  var LOGO = '<svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#F5BD4B"/><path d="M7 22h6v-5h6v-5h6" fill="none" stroke="#111D35" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function currentPage() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var cur = currentPage();
    var links = C.nav.map(function (i) {
      var on = i.href === cur ? ' aria-current="page"' : "";
      return '<a href="' + i.href + '"' + on + ">" + i.label + "</a>";
    }).join("");
    host.innerHTML =
      '<div class="wrap bar">' +
        '<a class="brand" href="index.html" aria-label="' + C.brand + ' home">' + LOGO + "<span>" + C.brand + "</span></a>" +
        '<nav id="main-nav" class="nav" aria-label="Main">' + links + "</nav>" +
        '<a class="btn btn-gold btn-sm bar-cta" href="roadmap.html">Start Learning</a>' +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Menu kholo">' + icon("menu", 24) + "</button>" +
      "</div>";

    var btn = host.querySelector(".menu-btn"), nav = host.querySelector("#main-nav");
    function setOpen(open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Menu band karo" : "Menu kholo");
      btn.innerHTML = icon(open ? "close" : "menu", 24);
    }
    btn.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var links = C.nav.map(function (i) { return '<li><a href="' + i.href + '">' + i.label + "</a></li>"; }).join("");
    host.innerHTML =
      '<div class="wrap foot-grid">' +
        '<div><a class="brand" href="index.html">' + LOGO + "<span>" + C.brand + "</span></a>" +
        '<p class="foot-mission">Har beginner ko digital marketing confusion se practical skills tak pahunchana, simple Hinglish guidance, trusted resources aur practical projects ke through.</p></div>' +
        '<div><h2 class="foot-h">Pages</h2><ul class="foot-links">' + links + "</ul></div>" +
        '<div><h2 class="foot-h">Dhyan rakhein</h2><p class="foot-note">Aapki progress sirf isi browser aur device mein save hoti hai. Browser data clear karne par ya doosre phone par ye nahi dikhegi.</p>' +
        '<p class="foot-note">Certificate, fee aur exam ki details badal sakti hain. Hamesha provider ki official website par check karo.</p></div>' +
      "</div>" +
      '<div class="wrap foot-base">&copy; ' + new Date().getFullYear() + " " + C.brand + ". Educational use ke liye.</div>";
  }

  /* ---------- 5. Learning journey (hero ka path) ---------- */
  function renderJourney() {
    var host = document.getElementById("journey");
    if (!host) return;
    var xs = [50, 180, 310, 310, 180, 50, 50, 180, 310];
    var ys = [50, 50, 50, 150, 150, 150, 250, 250, 250];
    var d = "M" + xs[0] + " " + ys[0];
    for (var i = 1; i < 9; i++) { d += " L" + xs[i] + " " + ys[i]; }
    var next = Progress.nextLevel();
    var nodes = C.levels.map(function (l, i) {
      var p = Progress.level(l.n);
      var cls = p.pct === 100 ? "done" : (next && next.n === l.n ? "now" : "");
      return '<a href="roadmap.html#level-' + l.n + '" class="jn ' + cls + '">' +
        "<title>Level " + l.n + ": " + l.title + " (" + p.pct + "% poora)</title>" +
        '<circle cx="' + xs[i] + '" cy="' + ys[i] + '" r="21"/>' +
        '<text x="' + xs[i] + '" y="' + (ys[i] + 6) + '" text-anchor="middle">' + l.n + "</text></a>";
    }).join("");
    host.innerHTML =
      '<svg viewBox="0 0 360 300" role="img" aria-label="Nau levels ka learning path, Level 1 se Level 9 tak">' +
      '<path class="jpath" d="' + d + '"/>' + nodes + "</svg>";
  }

  function renderOverall() {
    var o = Progress.overall(), nx = Progress.nextLevel();
    document.querySelectorAll("[data-overall-pct]").forEach(function (el) { el.textContent = o.pct + "%"; });
    document.querySelectorAll("[data-overall-bar]").forEach(function (el) { el.style.width = o.pct + "%"; });
    document.querySelectorAll("[data-resume]").forEach(function (el) {
      if (o.done === 0) {
        el.textContent = "Level 1 se shuru karo";
        el.setAttribute("href", "roadmap.html#level-1");
      } else if (nx) {
        el.textContent = "Level " + nx.n + " par wapas jao";
        el.setAttribute("href", "roadmap.html#level-" + nx.n);
      } else {
        el.textContent = "Portfolio banana shuru karo";
        el.setAttribute("href", "submission.html");
      }
    });
  }

  /* ---------- 6. Roadmap preview list (home) ---------- */
  function renderLevelList() {
    var host = document.getElementById("level-list");
    if (!host) return;
    host.innerHTML = C.levels.map(function (l) {
      var p = Progress.level(l.n);
      return '<li><a class="lvl" href="roadmap.html#level-' + l.n + '">' +
        '<span class="lvl-n">' + l.n + "</span>" +
        '<span class="lvl-body"><strong>' + l.title + "</strong><span>" + l.short + "</span>" +
        '<span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:' + p.pct + '%"></span></span></span>' +
        '<span class="lvl-pct">' + p.pct + "%</span></a></li>";
    }).join("");
  }

  /* ---------- 7. "Aap kahan hain?" selector ---------- */
  function setupFinder() {
    var host = document.getElementById("finder");
    if (!host) return;
    var out = document.getElementById("finder-out");
    var paths = {
      new: { t: "Aapke liye sahi shuruaat", p: "Pehle Beginner Guide padho taaki basic terms clear ho jayein. Phir Level 1 ki checklist se shuru karo.", a: "beginners-guide.html", l: "Beginner Guide kholo" },
      course: { t: "Aapke liye sahi shuruaat", p: "Theory aapko aati hai, ab practice chahiye. Projects page se ek chhota project chuno aur use poora karke dekho kahan atak rahe ho.", a: "projects.html", l: "Project Lab kholo" },
      portfolio: { t: "Aapke liye sahi shuruaat", p: "Aapke paas kaam hai to use dikhane layak banao. Submission aur Portfolio page par report aur case study ke templates milenge.", a: "submission.html", l: "Portfolio guide kholo" }
    };
    host.querySelectorAll("button[data-path]").forEach(function (b) {
      b.addEventListener("click", function () {
        host.querySelectorAll("button[data-path]").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        var r = paths[b.getAttribute("data-path")];
        out.innerHTML = "<strong>" + r.t + "</strong><p>" + r.p + '</p><a class="btn btn-teal btn-sm" href="' + r.a + '">' + r.l + "</a>";
      });
    });
  }

  /* ---------- 8. Copy-to-clipboard (templates ke liye, Phase 2/3 mein use hoga) ---------- */
  function setupCopy() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-copy-target]");
      if (!btn) return;
      var src = document.getElementById(btn.getAttribute("data-copy-target"));
      if (!src) return;
      var text = src.innerText;
      var old = btn.textContent;
      function ok() { btn.textContent = "Copy ho gaya"; setTimeout(function () { btn.textContent = old; }, 1800); }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(ok, fallback);
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); ok(); } catch (err) { btn.textContent = "Copy nahi hua"; }
        document.body.removeChild(ta);
      }
    });
  }

  /* Dusre pages (roadmap, projects) ke liye */
  window.SeekhoApp = { Store: Store, Progress: Progress, icon: icon, refresh: function () { renderOverall(); renderLevelList(); renderJourney(); } };

  /* ---------- Start ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    renderJourney();
    renderOverall();
    renderLevelList();
    setupFinder();
    setupCopy();
    paintIcons();
  });
})();
