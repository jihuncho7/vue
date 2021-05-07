// components/Content.vue 파일 수정

<template>
  <div>
    <v-container fluid>
      <v-layout column>
        <v-flex xs12>
          <h3 class="subject">User CRUD</h3>
        </v-flex>
        <!-- 수정 부분 start -->
        <v-flex column>
          <v-row>
            <v-col cols="4" md="4">
              <!-- 합이 12가 되면 전체 화면을 사용한다는 의미입니다. -->
              <v-text-field v-model="username" :counter="15" label="Username" required></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field v-model="age" label="Age" required></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field v-model="city" :counter="15" label="City" required></v-text-field>
            </v-col>
          </v-row>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-btn @click="create" style="background: green">create</v-btn>
            <v-btn @click="clear" style="background: red">clear</v-btn>
          </v-form>
        </v-flex>
        <!-- 수정 부분 end -->

        <v-flex class="userList" column>
          <v-card max-width="600" tile>
            <v-list-item v-for="(data, index) in propsdata" v-bind:key="index">
              <v-list-item-content>
                <v-list-item-title>이름 : {{ data.id }}</v-list-item-title>
                <v-list-item-subtitle>나이 : {{ data.title }}세, 거주지: {{ data.context }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props:["propsdata"]
};
</script>

<style>
.subject {
  color: blue;
  font-style: oblique;
  padding: 30px;
  text-align: center;
}
.userList {
  margin: 30px 0px 30px 0px;
}
</style>