// pages/project/projectDetail/projectDetail.js
import {api} from '../../../api/project-api'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let item = JSON.parse(options.item)
        this.setData({
            item,
            uid: wx.getStorageSync('uid'),
            pid: item.id
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

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