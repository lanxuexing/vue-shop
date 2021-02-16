const mutations = {
  // 设置用户信息
  // 登录状态
  setIsLogin(state, payload) {
    state.user.isLogin = payload
  }
}

export default mutations