export default function uiInput() {
  const uiInputs = $('.ui-input input')
  uiInputs.on('focus', function () {
    $(this).parents('.ui-input').addClass('focus')
  })
  uiInputs.on('blur', function () {
    $(this).parents('.ui-input').removeClass('focus')
  })
  uiInputs.on('input', function () {
    if ($(this).val() === '') {
      $(this).parents('.ui-input').removeClass('filled')
    } else {
      $(this).parents('.ui-input').addClass('filled')
    }
  })
}
