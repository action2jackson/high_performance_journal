const headerSlide = () => {
  const burger = document.querySelector('.burger');
  const header = document.querySelector('.navigation_container');
  const nav_link = document.querySelectorAll('.nav-link');
  const stars = document.querySelector('.stars');

  burger.addEventListener('click', () => {
    header.classList.toggle('header-active');

    
      nav_link.forEach((link, index) => {
        if(link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `headerFade 0.5s ease forwards ${index / 7 + 0.5}s`;
        }
      });
    
    burger.classList.toggle('toggle');
  });
}

headerSlide();