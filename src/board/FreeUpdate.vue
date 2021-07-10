<template>
<div>
	<div class="freeboardTop">        
    <!-- 페이지 상단 버튼 -->
    <div class="communitybtn-group" role="group">          
      <router-link to="/Community">
      <button class="btnc" type="button">영화 리뷰</button>
      </router-link>      
      <router-link to="/Freeboard">
      <button class="btnfa" type="button">자유 게시판</button>
      </router-link>
    </div>
        
		<div class="readHeader">
			<table>
				<tr>
					<td>
							<b-icon class="cancelArrow" icon="arrow-left-short" style="width:80; height:80px"></b-icon>
					</td>
					<td><h2>취소</h2></td>
				</tr>
			</table>
		</div>
	</div>
	<form @submit.prevent="updateForm">
	<div id="readPage">
		<div id="readTitle">
      <h2>
        <input type="text" v-model="updateData.title" ref="title" style="width:100%; border:none;">
      </h2>
    </div>
		<div id="readWriter">
      <input type="text" v-model="updateData.author_username" ref="writer" style="width:100%; border:none;">
		</div>
		<div id="readContent">
      <textarea id="Content" v-model="updateData.context" ref="content"></textarea>
		</div>

    <div id="updateBtn">
        <b-button type="submit" variant="primary" id="updateBtn_detail">수정하기</b-button>
    </div>

	</div>
  </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      updateData: [],
      id: "",
      title: "",
      author_username: "",
      context: "",
      form: "",
      like_form: "",

    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/film/freeboard/" + this.$route.params.id + "/"
    })
    .then(response => {
      this.updateData = response.data;
    })
    .catch(response => {
      console.log("Failed", response);
    })
  },
  methods: {
    returnList(){ //리스트 화면으로 이동 함수
      this.$router.go(-1);
		},

		updateForm: function() {
			if(!this.updateData.title) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			this.form = {
				title: this.updateData.title,
				author_username: this.updateData.author_username,
				context: this.updateData.context,
			}
			axios({
				method: "PATCH",
				url: 'http://127.0.0.1:8000/film/freeboard/' + this.$route.params.id + "/",
				data: this.form,						
			})
				.then((response) => {
					this.freeboard = response.data;
					alert('수정되었습니다.');
					this.returnList();
				})
        .catch((error) => {
            console.log("Failed to get userList", error.response);
        });
    }
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
	height:200px;
	margin-bottom: 30px;
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
  opacity: inherit;
  color: #ebebf5;
  border: none;
  margin-right: 20px;
}

#updateBtn {
 width: 100%;
 margin-left: 85%;
 margin-top: 40px;

}

#updateBtn_detail {
    background: rgba(69, 69, 77, 0.8);
    border: none;
}
.btnfa {
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
}
</style>
