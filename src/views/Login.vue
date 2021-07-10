<template>
<div>
  <div id="login" align="center">
    <a href="javascript:;" @click="loginWithKakao()">
      <img src="@/assets/static/kakaoLoginBtn.png" />
    </a>
    <br><br>
    <div id="google-signin-button"></div>
    <br>
    <div id="naverIdLogin"></div>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import { getKakaoToken, getKakaoUserInfo, naverService, } from '../login.js';

export default {

    methods: {
      // Kakao Signin
      loginWithKakao() {
        window.Kakao.Auth.authorize({
          redirectUri: 'http://localhost:8080/Login'
        });
      },
      async setKakaoToken () {
          const { data } = await getKakaoToken(this.$route.query.code);
          window.Kakao.Auth.setAccessToken(data.access_token);
          await this.setUserInfo();
          
          axios({
            method: "POST",
            url: 'http://127.0.0.1:8000/login/kakao/todjango/',
            data: {
              access_token: data.access_token,
              code: this.$route.query.code,
            },
          })
          .then(response => {
            sessionStorage.setItem('key',  response.data.key)
            window.location.href='http://localhost:8080/'
          })
      },      
      async setUserInfo () {
        await getKakaoUserInfo()
        .then(response => {
          sessionStorage.setItem('login', 'Kakao')
          sessionStorage.setItem('thumbnail', response.kakao_account.profile.thumbnail_image_url)
          sessionStorage.setItem('nickname', response.properties.nickname)
        })
      },
      
      // Google Signin 
      onSignIn(googleUser) {
        var re = new RegExp("(?<=/)[A-Z].*");
        const profile = googleUser.getBasicProfile();
        var imageUrl = profile.getImageUrl();
        axios({
            method: "POST",
            url: 'http://127.0.0.1:8000/login/google/todjango/',
            data: {
                access_token: googleUser.getAuthResponse(true).access_token,
                code: String(re.exec(imageUrl)),
            },
        })
        .then(response => {
            this.keyData = response.data.key;
            sessionStorage.setItem('key', this.keyData)
            sessionStorage.setItem('thumbnail', profile.getImageUrl())
            sessionStorage.setItem('nickname', profile.getName())
            sessionStorage.setItem('login', 'Google')
            window.location.href='http://localhost:8080/'
        })
      },        
    },

    created() {
      if (this.$route.query.code) {
        this.setKakaoToken();
      }
    },

    mounted() {
      // Google Signin Button
      window.gapi.signin2.render('google-signin-button', {
        'scope': 'profile email',
        'width': 325,
        'height': 70,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSignIn,
      });

      // Naver Signin Button
      naverService().setNaver()
      if(this.$route.hash) {
        naverService().getUserInfo()
      }
    }
}
</script>

<style scoped>
#login {
  margin: 0 auto; 
  padding-top:5%;
  width:50%;
  height:500px;
}

</style>