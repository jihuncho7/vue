<template>
  <div>
  </div>
</template>

<script>
export default {
  
}
</script>

<!-- Content Design -->
<style scoped>

/* 상단 페이지 버튼 */
.communitybtn-group button {
  width: 135px;
  height: 45px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 50px;
}

.btnca {
  background-color: #231909;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
  margin-right: 20px;
}

.btnf {
  background: #4B4A4A;
  color: #ebebf5;
  border: none;
}

/* Horizontal-List */
.image {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  padding-top: 150%;
  position: relative;
  border-radius: 10px;
}

.name {
  font-family: 'Infinity Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: #FFFFFF;
  margin-top:10px;
}

.rating {
  font-family: 'Infinity Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: rgba(235, 235, 245, 0.6);
}

.description {
font-family: 'Infinity Sans';
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 21px;
color: #FFFFFF;
}

.header {
  font-family: 'Infinity Sans WM';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 34px;
  color: #FFFFFF;
}

.nav {
  display: flex;
  align-items: center;
}

.horizontal {
  margin-top: 20px;
  margin-bottom: 50px;
}

.pageButton {
  margin-bottom: 80px;
}

</style>

<!-- Container 역할의 main을 화면 크기마다 padding 설정 -->
<style scoped>
main {
  padding: 24px;
}
@media (min-width: 768px) {
  main {
    padding: 10%;
    padding-top: 50px;
  }
}
</style>

<!-- 화면 사이즈별 나타나는 갯수 지정 -->
<style scoped>
.horizontal {
  --count: 2;
  --gap: 16px;
}

@media (min-width: 640px) {
  .horizontal {
    --count: 2;
    --gap: 24px;
  }
}

@media (min-width: 768px) {
  .horizontal {
    --count: 3;
  }
}

@media (min-width: 1024px) {
  .horizontal {
    --count: 4;
  }
}

@media (min-width: 1280px) {
  .horizontal {
    --count: 5;
  }
}

.item {
  width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
  margin-right: var(--gap);
}

.profiles {
  width: 230px;
  float: left;
  margin: 50px 50px 50px 0;
}

ul{
   list-style:none;
   padding-left:0px;
   }

</style>
