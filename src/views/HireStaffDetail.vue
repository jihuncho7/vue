<template>
  <div>
    <div class="freeboardTop">
      <!-- 상단 페이지 버튼 -->
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


      <!-- 목록보기 버튼 -->
      <div class="readHeader">
        <table>
          <tr>
            <td>
              <router-link to="/Freeboard">
                <b-icon class="cancelArrow" icon="arrow-left-short" style="width:80; height:80px"></b-icon>
              </router-link>
            </td>
            <td><h2>목록 보기</h2></td>
          </tr>
        </table>
      </div>
    </div>


    <!-- 자유게시글 내용 시작-->
    <div id="readPage">
        <div class="d-flex">
        <div class="image_class">

          <img :src="axiosget.image" alt=""/>

        </div>
        <div id="top_left">
            <div id="readTitle"><h2>{{ axiosget.title }}</h2></div>
            <div id="read_table">
                <table width="100%">
                    <tr>
                      <td width="30%">{{ axiosget.author_username }}</td>
                      <td width="50%">{{ timefromnow(axiosget.created_at) }}</td>
                      <td width="10%" align="center">
                        <b-icon icon="eye"></b-icon>
                        {{ axiosget.hit }}</td>
                      <td width="10%" align="right">신고</td>
                    </tr>
                </table>
            </div>
        </div>
        </div>

        <div id="div_bottom">

        <div class="d-flex">
        <div id="bottom_left">
        <table class="bottom_table_type">
            <thead>
            <tr>

                <th>분류</th> <td>{{ axiosget.category }} </td>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th>페이</th> <td>{{ axiosget.payment }} </td>
                </tr>
                <tr>
                    <th>요구사항</th> <td>{{ axiosget.requirement }} </td>
                </tr>
                <tr>
                    <th>우대사항</th> <td>{{ axiosget.advantage }} </td>
                </tr>
                <tr>
                    <th>근무지</th> <td>{{ axiosget.job_loca }} </td>
                </tr>
                <tr>
                    <th>페이</th> <td>{{ axiosget.payment }} </td>
                </tr>
                <tr>
                    <th>근무지역</th> <td>{{ axiosget.job_loca }} </td>
                </tr>
                <tr>
                    <th>회사명</th> <td>{{ axiosget.company }} </td>
                </tr>
                <tr>
                    <th>회사위치</th> <td>{{ axiosget.company_loca }} </td>
                </tr>
                <tr>
                    <th>회사분류</th> <td>{{ axiosget.company_desc }} </td>
                </tr>
                <tr>
                    <th>마감일</th> <td>{{ timefromnow(axiosget.deadline) }} </td>
                </tr>
                <tr>
                    <th>홈페이지</th> <td>{{ axiosget.company_url }}</td>
                </tr>
                <tr>
                    <th>주요업무</th> <td>{{ axiosget.job_position }}</td>
                </tr>
            </tbody>
         </table>
         </div>

         <div id="context_wrap">
            <label id="context_label"> [ 상세내용 ] </label>
            <div id = "context">
                {{ axiosget.context }}
            </div>
         </div>


        </div>

          <div id="applyBtns">
            <b-button v-if="axiosget.is_applied_user===false" class= "updateLikeBtn" v-on:click="update_isapplied('POST')">지원</b-button>
            <b-button v-if="axiosget.is_applied_user===true" class= "updateLikeBtn"  v-on:click="update_isapplied('DELETE')">지원 취소</b-button>
          </div>
    </div>
    <!--
      <div id="readTitle"><h2>{{ axiosget.title }}</h2></div>
      <div>
        <img :src="axiosget.image" alt="" style="width: 240px; height: 240px;">
      </div>
      <div class="tags">
        <b-form-tag
            no-remove
            v-for="tag in axiosget.tag_set"
            :key="tag"
            :title="tag"
            class="mr-1"
        >{{ tag }}
        </b-form-tag>
      </div>

      <div id="readWriter">
        <table width="100%">
          <tr>
            <td width="30%"> {{ axiosget.author_username }}</td>
            <td width="50%"> {{ timefromnow(axiosget.created_at) }}</td>
            <td width="10%" align="center">
              <b-icon icon="eye"></b-icon>
              {{ axiosget.hit }}</td>
            <td width="10%" align="right">신고</td>
          </tr>
        </table>
      </div>
      <div id="readContent">
        {{ axiosget.context }}
      </div>
      <div>{{ axiosget.category }}</div>
      <div>{{ axiosget.payment }}</div>
      <div>{{ axiosget.requirement }}</div>
      <div>{{ axiosget.advantage }}</div>
      <div>{{ axiosget.job_loca }}</div>
      <div>{{ axiosget.company }}</div>
      <div>{{ axiosget.company_loca }}</div>
      <div>{{ axiosget.company_desc }}</div>
      <div>{{ timefromnow(axiosget.deadline) }}</div>
      <div>{{ axiosget.company_url }}</div>
      <div>{{ axiosget.job_position }}</div>
-->


      <!-- 추천, 수정하기, 삭제하기 버튼 -->



      <div id="updateBtns" >

        <b-button style="box-shadow: 2px 2px 2px #ccc;" v-if="axiosget.is_like_user===true" v-on:click="updateLike('DELETE')">비추천</b-button>
        <b-button style="box-shadow: 2px 2px 2px #ccc;" v-if="axiosget.is_like_user===false" v-on:click="updateLike('POST')">추천</b-button>

        <a href="javascript:;" @click="goToUpdate(axiosget)">
          <b-button variant="primary" class="updateBtn">수정하기</b-button>
        </a>
        <a href="javascript:;" @click="goToDelete(axiosget)">
          <b-button variant="danger" class="updateBtn">삭제하기</b-button>
        </a>
      </div>

      <!-- 댓글 영역 -->

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from "dayjs";

export default {
  data() {
    return {
      axiosget: [],
      id: '',
      method:'',
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/hirepoststaff/" + this.$route.params.id + "/"
    })
        .then(response => {
          this.axiosget = response.data;
        })
        .catch(response => {
          console.log("Failed", response);
        })
  },

  methods: {
    returnList(){ //리스트 화면으로 이동 함수
      this.$router.go(-2);
    },
    goToUpdate: function(updateData) {
      this.$router.push({name: 'HireStaffUpdate',
        params: {
          id: updateData.id,
        }});
    },
    goToDelete() {
      axios({
        method: "DELETE",
        url: "http://127.0.0.1:8000/film/hirepoststaff/" + this.$route.params.id + "/"
      })
          .then((response) => {
            this.freeboard = response.data;
            alert('삭제되었습니다.');
            this.returnList();
          })
          .catch(response => {
            console.log("Failed", response);
          })
    },
    update_isapplied(data) {
      if(this.axiosget.is_applied_user === false) {
        this.axiosget.is_applied_user = true
      }
      else {
        this.axiosget.is_applied_user = false
      }

      axios({
        method: data,
        url: 'http://127.0.0.1:8000/film/hirepoststaff/' + this.$route.params.id + "/apply/",
      })
    },

    updateLike(data) {
      if(this.axiosget.is_like_user === false) {
        this.axiosget.is_like_user = true
      }
      else {
        this.axiosget.is_like_user = false
      }

      axios({
        method: data,
        url: 'http://127.0.0.1:8000/film/hirepoststaff/' + this.$route.params.id + "/like/",
      })
    },
    timefromnow: function (data) {
      var relativeTime = require('dayjs/plugin/relativeTime')
      var isTomorrow = require('dayjs/plugin/isTomorrow')
      dayjs.extend(isTomorrow)
      dayjs.extend(relativeTime)
      if(dayjs(data).add(1,'day').isTomorrow()) {
        return dayjs(data).fromNow()
      }
      else {
        return dayjs(data).format('YYYY.MM.DD')
      }

    },
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

#top_left {
  position:relative;
  margin-left: 5%;
  margin-bottom: 20px;
  width: 60%;
}

#context_wrap {
    margin-left: 60px;
    width: 50%;
    padding: 3%;
    border-radius: 12px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 2px #ccc;
    height: 300px;
}

#context_label {
    width: 100%;
    text-align:center;
    font-weight:bold;
    margin-bottom: 10px;
}

#context {

}

#applyBtns {
  float: right;
  position:relative;
  top: -260px;
  margin-right: 5px;
  box-shadow: 2px 2px 2px #ccc;



}

#readWriter {
  border-bottom: 1px solid black;
  font-size: 18px;
  padding-bottom: 20px;
}

.image_class {
    position:relative;
    width: 450px;
    height: 300px;
    margin-bottom: 30px;

}

#readContent {
  border-bottom: 1px solid black;
  margin-top: 30px;
  resize:none;
  border:none;
  width:100%;
}

#updateBtns {
    position: relative;
    width: 100%;
    margin-top:150px;
    text-align:right;
    padding-bottom: 2%;

}
.updateBtn{
    margin-right:30px;
    background: rgba(69, 69, 77, 0.8);
    border-radius: 5px;
    border: none;
    box-shadow: 2px 2px 2px #ccc;


}

table.bottom_table_type {
    border-collapse: serparate;
    border-spacing: 1px;
    text-align:left;
    border-top: 1px solid #ccc;
}

table.bottom_table_type th{
    width: 150px;
    padding: 10px;
    font-weight:bold;
    vertical-align:top;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

table.bottom_table_type td{
    width: 260px;
    padding: 10px;
    vertical-align:top;
    border-bottom: 1px solid #ccc;
}
#div_bottom {
    width: 100%;
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
#readPage .tags{
  float: right;
}
</style>
