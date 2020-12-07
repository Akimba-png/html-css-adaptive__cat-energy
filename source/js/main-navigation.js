const menu = document.querySelector(".js-main-navigation");
const menuToggle = menu.querySelector(".js-main-navigation__navigation-toggle");

menu.classList.remove("js-main-navigation--no-js");
menuToggle.addEventListener("click", function () {
  menu.classList.toggle("js-main-navigation--opened");
});
