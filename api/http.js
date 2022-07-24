const headers={}
const getToken=()=>{
  let token=wx.getStorageSync('token')
  if(token)
    token=`Bearer ${token}`
  return token
}
const getHeader=(extraHeaders)=>{
    let h={"Authorization":getToken()}
    for(let item in extraHeaders){
      h[item]=extraHeaders[item]
    }
    return h
}

function get(url, header={}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method:'get',
            header:getHeader(header),
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

function post(url,data,header={}) {
  console.log(getHeader(header))
  return new Promise((resolve, reject) => {
      wx.request({
          url,
          method:'post',
          header:getHeader(header),
          data,
          success: (res) => {
              resolve(res)
          },
          fail: (res) => {
              reject(res)
          }
      })
  })
}

function put(url,data,header={}) {
  console.log(getHeader(header))
  return new Promise((resolve, reject) => {
      wx.request({
          url,
          method:'put',
          header:getHeader(header),
          data,
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
  get,post,put
}