const data = [];
window.onload = function () {
  const getDate = JSON.parse(localStorage.getItem("userInfo"));
  if (getDate) {
    data.push(...getDate);
  } else if (!getDate) {
    products_wrap.innerHTML = `<div class="emptyWrap"><img src="./image/emptyalert.png" class="empty"/>
    </div>`; //데이터 없는 경우 텅 띄우기
  }

  const makeBox = data.map((x, i) => {
    return `<div class="divfive">
      <div class="divinWrap">
        <div class="dataimage dataimage${x.id}"><img src="${x.image}" alt="productimg"></div>
        <div class="textbox">
        <div class="intextbox">
        <div class="dataname dataname${x.id}">상품명: ${x.name}</div>
        <div class="dataprice dataprice${x.id}">가격: ${x.age}원</div>
        </div>
        <div class="dataheart dataheart${x.id}"><i class="fa-regular fa-heart"></i><i class="fa-solid fa-heart" style="color: #eb0000;"></i></div>
        </div>
      </div>
    </div>`;
  });
  const products_wrap = document.querySelector(".products_wrap"); //html에 넣을 곳
  products_wrap.innerHTML = makeBox.join("");
  console.log(makeBox);
};
