import {get, post} from './http'

const domain = "http://101.43.233.220:5651"

const api = {
    // my -> project 中的函数
    
    getIngProjectList(id) {
      return get(`${domain}/api/user/${id}/va`)
    },

    getProjectDetailByUidAndStatus(id, status) {
      // https://dream.cihss.net{{ifauth}}/user/va/{vid}/vapplications
      return get(`${domain}/api/user/va/${id}/vapplications?status=${status}`)
    }
    // login(data) {
    //    return post(`${domain}/login`, data)
    // },
    // reigster(){
    //   return post(`${domain}/register`, {})
    // }
}


module.exports = {api}