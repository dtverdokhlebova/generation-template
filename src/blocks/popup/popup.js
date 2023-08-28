import { refreshScroll, stopScroll } from '../../js'

export default function popup() {
  for (const popupElement of document.querySelectorAll('.popup')) {
    popupElement.querySelector('.popup__close').addEventListener('click', function () {
      popupElement.classList.remove('active')
      refreshScroll()
    })

    popupElement.addEventListener('click', (event) => {
      if (event.target === popupElement) {
        popupElement.classList.remove('active')
        refreshScroll()
      }
    })
  }

  window.openPopup = function (id) {
    const popupElement = document.querySelector(`#${id}`)
    if (popupElement) {
      document.querySelector(`#${id}`).classList.add('active')
      stopScroll()
    }
  }

  window.closePopup = function (id) {
    const popupElement = document.querySelector(`#${id}`)
    if (popupElement) {
      document.querySelector(`#${id}`).classList.remove('active')
      refreshScroll()
    }
  }
}
