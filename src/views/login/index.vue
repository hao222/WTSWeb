<template>
  <div id="login">
    <div class="content">
      <h1>web工时管理系统</h1>
      <div>
        <a class="username_img"></a>
        <input class="username" type="text" v-model="info.username" placeholder="请输入账号"
               @keyup.enter="next()">
      </div>
      <div class="password_div">
        <a class="password_img"></a>
        <input class="password" type="password" v-model="info.password" placeholder="请输入密码"
               @keyup.enter="ToPostLoginInData(info)"> <!--增加对确认键的监听-->
      </div>
      <a class="loginbtn" @click="ToPostLoginInData(info)">登录</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {URL, api} from 'API';

  export default {
    data () {
      return {
        info: {
          username: '',
          password: '',
        },
        hint: '',
        versionName: '',
      };
    },
    watch: {
      info: {
        handler (newVal) {
          this.info.username = newVal.username.replace(/[^_$0-9a-z]/g, "");
          this.info.password = newVal.password.replace(/[^_$0-9a-z]/g, "");
        },
        deep: true,
      },
    },
    created () {
      // this.$store.commit('UPDATE_IS_OTHER_LOGIN', false);

      // localStorage.removeItem("sessionid");
    },
    destroyed () {
    },
    methods: {
      // onBackPressed () {
      // },
      next () {
        document.getElementsByClassName("password")[0].focus();
      },
      ToPostLoginInData (info) {
        if (!info.username && info.password) {
          this.hint = "请输入账号";
          return;
        } else if (info.username && !info.password) {
          this.hint = "请输入密码";
          return;
        } else if (!info.username && !info.password) {
          this.hint = "请输入账号和密码";
          return;
        }
        this.postLoginData(info);
      },
      postLoginData (data) {
        // 提交登录数据
        api.post(URL.LOGIN, data).then(
          response => {
            console.log(response);
            if (typeof(response) !== 'undefined') {
              alert("登录成功")
              // localStorage.setItem('user_id', response.user_id);
              // this.$router.replace("/");
            }
          }).catch(function (error) {
            if(error.response){
              alert(error.response.data['detail']);
            }
          }
        );
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
