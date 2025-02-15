
# :handbag: ALLROCK 장바구니 구현 README
<div align="center">
  <img width="932" alt="image" src="https://github.com/user-attachments/assets/d08189e4-2ce0-46a0-9029-24ba31a3e70e" />
</div>

## :page_facing_up: 프로젝트 소개
1. <b>ALLROCK(ALLCLIMB) 프로젝트</b>의 연장선 (국내 클라이밍장 소식을 모은 사이트)
2. <b>SHOP 기능 구현 (로컬스토리지 사용)</b><br/><br/>

## :high_brightness: 개발 환경
<div align="center"><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/></div>
<br/><br/>

## :hammer: 주요기능
###  1. 관리자 페이지 
#### ✅  관리자 페이지에서 상품 등록<br/>
1. 상품 등록 시 oninput으로 조건 검사 후 조건을 충족하지 않는 경우 하단에 경고 문구 활성화<br/>
2. 조건이 모두 충족 되면 저장 버튼 활성화<br/>
3. 저장 시 상품 이미지는 랜덤으로 등록 되도록 설정<br/>
4. 하단의 상품은 수정 및 삭제 가능(로컬스토리지에서도 수정 및 삭제)<br/>
5. 등록한 상품은 메인 페이지에서도 확인 가능<br/>
6. 헤더의 로고를 누르면 메인 페이지로 이동, 장바구니 버튼을 누르면 장바구니로 이동, 로그인 버튼을 누르면 준비 중 alert창 나타남<br/>
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/ece75d72-24c8-4b44-8ce7-81679dfa753c" /></div>
<br/>
<br/>

###  2. SHOP 메인 페이지 
#### ✅  등록한 상품 - 메인 페이지에서 확인 가능<br/>
1. 메인 쇼핑몰 페이지에서 등록한 상품 확인 가능(로컬스토리지)<br/>
2. 각 메뉴명을 누르면 등록 시 설정한 카테고리별 상품 확인 가능<br/>
3. 상품의 좋아요 버튼 누르면 새로고침 후에도 유지(로컬스토리지)<br/>
4. 상품을 클릭하면 상품 상세페이지로 이동 (URL 파라미터)<br/>
5. 캐러셀 - 부트스트랩과 스와이퍼로 구현<br/>
6. hover시 이미지 크기 변환 및 밑줄 효과<br/><br/>
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/f473d9c3-615f-4fd8-b97a-08dc5c37a26a" /></div>
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/1dd05649-381a-4c8e-bb6b-28b14cb30170" /></div>
<br/><br/>

###  3. SHOP 상세 페이지 
#### ✅  장바구니 담기 및 새로운 상품 추천<br/>

1. 상세페이지에서 장바구니 담기 버튼을 누르면 장바구니에 담김<br/>
2. 하단에 새로운 상품들 추천 이미지 - hover시 다른 이미지로 변경<br/>
3. 메인 페이지의 좋아요 버튼 클릭 여부 유지 및 변경 가능 (로컬스토리지)<br/>
4. 준비 중인 기능들은 sweetalert 사용하여 "준비 중입니다." 안내창 띄움<br/>
5. 같은 상품은 장바구니에 담기지 않도록 설정, 중복 시 안내창 띄움 <br/>
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/e3f70eba-cc9e-4d45-892f-6f00ea84bfaa" /></div>
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/fb67d8f4-25da-4e8f-bf75-b2ec20eaaf00" /></div>
<br/><br/>

###  4. SHOP 장바구니 페이지 
#### ✅ 총 금액 계산 및 장바구니 상품 삭제<br/>
1. 장바구니 총 금액 및 개수 계산<br/>
2. 휴지통 버튼 클릭 시 해당 상품 삭제 및 총 금액 변경<br/>
3. 장바구니 비우기 버튼 클릭 시 alert창 -> 삭제 누르면 전체 상품 삭제<br/>
4. 전체 상품 삭제 시 "장바구니가 비어있습니다." 이미지 보이게 설정<br/>
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/6e587b78-61db-4d6c-9d8b-fe75b8addc4a" /></div>
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/cf6ab2f2-4dfc-4214-aaad-4fe57cac3d25" /></div>
<br/><br/>

## :star: 추가 구현 완료 리스트

### ➕ 페이지네이션 추가(관리자 페이지, 메인 페이지)
### ➕ 엑셀 다운로드 가능(관리자 페이지 상품들)
### ➕ 관리자 페이지 type 옵션 수정 가능하도록 추가
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/b3c5fb05-b500-4586-bcf7-c1f0f0f7b367" /></div>


### ➕ 장바구니 수량 변경 가능하게 업데이트
### ➕ 100,000원 이상인 경우 배송비 0원으로 변경

<img width="80%" alt="image" src="https://github.com/user-attachments/assets/185867c2-7520-4dd1-90a2-7c758811a45e" /></div>

### ➕ 찜버튼 누른 상품들 볼 수 있는 페이지 추가
<div align="center">
<img width="80%" alt="image" src="https://github.com/user-attachments/assets/105135d2-9ece-491d-83fa-5625ef2d456a" /></div>

