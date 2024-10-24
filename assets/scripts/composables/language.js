export const language = document.querySelector(".language__language");
const languageOptionsList = document.querySelector(".language__options");
const languageOptions = document.querySelectorAll(".language__option");

language.addEventListener("click", () => {
  languageOptionsList.classList.toggle("active");
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.textContent === "RU") {
      window.location.href = "ru.html";
    } else if (option.textContent === "FR") {
      window.location.href = "fr.html";
    } else window.location.href = "index.html";

    language.textContent = option.textContent;
    languageOptionsList.classList.remove("active");
  });
});

document.addEventListener("click", function (event) {
  if (event.target !== language && event.target !== languageOptions) {
    languageOptionsList.classList.remove("active");
  }
});
