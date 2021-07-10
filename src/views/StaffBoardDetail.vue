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
              <router-link to="/Staffboard">
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
      <div id="readTitle"><h2>{{ axiosget.title }}</h2></div>
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
            <td width="30%">{{ axiosget.name }}</td>
            <td width="50%">{{ timefromnow(axiosget.created_at) }}</td>
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
      <div>{{ axiosget.title }}</div>
      <div>{{ axiosget.tel }}</div>
      <div>{{ axiosget.email }}</div>
      <div>{{ axiosget.resume_url }}</div>

      <!-- 추천, 수정하기, 삭제하기 버튼 -->
      <div id="updateBtns">

        <b-button v-if="axiosget.is_like_user===true" v-on:click="updateLike('DELETE')">비추천</b-button>
        <b-button v-if="axiosget.is_like_user===false" v-on:click="updateLike('POST')">추천</b-button>

        <a href="javascript:;" @click="goToUpdate(axiosget)">
          <b-button variant="primary">수정하기</b-button>
        </a>
        <a href="javascript:;" @click="goToDelete(axiosget)">
          <b-button variant="danger">삭제하기</b-button>
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
      url: "http://127.0.0.1:8000/film/resumestaffboard/" + this.$route.params.id + "/"
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
      this.$router.push({name: 'StaffBoard', query:this.body});
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
        url: 'http://127.0.0.1:8000/film/resumestaffboard/' + this.$route.params.id + "/like/",
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
#readPage .tags{
  float: right;
}
</style>
