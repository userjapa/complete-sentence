<template>
  <div id="app">
    <div>
      <img src="./assets/logo.png">
      <h1>Complete the Sentences</h1>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-weight: normal;
}

.brd {
  border: 2px solid #ddd;
}
</style>
