const state = {
  // 用户信息
  user: {
    // 登录状态
    isLogin: window.localStorage.getItem('token') ? true : false
  }
}

export default state
