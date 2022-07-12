import request from '@/axios'
import qs from 'qs'
import app from '@/constants/app'
import { IHttpResponse } from "@/types/interface"

const scope = 'server'

export const loginByUsername = (username: string, password: string, code: string, randomStr: string): Promise<IHttpResponse> => {
  const grant_type = 'password'
  let dataObj = qs.stringify({'username': username, 'password': password})

  let basicAuth = 'Basic ' + window.btoa(app.formLoginClient)

  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      Authorization: basicAuth
    },
    method: 'post',
    params: {randomStr, code, grant_type, scope},
    data: dataObj
  })
}

export const loginByMobile = (mobile: string, code: string): Promise<IHttpResponse> => {
  const grant_type = 'app'

  let basicAuth = 'Basic ' + window.btoa(app.smsLoginClient)

  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      Authorization: basicAuth
    },
    method: 'post',
    params: {mobile: mobile, code: code, grant_type}
  })
}

export const getNav = (): Promise<IHttpResponse> => {
  return request({
    url: '/sys/menu/nav',
    method: 'get'
  })
}

export const getPermissions = (): Promise<IHttpResponse> => {
  return request({
    url: '/sys/menu/permissions',
    method: 'get'
  })
}

export const getInfo = (): Promise<IHttpResponse> => {
  return request({
    url: '/sys/user/info',
    method: 'get'
  })
}