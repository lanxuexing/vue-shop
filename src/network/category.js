import { request } from './request';

/**
 * @description 首页分类数据
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090131032550241
 */
export function getCategoryData() {
  return request({
    url: '/api/goods'
  })
}
