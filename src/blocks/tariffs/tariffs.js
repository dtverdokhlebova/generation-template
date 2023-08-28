export default function tariffs() {
  tariffsSlider()

  window.tariffsPropsToggle = function (button) {
    $(button).toggleClass('ui-switch-button--active')
    $(button).parents('.tariffs__item').find('[ data-tariffs-prop-hidden]').slideToggle(() => ScrollTrigger.refresh(true))
  }
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
