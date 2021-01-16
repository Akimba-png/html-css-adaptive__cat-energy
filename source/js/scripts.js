// Main menu

const menu = document.querySelector(".js-main-navigation");
const menuToggle = menu.querySelector(".js-main-navigation-toggle");

menu.classList.remove("main-navigation--no-js");
menuToggle.addEventListener("click", function () {
  menu.classList.toggle("main-navigation--opened");
});

// Slider

const imageBefore = document.querySelector(".js-instance__picture-item--before");
const imageAfter = document.querySelector(".js-instance__picture-item--after");
const slider = document.querySelector(".js-slider");
const buttonBefore = slider.querySelector(".js-slider__toggle--before");
const buttonAfter = slider.querySelector(".js-slider__toggle--after");
const bar = slider.querySelector(".js-slider__range-scale");
const toggle = slider.querySelector(".js-slider__range-toggle");
let LimitMovementX;
let thumbCoord;

function moveThumb(e) {
  LimitMovementX = {
    min: 0,
    max: bar.offsetWidth - toggle.offsetWidth
  }

  thumbCoord = toggle.offsetLeft + e.movementX;

  if (thumbCoord < LimitMovementX.min) {
    thumbCoord = LimitMovementX.min;
  }
  if (thumbCoord > LimitMovementX.max) {
    thumbCoord = LimitMovementX.max;
  }

  toggle.style.left = thumbCoord + "px";

  imageBefore.style.width = 100 - ((thumbCoord * 100) / (bar.offsetWidth - toggle.offsetWidth)) + "%";
  imageAfter.style.width = ((thumbCoord * 100) / (bar.offsetWidth-toggle.offsetWidth)) + "%";
}

function onThumbMouseup() {
  document.removeEventListener("mousemove", moveThumb);
};

toggle.addEventListener("mousedown", function() {
  this.addEventListener("dragstart", function(e) {
    e.preventDefault();
  });
  document.addEventListener("mousemove", moveThumb);
  document.addEventListener("mouseup", onThumbMouseup);
});

buttonBefore.addEventListener("click", function () {
  imageBefore.style.width = 100 + "%";
  imageAfter.style.width = 0;
  toggle.style.left = 0;
  bar.style.justifyContent = "flex-start";
});

buttonAfter.addEventListener("click", function () {
  imageAfter.style.width = 100 + "%";
  imageBefore.style.width = 0;
  toggle.style.left = (bar.offsetWidth - toggle.offsetWidth) + "px";
  bar.style.justifyContent = "flex-end";
});
