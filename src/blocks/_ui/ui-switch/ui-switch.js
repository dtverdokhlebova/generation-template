export default function uiSwitch() {
  for (const uiSwitchElement of document.querySelectorAll('.ui-switch')) {
    const button = uiSwitchElement.querySelector('.ui-switch-button')
    for (const input of uiSwitchElement.querySelectorAll('input')) {
      input.addEventListener('change', function () {
        const unchecked = uiSwitchElement.querySelector('input:not(:checked)')
        if (unchecked.dataset.switchTarget) {
          for (const element of document.querySelectorAll(`[data-switch-element=${unchecked.dataset.switchTarget}]`)) {
            element.style.display = 'none'
          }
        }
        if (this.dataset.switchTarget) {
          for (const element of document.querySelectorAll(`[data-switch-element=${this.dataset.switchTarget}]`)) {
            element.style.display = ''
          }
        }
        if (uiSwitchElement.querySelector('input:first-child').checked === true) {
          button.classList.remove('ui-switch-button--active')
        } else {
          button.classList.add('ui-switch-button--active')
        }
      })
    }
  }
  window.uiSwitchButton = function (button) {
    const uiSwitchElement = button.closest('.ui-switch')
    const checked = uiSwitchElement.querySelector('input[checked]')
    const unchecked = uiSwitchElement.querySelector('input:not([checked])')
    checked.checked = false
    checked.removeAttribute('checked')
    unchecked.checked = true
    unchecked.setAttribute('checked', 'checked')
    const changeEvent = new Event('change')
    unchecked.dispatchEvent(changeEvent)
  }
}
