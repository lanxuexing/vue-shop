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
    <goods-list/>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getHomeAllData } from 'network/home'
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
    let checkedTabIndex = ref(0);
    onMounted(() => {
      getHomeAllData().then(res => {
        console.log(res)
        recommends.value = res.goods.data
      })
    })
    const tabClick = (index) => {
      console.log('父组件收到Tab变化: ', index);
      checkedTabIndex.value = index
    }
    return {
      recommends,
      tabClick,
      checkedTabIndex
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
