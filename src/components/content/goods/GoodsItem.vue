<template>
  <div class="goods-item">
    <img src="~assets/images/1.jpg" alt="">
    <div class="goods-info">
      <p>标题</p>
      <span class="price"><small>$</small>100</span>
      <span class="collect"><i class="iconfont icon-collect"></i>3</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>
.goods-item {
  position: relative;
  width: 46%;
  padding-bottom: 40px;
  img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price {
      color: red;
      margin-right: 20px;
    }
    .collect {
      position: relative;
      i {
        font-size: 12px;
        margin-right: 6px;
      }
    }
  }
}
</style>