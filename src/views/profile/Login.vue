<template>
  <div>
    <nav-bar>
      <template v-slot:default>登录</template>
    </nav-bar>
    <div class="content">
      <van-image
        lazy-load
        width="10rem"
        height="10rem"
        fit="contain"
        :src="require('assets/logo.png')"
      />
      <van-form @submit="onSubmit">
        <van-field
          v-model="email"
          name="电子邮箱"
          label="电子邮箱"
          placeholder="电子邮箱"
          :rules="[{ required: true, message: '请填写电子邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <router-link to="/register"><span class="link">没有账号，立即注册</span></router-link>
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="success"
            native-type="submit"
            loading-text="正在登录..."
            :loading="isLogin"
          >
          登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant';
import NavBar from 'components/common/navbar/NavBar'
import { login } from 'network/user'

export default {
  name: 'Login',
  components: {
    NavBar
  },
  setup () {
    let router = useRouter()
    // 是否正在登录
    let isLogin = ref(false)
    // 表单信息
    const userInfo = reactive({
      email: '',
      password: ''
    })
    // 提交
    const onSubmit = () => {
      if (isLogin.value) return
      isLogin.value = true
      login(userInfo).then(res => {
        if (res) {
          // 存储token到本地
          window.localStorage.setItem('token', res.access_token)
          isLogin.value = false
          Toast.success('登录成功')
          userInfo.email = ''
          userInfo.password = ''
          router.push({ path: '/' })
        }
      })
    }
    return {
      ...toRefs(userInfo), // 将响应式的对象变为普通对象，并执行对象解构，这样在模板中就可以直接使用属性了，不用：userInfo.xxx
      onSubmit,
      isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 50px;
  .link {
    font-size: 14px;
    margin-top: 20px;
    color: var(--color-tint);
    display: inline-block;
  }
}
</style>