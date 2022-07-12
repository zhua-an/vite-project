import request from '@/axios'
import { IHttpResponse } from "@/types/interface"



export const getDict = (): Promise<IHttpResponse> => {
  return request({
    url: '/sys/dict/type/all',
    method: 'get'
  })
}