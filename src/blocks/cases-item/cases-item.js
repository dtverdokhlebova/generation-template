import { hoverEvents } from '../../js'

export default function casesItem() {
  if (window.innerWidth > 1358) {
    const items = document.querySelectorAll('.cases-item')
    for (const item of items) {
      const popover = item.querySelector('.cases-item__popover')
      hoverEvents(item, popover)
    }
  }
}
