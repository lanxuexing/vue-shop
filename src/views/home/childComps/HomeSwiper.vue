<template>
  <div>
    <van-swipe v-if="banners?.length" class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <img :src="banner.img_url" :alt="banner.title">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  name: 'HomeSwiper',
  props: {
    banners: Array,
    default() {
      return []
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe {
  img {
    width: 100%;
    height: auto;
  }
}
</style>