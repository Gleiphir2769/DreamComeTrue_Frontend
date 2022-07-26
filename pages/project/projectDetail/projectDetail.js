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
      let item = options.item
      let p = JSON.parse(item)
      console.log("options.item:" + p)
      let status = options.status
      this.setData({
          item: p,
          uid: wx.getStorageSync('uid'),
          pid: p.id,
          status: status
      })
    },
    
    // 报名
    apply() {
        let that = this
        let uid = that.data.uid
        let pid = that.data.pid
        api.apply(uid, pid).then(res=>{
            console.log(res, '报名')
            if(res.data.code === 20000) {
                wx.showToast({
                    title: '报名成功',
                    icon: 'success',
                    duration: 2000,
                })
            }else{
              wx.showToast({
                title: '不能重复加入',
                image: '../../../images/icons/wrong.png',
                duration: 2000
            })
            }
        })
    }
})