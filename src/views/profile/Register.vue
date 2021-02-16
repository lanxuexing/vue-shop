<template>
  <div>
    <nav-bar>
      <template v-slot:default>注册</template>
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
          v-model="name"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="password_confirmtion"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请再次确认密码' }]"
        />
        <van-field
          v-model="email"
          name="电子邮箱"
          label="电子邮箱"
          placeholder="电子邮箱"
          :rules="[{ required: true, message: '请填写电子邮箱' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="success" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { onUnmounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Notify, Toast } from 'vant';
import NavBar from 'components/common/navbar/NavBar'
import { register } from 'network/user'

export default {
  name: 'Register',
  components: {
    NavBar
  },
  setup () {
    let router = useRouter()
    // 定时器
    let timerId;
    // 表单信息
    const userInfo = reactive({
      name: '',
      password: '',
      password_confirmtion: '',
      email: ''
    })
    // 提交
    const onSubmit = () => {
      if (userInfo.password !== userInfo.password_confirmtion) {
        Notify('两次密码输入不一致！')
        return;
      }
      register(userInfo).then(res => {
        if (res.status === 201) {
          Toast.success('注册成功')
          timerId = window.setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 1000);
          userInfo.password = ''
          userInfo.password_confirmtion = ''
        }
      })
      onUnmounted(() => {
        timerId && clearTimeout(timerId)
      })
    }
    return {
      ...toRefs(userInfo), // 将响应式的对象变为普通对象，并执行对象解构，这样在模板中就可以直接使用属性了，不用：userInfo.xxx
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 50px;
}
</style>