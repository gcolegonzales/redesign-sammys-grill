/* Sammy's Grill — Prairieville | redesign concept interactions */
(function () {
  "use strict";

  /* ---- Current year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header shrink ---- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      mobileNav.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        mobileNav.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      });
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

  /* ---- Location switcher (order card) ---- */
  var locToggle = document.getElementById("locToggle");
  if (locToggle) {
    var opts = locToggle.querySelectorAll(".loc-opt");
    opts.forEach(function (opt) {
      opt.addEventListener("click", function () {
        opts.forEach(function (o) {
          o.classList.remove("is-active");
          o.setAttribute("aria-pressed", "false");
        });
        opt.classList.add("is-active");
        opt.setAttribute("aria-pressed", "true");
      });
    });
  }

  /* ---- Non-wired order demo feedback ---- */
  var orderBtn = document.getElementById("orderBtn");
  var orderNote = document.getElementById("orderNote");
  if (orderBtn && orderNote) {
    orderBtn.addEventListener("click", function () {
      var active = document.querySelector(".loc-opt.is-active");
      var loc = active ? active.textContent.trim() : "Prairieville";
      orderNote.textContent = "Nice pick! In the live site this sends your order to " + loc + ". (Demo — checkout not wired.)";
      orderNote.style.color = "var(--red)";
    });
  }
})();
