import {
  get,
  post,
  put
} from './http'

const domain = "https://dream.cihss.net"


const api = {
  // post example
  login(data) {
    return post(`${domain}/login`, data, {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  reigster() {
    return post(`${domain}/register`, {})
  },
  getUserInfo(uid) {
    let role = wx.getStorageSync('role')
    return get(`${domain}/api/${role}/${uid}`)
  },
  userRegister(data) {
    return post(`${domain}/api/register?role=user`, data)
  },
  updateUserProfile(uid,data) {
    let role = wx.getStorageSync('role')
    return put(`${domain}/api/${role}/${uid}`,data)
  }
}


module.exports = {
  api
}