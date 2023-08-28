export default function smallBanner() {
  for (const img of $('.small-banner__img[data-parallax]')) {
    gsap.timeline({
      scrollTrigger: {
        trigger: $(img).parents('.small-banner'),
        start: 'top 50%',
        end: 'bottom 10%',
        onUpdate: self => {
          gsap.to(img, { yPercent: (+img.dataset.parallax || 10) * self.progress, ease: 'sine.out', duration: 1.2 })
        }
      }
    })
  }
}
