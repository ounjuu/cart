// 테이블 생성
const tableWrap = document.querySelector(".main-wrap");
tableWrap.innerHTML = `

                  <table>        
                    <thead>
                      <tr>
                      <div class="excelbtnbox">
                    <button id="exceldown" class="excelbtn" onclick="excel()"><img src = "../image/excel.png"></button>
                    </div>
                      <th>상품이미지</th>
                        <th>상품명</th>
                        <th>상품옵션</th>
                        <th>가격</th>
                        <th>상세내용</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody class="tablebody">
                    </tbody>
                  </table>
                  <div class="textbox1"></div>
                  <div class="pagination-container">
                  <div class="prev-button firstBtn" onclick="firstPage()"><<</div>
                  <div class="prev-button" onclick="prev()"><</div>
                    <div class="numberBtnWrap"><<button class="numberBtn" id="page_" onclick="numBtn()">1</button></div>
                  <div class="next-button" onclick="next()">></div>
                  <div class="next-button lastBtn" onclick="lastPage()">>></div>
                  </div>
                  `;

let data = [];
let cartData = [];
let slice = [];

// 데이터 전역변수
const dataAll1 = () => {
  const tablebody = document.querySelector(".tablebody");

  slice = data.slice(firstNum - 1, lastNum);
  tablebody.innerHTML = slice
    .map((x, i) => {
      return `
            <tr id="tr${x.id}">
            <td class="img${x.id} tdsize1">
                <div class="imgWrap${x.id}"><img src="../${x.image}" alt="randomimg" /></div>
                <span></span>
                </td>
              <td class="names${x.id} tdsize1">
                <div>${x.name}</div>
                <span></span>
                </td>
                <td class="type${x.id} tdsize2">
                <div>${x.type}</div>
                <span></span>
                </td>
              <td class="age${x.id} tdsize2">
                <div>${x.age}</div>
                <span></span>
                </td>
              <td class="years${x.id} tdsize3">
                <div>${x.year}</div>
                <span></span>
              </td>
              <td class="buttons">
                <button class="fixbtn${x.id}" onclick="updateData(${x.id})" data-label="수정">
                  수정
                </button>
                <button class="deletebtn${x.id}" onclick="deleteData(${x.id})">
                  삭제
                </button>
              </td>
            </tr>
            `;
    })
    .join("");

  document.querySelector(".idbox").innerText = "";
  document.querySelector(".namebox").innerText = "";
  document.querySelector(".agebox").innerText = "";
  document.querySelector(".yearbox").innerText = "";

  let savebtn = document.querySelector("#savebtn");
  savebtn.disabled = true;

  setPageButtons();
};

// 이미지 랜덤
const randomImg = [
  "0.webp",
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp",
  "7.webp",
  "8.webp",
  "9.webp",
  "10.webp",
  "11.webp",
  "12.webp",
  "13.webp",
  "14.webp",
  "15.webp",
  "16.webp",
  "17.webp",
  "18.webp",
];

window.onload = function () {
  const getDate = JSON.parse(localStorage.getItem("userInfo"));
  if (getDate) {
    data.push(...getDate);
  } else if (!getDate) {
  }

  const getDate2 = JSON.parse(localStorage.getItem("userCart"));
  if (getDate2) {
    cartData.push(...getDate2);
  } else if (!getDate2) {
  }

  // 데이터 원래꺼 없으면 로컬 스토리지 내용 테이블에 넣기

  dataAll1();
  updateCartCount();
  currentPage = 1;
  currentPageCss();
};

// 실시간 체크 선언
let idCheck2 = false;
let nameCheck2 = false;
let ageCheck2 = false;
let yearCheck2 = false;
let selectCheck2 = false;

// 실시간 아이디 중복 불가능
function idonInput() {
  let regex = /^[0-9]*$/;
  let iddataup = document.querySelector("#idInput").value;
  const idplus2 = data.filter((item) => item.id === iddataup);
  if (idplus2.length > 0) {
    document.querySelector(".idbox").innerText =
      "중복입니다. 다른 숫자를 입력하세요.";
    idCheck2 = false;
  } else if (!regex) {
    document.querySelector(".idbox").innerText = "숫자를 입력하세요.";
    idCheck2 = false;
  } else {
    document.querySelector(".idbox").innerText = "";
    idCheck2 = true;
  }
}

// 실시간 이름&숫자금지 / 1글자 이상
function nameonInput() {
  // const regex2 = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
  let namedataup = document.querySelector("#nameInput").value;
  if (namedataup.length < 1) {
    document.querySelector(".namebox").innerText = "상품명을 입력하세요.";
    nameCheck2 = false;
  }
  // } else if (!regex2.test(namedataup)) {
  //   document.querySelector(".namebox").innerText =
  //     "영문이나 한글을 입력하세요.";
  //   nameCheck2 = false;
  // }
  else {
    document.querySelector(".namebox").innerText = "";
    nameCheck2 = true;
  }
}

// 실시간 가격 안적으면 X
function ageonInput() {
  let agedataup = document.querySelector("#ageInput").value;
  if (agedataup.length < 1) {
    document.querySelector(".agebox").innerText = "가격을 입력하세요.";
    ageCheck2 = false;
  } else {
    document.querySelector(".agebox").innerText = "";
    ageCheck2 = true;
  }
}

// 실시간 경력 15자 이상 입력해야 함
function yearonInput() {
  let agedataup = document.querySelector("#yearInput").value;
  if (agedataup.length < 10) {
    document.querySelector(".yearbox").innerText = "최소 10자 이상 입력하세요.";
    yearCheck2 = false;
  } else {
    document.querySelector(".yearbox").innerText = "";
    yearCheck2 = true;
  }
}

// 저장 버튼 비활성화
// 조건 만족하면 저장 버튼 활성화
function allonchange(index) {
  if (index == 1) {
    idonInput();
  } else if (index == 2) {
    nameonInput();
  } else if (index == 3) {
    ageonInput();
  } else if (index == 4) {
    yearonInput();
  }
  let savebtn = document.querySelector("#savebtn");

  if (
    idCheck2 === true &&
    nameCheck2 === true &&
    yearCheck2 === true &&
    ageCheck2 === true
  ) {
    savebtn.disabled = false;
  } else {
    savebtn.disabled = true;
  }
}

// 랜덤 이미지 만들기
function getRandomImage() {
  const choiceImg = randomImg[Math.floor(Math.random() * randomImg.length)];
  const makeImg = document.createElement("img");
  return (makeImg.src = `img/${choiceImg}`);
}

// 저장 버튼 누르면 데이터 저장
function save() {
  // 1번 검사
  idonInput();
  nameonInput();
  ageonInput();
  yearonInput();

  if (
    idCheck2 === true &&
    nameCheck2 === true &&
    yearCheck2 === true &&
    ageCheck2 === true
  ) {
    const idInput = document.querySelector("#idInput").value;
    const nameInput = document.querySelector("#nameInput").value;
    const ageInput = document.querySelector("#ageInput").value;
    const yearInput = document.querySelector("#yearInput").value;
    const selectInput = document.querySelector("#typeSelect").value;
    const randomImage = getRandomImage();

    // 인풋값 가져오기
    let userInfo1 = {
      id: idInput,
      name: nameInput,
      age: ageInput,
      year: yearInput,
      image: randomImage,
      type: selectInput,
    };

    data.push(userInfo1);
    localStorage.setItem("userInfo", JSON.stringify(data));

    // 로컬 스토리지 내용 테이블에 넣기
    dataAll1();

    // const tablebody = document.querySelector(".tablebody");
    // tablebody.innerHTML = dataAll.join("");
    document.querySelector("#idInput").value = "";
    document.querySelector("#nameInput").value = "";
    document.querySelector("#ageInput").value = "";
    document.querySelector("#yearInput").value = "";
    document.querySelector(".idbox").innerText = "";
    document.querySelector(".namebox").innerText = "";
    document.querySelector(".namebox").innerText = "";
    document.querySelector(".yearbox").innerText = "";
    // 버튼 비활성화
    let savebtn = document.querySelector("#savebtn");
    savebtn.disabled = true;
  } else {
    savebtn.disabled = true;
  }

  location.reload();
}
// 이름 검사
const checkName = () => {
  const nameinputValue = document.querySelector(`.nameinput${id}`).value;
  const namespanTag = document.querySelector(`.names${id} span`);
  if (nameinputValue.length < 2) {
    namespanTag.innerText = "이름을 입력하세요.";
  } else {
    namespanTag.innerText = "";
  }
};

// 가격 검사
const checkAge = (id) => {
  const ageinputValue = document.querySelector(`.ageinput${id}`).value;
  const agespanTag = document.querySelector(`.age${id} span`);
  if (ageinputValue.length < 1) {
    agespanTag.innerText = "가격을 입력하세요.";
  } else {
    agespanTag.innerText = "";
  }
};

// 경력 검사
const checkYear = (id) => {
  const yearinputValue = document.querySelector(`.yearinput${id}`).value;
  const spanTag = document.querySelector(`.years${id} span`);
  if (yearinputValue.length < 10) {
    spanTag.innerText = "10자리 이상 입력해 주세요.";
  } else {
    spanTag.innerText = "";
  }
};

// 삭제
const deleteData = (id) => {
  const deleteTr = document.querySelector(`#tr${id}`);
  deleteTr.remove();
  const delete_data = data.filter((item) => Number(item.id) !== id);
  data = delete_data;
  localStorage.setItem("userInfo", JSON.stringify(data));
};

// 수정
const updateData = (id) => {
  const updataBtn = document.querySelector(`.fixbtn${id}`);
  const nameDiv = document.querySelector(`.names${id} div`);
  const typeDiv = document.querySelector(`.type${id} div`);
  const ageDiv = document.querySelector(`.age${id} div`);
  const yearDiv = document.querySelector(`.years${id} div`);
  const yearinputValue = document.querySelector(`.yearinput${id}`);
  const nameinputValue = document.querySelector(`.nameinput${id}`);
  const ageinputValue = document.querySelector(`.ageinput${id}`);
  const typeinputValue = document.querySelector(`#typeSelect${id}`);

  if (updataBtn.innerText === "수정") {
    const currentType = typeDiv.innerText.trim();

    updataBtn.innerText = "수정완료";
    // typeDiv.innerHTML = `<input class="typeSelect${id}" value="${typeDiv.innerText}" />`;
    typeDiv.innerHTML = `<select id="typeSelect${id}">
    <option value="T-SHIRT" ${
      currentType === "T-SHIRT" ? "selected" : ""
    }>T-SHIRT</option>
    <option value="PANTS" ${
      currentType === "PANTS" ? "selected" : ""
    }>PANTS</option>
    <option value="ETC" ${currentType === "ETC" ? "selected" : ""}>ETC</option>
  </select>`;

    yearDiv.innerHTML = `<input class="yearinput${id}" oninput="checkYear(${id})" value="${yearDiv.innerText}" />`;
    nameDiv.innerHTML = `<input class="nameinput${id}" oninput="checkName(${id})" value="${nameDiv.innerText}" />`;
    ageDiv.innerHTML = `<input class="ageinput${id}" oninput="checkAge(${id})" value="${ageDiv.innerText}" type="number" />`;

    //checkName(${id}) checkAge(${id})
  } else {
    typeDiv.innerText = typeinputValue.value;
    yearDiv.innerText = yearinputValue.value;
    nameDiv.innerText = nameinputValue.value;
    ageDiv.innerText = ageinputValue.value;
    const update_data = data.map((item) => {
      if (Number(item.id) == id) {
        return {
          ...item,
          type: typeinputValue.value,
          year: yearinputValue.value,
          age: ageinputValue.value,
          name: nameinputValue.value,
        };
      } else {
        return item;
      }
    });
    data = update_data;
    localStorage.setItem("userInfo", JSON.stringify(data));
    updataBtn.innerText = "수정";
  }
};

// 준비중입니다.
const login = () => {
  Swal.fire({
    title: '<h2 style="font-size:20px;">로그인 기능은 준비 중입니다.</h2>',
    icon: "warning",
  });
};

// 장바구니 개수 업데이트 함수
const updateCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cartData.length;
  // const totalQuantity = cartData.reduce((sum, item) => sum + item.quantity, 0);
  // cartCount.textContent = totalQuantity;
};

// 엑셀 다운로드

const excel = () => {
  let filename = "testFile.xlsx";
  getExcel(filename);
};

let allData = [];

function getExcel(filename) {
  const thRow = document.querySelectorAll("th"); // 테이블 헤더 가져오기
  const getData = JSON.parse(localStorage.getItem("userInfo")); // 로컬스토리지에서 데이터 가져오기

  if (getData) {
    allData = [...getData]; // 기존 데이터 업데이트
  }

  // 1열(첫 행)에 컬럼명 추가
  let ws_data = [[thRow[1].innerText, thRow[2].innerText, thRow[3].innerText]];

  // 데이터 추가
  allData.forEach((data) => {
    ws_data.push([data.name, data.age, data.year]);
  });

  // Excel 워크북 생성
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.aoa_to_sheet(ws_data);

  // 워크북에 시트 추가
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Excel 파일 다운로드
  XLSX.writeFile(wb, filename);
}
