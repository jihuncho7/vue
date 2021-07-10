<template>
  <div>
    <div class="freeboardTop">
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


      <div class="writeHeader">
        <table>
          <tr>
            <td>
              <router-link to="/Resumestaff">
                <b-icon class="cancelArrow" icon="arrow-left-short" style="width:80; height:80px"></b-icon>
              </router-link>
            </td>
            <td><h2>취소</h2></td>
          </tr>
        </table>
      </div>
    </div>





    <form @submit.prevent="sendForm">
      <div id="writePage">
        <div id="writePageTitle">
          <div id="writePageHeader"><h1>스탭 구인 글쓰기</h1></div>
          <div id="writePageSubmit">
            <b-button type="submit" variant="primary">등록</b-button>
          </div>
        </div>
        <div id="preview">

          <img v-if="url" :src="url" style="width: 250px;height: 250px"/>
          <img v-else src="@/assets/static/mypage/no_img.svg" style="width: 250px;height: 250px"/>
        </div>
        <input type="file" ref="image" @change="onFileChange" />
        <div id="writeTitle">
          <input type="text" v-model="title" ref="title" style="font-size:30px; border:none;" placeholder="제목을 입력하세요">
          <input type="text" v-model="email" ref="title" style="font-size:30px; border:none;" placeholder="이메일을 입력하세요">
          <input type="text" v-model="name" ref="title" style="font-size:30px; border:none;" placeholder="이름을 입력하세요">
          <input type="text" v-model="category" ref="title" style="font-size:30px; border:none;" placeholder="카테고리를 입력하세요">
          <input type="text" v-model="tel" ref="title" style="font-size:30px; border:none;" placeholder="전번을 입력하세요">
          <input type="text" v-model="payment" ref="title" style="font-size:30px; border:none;" placeholder="페이 입력">
          <input type="text" v-model="requirement" ref="title" style="font-size:30px; border:none;" placeholder="요구능력">
          <input type="text" v-model="company" ref="title" style="font-size:30px; border:none;" placeholder="회사명">
          <input type="text" v-model="company_desc" ref="title" style="font-size:30px; border:none;" placeholder="회사정보 입력하세요">
<!--          <input type="text" v-model="deadline" ref="title" style="font-size:30px; border:none;" placeholder="마감 기한">-->
          <input type="text" v-model="job_position" ref="title" style="font-size:30px; border:none;" placeholder="구인 직종">

        </div>
        <div id="writeContent">
          <textarea id="Content" v-model="context" ref="content" placeholder="자기소개"></textarea>
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
      title: "",
      email: "",
      category: "",
      tel: "",
      name: "",
      image: "",
      context: "",
      form: "",
      url:null,
      payment:"",
      requirement:"",
      company:"",
      company_desc:"",
      deadline:"2021-06-17T21:33:00+09:00",
      job_position:"",

    }
  },
  props:["propsdata"],
  methods:{
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.image = this.$refs['image'].files[0]
    },
    returnList(){ //리스트 화면으로 이동 함수
      this.$router.push({path:'./HireStaff',query:this.body});
    },
    sendForm() {
      if(!this.title) { //제목이 없다면 값을 입력하라고 알려준다.
        alert("제목을 입력해 주세요");
        this.$refs.title.focus(); //방식으로 선택자를 찾는다.
        return;
      }

      const formData = new FormData();

      formData.append("title", this.title);
      formData.append("email", this.email);
      formData.append("category", this.category);
      formData.append("tel", this.tel);
      formData.append("context", this.context);
      formData.append("name", this.name);
      formData.append("image", this.image);
      formData.append("payment", this.payment);
      formData.append("requirement", this.requirement);
      formData.append("company", this.company);
      formData.append("company_desc", this.company_desc);
      formData.append("deadline", this.deadline);
      formData.append("job_position", this.job_position);

          axios({
            method: "POST",
            url: 'http://127.0.0.1:8000/film/hirepoststaff/',
            data: formData,
            header: { 'Content-Type': 'multipart/form-data' },
          })

              .then((response) => {
                this.freeboard = response.data;
                alert('등록되었습니다.');
                this.returnList();
              })
              .catch((error) => {
                console.log("Failed", error.response);
              });
    }
  }
}
</script>


<style>
.writeHeader {
  margin-top: -15px;
  margin-bottom: -30px;
}

#writePage {
  background-color: white;
  border-radius: 10px;
  padding: 10%;
}

#writePageTitle {
  margin-top:-40px;
  border-bottom: 1px solid black;
  padding-bottom: 60px;
}

#writePageHeader {
  float:left;
}

#writePageSubmit {
  float:right;
}


#writeTitle {
  border-bottom: 1px solid black;
  margin-top: 30px;
}

#writeContent {
  border-bottom: 1px solid black;
}

#Content {
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
