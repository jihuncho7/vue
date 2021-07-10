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

		<div class="writeHeader">
			<table>
				<tr>
					<td>
						<router-link to="/Freeboard">
							<b-icon class="cancelArrow" icon="arrow-left-short" style="width:80; height:80px"></b-icon>
						</router-link>
					</td>
					<td><h2>취소</h2></td>
				</tr>
			</table>
		</div>
	</div>
	<form @submit.prevent="sendForm">
	<div id="writePage">
		<div id="writePageTitle">
			<div id="writePageHeader"><h1>글쓰기</h1></div>
			<div id="writePageSubmit">
				<b-button type="submit" variant="primary">등록</b-button>
			</div>
		</div>
		<div id="writeTitle">
			<input type="text" v-model="title" ref="title" style="font-size:30px; border:none;" placeholder="제목을 입력하세요">
		</div>
		<div id="writeContent">
			<textarea id="Content" v-model="context" ref="content" placeholder="내용을 입력하세요"></textarea>
		</div>
    <div class="tag_group" style="">
      <b-button @click="mytoggle(1)" :pressed.sync="myt" pill variant="outline-secondary">#정보공유</b-button>
      <b-button @click="mytoggle(2)" :pressed.sync="myt2" pill variant="outline-secondary">#일상</b-button>
      <b-button @click="mytoggle(3)" :pressed.sync="myt3" pill variant="outline-secondary">#잡담</b-button>
    </div>
<!--    태그 보여주기 구현중-->
<!--    <template>-->
<!--      <div>-->
<!--        <b-form-tags input-id="tags-basic" v-model="tagslisten"></b-form-tags>-->
<!--        <p class="mt-2">Value: {{ tagslisten }}</p>-->
<!--      </div>-->
<!--    </template>-->
	</div>

	</form>

</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			title: "",
			context: "",
			form: "",
      myt : false,
      myt2 : false,
      myt3 : false,
      tags: '',
      category : '',

		}
	},
	props:["propsdata"],
	methods:{
    mytoggle(req) {
      if (req === 1) {
        this.category = '정보공유'
        this.myt2 = false
        this.myt3 = false
        return true
      }
      if (req === 2) {
        this.category = '일상'
        this.myt = false
        this.myt3 = false
        return true
      }
      if (req === 3) {
        this.category = '잡담'
        this.myt = false
        this.myt2 = false
        return true
      }
    },
		returnList(){ //리스트 화면으로 이동 함수
			this.$router.push({path:'./Freeboard',query:this.body});			
		},
    sendForm() {
			if(!this.title) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			this.form = {
				title: this.title,
				context: this.context,
        category: this.category,
			}

			axios({
				method: "POST",
				url: 'http://127.0.0.1:8000/film/freeboard/',
				data: this.form,

			})

				.then((response) => {
					this.freeboard = response.data;
					alert('등록되었습니다.');
					this.returnList();
				})
        .catch((error) => {
            console.log("Failed", error.response);
        });
		}		
	},

}
</script>


<style>
.writeHeader {
	margin-top: -15px;
	margin-bottom: -30px;
}

#writePage {
	background-color: white;
	border-radius: 10px;
	padding: 10%;
}

#writePageTitle {
	margin-top:-40px;
	border-bottom: 1px solid black;
	padding-bottom: 60px;
}

#writePageHeader {
	float:left;
}

#writePageSubmit {
	float:right;
}


#writeTitle {
	border-bottom: 1px solid black;
	margin-top: 30px;
}

#writeContent {
	border-bottom: 1px solid black;
}

#Content {
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
</style>
