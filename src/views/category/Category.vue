<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>
    <!-- 主体 -->
    <div class="content">
      <van-tabs class="orderTab" v-model:active="activeTab" @click="onTabsClick">
        <van-tab title="销量"></van-tab>
        <van-tab title="价格"></van-tab>
        <van-tab title="评论"></van-tab>
      </van-tabs>
      <van-sidebar class="leftmenu" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            v-for="item in categories"
            :key="item.id"
            :title="item.name"
            :name="item.id"
          >
            <van-sidebar-item
              v-for="sub in item.children"
              :key="sub.id"
              :title="sub.name"
              @click="onSidebarItemClick(sub.id)"/>
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodslist">
        <div class="scroll_wrapper">
          <van-card
            v-for="(goods, index) in showGoods"
            :key="goods.id + '-' + activeTab + '-' + index"
            :num="goods.sales"
            :tag="goods.sales > 0 ? '热门' : '新品'"
            :price="goods.price"
            :desc="goods.updated_at"
            :title="goods.title"
            :thumb="goods.cover_url"
            lazy-load
          />
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <back-top v-show="isBackTop" @backtop="backtop"/>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watchEffect, nextTick } from 'vue'
import BetterScroll from 'better-scroll'
import NavBar from 'components/common/navbar/NavBar'
import BackTop from 'components/common/backTop/BackTop'
import { getCategoryData, getCategoryGoodsData } from 'network/category'

export default { 
  name: 'Category',
  components: {
    NavBar,
    BackTop
  },
  setup() {
    let activeKey = ref(0)
    let activeName = ref(1)
    let categories = ref([])
    let activeTab = ref(0)
    // 商品排序
    let currentOrder = ref('sales')
    // 分类ID
    let currentCId = ref(0)
    // 数据模型
    const goods = reactive({
      sales: {page: 1, list: []},
      price: {page: 1, list: []},
      comments_count: {page: 1, list: []},
    })
    // 滚动器
     let bs = reactive({})
     // 是否显示回到顶部
     let isBackTop = ref(false);
    // 初始化
    const init = () => {
      getCategoryGoodsData('sales', currentCId.value).then(res => {
        goods.sales.list = res.goods.data
      })
      getCategoryGoodsData('price', currentCId.value).then(res => {
        goods.sales.list = res.goods.data
      })
      getCategoryGoodsData('comments_count', currentCId.value).then(res => {
        goods.comments_count.list = res.goods.data
      })
    }
    // 组件挂载
    onMounted(() => {
      getCategoryData().then(res => {
        categories.value = res.categories
      })
      init()
      // 创建BetterScroll滚动容器对象
      bs = new BetterScroll(document.querySelector('.goodslist'), {
        probeType: 3, // 只要在运动就触发scroll事件
        click: true, // 允许点击
        pullUpLoad: true, // 允许上拉加载更多
      })
      // 正在滚动
      bs.on('scroll', (position) => {
        const currHeight = -position.y;
        isBackTop.value = currHeight > 300;
      })
      // 上拉加载（当底部下拉距离超过阈值）
      bs.on('pullingUp', async () => {
        const page = goods[currentOrder.value].page + 1
        await getCategoryGoodsData(currentOrder.value, currentCId.value, page).then(res => {
          goods[currentOrder.value].list.push(...res.goods.data)
          goods[currentOrder.value].page += 1
        })
        bs.finishPullUp() // 每次触发 pullingUp 钩子后，主动调用 finishPullUp() 告诉 BetterScroll 准备好下一次的 pullingUp 钩子
        bs && bs.refresh() // 重新计算高度
        console.log('contentHeight: '+ document.querySelector('.scroll_wrapper').clientHeight)
        console.log('当前类型： '+ currentOrder.value + ',' + page)
      })
    })
    // 切换选项卡
    const onTabsClick = async (index) => {
      const orders = ['sales', 'price', 'comments_count']
      currentOrder.value = orders[index]
      await getCategoryGoodsData(currentOrder.value, currentCId.value).then(res => {
        goods[currentOrder.value].list = res.goods.data
      })
      nextTick(() => {
        bs && bs.refresh() // 重新计算高度
      })
    }
    // 切换侧边导航栏（通过分类得到商品）
    const onSidebarItemClick = async (cid) => {
      currentCId.value = cid
      await getCategoryGoodsData(currentOrder.value, currentCId.value).then(res => {
        goods[currentOrder.value].list = res.goods.data
      })
      nextTick(() => {
        bs && bs.refresh() // 重新计算高度
      })
    }
    // 动态筛选商品
    const showGoods = computed(() => {
      return goods[currentOrder.value].list
    })
    // 实时监听
    watchEffect(() => {
      nextTick(() => {
        bs && bs.refresh() // 重新计算高度
      })
    })
    // 回到顶部
    const backtop = () => {
      bs.scrollTo(0, 0, 300)
    }
    return {
      activeKey,
      activeName,
      categories,
      activeTab,
      onTabsClick,
      onSidebarItemClick,
      showGoods,
      bs,
      isBackTop,
      backtop
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 45px;
  display: flex;
  .orderTab {
    height: 50px;
    position: fixed;
    top: 45px;
    left: 130px;
    right: 0;
    z-index: 2;
  }
  .leftmenu {
    width: 130px;
    position: fixed;
    top: 110px;
    left: 0;
  }
  .goodslist {
    flex: 1;
    position: absolute;
    top: 0;
    right: 0;
    left: 130px;
    height: 100vh;
    text-align: left;
    .scroll_wrapper {
      padding-top: 95px;
    }
  }
}
</style>