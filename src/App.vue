<template>
  <div id="app">
    <Header />
    <div id="content" class="content">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "./components/layout/Header"
import Footer from './components/layout/Footer'
export default {
  name: 'App',
  components: {
    Header, Footer
  }

}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');


#app {
  background-color: #231909;
  font-family: 'Nanum Gothic', sans-serif;
  width: auto;
  margin: auto;
}

</style>
