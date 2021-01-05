<template>
  <div id="login">
    <h1>工时管理系统</h1>

    <div class="content">
      <div class="account_div">
        <a class="username_img">账号: </a>
        <el-input class="username" type="text" v-model="info.username" placeholder="请输入账号"
                  @keyup.13.native="next()"></el-input>
      </div>
      <p></p>
      <div class="password_div">
        <a class="password_img">密码: </a>
        <el-input class="password" type="password" v-model="info.password" placeholder="请输入密码"
               @keyup.enter="ToPostLoginInData(info)" show-password> </el-input><!--增加对确认键的监听-->
      </div>
      <el-button type="primary" round class="forgetbtn" @click="">忘记密码?</el-button>

      <el-button type="primary" round class="loginbtn" @click="ToPostLoginInData(info)">登录</el-button>

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
      // 每次进来之前不用删token
      // localStorage.removeItem("token");
    },
    destroyed () {
    },
    methods: {
      next () {
        document.getElementsByClassName("password")[0].focus();
      },
      ToPostLoginInData (info) {
        if (!info.username && info.password) {
          this.hint = "请输入账号";
          this.$message({
            showClose: false,
            message: this.hint,
            type: 'warning'
          });
          return;
        } else if (info.username && !info.password) {
          this.hint = "请输入密码";
          this.$message({
            showClose: false,
            message: this.hint,
            type: 'warning'
          });
          return;
        } else if (!info.username && !info.password) {
          this.hint = "请输入账号和密码";
          this.$message({
            showClose: false,
            message: this.hint,
            type: 'warning'
          });
          return;
        }
        this.postLoginData(info);
      },

      postLoginData (data) {
        // 提交登录数据
        api.post(URL.LOGIN, data).then(
          response => {
            if (typeof(response) !== 'undefined') {
              this.alertMessage('success', '登录成功', true)

              localStorage.setItem('token', response.data['tk']);
              localStorage.setItem('uId', response.data['uId']);

              this.$router.replace("/home");

              let uid = localStorage.getItem("uId")
              api.get(URL.USERINFO(uid))

            }
          }).catch( error => {
            this.alertMessage('error',error.response.data['detail'], true)

          }
        );
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #login {
    width: 700px;
    height: 450px;
    display: flex;
    justify-content: center; /*使子项目水平居中*/
    align-items: center; /*使子项目垂直居中*/
    border: 1px solid #2a9cd5;
    border-radius: 10%;
    background-color: #FF8C00;
    h1{
      margin-right: 30px;
    }
    .content{
      width: 380px;
      height: 220px;
      background-color: #e8f0fe;
      border-radius: 10%;
      border: 1px solid black;
      div {
        display: flex;
        width: 340px;
        margin-top: 12px;
        margin-left: 15px;
        text-align: left;
        font-size: 18px;
      }
      .username_img {
        display: inline-block;
        margin-right: 2px;
        margin-top: 20px;

      }
      .username {
        flex: 1;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
        &::placeholder{
          color: #bfbebe;
        }
      }
      .password_img {
        display: inline-block;
        margin-right: 2px;
        margin-top: 20px;
      }
      .password {
        flex: 1;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
        &::placeholder{
          color: #bfbebe;
        }
      }
      .forgetbtn{
        margin-top: 25px;
        margin-left: 75px;
        font-size: 18px;
      }
      .loginbtn{
        margin-top: 25px;
        margin-left: 50px;
        font-size: 18px;
      }
    }

  }
</style>
