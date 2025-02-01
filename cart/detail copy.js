let data = [];
let cartData = [];

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
  // URL 파라미터에서 id 추출
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // 상품 데이터 가져오기
  const product = data.find((item) => item.id == productId);

  function makeBox() {
    const formattedPrice = Number(product.age).toLocaleString() + "원";
    return `<div class="detailWrap">
            <div class="detailboxWrap">
              <div class="imgWrap"><img src="${product.image}" alt="productimage" /></div>
              <div class="productName">상품명: ${product.name}</div>
              <div class="productPrice">가격: ${formattedPrice}</div>
              <div class="productdetail">상세내용: ${product.year}</div>
              <div class="buttonWrap"><button class="cartin" onclick="cartin(${product.id})">장바구니 담기</button></div>
            </div>
          </div>`;
  }
  const product_wrap = document.querySelector(".product_wrap"); //html에 넣을 곳
  product_wrap.innerHTML = makeBox();
  updateCartCount();
};

// 장바구니 개수 업데이트 함수
const updateCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cartData.length;
};

const cartin = (x) => {
  const cartProduct = data.find((item) => Number(item.id) == x);

  // 이미 장바구니에 있는지 확인
  const exists = cartData.some((item) => Number(item.id) === x);

  if (exists) {
    Swal.fire({
      title: "이미 담겨있는 상품입니다.",
      icon: "warning",
    });
  } else {
    cartData.push(cartProduct);
    localStorage.setItem("userCart", JSON.stringify(cartData));
    updateCartCount();
    window.location.href = "cart.html";
  }
};

// 준비중입니다.
const login = () => {
  Swal.fire({
    title: "준비 중입니다.",
    icon: "warning",
  });
};
