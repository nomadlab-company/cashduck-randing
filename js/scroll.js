const header = document.querySelector('header');
const btnLogo = document.querySelector('.header-logo');
const main = document.querySelector('main');
const section = document.querySelectorAll('section');
const chartCover = document.querySelector('#img-cover');

// css section transition 시간이랑 일치
const SCROLL_ANIMATION_TIME = 700;

let touchStartY = null;
let lastTouchY = null;
const lastSectionIdx = section.length - 1;
let currentSectionIdx = 0;
let isScrolling = false;

function updateSectionIdx(deltaY) {
  isScrolling = true;
  // wheel down
  if (deltaY > 0 && currentSectionIdx !== lastSectionIdx) {
    currentSectionIdx++;
  }
  // wheel up
  else if (deltaY < 0 && currentSectionIdx !== 0) {
    currentSectionIdx--;
  }
}

// 스크롤 올릴 떄 기존 애니메이션 다시 재생 되도록 하기 위함
function handleAosAnimate() {
  if (currentSectionIdx === 0) {
    return;
  }

  const animates =
    section[currentSectionIdx - 1].querySelectorAll('.aos-animate');
  animates.forEach((animate) => {
    animate.classList.remove('aos-animate');
  });
}

function handleHeaderStyle() {
  if (currentSectionIdx % 2) {
    header.classList.add('h-shadow');
  } else {
    header.classList.remove('h-shadow');
  }
}

function handleStyle() {
  const { innerHeight } = window;
  let footerHeight = 0;

  let top = currentSectionIdx * -innerHeight;

  if (currentSectionIdx === lastSectionIdx) {
    footerHeight = document.querySelector('.footer').offsetHeight;
    top = currentSectionIdx * -innerHeight + (innerHeight - footerHeight);
  } else {
    top = currentSectionIdx * -innerHeight;
  }
  main.style.top = `${top}px`;

  handleHeaderStyle();

  currentSectionIdx >= lastSectionIdx - 1
    ? handleCoverAnimation(true)
    : handleCoverAnimation(false);

  // transition 시간동안 스크롤 이벤트 함수 재호출을 방지하기 위함
  setTimeout(() => {
    isScrolling = false;
    AOS.refresh(); // 스크롤 이벤트 후 AOS 업데이트
    handleAosAnimate();
  }, SCROLL_ANIMATION_TIME);
}

function handleCoverAnimation(isSection) {
  isSection
    ? chartCover.classList.add('show')
    : chartCover.classList.remove('show');
}

function handleWheelEvent(deltaY) {
  updateSectionIdx(deltaY);
  handleStyle();
}

function handleTouchEvent(deltaY) {
  updateSectionIdx(-deltaY);
  handleStyle();
}

function moveToFirstSection() {
  if (currentSectionIdx === 0) {
    return;
  }
  currentSectionIdx = 0;
  handleStyle();

  const animates = section[0].querySelectorAll('.aos-animate');
  animates.forEach((animate) => {
    animate.classList.remove('aos-animate');
  });
}

function moveToLastSection() {
  if (currentSectionIdx === (section.length -1)) {
    return;
  }
  currentSectionIdx = section.length -1;
  handleStyle();

  const animates = section[section.length -1].querySelectorAll('.aos-animate');
  animates.forEach((animate) => {
    animate.classList.remove('aos-animate');
  });
}

// 이벤트
addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
    isScrolling || handleWheelEvent(e.deltaY);
  },
  { passive: false }
);

// 모바일 관련 스크롤 이벤트
addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

addEventListener('touchend', (e) => {
  if (touchStartY === null) return;
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchEndY - touchStartY;
  isScrolling || handleTouchEvent(deltaY);
  touchStartY = null; // 터치 이벤트 후 변수 초기화
});

btnLogo.addEventListener('click', () => {
  moveToFirstSection();
});
