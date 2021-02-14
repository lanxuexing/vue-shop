import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000
  });

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 如果有些接口需要认证才能访问，则在这里统一处理
    return config; // 暂时直接放行
  }, err => {
    console.log(err)
  });

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data ? res.data : res;
  }, err => {
    // 如果有错误，在这里需要统一处理
    // 状态码：https://www.showdoc.com.cn/1207745568269674?page_id=6090117842667636
    console.log(err)
    // 如果有需要授权的才可以访问的接口，则统一跳转至登录页面
  });

  return instance(config);
}