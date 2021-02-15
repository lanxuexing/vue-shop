<template>
  <div class="goods">
    <goods-item
      v-for="good in goods"
      :key="good.id"
      :product="good"/>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
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
  margin-bottom: 50px;
}
</style>