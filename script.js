(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Testimonials carousel
  var slides = Array.prototype.slice.call(document.querySelectorAll("[data-slide]"));
  var prev = document.querySelector(".arrow--prev");
  var next = document.querySelector(".arrow--next");
  var current = 0;

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (slide, n) { slide.hidden = n !== current; });
  }

  if (slides.length > 1 && prev && next) {
    prev.addEventListener("click", function () { show(current - 1); });
    next.addEventListener("click", function () { show(current + 1); });
    document.querySelector(".testimonials").addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  } else {
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
  }

  // Contact form: submit to Netlify Forms without leaving the page
  var form = document.querySelector("form[name='contact']");
  var status = document.querySelector(".form__status");

  if (form && status && window.fetch) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var button = form.querySelector("button[type='submit']");
      button.disabled = true;

      var body = new URLSearchParams(new FormData(form)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed: " + res.status);
          form.reset();
          status.dataset.state = "success";
          status.textContent = "Thanks for reaching out — we'll be in touch soon.";
          status.hidden = false;
        })
        .catch(function () {
          status.dataset.state = "error";
          status.textContent = "Something went wrong. Please try again, or email us directly.";
          status.hidden = false;
        })
        .then(function () { button.disabled = false; });
    });
  }
})();
