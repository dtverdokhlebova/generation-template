export default function accordion() {
  $('.accordions__ui-switch-button').on('click', function () {
    $(this).toggleClass('ui-switch-button--active')
    $(this).parents('.accordions__item').find('.accordions__body').slideToggle(() => ScrollTrigger.refresh(true))
  })
}
