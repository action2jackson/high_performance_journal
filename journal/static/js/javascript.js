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


function timerRestart() {
  time = 0;
  startTimer = 1;
  localStorage.setItem("time", time);
  localStorage.setItem("startTimer", startTimer);
}

function deleteSprint() {
  startTimer = 0;
  localStorage.setItem("startTimer", startTimer);
}

var time = 0;
var startTimer = 0;
function sprintTimer() {
  var countdown = document.getElementById("Countdown");
  var goals = document.getElementById("Goals"); 
  var goalLink = document.getElementById("Goal"); 

  time = parseInt(localStorage.getItem("time"));
  // increases time by 1 second 
  localStorage.setItem("time", time + 1);

  startTimer = parseInt(localStorage.getItem("startTimer"));

  // The timer only needs to be displayed if user is on the home page
  if (window.location.pathname == "/") {
    // If the user created their goals and its not been 90 days
    if (startTimer == 1 && time < 7776000000) {
      // Display Timer
      goalLink.href = "goals/";
      countdown.style.display = "flex";
      goals.style.display = "none";
    } else {
      // Display goals form
      goalLink.href = "";
      countdown.style.display = "none";
      goals.style.display = "flex";
    }

    // floor function rounds a number down to the lowest integer
    var days = Math.floor(time / (1000 * 60 * 60 * 24));
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - hours * 3600) / 60);
    var seconds = time - (hours * 3600 + minutes * 60);;

    // Displays double digits even if the number is lower then 10
    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    // Display updated time
    document.getElementById("days").textContent = days;
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  // Count by 1 second
  setTimeout(sprintTimer, 1000);
}



// If user is on home page
if (window.location.pathname == "/") {
  // document.querySelector('#Goals').scrollIntoView({behavior: 'smooth'});

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
      buttons: [true, "YES"],
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Submitting Form!", {
          icon: "success",
        });
        timerRestart();
        // If message was confirmed then submit the form
        document.getElementById("form_for_goals").submit();
      } else {
        swal("Make sure your goals are thoughtful!");
        return false;
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
  /* DELETES 90 DAY SPRINT */
  var deleteGoals = document.getElementsByClassName("delete_goals");
  function resetGoals() {
    swal({
      title: "WAIT, ARE YOU SURE?!",
      text: "Once submitted, your 90 day sprint will END!",
      closeOnClickOutside: false,
      icon: "warning",
      buttons: [true, "YES"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Deleteing Goals", {
          icon: "success",
        });
        // Delete the 90 day countdown sprint
        deleteSprint();
        // Get delete goals page
        window.location.href = "delete/";
      } else {
        swal("Keep grinding, you got this!");
      }
    });
  }
  // Delete button located on goals list page
  deleteGoals[0].addEventListener('click', resetGoals, false);
  /* DELETES 90 DAY SPRINT */


  var slideIndex = 1;
  showSlides(slideIndex);
 
  // Change the current slide #
  function plusSlides(slide) {
    var currentSlide = slideIndex += slide;
    showSlides(currentSlide);
  }

  function showSlides(slide) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    // Return to the first goal if the current slide exceeds the amount of total slides
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

  // Inline javascript is at goals_list.html for the slide show
}


// All the dream page urls start with "/dream"
if (window.location.pathname.startsWith("/dream")) {
  document.addEventListener("mousemove", function(e) {
    var body = document.querySelector('body');
    var zzz = document.createElement('span');
    zzz.className = "zzz";
    // client is relative to the upper edge of the content area
    // Where ever the mouse is add that in px
    zzz.style.left = e.clientX + 'px';
    zzz.style.top = e.clientY + 'px';
    // Randomize the size of span max being 40px
    var size = Math.random() * 40;
    zzz.style.width = size + '40px';
    zzz.style.height = size + '40px';
    body.appendChild(zzz);
  
    setTimeout(function() {
        // Remove created span every 2000 milliseconds
        zzz.remove();
    }, 1000)
  }); 
}

if (window.location.pathname == "/dreams/") {
  expand = document.getElementById("expandSidebar");
  close = document.getElementById("closeSidebar");

  // When clicked, expand the sidebar 
  expand.addEventListener('click', function(){
    document.getElementById("dreamSidebar").style.width = "250px";
    document.getElementById("sidebarFunction").style.marginLeft = "250px";
  });
  // When clicked, close the sidebar 
  close.addEventListener('click', function(){
    document.getElementById("dreamSidebar").style.width = "0";
    document.getElementById("sidebarFunction").style.marginLeft = "0";
  });
}


if (window.location.pathname.startsWith("/note/")) {
  CKEDITOR.addCss('.cke_editable img { max-width: 100% !important; height: auto !important; }');
}


if (window.location.pathname == "/daily/journal/") {
  // var taskComplete = document.querySelectorAll("#taskComplete");
  // var taskList = document.getElementsByClassName("todoList");

  // taskComplete.forEach(item => {
  //   item.addEventListener('click', () => {
  //     for (j = 0; j < taskComplete.length; j++) {
  //       console.log("cool")
  //       if (taskComplete[j].checked == true) {
  //           window.location.href = "task/" + j + "/delete";
  //           taskList[j].innerHTML = '<del>' + '{{ task }}' + '</del>';
  //       }
  //     }
  //   })
  // })

  // var taskSubmit = document.getElementsByClassName("task_submit");
  // var taskInput = document.getElementById("taskCreate");
  // taskInput.addEventListener('focusin', () => {

  //   taskSubmit[0].style.display = "block";
  // });
  // taskInput.addEventListener('focusout', () => {
  //   taskSubmit[0].style.display = "none";
  // });
}


if (window.location.pathname == "/login/") {
  const passwordInput = document.getElementById('password');
  // Sets type of login input to password when user starts typing
  passwordInput.addEventListener('keydown', () => {
      passwordInput.setAttribute('type', 'password');
  });
}

function resetGoalsLogout() {
  swal({
    title: "WAIT, ARE YOU SURE?!",
    text: "Logging out will delete your current sprint progress!",
    closeOnClickOutside: false,
    icon: "warning",
    buttons: [true, "YES"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      deleteSprint();
      window.location.href = "goals/delete/";
      window.location.href = "logout/";
    } else {
      swal("Keep grinding, you got this!");
    }
  });
}

const logout = document.getElementById("logout");
logout.addEventListener("click", resetGoalsLogout, true);

sprintTimer();


scheduler.init('scheduler_here', new Date(),"month");