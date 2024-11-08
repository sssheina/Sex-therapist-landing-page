export const overlay = document.querySelector(".overlay");
export const modal = document.querySelector(".modal");
export const modalContent = document.querySelector(".modal-content");
export const buttonClose = document.querySelector(".button-close");
const acceptCookiesBtn = document.getElementById("acceptCookies");

// Открытие модального окна
export const openModal = () => {
  if (!modal || !overlay) return;

  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  modal.setAttribute("tabindex", "0");
  modalContent.setAttribute("tabindex", "0");
  buttonClose.setAttribute("tabindex", "0");

  buttonClose.focus();

  document.addEventListener("keydown", trapFocus);
};

// Закрытие модального окна
export const closeModal = () => {
  if (!modal || !overlay) return;

  overlay.classList.add("hidden");
  document.body.style.overflow = "";

  modal.removeAttribute("tabindex");
  modalContent.removeAttribute("tabindex");
  buttonClose.removeAttribute("tabindex");

  document.removeEventListener("keydown", trapFocus);

  if (acceptCookiesBtn) acceptCookiesBtn.focus();
};

if (buttonClose) buttonClose.addEventListener("click", closeModal);
if (overlay) overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
    closeModal();
  }
});

// Функция ловушки фокуса
const trapFocus = (e) => {
  if (!modal) return;

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
};


// export const overlay = document.querySelector(".overlay");
// export const modal = document.querySelector(".modal");
// export const modalContent = document.querySelector(".modal-content");
// export const buttonClose = document.querySelector(".button-close");
// const acceptCookiesBtn = document.getElementById("acceptCookies");

// // Открытие модального окна
// export const openModal = () => {
//   overlay.classList.remove("hidden");
//   document.body.style.overflow = "hidden";

//   // Добавляем tabindex для доступности
//   modal.setAttribute("tabindex", "0");
//   modalContent.setAttribute("tabindex", "0");
//   buttonClose.setAttribute("tabindex", "0");

//   // Устанавливаем фокус на модальное окно
//   buttonClose.focus();

//   // Ловушка фокуса
//   document.addEventListener("keydown", trapFocus);
// };

// // Закрытие модального окна
// export const closeModal = () => {
//   overlay.classList.add("hidden");
//   document.body.style.overflow = "";

//   // Убираем tabindex после закрытия
//   modal.removeAttribute("tabindex");
//   modalContent.removeAttribute("tabindex");
//   buttonClose.removeAttribute("tabindex");

//   // Удаляем ловушку фокуса
//   document.removeEventListener("keydown", trapFocus);

//   // Устанавливаем фокус на первую кнопку в панели cookie
//   acceptCookiesBtn.focus(); // Устанавливаем фокус на кнопку "Принять"
// };

// buttonClose.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);

// document.addEventListener("keydown", function (e) {
//   if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
//     closeModal();
//   }
// });

// // Функция ловушки фокуса
// const trapFocus = (e) => {
//   const focusableElements = modal.querySelectorAll(
//     'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//   );
//   const firstElement = focusableElements[0];
//   const lastElement = focusableElements[focusableElements.length - 1];

//   if (e.key === "Tab") {
//     // Если Shift+Tab и фокус на первом элементе, переходим к последнему
//     if (e.shiftKey && document.activeElement === firstElement) {
//       e.preventDefault();
//       lastElement.focus();
//     }
//     // Если Tab и фокус на последнем элементе, переходим к первому
//     else if (!e.shiftKey && document.activeElement === lastElement) {
//       e.preventDefault();
//       firstElement.focus();
//     }
//   }
// };
