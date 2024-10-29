gsap.registerPlugin(ScrollTrigger);

export const animateSingleElement = (elementClass) => {
  const element = gsap.from(elementClass, {
    y: 40,
    opacity: 0,
  });

  ScrollTrigger.create({
    trigger: elementClass,
    start: "top 75%",
    onEnter: () => element.play(),
  });

  ScrollTrigger.create({
    trigger: elementClass,
    start: "top bottom",
    onLeaveBack: () => element.pause(0),
  });
};

export const animateElementsGroup = (elementClass) => {
  const elementsArray = gsap.utils.toArray(elementClass);

  elementsArray.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 75%",
        end: "top bottom",
        toggleActions: "play none none reverse",
      },
      y: 30,
      stagger: 0.8,
      opacity: 0.2,
    });
  });
};
