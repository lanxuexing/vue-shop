<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情: {{id}}</template>
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
        <van-button type="warning">加入购物车</van-button>
        <van-button type="danger">立即购买</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref, toRefs } from 'vue'
import NavBar from 'components/common/navbar/NavBar'
import { getDetail } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    NavBar
  },
  setup() {
    const route = useRoute()
    // 路由参数
    let id = ref(null)
    id.value = route.query.id
    // 详情
    let book = reactive({
      detail: {},
      like_goods: []
    })
    // 组件挂载
    onMounted(() => {
      getDetail(id.value).then(res => {
        console.log('商品详情: ', res);
        book.detail = res.goods
        book.like_goods = res.like_goods
      })
    })
    return {
      id,
      ...toRefs(book)
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
</style>