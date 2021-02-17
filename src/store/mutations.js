const mutations = {
  // 设置用户信息
  // 登录状态
  setIsLogin(state, payload) {
    state.user.isLogin = payload
  },
  // 添加购物车
  addCart(state, payload) {
    state.cartCount = payload.count
  }
}

export default mutations