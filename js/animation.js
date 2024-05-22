// 기기 너비 사이즈에 따른 animation 변경
addEventListener('load', () => {
  const changeImgs = document.querySelectorAll('.change-app-img');
  if (window.screen.width <= 450) {
    changeImgs.forEach((img) => {
      const parent = img.parentNode;
      parent.dataset.aos = '';
    });
  }
});
