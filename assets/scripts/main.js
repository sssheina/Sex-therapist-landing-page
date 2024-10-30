//  ----- HEADER COLOR -----

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 300) {
    header.classList.toggle("scrolled", true);
  } else {
    header.classList.toggle("scrolled", false);
  }
});

// // ----- BURGER MENU -----

const burger = document.querySelector(".header__burger");
const overlay = document.querySelector(".header__overlay");
const nav = document.querySelector(".header__nav");
const headerMenuLinks = document.querySelectorAll(".header__menu-link");

burger.addEventListener("click", toggleMenu);
burger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});

overlay.addEventListener("click", toggleMenu);

headerMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu();
  });
});

function toggleMenu() {
  const isExpanded = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", !isExpanded);

  burger.classList.toggle("active");
  overlay.classList.toggle("show");
  nav.classList.toggle("show");
  document.body.classList.toggle("lock");

  // Устанавливаем фокус на бургер-меню или первый элемент меню
  if (nav.classList.contains("show")) {
    headerMenuLinks[0].focus(); // Фокус на первом элементе меню
  } else {
    burger.focus(); // Возврат фокуса на бургер-меню
  }
}

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

// ----- VIDEO (IOS adaptation) -----

const video = document.querySelector(".cover__video");

function checkViewport() {
  if (window.innerWidth <= 1000) {
    video.pause();
    video.style.display = "none";
  }
  // else {
  //   video.style.display = "block";
  //   video.play();
  // }
}

window.addEventListener("resize", checkViewport);
document.addEventListener("DOMContentLoaded", checkViewport);
