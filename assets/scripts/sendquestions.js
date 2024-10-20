import { openModal } from "./composables/modal.js";
import { modalContent } from "./composables/modal.js";
import { checkPrivacyPolicyConsent } from "./composables/privacy-policy.js";
import { language } from "./composables/language.js";

let thanksMessage, errorMessage;
const form = document.querySelector(".questions__form");
const sendButton = document.querySelector(".questions__button");
const questionsComment = document.querySelector(".questions__comment");
const consentCheckbox = document.querySelector(".questions__checkbox");
const errorDiv = document.querySelector(".questions__errors");
const errorPolitics = document.querySelector(".questions__policy-error");

const modalMessageMap = {
  RU: {
    thanksTitle: "Спасибо!",
    thanksText: "Сообщение было успешно отправлено",
    errorTitle: "Ошибка",
    errorText: "Произошла ошибка при отправке формы",
    messageEmpty: "Сообщение не может быть пустым",
    messageForbidden: "Сообщение содержит недопустимые слова или символы",
  },
  EN: {
    thanksTitle: "Thank you!",
    thanksText: "Message was successfully sent",
    errorTitle: "Error",
    errorText: "An error occurred while submitting the form",
    messageEmpty: "Message can not be empty",
    messageForbidden: "The message contains invalid words or characters",
  },
  FR: {
    thanksTitle: "Merci !",
    thanksText: "Le message a été envoyé avec succès",
    errorTitle: "Erreur",
    errorText: "Une erreur s'est produite lors de l'envoi du formulaire",
    messageEmpty: "Le message ne peut pas être vide",
    messageForbidden:
      "Le message contient des mots ou des caractères non valides",
  },
};

const validateInput = (input) => {
  const forbiddenWords = [
    "xxx",
    "viagra",
    "bitch",
    "slut",
    "whore",
    "cum",
    "fuck",
    "виагра",
    "сучка",
    "сука",
    "хуй",
    "тварь",
    "потаскуха",
    "блядина",
    "шалава",
    "трахать",
    "трахал",
    "трахаю",
    "шлюха",
    "сперма",
    "блядь",
  ];
  const regex = new RegExp(forbiddenWords.join("|"), "i");
  return !regex.test(input);
};

const checkMessageField = (userInput) => {
  const content = modalMessageMap[language.textContent] || modalMessageMap.EN;
  console.log("content", content);

  if (!validateInput(userInput)) {
    errorDiv.innerHTML = `<p>${content.messageForbidden}</p>`;
    errorPolitics.innerText = "";
    return false;
  } else if (!userInput) {
    errorDiv.innerHTML = `<p>${content.messageEmpty}</p>`;
    errorPolitics.innerText = "";
    return false;
  } else {
    errorDiv.innerHTML = "";
    return true;
  }
};

const updateModalContent = () => {
  const content = modalMessageMap[language.textContent] || modalMessageMap.EN;

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

sendButton.addEventListener("click", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const userInput = formData.get("message");

  if (!checkPrivacyPolicyConsent(consentCheckbox, errorPolitics)) {
    return;
  }

  if (!checkMessageField(userInput)) {
    return;
  }

  try {
    const response = await fetch("https://formspree.io/f/xvgpvnov", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      modalContent.innerHTML = thanksMessage;

      form.reset();
    } else {
      console.error("Unknown error occured");
      modalContent.innerHTML = errorMessage;
    }

    openModal();
  } catch (error) {
    console.error("Error:", error);
    modalContent.innerHTML = errorMessage;

    openModal();
  }
});

questionsComment.addEventListener("input", function () {
  errorDiv.innerHTML = "";
});

consentCheckbox.addEventListener("change", function () {
  if (this.checked) {
    errorPolitics.innerText = "";
  }
});
