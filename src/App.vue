<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <div id="nav">

      </div>
      <router-view/>
    </div>
  </a-config-provider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data(){
    return{
      local:zh_CN
    }
  }
}
</script>