const toggleAnswer = (e) => {
  const faqBox = e.target.closest(".faq-box");
  if (!faqBox) return;

  const answer = faqBox.querySelector(".faq-box__answer");

  faqBox.classList.toggle("active");
  answer.style.maxHeight = faqBox.classList.contains("active")
    ? answer.scrollHeight + "px"
    : 0;
};

const handleKeyDown = (e) => {
  const faqBox = e.target.closest(".faq-box");

  if (!faqBox) return;

  if (e.key === "Enter") {
    toggleAnswer(e);
  }
};

const faqBoxes = document.querySelectorAll(".faq-box");

faqBoxes.forEach((box) => {
  box.addEventListener("click", toggleAnswer);
  box.addEventListener("keydown", handleKeyDown);
});
