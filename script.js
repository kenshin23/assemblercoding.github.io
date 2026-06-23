// ============================================================
//  AssemblerCoding — interactions
// ============================================================
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Year ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Nav scrolled state ----
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- Reveal on scroll ----
  const reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  // ---- Terminal typing ----
  const code = document.getElementById("term-code");
  if (code) {
    const lines = [
      { t: "$ assembler init radiant-dental", c: "t-prompt" },
      { t: "✓ scoping requirements", c: "t-ok" },
      { t: "✓ designing architecture", c: "t-ok" },
      { t: "✓ generating components", c: "t-ok" },
      { t: "✓ wiring data + auth", c: "t-ok" },
      { t: "› running tests ··· 142 passed", c: "t-dim" },
      { t: "▶ deploying to production", c: "t-go" },
      { t: "", c: "" },
      { t: "system ready → radiantdental.app", c: "t-prompt" },
    ];

    if (reduce) {
      code.innerHTML = lines
        .map((l) => (l.t ? `<span class="${l.c}">${l.t}</span>` : ""))
        .join("\n");
      return;
    }

    let li = 0;
    let done = "";

    function typeLine() {
      if (li >= lines.length) {
        code.innerHTML = done.replace(/<span class="cursor"><\/span>$/, "") +
          '<span class="cursor"></span>';
        return;
      }
      const line = lines[li];
      let ci = 0;
      const open = line.c ? `<span class="${line.c}">` : "<span>";

      function typeChar() {
        const shown = line.t.slice(0, ci);
        code.innerHTML =
          done + open + shown + "</span>" + '<span class="cursor"></span>';
        if (ci < line.t.length) {
          ci++;
          setTimeout(typeChar, 16 + Math.random() * 26);
        } else {
          done += open + line.t + "</span>\n";
          li++;
          setTimeout(typeLine, line.t ? 230 : 90);
        }
      }
      typeChar();
    }

    // Kick off once the terminal scrolls into view (or immediately if already visible)
    const term = code.closest(".terminal");
    if ("IntersectionObserver" in window && term) {
      const tio = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            tio.disconnect();
            setTimeout(typeLine, 500);
          }
        },
        { threshold: 0.3 }
      );
      tio.observe(term);
    } else {
      setTimeout(typeLine, 500);
    }
  }
})();
