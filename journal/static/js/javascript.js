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
<--- FOR DREAM PAGE --->
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
<--- FOR DREAM PAGE --->
*/
/*
<--- Save for later --->
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;
var after_header = document.getElementById("AF");

window.addEventListener('scroll', function(){
  after_header.style.opacity = 1 - +this.window.pageYOffset/550+'';
  after_header.style.top = +this.window.pageXOffset+'px'
  if (window.pageYOffset > sticky) {
    header.classList.remove("header");
  } else {
    header.classList.add("header");
  }
});
<--- Save for later --->
*/


var currentStep = 0;
showStep(currentStep);

function showStep(step) {
  var formStep = document.getElementsByClassName("form_step");
  if (step > 0) {
    document.body.scrollIntoView(false); 
  }
  formStep[step].style.display = "block";

  if (step == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById('nextBtn').style.width = "100%";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (step == (formStep.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
}

function nextPrev(step) {
  var formStep = document.getElementsByClassName("form_step");
  if (step == 1 && !validateForm()) return false;
  formStep[currentStep].style.display = "none";
  currentStep = currentStep + step;
  if (currentStep >= formStep.length) {
    var confirmGoals = confirm("Are you confident with your goals?")
    if (confirmGoals == true) {
      document.getElementById("form_for_goals").submit();
      return false;
    }
  }
  showStep(currentStep);
}

nextBtn.addEventListener('click', function() {
  nextPrev(1)
}, false)
prevBtn.addEventListener('click', function() {
  nextPrev(-1)
}, false)

function validateForm() {
  var formStep, emptyInput, i, valid = true;
  formStep = document.getElementsByClassName("form_step");
  emptyInput = formStep[currentStep].getElementsByTagName("input");
  for (i = 0; i < emptyInput.length; i++) {
    if (emptyInput[i].value == "") {
      emptyInput[i].className += " invalid";
      valid = false;
    } 
  }
  
  return valid;
}