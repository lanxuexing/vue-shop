<template>
  <div class="backtop" @click="backtop">
    <i class="iconfont icon-up"></i>
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  setup (props, {emit}) {
    return {
      backtop: () => {
        emit('backtop')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.backtop {
  position: fixed;
  bottom: 80px;
  right: 30px;
  z-index: 99;
  i {
    font-size: 32px;
    background-color: #FFF;
    border-radius: 50%;
    color: var(--color-tint);
    box-shadow: var(--color-shadow);
  }
}
</style>