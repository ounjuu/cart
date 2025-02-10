let data = [];
let cartData = [];
let likeData = [];
let slice = [];
// 클릭 시 url 보내기
const divClick = (x) => {
  window.location.href = `detail.html?id=${x}`;
};

// 페이지 로드 시 하트 색상 초기화
const updateHeartColor = () => {
  const getDate3 = JSON.parse(localStorage.getItem("userLike")) || [];
  const hearts = document.querySelectorAll(".dataheart");

  hearts.forEach((heart) => {
    const heartId = heart.querySelector("i").id.replace("like", ""); // i 태그의 id를 사용하여 id를 추출
    const isLiked = getDate3.some((like) => like.id === heartId);

    const icon = heart.querySelector("i");
    if (isLiked) {
      icon.classList.add("liked"); // liked 클래스를 추가하여 빨간색으로 변경
    } else {
      icon.classList.remove("liked"); // liked 클래스를 제거하여 원래 색으로 되돌림
    }
  });
};

let move = "ALL";
let movetype = "ALL";

const dataAll3 = () => {
  const products_wrap = document.querySelector(".products_wrap"); //html에 넣을 곳

  // 좋아요 데이터
  const getDate3 = JSON.parse(localStorage.getItem("userLike"));
  if (getDate3) {
    likeData.push(...getDate3);
  }

  slice = data.slice(firstNum - 1, lastNum);
  products_wrap.innerHTML = slice
    .map((x, i) => {
      const formattedPrice = Number(x.age).toLocaleString() + "원";

      // 해당 id가 userLike 배열에 존재하는지 확인
      const isLiked =
        getDate3 && getDate3.some((like) => like.id === String(x.id));

      // 하트 아이콘 클래스 조건부 추가
      const heartClass = isLiked
        ? "fa-solid fa-heart like-" + x.id + " liked"
        : "fa-solid fa-heart like-" + x.id;

      return `<div class="divfive" onclick='divClick(${x.id})'>
      <div class="divinWrap">
        <div class="dataimage dataimage${x.id}"><img src="../${x.image}" alt="productimg"></div>
        <div class="textbox">
          <div class="intextbox">
            <div class="dataname dataname${x.id}">${x.name}</div>
            <div class="dataprice dataprice${x.id}">${formattedPrice}</div>
          </div>
          <div class="dataheart dataheart${x.id}" onclick="heartClick(${x.id}, event)">
            <i class="${heartClass}" id="like${x.id}"></i>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");

  updateHeartColor();
  updateCartCount();
};

// onload
window.onload = function () {
  // 전체 데이터
  const getDate = JSON.parse(localStorage.getItem("userInfo"));
  if (getDate) {
    data.push(...getDate);
  } else if (!getDate) {
    products_wrap.innerHTML = `<div class="emptyWrap"><img src="../image/emptyalert.png" class="empty"/>
    </div>`; //데이터 없는 경우 텅 띄우기
  }
  // 장바구니 데이터
  const getDate2 = JSON.parse(localStorage.getItem("userCart"));
  if (getDate2) {
    cartData.push(...getDate2);
  } else if (!getDate2) {
  }

  // 좋아요 데이터
  // ALL 데이터
  dataAll3();
};

const moveDataAll = () => {
  const products_wrap2 = document.querySelector(".products_wrap");
  products_wrap2.innerHTML = "";
  const getDate4 = JSON.parse(localStorage.getItem("userLike"));
  if (getDate4) {
    likeData.push(...getDate4);
  }

  products_wrap2.innerHTML = move
    .map((x, i) => {
      const formattedPrice = Number(x.age).toLocaleString() + "원";

      // 해당 id가 userLike 배열에 존재하는지 확인
      const isLiked =
        getDate4 && getDate4.some((like) => like.id === String(x.id));
      // 하트 아이콘 클래스 조건부 추가
      const heartClass = isLiked
        ? "fa-solid fa-heart like-" + x.id + " liked"
        : "fa-solid fa-heart like-" + x.id;

      return `<div class="divfive" onclick='divClick(${x.id})'>
      <div class="divinWrap">
        <div class="dataimage dataimage${x.id}"><img src="../${x.image}" alt="productimg"></div>
        <div class="textbox">
          <div class="intextbox">
            <div class="dataname dataname${x.id}">${x.name}</div>
            <div class="dataprice dataprice${x.id}">${formattedPrice}</div>
          </div>
          <div class="dataheart dataheart${x.id}" onclick="heartClick(${x.id}, event)">
            <i class="${heartClass}" id="like${x.id}"></i>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");

  updateHeartColor();
  updateCartCount();
};

// 타입이 ALL 인 것들 or 다른 것들
const moveHeader = (type) => {
  //클릭하면 첫페이지 보여주고 싶음
  currentPage = 1;

  pageGroup = Math.ceil(currentPage / showButton);
  lastNumber = pageGroup * showButton;
  firstNumber = lastNumber - (showButton - 1);
  lastNum = currentPage * onePage;
  firstNum = lastNum - (onePage - 1);
  const type1 = data.filter((item) => String(item.type) === type);

  const type2 = data.filter((item) => String(item.type) !== type);

  if (type === "ALL") {
    movetype = "ALL";

    move = type2.slice(firstNum - 1, lastNum);
  } else {
    movetype = type1[0].type;
    move = type1.slice(firstNum - 1, lastNum);
  }
  const movetotalPage = () => {
    if (type === "ALL") {
      return Math.ceil(type2.length / onePage);
    } else {
      return Math.ceil(type1.length / onePage);
    }
  };

  // // 버튼 추가
  movetotalPage();
  moveDataAll();
  if (lastNumber > movetotalPage()) {
    lastNumber = movetotalPage();
  } else {
    lastNumber = pageGroup * showButton;
  }
  pageGroup = Math.ceil(currentPage / showButton);
  setPageButtons();
  currentPageCss();
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
// id값 가져오기
// 좋아요 데이터 처리
const heartClick = (idx, event) => {
  event.preventDefault();
  event.stopPropagation(); // 클릭 이벤트 전파를 막기

  let likeData = JSON.parse(localStorage.getItem("userLike")) || [];
  let likeInfo = {
    id: String(idx),
  };

  const isAlreadyLiked = likeData.some((like) => like.id === likeInfo.id);

  if (isAlreadyLiked) {
    // 같은 id가 있으면 해당 항목을 제거
    likeData = likeData.filter((like) => like.id !== likeInfo.id);
  } else {
    // 같은 id가 없으면 추가
    likeData.push(likeInfo);
  }

  // 로컬스토리지에 저장
  localStorage.setItem("userLike", JSON.stringify(likeData));

  // 하트 색상 업데이트 함수 호출
  updateHeartColor();
};

// 캐러셀
const right_btn = () => {
  document.querySelector(".slideimg_container").style.transform =
    "translateX(-100vw)";
};

const left_btn = () => {
  document.querySelector(".slideimg_container").style.transform =
    "translateX(0vw)";
};
