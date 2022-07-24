import {get, post} from './http'

const domain = "https://dream.cihss.net"

const api = {
    getTotalTime(uid) {
        return get(`${domain}/api/user/activity/get/${uid}/total/time`)
    },

    getMember(tid, status) {
        return get(`${domain}/api/teams/${tid}/applications?status=${status}`)
    },

    getProjectApplication(uid, status) {
        return get(`${domain}/api/master/project/status/${uid}?status=${status}`)
    },

    getMyProject(uid, status) {
        return get(`${domain}/api/master/my/project/status/now/${uid}?status=${status}`)
    }
}


module.exports = {api}