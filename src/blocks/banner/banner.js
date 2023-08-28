export default function banner() {
  contentAnim()
  videoAnim()
  imgParallax()
  cardsSlider()
  mockupsAnim()
}

function contentAnim() {
  if ($('.banner').length > 0) {
    gsap.set('.banner__content', {
      opacity: 0
    })

    window.addEventListener('loader:close', () => {
      gsap.to('.banner__content', {
        opacity: 1,
        duration: 1.2
      })
    })
  }
}

function videoAnim() {
  if ($('.banner__video').length > 0) {
    gsap.set('.banner__video, .banner__video-player', {
      opacity: 0,
      rotation: -3,
      x: 1,
      y: -1
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.banner',
        start: 'top',
        end: 'bottom',
        scrub: 0
      }
    }).to('.banner__video', { rotate: -4 })

    window.addEventListener('loader:close', () => {
      gsap.to('.banner__video', {
        rotation: 0,
        duration: 0.5,
        delay: 0.5
      })
      gsap.to('.banner__video-player', {
        rotation: 4,
        duration: 0.5,
        delay: 0.5
      })
      gsap.to('.banner__video-player, .banner__video', {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.5
      })
    })
  }
}

function imgParallax() {
  for (const img of $('.banner__pic img[data-parallax]')) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.banner',
        start: 'top top',
        end: 'bottom 20%',
        onUpdate: self => {
          gsap.to(img, { yPercent: (+img.dataset.parallax || 10) * self.progress, ease: 'sine.out', duration: 1.2 })
        }
      }
    })
  }
}

function cardsSlider() {
  if ($('.banner__cards').length > 0) {
    const perSlideRotate = -20
    const perSlideYOffset = 5
    const perSlideXOffset = -12
    const cardsNumber = $('.banner__card').length
    $('.banner__card').each((index, item) => {
      gsap.set(item, {
        rotate: perSlideRotate * index,
        x: perSlideXOffset * index,
        y: perSlideYOffset * index,
        zIndex: cardsNumber - index
      })
      $(item).attr('data-index', index)
    })

    const progressValue = $('.banner__progress-val')
    const animStep = (isFirstTime) => {
      gsap.set(progressValue, {
        x: '0%'
      })
      gsap.to(progressValue, {
        x: '100%',
        ease: 'none',
        duration: 5
      })

      if (!isFirstTime) {
        $('.banner__card').each((index, item) => {
          const currentIndex = +$(item).attr('data-index')
          if (currentIndex === 0) {
            $(item).attr('data-index', cardsNumber - 1)
          } else {
            $(item).attr('data-index', currentIndex - 1)
          }
        })

        $('.banner__card').each((index, item) => {
          const cardIndex = +$(item).attr('data-index')
          const tl = gsap.timeline()
          const isFrontSlide = cardIndex === cardsNumber - 1
          if (isFrontSlide) {
            gsap.to(item, {
              opacity: 0,
              duration: 0.4
            })
          }
          tl.to(item, {
            rotate: perSlideRotate * cardIndex,
            x: perSlideXOffset * cardIndex,
            y: perSlideYOffset * cardIndex,
            zIndex: cardsNumber - cardIndex,
            duration: 1,
            delay: isFrontSlide ? 0 : cardIndex * 0.08
          }, 0)
          if (isFrontSlide) {
            tl.to(item, {
              opacity: 1,
              duration: 0.4
            }, '>-0.4')
          }
        })
      }

      gsap.delayedCall(5, animStep)
    }

    window.addEventListener('loader:close', () => {
      animStep(true)
    })
  }
}

function mockupsAnim() {
  if ($('.banner__mockups--anim').length > 0) {
    const [left, middle, right] = $('.banner__mockup')

    const leftHiddenImg = $(left).find('img').eq(1)
    const middleHiddenImg = $(middle).find('img').eq(1)
    const rightHiddenImg = $(right).find('img').eq(1)

    const images = [...leftHiddenImg, middleHiddenImg, rightHiddenImg]

    for (const [index, image] of images.entries()) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.banner',
          start: `${100 / 7 * index}% top`,
          onEnter: () => gsap.to(image, { zIndex: 2 }),
          onLeaveBack: () => gsap.to(image, { zIndex: 0 })
        }
      })
    }
  }
}
