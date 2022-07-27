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

const api_center = {
  getListTeamApplicationsForUid(applicationid, status) {
    console.log("~~~~~", status);
    let uid = applicationid;
    // 不传uid就是查所有
    // return get(`${domain}/api/teams?status=${status}&uid=${uid}`, {})
    return get(`${domain}/api/teams?status=${status}`, {})
  },

  verifyTeamApplication(applicationid, action) {
    let id = applicationid;
    return put(`${domain}/api/teams/${id}/verify?action=${action}`, {});
  }
}
module.exports = {api}
module.exports = {api_center}
