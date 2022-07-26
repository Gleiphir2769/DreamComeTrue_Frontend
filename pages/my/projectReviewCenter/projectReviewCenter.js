// pages/my/projectReviewCenter/projectReviewCenter.js
import {api_center} from '../../../api/projectreview-api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    Tabs: ['申请中', '未通过', '已通过'],
    //测试mock数据
    mockData:[],
  },

  tabSelect(e) {
    console.log("test: ", e)
    // let applicationUid = e.target.dataset.id;
    let applicationUid = 8;
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
      let result;
      if (status == 'unverified') {
        result = await api_center.getListProjectApplicationsForUid_1(applicationUid, status);
      } else {
        result = await api_center.getListProjectApplicationsForUid_2(applicationUid, status);
      }
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
  onShow: function () {
    let status = 'unverified';
    let applicationUid = 8;
    let a = async () => {
      let result = await api_center.getListProjectApplicationsForUid_1(applicationUid, status);
      console.log("------: ", result);
      this.setData({result:result.data.data});
      // this.timeFormatSeconds(result.data.data);
    }
    a();
  },

  verifyProjectApplication: function(event) {
    console.log(event);
    // 项目的id
    let applicationid = event.target.dataset.applicationid;
    let applicationUid = 1;
    let action = event.target.dataset.action; 
    console.log("项目ID: ", applicationid);
    console.log(action);

    const content = action == 'agree' ? '通过' : '拒绝';

    wx.showModal({
      title: '提示',
      // content: '确认通过？',
      content: `确认${content}？`,
      success (res) {
        if (res.confirm) {
          // Uid没用
          api_center.verifyProjectApplication(applicationUid, applicationid, action).then(res => {
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