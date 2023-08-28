export default function goals() {
  $('.goals__button').on('click', function () {
    const itemName = '.goals__item'
    const classActive = 'goals__item--active'
    $(this).parents(itemName).siblings().removeClass('goals__item--open')
    $(this).parents(itemName).siblings().removeClass(classActive)
    $(this).parents(itemName).addClass(classActive)
    if (window.innerWidth < 1024) {
      $(this).parents(itemName).siblings().find('.goals__body').slideUp()
      $(this).parents(itemName).find('.goals__body').slideDown()
    }
  })
}
