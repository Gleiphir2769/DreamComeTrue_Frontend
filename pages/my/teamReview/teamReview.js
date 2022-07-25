// pages/my/teamReview/teamReview.js
import {api} from '../../../api/teamreview-api'

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
      let result = await api.getListTeamApplicationsForTid(status);
      console.log(result);
      this.setData({result:result.data.data});
      // this.timeFormatSeconds(result.data.data);
    }
    a();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    let status = 'unverified';

    let a = async () => {
      let result = await api.getListTeamApplicationsForTid(status);
      console.log(result);
      this.setData({result:result.data.data});
      // this.timeFormatSeconds(result.data.data);
    }
    a();
    // this.setData = ['审核记录1', '审核记录2', '审核记录3', '审核记录4']
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

  verifyTeamApplication: function(event) {

    console.log(event.target.dataset);
    let applicationid = event.target.dataset.applicationid;
    let action = event.target.dataset.action; 
    console.log(applicationid);
    console.log(action);

    const content = action == 'agree' ? '通过' : '拒绝';

    wx.showModal({
      title: '提示',
      // content: '确认通过？',
      content: `确认${content}？`,
      success (res) {
        if (res.confirm) {
          api.verifyTeamApplication(applicationid, action).then(res => {
            console.log(res.data);
          });
          wx.redirectTo({
            url: 'teamReview',
          })
        } else {
          console.log('用户取消');
        }
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})