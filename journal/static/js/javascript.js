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
          // Add style animation to nav_linksx
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

function sprintCountdown() {
  var countdown = document.getElementById("Countdown");
  var goals = document.getElementById("Goals");
  var numDays = 90;
  var sprintDate = new Date();
  var ninetyDaysDate = sprintDate.getDay() + numDays;
  if (sprintDate != ninetyDaysDate) {
    countdown.style.display = "flex";
    goals.style.display = "none";
  } else {
    countdown.style.display = "none";
    goals.style.display = "flex";
  }
  var currentTime = sprintDate.getTime();
  var ninetyDays = ninetyDaysDate.getTime();

  var timeLeft = ninetyDays - currentTime;

  var seconds = Math.floor(timeLeft / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours %= 24;
  minutes %= 60;
  minutes %= 60;

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  document.getElementById("days").textContent = days;
  document.getElementById("days").innerText = days;

  document.getElementById("hours").textContent = days;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  setTimeout(sprintCountdown, 1000);
}

sprintCountdown();

// If user is on home page
if (window.location.pathname == "/") {

  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;
  var after_header = document.getElementById("AF");
  var goals = document.getElementById("goals");

  window.addEventListener('scroll', function(e) {
    // Objects fade on scroll
    after_header.style.opacity = 1 - +this.window.pageYOffset/550+'';
    after_header.style.top = +this.window.pageXOffset+'px';

    // Objects from home page
    const targetButtons = document.querySelectorAll('.btnlink');
    var targetGoals = document.getElementsByClassName('goal_parallax');
    var targetEmojiCon = document.getElementsByClassName('feeling');
    var targetEmoji = document.getElementsByClassName('far');

    // This function Tracks the rate 
    function parallax(target) {
      // Loop through the target objects
      for (index = 0; index < target.length; index++) {
        // Multiply the amount scrolled by the targets set rate (find in html!)
        var position = window.pageYOffset * target[index].dataset.rate;
        // For vertical control only
        if (target[index].dataset.direction === 'vertical') {
          // Shift the target the amount that position variable calculated
          target[index].style.transform = 'translate3d(0px, '+position+'px, 0px)';
        // For horizontal and vertical control
        } else {
          // Sets scroll position for both X and Y 
          var positionX = window.pageYOffset * target[index].dataset.ratex;
          var positionY = window.pageYOffset * target[index].dataset.ratey;
  
          // The targets X and Y axis is affected
          target[index].style.transform = 'translate3d('+positionX+'px, '+positionY+'px, 0px)';
        }
      }
    }
    // Parallax objects
    parallax(targetEmojiCon);
    parallax(targetEmoji);
    parallax(targetButtons);
    parallax(targetGoals);
  });


  /* Confirm message for submitting 90 day goals form with the library SweetAlerts */
  function swalSubmitGoal() {
    swal({
      title: "Are you sure?",
      text: "Once submitted, your 90 day sprint will start!",
      // icon: "warning",
      buttons: true,
      // dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Submitting Form!", {
          icon: "success",
        });
        // If message was confirmed then submit the form
        document.getElementById("form_for_goals").submit();
        sprintCountdown();
        return false;
      } else {
        swal("Make sure your goals are thoughtful!");
      }
    });
  }

  var currentStep = 0;
  showStep(currentStep);

  // Shows the current form step and displays buttons appropiately
  function showStep(step) {
    // Each goal div has a class form_step
    var formStep = document.getElementsByClassName("form_step");
    if (step > 0) {
      // Centers the larger form by bring the user to the bottom of the page
      document.body.scrollIntoView(false); 
    }
    // Display current form step
    formStep[step].style.display = "block";

    // Show "Next" button 
    if (step == 0) {
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById('nextBtn').style.width = "100%";
    // Show "Prev" button with "Next"
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }

    // If its the last step in the form
    if (step == (formStep.length - 1)) {
      // Display a "Submit" button instead of "Next"
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
  }

  // Runs error check protocol
  function nextPrev(step) {
    var formStep = document.getElementsByClassName("form_step");
    // Check for validation in another function if step == 1
    if (step == 1 && !validateForm()) return false;
    // Hide the current form step
    formStep[currentStep].style.display = "none";
    currentStep = currentStep + step;
    // If its the last form step
    if (currentStep >= formStep.length) {
      // If confirm message is false
      if (swalSubmitGoal() != true) {
        // Return to the last step
        currentStep = 3;
      }
    }
    showStep(currentStep);
  }

  // Event listeners for "next" and "previous" buttons to shift between form steps
  nextBtn.addEventListener('click', function() {
    nextPrev(1);
  }, false);
  prevBtn.addEventListener('click', function() {
    nextPrev(-1);
  }, false);


  // Checks for errors in the form
  function validateForm() {
    var formStep, emptyInput, i, valid = true;
    formStep = document.getElementsByClassName("form_step");
    // Get inputs of the current form step
    emptyInput = formStep[currentStep].getElementsByTagName("input");
    for (i = 0; i < emptyInput.length; i++) {
      // Add input listener to individual inputs
      emptyInput[i].addEventListener('input', function(e) {
        // If the input isn't empty then give it the class 'valid' 
        if (emptyInput[i] != "") {
          this.className = "valid";
        }
      });
      // If the input is empty then give it the class 'invalid'
      if (emptyInput[i].value == "") {
        emptyInput[i].className = "invalid";
        // Set valid to false for nextPrev function check
        valid = false;
      }
    } 
    return valid;
  }
}



if (window.location.pathname == "/goals/") {
  var deleteGoals = document.getElementsByClassName("delete_goals");
  var resetGoals = function(e) {
    // If user chooses to cancel the confirm message then prevent their goals from being deleted
    if (!confirm('Are you sure you want to delete all your goals and restart your 90 day sprint?')) e.preventDefault();
  }
  deleteGoals[0].addEventListener('click', resetGoals, false);


  var slideIndex = 1;
  showSlides(slideIndex);
 
  // Change the current slide #
  function plusSlides(slide) {
    showSlides(slideIndex += slide);
  }

  function showSlides(slide) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    // Return to the first goal if the current slide exceeds the amount of slides total
    if (slide > slides.length) {
      slideIndex = 1;
    }
    // Return to the last goal if the current slide is smaller then one
    if (slide < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        // Hide all the slides
        slides[i].style.display = "none";
    }
    // Display current slide
    slides[slideIndex-1].style.display = "block";
  }
  

  /* Not working for some reason 

  document.getElementById("PArrow").addEventListener('click', function() {
    plusSlides(-1);
  });
  document.getElementById("NArrow").addEventListener('click', function() {
    plusSlides(1);
  });

  */

}


