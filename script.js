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

    // Elements that make up the rest of the page (everything except the drawer +
    // scrim, which live at the end of <body>). Marked inert while the drawer is
    // open so background content can't be focused or read by AT.
    var pageRegions = [
      document.getElementById("siteHeader"),
      document.getElementById("main"),
      document.querySelector(".site-footer")
    ].filter(Boolean);

    // Keep the closed drawer out of the tab order and hidden from AT.
    var setDrawerHidden = function (hidden) {
      if (hidden) {
        mobileNav.setAttribute("inert", "");
        mobileNav.setAttribute("aria-hidden", "true");
      } else {
        mobileNav.removeAttribute("inert");
        mobileNav.removeAttribute("aria-hidden");
      }
    };
    setDrawerHidden(true);

    var getFocusable = function () {
      return mobileNav.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    };

    var openMenu = function () {
      mobileNav.classList.add("open");
      scrim.classList.add("open");
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      setDrawerHidden(false);
      pageRegions.forEach(function (el) {
        el.setAttribute("inert", "");
        el.setAttribute("aria-hidden", "true");
      });
      // Move focus into the drawer (the close button), without scrolling the
      // page — focus() on a fixed drawer element otherwise yanks the document
      // to the top, causing a jarring jump when the menu is opened mid-scroll.
      var f = getFocusable();
      if (f.length) f[0].focus({ preventScroll: true });
    };
    var closeMenu = function (returnFocus) {
      mobileNav.classList.remove("open");
      scrim.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      pageRegions.forEach(function (el) {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      });
      setDrawerHidden(true);
      if (returnFocus !== false) toggle.focus();
    };

    toggle.addEventListener("click", function () {
      if (mobileNav.classList.contains("open")) closeMenu();
      else openMenu();
    });
    scrim.addEventListener("click", function () { closeMenu(); });
    var navClose = document.getElementById("navClose");
    if (navClose) navClose.addEventListener("click", function () { closeMenu(); });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      // Nav-link tap: let the link navigate, but don't steal focus back to the
      // toggle (the target section should receive focus flow instead).
      a.addEventListener("click", function () { closeMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (!mobileNav.classList.contains("open")) return;
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key === "Tab") {
        // Trap focus within the drawer.
        var f = getFocusable();
        if (!f.length) return;
        var first = f[0];
        var last = f[f.length - 1];
        var active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !mobileNav.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !mobileNav.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    // Reset drawer + toggle state when crossing the desktop breakpoint so a
    // drawer left open on mobile doesn't leave stale state on desktop.
    var mq = window.matchMedia("(min-width: 901px)");
    var handleMq = function () {
      if (mq.matches && mobileNav.classList.contains("open")) {
        closeMenu(false);
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", handleMq);
    else if (mq.addListener) mq.addListener(handleMq);
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
