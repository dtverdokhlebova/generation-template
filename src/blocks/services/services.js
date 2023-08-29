export default function services() {
  if (window.innerWidth < 768) {
    servicesTabs()
  } else {
    servicesSlider()
  }
}

function servicesTabs() {
  const tabsItem = '.services__item'
  const tabHead = '.services__head'
  const tabBody = '.services__body'

  $($(tabsItem)[0]).addClass('active').find(tabBody).slideDown()

  $(tabHead).on('click', function () {
    const siblingsItems = $(this).parents('.services').find(tabsItem)
    if ($(this).parents(tabsItem).hasClass('active')) {
      $(this).parents(tabsItem).removeClass('active')
      $(this).siblings(tabBody).slideUp(() => ScrollTrigger.refresh(true))
    } else {
      siblingsItems.removeClass('active')
      siblingsItems.find(tabBody).slideUp()
      $(this).parents(tabsItem).addClass('active')
      $(this).siblings(tabBody).slideDown(() => ScrollTrigger.refresh(true))
    }
  })
}

function servicesSlider() {
  const blocks = document.querySelectorAll('.services')
  for (const block of blocks) {
    const navItems = block.querySelectorAll('.services__item')
    const slider = block.querySelector('.swiper')
    const swiper = new Swiper(slider, {
      grabCursor: true,
      rewind: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400]
        },
        next: {
          translate: ['101%', 0, 0]
        }
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      on: {
        init: function (swiper) {
          navItems[0].classList.add('active')
        },
        slideChange: function (swiper) {
          $(navItems).removeClass('active')
          navItems[swiper.activeIndex].classList.add('active')
        },
        autoplayTimeLeft(swiper, time, progress) {
          const progressBarValue = (1 - progress)
          navItems[swiper.activeIndex].querySelector('.services__progress').style.transform = `scaleX(${progressBarValue})`
        }
      }
    })
    $(navItems).on('click', function () {
      swiper.slideTo($(this).index(), 400)
    })
  }
}
