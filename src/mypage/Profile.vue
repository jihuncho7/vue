<template>

  <div>

      <!-- 상단 페이지 버튼 -->
      <div class="d-flex bd-highlight">
        <div id="sidebar" style="margin-top:125px!important; background-color: #231909; min-width: 252px!important; height: 1247px" class="mt-5 p-2 bd-highlight">

          <b-button block class="btn border-0" style="color: darkgrey; text-align: left ">
            <router-link style="text-decoration: none; color: inherit;" to="/profile">
            <img src="@/assets/static/mypage/my-p.svg" alt="">
            내 프로필
          </router-link>
          </b-button>

          <b-button block class="btn border-0" style="color: darkgrey; text-align: left">
            <router-link style="text-decoration: none; color: inherit;" to="/ResumeList">
            <img src="@/assets/static/mypage/my-p2.svg" alt="" >
            이력서 등록,관리
            </router-link>
          </b-button>

          <b-button block class="btn border-0" style="color: darkgrey;text-align: left;">
            <router-link style="text-decoration: none; color: inherit;" to="/mypostlist">
            <img src="@/assets/static/mypage/my-p3.svg" alt="">
            내 글 관리
            </router-link>
          </b-button>
          <b-button block class="btn border-0" style="color: darkgrey;text-align: left;">
            <img src="@/assets/static/mypage/my-p4.svg" alt="">
            고객 센터
          </b-button>
        </div>
        <!-- 자유게시글 내용 시작-->

        <div id="wrapper" class="mt-5 p-5 flex-grow-1 bd-highlight">
          <form @submit.prevent="sendForm">
            <h2 class="mb-5">내 프로필 정보</h2>
          <div class="wrapper-2 d-flex">
            <div id="preview" class="d-flex flex-column">

              <img v-if="url" :src="url" style="width: 250px;height: 250px;border-radius: 15px;"/>
              <img v-else-if="image" :src="image" style="width: 250px;height: 250px;border-radius: 15px;"/>
              <img v-else src="@/assets/static/mypage/no_img.svg" style="width: 250px;height: 250px;border-radius: 15px;"/>
              <div class="filebox mx-auto">
            <input id="ex_filename" class="upload-hidden" type="file" ref="image" @change="onFileChange"/>
              <label for="ex_filename">+프로필 사진 업로드</label>
              </div>

            </div>
            <div class="inptext">
              <label>이메일:</label>
              <b-form-input v-model="email" class="p-2 bd-highlight" style=""></b-form-input>
              <label>전화번호:</label>
              <b-form-input v-model="phone"></b-form-input>
              <label>이름:</label>
              <b-form-input v-model="username"></b-form-input>
              <b-button class="float-right mr-n5 mt-n2" style="color: #282B31; background-color: #FFFFFF" type="submit" variant="secondary">저장하기</b-button>
            </div>

<!--            소셜 체크-->

            <div class="social d-flex flex-column">
              <img src="@/assets/static/mypage/google.svg" style="max-width: 40px; max-height: 40px;" alt="google">
              <img src="@/assets/static/mypage/naver.svg" style="margin-left: -8px;" alt="naver">
              <img src="@/assets/static/mypage/kakao.svg" style="max-width: 40px; max-height: 40px;" alt="kakao">
            </div>
            <div class="social_cked">

              <p>google</p>
              <p>naver</p>
              <p>kakao</p>

            </div>
            <div v-if="social ==='google'" class="position-absolute" style="margin-left: 1040px; margin-top: 5px;">
              <img src="@/assets/static/mypage/social_clicked.svg" alt="">
            </div>
            <div v-if="social ==='naver'" class="position-absolute" style="margin-left: 1040px; margin-top: 63px;">
              <img src="@/assets/static/mypage/social_clicked.svg" alt="">
            </div>
            <div v-if="social ==='kakao'" class="position-absolute" style="margin-left: 1040px; margin-top: 120px;">
              <img src="@/assets/static/mypage/social_clicked.svg" alt="">
            </div>


            <!--            지원현황 출력-->




          </div>


          </form>

          <label class="">지원 현황</label>
          <div id="apply_icon" class="d-flex flex-column">
            <div class="mb-n3"><img  src="@/assets/static/mypage/heart.svg" alt="">
              <div class="d-flex flex-column pt-4 ml-3" style="min-height: 30px">
                <h5>{{ likes }}</h5>
              관심 공고
              </div>
            </div>

            <div class="mb-n3"><img src="@/assets/static/mypage/ppl.svg" alt="">
              <div class="d-flex flex-column pt-4 ml-3">
                <h5>{{ resumes_hit }}</h5>
                내 이력서 열람
              </div>
            </div>
            <div class="mb-n3"><img src="@/assets/static/mypage/cal.svg" alt="">
              <div class="d-flex flex-column pt-4 ml-3">
                <h5>{{ applied }}</h5>
                지원 완료
              </div>
            </div>
          </div>
          <div class="freeboardList">

          </div>
        </div>


      </div>

    </div>

</template>

<script>
import axios from 'axios';
import dayjs from "dayjs";

export default {
  data() {
    return {
      axiosget : '',
      axiosget_count : '',
      email: '',
      id: '',
      method: '',
      url:null,
      image:'',
      social: '',
      likes: '',
      applied:'',
      resumes_hit:'',
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/login/profile/"
    })
        .then(response => {
          this.axiosget = response.data;

          this.email = this.axiosget[0].email
          this.id = this.axiosget[0].id
          this.social = this.axiosget[0].social
          this.image = this.axiosget[0].image
          this.phone = this.axiosget[0].phone
          this.username = this.axiosget[0].username
        })
        .catch(response => {
          console.log("Failed", response);
        })
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/CountLikedPost"
    })
        .then(response => {
          this.axiosget_count = response.data;
          this.likes = this.axiosget_count.likes
          this.applied = this.axiosget_count.applied
          this.resumes_hit = this.axiosget_count.resumes_hit
        })
        .catch(response => {
          console.log("Failed", response);
        })
  },
  methods: {
    sendForm() {

      const formData = new FormData();

      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("username", this.username);
      if(this.image!==null){
      formData.append("image", this.image);
      }
      

      axios({
        method: "PUT",
        url: 'http://127.0.0.1:8000/login/profile/'+this.id +'/',
        data: formData,
        header: { 'Content-Type': 'multipart/form-data' },
      })

          .then((response) => {
            this.freeboard = response.data;
            alert('수정되었습니다.');
            this.returnList();
          })
          .catch((error) => {
            console.log("Failed", error.response);
          });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.image = this.$refs['image'].files[0]
     
    },

    refresh() { //리스트 화면으로 이동 함수
      this.$router.go(0)
    },
    // goToUpdate: function (updateData) {
    //   // this.$router.push({name: 'FreeUpdate', TODO 업데이트 구현
    //   //   params: {
    //   //     id: updateData.id,
    //   //   }});
    // },
    goToDelete(post_id) {
      axios({
        method: "DELETE",
        url: "http://127.0.0.1:8000/film/resumestaff/" + post_id + "/"
      })
          .then((response) => {
            this.freeboard = response.data;
            alert('삭제되었습니다.');
            this.refresh();
          })
          .catch(response => {
            console.log("Failed", response);
          })
    },
    // 작성시간 관리 기능
    timefromnow: function (data) {

      return dayjs(data).format('YYYY.MM.DD')
    },
    goToView: function (viewData) {
      this.$router.push({
        name: 'HireStaffDetail',
        params: {
          id: viewData.id,
          hit: viewData.hit,
        }
      });
    },


  }
}
</script>

<style scoped>
#wrapper {
  background-color: #FFFFFF;
  position: relative;
  padding-left: 120px!important;
}

#sidebar * {
  background-color: #231909;
  color: #FFFFFF;
}
.inptext input{
  margin-left: 74px;
  min-width: 430px;
  background: #DDE1E8;
  border-radius: 15px;
  margin-bottom:41px ;
  min-height: 40px;

}
.inptext label{
  margin-left: 70px;
}

.filebox label {
  margin-top: 20px;
  display: inline-block;
  padding: .5em .75em;
  color: #999;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: white;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: .25em;
  min-width: 250px;
  text-align: center;
}

.filebox input[type="file"] {
  /* 파일 필드 숨기기 */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.social{
margin-left: 160px;

}
.social *{
  margin-bottom: 10px;
}
.social_cked *{
  margin-top: 5px;
  margin-bottom: 35px;
}
#apply_icon img{
  max-width: 40px;
  margin-bottom: 20px;

}
#apply_icon div{

  margin-bottom: 40px;
  display: flex;
  font-size: 12px;
}
</style>