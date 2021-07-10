<template>
<div>
    <b-container fluid="lg" class="freeboardHeader">
      <b-row class="justify-content-md-center">
        <b-col cols="5"><span style="font-size:24px">자유 게시판</span></b-col>
        <b-col cols="4" class="searchbar"></b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>

    <div class="freeboardList">
      <div class="boardtop d-flex mw-100 mh-100 float-right" style=" width: 800px; margin-bottom:50px;">
        <b-input-group class="">
          <template #prepend>
            <b-dropdown :text="search_tag" variant="outline-secondary" style="">
              <b-dropdown-item @click="search_tag = '전체',search_cate('')">전체</b-dropdown-item>
              <b-dropdown-item @click="search_tag = '잡담',search_cate('잡담')">잡담</b-dropdown-item>
              <b-dropdown-item @click="search_tag = '일상',search_cate('일상')">일상</b-dropdown-item>
              <b-dropdown-item @click="search_tag = '정보공유',search_cate('정보공유')">정보공유</b-dropdown-item>
            </b-dropdown>

          </template>
          <b-form-input  v-model="search_text" v-on:keyup.enter="logText"></b-form-input>
      </b-input-group>
        <router-link to="/FreeWrite" class="w-100" >
          <b-button variant="primary" style="border-radius: 14px; margin-left:20%;" v-bind:propsdata="freeboard">글쓰기</b-button>
        </router-link>
      </div>
    <table align="center" id="tableList">
        <tr align="center" style="border-bottom: 1px solid black; ">
            <th width=10%>추천 수</th>
            <th width=40%>제목</th>
            <th width=5%>태그</th>
            <th width=15%>작성자</th>
            <th width=10%>조회수</th>
            <th width=20%>게시일</th>
        </tr>
        <td  style="border-bottom: 1px solid black;" colspan="5"></td>
        <tr class="table_records" align="center" v-for="(item, index) in freeboard" :key="index">

            <td v-if="user_like">
              <img src="@/assets/static/freeboard/like_clicked.svg">
              {{ item.get_likes }}
            </td>
            <td v-else>
              <img src="@/assets/static/freeboard/like_unclicked.svg">
              {{ item.get_likes }}
            </td>
            <td>
              <a href="javascript:;" @click="goToView(item)" style="text-decoration: none; color: #231909" >{{item.title}}</a>

            </td>
          <td>
            <b-form-tag v-if="item.category" style="margin-top: 15px; font-size: 10px; "
                        no-remove
                        :key="category"
                        :title="category"
                        class="mr-1"
                        variant="primary"
            >{{ item.category }}
            </b-form-tag>
          </td>
            <td>{{ item.author_username }}</td>
            <td>{{ item.hit }}</td>
            <td>{{ timefromnow(item.created_at) }}</td>

        </tr>
    </table>
      <div class="pagebottom d-flex justify-content-center mt-3">
        <paginate class="col-1"

            :click-handler="clickCallback"
            :page-count=pageCount()
            :page-range="5"
            :margin-pages="2"
            :prev-text="'이전'"
            :next-text="'다음'"
            :container-class="'pagination'"
            :page-class="'page-item'">
        </paginate>

      </div>
    </div>
</div>
</template>

<script>
import { freeboard } from '../dblist.js';
import axios from 'axios';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      freeboard: [],
      activeBtn: '',
      user_like: 'True',
      search_text:'',
      category:'',
      search_tag:'전체',
    }
  },
  // created() : 컴포넌트가 생성되자마자 실행되는 로직이 들어간다. 라이프사이클훅.
  created() { // 속성에 함수가 붙으면(예를 들면 created: function(){} 요놈) 줄여서 쓴다. ES6 축약문법.

    freeboard()
      .then((response) => {
        console.log(response);
        this.freeboard = response.data.results;
        this.freeboard_count = response.data.count;
      })
      .catch((error) => { // .catch 는 Promise 에서 무조건 붙이는 에러 처리 구문이다.
        console.log(error);
        if (error.response.status === 403) {
          alert('로그인하세요')          
          this.$router.push({name: 'login'});
        }
      });

  },

  methods: {
    search_cate(data){
      axios.get('http://127.0.0.1:8000/film/freeboard/' +
          '?category='+data)

          .then((response)=> {

            console.log(response);
            this.freeboard = response.data.results;
            this.freeboard_count = response.data.count;
          })
          .catch(function(error) { // .catch 는 Promise 에서 무조건 붙이는 에러 처리 구문이다.
            console.log(error);

          })
    },
   searchwith_cate(data){
      axios.get('http://127.0.0.1:8000/film/freeboard/' +
          '?search='+this.search_text +
          '&category='+data)

          .then((response)=> {

            console.log(response);
            this.freeboard = response.data.results;
            this.freeboard_count = response.data.count;
          })
          .catch(function(error) { // .catch 는 Promise 에서 무조건 붙이는 에러 처리 구문이다.
            console.log(error);

          })},

    logText : function (){
      if(this.search_tag==='전체'){
        this.searchwith_cate('')

      }
      else{
      this.searchwith_cate(this.search_tag)}



    },

    // 총 페이지 수 카운트
    pageCount : function (){
      if(this.freeboard_count % 15 > 0){
        return parseInt((this.freeboard_count/15) + 1)
      }
      else{
        return parseInt(this.freeboard_count/15)

      }

    },

    // 페이지네이션 기능
     freeboard_page: function(pageNum) {
  return axios.get('http://127.0.0.1:8000/film/freeboard/?page='+pageNum)
  .then((response) => {
    console.log(response);
    this.freeboard = response.data.results;
       })
     },
    clickCallback: function(pageNum){
      console.log(pageNum)
      this.freeboard_page(pageNum)
    },

// 작성시간 관리 기능
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
    goToView: function(viewData) {
      this.$router.push({name: 'FreeView',
        params: {
          id: viewData.id,
          hit: viewData.hit,
        }});
      axios({
        method: "PATCH",
        url: "http://127.0.0.1:8000/film/freeboard/" + viewData.id + "/",
        data: {
          hit: viewData.hit + 1,
        },        
      })       
    },
 }
}
</script>


<style>
/*.freeboardTop {*/
/*  background-color: red;*/

/*  width: 1440px;*/
/*  color: white;*/
/*  !*width: 100%;*!*/
/*}*/
.freeboardHeader{
  margin-top: 48px;
  max-width: 1440px;
  color: #FFFFFF;
  /*margin: auto;*/
  /*margin-left: auto;*/
}

.freeboardList {
  padding: 10%;
  padding-top: 5%;
  background-color: white;
  border-radius:10px;
  /*font-size: 21px;*/

}

#tableList {
  border-collapse: collapse;
  width: 1094px;
  font-size: 20px;
}
.space {
  border-bottom: 1px solid black;

}

.communitybtn-group button {
  width: 135px;
  height: 42px;
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
.searchbar{

  width: 398px;
  height: 42px;
  margin-right: 10px;
}
.table_records{
line-height:50px;
}
</style>
