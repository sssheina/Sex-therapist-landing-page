import { enableAnalytics, disableAnalytics } from "./analytics.js"; // Импортируем функции аналитики


const cookieConsent = document.getElementById("cookieConsent");
const acceptCookiesBtn = document.getElementById("acceptCookies");
const declineCookiesBtn = document.getElementById("declineCookies");

// Функция для отображения уведомления о кукис
const showCookieBanner = () => {
  // Проверяем, если кукис были приняты в текущей сессии
  const cookiesAccepted = sessionStorage.getItem("cookiesAccepted");

  // Если кукис не приняты, показываем баннер
  if (!cookiesAccepted) {
    cookieConsent.style.display = "flex";
  }
};

// Показать уведомление о кукис при загрузке страницы
document.addEventListener("DOMContentLoaded", showCookieBanner);

// Обработчик кнопки "Принять"
acceptCookiesBtn.addEventListener("click", () => {
  cookieConsent.style.display = "none";
  sessionStorage.setItem("cookiesAccepted", "true"); // Сохраняем состояние в sessionStorage
  enableAnalytics();; // Ваша функция для инициализации аналитики
});

// Обработчик кнопки "Отказаться"
declineCookiesBtn.addEventListener("click", () => {
  cookieConsent.style.display = "none";
  disableAnalytics();  // Здесь можно отключить аналитику, если нужно
});

// Управление фокусом внутри cookieConsent
const cookieFocusableElements = cookieConsent.querySelectorAll('button, [href]');
let firstCookieFocusableElement = cookieFocusableElements[0];
let lastCookieFocusableElement = cookieFocusableElements[cookieFocusableElements.length - 1];

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && cookieConsent.style.display === "flex") {
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstCookieFocusableElement) {
        lastCookieFocusableElement.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastCookieFocusableElement) {
        firstCookieFocusableElement.focus();
        e.preventDefault();
      }
    }
  }
});



// // Элементы уведомления о куках
// const cookieConsent = document.querySelector("#cookieConsent");
// const acceptCookiesButton = document.querySelector("#acceptCookies");
// const declineCookiesButton = document.querySelector("#declineCookies");

// // Отключение аналитики
// const disableAnalytics = () => {
//   console.log("Аналитика отключена.");
// };

// // Включение аналитики
// const enableAnalytics = () => {
//   console.log("Аналитика включена.");
//   // Здесь вставьте ваш код для подключения аналитики (например, Google Analytics)
// };

// // Принятие куки
// const acceptCookies = () => {
//   localStorage.setItem("cookiesAccepted", "true");
//   cookieConsent.style.display = "none"; // Закрываем уведомление о куках
//   enableAnalytics(); // Включаем аналитику
// };

// // Отклонение куки
// const declineCookies = () => {
//   localStorage.setItem("cookiesAccepted", "false");
//   cookieConsent.style.display = "none"; // Закрываем уведомление о куках
//   disableAnalytics(); // Отключаем аналитику
// };

// // Проверка состояния куки
// const checkCookiesConsent = () => {
//   const cookiesAccepted = localStorage.getItem("cookiesAccepted");

//   if (cookiesAccepted === "true") {
//     enableAnalytics(); // Включаем аналитику
//   } else if (cookiesAccepted === "false") {
//     disableAnalytics(); // Отключаем аналитику
//   } else {
//     // Если пользователь не сделал выбор, показываем уведомление о куках
//     cookieConsent.style.display = "flex";
//     disableAnalytics(); // Отключаем аналитику до выбора
//   }
// };

// // События для кнопок принятия и отклонения куки
// acceptCookiesButton.addEventListener("click", acceptCookies);
// declineCookiesButton.addEventListener("click", declineCookies);

// // Запуск проверки при загрузке страницы
// document.addEventListener("DOMContentLoaded", checkCookiesConsent);