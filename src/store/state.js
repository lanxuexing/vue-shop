const state = {
  // 用户信息
  user: {
    // 登录状态
    isLogin: window.localStorage.getItem('token') ? true : false
  },
  // 购物车的商品数量
  cartCount: 0
}

export default state
