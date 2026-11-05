/* =====================================================
   SEEKHO DIGITAL - assets/ds/ds.js
   Behaviour for every design-system component. Vanilla JS, no libraries.
   Saved demo data uses the prefix "seekho-ds:" only. Never type personal details into demo fields.
   ===================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  /* ---------- storage (try/catch: it can be blocked) ---------- */
  var NS = "seekho-ds:";
  var store = {
    get: function (k) { try { return localStorage.getItem(NS + k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(NS + k, v); } catch (e) {} },
    clear: function () { try { Object.keys(localStorage).filter(function (k) { return k.indexOf(NS) === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {} }
  };

  /* ---------- icon sprite ---------- */
  var S = { check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>', x: '<path d="m6 6 12 12M18 6 6 18"/>', alert: '<path d="M12 3 2.5 20h19z"/><path d="M12 10v4M12 17.5v.01"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>', circle: '<circle cx="12" cy="12" r="9"/>', half: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>', "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>', "check-solid": '<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="m8 12.5 3 3 5-6" stroke="#fff"/>', person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', close: '<path d="m6 6 12 12M18 6 6 18"/>', arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', back: '<path d="M19 12H5M11 6l-6 6 6 6"/>', copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>', flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/>', globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>', book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/>' };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">' +
    Object.keys(S).map(function (k) { return '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + S[k] + "</symbol>"; }).join("") + "</svg>";
  function ico(n) { return '<svg class="i" aria-hidden="true" focusable="false"><use href="#i-' + n + '"/></svg>'; }
  function addSprite() { document.body.insertAdjacentHTML("afterbegin", sprite); document.querySelectorAll("[data-i]").forEach(function (el) { el.insertAdjacentHTML("afterbegin", ico(el.getAttribute("data-i"))); }); }

  /* ---------- preview mode: links inside the iframe must not navigate away ---------- */
  function guardPreview() {
    if (window === window.top) return;
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (a && a.getAttribute("href").charAt(0) !== "#") e.preventDefault();
    });
  }

  /* ---------- 1. responsive menu ---------- */
  function initMenu() {
    var head = document.querySelector(".site-header"), b = head && head.querySelector(".menu-btn"), n = document.getElementById("site-nav");
    if (!b || !n) return;
    function set(open) {
      n.classList.toggle("open", open);
      b.setAttribute("aria-expanded", open ? "true" : "false");
      b.querySelector(".mb-label").textContent = open ? "Close" : "Menu";
      b.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
    }
    b.addEventListener("click", function () { set(!n.classList.contains("open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && n.classList.contains("open")) { set(false); b.focus(); } });
    document.addEventListener("click", function (e) { if (n.classList.contains("open") && !head.contains(e.target)) set(false); });
    n.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    head.addEventListener("focusout", function (e) { if (n.classList.contains("open") && e.relatedTarget && !head.contains(e.relatedTarget)) set(false); });
    window.matchMedia("(min-width:900px)").addEventListener("change", function () { set(false); });
  }

  /* ---------- 2. definitions: tap, click, keyboard, focus, desktop hover ---------- */
  function initTerms() {
    var fine = window.matchMedia("(hover:hover) and (pointer:fine)");
    var all = [].slice.call(document.querySelectorAll(".term-wrap"));
    all.forEach(function (w) {
      var b = w.querySelector(".term"), p = w.querySelector(".def"), pinned = false;
      function place() {
        p.style.left = "0px";
        var r = p.getBoundingClientRect(), vw = root.clientWidth, m = 12, dx = 0;
        if (r.right > vw - m) dx = vw - m - r.right;
        if (r.left + dx < m) dx = m - r.left;
        p.style.left = dx + "px";
      }
      function open() { all.forEach(function (o) { if (o !== w) o.closeTerm(); }); p.hidden = false; b.setAttribute("aria-expanded", "true"); place(); }
      function close() { p.hidden = true; b.setAttribute("aria-expanded", "false"); pinned = false; }
      w.closeTerm = close;
      b.addEventListener("click", function () { if (p.hidden) { open(); pinned = true; } else if (!pinned) { pinned = true; } else { close(); } });
      b.addEventListener("focus", function () { if (p.hidden && b.matches(":focus-visible")) open(); });
      b.addEventListener("blur", function () { if (!pinned) close(); });
      w.addEventListener("mouseenter", function () { if (fine.matches && p.hidden) open(); });
      w.addEventListener("mouseleave", function () { if (fine.matches && !pinned) close(); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      all.forEach(function (w) { if (!w.querySelector(".def").hidden) { w.closeTerm(); if (w.contains(document.activeElement)) w.querySelector(".term").focus(); } });
    });
    document.addEventListener("click", function (e) { all.forEach(function (w) { if (!w.contains(e.target)) w.closeTerm(); }); });
    window.addEventListener("resize", function () { all.forEach(function (w) { w.closeTerm(); }); });
  }

  /* ---------- 3. quiz: automatic checking, explains right and wrong ---------- */
  function initQuiz() {
    var forms = [].slice.call(document.querySelectorAll(".quiz"));
    var summary = document.getElementById("quiz-summary");
    function tally() {
      if (!summary) return;
      var done = forms.filter(function (f) { return f.dataset.done; }).length, right = forms.filter(function (f) { return f.dataset.ok === "1"; }).length;
      summary.textContent = done ? "Auto-checked: " + right + " of " + forms.length + " correct" + (done < forms.length ? " so far" : "") : "Auto-checked: not taken";
    }
    forms.forEach(function (f) {
      var check = f.querySelector("[data-check]"), retry = f.querySelector("[data-retry]"), fb = f.querySelector(".feedback"), opts = [].slice.call(f.querySelectorAll(".opt"));
      f.addEventListener("change", function () { check.disabled = !f.querySelector("input:checked"); });
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var sel = f.querySelector("input:checked"); if (!sel) return;
        var right = sel.hasAttribute("data-correct"), good = f.querySelector("input[data-correct]");
        opts.forEach(function (o) { var i = o.querySelector("input"); i.disabled = true; o.querySelector(".mark") && o.querySelector(".mark").remove(); });
        var chosen = sel.closest(".opt");
        chosen.classList.add(right ? "is-correct" : "is-wrong");
        chosen.querySelector("span").insertAdjacentHTML("beforeend", '<span class="mark">' + (right ? "Correct" : "Not quite") + "</span>");
        fb.className = "feedback " + (right ? "ok" : "bad");
        fb.innerHTML = "<p><strong>" + (right ? "Correct." : "Not quite.") + "</strong> " + sel.dataset.why + "</p>" + (right ? "" : "<p><strong>The correct answer:</strong> " + good.dataset.why + "</p>");
        check.hidden = true; retry.hidden = false; f.dataset.done = "1"; f.dataset.ok = right ? "1" : "0"; tally();
      });
      retry.addEventListener("click", function () {
        f.reset(); opts.forEach(function (o) { o.classList.remove("is-correct", "is-wrong"); var m = o.querySelector(".mark"); if (m) m.remove(); o.querySelector("input").disabled = false; });
        fb.className = "feedback"; fb.textContent = ""; check.hidden = false; check.disabled = true; retry.hidden = true; delete f.dataset.done; delete f.dataset.ok; tally(); f.querySelector("input").focus();
      });
    });
    tally();
  }

  /* ---------- 4. worksheet, sample reveal, copy ---------- */
  function initWorksheet() {
    var ws = document.getElementById("ws"); if (!ws) return;
    var btn = document.getElementById("show-sample"), sample = document.getElementById("sample"), count = document.getElementById("ws-count"), MIN = 20;
    var saved = store.get("ws"); if (saved) ws.value = saved;
    function upd() {
      var n = ws.value.trim().length;
      btn.disabled = n < MIN && sample.hidden;
      count.textContent = n < MIN ? "Write at least " + MIN + " characters to unlock the sample. (" + n + " so far)" : "Sample answer unlocked.";
      store.set("ws", ws.value);
    }
    ws.addEventListener("input", upd);
    btn.addEventListener("click", function () { var open = sample.hidden; sample.hidden = !open; btn.setAttribute("aria-expanded", open ? "true" : "false"); btn.firstChild.textContent = open ? "Hide sample answer" : "Show sample answer"; if (!open) upd(); });
    upd();
    var cp = document.getElementById("copy-ws"), st = document.getElementById("copy-status");
    cp.addEventListener("click", function () {
      function ok() { st.textContent = "Copied to clipboard."; }
      function fallback() { ws.select(); try { document.execCommand("copy") ? ok() : (st.textContent = "Copy failed. Select the text and copy it yourself."); } catch (e) { st.textContent = "Copy failed. Select the text and copy it yourself."; } }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(ws.value).then(ok, fallback); else fallback();
    });
    [].forEach.call(document.querySelectorAll("[data-persist]"), function (el) { var v = store.get("p:" + el.id); if (v) el.value = v; el.addEventListener("input", function () { store.set("p:" + el.id, el.value); }); });
  }

  /* ---------- 5. rubric self-assessment ---------- */
  function initRubric() {
    var r = document.querySelector(".rubric"); if (!r) return;
    var names = ["", "Needs Work", "Developing", "Good", "Strong"], crits = [].slice.call(r.querySelectorAll(".crit"));
    var list = document.getElementById("score-list"), msg = document.getElementById("score-msg");
    var saved = {}; try { saved = JSON.parse(store.get("rubric") || "{}"); } catch (e) {}
    crits.forEach(function (c) { var v = saved[c.dataset.name]; if (v) { var i = c.querySelector('input[value="' + v + '"]'); if (i) i.checked = true; } });
    function upd() {
      var rated = 0, low = [], out = {}, html = "";
      crits.forEach(function (c) {
        var s = c.querySelector("input:checked"), tag = c.querySelector(".crit-pick");
        if (s) { var lv = +s.value; rated++; out[c.dataset.name] = lv; tag.textContent = names[lv]; html += "<li>" + c.dataset.name + ": <strong>" + names[lv] + "</strong></li>"; if (lv < 3) low.push(c.dataset.name); }
        else { tag.textContent = "Not rated"; html += "<li>" + c.dataset.name + ": not rated</li>"; }
      });
      list.innerHTML = html; store.set("rubric", JSON.stringify(out));
      msg.textContent = rated < crits.length ? "Rate every criterion to see your next step." : low.length ? "Fix these first: " + low.join(", ") + ". Use the correction guidance, improve your work, then rate again." : "Every criterion is Good or Strong in your own judgement. Compare your work with the sample answer, then write your reflection.";
    }
    r.addEventListener("change", upd); upd();
  }

  /* ---------- 6. before/after, funnel, progress demo ---------- */
  function initSegments() {
    var ba = document.querySelector("[data-ba]");
    if (ba) {
      var btns = ba.querySelectorAll(".seg button"), panels = ba.querySelectorAll(".ba");
      btns.forEach(function (b) { b.addEventListener("click", function () { btns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); panels.forEach(function (p) { p.hidden = p.dataset.p !== b.dataset.show; }); }); });
    }
    var fn = document.querySelectorAll(".fn"), det = document.getElementById("fn-detail");
    fn.forEach(function (b) { b.addEventListener("click", function () { fn.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); det.innerHTML = "<strong>" + b.dataset.name + ".</strong> " + b.dataset.detail; }); });
  }
  function initProgress() {
    var rows = [].slice.call(document.querySelectorAll(".lesson-row")); if (!rows.length) return;
    var meter = document.getElementById("mod-meter"), label = document.getElementById("mod-label");
    var S2 = { none: ["st-none", "circle", "Not started"], doing: ["st-doing", "half", "In progress"], practised: ["st-practised", "check-circle", "Practised"], checked: ["st-checked", "check-solid", "Self-checked"] };
    var saved = {}; try { saved = JSON.parse(store.get("lessons") || "{}"); } catch (e) {}
    function upd() {
      var n = 0, state = {};
      rows.forEach(function (row) {
        var sel = row.querySelector("select"), badge = row.querySelector(".state-badge"), s = S2[sel.value]; state[sel.id] = sel.value;
        badge.className = "badge state-badge " + s[0]; badge.innerHTML = ico(s[1]) + s[2]; if (sel.value === "checked") n++;
      });
      meter.firstElementChild.style.width = (n / rows.length * 100) + "%"; meter.setAttribute("aria-valuenow", n);
      label.textContent = n + " of " + rows.length + " lessons self-checked"; store.set("lessons", JSON.stringify(state));
    }
    rows.forEach(function (row) { var sel = row.querySelector("select"); if (saved[sel.id]) sel.value = saved[sel.id]; sel.addEventListener("change", upd); });
    upd();
  }

  /* ---------- 7. sticky continue bar: safe area, spacing, keyboard ---------- */
  function initBar() {
    var bar = document.querySelector(".continue-bar"); if (!bar) return;
    var field = 'input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]),textarea,[contenteditable=""],[contenteditable="true"]';
    function size() { root.style.setProperty("--bar-h", root.classList.contains("kb-open") ? "0px" : bar.offsetHeight + "px"); }
    function kb(on) { root.classList.toggle("kb-open", on); size(); }
    function typing() { return document.activeElement && document.activeElement.matches && document.activeElement.matches(field); }
    document.addEventListener("focusin", function (e) { if (e.target.matches(field)) kb(true); });
    document.addEventListener("focusout", function () { setTimeout(function () { if (!typing()) kb(false); }, 80); });
    if (window.visualViewport) window.visualViewport.addEventListener("resize", function () { if (window.innerHeight - window.visualViewport.height > 150) kb(true); else if (!typing()) kb(false); });
    if (window.ResizeObserver) new ResizeObserver(size).observe(bar);
    window.addEventListener("resize", size); size();
  }

  /* ---------- 8. reveal on scroll (once) + demo reset ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal"), reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (ent) { ent.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }
  function initReset() { var b = document.getElementById("reset-demo"); if (b) b.addEventListener("click", function () { store.clear(); location.reload(); }); }

  window.DS = { store: store, ico: ico };
  document.addEventListener("DOMContentLoaded", function () {
    addSprite(); guardPreview(); initMenu(); initTerms(); initQuiz(); initWorksheet(); initRubric(); initSegments(); initProgress(); initBar(); initReveal(); initReset();
  });
})();
