import request from '@/utils/request'
import { getLocalStorage } from '@/utils/local.js'

export function getList() {
  return request({
    url: '/api/table/list',
    method: 'get',
    params: {
      data: JSON.stringify({localId: getLocalStorage('token')})
    }
  })
}
