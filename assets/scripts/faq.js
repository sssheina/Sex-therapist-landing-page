const toggleAnswer = (e) => {
  const faqBox = e.target.closest(".faq-box");
  if (!faqBox) return;

  const answer = faqBox.querySelector(".faq-box__answer");

  faqBox.classList.toggle("active");
  answer.style.maxHeight = faqBox.classList.contains("active")
    ? answer.scrollHeight + "px"
    : 0;
};

const faqBoxes = document.querySelectorAll(".faq-box");

faqBoxes.forEach((box) => {
  box.addEventListener("click", toggleAnswer);
});
