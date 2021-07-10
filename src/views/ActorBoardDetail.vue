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
              <router-link to="/Actorboard">
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
        <div class="d-flex">
            <div class="image_class">
              <img :src="axiosget.image" alt=""></div>
            <div id="top_right">
                <div>
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

            </div>
        </div> <!-- d-flex -->

        <div id="div_bottom">
            <div class="d-flex">
                <div id="bottom_left">
                    <table class="bottom_table_type">
                        <tr>
                            <th>분류</th> <td>{{ axiosget.category }}</td>
                        <tr>
                        <tr>
                            <th>나이</th> <td>{{ axiosget.age }}</td>
                        <tr>
                        <tr>
                            <th>키</th> <td>{{ axiosget.height }}</td>
                        <tr>
                        <tr>
                            <th>성별</th> <td>{{ axiosget.gender }}</td>
                        <tr>
                        <tr>
                            <th>연락처</th> <td>{{ axiosget.tel }}</td>
                        <tr>
                        <tr>
                            <th>email</th> <td>{{ axiosget.email }}</td>
                        <tr>
                        <tr>
                            <th>이력서 주소</th><td>{{ axiosget.resume_url }} </td>
                        </tr>

                    </table>
                </div>
                <div id="context_wrap">
                    <label id="context_label"> [ 상세내용 ] </label>
                    <div id = "context">
                        {{ axiosget.context }}
                    </div>
                </div>
            </div>
        </div>


    <!--
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
      <div>{{ axiosget.age }}</div>
      <div>{{ axiosget.height }}</div>
      <div>{{ axiosget.gender }}</div>
      <div>{{ axiosget.tel }}</div>
      <div>{{ axiosget.email }}</div>
      <div>{{ axiosget.resume_url }}</div>

      -->









      <!-- 추천, 수정하기, 삭제하기 버튼 -->
      <div id="updateBtns">

        <b-button v-if="axiosget.is_like_user===true" v-on:click="updateLike('DELETE')">비추천</b-button>
        <b-button v-if="axiosget.is_like_user===false" v-on:click="updateLike('POST')">추천</b-button>

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
      url: "http://127.0.0.1:8000/film/resumeactorboard/" + this.$route.params.id + "/"
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
      this.$router.push({name: 'ActorBoard', query:this.body});
    },
    goToUpdate: function(updateData) {
      this.$router.push({name: 'FreeUpdate',
        params: {
          id: updateData.id,
        }});
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
        url: 'http://127.0.0.1:8000/film/resumeactorboard/' + this.$route.params.id + "/like/",
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


#top_right {
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

.image_class * {
    position:relative;
    width: 450px;
    height: 300px;
    margin-bottom: 30px;
    object-fit: contain;
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



</style>
