<template>
  <div class="goods">
    <goods-item/>
    <goods-item/>
    <goods-item/>
    <goods-item/>
    <goods-item/>
    <goods-item/>
    <goods-item/>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsItem
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
}
</style>