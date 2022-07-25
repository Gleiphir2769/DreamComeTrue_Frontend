import {get, post, put} from './http'

const domain = "https://dream.cihss.net"// /api/master/va/1

const api = {
  // post example
  getListProjectApplicationsForTid(status) {
    let tid = 3;
    return get(`${domain}/api/master/va/${tid}/tapplications?status=${status}`, {})
  },

  verifyProjectApplication(applicationUid, applicationPid, action) {
    let pid = applicationPid;
    let uid = applicationUid;
    return put(`${domain}/api/master/va/${pid}/applications/${uid}?action=${action}`, {});
  }
}

module.exports = {api}