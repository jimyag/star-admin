<template>
  <div class="container">
    <div class="loginBox">

      <a-form-model :model="newUser" :rules="addUserRules" ref="addUserRef" class="loginForm">
        <a-form-model-item prop="username">
          <a-input v-model="newUser.username" placeholder="请输入账号">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="password">
          <a-input-password v-model="newUser.password" placeholder="请输入密码">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input-password>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="checkpass">
          <a-input-password v-model="newUser.checkpass" placeholder="请再次输入密码">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input-password>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="email">
          <a-input v-model="newUser.email" placeholder="请输入邮箱">
            <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="code">
          <a-row>
            <a-col :span="18">
              <a-input v-model="newUser.code" placeholder="请输入5位验证码">
                <a-icon slot="prefix" type="insurance" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-col>
            <a-col :span="6">
              <a-col :span="6">
                <a-button @click="handleSend" :disabled="msgKey">{{ msgText }}</a-button>
              </a-col>
            </a-col>

          </a-row>

        </a-form-model-item>
        <!--验证码-->
        <a-form-model-item :model="code" :span="13">
          <a-row>
            <a-col :span="6">
              <div class="login-code" width="100%" @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
            </a-col>
            <a-col :span="18">
              <a-input v-model="code" auto-complete="on" placeholder="请输入验证码">
                <a-icon slot="prefix" type="question-circle" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-col>

          </a-row>
        </a-form-model-item>
        <a-form-model-item class="loginBtn">
          <a-button type="primary" @click="register" @keyup.enter="register" style="margin: 10px">
            注册
          </a-button>
          <a-button type="primary" @click="login" style="margin: 10px">
            点我登录
          </a-button>
        </a-form-model-item>
      </a-form-model>

    </div>
  </div>
</template>

<script>
import SIdentify from '../components/authCode/loginValid'
import {validatePassword, validateUsername, validateEmail, validateCode} from "@/plugin/validator";

const MSGINIT = '发送验证码'
// const MSGERROR = '验证码发送失败'
const MSGSCUCCESS = '${time}秒后重发'
const MSGTIME = 60
export default {

  components: {SIdentify},
  mounted() {
    // 初始化验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  data() {
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      newUser: {
        email: "",
        username: '',
        password: '',
        role: 2,
        checkPass: '',
        code: "",
      },
      addUserRules: {
        email: validateEmail,
        username: validateUsername,
        password: validatePassword,
        code: validateCode,
        checkpass: [
          {
            validator: (rule, value, callback) => {
              if (this.newUser.checkpass === '') {
                callback(new Error('请输入密码'))
              }
              if (this.newUser.password !== this.newUser.checkpass) {
                callback(new Error('密码不一致，请重新输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',//随机串内容
      identifyCode: "",
      code: "",
    }
  },
  methods: {
    async handleSend() {
      console
      this.$refs.addUserRef.validateField("email", (verifycode_check) => {
        if (verifycode_check) {
          return this.$message.error("邮箱验证未通过")
        }
      })
      console.log("sss")
      const {data: res} = await this.$http.post(`email/${this.newUser.email}`)
      console.log(res)
      if (res.code === 0) {
        this.$message.info("验证码已发送，请注意查收")
      } else {
        this.$message.error(res.msg)
      }
      if (this.msgKey) {
        return
      }
      this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
      this.msgKey = false
      const time = setInterval(() => {
        this.msgTime--
        this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
        const msgKey = false;
        if (this.msgTime === 0) {
          this.msgTime = MSGTIME
          this.msgText = MSGINIT
          this.msgKey = msgKey
          clearInterval(time)
        }
      }, 1000)
    },
    resetForm() {
      this.$refs.addUserRef.resetFields()
    },
    login() {
      this.$router.push('/login')
    },
    register() {
      this.$refs.addUserRef.validate(async valid => {
        if (!valid) {
          return this.$message.error("输入非法数据，请重新输入")
        }
        if (this.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
          this.refreshCode()
          return this.$message.error("验证码不正确，请重新输入")

        }
        const {data: res} = await this.$http.post('/register', this.newUser) //es6的语法糖 解构赋值
        console.log(res)
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.$message.success("注册成功，请登录")
        await this.$router.push('/login')
      })
    },
    // 刷新验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成验证码
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
  height: 600px;
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