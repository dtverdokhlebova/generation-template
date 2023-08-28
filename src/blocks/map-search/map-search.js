export default function mapSearch() {
  $('.map-search__col').each((index, item) => {
    loop($(item).find('.map-search__item'), {
      paused: false,
      repeat: -1,
      speed: 0.2,
      reversed: index !== 1,
      paddingTop: window.innerWidth < 1024 ? 7 : 10
    })
  })
}

function loop(items, config) {
  items = gsap.utils.toArray(items)
  config = config || {}
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: {
      ease: 'none'
    },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
  })
  const length = items.length
  const startY = items[0].offsetTop
  const times = []
  const heights = []
  const yPercents = []
  let currentIndex = 0
  const pixelsPerSecond = (config.speed || 1) * 100
  const snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1) // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
  let totalHeight; let currentY; let distanceToStart; let distanceToLoop; let item; let index
  gsap.set(items, { // convert "x" to "yPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
    yPercent: (index, element) => {
      const h = heights[index] = Number.parseFloat(gsap.getProperty(element, 'height', 'px'))
      yPercents[index] = snap(Number.parseFloat(gsap.getProperty(element, 'y', 'px')) / h * 100 + gsap.getProperty(element, 'yPercent'))
      return yPercents[index]
    }
  })
  gsap.set(items, {
    y: 0
  })
  totalHeight = items[length - 1].offsetTop + yPercents[length - 1] / 100 * heights[length - 1] - startY + items[length - 1].offsetHeight * gsap.getProperty(items[length - 1], 'scaleY') + (Number.parseFloat(config.paddingTop) || 0)
  for (index = 0; index < length; index++) {
    item = items[index]
    currentY = yPercents[index] / 100 * heights[index]
    distanceToStart = item.offsetTop + currentY - startY
    distanceToLoop = distanceToStart + heights[index] * gsap.getProperty(item, 'scaleY')
    tl.to(item, {
      yPercent: snap((currentY - distanceToLoop) / heights[index] * 100),
      duration: distanceToLoop / pixelsPerSecond
    }, 0).fromTo(item, {
      yPercent: snap((currentY - distanceToLoop + totalHeight) / heights[index] * 100)
    }, {
      yPercent: yPercents[index],
      duration: (currentY - distanceToLoop + totalHeight - currentY) / pixelsPerSecond,
      immediateRender: false
    }, distanceToLoop / pixelsPerSecond).add('label' + index, distanceToStart / pixelsPerSecond)
    times[index] = distanceToStart / pixelsPerSecond
  }

  function toIndex(index, variables) {
    variables = variables || {};
    (Math.abs(index - currentIndex) > length / 2) && (index += index > currentIndex ? -length : length) // always go in the shortest direction
    const newIndex = gsap.utils.wrap(0, length, index)
    let time = times[newIndex]
    if (time > tl.time() !== index > currentIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      variables.modifiers = {
        time: gsap.utils.wrap(0, tl.duration())
      }
      time += tl.duration() * (index > currentIndex ? 1 : -1)
    }
    currentIndex = newIndex
    variables.overwrite = true
    return tl.tweenTo(time, variables)
  }
  tl.next = variables => toIndex(currentIndex + 1, variables)
  tl.previous = variables => toIndex(currentIndex - 1, variables)
  tl.current = () => currentIndex
  tl.toIndex = (index, variables) => toIndex(index, variables)
  tl.times = times
  tl.progress(1, true).progress(0, true) // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete()
    tl.reverse()
  }
  return tl
}
