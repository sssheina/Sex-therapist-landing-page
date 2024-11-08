import { openModal } from "./composables/modal.js";
import { modalContent } from "./composables/modal.js";
import { checkPrivacyPolicyConsent } from "./composables/privacy-policy.js";
import { language } from "./composables/language.js";
import { loading } from "./loader.js";

let thanksMessage, errorMessage;
const form = document.querySelector(".footer__form");
const inputSubscribe = document.querySelector(".footer__field");
const footerSendButton = document.querySelector(".footer__button");
const consentCheckbox = document.querySelector(".footer__checkbox");
const errorDiv = document.querySelector(".footer__errors");
const errorPolitics = document.querySelector(".footer__policy-error");

const modalMessageMap = {
  RU: {
    thanksTitle: "Спасибо!",
    thanksText: "Вы успешно подписались на рассылку новостей",
    errorTitle: "Ошибка",
    errorText: "Произошла ошибка при отправке формы",
    fieldEmpty: "E-mail не может быть пустым",
    fieldError: "Неправильный адрес электронной почты",
    errorPoliticsText: "Прочтите и подтвердите согласие",
  },
  EN: {
    thanksTitle: "Thank you!",
    thanksText: "You have successfully subscribed to the newsletter",
    errorTitle: "Error",
    errorText: "An error occurred while submitting the form",
    fieldEmpty: "E-mail can not be empty",
    fieldError: "Incorrect e-mail address",
    errorPoliticsText: "Read and confirm consent",
  },
  FR: {
    thanksTitle: "Merci !",
    thanksText: "Vous vous êtes inscrit avec succès à la lettre d'information",
    errorTitle: "Erreur",
    errorText: "Une erreur s'est produite lors de l'envoi du formulaire",
    fieldEmpty: "E-mail ne peut pas être vide",
    fieldError: "Adresse électronique incorrecte",
    errorPoliticsText: "Lire et accepter",
  },
};

const content = modalMessageMap[language.textContent] || modalMessageMap.EN;

const validateRegFormEmail = (needShowMessages) => {
  const re =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  let result = true;

  if (!inputSubscribe.value) {
    result = false;
    if (needShowMessages) {
      errorDiv.innerText = content.fieldEmpty;
    }
  } else if (!re.test(inputSubscribe.value)) {
    result = false;
    if (needShowMessages) {
      errorDiv.innerText = content.fieldError;
    }
  } else {
    if (needShowMessages) {
      errorDiv.innerText = "";
    }
  }

  return result;
};

const updateModalContent = () => {
  thanksMessage = `<div class="modal-content__small">
  <svg class="modal-content__icon icon-success">
  <use xlink:href="/assets/images/figures/sprite.svg#success"></use>
  </svg>
  <h4 class="h4-title text-center">${content.thanksTitle}</h4>
  <p class="paragraph-standard text-center">${content.thanksText}</p>
  </div> `;

  errorMessage = `<div class="modal-content__small">
  <svg class="modal-content__icon icon-error">
  <use xlink:href="/assets/images/figures/sprite.svg#error"></use>
  </svg>
  <h4 class="h4-title text-center">${content.errorTitle}</h4>
  <p class="paragraph-standard text-center">${content.errorText}</p>
  </div>
  `;
};

updateModalContent();

footerSendButton.addEventListener("click", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  if (
    !checkPrivacyPolicyConsent(
      consentCheckbox,
      errorPolitics,
      content.errorPoliticsText
    )
  ) {
    return;
  }

  if (!validateRegFormEmail(true)) {
    return;
  }

  try {
    loading("grid");

    const response = await fetch("https://formspree.io/f/xblrpeez", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      loading("none");
      form.reset();
      modalContent.innerHTML = thanksMessage;
    } else {
      loading("none");
      console.error("Unknown error occured");
      modalContent.innerHTML = errorMessage;
    }

    openModal();
  } catch (error) {
    loading("none");
    console.error("Error:", error);
    modalContent.innerHTML = errorMessage;

    openModal();
  }
});

inputSubscribe.addEventListener("input", function () {
  errorDiv.innerText = "";
});

consentCheckbox.addEventListener("change", function () {
  if (this.checked) {
    errorPolitics.innerText = "";
  }
});
