<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>
    <!-- 主体 -->
    <div class="content">
      <div class="orderTab">
        
      </div>
      <van-sidebar class="leftmenu" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            v-for="item in categories"
            :key="item.id"
            :title="item.name"
            :name="item.id"
          >
            <van-sidebar-item v-for="sub in item.children" :key="sub.id" :title="sub.name" />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodslist">

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import NavBar from 'components/common/navbar/NavBar'
import { getCategoryData } from 'network/category'

export default { 
  name: 'Category',
  components: {
    NavBar 
  },
  setup() {
    let activeKey = ref(0)
    let activeName = ref(1)
    let categories = ref([])

    onMounted(() => {
      getCategoryData().then(res => {
        console.log('分类数据: ', res)
        categories.value = res.categories
      })
    })
    return {
      activeKey,
      activeName,
      categories
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 45px;
  display: flex;
  .orderTab {
    background-color: red;
    width: 100%;
    height: 50px;
    position: fixed;
    top: 45px;
    left: 130px;
    right: 0;
    z-index: 2;
  }
  .leftmenu {
    background-color: green;
    width: 130px;
    position: fixed;
    top: 110px;
    left: 0;
  }
  .goodslist {
    background-color: blue;
    flex: 1;
    position: absolute;
    top: 95px;
    left: 130px;
    right: 0;
    height: 100vh;
  }
}
</style>