import { openModal } from "./modal.js";
import { updatePrivacyPolicyContent } from "../privacy.js";

document.querySelectorAll(".policy__link").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    updatePrivacyPolicyContent();
    openModal();
  });
});

export const checkPrivacyPolicyConsent = (
  consentCheckbox,
  errorPolitics,
  errorPoliticsText
) => {
  if (!consentCheckbox.checked) {
    errorPolitics.textContent = errorPoliticsText;
    errorPolitics.style.display = "block";
    return false;
  } else {
    errorPolitics.style.display = "none";
    return true;
  }
};
