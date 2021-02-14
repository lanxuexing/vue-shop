<template>
  <div>
    <h1>首页</h1>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { getHomeAllData } from 'network/home'

export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      console.log('首页挂载啦...');
      getHomeAllData().then(res => console.log(res))
    })
  }
}
</script>
