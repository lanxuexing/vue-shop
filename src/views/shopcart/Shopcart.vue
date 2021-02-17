<template>
  <div>
    <nav-bar>
      <template v-slot:default>购物车</template>
    </nav-bar>
    <div class="cart-content">
      <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup">
          <van-swipe-cell :right-width="50">
            <div class="good-item">
              <van-checkbox name=""/>
              <div class="good-img"><img src="~assets/logo.png" alt=""></div>
              <div class="good-desc">
                <div class="good-title">
                  <span>细说PHP</span>
                  <span>x100</span>
                </div>
                <div class="good-btn">
                  <div class="price"><small>¥</small>999.00</div>
                  <van-stepper integer :model-value="5" :min="1" :max="10" async-change />
                </div>
              </div>
            </div>
            <template #right>
              <van-button square icon="delete" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar :price="3050" button-text="结算" class="submit-all">
        <van-checkbox>全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'Shopcart',
  components: {
    NavBar
  },
  setup() {
    let checkboxGroup = ref(null)
    return {
      checkboxGroup
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
    margin-bottom: 50px;
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