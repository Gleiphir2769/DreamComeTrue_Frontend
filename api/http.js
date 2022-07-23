const headers={}
const getToken=()=>{
  let token=wx.getStorageSync('token')
  if(token)
    token=`Bearer ${token}`
  return token
}
const getHeader=(extraHeaders)=>{
    let h={"Token":getToken()}
    for(let item in extraHeaders){
      h[item]=headers[item]
    }
    return h
}

function get(url, headers={}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method:'get',
            headers:getHeader(headers),
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

function post(url,data,headers={}) {
  return new Promise((resolve, reject) => {
      wx.request({
          url,
          method:'post',
          headers:getHeader(headers),
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