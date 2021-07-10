<template>

  <div>

      <!-- 상단 페이지 버튼 -->
      <div class="d-flex bd-highlight">
        <div style="margin-top:125px!important; background-color: #231909; min-width: 252px!important; height: 1247px" class="mt-5 p-2 bd-highlight">
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
            <router-link style="text-decoration: none; color: inherit;" to="/mypostlist">
            <img src="@/assets/static/mypage/my-p3.svg" alt="">
            내 글 관리
            </router-link>
          </b-button>
          <b-button block class="btn border-0" style="color: darkgrey;text-align: left;">
            <img src="@/assets/static/mypage/my-p4.svg" alt="">
            고객 센터
          </b-button>
        </div>
        <!-- 자유게시글 내용 시작-->
        <div id="wrapper" class="mt-5 p-5 flex-grow-1 bd-highlight">
            <h2 class="mb-5">이력서 등록, 관리</h2>
          <div>
            <b-card-group deck>
              <router-link to="/ResumeWrite" style="text-align: center;width: 165px; height: 215px; font-size: 12px;">
                <b-card
                    footer="+ 이력서 등록">
                  <img src="@/assets/static/mypage/file.svg" alt="">
                </b-card>
              </router-link>
              <div class="card_wrapper" style="width: 165px; height: 215px; font-size: 12px; text-align: center">
                <b-card footer="+ 파일 업로드">
                  <img src="@/assets/static/mypage/upload.svg" alt="">
                </b-card>
              </div>

<!--              스태프 이력서 카드 출력-->
              <div v-for="(item, id) in axiosget_staff" :key="id">
                <div>
                  <b-card style=""
                          img-src=""
                          img-alt="Image"
                          v-bind:footer="timefromnow(item.created_at)">
                    <!-- 추천, 수정하기, 삭제하기 버튼 -->
                    <b-row class=" position-absolute ml-5 mt-n3">
                      <b-dropdown size="sm" variant="link" toggle-class="" no-caret>
                        <template #button-content>
                          <img src="@/assets/static/mypage/dotdotdot.svg" alt="">
                        </template>

                        <b-dropdown-item href="javascript:;" @click="goToView(item)" class="text-center"
                                         style="font-size: 12px;">수정하기
                        </b-dropdown-item>
                        <b-dropdown-item href="javascript:;" @click="goToDelete(item.id)" variant="danger"
                                         class="text-center" style="font-size: 12px;">삭제하기
                        </b-dropdown-item>

                      </b-dropdown>
                    </b-row>

                    <b-row class="justify-content-md-center">{{ item.title }}</b-row>
                    <b-row class="justify-content-md-center">
                      <b-badge>{{ item.category }}</b-badge>
                    </b-row>


                  </b-card>

                </div>

              </div>
<!--             액터 이력서 카드 출력-->
              <div v-for="(item, id) in axiosget_actor" :key="id">
                <div>
                  <b-card style=""
                          img-src=""
                          img-alt="Image"
                          v-bind:footer="timefromnow(item.created_at)">
                    <!-- 추천, 수정하기, 삭제하기 버튼 -->
                    <b-row class=" position-absolute ml-5 mt-n3">
                      <b-dropdown size="sm" variant="link" toggle-class="" no-caret>
                        <template #button-content>
                          <img src="@/assets/static/mypage/dotdotdot.svg" alt="">
                        </template>

                        <b-dropdown-item href="javascript:;" @click="goToView(item)" class="text-center"
                                         style="font-size: 12px;">수정하기
                        </b-dropdown-item>
                        <b-dropdown-item href="javascript:;" @click="goToDelete(item.id)" variant="danger"
                                         class="text-center" style="font-size: 12px;">삭제하기
                        </b-dropdown-item>

                      </b-dropdown>
                    </b-row>

                    <b-row class="justify-content-md-center">{{ item.title }}</b-row>
                    <b-row class="justify-content-md-center">
                      <b-badge>{{ item.category }}</b-badge>
                    </b-row>


                  </b-card>

                </div>

              </div>
            </b-card-group>
          </div>
          <!--            지원현황 출력-->

          <h2 class="mt-5 mb-5">지원 현황</h2>

          <div class="freeboardList">
            <table align="center" id="tableList" style="margin-left: -125px;">
              <tr align="center" style="border-bottom: 1px solid black;">
                <th width=10%>추천 수</th>
                <th width=40%>제목</th>
                <th width=5%>태그</th>
                <th width=15%>작성자</th>
                <th width=10%>조회수</th>
                <th width=20%>게시일</th>
              </tr>
              <td  style="border-bottom: 1px solid black;" colspan="5"></td>
              <tr class="table_records" align="center" v-for="(item, index) in axiosget_applied" :key="index">

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
                  <b-form-tag style="margin-top: 15px; font-size: 10px; "
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
      axiosget_staff: [],
      axiosget_actor: [],
      axiosget_applied : [],
      id: '',
      method: '',
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/resumestaff/"
    })
        .then(response => {
          this.axiosget_staff = response.data;
        })
        .catch(response => {
          console.log("Failed", response);
        })
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/resumeactor/"
    })
        .then(response => {
          this.axiosget_actor = response.data;
        })
        .catch(response => {
          console.log("Failed", response);
        })
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/MypageApplied"
    })
        .then(response => {
          this.axiosget_applied = response.data;
        })
        .catch(response => {
          console.log("Failed", response);
        })
  },

  methods: {

    refresh() { //리스트 화면으로 이동 함수
      this.$router.go(0)
    },
    // goToUpdate: function (updateData) {
    //   // this.$router.push({name: 'FreeUpdate', TODO 업데이트 구현
    //   //   params: {
    //   //     id: updateData.id,
    //   //   }});
    // },
    goToDelete(post_id) {
      axios({
        method: "DELETE",
        url: "http://127.0.0.1:8000/film/resumestaff/" + post_id + "/"
      })
          .then((response) => {
            this.freeboard = response.data;
            alert('삭제되었습니다.');
            this.refresh();
          })
          .catch(response => {
            console.log("Failed", response);
          })
    },
    // 작성시간 관리 기능
    timefromnow: function (data) {

      return dayjs(data).format('YYYY.MM.DD')
    },
    goToView: function (viewData) {
      this.$router.push({
        name: 'HireStaffDetail',
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

.btn {
  background-color: #231909;
  color: #FFFFFF;
}

</style>