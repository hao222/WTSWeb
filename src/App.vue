<!--App.vue是我们的主组件，页面入口文件 ，所有页面都是在App.vue下进行切换的。也是整个项目的关键，app.vue负责构建定义及页面组件归集。-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /*使子项目水平居中*/
    align-items: center; /*使子项目垂直居中*/
  }
</style>
