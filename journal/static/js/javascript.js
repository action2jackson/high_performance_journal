const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navigation_container");
const links = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});