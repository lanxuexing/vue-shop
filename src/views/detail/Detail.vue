<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情: {{id}}</template>
    </nav-bar>
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