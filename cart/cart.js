let cartData = [];
const cart_wrap = document.querySelector(".cart_wrap"); //html에 넣을 곳
window.onload = function () {
  const cartbtn_wrap = document.querySelector(".cartbtn_wrap"); // 버튼
  const cartPrice = document.querySelector(".cartPrice"); // 금액계산
  const getDate = JSON.parse(localStorage.getItem("userCart"));

  if (getDate.length) {
    cartData.push(...getDate);
    cartbtn_wrap.style.display = "block";

    const makeBox = cartData.map((x) => {
      const formattedPrice = Number(x.age).toLocaleString() + "원";
      return `<div class="cart_divs detailWrap${x.id}">
              <div class="detailboxWrap">
                <div class="imgWrap"><img src="${x.image}" alt="productimage" /></div>
                <div class="productName">${x.name}</div>
                <div class="productPrice">${formattedPrice}</div>
                <div class="buttonWrap"><button class="cartin" onclick="cartin(${x.id})"><i class="fa-solid fa-trash-can"></i></button></div>
              </div>
            </div>`;
    });

    cart_wrap.innerHTML = makeBox.join("");
    // 금액 계산
    let prices = 0;
    const cartcount = cartData.length;

    cartPrice.innerHTML = `    <div class="countBoxWrap">
      <div class="countBox"><div>총 주문 상품 ${cartcount}개</div></div>
      <div class="priceBoxWrap">
        <div class="priceBox">${prices.toLocaleString()}원 + 3,500원 + ${(
      prices + 3500
    ).toLocaleString()}원</div>
        <div class="priceBoxbottom">상품금액 &nbsp; &nbsp; + &nbsp; &nbsp; 배송비 &nbsp; &nbsp; + &nbsp;&nbsp; &nbsp;총 주문금액</div>
      </div>
    </div>`;
    //장바구니 비우기 전체 버튼
    cartbtn_wrap.innerHTML = `<button class="cartout" onclick="cartout()">장바구니 비우기</button><br><button class="buynow" onclick="buynow()">주문하기</button>`;
  } else {
    cart_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/>
    </div>`; //데이터 없는 경우 텅 띄우기
    document.querySelector(".cartbtn_wrap").style.display = "none";
    document.querySelector(".cartPrice").style.display = "none";
    console.log(cartPrice, "dsds");
  }
  updateCartCount();
};

// 장바구니 개수 업데이트 함수
const updateCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cartData.length;
};

// 휴지통 누르면 로컬스토리지에서 삭제
const cartin = (x) => {
  const detailWrap = document.querySelector(`.detailWrap${x}`);
  detailWrap.remove();
  document.querySelector(".cartPrice").style.display = "none";
  //버튼도 안보이게 하기
  document.querySelector(".cartbtn_wrap").style.display = "none";
  const deleted_Data = cartData.filter((item) => Number(item.id) !== x);
  cartData = deleted_Data;
  //데이터 없는 경우 텅 띄우기
  cart_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/>
    </div>`;

  if (cartData.length === 0) {
    document.querySelector(".cartbtn_wrap").style.display = "none";
    document.querySelector(".cartPrice").style.display = "none";
  }
  localStorage.setItem("userCart", JSON.stringify(cartData));
  updateCartCount();
};

// 전체 장바구니 지우기 누르면 로컬스토리지에서 삭제 // sweetalert
const cartout = () => {
  Swal.fire({
    title: "장바구니를 비우시겠습니까?",
    text: "비우시려면 삭제 버튼을 눌러주세요.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.value) {
      cartData = [];
      cart_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/></div>`;
      document.querySelector(".cartbtn_wrap").style.display = "none";
      document.querySelector(".cartPrice").style.display = "none";
      // 로컬스토리지 초기화
      localStorage.removeItem("userCart");
      updateCartCount();
    }
  });
};

const login = () => {
  Swal.fire({
    title: '<h2 style="font-size:18px;">로그인 기능은 준비 중입니다.</h2>',
    icon: "warning",
  });
};

const buynow = () => {
  Swal.fire({
    title: '<h2 style="font-size:18px;">주문하기 기능은 준비 중입니다.</h2>',
    icon: "warning",
  });
};
