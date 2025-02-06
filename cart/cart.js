let cartData = [];
const cart_wrap = document.querySelector(".cart_wrap"); //html에 넣을 곳

window.onload = function () {
  const cartbtn_wrap = document.querySelector(".cartbtn_wrap"); // 버튼
  const cartPrice = document.querySelector(".cartPrice"); // 금액계산
  const getDate = JSON.parse(localStorage.getItem("userCart"));

  if (getDate) {
    cartData.push(...getDate);
    cartbtn_wrap.style.display = "block";
    const makeBox = cartData.map((x) => {
      const formattedPrice =
        (Number(x.age) * Number(x.quantity)).toLocaleString() + "원";
      // const isCount = !x.count ? 1 : x.count;
      return `<div class="cart_divs detailWrap${x.id}">
              <div class="detailboxWrap">
                <div class="imgWrap"><img src="${x.image}" alt="productimage" /></div>
                <div class="productName">${x.name}</div>
                <div class="productCount"><input type="number" value="${x.quantity}" min="1" class=" quantity-input quantity-input${x.id}" onchange="inputChange(${x.id})"></div>
                <div class="productPrice">${formattedPrice}</div>
                <div class="buttonWrap"><button class="cartin" onclick="cartin(${x.id})"><i class="fa-solid fa-trash-can"></i></button></div>
              </div>
            </div>`;
    });

    cart_wrap.innerHTML = makeBox.join("");

    // 금액 계산
    let prices = 0;
    let deliverpay = 3500;
    const totalQuantity = cartData.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const cartcount = cartData.length;
    if (cartcount) {
      const cartNumber = cartData.map((x, i) => {
        return (prices = Number(prices) + Number(x.age) * Number(x.quantity));
      });
      if (prices >= 100000) {
        deliverpay = 0;
      }
      cartPrice.innerHTML = `    <div class="countBoxWrap">
      <div class="countBox"><div>총 주문 상품 ${totalQuantity}개</div></div>
      <div class="priceBoxWrap">
        <div class="priceBox">${Number(prices).toLocaleString()}원 + ${Number(
        deliverpay
      ).toLocaleString()}원 = ${(
        Number(prices) + Number(deliverpay)
      ).toLocaleString()}원</div>
        <div class="priceBoxbottom">상품금액 &nbsp; &nbsp; + &nbsp; &nbsp; 배송비 &nbsp; &nbsp; = &nbsp;&nbsp; &nbsp;총 주문금액</div>
      </div>
    </div>`;
    } else {
      //데이터 없는 경우 텅 띄우기
      cart_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/>
    </div>`;
      document.querySelector(".cartbtn_wrap").style.display = "none";
      document.querySelector(".cartPrice").style.display = "none";
    }

    //장바구니 비우기 전체 버튼
    cartbtn_wrap.innerHTML = `<button class="cartout" onclick="cartout()">장바구니 비우기</button><br><button class="buynow" onclick="buynow()">주문하기</button>`;
  } else {
    cart_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/>
    </div>`; //데이터 없는 경우 텅 띄우기
    document.querySelector(".cartbtn_wrap").style.display = "none";
    document.querySelector(".cartPrice").style.display = "none";
  }
  updateCartCount();
};

// 장바구니 개수 업데이트 함수
// const updateCartCount = () => {
//   const cartCount = document.getElementById("cartCount");
//   cartCount.textContent = cartData.length;
// };

const updateCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cartData.length;
  // const totalQuantity = cartData.reduce((sum, item) => sum + item.quantity, 0);
  // cartCount.textContent = totalQuantity;
};

// 장바구니 상품 수량 업데이트 함수
const inputChange = (id) => {
  let cartData = JSON.parse(localStorage.getItem("userCart"));
  const countinput = document.querySelector(`.quantity-input${id}`);
  const cartInputData = cartData.filter((item) => Number(item.id) === id);
  let cartCountInput = cartData.map((item) => {
    if (Number(item.id) == id) {
      return {
        ...item,
        quantity: parseInt(countinput.value, 10),
      };
    } else return item;
  });
  cartData = cartCountInput;
  localStorage.setItem("userCart", JSON.stringify(cartData));
  updateCartCount();
  location.reload(true);
};

// 휴지통 누르면 로컬스토리지에서 삭제
const cartin = (x) => {
  const detailWrap = document.querySelector(`.detailWrap${x}`);
  detailWrap.remove();
  const deleted_Data = cartData.filter((item) => Number(item.id) !== x);
  cartData = deleted_Data;
  localStorage.setItem("userCart", JSON.stringify(cartData));
  updateCartCount();
  location.reload(true); // 테이블 만드는 함수 가져올 것
};

// 전체 장바구니 지우기 누르면 로컬스토리지에서 삭제
const cartout = () => {
  Swal.fire({
    title: '<h2 style="font-size:22px;">장바구니를 비우시겠습니까?</h2>',
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
    title: '<h2 style="font-size:20px;">로그인 기능은 준비 중입니다.</h2>',
    icon: "warning",
  });
};

const buynow = () => {
  Swal.fire({
    title: '<h2 style="font-size:20px;">주문하기 기능은 준비 중입니다.</h2>',
    icon: "warning",
  });
};
