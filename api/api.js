import {get, post} from './http'

const domain = "https://dream.cihss.net"


const api = {
    // post example
    login(data) {
       return post(`${domain}/login`, data, {'Content-Type': 'application/x-www-form-urlencoded' })
    },
    reigster(){
      return post(`${domain}/register`, {})
    },
    getUserInfo(uid){
      let role=wx.getStorageSync('role')
      return get(`${domain}/api/${role}/${uid}`)
    }
}


module.exports = {api}