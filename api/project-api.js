import {get, post} from './http'

const domain = "https://dream.cihss.net"

const api = {
    getAllTeams(uid, status) {
        return get(`${domain}/api/master/project/teams/${uid}?status=${status}`)
    },

    getAllCenters(uid) {
      return get(`${domain}/api/master/project/admins/${uid}`)
    },

    publishProject(uid, data) {
        return post(`${domain}/api/master/project/apply/${uid}`, data)
    }
}


module.exports = {api}