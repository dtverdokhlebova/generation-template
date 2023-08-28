export default function swipe() {
  const blocks = document.querySelectorAll('.swipe')
  for (const block of blocks) {
    const slider = block.querySelector('.swiper')
    const scrollbar = block.querySelector('.swiper-scrollbar')
    const swiper = new Swiper(slider, {
      slidesPerView: 'auto',
      freeMode: true,
      grabCursor: true,
      scrollbar: {
        el: scrollbar
      }
    })
  }
}
