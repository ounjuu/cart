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
    return `<div class="detailWrap">
            <div class="detailboxWrap">
              <div class="imgWrap"><img src="${product.image}" alt="productimage" /></div>
              <div class="productName">상품명: ${product.name}</div>
              <div class="productPrice">가격: ${product.age}</div>
              <div class="productdetail">상세내용: ${product.year}</div>
              <div class="buttonWrap"><button onclick="cartin(${product.id})">장바구니 담기</button></div>
            </div>
          </div>`;
  }
  const product_wrap = document.querySelector(".product_wrap"); //html에 넣을 곳
  product_wrap.innerHTML = makeBox();
};

const cartin = (x) => {
  const cartProduct = data.find((item) => Number(item.id) == x);

  cartData.push(cartProduct);

  localStorage.setItem("userCart", JSON.stringify(cartData));
  window.location.href = "cart.html";
};

console.log(cartData);

/////시험중
// const params = new URLSearchParams(window.location.search);

// // 2. URL 파라미터에서 상품 ID 가져오기

// const dataId = params.get("id"); // URL에 ?id=값을 가져옴
// console.log(dataId);
// // 3. 상품 데이터에서 해당 ID의 상품 찾기
// const product = data.find((item) => item.id === dataId);

// // 4. 상품 상세 내용을 HTML에 렌더링
// const productDetailDiv = document.getElementById("productDetail");

// if (product) {
//   // 상품이 존재하는 경우 상세 내용을 출력
//   productDetailDiv.innerHTML = `
//     <h1>${product.name}</h1>
//     <p>${product.description}</p>
//     <p>가격: ${product.price}</p>
//   `;
// } else {
//   // 상품이 없는 경우 안내 메시지 출력
//   productDetailDiv.innerHTML = `<p>상품을 찾을 수 없습니다.</p>`;
// }
// console.log(params);

// const productListDiv = document.getElementById("productList");

// products.forEach((product) => {
//   const link = document.createElement("a");
//   link.href = `?id=${product.id}`;
//   link.textContent = product.name;
//   productListDiv.appendChild(link);
// });

// 맵
//   const makeBox = data.map((x, i) => {
//     return `<div class="detailWrap">
//       <div class="detailboxWrap">
//         <div class="imgWrap"><img src="./image/empty.png" alt="" /></div>
//         <div class="productName">상품명:</div>
//         <div class="productPrice">가격:</div>
//         <div class="productdetail">상세내용:</div>
//         <div class="buttonWrap"><button>장바구니 담기</button></div>
//       </div>
//     </div>`;
//   });
//   const product_wrap = document.querySelector(".product_wrap"); //html에 넣을 곳
//   product_wrap.innerHTML = makeBox.join("");
//   console.log(makeBox);
// };
