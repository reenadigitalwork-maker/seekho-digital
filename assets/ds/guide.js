/* =====================================================
   SEEKHO DIGITAL - assets/ds/guide.js
   Style-guide only: live contrast checker and the phone-size previews.
   ===================================================== */
(function () {
  "use strict";
  /* ---- live contrast check (WCAG formula) ---- */
  function lum(h) { h = h.replace("#", ""); var c = [0, 2, 4].map(function (i) { var v = parseInt(h.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
  function ratio(a, b) { var x = lum(a), y = lum(b); if (x < y) { var t = x; x = y; y = t; } return (x + 0.05) / (y + 0.05); }
  var PAIRS = [
    ["Body text: ink on white", "#1B2440", "#FFFFFF", 4.5], ["Body text: ink on page", "#1B2440", "#F5F7FB", 4.5],
    ["Muted text on white", "#4F5A75", "#FFFFFF", 4.5], ["Muted text on page", "#4F5A75", "#F5F7FB", 4.5],
    ["Link / term: teal on white", "#066560", "#FFFFFF", 4.5], ["Primary button: white on teal", "#FFFFFF", "#087F78", 4.5],
    ["Primary button hover", "#FFFFFF", "#066560", 4.5], ["Gold button: navy on gold", "#111D35", "#F5BD4B", 4.5],
    ["Header: page colour on navy", "#F5F7FB", "#111D35", 4.5], ["Header: gold on navy", "#F5BD4B", "#111D35", 4.5],
    ["Success text on tint", "#066560", "#E2F1F0", 4.5], ["Warning text on tint", "#7A4E00", "#FFF4D6", 4.5],
    ["Error text on tint", "#A3231B", "#FDECEA", 4.5], ["In progress badge", "#6B4A00", "#FCF0D3", 4.5],
    ["Self-checked badge: white on teal", "#FFFFFF", "#066560", 4.5], ["Disabled text (not required, shown for reference)", "#5F6B85", "#E6EAF2", 3],
    ["Control border on white (non-text)", "#6F7B96", "#FFFFFF", 3], ["Control border on page (non-text)", "#6F7B96", "#F5F7FB", 3],
    ["Focus ring on light: navy on white (non-text)", "#111D35", "#FFFFFF", 3], ["Focus ring on dark: gold on navy (non-text)", "#F5BD4B", "#111D35", 3]
  ];
  var tb = document.getElementById("contrast-body");
  if (tb) {
    var bad = 0;
    tb.innerHTML = PAIRS.map(function (p) {
      var r = ratio(p[1], p[2]), ok = r >= p[3]; if (!ok) bad++;
      return "<tr><td>" + p[0] + '</td><td><span style="display:inline-block;width:56px;padding:2px 6px;border:1px solid #6F7B96;border-radius:6px;font-weight:700;color:' + p[1] + ";background:" + p[2] + '">Aa</span></td><td>' + r.toFixed(2) + ":1</td><td>" + p[3] + ':1</td><td class="' + (ok ? "pass" : "fail") + '">' + (ok ? "Pass" : "Fail") + "</td></tr>";
    }).join("");
    document.getElementById("contrast-sum").textContent = bad ? bad + " pair(s) fail." : "All " + PAIRS.length + " pairs pass their target.";
  }

  /* ---- phone-size previews (real iframes, so media queries respond to the real width) ---- */
  var tabs = document.querySelectorAll("[data-w]"), frame = document.getElementById("pv-frame"), wrap = document.getElementById("pv-wrap"), cap = document.getElementById("pv-cap");
  var cur = 360, H = 680;
  function fit() {
    var box = wrap.parentNode, cs = getComputedStyle(box);
    var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 4, s = Math.min(1, avail / cur);
    frame.style.width = cur + "px"; frame.style.height = H + "px"; frame.style.transform = "scale(" + s + ")";
    wrap.style.width = (Math.round(cur * s) + 4) + "px"; wrap.style.height = (Math.round(H * s) + 4) + "px";
    cap.textContent = cur + "px wide" + (s < 1 ? ", shown at " + Math.round(s * 100) + "% to fit your screen. Open full size to test at 100%." : ", shown at 100%.");
  }
  tabs.forEach(function (b) { b.addEventListener("click", function () { cur = +b.dataset.w; tabs.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); fit(); }); });
  if (frame) { window.addEventListener("resize", fit); fit(); }
})();
