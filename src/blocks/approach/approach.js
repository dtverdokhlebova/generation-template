export default function approach() {
  const swiper = new Swiper('.approach-slider .swiper', {
    effect: 'creative',
    loop: true,
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
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    }
  })
}
