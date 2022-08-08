<template>
  <div id="app">
    <app-page></app-page>
  </div>
</template>

<script>
import AppPageVue from './views/AppPage.vue'

export default {
  name: 'App',
  components: {
    "app-page": AppPageVue,
}
}
</script>

<style>

body{
  margin: 0%;
  background-color: #f4f7ff;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
</style>
