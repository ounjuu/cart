let data = [];
let cartData = [];
let likeData = [];

window.onload = function () {
  // 로컬스토리지에서 데이터 읽기
  const getDate = JSON.parse(localStorage.getItem("userInfo"));
  if (getDate) {
    data.push(...getDate);
  }

  const getDate2 = JSON.parse(localStorage.getItem("userCart"));
  if (getDate2) {
    cartData.push(...getDate2);
  }

  const getDate3 = JSON.parse(localStorage.getItem("userLike"));
  if (getDate3) {
    likeData.push(...getDate3); // 로컬스토리지에서 likeData를 가져오기
  }

  // URL 파라미터에서 id 추출
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // 상품 데이터 가져오기
  const product = data.find((item) => item.id == productId);

  if (product) {
    // 해당 상품이 좋아요 데이터에 있는지 확인
    let isLiked = likeData.some((item) => item.id === String(product.id));

    // 하트 아이콘 클래스 조건부 추가
    let heartClass = isLiked ? "fa-solid fa-heart liked" : "fa-solid fa-heart";

    // 박스 만들기
    function makeBox() {
      const formattedPrice = Number(product.age).toLocaleString() + "원";

      // 해당 상품이 좋아요 데이터에 있는지 확인
      isLiked = likeData.some((item) => item.id === String(product.id));

      // 하트 아이콘 클래스 조건부 추가
      heartClass = isLiked ? "fa-solid fa-heart liked" : "fa-solid fa-heart";

      return `<div class="detailWrap">
              <div class="detailboxWrap">
                <div class="imgWrap"><img src="../${product.image}" alt="productimage" /></div>
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
    updateHeartColor();
  } else {
    // 상품 정보가 없을 경우에 대한 예외 처리 (선택사항)
    console.error("상품을 찾을 수 없습니다.");
  }
};

// 좋아요 상태 저장 함수
const heartClick = (idx) => {
  // 로컬스토리지에서 likeData 읽기
  likeData = JSON.parse(localStorage.getItem("userLike")) || [];
  const likeInfo = { id: String(idx) };

  // 이미 좋아요가 된 상태인지 확인
  const isAlreadyLiked = likeData.some((like) => like.id === likeInfo.id);

  if (isAlreadyLiked) {
    likeData = likeData.filter((like) => like.id !== likeInfo.id); // 좋아요 취소
  } else {
    likeData.push(likeInfo); // 좋아요 추가
  }

  // 로컬스토리지에 저장
  localStorage.setItem("userLike", JSON.stringify(likeData));

  // 하트 색상 업데이트
  updateCartCount();
  updateHeartColor();
};

// 하트 색상 업데이트 함수
const updateHeartColor = () => {
  // 로컬스토리지에서 좋아요 정보 가져오기
  likeData = JSON.parse(localStorage.getItem("userLike")) || [];
  const hearts = document.querySelectorAll(".likeWrap i");

  hearts.forEach((heart) => {
    const heartId = heart.id.replace("like", ""); // 하트 아이콘의 id에서 숫자 추출
    const isLiked = likeData.some((like) => like.id === heartId); // 해당 id가 좋아요 목록에 있는지 확인

    if (isLiked) {
      heart.classList.add("liked"); // 좋아요 상태일 경우
    } else {
      heart.classList.remove("liked"); // 좋아요가 아닐 경우
    }
  });
};

// 장바구니 개수 업데이트 함수
const updateCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cartData.length; // 장바구니에 담긴 상품 수
};

// 장바구니에 담기 함수
const cartin = (x) => {
  // 이미 장바구니에 있는지 확인
  const exists = cartData.some((item) => Number(item.id) === x);
  const notExists = data.find((item) => Number(item.id) == x);
  const notExistsData = [notExists].map((item) => {
    return {
      ...item,
      quantity: 1,
    };
  });

  const ExistsData = cartData.map((item) => {
    if (Number(item.id) == x) {
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    } else return item;
  });

  if (exists) {
    Swal.fire({
      title:
        '<h2 style="font-size:22px; font-weight: bold;">이미 담겨있는 상품입니다. 장바구니에 담으시겠습니까?</h2>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:
            '<h2 style="font-size:22px; font-weight: bold;">장바구니에 담겼습니다.</h2>',
          icon: "success",
        });
        cartData = ExistsData; // 기존 데이터에 수량 업데이트
        localStorage.setItem("userCart", JSON.stringify(cartData));
        updateCartCount();
        updateHeartColor();
      }
    });
  } else {
    Swal.fire({
      title:
        '<h2 style="font-size:22px; font-weight: bold;">장바구니에 담으시겠습니까?</h2>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:
            '<h2 style="font-size:22px; font-weight: bold;">장바구니에 담겼습니다.</h2>',
          icon: "success",
        });
        cartData.push(...notExistsData); // 새로운 상품 추가
        localStorage.setItem("userCart", JSON.stringify(cartData));
        updateCartCount();
        updateHeartColor();
      }
    });
  }
};
