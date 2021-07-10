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
        <td><h2 style="color:white;">목록 보기</h2></td>
      </tr>
    </table>
  </div>

  <!-- 자유게시글 내용 시작-->
	<div id="readPage">
		<div id="readTitle"><h1>{{ freeboardData.title }}</h1></div>
    <div class="tags">
      <b-form-tag
          no-remove
          v-for="tag in freeboardData.tag_set"
          :key="tag"
          :title="tag"
          class="mr-1"
      >{{ tag }}
      </b-form-tag>
    </div>

		<div id="readWriter">
      <table width="100%">
        <tr>
          <td width="30%">{{ freeboardData.author_username }}</td>
          <td width="50%">{{ timefromnow(freeboardData.created_at) }}</td>
          <td width="10%" align="center">
            <b-icon icon="eye"></b-icon>
            {{ freeboardData.hit }}</td>
          <td width="10%" align="right">신고</td>
        </tr>
      </table>
		</div>
		<div id="readContent">
      {{ freeboardData.context }}
		</div>

    <!-- 추천, 수정하기, 삭제하기 버튼 -->

    <div id="likeBtns">
      <b-button v-if="freeboardData.is_like_user===true" class= "updateLikeBtn" v-on:click="updateLike('DELETE')">비추천</b-button>
      <b-button v-if="freeboardData.is_like_user===false" class= "updateLikeBtn"  v-on:click="updateLike('POST')">추천</b-button>
    </div>

    <div id="updateBtns" v-if="freeboardData.author_username == nickname">
      <a href="javascript:;" @click="goToUpdate(freeboardData)">
        <b-button variant="primary" class="updateBtn">수정하기</b-button>
      </a>
      <a href="javascript:;" @click="goToDelete(freeboardData)">
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
      freeboardData: [],
      id: '',
      method:'',
      nickname: '',
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/freeboard/" + this.$route.params.id + "/"
    })
    .then(response => {
      this.freeboardData = response.data;
    })
    .catch(response => {
      console.log("Failed", response);
    })
  },

  methods: {
    returnList(){ //리스트 화면으로 이동 함수
			this.$router.push({name: 'Freeboard', query:this.body});			
		},
    goToUpdate: function(updateData) {
      this.$router.push({name: 'FreeUpdate',
      params: {
        id: updateData.id,
      }});
    },
    goToDelete() {
      axios({
        method: "DELETE",
        url: "http://127.0.0.1:8000/film/freeboard/" + this.$route.params.id + "/"
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
    updateLike(data) {
      if(this.freeboardData.is_like_user === false) {
        this.freeboardData.is_like_user = true
      }
      else {
        this.freeboardData.is_like_user = false
      }

      axios({
        method: data,
        url: 'http://127.0.0.1:8000/film/freeboard/' + this.$route.params.id + "/like/",
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
  },
  mounted() {
    if(sessionStorage.getItem('key')){
      this.nickname = sessionStorage.getItem('nickname')
    }
  }
}
</script>


<style scoped>
.readHeader {
	margin-top: -15px;
	margin-bottom: 10px;
  padding-left: 4%;
}

#likeBtns {
    position: relative;
    padding-left: 50%;
    width: 100%;
    margin-bottom: 5%;

}


#updateBtns {
    position: relative;
    width: 100%;
    padding-left:70%;
    padding-bottom: 5%;
    box-shadow: 2px 2px 2px #ccc;
}
.updateBtn{
    margin-right:10px;
    background: rgba(69, 69, 77, 0.8);
    border-radius: 5px;
    border: none;

}
#readPage {
	background-color: white;
	border-radius: 10px;
  padding-bottom: 0%;
}


#readTitle {
  margin-top:-100px;
  margin-bottom: 30px;
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

.text_area_box {
    position: relative;

    width: 100%;
    padding: 3%;

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
