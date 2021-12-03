if (screen.width > 720) {
   const imgs = document.querySelectorAll('.column img');

   for (const img of imgs) {
      img.addEventListener('click', () => {
         // Bring in carousel
         const carouselWrapper = document.getElementById('carousel-wrapper');
         const container = document.getElementById('container');
         const exitBtn = document.getElementById('carousel__button--exit');
         const wrapper = document.getElementById('wrapper');

         carouselWrapper.classList.remove('carousel-hidden');
         carouselWrapper.classList.add('carousel-wrapper');
         container.classList.add('blurry');
         wrapper.classList.add('fullscreen');

         // Start of carousel
         !(function (d) {
            const itemClassName = 'carousel__photo';
            (items = d.getElementsByClassName(itemClassName)),
               (totalItems = items.length),
               (slide = 0),
               (moving = true);

            function setInitialClasses() {
               items[totalItems - 1].classList.add('prev');
               items[0].classList.add('active');
               items[1].classList.add('next');
            }

            function setEventListeners() {
               let next = d.getElementsByClassName('carousel__button--next')[0],
                  prev = d.getElementsByClassName('carousel__button--prev')[0];
               next.addEventListener('click', moveNext);
               prev.addEventListener('click', movePrev);
            }

            function moveNext() {
               if (!moving) {
                  if (slide === totalItems - 1) {
                     slide = 0;
                  } else {
                     slide++;
                  }

                  moveCarouselTo(slide);
               }
            }

            function movePrev() {
               if (!moving) {
                  if (slide === 0) {
                     slide = totalItems - 1;
                  } else {
                     slide--;
                  }

                  moveCarouselTo(slide);
               }
            }

            function disableInteraction() {
               moving = true;

               setTimeout(function () {
                  moving = false;
               }, 500);
            }

            function moveCarouselTo(slide) {
               if (!moving) {
                  disableInteraction();

                  let newPrevious = slide - 1,
                     newNext = slide + 1,
                     oldPrevious = slide - 2,
                     oldNext = slide + 2;

                  if (totalItems - 1 > 3) {
                     if (newPrevious <= 0) {
                        oldPrevious = totalItems - 1;
                     } else if (newNext >= totalItems - 1) {
                        oldNext = 0;
                     }

                     if (slide === 0) {
                        newPrevious = totalItems - 1;
                        oldPrevious = totalItems - 2;
                        oldNext = slide + 1;
                     } else if (slide === totalItems - 1) {
                        newPrevious = slide - 1;
                        newNext = 0;
                        oldNext = 1;
                     }
                     items[oldPrevious].className = itemClassName;
                     items[oldNext].className = itemClassName;
                     items[newPrevious].className = itemClassName + ' prev';
                     items[slide].className = itemClassName + ' active';
                     items[newNext].className = itemClassName + ' next';
                  }
               }
            }

            function initCarousel() {
               setInitialClasses();
               setEventListeners();
               moving = false;
            }

            initCarousel();
         })(document);
         // End of carousel

         const closeImg = () => {
            carouselWrapper.classList.add('carousel-hidden');
            carouselWrapper.classList.remove('carousel-wrapper');
            container.classList.remove('blurry');
            wrapper.classList.remove('fullscreen');

            const imgs = document.querySelectorAll('.carousel__photo');
            const initImg = document.getElementById('initial');
            for (const img of imgs) {
               initImg.classList.add('initial');
               img.classList.remove('active');
               img.classList.remove('next');
               img.classList.remove('prev');
            }
         };

         exitBtn.addEventListener('click', closeImg);
      });
   }
}
