import {get, post, put} from './http'

const domain = "https://dream.cihss.net"

const api = {
    // my -> project 中的函数
    getIngProjectListByUidAndStatus(uid, status) {
      return get(`${domain}/api/user/${uid}/va?status=${status}`)
    },

    getProjectDetailByUidAndStatus(uid, status) {
      // https://dream.cihss.net{{ifauth}}/user/va/{uid}/vapplications
      return get(`${domain}/api/user/va/${uid}/vapplications?status=${status}`)
    },

    postSignIn(uid, pid, inTime) {
      // https://dream.cihss.net{{ifauth}}/user/activity/{uid}/in/{pid}
      return post(`${domain}/api/user/activity/${uid}/in/${pid}?inTime=${inTime}`)
    },

    putSignOut(uid, pid, outTime) {
      // https://dream.cihss.net{{ifauth}}/user/activity/{uid}/in/{pid}
      return put(`${domain}/api/user/activity/${uid}/out/${pid}?outTime=${outTime}`)
    },

    getProjectTimeLong(uid, pid) {
      // https://dream.cihss.net{{ifauth}}/user/activity/get/{uid}/{pid}/time
      return get(`${domain}/api/user/activity/get/${uid}/${pid}/time`)
    },

    GetCurrentTimeStr() {
      var currentDate = new Date();
      var year = currentDate.getFullYear().toString();
      var month = (currentDate.getMonth() + 1).toString();
      if (month.length === 1){
          month = "0" + month;
      }
      var date = currentDate.getDate().toString();
      if (date.length === 1){
          date = "0" + date;
      }
      var hour = currentDate.getHours().toString();
      if (hour.length === 1){
          hour = "0" + hour;
      }
      var minute = currentDate.getMinutes().toString();
      if (minute.length === 1){
          minute = "0" + minute;
      }
      var second = currentDate.getSeconds().toString();
      if (second.length === 1){
          second = "0" + second;
      }
  
      return year+"-"+month+"-"+date+" " + hour+":"+minute+":"+second;
  }
}


module.exports = {api}