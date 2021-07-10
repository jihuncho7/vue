import axios from 'axios';

const kakaoHeader = {
  'Authorization': '1f247eb61fd7b2d3f328f2367caf2de6',
  'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
};
const getKakaoToken = async (code) => {
  try {
      const data = {
          grant_type: 'authorization_code',
          client_id: '3d961dbb12a532f3120d8a5a7f0db730',
          redirect_uri: 'http://localhost:8080/Login',
          code: code,
      };
      const queryString = Object.keys(data)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
          .join('&');
      const result = await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader });
      return result;
  } catch (e) {
      return e;
  }
};

const getKakaoUserInfo = async () => {
  let data = '';
  await window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
          data = response;
      },
      fail: function (error) {
          console.log(error);
      },
  });
  console.log('카카오 계정 정보', data);
  return data;
}

const naverService = () => {

    const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "Fr0D7K07ckqEJ77ZBbFT",
        callbackUrl: "http://localhost:8080/Login",
        isPopup: false /* 팝업을 통한 연동처리 여부 */,
        loginButton: {
            color: "green",
            type: 3,
            height: 70,
        }
    });
    const setNaver = () => {
        naverLogin.init();
    };    
    const getUserInfo = () => {
        naverLogin.getLoginStatus((status) => {
            //var access_token = naverLogin.user.access_token;
            if (status) {
                var email = naverLogin.user.email;
                var name = naverLogin.user.name;
                var id = naverLogin.user.id; //code 값
                console.log("네이버 로그인", naverLogin)

                console.log(email, name, id);
                        axios({
                            method:"POST",
                            url: 'http://127.0.0.1:8000/login/naver/todjango/',
                            data: {
                                access_token: naverLogin.accessToken.accessToken,
                                code: naverLogin.user.id,
                            },
                            
                        })
                        .then(response => {
                            var keyData = response.data.key;
                            sessionStorage.setItem('login', 'Naver')
                            sessionStorage.setItem('key', keyData)
                            sessionStorage.setItem('thumbnail', naverLogin.user.profile_image)
                            sessionStorage.setItem('nickname', naverLogin.user.nickname)
                            window.location.href='http://localhost:8080/'
                        })

            } else {
                console.log("AccessToken이 올바르지 않습니다.");
            }
        });
    };
    return {
        setNaver,
        getUserInfo,
    };
};

export {
  getKakaoToken, 
  getKakaoUserInfo,
  naverService,

}