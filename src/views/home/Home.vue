<template>
  <div>
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { getHomeAllData } from 'network/home'
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'Home',
  components: {
    NavBar
  },
  setup() {
    onMounted(() => {
      console.log('首页挂载啦...');
      getHomeAllData().then(res => console.log(res))
    })
  }
}
</script>
