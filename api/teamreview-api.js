import {get, post, put} from './http'

const domain = "http://101.43.233.220:5651"

const api = {
  // post example
  getListTeamApplicationsForTid(status) {
    let tid = 3;
    // let status = 'agreed';
    return get(`${domain}/api/teams/${tid}/applications?status=${status}`, {})
  },

  verifyTeamApplication(applicationid, action) {
    return put(`${domain}/api/applications/team/${applicationid}?action=${action}`, {});
  }
}

module.exports = {api}