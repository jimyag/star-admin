<template>
  <div class="container">
    <div class="loginBox">
      <a-form-model ref="loginFormRef" :rules="rules" :model="formdata" class="loginForm">
        <a-form-model-item prop="username">
          <a-input v-model="formdata.username" placeholder="请输入账号">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input v-model="formdata.password" placeholder="请输入密码" type="password" v-on:keyup.enter="login">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item :model="code" :span="13">
          <a-row>
            <a-col :span="6">
              <div class="login-code" width="100%" @click="refreshCode">
                <!--验证码组件-->
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
            </a-col>
            <a-col :span="18">
              <a-input v-model="code" auto-complete="off" placeholder="请输入验证码" >
                <a-icon slot="prefix" type="question-circle" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-col>

          </a-row>
        </a-form-model-item>
        <a-form-model-item class="loginBtn">

          <a-button type="info" shape="circle"  @click="resetForm" style="margin: 10px">
            <a-icon type="close-circle"/>
          </a-button>
          <a-button type="primary" @click="login" @keyup.enter="login" style="margin: 10px">
            登录
          </a-button>
          <a-button type="primary" @click="register" style="margin: 10px">
            点我注册
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import SIdentify from '../components/authCode/loginValid'

export default {
  components: {SIdentify},
  mounted() {
    // 初始化验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  data() {
    return {
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',//随机串内容
      identifyCode: "",
      code: "",
      formdata: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: 'blur'},
          {min: 4, max: 12, message: "用户名必须在4-12字符之间", trigger: 'blur'}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: 'blur'},
          {min: 10, max: 20, message: "密码必须在10-20字符之间", trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    register() {
      this.$router.push('/register')
    },
    login() {
      // console.log(this.$refs)
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error("输入非法数据，请重新输入")
        }
        if (this.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
          this.refreshCode()
          return this.$message.error("验证码不正确，请重新输入")

        }
        const {data:res}= await this.$http.post("/login",this.formdata)
        if(res.code===0){
          if(res.data.user.role!==1){
            this.refreshCode()
            return this.$message.error("权限不足")
          }
          window.sessionStorage.setItem("token", res.data.token)
          this.$message.success("登录成功")
          await this.$router.push("/index")
        }else {
          this.refreshCode()
          this.$message.info(res.msg)
        }
      })
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  background-color: #282c34;

  /*
  居中布局
  display: flex;
  justify-content: center;
  align-items: center;*/
}

.loginBox {
  width: 450px;
  height: 400px;
  background-color: #ffff;
  position: absolute;

  /*有较强的兼容性居中*/
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  /**/
  border-radius: 9px;
}

.loginForm {
  width: 100%;
  position: absolute;
  bottom: 10%;
  padding: 0 30px;
  box-sizing: border-box;
}

.loginBtn {
  display: flex;
  justify-content: flex-end;
}

</style>