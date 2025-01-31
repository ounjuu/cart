const data = [];
const cartData = [];
// 클릭 시 url 보내기
const divClick = (x) => {
  window.location.href = `detail.html?id=${x}`;
};

// onload
window.onload = function () {
  const getDate = JSON.parse(localStorage.getItem("userInfo"));
  if (getDate) {
    data.push(...getDate);
  } else if (!getDate) {
    products_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/>
    </div>`; //데이터 없는 경우 텅 띄우기
  }

  const getDate2 = JSON.parse(localStorage.getItem("userCart"));
  if (getDate2) {
    cartData.push(...getDate2);
  } else if (!getDate2) {
  }

  const makeBox = data.map((x, i) => {
    return `<div class="divfive" onclick='divClick(${x.id})'>
      <div class="divinWrap">
        <div class="dataimage dataimage${x.id}"><img src="${x.image}" alt="productimg" 
          ></div>
        <div class="textbox">
        <div class="intextbox">
        <div class="dataname dataname${x.id}">${x.name}</div>
        <div class="dataprice dataprice${x.id}">${x.age}원</div>
        </div>
        <div class="dataheart dataheart${x.id}" onclick="heartClick(${x.id})"><i class="fa-regular fa-heart"></i><i class="hidden fa-solid fa-heart " style="color: #eb0000;"></i></div>
        </div>
      </div>
    </div>`;
  });

  const products_wrap = document.querySelector(".products_wrap"); //html에 넣을 곳
  products_wrap.innerHTML = makeBox.join("");
  updateCartCount();
};

// // 버튼 토글(미완성) -> 장바구니 로컬 스토리지랑 연결
// const heartempty = document.querySelector(".fa-regular");
// const heartfull = document.querySelector(".fa-solid");

// heartempty.addEventListener("click", () => changeClass(heartempty, heartfull));

// 준비중입니다.
const login = () => {
  Swal.fire({
    title: "준비 중입니다.",
    icon: "warning",
  });
};

// 장바구니 개수 업데이트 함수
const updateCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cartData.length;
};
