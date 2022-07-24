import {get, post} from './http'

const domain = "https://dream.cihss.net"

const api = {
    getTotalTime(uid) {
        return get(`${domain}/api/user/activity/get/${uid}/total/time`)
    }
}


module.exports = {api}