function get(url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method:'get',
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

function post(url,data) {
  return new Promise((resolve, reject) => {
      wx.request({
          url,
          method:'post',
          success: (res) => {
              resolve(res)
          },
          fail: (res) => {
              reject(res)
          }
      })
  })
}
module.exports={
  get,post
}