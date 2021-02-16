import { request } from './request';

/**
 * 注册
 * @param {*} data 表单数据
 */
export function register(data) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data
  })
}