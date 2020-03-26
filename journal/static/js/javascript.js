/* MOBILE HAMBURGER EFFECTS */
const headerSlide = () => {
  const burger = document.querySelector('.burger');
  const header = document.querySelector('.navigation_container');
  const nav_link = document.querySelectorAll('.nav-link');

  burger.addEventListener('click', () => {
    // Add class to header
    header.classList.toggle('header-active');
      
      // Get every nav_link
      nav_link.forEach((link, index) => {
        if(link.style.animation) {
          link.style.animation = '';
        } else {
          // Add style animation to nav_links with javascript
          link.style.animation = `headerFade 0.5s ease forwards ${index / 7 + 0.5}s`;
        }
      });
  
    burger.classList.toggle('toggle');
  });
}
/* MOBILE HAMBURGER EFFECTS */

headerSlide();

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

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;
var after_header = document.getElementById("AF");

window.addEventListener('scroll', function(){
  after_header.style.opacity = 1 - +this.window.pageYOffset/550+'';
  after_header.style.top = +this.window.pageXOffset+'px'
  if (window.pageYOffset > sticky) {
    header.classList.remove("header");
    header.classList.add("sticky");
  } else {
    header.classList.add("header");
    header.classList.remove("sticky");
  }
});