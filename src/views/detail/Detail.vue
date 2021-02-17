<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情</template>
    </nav-bar>
    <van-image
      class="thumb_img"
      width="100%"
      lazy-load
      :src="detail.cover_url"
    />
    <van-card
      class="goods_card"
      :num="detail.stock"
      :price="detail.price"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger" v-show="detail.is_recommend != 1">新品</van-tag>
        <van-tag plain type="danger" v-show="detail.is_recommend == 1">热门</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="onAddCart">加入购物车</van-button>
        <van-button type="danger" @click="onByCart">立即购买</van-button>
      </template>
    </van-card>
    <van-tabs v-model:active="activeTab">
      <van-tab title="概述">
        <div class="overview_content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <van-empty class="empty_content" v-show="!detail.comments || detail.comments?.length == 0" description="暂时没有评论噢" />
      </van-tab>
      <van-tab title="相关图书">
        <!-- 商品列表 -->
        <goods-list :goods="like_goods"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref, toRefs } from 'vue'
import NavBar from 'components/common/navbar/NavBar'
import GoodsList from 'components/content/goods/GoodsList'
import { getDetail } from 'network/detail'
import { addCart } from 'network/shopcart'
import { Toast } from 'vant'

export default {
  name: 'Detail',
  components: {
    NavBar,
    GoodsList
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    // 路由参数
    let id = ref(null)
    id.value = route.query.id
    // 详情
    let book = reactive({
      detail: {},
      like_goods: []
    })
    // 选项卡
    let activeTab = ref(0)
    // 组件挂载
    onMounted(() => {
      getDetail(id.value).then(res => {
        console.log('商品详情: ', res);
        book.detail = res.goods
        book.like_goods = res.like_goods
      })
    })
    // 加入购物车
    const onAddCart = () => {
      addCart({goods_id: book.detail.id, num: 1 }).then(res => {
        if (res.status === 201 || res.status === 204) {
          Toast.success('添加成功')
        }
      })
    }
    // 立即购买
    const onByCart = () => {
      addCart({goods_id: book.detail.id, num: 1 }).then(res => {
        if (res.status === 201 || res.status === 204) {
          Toast.success('添加成功，去购物车结账')
          router.push({path: '/shopcart'})
        }
      })
    }
    return {
      ...toRefs(book),
      activeTab,
      onAddCart,
      onByCart
    }
  }
}
</script>

<style lang="scss" scoped>
.thumb_img {
  margin-top: 50px;
}
.goods_card {
  text-align: left;
}
.overview_content {
  padding: 10px;
  margin-bottom: 50px;
  ::v-deep .book-detail-content {
    text-align: justify;
    text-indent: 2em;
  }
  ::v-deep img {
    width: 100% !important;
    height: auto !important;
  }
}
.empty_content {
  margin-bottom: 50px;
}
</style>