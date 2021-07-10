<template>
  <div>
    <div class="freeboardTop">
      <!-- 상단 페이지 버튼 -->
      <div class="communitybtn-group" role="group">
        <router-link to="/Community">
          <button class="btnc" type="button">영화 리뷰</button>
        </router-link>
        <router-link to="/Freeboard">
          <button class="btnfa" type="button">자유 게시판</button>
        </router-link>
      </div>

      <!-- 목록보기 버튼 -->
      <div class="readHeader">
        <table>
          <tr>
            <td>
              <router-link to="/Resumestaff">
                <b-icon class="cancelArrow" icon="arrow-left-short" style="width:80; height:80px"></b-icon>
              </router-link>
            </td>
            <td><h2>목록 보기</h2></td>
          </tr>
        </table>
      </div>
    </div>
    <div id="readPage">
    <b-container class="bv-example-row" style="background-color: white; color:black; margin-top: 200px">
        <b-button>이력서 등록</b-button>
        <b-button>게시판 선택 버튼</b-button>
        <b-button>저장</b-button>
    </b-container>
    <!-- 자유게시글 내용 시작-->

    <form @submit.prevent="updateForm">
        <div id="readTitle">
          <h2>
            <input type="text" v-model="axiosget.title" ref="title" style="width:100%; border:none;">
          </h2>
        </div>
        <div id="readWriter">
<!--이미지 쿼리    -->
          <img v-if="img_url===null" src="@/assets/static/mypage/no_img.svg" alt="">
          <img v-else-if="axiosget.image" type="text" v-bind:src="axiosget.image" ref="writer" style="width:250px; height: 250px; border:none;">

          <img v-else :src="img_url" style="width: 250px;height: 250px"/>
          <input type="file" ref="image" @change="onFileChange" />

          <input type="text" v-model="axiosget.email" ref="writer" style="width:100%; border:none;">
          <input type="text" v-model="axiosget.name" ref="writer" style="width:100%; border:none;">
          <input type="text" v-model="axiosget.category" ref="writer" style="width:100%; border:none;">
          <input type="text" v-model="axiosget.tel" ref="writer" style="width:100%; border:none;">

        </div>
        <div id="readContent">
          <textarea id="Content" v-model="axiosget.context" ref="content"></textarea>
        </div>

        <div id="updateBtn">
          <b-button type="submit" variant="primary">수정하기</b-button>
        </div>


    </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      axiosget: [],
      freeboardData: [],
      id: '',
      method:'',
      img_url: '',
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/resumestaff/" + this.$route.params.id + "/"
    })
        .then(response => {
          this.axiosget = response.data;
          this.img_url = response.data.image;
        })
        .catch(response => {
          console.log("Failed", response);
        })
  },

  methods: {
    onFileChange(e) { //이미지쿼리
      const file = e.target.files[0];
      this.img_url = URL.createObjectURL(file);
      this.image = this.$refs['image'].files[0]
    },
    returnList(){ //리스트 화면으로 이동 함수
      this.$router.push({name: 'ResumeStaff', query:this.body});
    },
    goToDelete() {
      axios({
        method: "DELETE",
        url: "http://127.0.0.1:8000/film/resumestaff/" + this.$route.params.id + "/"
      })
          .then(() => {
            alert('삭제되었습니다.');
            this.returnList();
          })
          .catch(response => {
            console.log("Failed", response);
          })
    },
    updateForm: function() {
      if(!this.axiosget.title) { //제목이 없다면 값을 입력하라고 알려준다.
        alert("제목을 입력해 주세요");
        this.$refs.title.focus(); //방식으로 선택자를 찾는다.
        return;
      }
      const formData = new FormData();

      formData.append("title", this.axiosget.title);
      formData.append("email", this.axiosget.email);
      formData.append("category", this.axiosget.category);
      formData.append("tel", this.axiosget.tel);
      formData.append("context", this.axiosget.context);
      formData.append("name", this.axiosget.name);
      formData.append("image", this.image);

      axios({
        method: "PATCH",
        url: 'http://127.0.0.1:8000/film/resumestaff/' + this.$route.params.id + "/",
        data: formData
      })
          .then(() => {
            alert('수정되었습니다.');
            this.returnList();
          })
          .catch((error) => {
            console.log("Failed to get userList", error.response);
          });
    }
  }
}
</script>


<style>
.readHeader {
  margin-top: -15px;
  margin-bottom: -30px;
}

#readPage {
  background-color: white;
  border-radius: 10px;
  padding: 10%;
}

#readTitle {
  margin-bottom: 20px;
}

#readWriter {
  border-bottom: 1px solid black;
  font-size: 18px;
  padding-bottom: 20px;
}

#readContent {
  border-bottom: 1px solid black;
  margin-top: 30px;
  resize:none;
  border:none;
  width:100%;
  height:300px;
}

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

.btnc {
  background: #4B4A4A;
  color: #ebebf5;
  border: none;
  margin-right: 20px;
}

.btnfa {
  background-color: #231909;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
}
</style>
