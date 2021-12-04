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
        <a-form-model-item class="loginBtn">
          <a-button type="primary"  @click="login" style="margin: 10px">
            登录
          </a-button>
          <a-button type="info" @click="resetForm" style="margin: 10px">
            取消
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: 'blur'},
          {min: 4, max: 12, message: "用户名必须在4-12字符之间", trigger: 'blur'}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: 'blur'},
          {min: 10, max: 20, message: "密码必须在10-20字符之间", trigger: 'blur'}
          // {
          //   required: true,
          //   pattern: new RegExp(/^1[3456789]\d{9}$/),
          //   message: '密码必须全数字',
          //   trigger: 'blur'
          // }
        ]
      }
    }
  },
  methods:{
    resetForm(){
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      // console.log(this.$refs)
      this.$refs.loginFormRef.validate(async valid=>{
        if (!valid){
          return this.$message.error("输入非法数据，请重新输入")
        }
        // const {data:res} = await this.$http.post('login',this.formdata) //es6的语法糖 解构赋值
        // if(res.status!==200){
        //   return this.$message.error(res.message)
        // }
        window.sessionStorage.setItem("token","sssssssssssssssssssssss")
        this.$message.success("登录成功")
        await this.$router.push('/admin/index')
      })
    }
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
  height: 300px;
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
  padding: 0 20px;
  box-sizing: border-box;
}

.loginBtn {
  display: flex;
  justify-content: flex-end;
}

</style>