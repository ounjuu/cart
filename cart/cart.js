let cartData = [];
const cart_wrap = document.querySelector(".cart_wrap"); //html에 넣을 곳
window.onload = function () {
  const cartbtn_wrap = document.querySelector(".cartbtn_wrap"); // 버튼
  const getDate = JSON.parse(localStorage.getItem("userCart"));

  if (getDate) {
    cartData.push(...getDate);
    cartbtn_wrap.style.display = "block";

    const makeBox = cartData.map((x) => {
      return `<div class="cart_divs detailWrap${x.id}">
              <div class="detailboxWrap">
                <div class="imgWrap"><img src="${x.image}" alt="productimage" /></div>
                <div class="productName">상품명: ${x.name}</div>
                <div class="productPrice">가격: ${x.age}</div>
                <div class="productdetail">상세: ${x.year}</div>
                <div class="buttonWrap"><button class="cartin" onclick="cartin(${x.id})"><i class="fa-solid fa-trash-can"></i></button></div>
              </div>
            </div>`;
    });

    cart_wrap.innerHTML = makeBox.join("");
    //장바구니 비우기 전체 버튼
    cartbtn_wrap.innerHTML = `<button class="cartout" onclick="cartout()">장바구니 비우기</button>`;
  } else {
    console.log("dddd");
    cart_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/>
    </div>`; //데이터 없는 경우 텅 띄우기
    cartbtn_wrap.style.display = "none";
  }
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
};

// 전체 장바구니 지우기 누르면 로컬스토리지에서 삭제
const cartout = () => {
  // 장바구니 목록 전체 삭제
  //const cart_wrap = document.querySelector(".cart_wrap");
  cart_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/></div>`;
  document.querySelector(".cartbtn_wrap").style.display = "none";
  // 로컬스토리지 초기화
  localStorage.removeItem("userCart");
};
