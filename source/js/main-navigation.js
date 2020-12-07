const menu = document.querySelector(".js-main-navigation");
const menuToggle = menu.querySelector(".js-main-navigation-toggle");

menu.classList.remove("main-navigation--no-js");
menuToggle.addEventListener("click", function () {
  menu.classList.toggle("main-navigation--opened");
});
