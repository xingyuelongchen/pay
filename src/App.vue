<template>
  <div id="app">
    <router-view />
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  padding: 0;
  margin: 0;
}
</style>
