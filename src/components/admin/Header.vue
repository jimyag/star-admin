<template>
  <a-button type="danger" @click="loginOut">注销登录</a-button>
</template>

<script>
export default {
  name: "Header",
  methods:{
    loginOut(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>