<template>
  <a-layout-sider breakpoint="lg" v-model="collapsed">
    <div class="log">
        <span>
          {{collapsed?"Blog":"My Blog"}}
        </span>
    </div>

    <a-menu theme="dark" mode="inline" >
      <a-menu-item key="index" @click="goToPage">
        <a-icon type="dashboard"></a-icon>
        <span>仪表盘</span>
      </a-menu-item>

      <a-sub-menu >
        <span slot="title"><a-icon type="file"></a-icon> <span>文章管理</span></span>
        <a-menu-item key="addart" @click="goToPage">
          <a-icon type="form"></a-icon><span>写文章</span>
        </a-menu-item>
        <a-menu-item key="artlist" @click="goToPage">
          <a-icon type="snippets"></a-icon><span>文章列表</span>
        </a-menu-item>
      </a-sub-menu>

      <a-menu-item key="catelist" @click="goToPage"><a-icon type="book"></a-icon><span>分类列表</span></a-menu-item>
      <a-menu-item key="userlist" @click="goToPage"><a-icon type="user"></a-icon><span>用户列表</span></a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: "Nav",
  data(){
    return{
      collapsed:false
    }
  },
  methods:{
    goToPage(item){
      console.log(item)
      this.$router.push('/'+item.key).catch((err)=>err)
    }
  }
}
</script>

<style scoped>
.log {
  height: 32px;
  margin: 16px;
  background-color: #ffff;
  display: flex;
  justify-content: center;
  justify-items: center;
  font-size: 17px;
}
</style>