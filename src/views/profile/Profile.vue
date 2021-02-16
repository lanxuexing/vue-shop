<template>
  <div>
    <nav-bar>
      <template v-slot:default>个人中心</template>
    </nav-bar>
    <div class="content">
      <div class="logout" @click="onLogout">
         <van-button round block color="#44BA80">退出登录</van-button>
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
  margin-top: 45px;
  .logout {
    margin: 400px 20px;
  }
}
</style>