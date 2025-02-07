let pageAllData = [];
let page = 1; // 첫 페이지
//로컬에서 데이터 가져오기
const pageDatas = JSON.parse(localStorage.getItem("userInfo"));
if (pageDatas) {
  pageAllData.push(...pageDatas);
}
// 페이지네이션 구현하기
// 1. 필요한 페이지 수 구하기
const showPage = 3; // 한 페이지 당 최대 5개의 요소를 보여줄 것
const showButton = 3; // 보여줄 버튼 수
const getTotalPageCount = () => {
  return Math.ceil(pageDatas.length / showPage); //올림 - 총 페이지 수
};

// 2. 버튼 동적 생성하기
const numberBtnWrap = document.querySelector(".numberBtnWrap");

const setPageButtons = () => {
  numberBtnWrap.innerHTML = ""; // 페이지 번호 wrapper 내부를 비워줌

  for (let i = 1; i <= getTotalPageCount(); i++) {
    numberBtnWrap.innerHTML += `<span class="numberBtn"> ${i} </span>`;
  }
};
setPageButtons(); //버튼 불러오기
