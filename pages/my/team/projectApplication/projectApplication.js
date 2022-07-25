// pages/my/team/team.js
import {myapi} from '../../../../api/my-api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        Tabs: ['待审核', '已通过', '未通过'],
        status: ['unverified', 'agreed', 'disagreed']
    },

    tabSelect(e) {
        let that = this
        let TabCur = e.currentTarget.dataset.id
        that.setData({TabCur: TabCur})
        that.getProjectApplication(that.data.uid, that.data.status[TabCur])
    },

    onLoad(options) {
        this.setData({
            uid: wx.getStorageSync('uid')
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let that = this
        for (let i = 0; i < that.data.status.length; i++) {
            this.getProjectApplication(this.data.uid, that.data.status[i])
        }  
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    // 查看项目申请
    getProjectApplication(uid, status) {
        let that = this
        myapi.getProjectApplication(uid, status).then(res=>{
            console.log(res, '查看项目申请 ' + status)
            if(res.data.code === 20000) {
                if (status == 'unverified') {
                    that.setData({
                        unverifiedList: res.data.data
                    })
                }
                else if (status == 'agreed') {
                    that.setData({
                        agreedList: res.data.data
                    })
                }
                else if (status == 'disagreed'){
                    that.setData({
                        disagreedList: res.data.data
                    })
                }   
            }
          })
    },
    
    /**
   * 跳转到项目详情
   */
  detail(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../projectDetail/projectDetail?item=' + item,
    })
  }
})