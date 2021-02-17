<template>
  <div>
    <nav-bar>
      <template v-slot:default>购物车({{$store.state.cartCount}})</template>
    </nav-bar>
    <div class="cart-content">
      <div class="cart-body">
        <van-checkbox-group v-model="checkboxResult" @change="checkboxGroupChange" ref="checkboxGroup">
          <van-swipe-cell :right-width="50" v-for="(item, index) in list" :key="index">
            <div class="good-item">
              <van-checkbox :name="item.id"/>
              <div class="good-img"><img src="~assets/logo.png" alt=""></div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{item.goods.title}}</span>
                  <span>x{{item.goods.stock}}</span>
                </div>
                <div class="good-btn">
                  <div class="price"><small>¥</small>{{item.goods.price + '.00'}}</div>
                  <van-stepper
                    integer
                    async-change
                    :name="item.id"
                    :model-value="item.num"
                    :min="1"
                    :max="item.goods.stock"
                    @change="onChangeNum"/>
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                icon="delete"
                type="danger"
                class="delete-button"
                @click="onDeleteCart(item.id)"/>
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar :price="3050" button-text="结算" class="submit-all">
        <van-checkbox v-model:checked="checkAll" @click="allCheckboxChange">全选</van-checkbox>
      </van-submit-bar>
      <div class="empty" v-if="!list.length">
        <img class="empty-cart" src="~assets/logo.png" alt="">
        <div class="title">购物车空空如也</div>
        <van-button round color="#1BAEAE" type="primary" @click="goToBy">前往选购</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import NavBar from 'components/common/navbar/NavBar'
import { getCart, updateCart, checkedCart, deleteCart } from 'network/shopcart'

export default {
  name: 'Shopcart',
  components: {
    NavBar
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    let checkboxGroup = ref(null)
    // 购物车数据模型
    const state = reactive({
      list: [],
      checkboxResult: [], // 每个商品复选框组合
      checkAll: true // 全选
    })
    // 初始化
    const init = () => {
      Toast.loading({message: '加载中...', forbidClick: true})
      getCart('goods').then(res => {
        state.list = res.data
        state.checkboxResult = res.data.filter(x => x.is_checked).map(y => y.id)
        Toast.clear()
      })
    }
    // 组件挂载
    onMounted(() => {
      init()
    })
    // 异步改变商品数量
    const onChangeNum = (value, detail) => {
      Toast.loading({message: '修改中...', forbidClick: true})
      updateCart(detail.name, {num: value}).then(() => {
        // 客户端同步数据改变
        state.list.forEach(item => {
          if (item.id === detail.name) {
            item.value = value
          }
        })
        Toast.clear()
      })
    }
    // 复选框切换
    const checkboxGroupChange = (result) => {
      Toast.loading({message: '修改中...', forbidClick: true})
      state.checkboxResult = result // 同步双向绑定
      if (result.length === state.list.length) {
        state.checkAll = true
      } else {
        state.checkAll = false
      }
      // 同步数据库
      checkedCart({cart_ids: result}).then(() => {
        Toast.clear()
      })
    }
    // 全选
    const allCheckboxChange = () => {
      state.checkAll = !state.checkAll
      if (!state.checkAll) {
        state.checkAll = true
        state.checkboxResult = state.list.map(c => c.id)
      } else {
        state.checkAll = false
        state.checkboxResult = []
      }
    }
    // 侧滑删除
    const onDeleteCart = (id) => {
      deleteCart(id).then(() => {
        Toast.success('删除成功')
        store.dispatch('updateCart') // Vuex派发更新购物车的Actions
        init()
      })
    }
    // 前往购物
    const goToBy = () => {
      router.push({ path: '/' })
    }
    return {
      checkboxGroup,
      ...toRefs(state),
      goToBy,
      onChangeNum,
      checkboxGroupChange,
      allCheckboxChange,
      onDeleteCart
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-content {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          width: 100px;
          height: auto;
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 60px;
    .van-checkbox {
      margin-left: 0;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: red;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: red;
    border-color: red;
  }
}
</style>