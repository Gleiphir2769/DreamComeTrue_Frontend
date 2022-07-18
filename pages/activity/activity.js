// pages/activity/activity.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        Tabs: ['通知公告', '活动动态', '志愿故事', '心得感悟'],
        activities: [
            {'id': 0, title: '专属徽章！献给北京疫情防控志愿者', desc: '', time: '2022-07-03', source: '志愿北京', type: '通知公告'},
            {'id': 1, title: '“夏至”将至，4.5万份防暑物资为抗疫志愿者送清凉', desc: '', time: '2022-07-03', source: '志愿北京', type: '通知公告'},
            {'id': 2, title: '近万份保障物资运抵志愿服务一线', desc: '', time: '2022-07-03', source: '志愿北京', type: '通知公告'},
            {
                'id': 3,
                title: '志愿中心组织观看庆祝中国共产主义青年团成立100 周年大会',
                desc: '',
                time: '2022-07-03',
                source: '志愿北京',
                type: '通知公告'
            },
            {
                'id': 4,
                title: '北京2022年冬奥会和冬残奥会城市志愿者(北京市)指挥',
                desc: '',
                time: '2022-07-03',
                source: '志愿北京',
                type: '通知公告',
                thumb: 'https://s.zhiyuanyun.com/www.chinavolunteer.cn/cms/202006/09/5edefd1a52334.jpg'
            },
            {
                'id': 5,
                title: '今起有序恢复！他们的努力值了！',
                time: '2022-07-03',
                source: '志愿北京',
                type: '活动动态',
            },
            {
                'id': 6,
                title: '“密云这些青年，靠谱！”',
                time: '2022-07-03',
                source: '志愿北京',
                type: '活动动态',
            }, {
                'id': 7,
                title: '看昌平“企业志愿者”，助力疫情防控一线',
                time: '2022-07-03',
                source: '志愿北京',
                type: '活动动态',
            }
            , {
                'id': 8,
                title: '“榆”你一起，“青”力战疫！',
                time: '2022-07-03',
                source: '志愿北京',
                type: '活动动态',
            }
        ],
        currentActivities: []
    },
    tabSelect(e) {
        let TabCur = e.currentTarget.dataset.id;
        this.setData({TabCur: TabCur})
        this.getCurrentActivities();

    },
    getCurrentActivities() {
        let currentTab = this.data.Tabs[this.data.TabCur];
        this.setData({
            currentActivities: this.data.activities.filter(item => item.type === currentTab)
        })
    },
    onLoad(options) {
        this.getCurrentActivities()
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