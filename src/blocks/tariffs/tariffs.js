import { autoHeightTable } from '../../js'

export default function tariffs() {
  tariffsSlider()

  window.addEventListener('load', function () {
    tarifsHeight()
  })

  window.addEventListener('resize', function () {
    tarifsHeight()
  })

  window.tariffsPropsToggle = function (button) {
    $(button).toggleClass('ui-switch-button--active')
    $(button).parents('.tariffs__item').find('[ data-tariffs-prop-hidden]').slideToggle(() => ScrollTrigger.refresh(true))
  }
}

function tarifsHeight() {
  const item = $('.js-table .tariffs__item')
  const hiddenItem = item.find('[ data-tariffs-prop-hidden]')
  const button = item.find('.ui-switch-button')
  hiddenItem.css({ 'display' : '' })
  button.removeClass('ui-switch-button--active')
  autoHeightTable()
  hiddenItem.css({ 'display' : 'none' })
  ScrollTrigger.refresh(true)
}

function tariffsSlider() {
  const blocks = document.querySelectorAll('.tariffs')
  for (const block of blocks) {
    const slider = block.querySelector('.swiper')
    const slidersLength = block.querySelectorAll('.swiper-slide').length
    if (slidersLength > 2) {
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 18,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true
        }
      })
    } else {
      block.classList.add('tariffs--block')
    }
  }
}
