import {get, post} from './http'

const domain = "https://dream.cihss.net"

const teamapi = {
    getTeamList() {
        return get(`${domain}/api/teams`)
    },

    getTeamDetail(id) {
        return get(`${domain}/api/teams/${id}`)
    },
    
    joinTeam(tid, uid) {
        return post(`${domain}/api/teams/${tid}/applications/${uid}`)
    }
}


module.exports = {teamapi}