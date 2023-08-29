export default function createCheckbox(id, text, isChecked) {
  return $(`
    <div class="ui-checkbox">
      <input id="${id}" type="checkbox" ${isChecked ? 'checked' : ''}>
      <label for="${id}">${text}
        <svg class="svg svg--icon_checkbox">
          <use xlink:href="images/sprite.svg#icon_checkbox"></use>
        </svg>
      </label>
    </div>
  `)[0]
}
