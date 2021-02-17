import { request } from './request';

/**
 * 注册
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090123481636428
 * @param {*} data 表单数据
 */
export function register(data) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data
  })
}

/**
 * 登录
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090123591593835
 * @param {*} data 表单数据
 */
export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

/**
 * 退出
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090124449535342
 */
export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}

/**
 * 用户信息
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090133286102831
 */
export function getUserInfo() {
  return request({
    url: '/api/user',
  })
}