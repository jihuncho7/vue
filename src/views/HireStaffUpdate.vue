<template>
  <div>
    <div class="freeboardTop">
      <!-- 페이지 상단 버튼 -->
      <!-- 페이지 상단 버튼 -->
      <div class="communitybtn-group" role="group">
        <router-link to="/HireStaff">
          <button class="btnha" type="button">스탭 구인</button>
        </router-link>
        <router-link to="/HireActor">
          <button class="btnhsa" type="button">액터스 구인</button>
        </router-link>
        <router-link to="/StaffBoard">
          <button class="btnhsa" type="button">스탭 구직</button>
        </router-link>
        <router-link to="/ActorBoard">
          <button class="btnhsa" type="button">액터스 구직</button>
        </router-link>
      </div>


      <div class="readHeader">
        <table>
          <tr>
            <td>
              <b-icon class="cancelArrow" icon="arrow-left-short" style="width:80; height:80px"></b-icon>
            </td>
            <td><h2>취소</h2></td>
          </tr>
        </table>
      </div>
    </div>
    <form @submit.prevent="updateForm">
      <div id="readPage">
        <div id="preview">

          <img v-if="url" :src="url" style="width: 250px;height: 250px"/>
          <img v-else src="@/assets/static/mypage/no_img.svg" style="width: 250px;height: 250px"/>
        </div>
        <input type="file" ref="image" @change="onFileChange" />
        <div id="readTitle">

            <input type="text" v-model="title" ref="title" style="font-size:30px; border:none;" placeholder="제목을 입력하세요">
            <input type="text" v-model="email" ref="title" style="font-size:30px; border:none;"
                   placeholder="이메일을 입력하세요">
            <input type="text" v-model="name" ref="title" style="font-size:30px; border:none;" placeholder="이름을 입력하세요">
            <input type="text" v-model="category" ref="title" style="font-size:30px; border:none;"
                   placeholder="카테고리를 입력하세요">
            <input type="text" v-model="tel" ref="title" style="font-size:30px; border:none;" placeholder="전번을 입력하세요">
            <input type="text" v-model="payment" ref="title" style="font-size:30px; border:none;" placeholder="페이 입력">
            <input type="text" v-model="requirement" ref="title" style="font-size:30px; border:none;"
                   placeholder="요구능력">
            <input type="text" v-model="company" ref="title" style="font-size:30px; border:none;" placeholder="회사명">
            <input type="text" v-model="company_desc" ref="title" style="font-size:30px; border:none;"
                   placeholder="회사정보 입력하세요">
            <!--          <input type="text" v-model="deadline" ref="title" style="font-size:30px; border:none;" placeholder="마감 기한">-->
            <input type="text" v-model="job_position" ref="title" style="font-size:30px; border:none;"
                   placeholder="구인 직종">
            <div id="writeContent">
              <textarea id="Content" v-model="context" ref="content" placeholder="세부사항"></textarea>
            </div>
            <div id="updateBtn">
              <b-button type="submit" variant="primary">수정하기</b-button>
            </div>

        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      updateData: [],
      id: "",
      title: "",
      email: "",
      name: "",
      category: "",
      telpayment: "",
      requirement: "",
      company: "",
      company_desc: "",
      job_position: "",
      context: "",
      url:null,

    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/hirepoststaff/" + this.$route.params.id + "/"
    })
        .then(response => {
          this.updateData = response.data;
          this.title = this.updateData.title
          this.email = this.updateData.email
          this.name = this.updateData.name
          this.category = this.updateData.category
          this.tel = this.updateData.tel
          this.payment   = this.updateData.payment
          this.requirement  = this.updateData.requirement
          this.company = this.updateData.company
          this.company_desc = this.updateData.company_desc
          this.job_position = this.updateData.job_position
          this.context = this.updateData.context
          this.url = this.updateData.image
        })
        .catch(response => {
          console.log("Failed", response);
        })
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.image = this.$refs['image'].files[0]
    },
    returnList() { //리스트 화면으로 이동 함수
      this.$router.go(-1);
    },

    updateForm: function () {
      if (!this.updateData.title) { //제목이 없다면 값을 입력하라고 알려준다.
        alert("제목을 입력해 주세요");
        this.$refs.title.focus(); //방식으로 선택자를 찾는다.
        return;
      }
      this.form = {
        title: this.updateData.title,
        author_username: this.updateData.author_username,
        context: this.updateData.context,
      }
      axios({
        method: "PATCH",
        url: 'http://127.0.0.1:8000/film/hirepoststaff/' + this.$route.params.id + "/",
        data: this.form,
      })
          .then((response) => {
            this.freeboard = response.data;
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
  resize: none;
  border: none;
  width: 100%;
  height: 300px;
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
  opacity: inherit;
  color: #ebebf5;
  border: none;
  margin-right: 20px;
}

.btnfa {
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
}
</style>
