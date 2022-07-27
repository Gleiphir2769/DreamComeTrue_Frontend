// pages/my/teamReviewCenter/teamReviewCenter.js
import {api_center} from '../../../api/teamreview-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    Tabs: ['待审核', '未通过', '通过'],
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
    console.log("******", status);
    let a = async () => {
      let applicationid = 1;
      let result = await api_center.getListTeamApplicationsForUid(applicationid, status);
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
      let result = await api_center.getListTeamApplicationsForUid(1, status);
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
    console.log("test: ", applicationid);
    console.log("test:  ", action);

    const content = action == 'agree' ? '通过' : '拒绝';

    wx.showModal({
      title: '提示',
      // content: '确认通过？',
      content: `确认${content}？`,
      success (res) {
        if (res.confirm) {
          api_center.verifyTeamApplication(applicationid, action).then(res => {
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

  },


timeFormatSeconds(time) {
  var d = time ? new Date(time) : new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hours = d.getHours();
  var min = d.getMinutes();
  var seconds = d.getSeconds();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hours < 0) hours = '0' + hours;
  if (min < 10) min = '0' + min;
  if (seconds < 10) seconds = '0' + seconds;

  return (year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds);
}
})