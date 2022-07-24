// pages/my/team/team.js
import {api} from '../../../../api/my-api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        Tabs: ['待启动', '进行中', '已结束'],
        status: ['pending', 'ongoing', 'finished']
    },

    tabSelect(e) {
        let that = this
        let TabCur = e.currentTarget.dataset.id
        that.setData({TabCur: TabCur})
        that.getMyProject(that.data.uid, that.data.status[TabCur])
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
            this.getMyProject(this.data.uid, that.data.status[i])
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

    // 查看我的项目
    getMyProject(uid, status) {
        let that = this
        api.getMyProject(uid, status).then(res=>{
            console.log(res, '查看我的项目 ' + status)
            if(res.data.code === 20000) {
                if (status == 'pending') {
                    that.setData({
                        pendingList: res.data.data
                    })
                }
                else if (status == 'ongoing') {
                    that.setData({
                        ongoingList: res.data.data
                    })
                }
                else if (status == 'finished'){
                    that.setData({
                        finishedList: res.data.data
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