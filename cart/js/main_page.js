let pageAllData = [];

//로컬에서 데이터 가져오기
const pageDatas = JSON.parse(localStorage.getItem("userInfo"));
if (pageDatas) {
  pageAllData.push(...pageDatas);
}

let typeFour = (ww) => {
  return pageAllData.filter((x) => {
    return String(x.type) === ww;
  });
};
console.log(typeFour("PANTS")); //된다!

// 페이지네이션 구현하기
// 1. 필요한 페이지 수 구하기
const onePage = 10; // 한 페이지 당 개수 표시
const showButton = 3; // 보여줄 버튼 수
const totalPage = () => {
  return Math.ceil(pageDatas.length / onePage); //올림 - 총 페이지 수
};

let currentPage = 1; //현재 페이지 > 클릭 시 이벤트로 나중에 가져와야할듯 * (그룹)
let pageGroup = Math.ceil(currentPage / showButton); //보여질 페이지 (그룹)
let lastNumber = pageGroup * showButton; // 끝 숫자 = 1 * 3, 2 * 3 (그룹)
let firstNumber = lastNumber - (showButton - 1); // 첫번째 마지막 숫자 정하깅(그룹)
let lastNum = currentPage * onePage;
let firstNum = lastNum - (onePage - 1);

// 2. 버튼 동적 생성하기

const numberBtnWrap = document.querySelector(".numberBtnWrap");

if (lastNumber > totalPage()) {
  lastNumber = totalPage();
}

const setPageButtons = () => {
  numberBtnWrap.innerHTML = "";
  for (let i = firstNumber; i <= lastNumber; i++) {
    numberBtnWrap.innerHTML += `<button class="numberBtn numberBtn${i}" id="page_${i}" onclick="numBtn(${i})">${i}</button>`;
  }
};
setPageButtons(); //버튼 불러오기

// 버튼 CSS
const currentPageCss = () => {
  const numBtnAll = document.querySelectorAll(".numberBtn");
  numBtnAll.forEach((x) => {
    if (Number(x.innerText) === Number(currentPage)) {
      x.classList.add("underLine");
    }
  });
};

currentPageCss(); //현재 버튼 CSS 밑줄
slice = pageDatas.slice(firstNum - 1, lastNum);

// 맨 처음 페이지 버튼
const firstPage = () => {
  currentPage = 1;

  pageGroup = Math.ceil(currentPage / showButton);
  lastNumber = pageGroup * showButton;
  firstNumber = lastNumber - (showButton - 1);
  if (lastNumber > moveLast()) {
    lastNumber = moveLast();
  }
  lastNum = currentPage * onePage;
  firstNum = lastNum - (onePage - 1);

  if (movetype === "ALL") {
    type = "ALL";
    dataAll3();
  } else {
    type = move[0].type;
    type1 = pageAllData.filter((item) => String(item.type) === type);
    move = type1.slice(firstNum - 1, lastNum);
    moveDataAll();
  }
  setPageButtons();
  currentPageCss();
};

// 이전 버튼
const prev = () => {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
  }

  pageGroup = Math.ceil(currentPage / showButton);
  lastNumber = pageGroup * showButton;
  firstNumber = lastNumber - (showButton - 1);
  if (lastNumber > moveLast()) {
    lastNumber = moveLast();
  }
  lastNum = currentPage * onePage;
  firstNum = lastNum - (onePage - 1);

  if (movetype === "ALL") {
    type = "ALL";
    dataAll3();
  } else {
    type = move[0].type;
    type1 = pageAllData.filter((item) => String(item.type) === type);
    move = type1.slice(firstNum - 1, lastNum);
    moveDataAll();
  }
  setPageButtons();
  currentPageCss();
};

// 마지막 페이지 계산
const moveLast = () => {
  if (movetype === "ALL") {
    type = "ALL";
    return Math.ceil(pageDatas.length / onePage);
  } else {
    return Math.ceil(typeFour(move[0].type).length / onePage);
  }
};

// 다음 버튼
const next = () => {
  if (currentPage < moveLast()) {
    currentPage = currentPage + 1;
  }
  pageGroup = Math.ceil(currentPage / showButton);
  lastNumber = pageGroup * showButton;
  firstNumber = lastNumber - (showButton - 1);
  if (lastNumber > moveLast()) {
    lastNumber = moveLast();
  }
  lastNum = currentPage * onePage;
  firstNum = lastNum - (onePage - 1);

  if (movetype === "ALL") {
    type = "ALL";
    dataAll3();
  } else {
    type = move[0].type;
    type1 = pageAllData.filter((item) => String(item.type) === type);
    move = type1.slice(firstNum - 1, lastNum);
    moveDataAll();
  }
  setPageButtons();
  currentPageCss();
};

// 마지막 페이지 버튼
const lastPage = () => {
  console.log(moveLast(), "마지막");
  currentPage = moveLast();
  pageGroup = Math.ceil(currentPage / showButton);
  lastNumber = pageGroup * showButton;
  firstNumber = lastNumber - (showButton - 1);
  if (lastNumber > moveLast()) {
    lastNumber = moveLast();
  }
  lastNum = currentPage * onePage;
  firstNum = lastNum - (onePage - 1);

  if (movetype === "ALL") {
    type = "ALL";
    dataAll3();
  } else {
    type = move[0].type;
    type1 = pageAllData.filter((item) => String(item.type) === type);
    move = type1.slice(firstNum - 1, lastNum);
    moveDataAll();
  }
  setPageButtons();
  currentPageCss();
};
console.log(movetype, "나오나?");
// 숫자 버튼
const numBtn = (num) => {
  currentPage = num;
  lastNum = currentPage * onePage;
  firstNum = lastNum - (onePage - 1);
  console.log(movetype, "나오나?2222"); //잘 나옴
  if (movetype === "ALL") {
    type = "ALL";
    type2 = pageAllData.filter((item) => String(item.type) !== type);
    move = type2.slice(firstNum - 1, lastNum);
    dataAll3();
  } else {
    type = move[0].type;
    type1 = pageAllData.filter((item) => String(item.type) === type);
    move = type1.slice(firstNum - 1, lastNum);
    moveDataAll();
  }
  setPageButtons();
  currentPageCss();
};
