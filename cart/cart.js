let cartData = [];
const cart_wrap = document.querySelector(".cart_wrap"); //html에 넣을 곳
window.onload = function () {
  const cartbtn_wrap = document.querySelector(".cartbtn_wrap"); // 버튼
  const getDate = JSON.parse(localStorage.getItem("userCart"));

  if (getDate) {
    cartData.push(...getDate);
    cartbtn_wrap.style.display = "block";

    const makeBox = cartData.map((x) => {
      const formattedPrice = Number(x.age).toLocaleString() + "원";
      return `<div class="cart_divs detailWrap${x.id}">
              <div class="detailboxWrap">
                <div class="imgWrap"><img src="${x.image}" alt="productimage" /></div>
                <div class="productName">상품명: ${x.name}</div>
                <div class="productPrice">가격: ${formattedPrice}</div>
                <div class="productdetail">상세: ${x.year}</div>
                <div class="buttonWrap"><button class="cartin" onclick="cartin(${x.id})"><i class="fa-solid fa-trash-can"></i></button></div>
              </div>
            </div>`;
    });

    cart_wrap.innerHTML = makeBox.join("");
    //장바구니 비우기 전체 버튼
    cartbtn_wrap.innerHTML = `<button class="cartout" onclick="cartout()">장바구니 비우기</button>`;
  } else {
    cart_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/>
    </div>`; //데이터 없는 경우 텅 띄우기
    cartbtn_wrap.style.display = "none";
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
  const deleted_Data = cartData.filter((item) => Number(item.id) !== x);
  cartData = deleted_Data;
  if (!cartData) {
    document.querySelector(".cartbtn_wrap").style.display = "none";
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

      // 로컬스토리지 초기화
      localStorage.removeItem("userCart");
      updateCartCount();
    }
  });
};

const login = () => {
  Swal.fire({
    title: "준비 중입니다.",
    icon: "warning",
  });
};
