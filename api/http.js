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

const token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjE2NTg2NDU5NzY2ODksInVpZCI6Miwicm9sZSI6InVzZXIiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV91c2VyIn1dLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6IjE4MTM4MzIyMzg1In0.3IvcRYrsULVFitHCh9TOVEzwAOXXB5vasowH3F6lGZw";

function get(url, headers={}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method:'get',
            header: {
              "Authorization": token,
            },
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