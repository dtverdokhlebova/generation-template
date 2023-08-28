const style = "";
function uiInput() {
  const uiInputs = $(".ui-input input");
  uiInputs.on("focus", function() {
    $(this).parents(".ui-input").addClass("focus");
  });
  uiInputs.on("blur", function() {
    $(this).parents(".ui-input").removeClass("focus");
  });
  uiInputs.on("input", function() {
    if ($(this).val() === "") {
      $(this).parents(".ui-input").removeClass("filled");
    } else {
      $(this).parents(".ui-input").addClass("filled");
    }
  });
}
function uiSwitch() {
  for (const uiSwitchElement of document.querySelectorAll(".ui-switch")) {
    const button = uiSwitchElement.querySelector(".ui-switch-button");
    for (const input of uiSwitchElement.querySelectorAll("input")) {
      input.addEventListener("change", function() {
        const unchecked = uiSwitchElement.querySelector("input:not(:checked)");
        if (unchecked.dataset.switchTarget) {
          for (const element of document.querySelectorAll(`[data-switch-element=${unchecked.dataset.switchTarget}]`)) {
            element.style.display = "none";
          }
        }
        if (this.dataset.switchTarget) {
          for (const element of document.querySelectorAll(`[data-switch-element=${this.dataset.switchTarget}]`)) {
            element.style.display = "";
          }
        }
        if (uiSwitchElement.querySelector("input:first-child").checked === true) {
          button.classList.remove("ui-switch-button--active");
        } else {
          button.classList.add("ui-switch-button--active");
        }
      });
    }
  }
  window.uiSwitchButton = function(button) {
    const uiSwitchElement = button.closest(".ui-switch");
    const checked = uiSwitchElement.querySelector("input[checked]");
    const unchecked = uiSwitchElement.querySelector("input:not([checked])");
    checked.checked = false;
    checked.removeAttribute("checked");
    unchecked.checked = true;
    unchecked.setAttribute("checked", "checked");
    const changeEvent = new Event("change");
    unchecked.dispatchEvent(changeEvent);
  };
}
function loader() {
  stopScroll();
  window.addEventListener("load", function() {
    $(".loader").addClass("loader--close");
    const animationDuration = Number.parseFloat($(".loader").css("animation-duration"));
    setTimeout(() => {
      window.dispatchEvent(new Event("loader:close"));
    }, animationDuration * 1e3);
    refreshScroll();
  });
}
function accordion() {
  $(".accordions__ui-switch-button").on("click", function() {
    $(this).toggleClass("ui-switch-button--active");
    $(this).parents(".accordions__item").find(".accordions__body").slideToggle(() => ScrollTrigger.refresh(true));
  });
}
function approach() {
  new Swiper(".approach-slider .swiper", {
    effect: "creative",
    loop: true,
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400]
      },
      next: {
        translate: ["100%", 0, 0]
      }
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true
    }
  });
}
function banner() {
  contentAnim();
  videoAnim();
  imgParallax();
  cardsSlider();
  mockupsAnim();
}
function contentAnim() {
  if ($(".banner").length > 0) {
    gsap.set(".banner__content", {
      opacity: 0
    });
    window.addEventListener("loader:close", () => {
      gsap.to(".banner__content", {
        opacity: 1,
        duration: 1.2
      });
    });
  }
}
function videoAnim() {
  if ($(".banner__video").length > 0) {
    gsap.set(".banner__video, .banner__video-player", {
      opacity: 0,
      rotation: -3,
      x: 1,
      y: -1
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: ".banner",
        start: "top",
        end: "bottom",
        scrub: 0
      }
    }).to(".banner__video", { rotate: -4 });
    window.addEventListener("loader:close", () => {
      gsap.to(".banner__video", {
        rotation: 0,
        duration: 0.5,
        delay: 0.5
      });
      gsap.to(".banner__video-player", {
        rotation: 4,
        duration: 0.5,
        delay: 0.5
      });
      gsap.to(".banner__video-player, .banner__video", {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.5
      });
    });
  }
}
function imgParallax() {
  for (const img of $(".banner__pic img[data-parallax]")) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".banner",
        start: "top top",
        end: "bottom 20%",
        onUpdate: (self) => {
          gsap.to(img, { yPercent: (+img.dataset.parallax || 10) * self.progress, ease: "sine.out", duration: 1.2 });
        }
      }
    });
  }
}
function cardsSlider() {
  if ($(".banner__cards").length > 0) {
    const perSlideRotate = -20;
    const perSlideYOffset = 5;
    const perSlideXOffset = -12;
    const cardsNumber = $(".banner__card").length;
    $(".banner__card").each((index, item) => {
      gsap.set(item, {
        rotate: perSlideRotate * index,
        x: perSlideXOffset * index,
        y: perSlideYOffset * index,
        zIndex: cardsNumber - index
      });
      $(item).attr("data-index", index);
    });
    const progressValue = $(".banner__progress-val");
    const animStep = (isFirstTime) => {
      gsap.set(progressValue, {
        x: "0%"
      });
      gsap.to(progressValue, {
        x: "100%",
        ease: "none",
        duration: 5
      });
      if (!isFirstTime) {
        $(".banner__card").each((index, item) => {
          const currentIndex = +$(item).attr("data-index");
          if (currentIndex === 0) {
            $(item).attr("data-index", cardsNumber - 1);
          } else {
            $(item).attr("data-index", currentIndex - 1);
          }
        });
        $(".banner__card").each((index, item) => {
          const cardIndex = +$(item).attr("data-index");
          const tl = gsap.timeline();
          const isFrontSlide = cardIndex === cardsNumber - 1;
          if (isFrontSlide) {
            gsap.to(item, {
              opacity: 0,
              duration: 0.4
            });
          }
          tl.to(item, {
            rotate: perSlideRotate * cardIndex,
            x: perSlideXOffset * cardIndex,
            y: perSlideYOffset * cardIndex,
            zIndex: cardsNumber - cardIndex,
            duration: 1,
            delay: isFrontSlide ? 0 : cardIndex * 0.08
          }, 0);
          if (isFrontSlide) {
            tl.to(item, {
              opacity: 1,
              duration: 0.4
            }, ">-0.4");
          }
        });
      }
      gsap.delayedCall(5, animStep);
    };
    window.addEventListener("loader:close", () => {
      animStep(true);
    });
  }
}
function mockupsAnim() {
  if ($(".banner__mockups--anim").length > 0) {
    const [left, middle, right] = $(".banner__mockup");
    const leftHiddenImg = $(left).find("img").eq(1);
    const middleHiddenImg = $(middle).find("img").eq(1);
    const rightHiddenImg = $(right).find("img").eq(1);
    const images = [...leftHiddenImg, middleHiddenImg, rightHiddenImg];
    for (const [index, image] of images.entries()) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".banner",
          start: `${100 / 7 * index}% top`,
          onEnter: () => gsap.to(image, { zIndex: 2 }),
          onLeaveBack: () => gsap.to(image, { zIndex: 0 })
        }
      });
    }
  }
}
function contacts() {
  window.addEventListener("load", function() {
    contactsSlider();
    contactsMap();
  });
}
function contactsMap() {
  const mapBlock = document.querySelector("#contactsMapBlock");
  if (mapBlock) {
    let init2 = function() {
      myMap = new ymaps.Map("contactsMapBlock", {
        center: [coordsLat, coordsLng],
        zoom: mapzoom,
        controls: []
      }, {
        suppressMapOpenBlock: true
      });
      const placemark = new ymaps.Placemark([coordsLat, coordsLng], {}, {
        iconLayout: "default#image",
        iconImageHref: "images/map_placemark.png",
        iconImageSize: [54, 54],
        iconImageOffset: [-27, -54]
      });
      myMap.geoObjects.add(placemark);
      if (window.innerWidth < 1024) {
        myMap.behaviors.disable("scrollZoom");
        myMap.behaviors.disable("drag");
      }
    };
    var init = init2;
    let myMap;
    const coordsLat = Number.parseFloat(mapBlock.dataset.coordsLat);
    const coordsLng = Number.parseFloat(mapBlock.dataset.coordsLng);
    const mapzoom = mapBlock.dataset.zoom;
    ymaps.ready(init2);
    $(".contacts-slider__item").on("click", function() {
      const coordsLat2 = $(this).attr("data-coords-lat");
      const coordsLng2 = $(this).attr("data-coords-lng");
      myMap.setCenter([coordsLat2, coordsLng2], 15);
      myMap.geoObjects.removeAll();
      const placemarkNew = new ymaps.Placemark([coordsLat2, coordsLng2], {}, {
        iconLayout: "default#image",
        iconImageHref: "../../images/map_placemark.png",
        iconImageSize: [54, 54],
        iconImageOffset: [-27, -54]
      });
      myMap.geoObjects.add(placemarkNew);
      $(this).siblings(".contacts-slider__item").removeClass("contacts-slider__item--active");
      $(this).addClass("contacts-slider__item--active");
    });
  }
}
function contactsSlider() {
  new Swiper(".contacts-slider .swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      320: {
        slidesPerView: "auto",
        spaceBetween: 20
      }
    }
  });
}
function caseDesc() {
  if ($(".case-desc").length > 0) {
    $(".case-desc__max-h").each((index, item) => {
      let [currentHeight, fullHeight] = calcHeights(item);
      $(window).on("load, resize", () => {
        [currentHeight, fullHeight] = calcHeights(item);
      });
      const moreButton = $(item).parents(".case-desc__item").find(".case-desc__ui-switch-button");
      if (currentHeight === fullHeight) {
        moreButton.parents(".case-desc__more").remove();
      } else {
        $(item).addClass("case-desc__hiding");
        moreButton.on("click", () => {
          if ($(item).hasClass("case-desc__max-h")) {
            $(item).css("max-height", "none");
            $(item).css("height", `${currentHeight}px`);
            $(item).animate({ height: `${fullHeight}px` }, () => {
              $(item).css("height", "");
              $(item).css("max-height", "");
              $(item).toggleClass("case-desc__max-h");
              $(item).toggleClass("case-desc__hiding");
              ScrollTrigger.refresh(true);
            });
          } else {
            $(item).css("overflow", "hidden");
            $(item).toggleClass("case-desc__hiding");
            $(item).animate({ height: `${currentHeight}px` }, () => {
              $(item).css("height", "");
              $(item).css("overflow", "");
              $(item).toggleClass("case-desc__max-h");
              ScrollTrigger.refresh(true);
            });
          }
        });
      }
    });
  }
}
function calcHeights(item) {
  const currentHeight = $(item).outerHeight();
  const fullHeight = $(item).css("max-height", "none").outerHeight();
  $(item).css("max-height", "");
  return [currentHeight, fullHeight];
}
function casesItem() {
  if (window.innerWidth > 1358) {
    const items = document.querySelectorAll(".cases-item");
    for (const item of items) {
      const popover = item.querySelector(".cases-item__popover");
      hoverEvents(item, popover);
    }
  }
}
function goals() {
  $(".goals__button").on("click", function() {
    const itemName = ".goals__item";
    const classActive = "goals__item--active";
    $(this).parents(itemName).siblings().removeClass("goals__item--open");
    $(this).parents(itemName).siblings().removeClass(classActive);
    $(this).parents(itemName).addClass(classActive);
    if (window.innerWidth < 1024) {
      $(this).parents(itemName).siblings().find(".goals__body").slideUp();
      $(this).parents(itemName).find(".goals__body").slideDown();
    }
  });
}
function header() {
  burgerButton();
  burgerMenu();
}
function burgerButton() {
  const headerElement = $(".header");
  const burgerButton2 = $(".header__burger-button");
  const burger = $(".header__burger");
  const [topLine, midLine, botLine] = burgerButton2.find("span");
  const topLineTl = gsap.timeline({ paused: true });
  const midLineTl = gsap.timeline({ paused: true });
  const botLineTl = gsap.timeline({ paused: true });
  topLineTl.to(topLine, { y: 7, duration: 0.3 }).to(topLine, {
    rotate: 45,
    duration: 0.2,
    ease: "back.out(1.7)"
  }).reverse();
  midLineTl.to(midLine, { opacity: 0, duration: 0.3 }).reverse();
  botLineTl.to(botLine, { y: -7, duration: 0.3 }).to(botLine, {
    rotate: -45,
    duration: 0.2,
    ease: "back.out(1.7)"
  }).reverse();
  window.toggleBurger = () => {
    if (headerElement.hasClass("header--burger")) {
      refreshScroll();
      setTimeout(() => {
        burger.css("display", "");
      }, 400);
    } else {
      stopScroll();
      burger.css("display", "block");
    }
    setTimeout(() => {
      headerElement.toggleClass("header--burger");
    });
    topLineTl.reversed(!topLineTl.reversed());
    midLineTl.reversed(!midLineTl.reversed());
    botLineTl.reversed(!botLineTl.reversed());
  };
}
function burgerMenu() {
  window.openSubmenu = function(element) {
    if (window.innerWidth < 1359) {
      $(element).toggleClass("active");
      const submenu = $(element).parent().find(".header__submenu");
      $(element).hasClass("active") ? submenu.fadeIn(250) : submenu.fadeOut(250);
    }
  };
}
function createCheckbox(id, text, isChecked) {
  return $(`
    <div class="ui-checkbox">
      <input id="${id}" type="checkbox" ${isChecked ? "checked" : ""}>
      <label for="${id}">${text}
        <svg class="svg svg--icon_checkbox">
          <use xlink:href="/images/sprite.svg#icon_checkbox"></use>
        </svg>
      </label>
    </div>
  `)[0];
}
function lineChart() {
  const lineChartElement = $(".line-chart")[0];
  if (lineChartElement) {
    Chart.defaults.font.family = "'Inter', 'Arial', sans-serif";
    const data = $(lineChartElement).hasClass("test-data") ? {
      labels: ["Март", "Апрель", "Май", "Июнь", "Июль"],
      dataset: [
        {
          label: "Переход из поисковых систем",
          data: [0, 120, 300, 500, 750],
          color: "#4A62F1"
        },
        {
          label: "Прямые заходы",
          data: [220, 250, 260, 270, 280],
          color: "#ffffff",
          checkColor: "#101010"
        },
        {
          label: "Переходы по рекламе",
          data: [370, 390, 550, 380, 600],
          color: "#FCA217"
        }
      ]
    } : {};
    new LineChart(lineChartElement, data);
  }
}
class LineChart {
  constructor(holder, data) {
    this._holder = holder;
    this._holder.lineChart = this;
    this._canvas = this._holder.querySelector("canvas");
    this._isMobile = !window.matchMedia("(min-width: 768px)").matches;
    this._data = this._getData(data);
    this._rawData = data;
    this._htmlLegendPlugin = {
      afterUpdate: this._updHtmlLegend.bind(this)
    };
    this._chartInstance = new Chart(this._canvas, {
      type: "line",
      data: this._data,
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: 0
        },
        scales: {
          x: {
            border: {
              width: 0
            },
            ticks: {
              color: "#82848D",
              font: {
                size: this._isMobile ? 8 : 12
              },
              padding: this._isMobile ? 14 : 24
            },
            grid: {
              drawTicks: false,
              lineWidth: 1,
              color: "#2A2A2A"
            }
          },
          y: {
            beginAtZero: true,
            border: {
              width: 1,
              color: "#2A2A2A"
            },
            afterFit: (axis) => {
              axis.paddingRight = 0;
            },
            ticks: {
              count: 5,
              precision: 0,
              color: "#82848D",
              align: "inner",
              padding: this._isMobile ? 17 : 30,
              font: {
                size: this._isMobile ? 8 : 12
              }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      },
      plugins: [this._htmlLegendPlugin]
    });
  }
  _updHtmlLegend() {
    let legendElement = this._holder.querySelector(".line-chart__legend");
    if (legendElement) {
      legendElement.innerHTML = "";
    } else {
      legendElement = document.createElement("div");
      legendElement.className = "line-chart__legend";
      this._holder.append(legendElement);
    }
    if (this._rawData.dataset) {
      for (const item of this._rawData.dataset) {
        const checkbox = createCheckbox(`line-${item.color.slice(1)}`, item.label, !item.hidden);
        checkbox.style.setProperty("--bg-color", item.color);
        checkbox.style.setProperty("--check-color", item.checkColor || "#ffffff");
        legendElement.append(checkbox);
        const input = checkbox.querySelector("input");
        input.addEventListener("change", () => {
          const dataIndex = this._rawData.dataset.findIndex((item2) => item2.color === `#${input.id.replace("line-", "")}`);
          const newData = JSON.parse(JSON.stringify(this._rawData));
          newData.dataset[dataIndex].hidden = !input.checked;
          this.updateData(newData);
        });
      }
    }
  }
  _getData(data) {
    const _data = {
      labels: data.labels,
      datasets: []
    };
    if (data.dataset) {
      for (const dataItem of data.dataset) {
        _data.datasets.push({
          label: dataItem.label,
          data: dataItem.data,
          borderWidth: 2,
          borderColor: dataItem.color,
          cubicInterpolationMode: "monotone",
          pointRadius: 0,
          hidden: !!dataItem.hidden
        });
      }
    }
    return _data;
  }
  updateData(data) {
    this._rawData = data;
    this._data = this._getData(data);
    this._chartInstance.data.labels = this._data.labels;
    this._chartInstance.data.datasets = this._data.datasets;
    this._chartInstance.update();
  }
}
function mapSearch() {
  $(".map-search__col").each((index, item) => {
    loop($(item).find(".map-search__item"), {
      paused: false,
      repeat: -1,
      speed: 0.2,
      reversed: index !== 1,
      paddingTop: window.innerWidth < 1024 ? 7 : 10
    });
  });
}
function loop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: {
      ease: "none"
    },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
  });
  const length = items.length;
  const startY = items[0].offsetTop;
  const times = [];
  const heights = [];
  const yPercents = [];
  let currentIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1);
  let totalHeight;
  let currentY;
  let distanceToStart;
  let distanceToLoop;
  let item;
  let index;
  gsap.set(items, {
    // convert "x" to "yPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
    yPercent: (index2, element) => {
      const h = heights[index2] = Number.parseFloat(gsap.getProperty(element, "height", "px"));
      yPercents[index2] = snap(Number.parseFloat(gsap.getProperty(element, "y", "px")) / h * 100 + gsap.getProperty(element, "yPercent"));
      return yPercents[index2];
    }
  });
  gsap.set(items, {
    y: 0
  });
  totalHeight = items[length - 1].offsetTop + yPercents[length - 1] / 100 * heights[length - 1] - startY + items[length - 1].offsetHeight * gsap.getProperty(items[length - 1], "scaleY") + (Number.parseFloat(config.paddingTop) || 0);
  for (index = 0; index < length; index++) {
    item = items[index];
    currentY = yPercents[index] / 100 * heights[index];
    distanceToStart = item.offsetTop + currentY - startY;
    distanceToLoop = distanceToStart + heights[index] * gsap.getProperty(item, "scaleY");
    tl.to(item, {
      yPercent: snap((currentY - distanceToLoop) / heights[index] * 100),
      duration: distanceToLoop / pixelsPerSecond
    }, 0).fromTo(item, {
      yPercent: snap((currentY - distanceToLoop + totalHeight) / heights[index] * 100)
    }, {
      yPercent: yPercents[index],
      duration: (currentY - distanceToLoop + totalHeight - currentY) / pixelsPerSecond,
      immediateRender: false
    }, distanceToLoop / pixelsPerSecond).add("label" + index, distanceToStart / pixelsPerSecond);
    times[index] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index2, variables) {
    variables = variables || {};
    Math.abs(index2 - currentIndex) > length / 2 && (index2 += index2 > currentIndex ? -length : length);
    const newIndex = gsap.utils.wrap(0, length, index2);
    let time = times[newIndex];
    if (time > tl.time() !== index2 > currentIndex) {
      variables.modifiers = {
        time: gsap.utils.wrap(0, tl.duration())
      };
      time += tl.duration() * (index2 > currentIndex ? 1 : -1);
    }
    currentIndex = newIndex;
    variables.overwrite = true;
    return tl.tweenTo(time, variables);
  }
  tl.next = (variables) => toIndex(currentIndex + 1, variables);
  tl.previous = (variables) => toIndex(currentIndex - 1, variables);
  tl.current = () => currentIndex;
  tl.toIndex = (index2, variables) => toIndex(index2, variables);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}
function page404() {
  if (document.querySelector(".page-404")) {
    console.clear();
    const Utils = {
      colToInt(col) {
        return BOARD_COLS.indexOf(col);
      },
      rowToInt(row) {
        return BOARD_ROWS.indexOf(row);
      },
      intToCol(int) {
        return BOARD_COLS[int];
      },
      intToRow(int) {
        return BOARD_ROWS[int];
      },
      getPositionsFromShortCode(shortCode) {
        const positions = Utils.getInitialPiecePositions();
        const overrides = {};
        const defaultPositionMode = shortCode.charAt(0) === "X";
        if (defaultPositionMode) {
          shortCode = shortCode.slice(1);
        }
        for (let string of shortCode.split(",")) {
          const promoted = string.charAt(0) === "P";
          if (promoted) {
            string = string.slice(1);
          }
          if (defaultPositionMode) {
            const inactive = string.length === 3;
            const id = string.slice(0, 2);
            const col = inactive ? void 0 : string.charAt(2);
            const row = inactive ? void 0 : string.charAt(3);
            const moves = string.charAt(4) || "1";
            overrides[id] = {
              col,
              row,
              active: !inactive,
              _moves: Number.parseInt(moves),
              _promoted: promoted
            };
          } else {
            const moved = string.length >= 4;
            const id = string.slice(0, 2);
            const col = string.charAt(moved ? 2 : 0);
            const row = string.charAt(moved ? 3 : 1);
            const moves = string.charAt(4) || moved ? "1" : "0";
            overrides[id] = {
              col,
              row,
              active: true,
              _moves: Number.parseInt(moves),
              _promoted: promoted
            };
          }
        }
        for (const id in positions) {
          if (overrides[id]) {
            positions[id] = overrides[id];
          } else {
            positions[id] = defaultPositionMode ? positions[id] : { active: false };
          }
        }
        return positions;
      },
      getInitialBoardPieces(parent, pieces) {
        const boardPieces = {};
        const container = document.createElement("div");
        container.className = "pieces";
        parent.append(container);
        for (const pieceId in pieces) {
          const boardPiece = document.createElement("div");
          boardPiece.className = `piece ${pieces[pieceId].data.player.toLowerCase()}`;
          boardPiece.innerHTML = pieces[pieceId].shape();
          container.append(boardPiece);
          boardPieces[pieceId] = boardPiece;
        }
        return boardPieces;
      },
      getInitialBoardTiles(parent, handler) {
        const tiles = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {} };
        const board = document.createElement("div");
        board.className = "board";
        parent.append(board);
        for (let index = 0; index < 8; index++) {
          const row = document.createElement("div");
          row.className = "row";
          board.append(row);
          for (let index_ = 0; index_ < 8; index_++) {
            const tile = document.createElement("button");
            tile.className = "tile";
            const r = Utils.intToRow(index);
            const c = Utils.intToCol(index_);
            tile.addEventListener("click", () => handler({ row: r, col: c }));
            row.append(tile);
            tiles[r][c] = tile;
          }
        }
        return tiles;
      },
      getInitialBoardState(construct = () => {
      }) {
        const blankRow = () => ({
          A: construct(),
          B: construct(),
          C: construct(),
          D: construct(),
          E: construct(),
          F: construct(),
          G: construct(),
          H: construct()
        });
        return {
          1: { ...blankRow() },
          2: { ...blankRow() },
          3: { ...blankRow() },
          4: { ...blankRow() },
          5: { ...blankRow() },
          6: { ...blankRow() },
          7: { ...blankRow() },
          8: { ...blankRow() }
        };
      },
      getInitialPiecePositions() {
        return {
          A8: { active: true, row: "8", col: "A" },
          B8: { active: true, row: "8", col: "B" },
          C8: { active: true, row: "8", col: "C" },
          D8: { active: true, row: "8", col: "D" },
          E8: { active: true, row: "8", col: "E" },
          F8: { active: true, row: "8", col: "F" },
          G8: { active: true, row: "8", col: "G" },
          H8: { active: true, row: "8", col: "H" },
          A7: { active: true, row: "7", col: "A" },
          B7: { active: true, row: "7", col: "B" },
          C7: { active: true, row: "7", col: "C" },
          D7: { active: true, row: "7", col: "D" },
          E7: { active: true, row: "7", col: "E" },
          F7: { active: true, row: "7", col: "F" },
          G7: { active: true, row: "7", col: "G" },
          H7: { active: true, row: "7", col: "H" },
          A2: { active: true, row: "2", col: "A" },
          B2: { active: true, row: "2", col: "B" },
          C2: { active: true, row: "2", col: "C" },
          D2: { active: true, row: "2", col: "D" },
          E2: { active: true, row: "2", col: "E" },
          F2: { active: true, row: "2", col: "F" },
          G2: { active: true, row: "2", col: "G" },
          H2: { active: true, row: "2", col: "H" },
          A1: { active: true, row: "1", col: "A" },
          B1: { active: true, row: "1", col: "B" },
          C1: { active: true, row: "1", col: "C" },
          D1: { active: true, row: "1", col: "D" },
          E1: { active: true, row: "1", col: "E" },
          F1: { active: true, row: "1", col: "F" },
          G1: { active: true, row: "1", col: "G" },
          H1: { active: true, row: "1", col: "H" }
        };
      },
      getInitialPieces() {
        return {
          A8: new Piece({ id: "A8", player: "BLACK", type: "ROOK" }),
          B8: new Piece({ id: "B8", player: "BLACK", type: "KNIGHT" }),
          C8: new Piece({ id: "C8", player: "BLACK", type: "BISHOP" }),
          D8: new Piece({ id: "D8", player: "BLACK", type: "QUEEN" }),
          E8: new Piece({ id: "E8", player: "BLACK", type: "KING" }),
          F8: new Piece({ id: "F8", player: "BLACK", type: "BISHOP" }),
          G8: new Piece({ id: "G8", player: "BLACK", type: "KNIGHT" }),
          H8: new Piece({ id: "H8", player: "BLACK", type: "ROOK" }),
          A7: new Piece({ id: "A7", player: "BLACK", type: "PAWN" }),
          B7: new Piece({ id: "B7", player: "BLACK", type: "PAWN" }),
          C7: new Piece({ id: "C7", player: "BLACK", type: "PAWN" }),
          D7: new Piece({ id: "D7", player: "BLACK", type: "PAWN" }),
          E7: new Piece({ id: "E7", player: "BLACK", type: "PAWN" }),
          F7: new Piece({ id: "F7", player: "BLACK", type: "PAWN" }),
          G7: new Piece({ id: "G7", player: "BLACK", type: "PAWN" }),
          H7: new Piece({ id: "H7", player: "BLACK", type: "PAWN" }),
          A2: new Piece({ id: "A2", player: "WHITE", type: "PAWN" }),
          B2: new Piece({ id: "B2", player: "WHITE", type: "PAWN" }),
          C2: new Piece({ id: "C2", player: "WHITE", type: "PAWN" }),
          D2: new Piece({ id: "D2", player: "WHITE", type: "PAWN" }),
          E2: new Piece({ id: "E2", player: "WHITE", type: "PAWN" }),
          F2: new Piece({ id: "F2", player: "WHITE", type: "PAWN" }),
          G2: new Piece({ id: "G2", player: "WHITE", type: "PAWN" }),
          H2: new Piece({ id: "H2", player: "WHITE", type: "PAWN" }),
          A1: new Piece({ id: "A1", player: "WHITE", type: "ROOK" }),
          B1: new Piece({ id: "B1", player: "WHITE", type: "KNIGHT" }),
          C1: new Piece({ id: "C1", player: "WHITE", type: "BISHOP" }),
          D1: new Piece({ id: "D1", player: "WHITE", type: "QUEEN" }),
          E1: new Piece({ id: "E1", player: "WHITE", type: "KING" }),
          F1: new Piece({ id: "F1", player: "WHITE", type: "BISHOP" }),
          G1: new Piece({ id: "G1", player: "WHITE", type: "KNIGHT" }),
          H1: new Piece({ id: "H1", player: "WHITE", type: "ROOK" })
        };
      }
    };
    const Shape = {
      shape(player, piece) {
        return `<svg class="${player}" width="170" height="170" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href="#${piece}" />
        </svg>`;
      },
      shapeBishop(player) {
        return Shape.shape(player, "bishop");
      },
      shapeKing(player) {
        return Shape.shape(player, "king");
      },
      shapeKnight(player) {
        return Shape.shape(player, "knight");
      },
      shapePawn(player) {
        return Shape.shape(player, "pawn");
      },
      shapeQueen(player) {
        return Shape.shape(player, "queen");
      },
      shapeRook(player) {
        return Shape.shape(player, "rook");
      }
    };
    const Constraints = {
      generate(arguments_, resultingChecks) {
        let method;
        const { piecePositions, piece } = arguments_;
        if (piecePositions[piece.data.id].active) {
          switch (piece.data.type) {
            case "BISHOP": {
              method = Constraints.constraintsBishop;
              break;
            }
            case "KING": {
              method = Constraints.constraintsKing;
              break;
            }
            case "KNIGHT": {
              method = Constraints.constraintsKnight;
              break;
            }
            case "PAWN": {
              method = Constraints.constraintsPawn;
              break;
            }
            case "QUEEN": {
              method = Constraints.constraintsQueen;
              break;
            }
            case "ROOK": {
              method = Constraints.constraintsRook;
              break;
            }
          }
        }
        const result = method ? method(arguments_) : { moves: [], captures: [] };
        if (resultingChecks) {
          const moveIndex = arguments_.moveIndex + 1;
          result.moves = result.moves.filter(
            (location) => resultingChecks({ piece, location, capture: false, moveIndex }).length === 0
          );
          result.captures = result.captures.filter(
            (location) => resultingChecks({ piece, location, capture: true, moveIndex }).length === 0
          );
        }
        return result;
      },
      constraintsBishop(arguments_) {
        return Constraints.constraintsDiagonal(arguments_);
      },
      constraintsDiagonal(arguments_) {
        const response = { moves: [], captures: [] };
        const { piece } = arguments_;
        Constraints.runUntil(piece.dirNW.bind(piece), response, arguments_);
        Constraints.runUntil(piece.dirNE.bind(piece), response, arguments_);
        Constraints.runUntil(piece.dirSW.bind(piece), response, arguments_);
        Constraints.runUntil(piece.dirSE.bind(piece), response, arguments_);
        return response;
      },
      constraintsKing(arguments_) {
        const { piece, kingCastles, piecePositions } = arguments_;
        const moves = [];
        const captures = [];
        const locations = [
          piece.dirN(1, piecePositions),
          piece.dirNE(1, piecePositions),
          piece.dirE(1, piecePositions),
          piece.dirSE(1, piecePositions),
          piece.dirS(1, piecePositions),
          piece.dirSW(1, piecePositions),
          piece.dirW(1, piecePositions),
          piece.dirNW(1, piecePositions)
        ];
        if (kingCastles) {
          const castles = kingCastles(piece);
          for (const position of castles)
            moves.push(position);
        }
        for (const location of locations) {
          const value = Constraints.relationshipToTile(location, arguments_);
          if (value === "BLANK") {
            moves.push(location);
          } else if (value === "ENEMY") {
            captures.push(location);
          }
        }
        return { moves, captures };
      },
      constraintsKnight(arguments_) {
        const { piece, piecePositions } = arguments_;
        const moves = [];
        const captures = [];
        const locations = [
          piece.dir(1, 2, piecePositions),
          piece.dir(1, -2, piecePositions),
          piece.dir(2, 1, piecePositions),
          piece.dir(2, -1, piecePositions),
          piece.dir(-1, 2, piecePositions),
          piece.dir(-1, -2, piecePositions),
          piece.dir(-2, 1, piecePositions),
          piece.dir(-2, -1, piecePositions)
        ];
        for (const location of locations) {
          const value = Constraints.relationshipToTile(location, arguments_);
          if (value === "BLANK") {
            moves.push(location);
          } else if (value === "ENEMY") {
            captures.push(location);
          }
        }
        return { moves, captures };
      },
      constraintsOrthangonal(arguments_) {
        const { piece } = arguments_;
        const response = { moves: [], captures: [] };
        Constraints.runUntil(piece.dirN.bind(piece), response, arguments_);
        Constraints.runUntil(piece.dirE.bind(piece), response, arguments_);
        Constraints.runUntil(piece.dirS.bind(piece), response, arguments_);
        Constraints.runUntil(piece.dirW.bind(piece), response, arguments_);
        return response;
      },
      constraintsPawn(arguments_) {
        const { piece, piecePositions } = arguments_;
        const moves = [];
        const captures = [];
        const locationN1 = piece.dirN(1, piecePositions);
        const locationN2 = piece.dirN(2, piecePositions);
        if (Constraints.relationshipToTile(locationN1, arguments_) === "BLANK") {
          moves.push(locationN1);
          if (piece.moves.length === 0 && Constraints.relationshipToTile(locationN2, arguments_) === "BLANK") {
            moves.push(locationN2);
          }
        }
        for (const [location, enPassant] of [
          [piece.dirNW(1, piecePositions), piece.dirW(1, piecePositions)],
          [piece.dirNE(1, piecePositions), piece.dirE(1, piecePositions)]
        ]) {
          const standardCaptureRelationship = Constraints.relationshipToTile(
            location,
            arguments_
          );
          const enPassantCaptureRelationship = Constraints.relationshipToTile(
            enPassant,
            arguments_
          );
          if (standardCaptureRelationship === "ENEMY") {
            captures.push(location);
          } else if (piece.moves.length > 0 && enPassantCaptureRelationship === "ENEMY") {
            const enPassantRow = enPassant.row === (piece.playerWhite() ? "5" : "4");
            const other = Constraints.locationToPiece(enPassant, arguments_);
            if (enPassantRow && other && other.data.type === "PAWN" && other.moves.length === 1 && other.moves[0] === arguments_.moveIndex - 1) {
              location.capture = { ...enPassant };
              captures.push(location);
            }
          }
        }
        return { moves, captures };
      },
      constraintsQueen(arguments_) {
        const diagonal = Constraints.constraintsDiagonal(arguments_);
        const orthagonal = Constraints.constraintsOrthangonal(arguments_);
        return {
          moves: diagonal.moves.concat(orthagonal.moves),
          captures: diagonal.captures.concat(orthagonal.captures)
        };
      },
      constraintsRook(arguments_) {
        return Constraints.constraintsOrthangonal(arguments_);
      },
      locationToPiece(location, arguments_) {
        if (!location) {
          return;
        }
        const { state, pieces } = arguments_;
        const row = state[location.row];
        const occupyingId = row === void 0 ? void 0 : row[location.col];
        return pieces[occupyingId];
      },
      relationshipToTile(location, arguments_) {
        if (!location) {
          return;
        }
        const { piece } = arguments_;
        const occupying = Constraints.locationToPiece(location, arguments_);
        if (occupying) {
          return occupying.data.player === piece.data.player ? "FRIEND" : "ENEMY";
        } else {
          return "BLANK";
        }
      },
      runUntil(locationFunction, response, arguments_) {
        const { piecePositions } = arguments_;
        let inc = 1;
        let location = locationFunction(inc++, piecePositions);
        while (location) {
          let abort = false;
          const relations = Constraints.relationshipToTile(location, arguments_);
          if (relations === "ENEMY") {
            response.captures.push(location);
            abort = true;
          } else if (relations === "FRIEND") {
            abort = true;
          } else {
            response.moves.push(location);
          }
          location = abort ? void 0 : locationFunction(inc++, piecePositions);
        }
      }
    };
    class Piece {
      constructor(data) {
        this.data = data;
        this.moves = [];
        this.promoted = false;
        this.updateShape = false;
      }
      get orientation() {
        return this.data.player === "BLACK" ? -1 : 1;
      }
      dirN(steps, positions) {
        return this.dir(steps, 0, positions);
      }
      dirS(steps, positions) {
        return this.dir(-steps, 0, positions);
      }
      dirW(steps, positions) {
        return this.dir(0, -steps, positions);
      }
      dirE(steps, positions) {
        return this.dir(0, steps, positions);
      }
      dirNW(steps, positions) {
        return this.dir(steps, -steps, positions);
      }
      dirNE(steps, positions) {
        return this.dir(steps, steps, positions);
      }
      dirSW(steps, positions) {
        return this.dir(-steps, -steps, positions);
      }
      dirSE(steps, positions) {
        return this.dir(-steps, steps, positions);
      }
      dir(stepsRow, stepsColumn, positions) {
        const row = Utils.rowToInt(positions[this.data.id].row) + this.orientation * stepsRow;
        const col = Utils.colToInt(positions[this.data.id].col) + this.orientation * stepsColumn;
        if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
          return { row: Utils.intToRow(row), col: Utils.intToCol(col) };
        }
      }
      move(moveIndex) {
        this.moves.push(moveIndex);
      }
      options(moveIndex, state, pieces, piecePositions, resultingChecks, kingCastles) {
        return Constraints.generate(
          { moveIndex, state, piece: this, pieces, piecePositions, kingCastles },
          resultingChecks
        );
      }
      playerBlack() {
        return this.data.player === "BLACK";
      }
      playerWhite() {
        return this.data.player === "WHITE";
      }
      promote(type = "QUEEN") {
        this.data.type = type;
        this.promoted = true;
        this.updateShape = true;
      }
      shape() {
        const player = this.data.player.toLowerCase();
        switch (this.data.type) {
          case "BISHOP": {
            return Shape.shapeBishop(player);
          }
          case "KING": {
            return Shape.shapeKing(player);
          }
          case "KNIGHT": {
            return Shape.shapeKnight(player);
          }
          case "PAWN": {
            return Shape.shapePawn(player);
          }
          case "QUEEN": {
            return Shape.shapeQueen(player);
          }
          case "ROOK": {
            return Shape.shapeRook(player);
          }
        }
      }
    }
    const BOARD_COLS = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const BOARD_ROWS = ["1", "2", "3", "4", "5", "6", "7", "8"];
    class Board {
      constructor(pieces, piecePositions) {
        this.checksBlack = [];
        this.checksWhite = [];
        this.piecesTilesCaptures = {};
        this.piecesTilesMoves = {};
        this.tilesPiecesBlackCaptures = Utils.getInitialBoardState(() => []);
        this.tilesPiecesBlackMoves = Utils.getInitialBoardState(() => []);
        this.tilesPiecesWhiteCaptures = Utils.getInitialBoardState(() => []);
        this.tilesPiecesWhiteMoves = Utils.getInitialBoardState(() => []);
        this.pieceIdsBlack = [];
        this.pieceIdsWhite = [];
        this.state = Utils.getInitialBoardState();
        this.pieces = pieces;
        for (const id in pieces) {
          if (pieces[id].playerWhite()) {
            this.pieceIdsWhite.push(id);
          } else {
            this.pieceIdsBlack.push(id);
          }
        }
        this.initializePositions(piecePositions);
      }
      initializePositions(piecePositions) {
        this.piecePositions = piecePositions;
        this.initializeState();
        this.piecesUpdate(0);
      }
      initializeState() {
        for (const pieceId in this.pieces) {
          const { row, col, active, _moves, _promoted } = this.piecePositions[pieceId];
          if (_moves) {
            delete this.piecePositions[pieceId]._moves;
          }
          if (_promoted) {
            delete this.piecePositions[pieceId]._promoted;
            this.pieces[pieceId].promote();
          }
          if (active) {
            this.state[row] = this.state[row] || [];
            this.state[row][col] = pieceId;
          }
        }
      }
      kingCastles(king) {
        const castles = [];
        if (king.moves.length > 0) {
          return castles;
        }
        const kingIsWhite = king.playerWhite();
        const moves = kingIsWhite ? this.tilesPiecesBlackMoves : this.tilesPiecesWhiteMoves;
        const checkPositions = (row2, rookCol, castles2) => {
          const cols = rookCol === "A" ? ["D", "C", "B"] : ["F", "G"];
          const rookId = `${rookCol}${row2}`;
          const rook = this.pieces[rookId];
          const { active } = this.piecePositions[rookId];
          if (active && rook.moves.length === 0) {
            let canCastle = true;
            for (const col of cols) {
              if (this.state[row2][col]) {
                canCastle = false;
              } else if (moves[row2][col].length > 0) {
                canCastle = false;
              }
            }
            if (canCastle) {
              castles2.push({ col: cols[1], row: row2, castles: rookCol });
            }
          }
        };
        const row = kingIsWhite ? "1" : "8";
        if (this.pieces[`A${row}`].moves.length === 0) {
          checkPositions(row, "A", castles);
        }
        if (this.pieces[`H${row}`].moves.length === 0) {
          checkPositions(row, "H", castles);
        }
        return castles;
      }
      kingCheckStates(kingPosition, captures, piecePositions) {
        const { col, row } = kingPosition;
        return captures[row][col].map((id) => piecePositions[id]).filter((pos) => pos.active);
      }
      pieceCalculateMoves(pieceId, moveIndex, state, piecePositions, piecesTilesCaptures, piecesTilesMoves, tilesPiecesCaptures, tilesPiecesMoves, resultingChecks, kingCastles) {
        const { captures, moves } = this.pieces[pieceId].options(
          moveIndex,
          state,
          this.pieces,
          piecePositions,
          resultingChecks,
          kingCastles
        );
        piecesTilesCaptures[pieceId] = [...captures];
        piecesTilesMoves[pieceId] = [...moves];
        for (const { col, row } of captures)
          tilesPiecesCaptures[row][col].push(pieceId);
        for (const { col, row } of moves)
          tilesPiecesMoves[row][col].push(pieceId);
      }
      pieceCapture(piece) {
        const pieceId = piece.data.id;
        const { col, row } = this.piecePositions[pieceId];
        this.state[row][col] = void 0;
        delete this.piecePositions[pieceId].col;
        delete this.piecePositions[pieceId].row;
        this.piecePositions[pieceId].active = false;
      }
      pieceMove(piece, location) {
        const pieceId = piece.data.id;
        const { row, col } = this.piecePositions[pieceId];
        this.state[row][col] = void 0;
        this.state[location.row][location.col] = pieceId;
        this.piecePositions[pieceId].row = location.row;
        this.piecePositions[pieceId].col = location.col;
        if (piece.data.type === "PAWN" && (location.row === "8" || location.row === "1")) {
          piece.promote();
        }
      }
      piecesUpdate(moveIndex) {
        this.tilesPiecesBlackCaptures = Utils.getInitialBoardState(() => []);
        this.tilesPiecesBlackMoves = Utils.getInitialBoardState(() => []);
        this.tilesPiecesWhiteCaptures = Utils.getInitialBoardState(() => []);
        this.tilesPiecesWhiteMoves = Utils.getInitialBoardState(() => []);
        for (const id of this.pieceIdsBlack) {
          this.pieceCalculateMoves(
            id,
            moveIndex,
            this.state,
            this.piecePositions,
            this.piecesTilesCaptures,
            this.piecesTilesMoves,
            this.tilesPiecesBlackCaptures,
            this.tilesPiecesBlackMoves,
            this.resultingChecks.bind(this),
            this.kingCastles.bind(this)
          );
        }
        for (const id of this.pieceIdsWhite) {
          this.pieceCalculateMoves(
            id,
            moveIndex,
            this.state,
            this.piecePositions,
            this.piecesTilesCaptures,
            this.piecesTilesMoves,
            this.tilesPiecesWhiteCaptures,
            this.tilesPiecesWhiteMoves,
            this.resultingChecks.bind(this),
            this.kingCastles.bind(this)
          );
        }
        this.checksBlack = this.kingCheckStates(
          this.piecePositions.E1,
          this.tilesPiecesBlackCaptures,
          this.piecePositions
        );
        this.checksWhite = this.kingCheckStates(
          this.piecePositions.E8,
          this.tilesPiecesWhiteCaptures,
          this.piecePositions
        );
      }
      resultingChecks({ piece, location, capture, moveIndex }) {
        const tilesPiecesCaptures = Utils.getInitialBoardState(() => []);
        const tilesPiecesMoves = Utils.getInitialBoardState(() => []);
        const piecesTilesCaptures = {};
        const piecesTilesMoves = {};
        const state = JSON.parse(JSON.stringify(this.state));
        const piecePositions = JSON.parse(JSON.stringify(this.piecePositions));
        if (capture) {
          const loc = location.capture || location;
          const capturedId = state[loc.row][loc.col];
          if (this.pieces[capturedId].data.type === "KING")
            ;
          else {
            delete piecePositions[capturedId].col;
            delete piecePositions[capturedId].row;
            piecePositions[capturedId].active = false;
          }
        }
        const pieceId = piece.data.id;
        const { row, col } = piecePositions[pieceId];
        state[row][col] = void 0;
        state[location.row][location.col] = pieceId;
        piecePositions[pieceId].row = location.row;
        piecePositions[pieceId].col = location.col;
        const ids = piece.playerWhite() ? this.pieceIdsBlack : this.pieceIdsWhite;
        const king = piece.playerWhite() ? piecePositions.E1 : piecePositions.E8;
        for (const id of ids) {
          this.pieceCalculateMoves(
            id,
            moveIndex,
            state,
            piecePositions,
            piecesTilesCaptures,
            piecesTilesMoves,
            tilesPiecesCaptures,
            tilesPiecesMoves
          );
        }
        return this.kingCheckStates(king, tilesPiecesCaptures, piecePositions);
      }
      tileEach(callback) {
        for (const row of BOARD_ROWS) {
          for (const col of BOARD_COLS) {
            const piece = this.tileFind({ row, col });
            const moves = piece ? this.piecesTilesMoves[piece.data.id] : void 0;
            const captures = piece ? this.piecesTilesCaptures[piece.data.id] : void 0;
            callback({ row, col }, piece, moves, captures);
          }
        }
      }
      tileFind({ row, col }) {
        const id = this.state[row][col];
        return this.pieces[id];
      }
      toShortCode() {
        const positionsAbsolute = [];
        const positionsDefaults = [];
        for (const id in this.piecePositions) {
          const { active, col, row } = this.piecePositions[id];
          const pos = `${col}${row}`;
          const moves = this.pieces[id].moves;
          const promotedCode = this.pieces[id].promoted ? "P" : "";
          const movesCode = moves > 9 ? "9" : moves > 1 ? moves.toString() : "";
          if (active) {
            positionsAbsolute.push(
              `${promotedCode}${id}${id === pos ? "" : pos}${movesCode}`
            );
            if (id !== pos || moves > 0) {
              positionsDefaults.push(`${promotedCode}${id}${pos}${movesCode}`);
            }
          } else {
            if (id !== "BQ" && id !== "WQ") {
              positionsDefaults.push(`${promotedCode}${id}X`);
            }
          }
        }
        const pA = positionsAbsolute.join(",");
        const pD = positionsDefaults.join(",");
        return pA.length > pD.length ? `X${pD}` : pA;
      }
    }
    class Game {
      constructor(pieces, piecePositions, turn = "WHITE") {
        this.active = null;
        this.activePieceOptions = [];
        this.moveIndex = 0;
        this.moves = [];
        this.turn = turn;
        this.board = new Board(pieces, piecePositions);
      }
      activate(location) {
        const tilePiece = this.board.tileFind(location);
        if (tilePiece && !this.active && tilePiece.data.player !== this.turn) {
          this.active = null;
          return { type: "INVALID" };
        } else if (this.active) {
          const activePieceId = this.active.data.id;
          this.active = null;
          const validatedPosition = this.activePieceOptions.find(
            (option) => option.col === location.col && option.row === location.row
          );
          const positionIsValid = !!validatedPosition;
          this.activePieceOptions = [];
          const capturePiece = (validatedPosition == null ? void 0 : validatedPosition.capture) ? this.board.tileFind(validatedPosition.capture) : tilePiece;
          if (capturePiece) {
            const capturedPieceId = capturePiece.data.id;
            if (capturedPieceId === activePieceId) {
              return { type: "CANCEL" };
            } else if (positionIsValid) {
              this.capture(activePieceId, capturedPieceId, location);
              return {
                type: "CAPTURE",
                activePieceId,
                capturedPieceId,
                captures: [location]
              };
            } else if (capturePiece.data.player === this.turn)
              ;
            else {
              return { type: "CANCEL" };
            }
          } else if (positionIsValid) {
            const castledId = this.move(activePieceId, location);
            return { type: "MOVE", activePieceId, moves: [location], castledId };
          } else {
            return { type: "CANCEL" };
          }
        }
        if (tilePiece) {
          const tilePieceId = tilePiece.data.id;
          const moves = this.board.piecesTilesMoves[tilePieceId];
          const captures = this.board.piecesTilesCaptures[tilePieceId];
          if (moves.length === 0 && captures.length === 0) {
            return { type: "INVALID" };
          }
          this.active = tilePiece;
          this.activePieceOptions = moves.concat(captures);
          return { type: "TOUCH", captures, moves, activePieceId: tilePieceId };
        } else {
          this.activePieceOptions = [];
          return { type: "CANCEL" };
        }
      }
      capture(capturingPieceId, capturedPieceId, location) {
        const captured = this.board.pieces[capturedPieceId];
        this.board.pieceCapture(captured);
        this.move(capturingPieceId, location, true);
      }
      handleCastling(piece, location) {
        if (piece.data.type !== "KING" || piece.moves.length > 0 || location.row !== (piece.playerWhite() ? "1" : "8") || location.col !== "C" && location.col !== "G") {
          return;
        }
        return `${location.col === "C" ? "A" : "H"}${location.row}`;
      }
      move(pieceId, location, capture = false) {
        const piece = this.board.pieces[pieceId];
        const castledId = this.handleCastling(piece, location);
        piece.move(this.moveIndex);
        if (castledId) {
          const castled = this.board.pieces[castledId];
          castled.move(this.moveIndex);
          this.board.pieceMove(castled, {
            col: location.col === "C" ? "D" : "F",
            row: location.row
          });
          this.moves.push(`${pieceId}O${location.col}${location.row}`);
        } else {
          this.moves.push(
            `${pieceId}${capture ? "x" : ""}${location.col}${location.row}`
          );
        }
        this.moveIndex++;
        this.board.pieceMove(piece, location);
        this.turn = this.turn === "WHITE" ? "BLACK" : "WHITE";
        this.board.piecesUpdate(this.moveIndex);
        const state = this.moveResultState();
        console.log(state);
        if (!state.moves && !state.captures) {
          alert(
            state.stalemate ? "Stalemate!" : `${this.turn === "WHITE" ? "Black" : "White"} Wins!`
          );
        }
        return castledId;
      }
      moveResultState() {
        let movesWhite = 0;
        let capturesWhite = 0;
        let movesBlack = 0;
        let capturesBlack = 0;
        this.board.tileEach(({ row, col }) => {
          movesWhite += this.board.tilesPiecesWhiteMoves[row][col].length;
          capturesWhite += this.board.tilesPiecesWhiteCaptures[row][col].length;
          movesBlack += this.board.tilesPiecesBlackMoves[row][col].length;
          capturesBlack += this.board.tilesPiecesBlackCaptures[row][col].length;
        });
        const activeBlack = this.board.pieceIdsBlack.filter(
          (pieceId) => this.board.piecePositions[pieceId].active
        ).length;
        const activeWhite = this.board.pieceIdsWhite.filter(
          (pieceId) => this.board.piecePositions[pieceId].active
        ).length;
        const moves = this.turn === "WHITE" ? movesWhite : movesBlack;
        const captures = this.turn === "WHITE" ? capturesWhite : capturesBlack;
        const noMoves = movesWhite + capturesWhite + movesBlack + capturesBlack === 0;
        const checked = this.board[this.turn === "WHITE" ? "checksBlack" : "checksWhite"].length > 0;
        const onlyKings = activeBlack === 1 && activeWhite === 1;
        const stalemate = onlyKings || noMoves || moves + captures === 0 && !checked;
        const code = this.board.toShortCode();
        return { turn: this.turn, checked, moves, captures, code, stalemate };
      }
      randomMove() {
        if (this.active) {
          if (this.activePieceOptions.length > 0) {
            const { col, row } = this.activePieceOptions[Math.floor(Math.random() * this.activePieceOptions.length)];
            return { col, row };
          } else {
            const { col, row } = this.board.piecePositions[this.active.data.id];
            return { col, row };
          }
        } else {
          const ids = this.turn === "WHITE" ? this.board.pieceIdsWhite : this.board.pieceIdsBlack;
          const positions = ids.map((pieceId) => {
            const moves = this.board.piecesTilesMoves[pieceId];
            const captures = this.board.piecesTilesCaptures[pieceId];
            return moves.length > 0 || captures.length > 0 ? this.board.piecePositions[pieceId] : void 0;
          }).filter((position) => position == null ? void 0 : position.active);
          const remaining = positions[Math.floor(Math.random() * positions.length)];
          const { col, row } = remaining || { col: "E", row: "1" };
          return { col, row };
        }
      }
    }
    class View {
      constructor(element, game2, perspective2) {
        this.element = element;
        this.game = game2;
        this.setPerspective(perspective2 || this.game.turn);
        this.tiles = Utils.getInitialBoardTiles(
          this.element,
          this.handleTileClick.bind(this)
        );
        this.pieces = Utils.getInitialBoardPieces(
          this.element,
          this.game.board.pieces
        );
        this.drawPiecePositions();
      }
      drawActivePiece(activePieceId) {
        const { row, col } = this.game.board.piecePositions[activePieceId];
        this.tiles[row][col].classList.add("highlight-active");
        this.pieces[activePieceId].classList.add("highlight-active");
      }
      drawCapturedPiece(capturedPieceId) {
        const piece = this.pieces[capturedPieceId];
        piece.style.setProperty("--transition-delay", "var(--transition-duration)");
        piece.style.removeProperty("--pos-col");
        piece.style.removeProperty("--pos-row");
        piece.style.setProperty("--scale", "0");
      }
      drawPiecePositions(moves = [], moveInner = "") {
        document.body.style.setProperty(
          "--color-background",
          `var(--color-${this.game.turn.toLowerCase()}`
        );
        const other = this.game.turn === "WHITE" ? "turn-black" : "turn-white";
        const current = this.game.turn === "WHITE" ? "turn-white" : "turn-black";
        this.element.classList.add(current);
        this.element.classList.remove(other);
        if (moves.length > 0) {
          this.element.classList.add("touching");
        } else {
          this.element.classList.remove("touching");
        }
        const key = (row, col) => `${row}-${col}`;
        const moveKeys = new Set(moves.map(({ row, col }) => key(row, col)));
        this.game.board.tileEach(
          ({ row, col }, piece, pieceMoves, pieceCaptures) => {
            const tileElement = this.tiles[row][col];
            const move = moveKeys.has(key(row, col)) ? moveInner : "";
            const format = (id, className) => this.game.board.pieces[id].shape();
            tileElement.innerHTML = `
            <div class="move">${move}</div>
            <div class="moves">
              ${this.game.board.tilesPiecesBlackMoves[row][col].map((id) => format(id)).join("")}
              ${this.game.board.tilesPiecesWhiteMoves[row][col].map((id) => format(id)).join("")}
            </div>
            <div class="captures">
              ${this.game.board.tilesPiecesBlackCaptures[row][col].map((id) => format(id)).join("")}
              ${this.game.board.tilesPiecesWhiteCaptures[row][col].map((id) => format(id)).join("")}
            </div>
          `;
            if (piece) {
              tileElement.classList.add("occupied");
              const pieceElement = this.pieces[piece.data.id];
              pieceElement.style.setProperty(
                "--pos-col",
                Utils.colToInt(col).toString()
              );
              pieceElement.style.setProperty(
                "--pos-row",
                Utils.rowToInt(row).toString()
              );
              pieceElement.style.setProperty("--scale", "1");
              pieceElement.classList[(pieceMoves == null ? void 0 : pieceMoves.length) ? "add" : "remove"](
                "can-move"
              );
              pieceElement.classList[(pieceCaptures == null ? void 0 : pieceCaptures.length) ? "add" : "remove"](
                "can-capture"
              );
              if (piece.updateShape) {
                piece.updateShape = false;
                pieceElement.innerHTML = piece.shape();
              }
            } else {
              tileElement.classList.remove("occupied");
            }
          }
        );
      }
      drawPositions(moves, captures) {
        var _a, _b, _c, _d;
        if (moves) {
          for (const { row, col } of moves) {
            this.tiles[row][col].classList.add("highlight-move");
            (_b = this.pieces[(_a = this.game.board.tileFind({ row, col })) == null ? void 0 : _a.data.id]) == null ? void 0 : _b.classList.add("highlight-move");
          }
        }
        if (captures) {
          for (let { row, col, capture } of captures) {
            if (capture) {
              row = capture.row;
              col = capture.col;
            }
            this.tiles[row][col].classList.add("highlight-capture");
            (_d = this.pieces[(_c = this.game.board.tileFind({ row, col })) == null ? void 0 : _c.data.id]) == null ? void 0 : _d.classList.add("highlight-capture");
          }
        }
      }
      drawResetClassNames() {
        for (const element of document.querySelectorAll(".highlight-active"))
          element.classList.remove("highlight-active");
        for (const element of document.querySelectorAll(".highlight-capture"))
          element.classList.remove("highlight-capture");
        for (const element of document.querySelectorAll(".highlight-move"))
          element.classList.remove("highlight-move");
      }
      handleTileClick(location) {
        const {
          activePieceId,
          capturedPieceId,
          moves = [],
          captures = [],
          type
        } = this.game.activate(location);
        this.drawResetClassNames();
        if (type === "TOUCH") {
          const enPassant = captures.find((capture) => !!capture.capture);
          const passingMoves = enPassant ? [...moves, enPassant] : moves;
          this.drawPiecePositions(
            passingMoves,
            this.game.board.pieces[activePieceId].shape()
          );
        } else {
          this.drawPiecePositions();
        }
        if (type === "CANCEL" || type === "INVALID") {
          return;
        }
        if (type === "MOVE" || type === "CAPTURE")
          ;
        else {
          this.drawActivePiece(activePieceId);
        }
        if (type === "TOUCH") {
          this.drawPositions(moves, captures);
        } else if (type === "CAPTURE") {
          this.drawCapturedPiece(capturedPieceId);
        }
      }
      setPerspective(perspective2) {
        const other = perspective2 === "WHITE" ? "perspective-black" : "perspective-white";
        const current = perspective2 === "WHITE" ? "perspective-white" : "perspective-black";
        this.element.classList.add(current);
        this.element.classList.remove(other);
      }
    }
    class Control {
      constructor(game2, view2) {
        this.inputSpeedAsap = document.querySelector("#speed-asap");
        this.inputSpeedFast = document.querySelector("#speed-fast");
        this.inputSpeedMedium = document.querySelector("#speed-medium");
        this.inputSpeedSlow = document.querySelector("#speed-slow");
        this.inputRandomBlack = document.querySelector("#black-random");
        this.inputRandomWhite = document.querySelector("#white-random");
        this.inputPerspectiveBlack = document.querySelector("#black-perspective");
        this.inputPerspectiveWhite = document.querySelector("#white-perspective");
        this.game = game2;
        this.view = view2;
        this.inputPerspectiveBlack.addEventListener(
          "change",
          this.updateViewPerspective.bind(this)
        );
        this.inputPerspectiveWhite.addEventListener(
          "change",
          this.updateViewPerspective.bind(this)
        );
        this.updateViewPerspective();
      }
      get speed() {
        if (this.inputSpeedAsap.checked) {
          return 50;
        }
        if (this.inputSpeedFast.checked) {
          return 250;
        }
        if (this.inputSpeedMedium.checked) {
          return 500;
        }
        if (this.inputSpeedSlow.checked) {
          return 1e3;
        }
      }
      autoplay() {
        const input = this.game.turn === "WHITE" ? this.inputRandomWhite : this.inputRandomBlack;
        if (!input.checked) {
          setTimeout(this.autoplay.bind(this), this.speed);
          return;
        }
        const position = this.game.randomMove();
        this.view.handleTileClick(position);
        setTimeout(this.autoplay.bind(this), this.speed);
      }
      updateViewPerspective() {
        this.view.setPerspective(
          this.inputPerspectiveBlack.checked ? "BLACK" : "WHITE"
        );
      }
    }
    const initialPositions = Utils.getInitialPiecePositions();
    const initialTurn = "WHITE";
    const perspective = "WHITE";
    const game = new Game(Utils.getInitialPieces(), initialPositions, initialTurn);
    const view = new View(document.querySelector("#board"), game, perspective);
    const control = new Control(game, view);
    control.autoplay();
  }
}
function popup() {
  for (const popupElement of document.querySelectorAll(".popup")) {
    popupElement.querySelector(".popup__close").addEventListener("click", function() {
      popupElement.classList.remove("active");
      refreshScroll();
    });
    popupElement.addEventListener("click", (event) => {
      if (event.target === popupElement) {
        popupElement.classList.remove("active");
        refreshScroll();
      }
    });
  }
  window.openPopup = function(id) {
    const popupElement = document.querySelector(`#${id}`);
    if (popupElement) {
      document.querySelector(`#${id}`).classList.add("active");
      stopScroll();
    }
  };
  window.closePopup = function(id) {
    const popupElement = document.querySelector(`#${id}`);
    if (popupElement) {
      document.querySelector(`#${id}`).classList.remove("active");
      refreshScroll();
    }
  };
}
function services() {
  if (window.innerWidth < 768) {
    servicesTabs();
  } else {
    servicesSlider();
  }
}
function servicesTabs() {
  const tabsItem = ".services__item";
  const tabHead = ".services__head";
  const tabBody = ".services__body";
  $($(tabsItem)[0]).addClass("active").find(tabBody).slideDown();
  $(tabHead).on("click", function() {
    const siblingsItems = $(this).parents(".services").find(tabsItem);
    if ($(this).parents(tabsItem).hasClass("active")) {
      $(this).parents(tabsItem).removeClass("active");
      $(this).siblings(tabBody).slideUp(() => ScrollTrigger.refresh(true));
    } else {
      siblingsItems.removeClass("active");
      siblingsItems.find(tabBody).slideUp();
      $(this).parents(tabsItem).addClass("active");
      $(this).siblings(tabBody).slideDown(() => ScrollTrigger.refresh(true));
    }
  });
}
function servicesSlider() {
  const blocks = document.querySelectorAll(".services");
  for (const block of blocks) {
    const navItems = block.querySelectorAll(".services__item");
    const slider = block.querySelector(".swiper");
    const swiper = new Swiper(slider, {
      grabCursor: true,
      rewind: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400]
        },
        next: {
          translate: ["100%", 0, 0]
        }
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      on: {
        init: function(swiper2) {
          navItems[0].classList.add("active");
        },
        slideChange: function(swiper2) {
          $(navItems).removeClass("active");
          navItems[swiper2.activeIndex].classList.add("active");
        },
        autoplayTimeLeft(swiper2, time, progress) {
          const progressBarValue = 1 - progress;
          navItems[swiper2.activeIndex].querySelector(".services__progress").style.transform = `scaleX(${progressBarValue})`;
        }
      }
    });
    $(navItems).on("click", function() {
      swiper.slideTo($(this).index(), 400);
    });
  }
}
function smallBanner() {
  for (const img of $(".small-banner__img[data-parallax]")) {
    gsap.timeline({
      scrollTrigger: {
        trigger: $(img).parents(".small-banner"),
        start: "top 50%",
        end: "bottom 10%",
        onUpdate: (self) => {
          gsap.to(img, { yPercent: (+img.dataset.parallax || 10) * self.progress, ease: "sine.out", duration: 1.2 });
        }
      }
    });
  }
}
function swipe() {
  const blocks = document.querySelectorAll(".swipe");
  for (const block of blocks) {
    const slider = block.querySelector(".swiper");
    const scrollbar = block.querySelector(".swiper-scrollbar");
    new Swiper(slider, {
      slidesPerView: "auto",
      freeMode: true,
      grabCursor: true,
      scrollbar: {
        el: scrollbar
      }
    });
  }
}
function tariffs() {
  tariffsSlider();
  window.tariffsPropsToggle = function(button) {
    $(button).toggleClass("ui-switch-button--active");
    $(button).parents(".tariffs__item").find("[ data-tariffs-prop-hidden]").slideToggle(() => ScrollTrigger.refresh(true));
  };
}
function tariffsSlider() {
  const blocks = document.querySelectorAll(".tariffs");
  for (const block of blocks) {
    const slider = block.querySelector(".swiper");
    const slidersLength = block.querySelectorAll(".swiper-slide").length;
    if (slidersLength > 2) {
      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 18,
        scrollbar: {
          el: ".swiper-scrollbar",
          draggable: true
        }
      });
    } else {
      block.classList.add("tariffs--block");
    }
  }
}
function team() {
  teamSlider();
  if (window.innerWidth > 1358) {
    teamEvents();
  }
}
function teamSlider() {
  new Swiper(".team .swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true
    }
  });
}
function teamEvents() {
  const items = document.querySelectorAll(".team__item");
  for (const item of items) {
    const popover = item.querySelector(".team__popover");
    const scaleItem = item.querySelector(".team__photo");
    hoverEvents(item, popover, scaleItem);
  }
}
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  window.addEventListener("load", () => ScrollTrigger.refresh(true));
  smoothScroll();
  changeBackgroundOnScroll();
  uiInput();
  uiSwitch();
  loader();
  accordion();
  approach();
  banner();
  caseDesc();
  casesItem();
  contacts();
  goals();
  header();
  page404();
  lineChart();
  mapSearch();
  popup();
  services();
  smallBanner();
  swipe();
  tariffs();
  team();
});
function smoothScroll() {
  if (!isTouchDevice()) {
    let raf2 = function(time) {
      lenis.raf(time);
      window.requestAnimationFrame(raf2);
    };
    var raf = raf2;
    const lenis = new Lenis({
      duration: 1.7,
      smoothWheel: true,
      easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    });
    window.lenis = lenis;
    window.requestAnimationFrame(raf2);
    $(document).on("click", 'a[href^="#"]', function(event) {
      event.preventDefault();
      lenis.scrollTo($(this).attr("href"), { duration: 2 });
    });
  }
}
function changeBackgroundOnScroll() {
  for (const darkSection of document.querySelectorAll(".section--bg")) {
    const isLastSection = () => {
      if (!darkSection.nextElementSibling)
        return true;
      return !darkSection.nextElementSibling.classList.contains("section");
    };
    ScrollTrigger.create({
      trigger: darkSection,
      start: "top 50%",
      end: isLastSection() ? "bottom top" : "bottom 40%",
      onToggle: (self) => {
        if (self.isActive) {
          gsap.to(".wrapper", {
            backgroundColor: "#101010",
            overwrite: "auto",
            duration: 0.7
          });
        } else {
          gsap.to(".wrapper", {
            backgroundColor: "#fafafa",
            overwrite: "auto",
            duration: 0.7
          });
        }
      }
    });
  }
}
window.toggleHidden = function(button, parent) {
  if ($(button).data("expand") === "true") {
    $(button).data("expand", "false");
    $(button).html($(button).data("text-start"));
    const block = $(parent);
    const items = block.find('[data-hidden="true"]');
    $(items).addClass("block-none");
    ScrollTrigger.refresh(true);
  } else {
    $(button).data("expand", "true");
    $(button).html($(button).data("text-end"));
    const block = $(parent);
    const items = block.find('[data-hidden="true"]');
    $(items).addClass("block-fade-in");
    $(items).removeClass("block-none");
    ScrollTrigger.refresh(true);
  }
};
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};
const stopScroll = () => {
  if (!isTouchDevice() && window.lenis) {
    window.lenis.stop();
  }
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
};
const refreshScroll = () => {
  if (!isTouchDevice() && window.lenis) {
    window.lenis.start();
  }
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
};
const hoverEvents = (item, popover, scaleItem) => {
  item.addEventListener("mousemove", (event) => {
    const currentTarget = event.currentTarget;
    const bounding = currentTarget.getBoundingClientRect();
    const posX = event.clientX - bounding.x;
    const posY = event.clientY - bounding.y;
    const moveX = event.clientX - bounding.left - bounding.width / 2;
    const moveY = event.clientY - bounding.top - bounding.height / 2;
    gsap.to(popover, {
      scale: 1.1,
      opacity: 1,
      x: posX,
      y: posY,
      ease: "expo.out",
      duration: 1
    });
    if (scaleItem) {
      gsap.to(scaleItem, {
        scale: 1.2,
        x: moveX * 0.2,
        y: moveY * 0.2,
        ease: "expo.out",
        duration: 1.8
      });
    }
  });
  item.addEventListener("mouseleave", (event) => {
    event.currentTarget;
    gsap.killTweensOf([popover]);
    gsap.to(popover, {
      scale: 0.8,
      opacity: 1e-4,
      ease: "expo.out",
      duration: 1
    });
    if (scaleItem) {
      gsap.killTweensOf([scaleItem]);
      gsap.to(scaleItem, {
        scale: 1,
        x: 0,
        y: 0,
        ease: "expo.out",
        duration: 1
      });
    }
  });
};
