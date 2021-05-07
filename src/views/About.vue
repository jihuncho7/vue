<template>


  <div>
    <div>
    <h1>About Page</h1>
    </div>
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
  </div>
</template>
<script>
export default {

}
</script>