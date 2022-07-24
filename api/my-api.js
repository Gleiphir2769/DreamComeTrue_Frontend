import {get, post} from './http'

const domain = "https://dream.cihss.net"

const api = {
    getTotalTime(uid) {
        return get(`${domain}/api/user/activity/get/${uid}/total/time`)
    },

    getMember(tid, status) {
        return get(`${domain}/api/teams/${tid}/applications?status=${status}`)
    }
}


module.exports = {api}