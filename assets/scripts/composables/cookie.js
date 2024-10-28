import { enableAnalytics, disableAnalytics } from "./analytics.js";

const cookieConsent = document.getElementById("cookieConsent");
const acceptCookiesBtn = document.getElementById("acceptCookies");
const declineCookiesBtn = document.getElementById("declineCookies");

const checkCookiesConsent = () => {
  const cookiesAccepted = sessionStorage.getItem("cookiesAccepted");

  if (cookiesAccepted === "true") {
    cookieConsent.style.display = "none";
    enableAnalytics();
  } else if (cookiesAccepted === "false") {
    cookieConsent.style.display = "none";
    disableAnalytics();
  } else {
    cookieConsent.style.display = "flex";
    disableAnalytics();
  }
};

document.addEventListener("DOMContentLoaded", checkCookiesConsent);

acceptCookiesBtn.addEventListener("click", () => {
  cookieConsent.style.display = "none";
  sessionStorage.setItem("cookiesAccepted", "true");
  enableAnalytics();
});

declineCookiesBtn.addEventListener("click", () => {
  cookieConsent.style.display = "none";
  sessionStorage.setItem("cookiesAccepted", "false");
  disableAnalytics();
});

const cookieFocusableElements =
  cookieConsent.querySelectorAll("button, [href]");
let firstCookieFocusableElement = cookieFocusableElements[0];
let lastCookieFocusableElement =
  cookieFocusableElements[cookieFocusableElements.length - 1];

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && cookieConsent.style.display === "flex") {
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstCookieFocusableElement) {
        lastCookieFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastCookieFocusableElement) {
        firstCookieFocusableElement.focus();
        e.preventDefault();
      }
    }
  }
});
