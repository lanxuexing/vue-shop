<template>
  <div class="home">
    <!-- 导航栏 -->
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <!-- 选项卡(滚动的时候动态) -->
    <tab-control v-show="isTabFixed" :tabs="['畅销', '新书', '精选']" @tabClick="tabClick"/>
    <div class="wrapper">
      <div class="content">
        <div ref="bannerRef">
          <!-- 轮播图 -->
          <home-swiper :banners="banners"/>
          <!-- 推荐 -->
          <recommend :recommends="recommends"/>
        </div>
        <!-- 选项卡 -->
        <tab-control :tabs="['畅销', '新书', '精选']" @tabClick="tabClick"/>
        <!-- 商品列表 -->
        <goods-list :goods="showGoods"/>
      </div>
    </div>
    <!-- 回到顶部 -->
    <back-top v-show="isTabFixed" @backtop="backtop"/>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watchEffect, nextTick } from 'vue'
import BetterScroll from 'better-scroll'
import { getHomeAllData, getHomeGoodsData } from 'network/home'
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import Recommend from './childComps/Recommend'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/common/backTop/BackTop'
import HomeSwiper from './childComps/HomeSwiper'

export default {
  name: 'Home',
  components: {
    NavBar,
    Recommend,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper
  },
  setup() {
    const recommends = ref([]) // 顶部Banner推荐
    const banners = ref([]) // 轮播图
    let currentTabType = ref('sales');
    let goods = reactive({
      sales: {page: 1, list: []},
      recommend: {page: 1, list: []},
      new: {page: 1, list: []}
    })
    let bs = reactive({}) // 滚动器
    const bannerRef = ref(null); // 顶部Banner区域的引用
    let isTabFixed = ref(false); // Tab是否吸顶
    onMounted(() => {
      getHomeAllData().then(res => {
        recommends.value = res.goods.data
        banners.value = res.slides
      })
      // 畅销
      getHomeGoodsData('sales').then(res => {
        goods.sales.list = res.goods.data
      })
      // 新书
      getHomeGoodsData('new').then(res => {
        goods.new.list = res.goods.data
      })
      // 精选
      getHomeGoodsData('recommend').then(res => {
        goods.recommend.list = res.goods.data
      })
      // 创建BetterScroll滚动容器对象
      bs = new BetterScroll(document.querySelector('.wrapper'), {
        probeType: 3, // 只要在运动就触发scroll事件
        click: true, // 允许点击
        pullUpLoad: true, // 允许上拉加载更多
      })
      // 正在滚动
      bs.on('scroll', (position) => {
        const currHeight = -position.y;
        isTabFixed.value = currHeight > bannerRef.value.offsetHeight;
      })
      // 上拉加载（当底部下拉距离超过阈值）
      bs.on('pullingUp', async () => {
        const page = goods[currentTabType.value].page + 1
        await getHomeGoodsData(currentTabType.value, page).then(res => {
          goods[currentTabType.value].list.push(...res.goods.data)
          goods[currentTabType.value].page += 1
        })
        bs.finishPullUp() // 每次触发 pullingUp 钩子后，主动调用 finishPullUp() 告诉 BetterScroll 准备好下一次的 pullingUp 钩子
        bs && bs.refresh() // 重新计算高度
        console.log('contentHeight: '+ document.querySelector('.content').clientHeight)
        console.log('当前类型： '+ currentTabType.value + ',' + page)
      })
    })
    // 实时监听
    watchEffect(() => {
      nextTick(() => {
        bs && bs.refresh() // 重新计算高度
      })
    })
    // 选项卡切换筛选不同选项的数据
    let showGoods = computed(() => {
      return goods[currentTabType.value].list
    })
    // 选项卡切换
    const tabClick = (index) => {
      const types = ['sales', 'new', 'recommend']
      currentTabType.value = types[index]
      nextTick(() => {
        bs && bs.refresh() // 重新计算高度
      })
    }
    // 回到顶部
    const backtop = () => {
      bs.scrollTo(0, 0, 300)
    }
    return {
      recommends,
      tabClick,
      currentTabType,
      showGoods,
      isTabFixed,
      bannerRef,
      backtop,
      banners
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  position: relative;
  .wrapper {
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
