import { refreshScroll, stopScroll } from '../../js'

export default function header() {
  burgerButton()
  burgerMenu()
}

function burgerButton() {
  const headerElement = $('.header')
  const burgerButton = $('.header__burger-button')
  const burger = $('.header__burger')
  const [topLine, midLine, botLine] = burgerButton.find('span')

  const topLineTl = gsap.timeline({ paused: true })
  const midLineTl = gsap.timeline({ paused: true })
  const botLineTl = gsap.timeline({ paused: true })
  topLineTl
    .to(topLine, { y: 7, duration: 0.3 })
    .to(topLine, {
      rotate: 45,
      duration: 0.2,
      ease: 'back.out(1.7)'
    }).reverse()

  midLineTl.to(midLine, { opacity: 0, duration: 0.3 }).reverse()

  botLineTl
    .to(botLine, { y: -7, duration: 0.3 })
    .to(botLine, {
      rotate: -45,
      duration: 0.2,
      ease: 'back.out(1.7)'
    }).reverse()

  window.toggleBurger = () => {
    if (headerElement.hasClass('header--burger')) {
      refreshScroll()
      setTimeout(() => {
        burger.css('display', '')
      }, 400)
    } else {
      stopScroll()
      burger.css('display', 'block')
    }
    setTimeout(() => {
      headerElement.toggleClass('header--burger')
    })
    topLineTl.reversed(!topLineTl.reversed())
    midLineTl.reversed(!midLineTl.reversed())
    botLineTl.reversed(!botLineTl.reversed())
  }
}

function burgerMenu() {
  window.openSubmenu = function (element) {
    if (window.innerWidth < 1359) {
      $(element).toggleClass('active')
      const submenu = $(element).parent().find('.header__submenu')
      $(element).hasClass('active') ? submenu.fadeIn(250) : submenu.fadeOut(250)
    }
  }
}
