export default function caseDesc() {
  if ($('.case-desc').length > 0) {
    $('.case-desc__max-h').each((index, item) => {
      let [currentHeight, fullHeight] = calcHeights(item)

      $(window).on('load, resize', () => {
        [currentHeight, fullHeight] = calcHeights(item)
      })

      const moreButton = $(item).parents('.case-desc__item').find('.case-desc__ui-switch-button')
      if (currentHeight === fullHeight) {
        moreButton.parents('.case-desc__more').remove()
      } else {
        $(item).addClass('case-desc__hiding')

        moreButton.on('click', () => {
          if ($(item).hasClass('case-desc__max-h')) {
            $(item).css('max-height', 'none')
            $(item).css('height', `${currentHeight}px`)
            $(item).animate({ height: `${fullHeight}px` }, () => {
              $(item).css('height', '')
              $(item).css('max-height', '')
              $(item).toggleClass('case-desc__max-h')
              $(item).toggleClass('case-desc__hiding')
              ScrollTrigger.refresh(true)
            })
          } else {
            $(item).css('overflow', 'hidden')
            $(item).toggleClass('case-desc__hiding')
            $(item).animate({ height: `${currentHeight}px` }, () => {
              $(item).css('height', '')
              $(item).css('overflow', '')
              $(item).toggleClass('case-desc__max-h')
              ScrollTrigger.refresh(true)
            })
          }
        })
      }
    })
  }
}

function calcHeights(item) {
  const currentHeight = $(item).outerHeight()
  const fullHeight = $(item).css('max-height', 'none').outerHeight()
  $(item).css('max-height', '')
  return [currentHeight, fullHeight]
}
