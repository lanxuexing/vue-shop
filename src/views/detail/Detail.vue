<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'Detail',
  components: {
    NavBar
  }
}
</script>