const btnCheck = document.querySelector('#btn-check-down');
const type = navigator.userAgent.toLowerCase();

// 접속 기기 판단
function checkType() {
  console.log(type);
  if (type.indexOf('android') != -1) {
    // 임시로 카카오톡 링크 넣었음
    window.open(
      'https://play.google.com/store/apps/details?id=com.kakao.talk',
      '_blank'
    );
  } else if (
    type.indexOf('iphone') != -1 ||
    type.indexOf('ipad') != -1 ||
    type.indexOf('ipod') != -1
  ) {
    window.open(
      'https://apps.apple.com/kr/app/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1/id362057947',
      '_blank'
    );
  } else {
    location.reload();
  }
}

btnCheck.addEventListener('click', () => {
  checkType();
});
