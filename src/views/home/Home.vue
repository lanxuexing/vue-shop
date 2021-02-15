<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <!-- 轮播图 -->
    <div class="banner">
      <img src="~assets/images/banner1.jpg" alt="">
    </div>
    <!-- 推荐 -->
    <recommend :recommends="recommends"/>
    <!-- 选项卡 -->
    <tab-control :tabs="['畅销', '新书', '精选']" @tabClick="tabClick"/>
    <!-- 商品列表 -->
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
import { getHomeAllData, getHomeGoodsData } from 'network/home'
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import Recommend from './childComps/Recommend'
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: 'Home',
  components: {
    NavBar,
    Recommend,
    TabControl,
    GoodsList
  },
  setup() {
    const recommends = ref([])
    let currentTabType = ref('sales');
    let goods = reactive({
      sales: {page: 0, list: []},
      recommend: {page: 0, list: []},
      new: {page: 0, list: []}
    })
    onMounted(() => {
      getHomeAllData().then(res => {
        recommends.value = res.goods.data
      })
      // 畅销
      getHomeGoodsData('sales').then(res => {
        goods.sales.list = res.goods.data;
      })
      // 新书
      getHomeGoodsData('new').then(res => {
        goods.new.list = res.goods.data;
      })
      // 精选
      getHomeGoodsData('recommend').then(res => {
        goods.recommend.list = res.goods.data;
      })
    })
    let showGoods = computed(() => {
      return goods[currentTabType.value].list
    })
    const tabClick = (index) => {
      const types = ['sales', 'new', 'recommend']
      currentTabType.value = types[index]
    }
    return {
      recommends,
      tabClick,
      currentTabType,
      showGoods
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  img {
    width: 100%;
    height: auto;
    margin-top: 45px;
  }
}
</style>
