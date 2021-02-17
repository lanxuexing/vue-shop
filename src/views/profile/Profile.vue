<template>
  <div class="content">
    <nav-bar>
      <template v-slot:default>个人中心</template>
    </nav-bar>
    <div class="user-content">
      <div class="user-info">
        <div class="info">
          <img src="~assets/logo.png" alt="">
          <div class="user-desc">
            <span>昵称：买买买</span>
            <span>登录名：bybyby</span>
            <span class="name">个性签名：我的你的爱不问归期</span>
          </div>
        </div>
        <div class="user-list">
          <li class="van-hairline--bottom">
            <span>我的收藏</span>
            <van-icon name="arrow"/>
          </li>
          <li class="van-hairline--bottom">
            <span>我的订单</span>
            <van-icon name="arrow"/>
          </li>
          <li class="van-hairline--bottom">
            <span>账号管理</span>
            <van-icon name="arrow"/>
          </li>
          <li class="van-hairline--bottom">
            <span>地址管理</span>
            <van-icon name="arrow"/>
          </li>
          <li class="van-hairline--bottom">
            <span>关于我们</span>
            <van-icon name="arrow"/>
          </li>
        </div>
        <div class="logout" @click="onLogout">
          <van-button round block color="#42B983">退出登录</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import NavBar from 'components/common/navbar/NavBar'
import { logout } from 'network/user'
import { onUnmounted } from 'vue'

export default {
  name: 'Profile',
  components: {
    NavBar
  },
  setup() {
    let router = useRouter()
    let store = useStore()
    // 定时器
    let timerId
    // 退出登录
    const onLogout = () => {
      logout().then(res => {
        if (res.status === 204) {
          Toast.success('退出成功')
          // 清除本地存储的token
          window.localStorage.clear()
          // 清除Vuex里存储的token
          store.commit('setIsLogin', false)
          timerId = window.setTimeout(() => {
            router.push({ path: '/login' })
          }, 100)
        }
      })
    }
    // 组件卸载
    onUnmounted(() => {
      timerId && clearTimeout(timerId)
    })
    return {
      onLogout
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 95px);
  background: #FCFCFC;
  .user-content {
    margin-top: 65px;
    .user-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 44px;
      line-height: 44px;
      padding: 0 10px;
      color: #252525;
      background: #FFFFFF;
      border-bottom: 1px solid #DCDCDC;
      .user-name {
        font-size: 14px;
      }
    }
    .user-info {
      width: 94%;
      margin: 10px;
      height: 115px;
      background: linear-gradient(90deg, #31C7A7, #A1C7C7);
      box-shadow: 0 2px 5px #269090;
      border-radius: 6px;
      margin-top: 50px;
      text-align: left;
      .info {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 25px 20px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-top: 4px;
        }
        .user-desc {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          line-height: 20px;
          font-size: 14px;
          color: #FFFFFF;
          span {
            color: #FFFFFF;
            font-size: 14px;
            padding: 2px 0;
          }
        }
        .account-setting {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 13px;
          color: #FFFFFF;
          .van-icon-setting-o {
            font-size: 16px;
            vertical-align: -3px;
            margin-right: 4px;
          }
        }
      }
    }
    .user-list {
      padding: 0 8px;
      margin-top: 40px;
      li {
        padding-left: 5px;
        padding-right: 5px;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin: 20px 0 !important;
        background: #FFFFFF;
        border-radius: 3px;
        .van-icon-arrow {
          margin-top: 13px;
        }
      }
    }
    .logout {
      margin-top: 16px;
    }
  }
}
</style>