import {get, post} from './http'

const domain = "http://101.43.233.220:5651"


const api = {
    // post example
    login() {
       return post(`${domain}/login`, {})
    }
}


module.exports = {api}