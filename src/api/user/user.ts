import request from '@/axios'
import qs from 'qs'
import app from '@/constants/app'

const scope = 'server'

export const loginByUsername = (username: string, password: string, code: string, randomStr: string) => {
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

export const loginByMobile = (mobile: string, code: string) => {
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