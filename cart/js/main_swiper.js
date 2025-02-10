const swiper = new Swiper(".swiper-container", {
  loop: true, // 무한 루프
  autoplay: {
    delay: 2500, // 2.5초마다 슬라이드
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
