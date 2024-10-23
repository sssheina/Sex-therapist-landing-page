import { startAnimation } from "./animation.js";

const ageModal = document.querySelector(".age-gate");
const ageCheckbox = document.querySelector("#age");
const ageButton = document.querySelector(".age-gate__button");

const checkAge = () => {
  const validAge = localStorage.getItem("age");

  if (!validAge) {
    document.body.style.overflow = "hidden";
    ageModal.style.display = "flex";
    ageButton.classList.add("invalid");
  } else {
    ageModal.style.display = "none";
    startAnimation();
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

const getAgeAccess = () => {
  if (ageCheckbox.checked) {
    ageModal.style.display = "none";
    document.body.style.overflow = "";
    localStorage.setItem("age", true);
    startAnimation();
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
