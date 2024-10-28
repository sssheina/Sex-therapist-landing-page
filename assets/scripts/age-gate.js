import { startAnimation } from "./animation.js";

const ageModal = document.querySelector(".age-gate");
const ageCheckbox = document.querySelector("#age");
const ageButton = document.querySelector(".age-gate__button");
const cookieConsent = document.querySelector(".cookie");

const checkAge = () => {
  const validAge = localStorage.getItem("age");

  if (!validAge) {
    document.body.style.overflow = "hidden";
    ageModal.style.display = "flex";
    ageButton.classList.add("invalid");
  } else {
    ageModal.style.display = "none";
    startAnimation();
    cookieConsent.classList.remove("hidden");
  }
};

document.addEventListener("DOMContentLoaded", checkAge);

ageCheckbox.addEventListener("change", () => {
  if (ageCheckbox.checked) {
    ageButton.classList.remove("invalid");
  } else {
    ageButton.classList.add("invalid");
  }
});

ageCheckbox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    ageCheckbox.checked = !ageCheckbox.checked;
    ageCheckbox.dispatchEvent(new Event("change"));
  }
});

const getAgeAccess = () => {
  if (ageCheckbox.checked) {
    ageModal.style.display = "none";
    document.body.style.overflow = "";
    localStorage.setItem("age", true);
    startAnimation();
    cookieConsent.style.display = "flex";
  }
};

ageButton.addEventListener("click", getAgeAccess);

const handleStorageChange = (event) => {
  console.log("handleStorageChange");

  if (event.key === "age") {
    checkAge();
  }
};

window.addEventListener("storage", handleStorageChange);

const ageFocusableElements = ageModal.querySelectorAll("button, [href], input");
let firstAgeFocusableElement = ageFocusableElements[0];
let lastAgeFocusableElement =
  ageFocusableElements[ageFocusableElements.length - 1];

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && ageModal.style.display === "flex") {
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstAgeFocusableElement) {
        lastAgeFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastAgeFocusableElement) {
        firstAgeFocusableElement.focus();
        e.preventDefault();
      }
    }
  }
});

// ________________________________

// import { startAnimation } from "./animation.js";
// import { showCookieBanner } from "./cookie.js";

// const ageModal = document.querySelector(".age-gate");
// const ageCheckbox = document.querySelector("#age");
// const ageButton = document.querySelector(".age-gate__button");
// const cookieBanner = document.querySelector("#cookieConsent");

// const checkAge = () => {
//   const validAge = sessionStorage.getItem("age");

//   if (!validAge) {
//     document.body.style.overflow = "hidden";
//     ageModal.style.display = "flex";
//     ageButton.classList.add("invalid");
//   } else {
//     ageModal.style.display = "none";
//     startAnimation();
//     showCookieBanner();
//   }
// };

// // Функция получения доступа по возрасту
// const getAgeAccess = () => {
//   if (ageCheckbox.checked) {
//     ageModal.style.display = "none"; // Закрываем модал
//     document.body.style.overflow = ""; // Восстанавливаем прокрутку
//     sessionStorage.setItem("age", "true"); // Сохраняем возраст
//     startAnimation();
//     showCookieBanner(); // Показываем баннер куки
//   }
// };

// // Обработчик события на кнопку подтверждения возраста
// ageButton.addEventListener("click", getAgeAccess);

// document.addEventListener("DOMContentLoaded", checkAge);

// ______________________________

// document.addEventListener("DOMContentLoaded", checkAge);

// ageCheckbox.addEventListener("change", () => {
//   if (ageCheckbox.checked) {
//     ageButton.classList.remove("invalid");
//   } else {
//     ageButton.classList.add("invalid");
//   }
// });

// const getAgeAccess = () => {
//   if (ageCheckbox.checked) {
//     ageModal.style.display = "none";
//     document.body.style.overflow = "";
//     sessionStorage.setItem("age", true);
//     startAnimation();
//     showCookieBanner();
//   }
// };

// ageButton.addEventListener("click", getAgeAccess);

// const handleStorageChange = (event) => {
//   console.log("handleStorageChange");

//   if (event.key === "age") {
//     checkAge();
//   }
// };

// window.addEventListener("storage", handleStorageChange);
