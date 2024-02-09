const lastChance = document.querySelector(".last-chance");
const header = document.querySelector(".header");
const product = document.querySelector(".product");
const footer = document.querySelector(".footer");
const freeShipping = document.querySelector(".free-shipping");

const menu = header.querySelector(".menu");
const menuIcon = header.querySelector(".menu img");
const logoImg = header.querySelector(".logo__link img");
const slider = product.querySelector(".slider");
const slides = product.querySelectorAll(".slider__item");
const indicatorSlide = product.querySelector(".indicator__part");
const timer = product.querySelector(".timer__expire");
const readButton = footer.querySelector(".button");
const freeShippingButton = freeShipping.querySelector(
  ".free-shipping__title+.menu"
);

const offer = document.querySelector(".offer");
const offerButton = offer.querySelector(".button");
const confirm = offer.querySelector(".confirm");
const confirmClose = confirm.querySelector(".menu");

menu.addEventListener("click", showNavigation);
slider.addEventListener("click", (e) => switchSlide(e));
readButton.addEventListener("click", truncateFooter);
setInterval(renderExpireTime, 1000);
offerButton.addEventListener("click", (e) => {
  e.preventDefault();
  confirm.classList.add("show");
  offerButton.classList.add("hidden");
});
confirmClose.addEventListener("click", () => {
  confirm.classList.remove("show");
  offerButton.classList.remove("hidden");
});
freeShippingButton.addEventListener("click", () => {
  freeShippingButton.classList.toggle("menu--rotate");
  freeShipping
    .querySelector(".free-shipping__content")
    .classList.toggle("hidden");
});

function showNavigation() {
  lastChance.classList.toggle("hidden");
  header.classList.toggle("show-nav");
  menuIcon.src = menuIcon.src.includes("burger")
    ? "./images/close.png"
    : "./images/burger.png";
  logoImg.src = logoImg.src.includes("logo-black")
    ? logoImg.src.replace("-black", "")
    : logoImg.src.replace("logo", "logo-black");
}
function renderExpireTime() {
  const nowDate = new Date();
  const expiredDate = new Date();
  expiredDate.setHours(23, 59, 59);
  const diffSec = (expiredDate - nowDate) / 1000;

  timer.textContent = formatTime(diffSec);
}
function formatTime(diffSec) {
  const expireHours = String(Math.floor(diffSec / 3600)).padStart(2, "0");
  const expireMinutes = String(Math.floor(diffSec / 60) % 60).padStart(2, "0");
  const expireSeconds = String(Math.floor(diffSec) % 60).padStart(2, "0");
  return `${expireHours}:${expireMinutes}:${expireSeconds}`;
}
function truncateFooter() {
  let buttonText = readButton.textContent;
  const readText = footer.querySelector(".footer p:last-of-type");
  if (buttonText.includes("more")) {
    readButton.textContent = buttonText.replace("more", "less");
    readText.style.height = "auto";
  } else {
    readButton.textContent = buttonText.replace("less", "more");
    readText.style.height = "24px";
  }
}
function switchSlide(e) {
  let currentSlideIndex;
  slides.forEach((slide, index) => {
    if (slide.classList.contains("show")) {
      currentSlideIndex = index;
    }
  });
  const nextSlideIndex =
    currentSlideIndex !== slides.length - 1 ? currentSlideIndex + 1 : 0;
  const prevSlideIndex =
    currentSlideIndex !== 0 ? currentSlideIndex - 1 : slides.length - 1;

  const slideIndex =
    e.layerX >= slider.clientWidth / 2 ? nextSlideIndex : prevSlideIndex;

  slides[slideIndex].classList.add("show");
  slides[currentSlideIndex].classList.remove("show");
  indicatorSlide.style.left = 25 * slideIndex + "%";
}
// switchSlideAuto();
function switchSlideAuto() {
  setInterval(() => {
    let currentSlideIndex;
    slides.forEach((slide, index) => {
      if (slide.classList.contains("show")) {
        currentSlideIndex = index;
      }
    });
    let nextSlideIndex =
      currentSlideIndex !== slides.length - 1 ? currentSlideIndex + 1 : 0;
    slides[currentSlideIndex].classList.remove("show");
    slides[nextSlideIndex].classList.add("show");
    indicatorSlide.style.left = 25 * nextSlideIndex + "%";
  }, 10000);
}
