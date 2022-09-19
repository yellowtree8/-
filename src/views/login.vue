<template>
    <div class="login-index">
      <div class="container">
          <div class="user-info" v-if="isforget">
            <h1 class="title">Login</h1>
            <div class="account">
              <span class="ipt-title">账号</span>
              <input class="ipt" :value="account" type="text">
            </div>
            <div class="mima">
              <span class="ipt-title">密码</span>
              <input class="ipt" :value="password" type="password">
            </div>
            <a class="forget" href="javascript:;" @click="isforget = !isforget">忘记密码?</a>
            <div class="btn">
              <button @click="onLogin">登录</button>
              <button @click="isforget = !isforget">注册</button>
            </div>
          </div>
          <div v-else class="user-info shuoming">
            <a class="toutiao toutiao-zuojiantou" href="javascript:;" @click="fanhui">返回</a>
            <span>账号为学号，也可用通用账号2019051486<br>密码为jnu520,已经为您填充，请返回登录</span>
            <span>正在不断优化写后端接口，见谅</span>
          </div>          
      </div>
    </div>
</template>
<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      isforget: true,
      account: '',
      password: ''
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
    fanhui(){
      this.isforget = !this.isforget
      this.account = '2019051486'
      this.password = 'jnu520'
    },
    onLogin(){
      var regobj = /^[1-2][0-9]{9}$/
      if(this.account.match(regobj)&&this.password=='jnu520')
      {
        this.$router.push('/home')
        return
      }
    }
  }
}
</script>
<style scoped lang='less'>

  @keyframes anim {
    50%{
      transform: scale(1.5);
    }
    100%{
      transform: scale(1);
    }
  }
  *{
    margin: 0;
    padding: 0;
  }
  .login-index{
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
    .login-index::after{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: url('../images/bg.jpg');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      animation: anim 50s linear infinite;
    }
    .container{
      width: 350px;
      height: 350px;
      border: 1px solid rgb(120, 118, 120);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background-color: rgba(87, 81, 81,.3);
      backdrop-filter:blur(10px);
      transition: all 1s;
      z-index: 999
    }
    .user-info{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 30px 50px;
      box-sizing: border-box;
      width: 350px;
      height: 350px;

	    // -webkit-backdrop-filter:saturate(150%) blur(8px);
      .title{
        color: white;
        font-size: 36px;
      }
      .ipt-title{
        font-size: 14px;
      }
      .ipt{
        width: 250px;
        height: 32px;
        border-radius: 4px;
        background-color: rgba(172, 165, 165, 0.3);
        border: 1px solid rgb(175, 175, 175);
        color: white;
        font-size: 14px;
        padding-left: 20px;
        box-sizing: border-box;
        transition: all 1s;
      }
      .forget{
        font-size: 14px;
        text-decoration: none;
        color: rgb(230, 230, 230);
        margin-left: auto;
        transition: all .5s;
      }
      .forget:hover{
        color: white;
      }
      .btn{
        width: 100%;
        display: flex;
        justify-content: space-between;
        border: none;
        button{
          width: 120px;
          height: 36px;
          background-color: rgba(125, 85, 80,.6);
          border: rgb(211, 116, 75) solid 1px;
          border-radius: 4px;
          font-size: 14px;
          color: white;
          transition: background-color .5s;
        }
        button:hover{
          background-color: rgba(150, 100, 75, .6);
        }
      }
    }
    .shuoming{
      .toutiao-zuojiantou{
        font-size: 18px;
        color: rgb(200, 200, 200);
        margin-right: auto;
      }
      .toutiao-zuojiantou:hover{
        color: white;
      }
    }
</style>
