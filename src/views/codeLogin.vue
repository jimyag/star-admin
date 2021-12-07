<template>
  <a-form-model class="codeForm">
    <!--邮箱-->
    <a-form-model-item :rules="loginRules" :ref="loginForm" :model="loginForm">
      <a-input placeholder="邮箱" v-model="loginForm.mail">
        <a-icon type="mail"></a-icon>
      </a-input>
    </a-form-model-item>
    <!--邮箱验证码-->
    <a-form-model-item>
      <a-row>
        <a-col :span="18">
          <a-input placeholder="验证码" v-model="loginForm.code">
            <a-icon type="safety-certificate"/>
          </a-input>
        </a-col>
        <a-col :span="6">
          <a-button @click="handleSend" :disabled="msgKey">{{ msgText }}</a-button>
        </a-col>
      </a-row>
    </a-form-model-item>
    <a-form-model-item class="loginBtn">
      <a-button type="primary" @click="register" style="margin: 10px">
        注册
      </a-button>
      <a-button type="primary" @click="login" style="margin: 10px">
        点我登录
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
const MSGINIT = '发送验证码'
// const MSGERROR = '验证码发送失败'
const MSGSCUCCESS = '${time}秒后重发'
const MSGTIME = 60
export default {
  name: "codeLogin",
  data() {
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      loginForm: {
        mail: "1@jimyag.cn",
        code: "",
      },
      loginRules: {
        phone: [{
          validator: (rule, value, callback) => {
            if (value.length !== 11) {
              callback(new Error("邮箱格式"))
            } else {
              callback()
            }
          }
        }],
        code: [{
          validator: (rule, value, callback) => {
            if (value.length !== 4) {
              callback(new Error("请输入4位验证码"))
            }
          }
        }]
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleSend() {
      if (this.msgKey) return
      console.log("sssssssssss")
      console.log("只执行一次")
      this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
      this.msgKey = true
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
    login() {
    },
    register() {

    }
  },
}

</script>


<style scoped>

.codeForm {
  width: 100%;
  position: absolute;
  bottom: 10%;
  padding: 0 30px;
  box-sizing: border-box;
}

</style>