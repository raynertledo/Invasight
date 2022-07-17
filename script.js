const timeAutoSlide = 4000;
const homeSplashTexts = [
  {
    top: 'lo mejor',
    center: 'de asia',
    bottom: 'en tu mesa',
  },
  {
    top: 'la cocina de asia',
    center: 'en tu mesa',
    bottom: '',
  },
  {
    top: '',
    center: 'un plato',
    bottom: 'de asia en tu mesa',
  },
];
var homeSplashTextsPosition = 1;

function getOffset(el) {
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y };
}

function toggleNav() {
  let navBurger = document.querySelector('.nav__burger');
  let navList = document.querySelector('.nav__list');
  if (navList.classList.contains('active')) {
    navBurger.classList.remove('active');
    navList.classList.remove('active');
  } else {
    navBurger.classList.add('active');
    navList.classList.add('active');
  }
}

function toggleCategorias() {
  let categorias = document.querySelector('.search__head--categorias');
  let arrow = document.querySelector('.search__head--select--arrow');
  if (categorias.classList.contains('active')) {
    arrow.classList.remove('open');
    categorias.classList.remove('active');
  } else {
    arrow.classList.add('open');
    categorias.classList.add('active');
  }
}

function selectCookType() {
  const texts = [
    'En microondas: extraer la bandeia, perforar la tapa y calentar durante 3 minutos a potencia máxima.',
    'Aqui va el texto de cocinar con sarten...!!!',
  ];
  let items = document.querySelectorAll('.preparacion__select-type--item');
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains('active')) {
      document.querySelector('.preparacion__text').innerHTML = texts[i];
    }
  }
}

function setCookType(e) {
  document
    .querySelector('.preparacion__select-type--item.active')
    .classList.remove('active');
  e.classList.add('active');
  selectCookType();
}

selectCookType();

function toggleShareList() {
  document.querySelector('.nav__share--list').classList.toggle('active');
}

function setScroll(id) {
  window.scrollTo(0, document.getElementById(id).offsetTop - 129);
}

function checkScrollAnimations() {
  let start = window.scrollY + window.innerHeight * 0.9;
  document.querySelectorAll('.animate').forEach((element) => {
    // console.log(element, start > element.offsetTop, start, getOffset(element).top);
    if (start > getOffset(element).top) {
      element.classList.add('run-animate');
    }
  });
}

try {
  checkScrollAnimations();
} catch (error) {}

window.onscroll = function () {
  var y = window.scrollY;
  let marcaDivs = document.querySelectorAll('.marca__div');
  for (let i = 0; i < marcaDivs.length; i++) {
    if (
      y + 200 >= marcaDivs[i].offsetTop &&
      y + 200 < marcaDivs[i].offsetTop + marcaDivs[i].clientHeight
    ) {
      document.querySelectorAll('.sub-nav__item')[i].classList.add('active');
    } else {
      document.querySelectorAll('.sub-nav__item')[i].classList.remove('active');
    }
  }

  // when down the scroll do something
  try {
    let nav = document.querySelector('.nav');
    let logo = document.querySelector('.logo');
    let marcaSubMenu = document.querySelector('.marca .sub-nav');
    nav.classList.toggle('down', y > 100);
    logo.classList.toggle('down', y > 100);
    marcaSubMenu.classList.toggle('down', y > 100);
  } catch (error) {}

  // check all animations on scroll
  try {
    checkScrollAnimations();
  } catch (error) {}

  try {
    if (document.body.clientWidth <= 768)
      document.querySelector('.home .splash').style.backgroundPositionY =
        window.pageYOffset + 'px';
  } catch (error) {}
};

function initLine(toClass) {
  let timeLine = document.querySelector(toClass);
  timeLine.innerHTML = '';
  const n = document.querySelector('body').clientWidth / 8;
  for (let i = 0; i < n; i++) {
    timeLine.appendChild(document.createElement('div'));
  }
}

function checkHistoriaState() {
  let relatos = document.querySelectorAll('.historia__relato');
  let currentPosition = 0;
  let dots = document.querySelector('.historia__dots');
  let dotsItems = document.querySelectorAll('.historia__dots--item');
  if (dotsItems.length < relatos.length) {
    for (let i = 0; i < relatos.length - dotsItems.length; i++) {
      let circle = document.createElement('div');
      circle.classList.add('circle');

      let dot = document.createElement('div');
      dot.classList.add('historia__dots--item');
      dot.appendChild(circle);
      dot.addEventListener('click', () => {
        setRelatoPosition(i);
      });
      dots.appendChild(dot);
    }
  }
  for (let i = 0; i < relatos.length; i++) {
    const relato = relatos[i];

    if (relato.classList.contains('active')) {
      currentPosition = i;
    }
  }

  try {
    document
      .querySelector('.historia__dots--item.active')
      .classList.remove('active');
  } catch (error) {}

  // set background
  const back = document.querySelectorAll('.historia__relato--background')[
    currentPosition
  ].src;
  let divBack = document.querySelector('.historia__background');
  divBack.classList.add('hide');
  setTimeout(() => {
    divBack.style.backgroundImage = `url(${back})`;
    divBack.classList.remove('hide');
  }, 250);
  document
    .querySelectorAll('.historia__dots--item')
    [currentPosition].classList.add('active');

  if (currentPosition === 0) {
    document
      .querySelector('.historia__carrousel--previo')
      .classList.add('disabled');
  } else {
    document
      .querySelector('.historia__carrousel--previo')
      .classList.remove('disabled');
  }

  if (currentPosition === relatos.length - 1) {
    document
      .querySelector('.historia__carrousel--next')
      .classList.add('disabled');
  } else {
    document
      .querySelector('.historia__carrousel--next')
      .classList.remove('disabled');
  }

  let w = document.querySelector('body').clientWidth <= 768 ? -260 : -450;
  document.querySelector('.historia__ruleta').style.left = `${
    w * currentPosition
  }px`;
}

function previoRelato() {
  let relatos = document.querySelectorAll('.historia__relato');
  let currentPosition = 0;
  let nextPosition = 0;
  for (let i = 0; i < relatos.length; i++) {
    const relato = relatos[i];
    if (relato.classList.contains('active')) {
      currentPosition = i;
    }
  }
  if (currentPosition > 0) {
    nextPosition = currentPosition - 1;
  } else {
    return;
  }

  relatos[currentPosition].classList.remove('active');
  relatos[nextPosition].classList.add('active');

  checkHistoriaState();
}

function nextRelato() {
  let relatos = document.querySelectorAll('.historia__relato');
  let currentPosition = 0;
  let nextPosition = 0;
  for (let i = 0; i < relatos.length; i++) {
    const relato = relatos[i];
    if (relato.classList.contains('active')) {
      currentPosition = i;
    }
  }
  if (currentPosition < relatos.length - 1) {
    nextPosition = currentPosition + 1;
  } else {
    return;
  }

  if (currentPosition === relatos.length - 2) {
    document
      .querySelector('.historia__carrousel--next')
      .classList.add('disabled');
  }
  relatos[currentPosition].classList.remove('active');
  relatos[nextPosition].classList.add('active');

  checkHistoriaState();
}

function setRelatoPosition(pos) {
  document.querySelector('.historia__relato.active').classList.remove('active');
  document.querySelectorAll('.historia__relato')[pos].classList.add('active');
  checkHistoriaState();
}

function checkPremiosState() {
  let relatos = document.querySelectorAll('.premios__bottom__relato');
  let currentPosition = 0;
  let dots = document.querySelector('.premios__bottom__dots');
  let dotsItems = document.querySelectorAll('.premios__bottom__dots--item');
  if (dotsItems.length < relatos.length) {
    for (let i = 0; i < relatos.length - dotsItems.length; i++) {
      let circle = document.createElement('div');
      circle.classList.add('circle');

      let dot = document.createElement('div');
      dot.classList.add('premios__bottom__dots--item');
      dot.appendChild(circle);
      dot.addEventListener('click', () => {
        setPremiosRelatoPosition(i);
      });
      dots.appendChild(dot);
    }
  }
  for (let i = 0; i < relatos.length; i++) {
    const relato = relatos[i];

    if (relato.classList.contains('active')) {
      currentPosition = i;
    }
  }

  try {
    document
      .querySelector('.premios__bottom__dots--item.active')
      .classList.remove('active');
  } catch (error) {}
  document
    .querySelectorAll('.premios__bottom__dots--item')
    [currentPosition].classList.add('active');

  if (currentPosition === 0) {
    document
      .querySelector('.premios__bottom__carrousel--previo')
      .classList.add('disabled');
  } else {
    document
      .querySelector('.premios__bottom__carrousel--previo')
      .classList.remove('disabled');
  }

  if (currentPosition === relatos.length - 1) {
    document
      .querySelector('.premios__bottom__carrousel--next')
      .classList.add('disabled');
  } else {
    document
      .querySelector('.premios__bottom__carrousel--next')
      .classList.remove('disabled');
  }
  let w = document.querySelector('body').clientWidth <= 768 ? -260 : -400;
  document.querySelector('.premios__bottom__ruleta').style.left = `${
    w * currentPosition
  }px`;
}

function previoPremiosRelato() {
  let relatos = document.querySelectorAll('.premios__bottom__relato');
  let currentPosition = 0;
  let nextPosition = 0;
  for (let i = 0; i < relatos.length; i++) {
    const relato = relatos[i];
    if (relato.classList.contains('active')) {
      currentPosition = i;
    }
  }
  if (currentPosition > 0) {
    nextPosition = currentPosition - 1;
  } else {
    return;
  }

  relatos[currentPosition].classList.remove('active');
  relatos[nextPosition].classList.add('active');

  checkPremiosState();
}

function nextPremiosRelato() {
  let relatos = document.querySelectorAll('.premios__bottom__relato');
  let currentPosition = 0;
  let nextPosition = 0;
  for (let i = 0; i < relatos.length; i++) {
    const relato = relatos[i];
    if (relato.classList.contains('active')) {
      currentPosition = i;
    }
  }
  if (currentPosition < relatos.length - 1) {
    nextPosition = currentPosition + 1;
  } else {
    return;
  }

  if (currentPosition === relatos.length - 2) {
    document
      .querySelector('.premios__bottom__carrousel--next')
      .classList.add('disabled');
  }
  relatos[currentPosition].classList.remove('active');
  relatos[nextPosition].classList.add('active');

  checkPremiosState();
}

function setPremiosRelatoPosition(pos) {
  document
    .querySelector('.premios__bottom__relato.active')
    .classList.remove('active');
  document
    .querySelectorAll('.premios__bottom__relato')
    [pos].classList.add('active');
  checkPremiosState();
}

// histories
// auto generate all dots
function historiesdDots() {
  let histories = document.querySelectorAll('.histories');
  histories.forEach((history) => {
    let sildes = history.querySelectorAll('.histories__list--slide--item');
    let checkPosition = -1;
    for (let i = 0; i < sildes.length; i++) {
      if (sildes[i].classList.contains('active')) {
        currentPosition = i;
      }
    }
    if (checkPosition === -1) {
      if (sildes.length >= 3) {
        sildes[1].classList.add('active');
      } else {
        sildes[0].classList.add('active');
      }
    }
    let dots = history.querySelector('.histories__dots');
    for (let i = 0; i < sildes.length; i++) {
      let circle = document.createElement('div');
      circle.classList.add('circle');

      let dot = document.createElement('div');
      dot.classList.add('histories__dots--item');
      dot.appendChild(circle);
      dot.addEventListener('click', () => {
        history.classList.add('no-auto');
        history
          .querySelector('.histories__list--slide--item.active')
          .classList.remove('active');
        sildes[i].classList.add('active');
        checkHistories();
      });
      dots.appendChild(dot);
    }
    history
      .querySelector('.histories__list--left')
      .addEventListener('click', () => {
        history.classList.add('no-auto');
        let currentPosition = 0;
        for (let i = 0; i < sildes.length; i++) {
          if (sildes[i].classList.contains('active')) {
            currentPosition = i;
          }
        }
        if (currentPosition > 0) {
          sildes[currentPosition].classList.remove('active');
          sildes[currentPosition - 1].classList.add('active');
        } else {
          sildes[currentPosition].classList.remove('active');
          sildes[sildes.length - 1].classList.add('active');
        }
        checkHistories();
      });
    history
      .querySelector('.histories__list--right')
      .addEventListener('click', () => {
        let currentPosition = 0;
        history.classList.add('no-auto');
        for (let i = 0; i < sildes.length; i++) {
          if (sildes[i].classList.contains('active')) {
            currentPosition = i;
          }
        }
        if (currentPosition < sildes.length - 1) {
          sildes[currentPosition].classList.remove('active');
          sildes[currentPosition + 1].classList.add('active');
        } else {
          sildes[currentPosition].classList.remove('active');
          sildes[0].classList.add('active');
        }
        checkHistories();
      });
    //let list = history.querySelector('.histories__list');
    history.addEventListener('swiped', function (e) {
      let currentPosition = 0;
      switch (e.detail.dir) {
        case 'left':
          history.classList.add('no-auto');
          for (let i = 0; i < sildes.length; i++) {
            if (sildes[i].classList.contains('active')) {
              currentPosition = i;
            }
          }
          if (currentPosition < sildes.length - 1) {
            sildes[currentPosition].classList.remove('active');
            sildes[currentPosition + 1].classList.add('active');
          } else {
            sildes[currentPosition].classList.remove('active');
            sildes[0].classList.add('active');
          }
          checkHistories();
          break;

        case 'right':
          history.classList.add('no-auto');
          for (let i = 0; i < sildes.length; i++) {
            if (sildes[i].classList.contains('active')) {
              currentPosition = i;
            }
          }
          if (currentPosition > 0) {
            sildes[currentPosition].classList.remove('active');
            sildes[currentPosition - 1].classList.add('active');
          } else {
            sildes[currentPosition].classList.remove('active');
            sildes[sildes.length - 1].classList.add('active');
          }
          checkHistories();
          break;
      }
    });
  });
  checkHistories();
}

function checkHistories() {
  let histories = document.querySelectorAll('.histories');
  histories.forEach((history) => {
    let sildes = history.querySelectorAll('.histories__list--slide--item');
    let dots = history.querySelectorAll('.histories__dots--item');
    let currentPosition = 0;
    for (let i = 0; i < sildes.length; i++) {
      if (sildes[i].classList.contains('active')) {
        dots[i].classList.add('active');
        currentPosition = i;
      } else {
        dots[i].classList.remove('active');
      }
    }

    for (let i = 0; i < sildes.length; i++) {
      if (i < currentPosition - 1 || i > currentPosition + 1) {
        sildes[i].classList.add('hide');
      } else {
        sildes[i].classList.remove('hide');
      }
    }
    const w = history.querySelector(
      '.histories__list--slide--item--img'
    ).clientWidth;
    history.querySelector('.histories__list--slide').style.left = `${
      (-w - 40) * currentPosition
    }px`;
  });
}

function initSearchBar() {
  let barItems = document.querySelectorAll('.results__bar--item');
  let barGourps = document.querySelectorAll('.results__groups--item');
  barItems[0].classList.add('active');
  barGourps[0].classList.add('active');
  for (let i = 0; i < barItems.length; i++) {
    barItems[i].addEventListener('click', function () {
      document
        .querySelector('.results__bar--item.active')
        .classList.remove('active');
      document
        .querySelector('.results__groups--item.active')
        .classList.remove('active');

      barItems[i].classList.add('active');
      barGourps[i].classList.add('active');
    });
  }
}

try {
  document
    .querySelector('.historia__carrousel')
    .addEventListener('swiped', function (e) {
      switch (e.detail.dir) {
        case 'left':
          nextRelato();
          break;

        case 'right':
          previoRelato();
          break;
      }
    });
  document
    .querySelector('.premios__bottom__carrousel')
    .addEventListener('swiped', function (e) {
      switch (e.detail.dir) {
        case 'left':
          nextPremiosRelato();
          break;

        case 'right':
          previoPremiosRelato();
          break;
      }
    });
} catch (error) {}

try {
  initSearchBar();
} catch (error) {}

try {
  initLine('.historia__line');
  checkHistoriaState();
  initLine('.premios__bottom__line');
  checkPremiosState();
} catch (e) {
  //console.log('checkHistoriaState',e);
}

try {
  historiesdDots();
  // auto mover los histories
  if (document.querySelector('.histories'))
    setInterval(function () {
      let histories = document.querySelectorAll('.histories');
      for (let i = 0; i < histories.length; i++) {
        if (histories[i].classList.contains('no-auto')) continue;
        setTimeout(() => {
          let history = histories[i];
          let sildes = history.querySelectorAll(
            '.histories__list--slide--item'
          );
          for (let i = 0; i < sildes.length; i++) {
            if (sildes[i].classList.contains('active')) {
              sildes[i].classList.remove('active');
              if (i === sildes.length - 1) {
                sildes[0].classList.add('active');
              } else {
                sildes[i + 1].classList.add('active');
              }
              break;
            }
          }
          checkHistories();
        }, 1000 * i);
      }
    }, timeAutoSlide);
} catch (error) {
  // console.log(error);
}

try {
  document
    .querySelector('.blog .splash__search')
    .addEventListener('mouseover', function () {
      document.querySelector('.splash__search').classList.add('active');
    });

  document
    .querySelector('.blog .splash__search')
    .addEventListener('mouseout', function () {
      if (
        document.querySelector('.blog .splash__search input') !==
          document.activeElement &&
        document.querySelector('.blog .splash__search input').value === ''
      )
        document
          .querySelector('.blog .splash__search')
          .classList.remove('active');
    });

  document
    .querySelector('.blog .splash__search input')
    .addEventListener('blur', function () {
      if (document.querySelector('.blog .splash__search input').value === '')
        document
          .querySelector('.blog .splash__search')
          .classList.remove('active');
    });
} catch (e) {
  // console.log(e);
}

try {
  document
    .querySelector('.contacto .form__file input')
    .addEventListener('change', function () {
      document.querySelector('.contacto .form__file--name').innerHTML =
        this.files[0].name;
    });
} catch (error) {}

try {
  function setHomeSplashTexts() {
    let top = document.querySelector('.home .splash .top');
    let center = document.querySelector('.home .splash .center');
    let bottom = document.querySelector('.home .splash .bottom');
    top.style.opacity = 0;
    center.style.opacity = 0;
    bottom.style.opacity = 0;
    setTimeout(() => {
      top.innerHTML = homeSplashTexts[homeSplashTextsPosition].top;
      center.innerHTML = homeSplashTexts[homeSplashTextsPosition].center;
      bottom.innerHTML = homeSplashTexts[homeSplashTextsPosition].bottom;

      homeSplashTextsPosition =
        (homeSplashTextsPosition + 1) % homeSplashTexts.length;

      top.style.opacity = 1;
      center.style.opacity = 1;
      bottom.style.opacity = 1;
    }, 500);
  }
  //setHomeSplashTexts();
  if (document.querySelector('.home .splash'))
    setInterval(() => {
      setHomeSplashTexts();
    }, timeAutoSlide);
} catch (error) {}

try {
  document
    .querySelector('.home .splash .splash__video .play')
    .addEventListener('click', function () {
      let video = document.querySelector('.home .splash .splash__video video');
      video.controls = true;
      video.muted = false;
      document
        .querySelector('.home .splash .splash__video')
        .classList.add('open');
      document
        .querySelector('.home .splash .splash__video--open-back')
        .classList.add('open');
    });

  document
    .querySelector('.home .splash .splash__video .close')
    .addEventListener('click', function () {
      let video = document.querySelector('.home .splash .splash__video video');
      video.controls = false;
      video.muted = true;
      document
        .querySelector('.home .splash .splash__video')
        .classList.remove('open');
      document
        .querySelector('.home .splash .splash__video--open-back')
        .classList.remove('open');
    });
} catch (e) {}

try {
  let search = document.querySelector('.nav__list--item.search');
  let input = search.querySelector('input');

  search.addEventListener('mouseover', function () {
    document.querySelector('.nav__list').classList.add('active-search');
  });
  search.addEventListener('click', function () {
    document.querySelector('.nav__list').classList.add('active-search');
  });

  search.addEventListener('mouseout', function () {
    if (input !== document.activeElement && input.value === '')
      document.querySelector('.nav__list').classList.remove('active-search');
  });

  input.addEventListener('blur', function () {
    if (input.value === '')
      document.querySelector('.nav__list').classList.remove('active-search');
  });

  let searchMovile = document.querySelector('.nav__list--item.search-movile');
  let inputMovile = searchMovile.querySelector('input');

  searchMovile.addEventListener('mouseover', function () {
    searchMovile.classList.add('active');
  });

  searchMovile.addEventListener('click', function () {
    searchMovile.classList.add('active');
    document.activeElement = inputMovile;
  });

  searchMovile.addEventListener('mouseout', function () {
    console.log(inputMovile.value);
    if (inputMovile !== document.activeElement && inputMovile.value === '')
      searchMovile.classList.remove('active');
  });

  inputMovile.addEventListener('blur', function () {
    if (inputMovile.value === '') searchMovile.classList.remove('active');
  });
} catch (error) {}

// preloader historias img
try {
  const backs = document.querySelectorAll('.historia__relato--background');
  let divBack = document.querySelector('.historia__background');
  for (let i = backs.length - 1; i >= 0; i--) {
    divBack.style.backgroundImage = `url(${backs[i].src})`;
  }
} catch (error) {}

// kdev
