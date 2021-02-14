import { request } from './request';

/**
 * @link https://www.showdoc.com.cn/1207745568269674?page_id=6090131032550241
 */
export function getHomeAllData() {
  return request({
    url: '/api/index'
  })
}
