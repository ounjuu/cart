let data = [];
let cartData = [];
let likeData = [];
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

  // 해당 상품이 좋아요 데이터에 있는지 확인
  const isLiked = likeData.some((item) => item.id === String(product.id));
  // 하트 아이콘 클래스 조건부 추가
  const heartClass = isLiked ? "fa-solid fa-heart liked" : "fa-solid fa-heart";

  // 박스 만들기
  function makeBox() {
    const formattedPrice = Number(product.age).toLocaleString() + "원";

    // 해당 상품이 좋아요 데이터에 있는지 확인
    const isLiked = likeData.some((item) => item.id === String(product.id));

    // 하트 아이콘 클래스 조건부 추가
    const heartClass = isLiked
      ? "fa-solid fa-heart liked"
      : "fa-solid fa-heart";

    return `<div class="detailWrap">
            <div class="detailboxWrap">
              <div class="imgWrap"><img src="${product.image}" alt="productimage" /></div>
              <div class="column">
              <div class="productName">${product.name} <p class="NEW">NEW</p><p class="MD">MD</p></div>
              <div class="productPrice">${formattedPrice}</div>
              <div class="contentboxLine">
              <div class="productdetail">* ${product.year}</div>
              <p class="deliver"><b>배송 방법</b> 택배<br/></p>
              <p class="deliver"><b>배송비</b> 3,500원 (100,000원 이상 무료배송)</p>
              <p class="delivergray"> - 도서산간 배송비 추가<br> - 평균 배송 기간: 2~3일 (영업일 기준) <br>- 재고 상황에 따라 가격 및 할인 혜택이 변동될 수 있습니다.</p>
                            <div class="buttonWrap">
                <button class="cartin" onclick="cartin(${product.id})">장바구니 담기</button>
                <div class="likeWrap">
                <i class="${heartClass}" onclick="heartClick(${product.id})" id="like${product.id}"></i>
              </div>
              </div>
              </div>


                                          
            </div>
            </div>
          </div>`;
  }
  const product_wrap = document.querySelector(".product_wrap"); //html에 넣을 곳
  product_wrap.innerHTML = makeBox();
  updateCartCount();
  updateHeartColor(); // 페이지 로드시 하트 색상 업데이트
};

// 좋아요 상태 저장 함수
const heartClick = (idx) => {
  let likeData = JSON.parse(localStorage.getItem("userLike")) || [];
  let likeInfo = { id: String(idx) };

  const isAlreadyLiked = likeData.some((like) => like.id === likeInfo.id);

  if (isAlreadyLiked) {
    likeData = likeData.filter((like) => like.id !== likeInfo.id);
  } else {
    likeData.push(likeInfo);
  }

  // 로컬스토리지에 저장
  localStorage.setItem("userLike", JSON.stringify(likeData));

  // 하트 색상 업데이트
  updateHeartColor();
};

// 하트 색상 업데이트 함수
const updateHeartColor = () => {
  const getDate3 = JSON.parse(localStorage.getItem("userLike")) || [];
  const hearts = document.querySelectorAll(".likeWrap i");

  hearts.forEach((heart) => {
    const heartId = heart.id.replace("like", "");
    const isLiked = getDate3.some((like) => like.id === heartId);

    if (isLiked) {
      heart.classList.add("liked");
    } else {
      heart.classList.remove("liked");
    }
  });
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
    title: '<h2 style="font-size:18px;">로그인 기능은 준비 중입니다.</h2>',
    icon: "warning",
  });
};
