import { hoverEvents } from '../../js'

export default function team() {
  teamSlider()
  if (window.innerWidth > 1358) {
    teamEvents()
  }
}

function teamSlider() {
  const swiper = new Swiper('.team .swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    }
  })
}

function teamEvents() {
  const items = document.querySelectorAll('.team__item')
  for (const item of items) {
    const popover = item.querySelector('.team__popover')
    const scaleItem = item.querySelector('.team__photo')
    hoverEvents(item, popover, scaleItem)
  }
}
