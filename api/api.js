import {get, post} from './http'

const domain = "http://101.43.233.220:5651"


const api = {
    // post example
    login(data) {
       return post(`${domain}/login`, data)
    },
    reigster(){
      return post(`${domain}/register`, {})
    }
}


module.exports = {api}