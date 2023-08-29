import { refreshScroll, stopScroll } from '../../js'

export default function loader() {
  stopScroll()
  window.addEventListener('load', function () {
    setTimeout(() => {
      $('.loader').addClass('loader--close')
      window.dispatchEvent(new Event('loader:close'))
      refreshScroll()
    }, 1600)
  })
}
