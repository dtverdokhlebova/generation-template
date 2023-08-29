export default function uiInput() {
  $('.ui-input input').on('input', function () {
    if ($(this).val() === '') {
      $(this).removeClass('filled')
    } else {
      $(this).addClass('filled')
    }
  })
}
