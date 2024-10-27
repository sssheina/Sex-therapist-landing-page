//  ----- HEADER COLOR -----

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 300) {
    header.classList.toggle("scrolled", true);
  } else {
    header.classList.toggle("scrolled", false);
  }
});

// ----- BURGER MENU -----

const burger = document.querySelector(".header-burger");
const overlay = document.querySelector(".header__overlay");
const headerMenuLinks = document.querySelectorAll(".header__menu-link");
let activeLink = null;

document.addEventListener("DOMContentLoaded", function () {
  burger.setAttribute("tabindex", "0");
  burger.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showHeaderMenu();
    }
  });
  burger.addEventListener("click", showHeaderMenu);
  overlay.addEventListener("click", showHeaderMenu);
});

const showHeaderMenu = () => {
  burger.classList.toggle("active");
  overlay.classList.toggle("show");

  const nav = document.querySelector(".header__nav");

  nav.classList.toggle("show");
  document.body.classList.toggle("lock");

  if (!nav.classList.contains("show") && activeLink) {
    activeLink.classList.remove("active");
    activeLink = null;
  }
};

headerMenuLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    headerMenuLinks.forEach((otherLink) =>
      otherLink.classList.remove("active")
    );

    showHeaderMenu();

    link.classList.add("active");
    activeLink = link;

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const headerHeight = document.querySelector(".header").offsetHeight;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// ----- FEEDBACK -----

const swiper = new Swiper(".swiper", {
  grabCursor: true,
  touchRatio: 2,
  slideToClickedSlide: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  slidesPerView: 2,
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 20,
      grabCursor: true,
    },
    428: {
      slidesPerView: 1.3,
      spaceBetween: 20,
      grabCursor: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
  loop: true,
  loopedSlides: 2,
  watchOverflow: true,
  spaceBetween: 37,
  slidesPerGroup: 1,
  // centeredSlides: true,
  initialSlide: 0,
  freeMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  speed: 1200,
});

// ----- BUTTON UP -----

const btnUp = document.querySelector(".button-up");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  if (scrollY > 400) {
    btnUp.style.display = "block";
  } else {
    btnUp.style.display = "none";
  }
});

btnUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// ----- REGISTRATION -----

// Calendly.initInlineWidget({
//   url: "https://calendly.com/katerina-tartary/discovery-session",
//   parentElement: document.getElementById("calendly-embed"),
// });
