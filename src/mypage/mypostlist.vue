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
          <img src="@/assets/static/mypage/my-p3.svg" alt="">
          내 글 관리
        </b-button>
        <b-button block class="btn border-0" style="color: darkgrey;text-align: left;">
          <img src="@/assets/static/mypage/my-p4.svg" alt="">
          고객 센터
        </b-button>
      </div>
      <!-- 자유게시글 내용 시작-->

      <div id="wrapper" class="mt-5 p-5 flex-grow-1 bd-highlight">

          <h5 class="mb-5">내 글 관리</h5>


          <div class="d-flex ">
          <div class="wrapper-2 ">

            <div id="preview" class=""> <!-- 사용자 사진 -->
              <img v-if="url" :src="url" style="height: 95px;border-radius: 200px;"/>
              <img v-else-if="image" :src="image" style="height: 95px;border-radius: 200px;"/>
              <img v-else src="@/assets/static/mypage/no_img.svg" style="height: 95px;border-radius: 200px;"/>
            </div>
            <div class="user_table">
              <table class="mx-auto mt-5">
                <tr >
                  <td >총 게시글</td>
                  <td>작성 댓글</td>
                </tr>

                <tr>
                  <td>{{ posts }}</td>
                  <td>{{ comments }}</td>
                </tr>
              </table>
            </div>
            </div>



          </div>

        <b-button-group style="width: 170px; margin-top: 20px;">
          <b-button variant="outline-secondary">작성 글</b-button>
          <b-button variant="outline-secondary">작성 댓글</b-button>
        </b-button-group>

        <div class="freeboardList">
          <table align="center" id="tableList" style="margin-left: -125px;">
            <tr align="center" style="border-bottom: 1px solid black;">
              <th width=5%>분류</th>
              <th width=40%>제목</th>
              <th width=10%>조회수</th>
              <th width=20%>게시일</th>
            </tr>
            <td  style="border-bottom: 1px solid black;" colspan="5"></td>
            <tr class="table_records" align="center" v-for="(item, index) in axiosget_posts" :key="index">
              <td>
                <b-form-tag style="margin-top: 15px; font-size: 10px; "
                            no-remove
                            :key="postfrom"
                            :title="postfrom"
                            class="mr-1"
                            variant="primary"
                >{{ item.postfrom }}
                </b-form-tag>
              </td>
              <td>
                <a href="javascript:;" @click="goToView(item)" style="text-decoration: none; color: #231909" >{{item.title}}</a>

              </td>
              <td>{{ item.hit }}</td>
              <td>{{ timefromnow(item.created_at) }}</td>

            </tr>
          </table>

          <!--            TODO 페이징 나중에-->
          <!--            <paginate-->

          <!--                :click-handler="clickCallback"-->
          <!--                :page-count=pageCount()-->
          <!--                :page-range="5"-->
          <!--                :margin-pages="2"-->
          <!--                :prev-text="'이전'"-->
          <!--                :next-text="'다음'"-->
          <!--                :container-class="'pagination'"-->
          <!--                :page-class="'page-item'">-->
          <!--            </paginate>-->
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
      axiosget_posts: '',
      email: '',
      id: '',
      method: '',
      url:null,
      image:'',
      social: '',
      posts: '',
      comments:'',
      postfrom:'',
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/WrittenByMe"
    })
        .then(response => {
          this.axiosget_posts = response.data;
        })
        .catch(response => {
          console.log("Failed", response);
        }),
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
      url: "http://127.0.0.1:8000/film/CountAllPost"
    })
        .then(response => {
          this.axiosget_count = response.data;
          this.posts = this.axiosget_count.posts
          this.comments = this.axiosget_count.comments

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

    refresh() { //리스트 화면으로 이동 함수
      this.$router.go(0)
    },
    // goToUpdate: function (updateData) {
    //   // this.$router.push({name: 'FreeUpdate', TODO 업데이트 구현
    //   //   params: {
    //   //     id: updateData.id,
    //   //   }});
    // },


    // 작성시간 관리 기능
    timefromnow: function (data) {

      return dayjs(data).format('YYYY.MM.DD')
    },
    goToView: function (viewData) {
      if(viewData.postfrom === '자유게시판'){
        this.printwhere = 'FreeView'
      }
      if(viewData.postfrom === '스탭 구인'){
        this.printwhere = 'HireStaffDetail'
      }
      if(viewData.postfrom === '액터 구인'){
        this.printwhere = 'HireStaffAcotr'
      }
      if(viewData.postfrom === '스탭 이력서'){
        this.printwhere = 'ResumeDetail'
      }
      if(viewData.postfrom === '액터 이력서'){
        this.printwhere = 'ResumeDetail'
      }
      this.$router.push(
      {

        name: this.printwhere,
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

.wrapper-2{
    position: relative;
    width: 100%;
    height: 150px;

}

.user_table{
    border: 2px solid #B9B8C0;
    margin-left: 10%;
    float: left;
    width: 60%;
    height: 150px;
    border-radius: 15px;

}

.user_table td{
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 15px;

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
.wrap{
  margin-left: 500px;
  margin-top: -100px;
}

#preview {
position: relative;
width: 95px;
float: left;
}
</style>