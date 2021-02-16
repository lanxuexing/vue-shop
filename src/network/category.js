import { request } from './request';

/**
 * @description 商品列表
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090132003760639
 */
export function getCategoryData() {
  return request({
    url: '/api/goods'
  })
}

/**
 * @description 商品列表
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090132003760639
 * @param {*} order 排序
 * @param {*} cid 分类ID
 * @param {*} page 分页
 */
export function getCategoryGoodsData(order = 'sales', cid = 0, page = 1) {
  return request({
    url: `/api/goods?category_id=${cid}&page=${page}&${order}=1`
  })
}
