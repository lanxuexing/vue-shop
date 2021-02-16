<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>
    <!-- 主体 -->
    <div class="content">
      <van-tabs class="orderTab" v-model="active" @click="onTabsClick">
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
        <van-card
          v-for="goods in showGoods"
          :key="goods.id"
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
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
import NavBar from 'components/common/navbar/NavBar'
import { getCategoryData, getCategoryGoodsData } from 'network/category'

export default { 
  name: 'Category',
  components: {
    NavBar 
  },
  setup() {
    let activeKey = ref(0)
    let activeName = ref(1)
    let categories = ref([])
    let active = ref(1)
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
    })
    // 切换选项卡
    const onTabsClick = (index) => {
      const orders = ['sales', 'price', 'comments_count']
      currentOrder.value = orders[index]
      getCategoryGoodsData(currentOrder.value, currentCId.value).then(res => {
        goods[currentOrder.value].list = res.goods.data
      })
    }
    // 切换侧边导航栏（通过分类得到商品）
    const onSidebarItemClick = (cid) => {
      currentCId.value = cid
      getCategoryGoodsData(currentOrder.value, currentCId.value).then(res => {
        goods[currentOrder.value].list = res.goods.data
      })
    }
    // 动态筛选商品
    const showGoods = computed(() => {
      return goods[currentOrder.value].list
    })
    return {
      activeKey,
      activeName,
      categories,
      active,
      onTabsClick,
      onSidebarItemClick,
      showGoods
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
    top: 95px;
    left: 130px;
    right: 0;
    height: 100vh;
    text-align: left;
  }
}
</style>