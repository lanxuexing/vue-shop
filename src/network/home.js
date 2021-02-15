import { request } from './request';

/**
 * @description 首页所有数据
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090131032550241
 */
export function getHomeAllData() {
  return request({
    url: '/api/index'
  })
}

/**
 * @description 商品推荐
 * @param {*} type 
 * @param {*} page 
 */
export function getHomeGoodsData(type = 'sales', page = 1) {
  return request({
    url: `/api/index?${type}=1&page=${page}`
  })
}