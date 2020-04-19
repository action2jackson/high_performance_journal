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


if (window.location.pathname == "/") {

  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;
  var after_header = document.getElementById("AF");
  var goals = document.getElementById("goals");

  window.addEventListener('scroll', function(e) {
    after_header.style.opacity = 1 - +this.window.pageYOffset/550+'';
    after_header.style.top = +this.window.pageXOffset+'px';

    const targetButtons = document.querySelectorAll('.btnlink');
    var targetGoals = document.getElementsByClassName('goal_parallax');
    var targetEmojiCon = document.getElementsByClassName('feeling');
    var targetEmoji = document.getElementsByClassName('far');

    function parallax(target) {
      for (index = 0; index < target.length; index++) {
        var position = window.pageYOffset * target[index].dataset.rate;
        if(target[index].dataset.direction === 'vertical') {
          target[index].style.transform = 'translate3d(0px, '+position+'px, 0px)';
        } else {
          var positionX = window.pageYOffset * target[index].dataset.ratex;
          var positionY = window.pageYOffset * target[index].dataset.ratey;
  
          target[index].style.transform = 'translate3d('+positionX+'px, '+positionY+'px, 0px)';
        }
      }
    }
    parallax(targetEmojiCon);
    parallax(targetEmoji);
    parallax(targetButtons);
    parallax(targetGoals);
  });


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
        document.getElementById("form_for_goals").submit();
        return false;
      } else {
        swal("Make sure your goals are thoughtful!");
      }
    });
  }

  
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
      if (swalSubmitGoal() != true) {
        currentStep = 3;
      }
    }
    showStep(currentStep);
  }

  nextBtn.addEventListener('click', function() {
    nextPrev(1);
  }, false);
  prevBtn.addEventListener('click', function() {
    nextPrev(-1);
  }, false);


  function validateForm() {
    var formStep, emptyInput, i, valid = true;
    formStep = document.getElementsByClassName("form_step");
    emptyInput = formStep[currentStep].getElementsByTagName("input");
    for (i = 0; i < emptyInput.length; i++) {
      emptyInput[i].addEventListener('input', function(e) {
        if (emptyInput[i] != "") {
          this.className = "valid";
        }
      });
      if (emptyInput[i].value == "") {
        emptyInput[i].className = "invalid";
        valid = false;
      }
    } 
    return valid;
  }
}



if (window.location.pathname == "/goals/") {
  var deleteGoals = document.getElementsByClassName("delete_goals");
  var resetGoals = function(e) {
    if (!confirm('Are you sure you want to delete all your goals and restart your 90 day sprint?')) e.preventDefault();
  }
  deleteGoals[0].addEventListener('click', resetGoals, false);

  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(slide) {
    showSlides(slideIndex += slide);
  }

  function showSlides(slide) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (slide > slides.length) {
      slideIndex = 1;
    }
    if (slide < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
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


