<template>
  <div class="app">

    <router-view></router-view>

  </div>
</template>
<script>

export default {
  /*
  //Обработка просроченных токенов
  created: function () {
    this.axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("Logout")
        }
        throw err;
      });
    });
  }
  */

}
</script>

<style>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}
</style>
