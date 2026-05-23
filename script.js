const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const dropdowns = document.querySelectorAll(".dropdown");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

dropdowns.forEach((dropdown) => {
  const dropdownLink = dropdown.querySelector("a");

  dropdownLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();

      dropdowns.forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove("active");
        }
      });

      dropdown.classList.toggle("active");
    }
  });
});

document.querySelectorAll(".nav-links a, .dropdown-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#") && window.innerWidth <= 1024) {
      navbar.classList.remove("active");

      const icon = menuToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");

      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  });
});

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 90) {
      element.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const counters = document.querySelectorAll(".stat-box h3");
let counterStarted = false;

function startCounters() {
  if (counterStarted) return;

  const statsSection = document.querySelector(".hero-stats");
  if (!statsSection) return;

  const statsTop = statsSection.getBoundingClientRect().top;

  if (statsTop < window.innerHeight - 50) {
    counters.forEach((counter) => {
      const text = counter.innerText;
      const target = parseInt(text.replace(/\D/g, ""));
      const suffix = text.replace(/[0-9]/g, "");

      let count = 0;
      const speed = Math.max(1, target / 85);

      function updateCounter() {
        if (count < target) {
          count += speed;
          counter.innerText = Math.ceil(count) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target + suffix;
        }
      }

      updateCounter();
    });

    counterStarted = true;
  }
}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! Your inquiry has been received.");
  contactForm.reset();
});

const testimonialSlider = document.querySelector("#testimonialSlider");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".dot");

let testimonialIndex = 0;
let testimonialTimer;

function showTestimonial(index) {
  testimonialSlides.forEach((slide) => slide.classList.remove("active"));
  testimonialDots.forEach((dot) => dot.classList.remove("active"));

  testimonialSlides[index].classList.add("active");
  testimonialDots[index].classList.add("active");

  testimonialIndex = index;
}

function nextTestimonial() {
  testimonialIndex++;

  if (testimonialIndex >= testimonialSlides.length) {
    testimonialIndex = 0;
  }

  showTestimonial(testimonialIndex);
}

function startTestimonialSlider() {
  testimonialTimer = setInterval(nextTestimonial, 5000);
}

function stopTestimonialSlider() {
  clearInterval(testimonialTimer);
}

testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = Number(dot.dataset.slide);
    showTestimonial(slideIndex);
    stopTestimonialSlider();
    startTestimonialSlider();
  });
});

testimonialSlider.addEventListener("mouseenter", stopTestimonialSlider);
testimonialSlider.addEventListener("mouseleave", startTestimonialSlider);

startTestimonialSlider();

/* =========================
   ACTIVE NAVIGATION LINK
========================= */

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }

});

/* FOR INDEX PAGE */

if (
  currentPage === "" ||
  currentPage === "index.html"
) {

  document.querySelectorAll('.nav-links a').forEach(link => {

    if (link.getAttribute("href") === "index.html") {
      link.classList.add("active");
    }

  });

}

const dropdownLinks = document.querySelectorAll(".dropdown > a");

dropdownLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 1024) {
      e.preventDefault();

      const dropdown = this.parentElement;

      document.querySelectorAll(".dropdown").forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove("active");
        }
      });

      dropdown.classList.toggle("active");
    }
  });
});