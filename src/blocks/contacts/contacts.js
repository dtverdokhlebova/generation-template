export default function contacts() {
  window.addEventListener('load', function () {
    contactsSlider()
    contactsMap()
  })
}

function contactsMap() {
  const mapBlock = document.querySelector('#contactsMapBlock')
  if (mapBlock) {
    let myMap
    const coordsLat = Number.parseFloat(mapBlock.dataset.coordsLat)
    const coordsLng = Number.parseFloat(mapBlock.dataset.coordsLng)
    const mapzoom = mapBlock.dataset.zoom

    ymaps.ready(init)
    function init() {
      myMap = new ymaps.Map('contactsMapBlock', {
        center: [coordsLat, coordsLng],
        zoom: mapzoom,
        controls: []
      }, {
        suppressMapOpenBlock: true
      })
      const placemark = new ymaps.Placemark([coordsLat, coordsLng], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/map_placemark.png',
        iconImageSize: [54, 54],
        iconImageOffset: [-27, -54]
      })
      myMap.geoObjects.add(placemark)
      if (window.innerWidth < 1024) {
        myMap.behaviors.disable('scrollZoom')
        myMap.behaviors.disable('drag')
      }
    }

    $('.contacts-slider__item').on('click', function () {
      const coordsLat = $(this).attr('data-coords-lat')
      const coordsLng = $(this).attr('data-coords-lng')
      myMap.setCenter([coordsLat, coordsLng], 15)
      myMap.geoObjects.removeAll()
      const placemarkNew = new ymaps.Placemark([coordsLat, coordsLng], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../../images/map_placemark.png',
        iconImageSize: [54, 54],
        iconImageOffset: [-27, -54]
      })
      myMap.geoObjects.add(placemarkNew)

      $(this).siblings('.contacts-slider__item').removeClass('contacts-slider__item--active')
      $(this).addClass('contacts-slider__item--active')
    })
  }
}

function contactsSlider() {
  const swiper = new Swiper('.contacts-slider .swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      320: {
        slidesPerView: 'auto',
        spaceBetween: 20
      }
    }
  })
}
