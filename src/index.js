import "./style.css";

const btns = document.querySelectorAll("[data-carousel-btn]");
const circles = document.querySelectorAll(".circle");
let i = 0;
let time;

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const offset = btn.dataset.carouselBtn === "next" ? 1 : -1; // Return 1 if button data = next
    const slides = btn
      .closest("[data-carousel]")
      .querySelector("[data-slides]"); // Get ul element

    const activeSlide = slides.querySelector("[data-active]"); // From ul find element that has [data-active]
    let newIndex = [...slides.children].indexOf(activeSlide) + offset; // Get index of an element with [data-active] attribute + 1

    if (newIndex < 0) newIndex = slides.children.length - 1; // set the last item of an array to newIndex
    if (newIndex >= slides.children.length) newIndex = 0; // set the first item of an array to newIndex

    slides.children[newIndex].dataset.active = true; // Add active attribute to the element with an index of newIndex
    i = newIndex;
    delete activeSlide.dataset.active; // Remove active attribute from the previous element that has it

    clearInterval(time); // Stops the interval
    startInterval(); // Resume interval
  });
});

circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    const slides = document.querySelector("ul");
    const ulArray = [...slides.children];

    delete ulArray[i].dataset.active; // Remove active attribute from the current slide (i)

    i = index; // Set the circle's index to i

    ulArray[i].dataset.active = true; // Add active attribute to an array with index i (circle's index)

    clearInterval(time); // Stops the interval
    startInterval(); // Resume interval
  });
});

function nextSlide() {
  const slides = document.querySelector("ul");
  const ulArray = [...slides.children];

  delete ulArray[i].dataset.active; // Remove active attribute from the current slide (i)

  i = (i + 1) % ulArray.length; // Loop from last index to the first, eg: 0,1,2,0,1,2,0...

  ulArray[i].dataset.active = true;
  console.log(i);
}

function startInterval() {
  time = setInterval(nextSlide, 3000);
}

startInterval();
