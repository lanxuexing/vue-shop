<template>
  <div class="home">
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { getHomeAllData } from '../network/home'

export default {
  name: 'Home',
  components: {},
  setup() {
    onMounted(() => {
      console.log('首页挂载啦...');
      getHomeAllData().then(res => console.log(res))
    })
  }
}
</script>
