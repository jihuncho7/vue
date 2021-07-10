<template>
  <div>
    <div class="freeboardTop">
      <!-- 페이지 상단 버튼 -->
      <div class="communitybtn-group" role="group">
        <router-link to="/Community">
          <button class="btnc" type="button">영화 리뷰</button>
        </router-link>
        <router-link to="/Freeboard">
          <button class="btnfa" type="button">자유 게시판</button>
        </router-link>
      </div>

      <div class="writeHeader">
        <table>
          <tr>
            <td>
              <router-link to="/ResumeList">
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
                <div id="writePageHeader"><h1>이력서 등록</h1></div>
                <div id="writePageSubmit">
                    <b-button type="submit" variant="primary">등록</b-button>
                </div>
            </div>


           <div class="d-flex ">
            <div id= "userInfo">
                <div id="avatar">
                    <div id="preview">
                        <img v-if="url" :src="url" style="width: 250px;height: 250px"/>
                        <img v-else src="@/assets/static/mypage/no_img.svg" style="width: 250px;height: 250px"/>
                    </div>
                    <div class="avatar_filebox">
                        <label className="avatar_inputBtn" for="avatar_input"> *새 사진 등록하기 </label>
                        <input type="file" id="avatar_input" ref="image" @change="onFileChange" >
                    </div>
                </div>


                <div id="info"> 기본정보 </div>
                <div class="textBox">
                    <label for="username">이름</label>
                    <input type="text" id="username"  v-model="name" ref="title"  />
                    <label for="userbirth">생년월일</label>
                    <input type="text" id="userbirth" v-model="birth"/>
                    <label for="input_tel">전화번호</label>
                    <input type="text" id="input_tel" v-model="tel" >
                  공개 여부 : <input type="checkbox" v-model="is_publish">
                </div>
            </div>

            <div id="resume">
                <div class ="resume_textBox">
                    <label for="title">제목</label>
                    <input type="text" id="title" v-model="title">
                    <hr>
                    <label for="category">카테고리</label>
                    <input type="text" id="category" v-model="category">
                    <hr>
                    <label for="intro">간단소개</label>
                    <input type="text" id="intro" v-model="intro">
                    <label for="address">주소</label>
                    <input type="text" id="address" v-model="address">
                    <label for="email"> E-mail </label>
                    <input type="text" id="email" v-model="email">
                </div>

                <label class="resume_title"> 학력정보</label>
                <hr>

                <div class ="resume_textBox">
                    <label for="schoolName">학교명</label>
                    <input type="text" id="schoolName" v-model="schoolName">
                    <label for="degree">전공 및 학위</label>
                    <input type="text" id="degree" v-model="degree">
                    <label for="school_term">기간</label>
                    <input type="text" id="school_term" v-model="school_term">
                </div>
                <hr class="hr_top_term">

                <label class="resume_title">경력정보</label>
               <hr>

                <div class ="resume_textBox">
                    <label for="companyName">회사명</label>
                    <input type="text" id="companyName" v-model="companyName">
                    <label for="position">부서명/직책</label>
                    <input type="text" id="position" v-model="position">
                    <label for="company_term">기간</label>
                    <input type="text" id="company_term" v-model="company_term">
                    <label for="main_business">주요업무</label>
                    <input type="text" id="main_business" v-model="main_business">
                </div>
                <hr>

                <label class="resume_title">자격증 및 수상</label>
               <hr>
                <div class ="resume_textBox">
                    <label for="test_name">시험 및 대회 명</label>
                    <input type="text" id="test_name" v-model="test_name">
                    <label for="test_grade">등급 및 수상명</label>
                    <input type="text" id="test_grade" v-model="test_grade">
                    <label for="test_day">취득일</label>
                    <input type="text" id="test_day" v-model="test_day">
                    <label for="test_company">주최기관</label>
                    <input type="text" id="test_company" v-model="test_company">
                </div>
                <hr>
            </div>
            </div>
            <div id="self_introduction">
                <label id="self_title">자기소개서</label>
                <hr>

                <div class="self_div">
                    <label for="self_content"></label>
                    <textarea id="self_content" v-model="context" ref="content" placeholder="내용을 입력하세요."></textarea>
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
      title: "",
      birth: "",
      email: "",
      category: "",
      tel: "",
      name: "",
      image: "",
      context: "",
      form: "",
      url:null,
      is_publish: false,



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
      this.$router.push({path:'./ResumeList',query:this.body});
    },
    sendForm() {


      const formData = new FormData();

      formData.append("title", this.title);
      formData.append("email", this.email);
      formData.append("category", this.category);
      formData.append("tel", this.tel);
      formData.append("context", this.context);
      formData.append("name", this.name);
      formData.append("image", this.image);
      if(this.is_publish){
        formData.append("is_publish", this.is_publish);
      }


          axios({
            method: "POST",
            url: 'http://127.0.0.1:8000/film/resumestaff/',
            data: formData,
            header: { 'Content-Type': 'multipart/form-data' },
          })

              .then((response) => {
                this.freeboard = response.data;
                alert('등록되었습니다.');
                this.$router.push({name: "ResumeList"});
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
#userInfo {

    padding: 20px;

    width: 300px;
}

.resume_title{

    margin-top: 5%;
    margin-bottom: 0px;
    color: #5F5F6E;
    font-family: Infinity Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
}


.avatar_filebox{
  display: inline-block;
  padding: .5em .75em;

  margin-top: 20px;

  width: 250px;
  height: 50px;

  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  border: 2px solid #DDE1E8;

  font-family: Infinity Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  border-radius: 15px;

  display: flex;
  align-items: center;
  text-align: center;
  padding: .8em 3.5em;

  color: #272B31;

}

.avatar_filebox label:hover {
    background: #FFFFFF;
}

.avatar_filebox input[type="file"]{

      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
}


.userInfo_detail {

    margin-top: 30px;
    font-family: Infinity Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
/* identical to box height, or 125% */

    display: flex;
    align-items: center;

    color: #5F5F6E;
}


/* 기본 정보 */
#info {

    margin-top: 20px;
    margin-bottom:10px;
    width: 300px;
    font-family: Infinity Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #5F5F6E;
}


#input_text {
    width: 300px;
    height: 50px;
    background: #DDE1E8;
    border-radius: 15px;
}



.info_title {
width: 300px;
font-family: Infinity Sans;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
color: #5F5F6E;

}


.textBox {position:relative;}
.textBox label {
    margin-top: 10px;
    width: 100%;
    position: relative;
    color: #5F5F6E;
    font-family: Infinity Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
}

.textBox input[type="text"] {
    width: 100%;
    position: relative;
    line-height : normal;
    outline-style: none;
    background: #DDE1E8;
    border-radius: 10px;
    height: 50px;
    border: 0;
}

#resume {
    height: 100%;
    width:100%;

    padding: 3%;
    margin-left: 3%;
    margin-right: 10%;
}

.resume_textBox label {
    margin-top: 10px;
    width: 100%;
    position: relative;
    color: #5F5F6E;
    font-family: Infinity Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
}


.resume_textBox input[type="text"] {
    padding: 10px;
    width: 100%;
    position: relative;
    line-height : normal;
    outline-style: none;
    background: #DDE1E8;
    border-radius: 10px;
    height: 50px;
    border: 0;
}


.resume_textBox {
    position: relative;
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

#self_title{
    font-family: Infinity Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 46px;
    color: #878792;
}

.self_div {
}
.self_div label {

    width: 100%;
    position: relative;
    color: #5F5F6E;
    font-family: Infinity Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    height:100%;
}


.self_div textarea{
    padding: 10px;
    width: 100%;
    position: relative;
    line-height : normal;
    outline-style: none;
    background: #DDE1E8;
    border-radius: 10px;
    height: 200px;
    border: 0;
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
