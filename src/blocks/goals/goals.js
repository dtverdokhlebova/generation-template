export default function goals() {
  goalsSlider()

  $('.goals__button').on('click', function () {
    const itemName = '.goals__item'
    const classActive = 'goals__item--active'
    $(this).parents(itemName).siblings().removeClass('goals__item--open')
    $(this).parents(itemName).siblings().removeClass(classActive)
    $(this).parents(itemName).addClass(classActive)
    if (window.innerWidth < 1024) {
      $(this).parents(itemName).siblings().find('.goals__body').slideUp()
      $(this).parents(itemName).find('.goals__body').slideDown()
    }
  })
}

function goalsSlider() {
  const slidersBlocks = document.querySelectorAll('.goals--slider')
  for (const block of slidersBlocks) {
    const slider = block.querySelector('.swiper')
    const buttonNext = block.querySelector('.swiper-button-next')

    const swiper = new Swiper(slider, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      watchSlidesProgress: true,
      freeMode: true,
      speed: 400,
      enabled: false,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      },
      navigation: {
        nextEl: buttonNext
      },
      breakpoints: {
        1024: {
          enabled: true
        }
      },
      on: {
        touchMove: function (swiper) {
          swiper.update()
        }
      }
    })

    buttonNext.addEventListener('click', function() {
      swiper.update()
    })
  }
}
