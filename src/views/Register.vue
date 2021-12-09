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
        <!--验证码-->
        <a-form-model-item :model="code" :span="13">
          <a-row>
            <a-col :span="6">
              <div class="login-code" width="100%" @click="refreshCode">
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

export default {
  components: {SIdentify},
  mounted() {
    // 初始化验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  data() {
    return {
      newUser: {
        username: '',
        password: '',
        role: 2,
        checkPass: '',
      },
      addUserRules: {
        username: [
          {
            validator: (rule, value, callback) => {
              if (this.newUser.username === '') {
                callback(new Error('请输入用户名'))
              }
              if ([...this.newUser.username].length < 4 || [...this.newUser.username].length > 12) {
                callback(new Error('用户名应当在4到12个字符之间'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              if (this.newUser.password === '') {
                callback(new Error('请输入密码'))
              }
              if ([...this.newUser.password].length < 10 || [...this.newUser.password].length > 20) {
                callback(new Error('密码应当在6到20位之间'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
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
    resetForm() {
      this.$refs.addUserRef.resetFields()
    },
    login() {
      this.$router.push('/login')
    },
    register() {
      // console.log(this.$refs)
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