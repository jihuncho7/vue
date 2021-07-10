<template>
  <div id="HireStaff">
    <main>
      <!-- 페이지 상단 버튼 -->
      <div class="communitybtn-group" role="group">
        <router-link to="/HireStaff">
          <button class="btnhsa" type="button">스탭 구인</button>
        </router-link>
        <router-link to="/HireActor">
          <button class="btnhsa" type="button">액터스 구인</button>
        </router-link>
        <router-link to="/StaffBoard">
          <button class="btnha" type="button">스탭 구직</button>
        </router-link>
        <router-link to="/ActorBoard">
          <button class="btnhsa" type="button">액터스 구직</button>
        </router-link>
      </div>

      <!-- 박스오피스 영역시작 -->
      <div class="header">
        <h2>박스 오피스</h2>
        <!-- 좌우 스크롤 버튼 -->
        <nav>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" @click="$refs.StreamList.prev()">
            <path d="M18 3.375C15.1075 3.375 12.2799 4.23274 9.87479 5.83976C7.46972 7.44677 5.5952 9.73089 4.48827 12.4033C3.38134 15.0756 3.09171 18.0162 3.65602 20.8532C4.22033 23.6902 5.61323 26.2961 7.65857 28.3414C9.70391 30.3868 12.3098 31.7797 15.1468 32.344C17.9838 32.9083 20.9244 32.6187 23.5968 31.5117C26.2691 30.4048 28.5532 28.5303 30.1602 26.1252C31.7673 23.7201 32.625 20.8926 32.625 18C32.6206 14.1226 31.0784 10.4052 28.3366 7.66341C25.5948 4.92165 21.8774 3.37939 18 3.375ZM18 30.375C15.5525 30.375 13.1599 29.6492 11.1248 28.2894C9.08977 26.9297 7.50363 24.9969 6.567 22.7357C5.63036 20.4745 5.3853 17.9863 5.86279 15.5858C6.34028 13.1852 7.51889 10.9802 9.24956 9.24955C10.9802 7.51888 13.1852 6.34027 15.5858 5.86278C17.9863 5.38529 20.4745 5.63036 22.7357 6.56699C24.997 7.50363 26.9297 9.08976 28.2894 11.1248C29.6492 13.1599 30.375 15.5525 30.375 18C30.3713 21.2809 29.0663 24.4264 26.7463 26.7463C24.4264 29.0663 21.2809 30.3713 18 30.375ZM21.0026 13.7737L16.3067 18L21.0026 22.2263C21.1132 22.325 21.2031 22.4445 21.2674 22.578C21.3316 22.7115 21.3688 22.8563 21.3769 23.0043C21.385 23.1522 21.3638 23.3002 21.3145 23.4399C21.2653 23.5797 21.1889 23.7083 21.0898 23.8184C20.9907 23.9285 20.8708 24.0179 20.737 24.0816C20.6032 24.1452 20.4582 24.1818 20.3103 24.1893C20.1623 24.1968 20.0143 24.1749 19.8748 24.1251C19.7353 24.0752 19.6071 23.9982 19.4974 23.8987L13.8724 18.8362C13.7552 18.7307 13.6615 18.6017 13.5973 18.4577C13.5332 18.3136 13.5 18.1577 13.5 18C13.5 17.8423 13.5332 17.6864 13.5973 17.5423C13.6615 17.3983 13.7552 17.2693 13.8724 17.1638L19.4974 12.1013C19.7194 11.9032 20.0108 11.8012 20.3079 11.8174C20.605 11.8337 20.8835 11.967 21.0826 12.1881C21.2816 12.4092 21.385 12.7002 21.37 12.9974C21.355 13.2945 21.2229 13.5737 21.0026 13.7737Z" fill="#EBEBF5" fill-opacity="0.6"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" @click="$refs.StreamList.next()">
            <path d="M18 32.625C20.8925 32.625 23.7201 31.7673 26.1252 30.1602C28.5303 28.5532 30.4048 26.2691 31.5117 23.5967C32.6187 20.9244 32.9083 17.9838 32.344 15.1468C31.7797 12.3098 30.3868 9.7039 28.3414 7.65856C26.2961 5.61322 23.6902 4.22032 20.8532 3.65601C18.0162 3.09171 15.0756 3.38133 12.4033 4.48826C9.73088 5.59519 7.44677 7.46971 5.83975 9.87478C4.23274 12.2799 3.375 15.1074 3.375 18C3.37939 21.8774 4.92164 25.5948 7.66341 28.3366C10.4052 31.0784 14.1226 32.6206 18 32.625ZM18 5.625C20.4475 5.625 22.8401 6.35078 24.8752 7.71056C26.9102 9.07035 28.4964 11.0031 29.433 13.2643C30.3696 15.5255 30.6147 18.0137 30.1372 20.4142C29.6597 22.8148 28.4811 25.0198 26.7504 26.7504C25.0198 28.4811 22.8148 29.6597 20.4142 30.1372C18.0137 30.6147 15.5255 30.3696 13.2643 29.433C11.0031 28.4964 9.07034 26.9102 7.71056 24.8752C6.35078 22.8401 5.625 20.4475 5.625 18C5.62872 14.7191 6.9337 11.5736 9.25366 9.25366C11.5736 6.93371 14.7191 5.62872 18 5.625ZM14.9974 22.2263L19.6933 18L14.9974 13.7737C14.8868 13.675 14.7969 13.5555 14.7326 13.422C14.6684 13.2885 14.6312 13.1437 14.6231 12.9957C14.615 12.8478 14.6362 12.6998 14.6855 12.56C14.7347 12.4203 14.8111 12.2917 14.9102 12.1816C15.0093 12.0715 15.1292 11.9821 15.263 11.9184C15.3968 11.8548 15.5418 11.8182 15.6898 11.8107C15.8377 11.8032 15.9857 11.8251 16.1252 11.8749C16.2647 11.9248 16.3929 12.0018 16.5026 12.1013L22.1276 17.1638C22.2448 17.2693 22.3385 17.3983 22.4027 17.5423C22.4668 17.6864 22.5 17.8423 22.5 18C22.5 18.1577 22.4668 18.3136 22.4027 18.4577C22.3385 18.6017 22.2448 18.7307 22.1276 18.8362L16.5026 23.8987C16.2806 24.0968 15.9892 24.1988 15.6921 24.1826C15.395 24.1663 15.1165 24.033 14.9174 23.8119C14.7184 23.5908 14.615 23.2998 14.63 23.0026C14.645 22.7055 14.7771 22.4263 14.9974 22.2263Z" fill="white"/>
          </svg>
        </nav>
      </div>
      <!-- 박스오피스 목록 -->
      <vue-horizontal ref="StreamList" class="horizontal" :button="false">
        <div class="item" v-for="item in axiosget_staff" :key="item.id">
          <div class="overlay">
            <div class="image" @click="goToView(item)" :style="{background: `url(${item.image})`}">
            </div>
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="name">{{ item.category }}</div>
          <div class="description">{{ item.title }}</div>
        </div>
      </vue-horizontal>



    </main>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      filmR: [],
      filmE: [],
      filmS: [],
      axiosget_staff: '',
    }
  },

  // main.js로부터 데이터 호출하는 영역
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/resumestaffboard"
    })
        .then(response => {
          this.axiosget_staff = response.data;
        })
        .catch(response => {
          console.log("Failed", response);
        })

  },
  methods:{
    goToView: function(viewData) {
      this.$router.push({name: 'StaffBoardDetail',
        params: {
          id: viewData.id,
          hit: viewData.hit,
        }});
      axios({
        method: "PATCH",
        url: "http://127.0.0.1:8000/film/resumestaffboard/" + viewData.id + "/",
        data: {
          hit: viewData.hit + 1,
        },
      })
    }
  }
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
</style>