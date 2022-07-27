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

const api_center = {
  // 1. 查看待审核的信息
  getListProjectApplicationsForUid_1(applicationUid, status) {
    let uid = applicationUid;
    return get(`${domain}/api/admin/project/application/${uid}?status=${status}`, {})
  },
  // 2. 查看通过/不通过的信息
  getListProjectApplicationsForUid_2(applicationUid, status) {
    let uid = applicationUid;
    return get(`${domain}/api/admin/my/project/action/${uid}?status=${status}`, {})
  },

  verifyProjectApplication(applicationUid, applicationid, action) {
    // Uid没用上
    let pid = applicationid;
    return put(`${domain}/api/admin/project/verify?projectId=${pid}&action=${action}`, {});
  }
}

module.exports = {api}
module.exports = {api_center}
