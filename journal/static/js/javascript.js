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

// function hideAddressBar()
// {
//   if(!window.location.hash)
//   {
//       if(document.height < window.outerHeight)
//       {
//           document.body.style.height = (window.outerHeight + 50) + 'px';
//       }

//       setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
//   }
// }

// window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
// window.addEventListener("orientationchange", hideAddressBar );


function timerRestart() {
  // time = 0;
  // startTimer = 1;
  // localStorage.setItem("time", time);
  // localStorage.setItem("startTimer", startTimer);

  var date = new Date(new Date().getTime() + 7776000000).getTime()
  localStorage.setItem("date", date)
}

function deleteSprint() {
  // startTimer = 0;
  // localStorage.setItem("startTimer", startTimer);
  localStorage.removeItem("date");
}



// If user is on home page
if (window.location.pathname == "/") {
  var isMobile = false;
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      isMobile = true;
  }

  if (localStorage.getItem("date")) {
    var x = setInterval( function sprintTimer() {
      var countdown = document.getElementById("Countdown");
      var goals = document.getElementById("Goals"); 
      var theGoalLink = document.getElementById("Goal"); 
  
      ninetyDayDate = localStorage.getItem("date");
      var currentDate = new Date().getTime()
      var ninetyDays = ninetyDayDate - currentDate
  
      // If the user created their goals and its not been 90 days
      if (ninetyDays > 0) {
        // Display Timer
        theGoalLink.href = "goals/";
        countdown.style.display = "flex";
        goals.style.display = "none";
      } else {
        // Display goals form
        theGoalLink.href = "";
        countdown.style.display = "none";
        goals.style.display = "flex";
      }

      // floor function rounds a number down to the lowest integer
      var days = Math.floor(ninetyDays / (1000 * 60 * 60 * 24));
      var hours = Math.floor(ninetyDays % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var minutes = Math.floor(ninetyDays % (1000 * 60 * 60) / (1000 * 60));
      var seconds = Math.floor(ninetyDays % (1000 * 60) / (1000));


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
    })  
  } else if (isMobile == true) {
    var countdown = document.getElementsByClassName('countdownContainer')
    var createGoals = document.getElementsByClassName('my_goals')
    var goalLink = document.getElementsByClassName('goal_container')
    countdown[0].style.display = "none"
    createGoals[0].style.display = "none"
    goalLink[0].style.display = "none"
  } else {
    var countdown = document.getElementsByClassName('countdownContainer')
    var createGoals = document.getElementsByClassName('my_goals')
    var goalLink = document.getElementsByClassName('goal_container')
    countdown[0].style.display = "none"
    createGoals[0].style.display = "flex"
    goalLink[0].style.display = "flex"
  }


  //Function to pick a quote and corresponding author based on the random integer, then populate the quote HTML elements
  function quote(){
    var quoteArray = ["Success is most often achieved by those who don't know that failure is inevitable.","Things work out best for those who make the best of how things work out.","Courage is grace under pressure.","If you are not willing to risk the usual, you will have to settle for the ordinary.","Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.","Take up one idea. Make that one idea your life -- think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body be full of that idea, and just leave every other idea alone. This is the way to success.","Sometimes you can't see yourself clearly until you see yourself through the eyes of others.","All our dreams can come true if we have the courage to pursue them.","It does not matter how slowly you go, so long as you do not stop.","Success is walking from failure to failure with no loss of enthusiasm.","Someone is sitting in the shade today because someone planted a tree a long time ago.","Whenever you see a successful person, you only see the public glories, never the private sacrifices to reach them.","Don't cry because it's over, smile because it happened.","Success? I don't know what that word means. I'm happy. But success, that goes back to what in somebody's eyes success means. For me, success is inner peace. That's a good day for me.","You only live once, but if you do it right, once is enough.","Opportunities don't happen. You create them.","Once you choose hope, anything's possible.","Try not to become a person of success, but rather try to become a person of value.","There is no easy walk to freedom anywhere, and many of us will have to pass through the valley of the shadow of death again and again before we reach the mountaintop of our desires.","It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.","The best and most beautiful things in the world cannot be seen or even touched -- they must be felt with the heart.","Great minds discuss ideas; average minds discuss events; small minds discuss people.","Live as if you were to die tomorrow. Learn as if you were to live forever.","The best revenge is massive success.","The difference between winning and losing is most often not quitting.","I have not failed. I've just found 10,000 ways that won't work.","When you cease to dream you cease to live.","A successful man is one who can lay a firm foundation with the bricks others have thrown at him.","May you live every day of your life.","No one can make you feel inferior without your consent.","Failure is another steppingstone to greatness.","The whole secret of a successful life is to find out what is one's destiny to do, and then do it.","If you're not stubborn, you'll give up on experiments too soon. And if you're not flexible, you'll pound your head against the wall and you won't see a different solution to a problem you're trying to solve.","If you're going through hell, keep going.","In order to be irreplaceable one must always be different.","What seems to us as bitter trials are often blessings in disguise.","You miss 100 percent of the shots you don't take.","The distance between insanity and genius is measured only by success.","The way I see it, if you want the rainbow, you gotta put up with the rain.","To me, business isn't about wearing suits or pleasing stockholders. It's about being true to yourself, your ideas and focusing on the essentials.","The longer I live, the more beautiful life becomes.","Happiness is a butterfly, which when pursued, is always beyond your grasp, but which, if you will sit down quietly, may alight upon you.","You must expect great things of yourself before you can do them.","If you can't explain it simply, you don't understand it well enough.","You can't please everyone, and you can't make everyone like you.","There are two types of people who will tell you that you cannot make a difference in this world: those who are afraid to try and those who are afraid you will succeed.","I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.","Start where you are. Use what you have. Do what you can.","Don't limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.","People ask, 'What's the best role you've ever played?' The next one.","The two most important days in your life are the day you are born and the day you find out why.","I find that the harder I work, the more luck I seem to have.","It often requires more courage to dare to do right than to fear to do wrong.","Success is the sum of small efforts, repeated day-in and day-out.","As you grow older, you will discover that you have two hands, one for helping yourself, the other for helping others.","If you want to achieve excellence, you can get there today. As of this second, quit doing less-than-excellent work.","If your actions inspire others to dream more, learn more, do more, and become more, you are a leader.","All progress takes place outside the comfort zone.","The more you praise and celebrate your life, the more there is in life to celebrate.","You may only succeed if you desire succeeding; you may only fail if you do not mind failing.","A dream doesn't become reality through magic; it takes sweat, determination, and hard work.","Only put off until tomorrow what you are willing to die having left undone.","The biggest risk is not taking any risk... In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.","We become what we think about most of the time, and that's the strangest secret.","Do one thing every day that scares you.","The only place where success comes before work is in the dictionary.","Don't be afraid to give up the good to go for the great.","Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.","Don't worry about failure; you only have to be right once.","Though no one can go back and make a brand-new start, anyone can start from now and make a brand-new ending.","Nothing great was ever achieved without enthusiasm.","Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.","Keep your face to the sunshine and you can never see the shadow.","The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.","One of the greatest diseases is to be nobody to anybody.","Identity is a prison you can never escape, but the way to redeem your past is not to run from it, but to try to understand it, and use it as a foundation to grow.","The successful warrior is the average man, with laser-like focus.","Rarely have I seen a situation where doing less than the other guy is a good strategy.","If you always do what interests you, at least one person is pleased.","Keep on going, and the chances are that you will stumble on something, perhaps when you are least expecting it. I never heard of anyone ever stumbling on something sitting down.","I avoid looking forward or backward, and try to keep looking upward.","You can't connect the dots looking forward; you can only connect them looking backward. So you have to trust that the dots will somehow connect in your future. You have to trust in something -- your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.","Life is short, and it is here to be lived.","Everything you can imagine is real.","Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.","If you want to make a permanent change, stop focusing on the size of your problems and start focusing on the size of you!","Successful people do what unsuccessful people are not willing to do. Don't wish it were easier; wish you were better.","It is never too late to be what you might have been.","If you love what you do and are willing to do what it takes, it's within your reach. And it'll be worth every minute you spend alone at night, thinking and thinking about what it is you want to design or build.","In my experience, there is only one motivation, and that is desire. No reasons or principle contain it or stand against it.","In the midst of movement and chaos, keep stillness inside of you.","Success does not consist in never making mistakes but in never making the same one a second time.","I don't want to get to the end of my life and find that I lived just the length of it. I want to have lived the width of it as well.","As we look ahead into the next century, leaders will be those who empower others.","Our greatest fear should not be of failure... but of succeeding at things in life that don't really matter.","Be yourself. Everyone else is already taken.","If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much.","But you have to do what you dream of doing even while you're afraid.","To be successful, you must accept all challenges that come your way. You can't just accept the ones you like.","Be patient with yourself. Self-growth is tender; it's holy ground. There's no greater investment.","Many of life's failures are people who did not realize how close they were to success when they gave up.","If you can copy and paste one hundred and one inspirational quotes, you can do anything"]
    var authorArray = ["Coco Chanel","John Wooden","Ernest Hemingway","Jim Rohn","Albert Einstein","Swami Vivekananda","Ellen DeGeneres","Walt Disney","Confucius","Winston Churchill","Warren Buffett","Vaibhav Shah","Dr. Seuss","Denzel Washington","Mae West","Chris Grosser","Christopher Reeve","Albert Einstein","Nelson Mandela","Charles Darwin","Helen Keller","Eleanor Roosevelt","Mahatma Gandhi","Frank Sinatra","Walt Disney","Thomas Edison","Malcolm Forbes","David Brinkley","Jonathan Swift","Eleanor Roosevelt","Oprah Winfrey","Henry Ford","Jeff Bezos","Winston Churchill","Coco Chanel","Oscar Wilde","Wayne Gretzky","Bruce Feirstein","Dolly Parton","Richard Branson","Frank Lloyd Wright","Nathaniel Hawthorne","Michael Jordan","Albert Einstein","Katie Couric","Ray Goforth","Neil Armstrong","Arthur Ashe","Mary Kay Ash","Kevin Kline","Mark Twain","Thomas Jefferson","Abraham Lincoln","Robert Collier","Audrey Hepburn","Thomas J. Watson","John Quincy Adams","Michael John Bobak","Oprah Winfrey","Philippos","Colin Powell","Pablo Picasso","Mark Zuckerberg","Earl Nightingale","Eleanor Roosevelt","Vidal Sassoon","John D. Rockefeller","Steve Jobs","Drew Houston","Carl Bard","Ralph Waldo Emerson","Mark Twain","Helen Keller","Mark Caine","Mother Teresa","Jay-Z","Bruce Lee","Jimmy Spithill","Katharine Hepburn","Charles F. Kettering","Charlotte Bronte","Steve Jobs","Kate Winslet","Picasso","Barack Obama","T. Harv Eker","Jim Rohn","George Eliot","Steve Wozniak","Jane Smiley","Deepak Chopra","George Bernard Shaw","Diane Ackerman","Bill Gates","Francis Chan","Oscar Wilde","Jim Rohn","Arianna Huffington","Mike Gafka","Stephen Covey","Thomas A. Edison","Daniel Cole"]
    // API that holds quotes and corresponding authors
    fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then(function(quote) {
        // Adding more quotes and authors to the arrays
        for(var i = 0; i < quote.length; i++) {
          if (quote[i].author) {
            quoteArray.push(quote[i].text)
            authorArray.push(quote[i].author)
          }
        }
        var quoteNumber = randomNumber(quoteArray.length, currentNumber)
        // Use the quote number to pick the quote text and corresponding author
        var quoteBody = quoteArray[quoteNumber]
        var quoteAuthor = authorArray[quoteNumber]
        // Update the currentNumber global variable
        currentNumber = quoteNumber
        document.getElementById("quote").innerHTML = '"' + quoteBody + '"'
        document.getElementById("quoteAuthor").innerHTML = quoteAuthor
    });
    
    //Function to generate a random integer using the total number of quotes in the array as the upper limit
    function randomNumber(numQuotes,previousNumber) {
      // Generate random number
      var number = Math.floor(Math.random() * numQuotes)
      // Check if this is the first run of the generator i.e. page loading
      if (previousNumber === null) {
        return number;
      }
      // If this isn't the first run of the generator i.e. button click, check the new number is not the same as the last. If it is, loop the randomiser until it isn't, then return the random number
      while (number === previousNumber) {
        number = Math.floor(Math.random() * numQuotes)
      }
      return number
    }
  }
  // Set previous random number to null, as there is no previous number on page load
  var currentNumber = null;

  

  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;
  var after_header = document.getElementById("AF");
  var goals = document.getElementById("goals");

  if (isMobile == false) {
    window.addEventListener('scroll', function(e) {
      // Objects fade on scroll
      after_header.style.opacity = 1 - +this.window.pageYOffset/550+'';
      after_header.style.top = +this.window.pageXOffset+'px';

      // Objects from home page
      const targetButtons = document.querySelectorAll('.btnlink');
      var targetGoals = document.getElementsByClassName('goal_parallax');
      var targetEmojiCon = document.getElementsByClassName('quote_button');
      var targetEmoji = document.getElementsByClassName('quote');

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
  }


  /* Confirm message for submitting 90 day goals form with the library SweetAlerts */
  function swalSubmitGoal() {
    swal({
      title: "Are you sure?",
      text: "Once submitted, your previous 90 day sprint will be cleared and a new one will start!",
      buttons: [true, "YES"],
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Submitting Form!", {
          icon: "success",
        });
        location.href = "sprint/finish/"
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

if (window.location.pathname == "/collection/") {
  var logoutLink = document.getElementById("logout")
  logoutLink.innerHTML = "Download"
  logoutLink.href = 'download'
}

if (window.location.pathname == "/goals/") {
  var logoutLink = document.getElementById("logout")
  logoutLink.innerHTML = "Download"
  logoutLink.href = 'download'
  
  /* DELETES 90 DAY SPRINT */
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
  if (document.getElementsByClassName("delete_goals").length != 0) {
    var deleteGoals = document.getElementsByClassName("delete_goals");
    // Delete button located on goals list page
    deleteGoals[0].addEventListener('click', resetGoals);
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
}

// All the dream page urls start with "/dream"
if (window.location.pathname.startsWith("/dream/new/")) {
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

  function mobileDesktopExpand() {
    document.getElementById("dreamSidebar").style.width = "250px";
    document.getElementById("sidebarFunction").style.marginLeft = "250px";
  }
  function mobileDesktopClose() {
    document.getElementById("dreamSidebar").style.width = "0";
    document.getElementById("sidebarFunction").style.marginLeft = "0";
  }

  // When clicked, expand the sidebar 
  expand.addEventListener('touchstart', mobileDesktopExpand);
  expand.addEventListener('click', mobileDesktopExpand);
  // When clicked, close the sidebar 
  close.addEventListener('touchstart', mobileDesktopClose);
  close.addEventListener('click', mobileDesktopClose);
}


if (window.location.pathname.startsWith("/note/")) {
  CKEDITOR.addCss('.cke_editable img { max-width: 100% !important; height: auto !important; }');
}


if (window.location.pathname.startsWith("/daily/journal/")) {
  document.getElementById("openRecapForm").addEventListener('click', function(){
    document.getElementById("OpenFormContainer").style.display = "none"
    document.getElementById("RecapForm").style.display = "flex"
  })
  document.getElementById("submitDailyRecap").addEventListener('submit', function(){
    swal({
      title: "Submit Daily Recap?",
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
        document.getElementById("OpenFormContainer").style.display = "flex"
        document.getElementById("RecapForm").style.display = "none"
      } else {
        swal("Keep grinding, you got this!");
      }
    });
  })
  // var todo_journal = document.getElementById("todoJournal")
  // todo_journal.addEventListener("mouseover", function(){
  //   todo_journal.innerHTML += " Main Journal";
  // }, true);
}

// if (window.location.pathname.startsWith("/calendar/")) {
//   var main_journal = document.getElementById("mainJournal")
//   main_journal.addEventListener("mouseover", function(){
//     main_journal.innerHTML += " Todo Journal";
//   }, true); 
// }


if (window.location.pathname == "/login/") {
  const passwordInput = document.getElementById('password');
  // Sets type of login input to password when user starts typing
  passwordInput.addEventListener('keydown', () => {
      passwordInput.setAttribute('type', 'password');
  });
}

function resetGoalsLogout() {
  const logout = document.getElementById("logout");
  if (logout.textContent == "Logout") { 
    swal({
      title: "WAIT, ARE YOU SURE?!",
      text: "Logging out will put a pause on your 90 day sprint!",
      closeOnClickOutside: false,
      icon: "warning",
      buttons: [true, "YES"],
      dangerMode: true,
    })
    .then((willLogout) => {
      if (willLogout) {
        window.location.href = "logout/";
      } else {
        swal("Keep grinding, you got this!");
      }
    });
  }
}

const logout = document.getElementById("logout");
logout.addEventListener("click", resetGoalsLogout, true);

