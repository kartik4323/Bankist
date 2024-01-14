'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const allSections = document.querySelectorAll('.btn--scroll-to');
// console.log(allSections);
const header = document.querySelector('.header');
// console.log(allSections);

document.getElementById('section--1');
const allButton = document.getElementsByTagName('button');
//console.log(allButton);

//console.log(document.getElementsByClassName('btn'));

//.insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent='We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.after(message);
// header.before(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });

//styles-work only for inline style

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

//attribute

const logo = document.querySelector('.nav__logo');
console.log(logo.src);
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.twitter-link');
console.log(link.getAttribute('href'));

//data attribute

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', function (e) {
  const s1cord = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1cord.left + window.pageXOffset,
    top: s1cord.top + window.pageYOffset,
    behavior: 'smooth',
  });

  //section1.scrollIntoView({ behavior: 'smooth' });
});

// const randmint = function (max, min) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
// const randcolor = function () {
//   return `rgb(${randmint(0, 255)}, ${randmint(0, 255)}, ${randmint(0, 255)})`;
// };
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randcolor();
//   e.stopPropagation();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randcolor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randcolor();
// });

const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer = document.querySelector('.operations__tab-container');
const tabcontent = document.querySelectorAll('.operations__content');
tabscontainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabcontent.forEach(c => c.classList.remove('operations__content--active'));
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const nav = document.querySelector('.nav');

const hoverin = function (e, opacity) {
  const hovered = e.target;
  const logo = document.querySelector('.nav__logo');
  if (e.target.classList.contains('nav__link')) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(r => {
      if (r != hovered) r.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  hoverin(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  hoverin(e, 1);
});

// const obvCall = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obvVal = {
//   root: null,
//   threshold: [0, 0.1],
// };

// const obser = new IntersectionObserver(obvCall, obvVal);
// obser.observe(section1);

const obvCall = function (entries) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};
const obvVal = {
  root: null,
  threshold: 0,
  //rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const obser = new IntersectionObserver(obvCall, obvVal);
obser.observe(header);

const allSections = document.querySelectorAll('.section');

const revealFunc = function (entries, observer) {
  if (!entries[0].isIntersecting) return;
  entries[0].target.classList.remove('section--hidden');
  observer.unobserve(entries[0].target);
};

const obvsection = new IntersectionObserver(revealFunc, {
  root: null,
  threshold: 0.2,
});

for (const section of allSections) {
  section.classList.add('section--hidden');
  obvsection.observe(section);
}

const loadimg = function (entries, observer) {
  if (!entries[0].isIntersecting) return;
  entries[0].target.src = entries[0].target.dataset.src;
  entries[0].target.addEventListener('load', function () {
    entries[0].target.classList.remove('lazy-img');
  });
  observer.unobserve(entries[0].target);
};

const observeLoad = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
});
const imageTarget = document.querySelectorAll('img[data-src]');
imageTarget.forEach(img => observeLoad.observe(img));
let slider = 0;
const slides = document.querySelectorAll('.slide');
const translateSlide = function (slide, i) {
  slide.style.transform = `translateX(${100 * (i - slider)}%)`;
};

slides.forEach((slide, i) => translateSlide(slide, i));
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

btnLeft.addEventListener('click', function () {
  slider--;
  if (slider === -1) {
    slider = 2;
  }
  slides.forEach((slide, i) => translateSlide(slide, i));
});
btnRight.addEventListener('click', function () {
  slider++;
  if (slider === 3) {
    slider = 0;
  }
  slides.forEach((slide, i) => translateSlide(slide, i));
});
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
