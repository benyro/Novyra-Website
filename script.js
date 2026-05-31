gsap.registerPlugin(ScrollTrigger);

var reduceMotion =
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

var body = document.body;
var isBonusPage = body.classList.contains("page-bonus");
var skipGlobalFadeCss =
  isBonusPage || body.classList.contains("page-training") || body.classList.contains("page-about") || body.classList.contains("page-partnerships");

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

function closeMenu() {
  var menu = document.getElementById("mobileMenu");
  var overlay = document.getElementById("overlay");
  if (menu) menu.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
}

document.querySelectorAll(".mobile-menu a, .mobile-menu .mobile-nav-group__panel a").forEach(function (link) {
  link.addEventListener("click", function () {
    closeMenu();
  });
});

function initNavDropdowns() {
  document.querySelectorAll("[data-nav-dropdown]").forEach(function (dropdown) {
    var trigger = dropdown.querySelector("[data-nav-dropdown-trigger]");
    if (!trigger) return;

    trigger.addEventListener("click", function (e) {
      if (window.matchMedia("(min-width: 901px)").matches) return;
      e.preventDefault();
      var open = dropdown.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    dropdown.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        dropdown.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    });
  });

  document.querySelectorAll("[data-mobile-nav-group]").forEach(function (group) {
    var trigger = group.querySelector("[data-mobile-nav-trigger]");
    if (!trigger) return;

    trigger.addEventListener("click", function () {
      var open = group.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavDropdowns);
} else {
  initNavDropdowns();
}

if (!reduceMotion && !skipGlobalFadeCss) {
  document.documentElement.classList.add("novyra-motion");
}

var intro = document.getElementById("intro");
if (intro) {
  if (reduceMotion) {
    intro.remove();
    ScrollTrigger.refresh();
  } else {
    gsap.set(intro, { opacity: 1 });
    var title = intro.querySelector(".intro-title");
    gsap
      .timeline()
      .from(title, { scale: 0.88, opacity: 0, duration: 0.7, ease: "power2.out" })
      .to({}, { duration: 0.5 })
      .to(intro, { opacity: 0, duration: 0.6, ease: "power2.in", delay: 0.4 })
      .call(function () {
        intro.remove();
        ScrollTrigger.refresh();
      });
  }
}

function initBonusRecruitSectionMotion() {
  var root = document.querySelector(".bonus-recruit-premium");
  if (!root) return;
  var items = root.querySelectorAll("[data-bonus-recruit-reveal]");
  if (!items.length) return;
  if (reduceMotion) return;
  gsap.from(items, {
    scrollTrigger: { trigger: root, start: "top 86%", once: true },
    y: 28,
    opacity: 0,
    stagger: 0.12,
    duration: 0.56,
    ease: "power3.out"
  });
}

function initBonusPageMotion() {
  gsap.from(".navbar", {
    y: -28,
    opacity: 0,
    duration: 0.55,
    ease: "power2.out",
    delay: 0.04,
    clearProps: "transform"
  });

  var hero = document.querySelector(".bonus-page-hero");
  if (hero) {
    gsap
      .timeline({ delay: 0.06 })
      .from(hero.querySelector(".bonus-kicker"), {
        x: -44,
        opacity: 0,
        duration: 0.48,
        ease: "power3.out"
      })
      .from(
        hero.querySelector("h1"),
        { opacity: 0, y: 28, skewX: 5, duration: 0.62, ease: "power3.out" },
        "-=0.24"
      )
      .from(
        hero.querySelector(".hero-lead"),
        { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" },
        "-=0.36"
      );
  }

  var bonusIntro = document.querySelector(".bonus-intro");
  if (bonusIntro) {
    gsap.fromTo(
      bonusIntro,
      { clipPath: "inset(0 100% 0 0)", opacity: 0.15 },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: { trigger: bonusIntro, start: "top 88%", once: true }
      }
    );
  }

  function trackReveal(track, fromX, rot) {
    if (!track) return;
    var rows = track.querySelectorAll(".bonus-ladder li");
    var strips = track.querySelectorAll(".bonus-strip");
    var qual = track.querySelector(".bonus-qual");
    gsap
      .timeline({
        scrollTrigger: { trigger: track, start: "top 84%", once: true }
      })
      .from(track, { x: fromX, rotateZ: rot, opacity: 0, duration: 0.72, ease: "power3.out" })
      .from(
        rows,
        { opacity: 0, y: 12, stagger: 0.045, duration: 0.38, ease: "power1.out" },
        "-=0.45"
      )
      .from(strips, { opacity: 0, y: 8, duration: 0.35, ease: "power2.out" }, "-=0.2")
      .from(qual, { opacity: 0, y: 10, duration: 0.4, ease: "power2.out" }, "-=0.25");
  }

  trackReveal(document.querySelector(".bonus-track--elite"), 64, 1.2);

  initBonusRecruitSectionMotion();

  var ctaSection = document.querySelector(".section--bonus-cta");
  if (ctaSection) {
    gsap.from(ctaSection.querySelectorAll(".cta-btn"), {
      scrollTrigger: { trigger: ctaSection, start: "top 92%", once: true },
      y: 22,
      opacity: 0,
      stagger: 0.14,
      duration: 0.52,
      ease: "back.out(1.15)"
    });
  }

  var foot = document.querySelector("footer.site-footer");
  if (foot) {
    gsap.from(foot, {
      scrollTrigger: { trigger: foot, start: "top 97%", once: true },
      opacity: 0,
      y: 14,
      duration: 0.55,
      ease: "power2.out"
    });
  }
}

function initMemberPageMotion() {
  var steps = document.querySelector(".page-member .steps");
  if (steps) {
    gsap.from(steps.querySelectorAll(".step"), {
      scrollTrigger: { trigger: steps, start: "top 82%", once: true },
      opacity: 0,
      x: -40,
      stagger: 0.16,
      duration: 0.58,
      ease: "back.out(1.05)"
    });
  }
}

var NOVYRA_TIKTOK_APPLY_URL = "https://www.tiktok.com/t/ZMBdXtxLH/";

function initTiktokApplyButtons() {
  document.querySelectorAll("[data-join-open], [data-member-join-open]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        window.open(NOVYRA_TIKTOK_APPLY_URL, "_blank", "noopener,noreferrer");
      } catch (eOpen) {
        window.location.href = NOVYRA_TIKTOK_APPLY_URL;
      }
    });
  });
}

function initMemberCarousel() {
  var root = document.querySelector("[data-member-carousel]");
  if (!root) return;
  var track = root.querySelector(".member-carousel__track");
  var slides = root.querySelectorAll(".member-carousel__slide");
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");
  var proofSection = root.closest ? root.closest(".member-proof") : null;
  var dotsHost = proofSection
    ? proofSection.querySelector("[data-carousel-dots]")
    : document.querySelector("[data-carousel-dots]");
  if (!track || slides.length === 0) return;

  var i = 0;
  var n = slides.length;

  function setTransform() {
    // translateX(%) is relative to the track element's own width (one slide),
    // not the sum of slide widths — use whole-slide steps, not i/n of one slide.
    track.style.transform = "translateX(-" + i * 100 + "%)";
  }

  function syncDots() {
    if (!dotsHost) return;
    var btns = dotsHost.querySelectorAll(".member-carousel__dot");
    for (var d = 0; d < btns.length; d++) {
      btns[d].setAttribute("aria-current", d === i ? "true" : "false");
    }
  }

  function go(delta) {
    i = (i + delta + n) % n;
    setTransform();
    syncDots();
  }

  if (dotsHost && n > 0) {
    dotsHost.innerHTML = "";
    for (var j = 0; j < n; j++) {
      (function (idx) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "member-carousel__dot";
        dot.setAttribute("aria-label", "Slide " + (idx + 1));
        dot.addEventListener("click", function () {
          i = idx;
          setTransform();
          syncDots();
        });
        dotsHost.appendChild(dot);
      })(j);
    }
    syncDots();
  }

  if (!reduceMotion) {
    track.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
  } else {
    track.style.transition = "none";
  }

  setTransform();

  if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });
}

function initMemberStatCounters() {
  var sec = document.getElementById("member-stats");
  var nums = sec
    ? sec.querySelectorAll("[data-member-stat-target]")
    : document.querySelectorAll("[data-member-stat-target]");
  if (!nums.length) return;

  function run(el) {
    var raw = el.getAttribute("data-member-stat-target");
    if (raw == null) return;
    var trimmed = String(raw).trim();
    if (!/^\d+$/.test(trimmed)) return;
    var target = parseInt(trimmed, 10);
    if (!isFinite(target)) return;
    var start = performance.now();
    var dur = reduceMotion ? 0 : 1100;
    function tick(now) {
      var t = dur <= 0 ? 1 : Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    }
    requestAnimationFrame(tick);
  }

  if (!sec || typeof IntersectionObserver === "undefined") {
    nums.forEach(run);
    return;
  }
  var fired = false;
  var io = new IntersectionObserver(
    function (ents) {
      if (fired) return;
      for (var k = 0; k < ents.length; k++) {
        if (ents[k].isIntersecting && ents[k].intersectionRatio > 0.08) {
          fired = true;
          io.disconnect();
          nums.forEach(run);
          break;
        }
      }
    },
    { threshold: [0, 0.08, 0.2] }
  );
  io.observe(sec);
}

function initMemberPageExtras() {
  initMemberCarousel();
  initMemberStatCounters();
}

function initTeamPageMotion() {
  var block = document.querySelector(".page-team .team-ceo");
  if (!block) return;
  var fig = block.querySelector(".team-ceo__figure");
  var content = block.querySelector(".team-ceo__content");
    gsap
      .timeline({
        scrollTrigger: { trigger: block, start: "top 86%", once: true }
      })
      .from(fig, { x: -72, opacity: 0, rotateZ: -2.5, duration: 0.76, ease: "power3.out" })
      .from(
        content,
        { x: 72, opacity: 0, rotateZ: 1.5, duration: 0.74, ease: "power3.out" },
        "-=0.58"
      );
}

function initTrainingPageMotion() {
  gsap.utils.toArray(".page-training section.section").forEach(function (sec, i) {
    var fromX = i % 2 === 0 ? -56 : 56;
    gsap.fromTo(
      sec,
      { opacity: 0, x: fromX },
      {
        opacity: 1,
        x: 0,
        duration: 0.74,
        ease: "power2.out",
        scrollTrigger: { trigger: sec, start: "top 88%", once: true }
      }
    );
  });
}

function initAboutPageMotion() {
  gsap.utils.toArray(".page-about section.section").forEach(function (sec, i) {
    var fromY = i % 2 === 0 ? 36 : -36;
    gsap.fromTo(
      sec,
      { opacity: 0, y: fromY },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sec, start: "top 88%", once: true }
      }
    );
  });
}

function initAboutDepthLeadMotion() {
  if (reduceMotion) return;
  var root = document.querySelector(".page-about [data-about-depth-lead]");
  if (!root) return;
  /* Same motion as About section index 1 (Expertise block): from y -36, 0.7s power2.out.
   * Hero sits in the first viewport, so a section-style "top 88%" trigger does not fire when
   * scrolling down; time the reveal after the compact hero h1 + .hero-lead stagger instead. */
  var introStillHere = document.getElementById("intro") !== null;
  var heroDelay = introStillHere ? 2.25 : 0.12;
  /* After compact hero: about page has h1 + .hero-lead only (stagger 0.1); reveal near end of lead. */
  var afterHeroLead = heroDelay + 0.1 + 0.45;
  gsap.fromTo(
    root,
    { opacity: 0, y: -36 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: afterHeroLead,
      onComplete: function () {
        root.classList.add("is-inview");
      }
    }
  );
}

/** Home testimonials (“Built on trust…”): match About section motion (fromTo, power2.out, top 88%). */
function initHomeTrustBubblesMotion() {
  if (reduceMotion) return;
  var section = document.querySelector("section.testimonials");
  if (!section) return;
  var head = section.querySelector(".section-head");
  var cards = section.querySelectorAll(".testimonial-card");
  if (!cards.length) return;

  var tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: "top 88%", once: true }
  });

  if (head) {
    tl.fromTo(
      head,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      0
    );
  }

  tl.fromTo(
    cards,
    {
      opacity: 0,
      y: function (i) {
        return i % 2 === 0 ? 36 : -36;
      }
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.12
    },
    0
  );
}

if (!reduceMotion) {
  if (document.querySelector("[data-hero-accent]")) {
    document.documentElement.classList.add("novyra-hero-accent-motion");
  }

  if (!isBonusPage) {
    gsap.from(".navbar", {
      y: -36,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.06,
      clearProps: "transform"
    });
  }

  var introStillHere = document.getElementById("intro") !== null;
  var heroDelay = introStillHere ? 2.25 : 0.12;

  if (!isBonusPage) {
    document.querySelectorAll(".hero").forEach(function (hero) {
      var parts = [];
      var tag = hero.querySelector(".hero-tag") || hero.querySelector(".bonus-kicker");
      if (tag) parts.push(tag);
      /* Home masked-brand hero: do not opacity-tween the whole `h1` (Safari + video/SVG subtree
         can read as a long “empty” black band while opacity is 0; lockup stays visible). */
      var isHomeCosmosHero = hero.classList.contains("hero--home-cosmos");
      var h = hero.querySelector("h1");
      if (h && !isHomeCosmosHero) parts.push(h);
      var trust = hero.querySelector(".trust-badge");
      if (trust) parts.push(trust);
      var lead = hero.querySelector(".hero-lead-pro") || hero.querySelector(".hero-lead");
      if (lead) parts.push(lead);
      var actions = hero.querySelector(".hero-actions");
      if (actions) parts.push(actions);
      var ctaRow = hero.querySelector(":scope > .cta-row");
      if (ctaRow) parts.push(ctaRow);
      if (!parts.length) return;
      var isHomeGlass = hero.classList.contains("hero--home-cosmos") && lead && lead.classList.contains("hero-lead-pro");
      var motionDelay = isHomeGlass ? (introStillHere ? 2.0 : 0.12) : heroDelay;
      gsap.from(parts, {
        opacity: 0,
        y: isHomeGlass ? 16 : 30,
        duration: isHomeGlass ? 1.05 : 0.75,
        stagger: isHomeGlass ? 0.12 : 0.1,
        ease: isHomeGlass ? "power2.out" : "power3.out",
        delay: motionDelay
      });
    });
  }

  if (!skipGlobalFadeCss) {
    gsap.utils.toArray(".fade").forEach(function (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 34, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }

  var featureSection = document.querySelector("section.features");
  if (featureSection) {
    var headBits = featureSection.querySelectorAll(".features-title, .features-sub, .features-lead");
    var featureCards = featureSection.querySelectorAll(".feature-card");
    var preReveal = gsap.utils.toArray(headBits).concat(gsap.utils.toArray(featureCards));
    gsap.set(preReveal, { opacity: 0, y: 26 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: featureSection,
          start: "top 84%",
          once: true
        }
      })
      .to(headBits, { opacity: 1, y: 0, duration: 0.58, stagger: 0.1, ease: "power2.out" })
      .to(
        featureCards,
        { opacity: 1, y: 0, duration: 0.52, stagger: 0.045, ease: "power2.out" },
        "-=0.3"
      );
  }

  var pageLinks = document.querySelector(".page-links");
  if (pageLinks) {
    var pHead = pageLinks.querySelector(".section-head");
    var pCards = pageLinks.querySelectorAll(".page-link-card");
    var pTargets = gsap.utils.toArray(pCards);
    if (pHead) pTargets.unshift(pHead);
    if (pTargets.length) gsap.set(pTargets, { opacity: 0, y: 24 });
    var pTl = gsap.timeline({
      scrollTrigger: {
        trigger: pageLinks,
        start: "top 86%",
        once: true
      }
    });
    if (pHead) {
      pTl.to(pHead, { opacity: 1, y: 0, duration: 0.58, ease: "power2.out" });
    }
    pTl.to(
      pCards,
      { opacity: 1, y: 0, duration: 0.52, stagger: 0.08, ease: "power2.out" },
      pHead ? "-=0.3" : 0
    );
  }

  /* Home: section.stats-strip follows .page-links; reveal uses global .fade ScrollTrigger above. */

  var footer = document.querySelector("footer.site-footer");
  if (footer && !isBonusPage) {
    gsap.from(footer, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: footer,
        start: "top 96%",
        once: true
      }
    });
  }

  if (isBonusPage) {
    initBonusPageMotion();
  } else if (body.classList.contains("page-member")) {
    initMemberPageMotion();
    initMemberPageExtras();
  } else if (body.classList.contains("page-team")) {
    initTeamPageMotion();
  } else if (body.classList.contains("page-training")) {
    initTrainingPageMotion();
  } else if (body.classList.contains("page-about")) {
    initAboutPageMotion();
    initAboutDepthLeadMotion();
  } else if (body.classList.contains("page-home")) {
    initHomeTrustBubblesMotion();
  }

  ScrollTrigger.refresh();
}

function isHomeMobileNoVideo() {
  if (!document.body || !document.body.classList.contains("page-home")) return false;
  try {
    return typeof matchMedia !== "undefined" && matchMedia("(max-width: 900px)").matches;
  } catch (eHomeMob) {
    return false;
  }
}

function isForeignObjectHeroVideoFragile() {
  try {
    var u = String(navigator.userAgent || "");
    if (/iP(hone|ad|od)/i.test(u)) return true;
    if (typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 1 && /Macintosh/i.test(u)) {
      return true;
    }
    return false;
  } catch (eFrag) {
    return false;
  }
}

function disableHomeHeroVideoEl(video) {
  if (!video) return;
  try {
    video.pause();
    video.removeAttribute("src");
    var sources = video.querySelectorAll("source");
    for (var si = 0; si < sources.length; si++) {
      sources[si].removeAttribute("src");
    }
    video.load();
    video.setAttribute("preload", "none");
    video.setAttribute("hidden", "");
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("tabindex", "-1");
    video.style.pointerEvents = "none";
  } catch (eVidOff) {
    /* noop */
  }
}

function disableAllHomeHeroVideos(root) {
  if (!root) return;
  var all = root.querySelectorAll(
    "video[data-hero-brand-video], video[data-hero-brand-inline-video-el], [data-hero-brand-video-montage] video"
  );
  for (var vi = 0; vi < all.length; vi++) {
    disableHomeHeroVideoEl(all[vi]);
  }
  var ivWrap = root.querySelector("[data-hero-brand-inline-video]");
  if (ivWrap) {
    try {
      ivWrap.setAttribute("hidden", "");
      ivWrap.setAttribute("aria-hidden", "true");
    } catch (eIvWrap) {
      /* noop */
    }
  }
}

function scrubHomeMobileVideoHash() {
  if (!isHomeMobileNoVideo()) return;
  try {
    var h = (window.location.hash || "").toLowerCase();
    if (!h) return;
    var id = h.slice(1);
    if (!id || /video|hero-video|hero-brand-video/.test(id)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  } catch (eHash) {
    /* noop */
  }
}

function initHomeMobileHeroNoVideo(root) {
  root._novyraHbVideosBound = true;
  root.classList.add("hero-brand-lockup--mobile-no-video");
  disableAllHomeHeroVideos(root);
  root.classList.remove("hero-brand-lockup--mask-active");
  root.classList.remove("hero-brand-lockup--ready");
  root.classList.add("hero-brand-lockup--stroke-fallback");
  if (isForeignObjectHeroVideoFragile()) {
    root.classList.add("hero-brand-lockup--plain-fallback");
  }
  scrubHomeMobileVideoHash();
}

function bindHomeMobileNoVideoGuards() {
  if (!document.body || !document.body.classList.contains("page-home")) return;
  scrubHomeMobileVideoHash();
  window.addEventListener("hashchange", scrubHomeMobileVideoHash, { passive: true });
  window.addEventListener(
    "pageshow",
    function () {
      if (!isHomeMobileNoVideo()) return;
      var root = document.querySelector("[data-hero-brand-lockup]");
      if (root) disableAllHomeHeroVideos(root);
    },
    { passive: true }
  );
}

function initHomeHeroBrandLockup() {
  var root = document.querySelector("[data-hero-brand-lockup]");
  if (!root) return;

  var measure = root.querySelector(".hero-brand-measure");
  var svg = root.querySelector("[data-hero-brand-svg]");
  var fb1 = root.querySelector("[data-hero-brand-fallback-l1]") || root.querySelector(".hero-brand__line1");
  var fb2 = root.querySelector("[data-hero-brand-fallback-l2]") || root.querySelector(".hero-brand__line2");
  if (!measure || !svg) return;

  var mEl1 = measure.querySelector(".hero-brand-measure__l1");
  var mEl2 = measure.querySelector(".hero-brand-measure__l2");
  if (!mEl1 || !mEl2) return;

  var maskBg = svg.querySelector("[data-hero-brand-mask-bg]");
  var fo = svg.querySelector("[data-hero-brand-fo]");
  var glass = svg.querySelector(".hero-brand-glass-veil");
  var maskL1 = svg.querySelector("[data-hero-brand-mask-l1]");
  var maskL2 = svg.querySelector("[data-hero-brand-mask-l2]");
  var strokeL1 = svg.querySelector("[data-hero-brand-stroke-l1]");
  var strokeL2 = svg.querySelector("[data-hero-brand-stroke-l2]");

  function syncMeasureTextFromFallback() {
    if (fb1 && mEl1) mEl1.textContent = fb1.textContent;
    if (fb2 && mEl2) mEl2.textContent = fb2.textContent;
  }

  function layoutSvg() {
    syncMeasureTextFromFallback();
    var mRect = measure.getBoundingClientRect();
    if (mRect.width < 2 || mRect.height < 2) {
      return;
    }

    var r1 = mEl1.getBoundingClientRect();
    var r2 = mEl2.getBoundingClientRect();
    /* Tight layout reference (glyphs + small slack) — used to scale typography when the canvas grows. */
    var basePadX = Math.max(8, mRect.height * 0.048) + mRect.width * 0.055;
    var basePadY = Math.max(8, mRect.height * 0.048);
    var vbW0 = Math.ceil(mRect.width + basePadX * 2);
    var vbH0 = Math.ceil(mRect.height + basePadY * 2);

    /* Large cinematic canvas: foreignObject / mask viewBox extend far past the wordmark so the montage
       is a giant surface; glyphs stay same visual size via canvasScale on mask + stroke typography. */
    var win = typeof window !== "undefined" ? window : null;
    var iw = win && win.innerWidth ? win.innerWidth : mRect.width * 3;
    var ih = win && win.innerHeight ? win.innerHeight : mRect.height * 4;
    var narrow = iw < 540;
    var cinematicMarginX = Math.max(mRect.width * (narrow ? 0.52 : 0.72), iw * (narrow ? 0.1 : 0.14));
    var cinematicMarginY = Math.max(mRect.height * (narrow ? 0.62 : 0.9), ih * (narrow ? 0.08 : 0.1));
    var padX = basePadX + cinematicMarginX;
    var padY = basePadY + cinematicMarginY;
    var vbW = Math.ceil(mRect.width + padX * 2);
    var vbH = Math.ceil(mRect.height + padY * 2);
    var canvasScale = Math.min(vbW / vbW0, vbH / vbH0);
    if (!isFinite(canvasScale) || canvasScale < 1) {
      canvasScale = 1;
    }

    var cx = vbW / 2;
    var y1 = padY + (r1.top - mRect.top + r1.height / 2);
    var y2 = padY + (r2.top - mRect.top + r2.height / 2);

    var cs1 = window.getComputedStyle(mEl1);
    var cs2 = window.getComputedStyle(mEl2);
    var ff = cs1.fontFamily;
    var fw1 = cs1.fontWeight;
    var fw2 = cs2.fontWeight;

    /* Slightly heavier SVG glyphs than measured CSS (same delta on mask + stroke) so
       more video shows through; stroke-width below nudges in lockstep with size. */
    function heavierSvgFontWeight(cssWeight) {
      var n = parseInt(String(cssWeight), 10);
      if (isNaN(n)) return cssWeight;
      return String(Math.min(900, n + 38));
    }
    var fw1Svg = heavierSvgFontWeight(fw1);
    var fw2Svg = heavierSvgFontWeight(fw2);
    var fs1 = cs1.fontSize;
    var fs2 = cs2.fontSize;
    var ls1 = cs1.letterSpacing;
    var ls2 = cs2.letterSpacing;
    var tx1 = mEl1.textContent || "";
    var tx2 = mEl2.textContent || "";

    function scaleCssFontSize(len, sc) {
      if (!sc || sc === 1) return len;
      var s = String(len).trim();
      var mpx = s.match(/^([\d.]+)\s*px$/i);
      if (mpx) return String(parseFloat(mpx[1]) * sc) + "px";
      var mrem = s.match(/^([\d.]+)\s*rem$/i);
      if (mrem) return String(parseFloat(mrem[1]) * sc) + "rem";
      return len;
    }

    var fs1Svg = scaleCssFontSize(fs1, canvasScale);
    var fs2Svg = scaleCssFontSize(fs2, canvasScale);

    svg.setAttribute("viewBox", "0 0 " + vbW + " " + vbH);
    if (maskBg) {
      maskBg.setAttribute("x", "0");
      maskBg.setAttribute("y", "0");
      maskBg.setAttribute("width", String(vbW));
      maskBg.setAttribute("height", String(vbH));
    }
    if (fo) {
      fo.setAttribute("x", "0");
      fo.setAttribute("y", "0");
      fo.setAttribute("width", String(vbW));
      fo.setAttribute("height", String(vbH));
    }
    if (glass) {
      glass.setAttribute("x", "0");
      glass.setAttribute("y", "0");
      glass.setAttribute("width", String(vbW));
      glass.setAttribute("height", String(vbH));
    }

    function applyText(el, y, fs, ls, t, fwLine) {
      if (!el) return;
      el.textContent = t;
      el.setAttribute("x", String(cx));
      el.setAttribute("y", String(y));
      el.setAttribute("font-family", ff);
      el.setAttribute("font-weight", fwLine);
      el.setAttribute("font-size", fs);
      el.setAttribute("letter-spacing", ls);
      el.setAttribute("text-anchor", "middle");
      el.setAttribute("dominant-baseline", "middle");
    }

    applyText(maskL1, y1, fs1Svg, ls1, tx1, fw1Svg);
    applyText(maskL2, y2, fs2Svg, ls2, tx2, fw2Svg);
    applyText(strokeL1, y1, fs1Svg, ls1, tx1, fw1Svg);
    applyText(strokeL2, y2, fs2Svg, ls2, tx2, fw2Svg);

    var f1 = parseFloat(fs1) || 64;
    var f2 = parseFloat(fs2) || 36;
    var iwNarrow = win && win.innerWidth && win.innerWidth < 540;
    var s1 = iwNarrow ? 0.026 : 0.031;
    var s2 = iwNarrow ? 0.02 : 0.024;
    var minW1 = iwNarrow ? 0.88 : 1.02;
    var minW2 = iwNarrow ? 0.72 : 0.84;
    if (strokeL1) strokeL1.setAttribute("stroke-width", String(Math.max(minW1, f1 * canvasScale * s1)));
    if (strokeL2) strokeL2.setAttribute("stroke-width", String(Math.max(minW2, f2 * canvasScale * s2)));
  }

  function scheduleLayout() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layoutSvg).catch(layoutSvg);
    } else {
      requestAnimationFrame(layoutSvg);
    }
  }

  if (!root._novyraHbLayoutBound) {
    root._novyraHbLayoutBound = true;
    if (typeof ResizeObserver !== "undefined") {
      var roRaf = 0;
      var ro = new ResizeObserver(function () {
        if (roRaf) return;
        roRaf = requestAnimationFrame(function () {
          roRaf = 0;
          scheduleLayout();
        });
      });
      ro.observe(root);
    } else {
      var winRaf = 0;
      window.addEventListener(
        "resize",
        function () {
          if (winRaf) return;
          winRaf = requestAnimationFrame(function () {
            winRaf = 0;
            scheduleLayout();
          });
        },
        { passive: true }
      );
    }
  }

  scheduleLayout();

  if (isHomeMobileNoVideo()) {
    if (!root._novyraHbVideosBound) {
      initHomeMobileHeroNoVideo(root);
    }
    return;
  }

  if (root._novyraHbVideosBound) {
    return;
  }

  var montage =
    root.querySelector("[data-hero-brand-video-montage]") ||
    (svg && svg.querySelector("[data-hero-brand-video-montage]"));
  var videos = [];
  if (montage) {
    videos = montage.querySelectorAll("video[data-hero-brand-video]");
  } else if (fo) {
    videos = fo.querySelectorAll("video[data-hero-brand-video]");
  }

  if (!montage && videos.length && videos[0]) {
    montage =
      videos[0].closest("[data-hero-brand-video-montage]") ||
      (fo && fo.contains(videos[0]) ? fo : null);
  }

  if (!montage || videos.length < 1 || !fo) {
    useStrokeFallback();
    return;
  }

  var preloadVal = "auto";

  function applyVideoAttrs(video) {
    try {
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.setAttribute("loop", "");
      video.setAttribute("preload", preloadVal);
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      if ("disablePictureInPicture" in video) {
        try {
          video.disablePictureInPicture = true;
        } catch (e0) {
          /* noop */
        }
        try {
          video.setAttribute("disablepictureinpicture", "");
        } catch (e0b) {
          /* noop */
        }
      }
    } catch (eAttr) {
      /* noop */
    }
  }

  for (var pi = 0; pi < videos.length; pi++) {
    applyVideoAttrs(videos[pi]);
  }

  if (isForeignObjectHeroVideoFragile()) {
    root._novyraHbVideosBound = true;
    useStrokeFallback();
    root.classList.add("hero-brand-lockup--plain-fallback");
    var ivWrap = root.querySelector("[data-hero-brand-inline-video]");
    var ivEl = root.querySelector("[data-hero-brand-inline-video-el]");
    if (ivWrap && ivEl) {
      try {
        ivWrap.removeAttribute("hidden");
        ivWrap.setAttribute("aria-hidden", "false");
      } catch (eIv0) {
        /* noop */
      }
      applyVideoAttrs(ivEl);
      var heroSecIv = root.closest("section.hero");
      function playInlineHeroVideo() {
        try {
          var attIv = ivEl.play();
          if (attIv && typeof attIv.catch === "function") {
            attIv.catch(function () {});
          }
        } catch (eIv1) {
          /* noop */
        }
      }
      function pauseInlineHeroVideo() {
        try {
          ivEl.pause();
        } catch (eIv2) {
          /* noop */
        }
      }
      if (heroSecIv && typeof IntersectionObserver !== "undefined") {
        var ivIo = new IntersectionObserver(
          function (entriesIv) {
            var visIv = false;
            for (var zi = 0; zi < entriesIv.length; zi++) {
              if (entriesIv[zi].isIntersecting && entriesIv[zi].intersectionRatio > 0.02) {
                visIv = true;
                break;
              }
            }
            if (!visIv) {
              pauseInlineHeroVideo();
            } else {
              playInlineHeroVideo();
            }
          },
          { threshold: [0, 0.02, 0.08] }
        );
        ivIo.observe(heroSecIv);
      } else {
        playInlineHeroVideo();
      }
      try {
        ivEl.addEventListener(
          "loadeddata",
          function () {
            playInlineHeroVideo();
          },
          { passive: true }
        );
      } catch (eIvLd) {
        /* noop */
      }
    }
    return;
  }

  function hasUsableSource(video) {
    var direct = video.getAttribute("src");
    if (direct && direct.trim()) return true;
    var sources = video.querySelectorAll("source");
    for (var i = 0; i < sources.length; i++) {
      var url = sources[i].getAttribute("src");
      if (url && url.trim()) return true;
    }
    return false;
  }

  function getMontageVideos() {
    var out = [];
    for (var vi = 0; vi < videos.length; vi++) {
      out.push(videos[vi]);
    }
    return out;
  }

  for (var s = 0; s < videos.length; s++) {
    if (!hasUsableSource(videos[s])) {
      useStrokeFallback();
      return;
    }
  }

  root._novyraHbVideosBound = true;

  /* Stagger loop phases (0, ⅓, ⅔) so the blended stack feels less repetitive. */
  var STAGGER_PHASE = [0, 1 / 3, 2 / 3];
  function bindMontageStagger(videoEl, idx) {
    if (!videoEl || videoEl._novyraHbStaggerBind) return;
    videoEl._novyraHbStaggerBind = true;
    function applyStaggerPhase() {
      if (videoEl._novyraHbPhaseApplied) return;
      var dur = videoEl.duration;
      if (typeof dur !== "number" || !isFinite(dur) || dur < 0.5) return;
      var phase = STAGGER_PHASE[idx < STAGGER_PHASE.length ? idx : 0] || 0;
      var target = (dur * phase) % dur;
      if (target < 0) target = 0;
      try {
        videoEl.currentTime = target;
        videoEl._novyraHbPhaseApplied = true;
      } catch (eSt) {
        /* seek may throw before data is buffered; loadedmetadata will retry */
      }
    }
    if (videoEl.readyState >= 1) applyStaggerPhase();
    videoEl.addEventListener("loadedmetadata", applyStaggerPhase, { passive: true });
  }
  if (videos.length > 1) {
    for (var st = 0; st < videos.length; st++) {
      bindMontageStagger(videos[st], st);
    }
  }

  function pauseAll() {
    for (var p = 0; p < videos.length; p++) {
      try {
        videos[p].pause();
      } catch (e2) {
        /* noop */
      }
    }
  }

  function playMontageVideos() {
    var req = getMontageVideos();
    for (var pf = 0; pf < req.length; pf++) {
      var vis = req[pf];
      if (!vis) continue;
      try {
        if (!vis.paused && vis.readyState >= 2) continue;
        var att = vis.play();
        if (att && typeof att.catch === "function") att.catch(function () {});
      } catch (ePl) {
        /* noop */
      }
    }
  }

  var heroSection = root.closest("section.hero");
  if (heroSection && typeof IntersectionObserver !== "undefined") {
    var ioPlayRaf = 0;
    var io = new IntersectionObserver(
      function (entries) {
        var vis = false;
        for (var ix = 0; ix < entries.length; ix++) {
          if (entries[ix].isIntersecting && entries[ix].intersectionRatio > 0.02) {
            vis = true;
            break;
          }
        }
        if (!vis) {
          pauseAll();
        } else if (root.classList.contains("hero-brand-lockup--ready")) {
          if (ioPlayRaf) return;
          ioPlayRaf = requestAnimationFrame(function () {
            ioPlayRaf = 0;
            playMontageVideos();
          });
        }
      },
      { threshold: [0, 0.02, 0.08] }
    );
    io.observe(heroSection);
  }

  function useStrokeFallback() {
    root.classList.remove("hero-brand-lockup--mask-active");
    root.classList.remove("hero-brand-lockup--ready");
    root.classList.add("hero-brand-lockup--stroke-fallback");
    pauseAll();
  }

  function hasRenderableFrame(video) {
    if (video.error) return false;
    if (!video.videoWidth || !video.videoHeight) return false;
    /* HAVE_METADATA (1) exposes dimensions; HAVE_CURRENT_DATA (2+) means a decoded frame.
       After a resolved play(), some engines still sit at 1 briefly — treating 1+dimensions as
       renderable avoids a dead state where canplay/loadeddata already fired before we listened. */
    return video.readyState >= 1;
  }

  var tryActivateRaf = 0;
  function scheduleTryActivate() {
    if (tryActivateRaf) return;
    tryActivateRaf = requestAnimationFrame(function () {
      tryActivateRaf = 0;
      tryActivate();
    });
  }

  var activated = false;
  var activationFailed = false;
  var activationInFlight = false;

  function tryActivate() {
    if (activated || activationFailed || activationInFlight) return;
    if (root.classList.contains("hero-brand-lockup--stroke-fallback")) return;

    var required = getMontageVideos();
    if (!required.length) {
      activationFailed = true;
      useStrokeFallback();
      return;
    }

    for (var i = 0; i < required.length; i++) {
      if (required[i].error) {
        activationFailed = true;
        useStrokeFallback();
        return;
      }
    }

    activationInFlight = true;
    var flightClear = null;
    try {
      flightClear = window.setTimeout(function () {
        flightClear = null;
        activationInFlight = false;
        tryActivate();
      }, 4200);
    } catch (eFl) {
      flightClear = null;
    }
    var promises = [];
    for (var j = 0; j < required.length; j++) {
      try {
        var attempt = required[j].play();
        if (attempt && typeof attempt.then === "function") {
          promises.push(attempt);
        } else {
          promises.push(Promise.resolve());
        }
      } catch (err) {
        promises.push(Promise.reject(err));
      }
    }

    Promise.all(promises)
      .then(function () {
        if (flightClear) {
          try {
            window.clearTimeout(flightClear);
          } catch (eCl) {
            /* noop */
          }
          flightClear = null;
        }
        activationInFlight = false;
        if (activated || activationFailed) return;
        for (var k = 0; k < required.length; k++) {
          if (required[k].error) {
            activationFailed = true;
            useStrokeFallback();
            return;
          }
          if (!hasRenderableFrame(required[k])) {
            try {
              window.setTimeout(function () {
                tryActivate();
              }, 50);
            } catch (eRaf) {
              tryActivate();
            }
            return;
          }
        }
        activated = true;
        root.classList.remove("hero-brand-lockup--stroke-fallback");
        root.classList.add("hero-brand-lockup--mask-active");
        root.classList.add("hero-brand-lockup--ready");
        /* Pans are CSS-only; keep muted video playing so the mask always shows pixels (reduced-motion too). */
        playMontageVideos();
      })
      .catch(function () {
        if (flightClear) {
          try {
            window.clearTimeout(flightClear);
          } catch (eCl2) {
            /* noop */
          }
          flightClear = null;
        }
        activationInFlight = false;
        if (activated) return;
        activationFailed = true;
        useStrokeFallback();
      });
  }

  function onVideoFail(ev) {
    var tgt = ev && ev.target;
    if (!tgt || tgt.tagName !== "VIDEO" || !montage.contains(tgt)) return;
    if (activated) return;
    activationFailed = true;
    useStrokeFallback();
  }

  for (var e = 0; e < videos.length; e++) {
    videos[e].addEventListener("error", onVideoFail);
  }

  ["loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing"].forEach(function (evt) {
    for (var k = 0; k < videos.length; k++) {
      videos[k].addEventListener(evt, scheduleTryActivate);
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      pauseAll();
    } else if (root.classList.contains("hero-brand-lockup--ready")) {
      playMontageVideos();
    }
  });

  window.addEventListener(
    "pagehide",
    function () {
      pauseAll();
    },
    { passive: true }
  );

  tryActivate();

  window.setTimeout(function () {
    if (activated || activationFailed) return;
    var req = getMontageVideos();
    for (var i = 0; i < req.length; i++) {
      if (req[i].error) {
        activationFailed = true;
        useStrokeFallback();
        return;
      }
    }
    activationFailed = true;
    useStrokeFallback();
  }, 8000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    bindHomeMobileNoVideoGuards();
    initHomeHeroBrandLockup();
  });
} else {
  bindHomeMobileNoVideoGuards();
  initHomeHeroBrandLockup();
}

window.addEventListener("novyra:i18n-applied", function () {
  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  initHomeHeroBrandLockup();
});

initTiktokApplyButtons();
