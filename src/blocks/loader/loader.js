import { refreshScroll, stopScroll } from '../../js'

export default function loader() {
  stopScroll()
  window.addEventListener('load', function () {
    // setTimeout(() => {
    $('.loader').addClass('loader--close')
    const animationDuration = Number.parseFloat($('.loader').css('animation-duration'))
    setTimeout(() => {
      window.dispatchEvent(new Event('loader:close'))
    }, animationDuration * 1000)
    refreshScroll()
    // }, 1400)
  })
}
