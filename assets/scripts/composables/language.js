export const language = document.querySelector(".language__language");
const languageOptionsList = document.querySelector(".language__options");
const languageOptions = document.querySelectorAll(".language__option");

// Убираем фокус при клике мышью
language.addEventListener("mousedown", (event) => {
  event.preventDefault();
});

language.addEventListener("click", () => {
  languageOptionsList.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (!language.contains(event.target)) {
    languageOptionsList.classList.remove("active");
  }
});

const selectLanguage = (option) => {
  const langText = option.textContent;
  if (langText === "RU") {
    window.location.href = "ru.html";
  } else if (langText === "FR") {
    window.location.href = "fr.html";
  } else {
    window.location.href = "index.html";
  }

  language.textContent = langText;
  languageOptionsList.classList.remove("active");
};

languageOptions.forEach((option) => {
  option.addEventListener("click", () => selectLanguage(option));
  option.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      selectLanguage(option);
    }
  });
});

language.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    languageOptionsList.classList.toggle("active");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    languageOptionsList.classList.remove("active");
  }
});
