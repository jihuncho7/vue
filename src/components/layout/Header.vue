<template>
<div id="header">
  <b-navbar class="navbar" type="dark">
    <b-navbar class="pagename" href="#">Film Project</b-navbar>
        
      <div class="toolBtns">
        <div class="btn-group" role="group">
          
          <router-link to="/">
          <button class="btn1" type="button" @click="activeBtn = 'btn1'" :class="{active: activeBtn === 'btn1' }">홈</button>
          </router-link>
          
          <router-link to="/HireStaff">
          <button class="btn2" type="button" @click="activeBtn = 'btn2'" :class="{active: activeBtn === 'btn2' }">채용정보</button>
          </router-link>

          <router-link to="/Community">
          <button class="btn3" type="button" @click="activeBtn = 'btn3'" :class="{active: activeBtn === 'btn3' }">커뮤니티</button>
          </router-link>
        </div>
      </div>

      <div class="searchBox mx-auto col-3">
        <b-form-input  v-model="search_text" v-on:keyup.enter="goToView"></b-form-input>
      </div>
      
      <!-- 로그인 버튼 -->
      <div class="loginBox">
        <div class="userLogin" v-if="loginShow">
          <router-link to="/login">
            <button id="loginBtn">로그인</button>
          </router-link>
        </div>

        <div class="userLogout" v-else>
          <b-dropdown right>
            <template #button-content>
              <img class="rounded-circle" :src="thumbnail" width="25px"/>
            </template>
            <router-link to="/profile" style="color:black;" tag="b-dropdown-item">내 프로필</router-link>
            <router-link to="/ResumeList" style="color:black;" tag="b-dropdown-item">이력서 등록, 관리</router-link>
            <router-link to="/mypostlist" style="color:black;" tag="b-dropdown-item">내 글 관리</router-link>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>고객센터</b-dropdown-item>
            <b-dropdown-item @click="logOut">로그아웃</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

  </b-navbar>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      activeBtn: '',
      loginModal:false,
      loginShow:'',
      thumbnail: '',
      search_text: '',
      is_activated_before:false,
    }
  },
  methods: {
    goToView: function() {

      this.$router.push({name: 'search_result',
        query: {
          search_q: this.search_text

        }})},
    logOut() {     
      // Kakao 로그아웃      
      if(sessionStorage.getItem('login') === 'Kakao') {
        window.Kakao.Auth.logout()   
      }

      // Google 로그아웃
      if(sessionStorage.getItem('login') === 'Google') {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut()
      }

      sessionStorage.clear()
      this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))

      alert('로그아웃 되었습니다.')
      window.location.href='http://localhost:8080/'
    },
  },
  created() {   
    if(sessionStorage.length == 0) {this.loginShow=true}
    else {this.loginShow=false}

    if(sessionStorage.getItem('key')){      
      const keyData = sessionStorage.getItem('key')
      axios.defaults.headers.common['Authorization'] = 'Token '+keyData+''
      this.thumbnail = sessionStorage.getItem('thumbnail')
    }
    console.log( this.$route.name)
  },

}
</script>

<style>

#header{
  width: 1140px;
  margin: auto;

}
.pagename{
  color: #FFFFFF;
  margin-right: 112px;
}

.btn-group button {
  width: 80px;
  height: 30px;
  border-radius: 150px;
  border: 0px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
}

.btn1 {
  background-color: #231909;
  color: #ebebf5;
}

.btn2 {
  background-color: #231909;
  color: #ebebf5;
}

.btn3 {
  background-color: #231909;
  color: #ebebf5;
}

.active {
  background-color: #0061FD;
  color: white;
}

.search {
  width: 250px;
  height: 30px;
  border-radius: 24px;
  border: 0px;
  background-color: #2F2F2F;
  color: white;
  position: absolute;
  top: 25%;
  position:absolute;
  right:12%;
}

.loginBox {
  position:absolute;
  right: 0%;
}

#loginBtn {
  background-color: #231909;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
  border-radius: 5px;
}

#logoutBtn {
  background-color: #231909;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
  border-radius: 5px;
}

</style>