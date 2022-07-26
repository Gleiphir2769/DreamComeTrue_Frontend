// pages/project/projectDetail/projectDetail.js
import {api} from '../../../api/project-api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      item: {},
      uid: null,
      pid: null,
      status: null,
      role:'user'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(){
      let role=wx.getStorageSync('role')
      this.setData({
        role
      })
    },
    onLoad: function (options) {
<<<<<<< HEAD
      let item = JSON.parse(options.item)
||||||| merged common ancestors
      let item = options.item
      let p = JSON.parse(item)
      console.log("options.item:" + p)
      let status = options.status
      console.log("options.status:" + status)
=======
      let item = options.item
      let p = JSON.parse(item)
      console.log("options.item:" + p)
      let status = options.status
>>>>>>> 0ff52c25fff8a2fe82a91f7710adb0d993fcd020
      this.setData({
          item,
          uid: wx.getStorageSync('uid'),
<<<<<<< HEAD
          pid: item.id
||||||| merged common ancestors
          pid: item.id,
          status: status
=======
          pid: p.id,
          status: status
>>>>>>> 0ff52c25fff8a2fe82a91f7710adb0d993fcd020
      })
    },
    
    // 加入
    apply() {
        let that = this
        let uid = that.data.uid
        let pid = that.data.pid
        api.apply(uid, pid).then(res=>{
            console.log(res, '加入')
            if(res.data.code === 20000) {
                wx.showToast({
                    title: '加入成功',
                    icon: 'success',
                    duration: 2000,
                })
            }
            else if (res.data.code === 50006) {
              wx.showToast({
                title: '不能重复加入',
                icon: 'error',
                duration: 2000
            })
            }
        })
    }
})