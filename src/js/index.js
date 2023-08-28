import '../styles/style.scss'
import uiInput from '../blocks/_ui/ui-input/ui-input'
import uiSwitch from '../blocks/_ui/ui-switch/ui-switch'
import loader from '../blocks/loader/loader'
import accordion from '../blocks/accordion/accordion'
import approach from '../blocks/approach/approach'
import banner from '../blocks/banner/banner'
import contacts from '../blocks/contacts/contacts'
import caseDesc from '../blocks/case-desc/case-desc'
import casesItem from '../blocks/cases-item/cases-item'
import goals from '../blocks/goals/goals'
import header from '../blocks/header/header'
import lineChart from '../blocks/line-chart/line-chart'
import mapSearch from '../blocks/map-search/map-search'
import page404 from '../blocks/page-404/page-404'
import popup from '../blocks/popup/popup'
import services from '../blocks/services/services'
import smallBanner from '../blocks/small-banner/small-banner'
import swipe from '../blocks/swipe/swipe'
import tariffs from '../blocks/tariffs/tariffs'
import team from '../blocks/team/team'

document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger)
  window.addEventListener('load', () => ScrollTrigger.refresh(true))
  smoothScroll()
  changeBackgroundOnScroll()

  uiInput()
  uiSwitch()
  loader()
  accordion()
  approach()
  banner()
  caseDesc()
  casesItem()
  contacts()
  goals()
  header()
  page404()
  lineChart()
  mapSearch()
  popup()
  services()
  smallBanner()
  swipe()
  tariffs()
  team()
})

function smoothScroll() {
  if (!isTouchDevice()) {
    const lenis = new Lenis({
      duration: 1.7,
      smoothWheel: true,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
    })
    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      window.requestAnimationFrame(raf)
    }
    window.requestAnimationFrame(raf)

    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault()
      lenis.scrollTo($(this).attr('href'), { duration: 2 })
    })
  }
}

function changeBackgroundOnScroll() {
  for (const darkSection of document.querySelectorAll('.section--bg')) {
    const isLastSection = () => {
      if (!darkSection.nextElementSibling) return true
      return !(darkSection.nextElementSibling.classList.contains('section'))
    }
    ScrollTrigger.create({
      trigger: darkSection,
      start: 'top 50%',
      end: isLastSection() ? 'bottom top' : 'bottom 40%',
      onToggle: self => {
        if (self.isActive) {
          gsap.to('.wrapper', {
            backgroundColor: '#101010',
            overwrite: 'auto',
            duration: 0.7
          })
        } else {
          gsap.to('.wrapper', {
            backgroundColor: '#fafafa',
            overwrite: 'auto',
            duration: 0.7
          })
        }
      }
    })
  }
}

window.toggleHidden = function (button, parent) {
  if ($(button).data('expand') === 'true') {
    $(button).data('expand', 'false')
    $(button).html($(button).data('text-start'))
    const block = $(parent)
    const items = block.find('[data-hidden="true"]')
    $(items).addClass('block-none')
    ScrollTrigger.refresh(true)
  } else {
    $(button).data('expand', 'true')
    $(button).html($(button).data('text-end'))
    const block = $(parent)
    const items = block.find('[data-hidden="true"]')
    $(items).addClass('block-fade-in')
    $(items).removeClass('block-none')
    ScrollTrigger.refresh(true)
  }
}

export const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0))
}

export const stopScroll = () => {
  if (!isTouchDevice() && window.lenis) {
    window.lenis.stop()
  }
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

export const refreshScroll = () => {
  if (!isTouchDevice() && window.lenis) {
    window.lenis.start()
  }
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

export const hoverEvents = (item, popover, scaleItem) => {
  item.addEventListener('mousemove', (event) => {
    const currentTarget = event.currentTarget
    const bounding = currentTarget.getBoundingClientRect()
    const posX = event.clientX - bounding.x
    const posY = event.clientY - bounding.y
    const moveX = event.clientX - bounding.left - bounding.width / 2
    const moveY = event.clientY - bounding.top - bounding.height / 2
    gsap.to(popover, {
      scale: 1.1,
      opacity: 1,
      x: posX,
      y: posY,
      ease: 'expo.out',
      duration: 1
    })
    if (scaleItem) {
      gsap.to(scaleItem, {
        scale: 1.2,
        x: moveX * 0.2,
        y: moveY * 0.2,
        ease: 'expo.out',
        duration: 1.8
      })
    }
  })

  item.addEventListener('mouseleave', (event) => {
    const currentTarget = event.currentTarget
    gsap.killTweensOf([popover])
    gsap.to(popover, {
      scale: 0.8,
      opacity: 0.0001,
      ease: 'expo.out',
      duration: 1
    })
    if (scaleItem) {
      gsap.killTweensOf([scaleItem])
      gsap.to(scaleItem, {
        scale: 1,
        x: 0,
        y: 0,
        ease: 'expo.out',
        duration: 1
      })
    }
  })
}