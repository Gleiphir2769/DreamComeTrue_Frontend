// pages/my/projectReview/projectReview.js
import {api} from '../../../api/projectreview-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    Tabs: ['申请中', '被拒绝', '已通过'],
    //测试mock数据
    mockData:[],
  },

  tabSelect(e) {
    let TabCur = e.currentTarget.dataset.id;
    this.setData({TabCur: TabCur})

    let status;
    if (TabCur == '0') {
      status = 'unverified';
    } else if(TabCur == '1') {
      status = 'disagreed';
    } else {
      status = 'agreed';
    }

    let a = async () => {
      let result = await api.getListProjectApplicationsForTid(status);
      console.log(result);
      this.setData({result:result.data.data});
      // this.timeFormatSeconds(result.data.data);
    }
    a();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let status = 'unverified';

    let a = async () => {
      let result = await api.getListProjectApplicationsForTid(status);
      console.log(result);
      this.setData({result:result.data.data});
      // this.timeFormatSeconds(result.data.data);
    }
    a();
  },

  verifyProjectApplication: function(event) {

    console.log(event.target.dataset);
    let applicationUid = event.target.dataset.applicationuid;
    let applicationPid = event.target.dataset.applicationpid;
    let action = event.target.dataset.action; 
    console.log(applicationUid, applicationPid);
    console.log(action);

    const content = action == 'agree' ? '通过' : '拒绝';

    wx.showModal({
      title: '提示',
      // content: '确认通过？',
      content: `确认${content}？`,
      success (res) {
        if (res.confirm) {
          api.verifyProjectApplication(applicationUid, applicationPid, action).then(res => {
            console.log(res.data);
          });
          wx.redirectTo({
            url: 'projectReview',
          })
        } else {
          console.log('用户取消');
        }
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