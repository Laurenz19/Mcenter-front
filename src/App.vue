<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">

@import './assets/scss/index.scss';

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

input:hover{
  border-color: #02718A !important;
  outline: none !important;
}
</style>
