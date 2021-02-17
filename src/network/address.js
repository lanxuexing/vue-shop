import { request } from './request'

/**
 * 添加地址
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090144069190423
 * @param {*} params 参数
 */
export function addAddress(params) {
  return request({
    url: '/api/address',
    method: 'post',
    params
  })
}

/**
 * 编辑地址
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090146081593419
 * @param {*} params 参数 address 地址ID
 */
export function editAddress(id, params) {
  return request({
    url: `/api/address/${id}`,
    method: 'put',
    params
  })
}

/**
 * 删除地址
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090146266749247
 * @param {*} params 参数 address 地址ID
 */
export function deleteAddress(id) {
  return request({
    url: `/api/address/${id}`,
    method: 'delete'
  })
}

/**
 * 地址列表
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090144806342124
 */
export function getAddress() {
  return request({
    url: '/api/address'
  })
}

/**
 * 地址详情
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090145328842862
 * @param {*} id 参数 address 地址ID
 */
export function getAddressDetail(id) {
  return request({
    url: `/api/address/${id}`
  })
}