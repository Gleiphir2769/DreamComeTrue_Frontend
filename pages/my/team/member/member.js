// pages/my/member/member.js
import {api} from '../../../../api/my-api'
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
        this.setData({
            uid: wx.getStorageSync('uid'),
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
        let that = this
        let tid = that.data.uid
        let status = 'agreed'
        // 获取我的成员
        api.getMember(tid, status).then(res=>{
            console.log(res, '获取我的成员')
            if(res.data.code === 20000) {
                let memberList = []
                for (let i = 0; i < res.data.data.length; i++) {
                    let volunteer = res.data.data[i].volunteer
                    volunteer.joinTime = res.data.data[i].updateTime.replace('T', ' ')
                    memberList.push(volunteer)
                }
                that.setData({
                    memberList,
                })
            }
        })
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

    }
})