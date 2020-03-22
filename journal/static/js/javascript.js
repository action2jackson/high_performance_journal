const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navigation_container");
const links = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

/*
<---DREAMS--->
document.addEventListener("mousemove", function(e) {
  var body = document.querySelector('body');
  var stars = document.createElement('span');
  stars.className += "stars";
  var x = e.offsetX;
  var y = e.offsetY;
  stars.style.left = x + 'px';
  stars.style.top = y + 'px';
  var size = Math.random() * 40;
  stars.style.width = size + 'px';
  stars.style.height = size + 'px';
  body.appendChild(stars);

  setTimeout(function(){
      stars.remove();
  },4000)
}) 
*/
