import { request } from './request'

/**
 * 添加购物车
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090135175185450
 * @param {*} data 数据 goods_id 商品ID  num 商品数量,至少是1
 */
export function addCart(data) {
  return request({
    url: '/api/carts',
    method: 'post',
    data
  })
}

/**
 * 购物车列表
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090136141900463
 * @param {*} data 数据 include 包含额外的数据： goods 商品
 */
export function getCart(data = '') {
  return request({
    url: data ? `/api/carts?include=${data}` : '/api/carts'
  })
}

/**
 * 购物车数量改变
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090136645604802
 * @param {*} data 数据 cart 购物车ID  num 商品数量 至少是1
 */
export function updateCart(id, data) {
  return request({
    url: `/api/carts/${id}`,
    method: 'put',
    data
  })
}

/**
 * 移出购物车
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090137365579295
 * @param {*} data 数据 cart 购物车id
 */
export function deleteCart(id) {
  return request({
    url: `/api/carts/${id}`,
    method: 'delete'
  })
}

/**
 * 购物车改变选中
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6125001913503134
 * @param {*} data 数据 cart_ids 要操作的购物车id数组, {0:2, 1:3} => [2, 3]
 */
export function deleteCart(data) {
  return request({
    url: '/api/carts/checked',
    method: 'patch',
    data
  })
}