gsap.registerPlugin(ScrollTrigger);

var reduceMotion =
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

var body = document.body;
var isBonusPage = body.classList.contains("page-bonus");
var skipGlobalFadeCss =
  isBonusPage || body.classList.contains("page-training") || body.classList.contains("page-about");

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

document.querySelectorAll(".mobile-menu a").forEach(function (link) {
  link.addEventListener("click", function () {
    closeMenu();
  });
});

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

  trackReveal(document.querySelector(".bonus-track--advance"), -64, -1.2);
  trackReveal(document.querySelector(".bonus-track--elite"), 64, 1.2);

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
      var h = hero.querySelector("h1");
      if (h) parts.push(h);
      var lead = hero.querySelector(".hero-lead");
      if (lead) parts.push(lead);
      var actions = hero.querySelector(".hero-actions");
      if (actions) parts.push(actions);
      var ctaRow = hero.querySelector(":scope > .cta-row");
      if (ctaRow) parts.push(ctaRow);
      var trust = hero.querySelector(".trust-badge");
      if (trust) parts.push(trust);
      if (!parts.length) return;
      gsap.from(parts, {
        opacity: 0,
        y: 30,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        delay: heroDelay
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

  var testimonials = document.querySelector(".testimonials");
  if (testimonials) {
    var tHead = testimonials.querySelector(".section-head");
    var tCards = testimonials.querySelectorAll(".testimonial-card");
    var tTargets = gsap.utils.toArray(tCards);
    if (tHead) tTargets.unshift(tHead);
    if (tTargets.length) gsap.set(tTargets, { opacity: 0, y: 24 });
    var tTl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonials,
        start: "top 86%",
        once: true
      }
    });
    if (tHead) {
      tTl.to(tHead, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    }
    tTl.to(
      tCards,
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.11, ease: "power2.out" },
      tHead ? "-=0.32" : 0
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
  } else if (body.classList.contains("page-team")) {
    initTeamPageMotion();
  } else if (body.classList.contains("page-training")) {
    initTrainingPageMotion();
  } else if (body.classList.contains("page-about")) {
    initAboutPageMotion();
  }

  ScrollTrigger.refresh();
}

window.addEventListener("novyra:i18n-applied", function () {
  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
});
