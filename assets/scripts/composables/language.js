export const dropdown = document.querySelector(".language");
let selectedLanguage;

const setLanguage = (language) => {
  localStorage.setItem("selectedLanguage", language);
  // updateLanguageAttribute(language);
};

// const updateLanguageAttribute = (language) => {
//   document.documentElement.lang = language.toLowerCase();
// };

export const changeLanguage = (generateContent) => {
  return (event) => {
    selectedLanguage = event.target.value;

    setLanguage(selectedLanguage);
    generateContent(selectedLanguage);
  };
};

export const loadLanguage = (generateContent) => {
  document.addEventListener("DOMContentLoaded", () => {
    selectedLanguage = localStorage.getItem("selectedLanguage") || "EN";
    dropdown.value = selectedLanguage;

    // updateLanguageAttribute(selectedLanguage);
    generateContent(selectedLanguage);
  });
};

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
