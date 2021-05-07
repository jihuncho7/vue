// App.vue

<template>
  <div>
    <He />
    <div id="content">
      <router-view v-bind:propsdata="userList"></router-view>
    </div>
    <!-- v-bind:하위컴포넌트 속성명="상위 컴포넌트 전달할 데이터명"  -->
<!--    <Content v-bind:propsdata="userList"></Content>-->
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
import He from "./components/Header.vue";
// import Content from "./components/Content.vue";
import Footer from "./components/Footer.vue";

let url = "http://localhost:8000/support/";  // 장고 drf 서버 주소

export default {
  data: () => {
    return {
      userList: []
    };
  },
  components: {
    He,
    // Content,
    Footer
  },
  mounted() { // DOM 객체가 생성된 후 DRF server 에서 데이터를(userList) 가져와 저장
    axios({
      method: "GET",
      url: url
    })
        .then(response => {
          this.userList = response.data;
        })
        .catch(response => {
          console.log("Failed", response);
        });
  },
  // methods: {  // CRUD 로직
  //   getUserList: function() {},
  //   updateUserList: function() {},
  //   deleteUserList: function() {}
  // }
};
</script>