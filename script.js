/* Sammy's Grill — Louisiana Bar & Grill | redesign concept interactions */
(function () {
  "use strict";

  /* ---- Current year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header: shrink + reveal on any upward scroll ---- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var lastY = window.scrollY;
    var onScroll = function () {
      var y = window.scrollY;
      if (y > 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");

      // Reveal on ANY upward scroll (even a few px); hide when scrolling down
      // past the header. Never hide while the mobile drawer is open.
      if (document.body.classList.contains("nav-open")) {
        header.classList.remove("hide");
      } else if (y > lastY && y > 120) {
        header.classList.add("hide");   // scrolling down
      } else if (y < lastY) {
        header.classList.remove("hide"); // scrolling up
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile drawer nav ---- */
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var scrim = document.getElementById("navScrim");

  if (toggle && mobileNav && scrim) {
    // Relocate drawer + scrim to be direct children of <body> so they escape
    // the header's backdrop-filter containing block (otherwise a position:fixed
    // descendant collapses to the header's box, creating a bottom gap).
    document.body.appendChild(scrim);
    document.body.appendChild(mobileNav);
    // Now safe to participate in layout (translated off-screen until opened).
    mobileNav.hidden = false;
    scrim.hidden = false;

    var openMenu = function () {
      mobileNav.classList.add("open");
      scrim.classList.add("open");
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    };
    var closeMenu = function () {
      mobileNav.classList.remove("open");
      scrim.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", function () {
      if (mobileNav.classList.contains("open")) closeMenu();
      else openMenu();
    });
    scrim.addEventListener("click", closeMenu);
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) closeMenu();
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
