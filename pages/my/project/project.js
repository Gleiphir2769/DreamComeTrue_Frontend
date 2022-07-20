// pages/my/team/team.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        Tabs: ['申请中', '被拒绝', '已通过'],
    },

    tabSelect(e) {
        let TabCur = e.currentTarget.dataset.id;
        this.setData({TabCur: TabCur})

    },
    onLoad(options) {
        let {p, title} = options;
        let Tabs = [];
        //志愿者页面
        if (p === "1") {
            Tabs = ['已报名', '申请中', '被拒绝']
        } else if (p === "2") {
            Tabs = ['申请中', '被拒绝', '已通过']
        }
        //志愿队伍页面
        else if (p === "3") {
            Tabs = ['待启动', '进行中', '已结束']
        } else if (p === "4") {
            Tabs = ['待审核', '已通过', '未通过']
        }
        //志愿中心页面
        else if (p === "5") {
            Tabs = ['通过', '未通过']
        } else if (p === "6") {
            Tabs = ['通过', '未通过']
        }
        this.setData({
            Tabs
        })
        wx.setNavigationBarTitle({
            title
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

    }
})