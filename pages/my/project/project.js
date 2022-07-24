// pages/my/team/team.js
import {api} from '../../../api/my_project-api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        Tabs: ['申请中', '被拒绝', '正在进行中', '已结束'],
        // 正在进行中的返回列表
        IngProjectLists: [],
        // 根据项目id 返回的具体project
        ProjectDetails: '',
        // 状态常量
        Status: {
          "PENDING": 'pending',
          "ONGOING": 'ongoing',
          "FINISHED": 'finished',
        }
    },

    tabSelect(e) {
        let TabCur = e.currentTarget.dataset.id;
        this.setData({TabCur: TabCur});
        let status = "agreed"
        let uid = wx.getStorageSync('uid')
        if (TabCur === 0) {
          // api.getProjectDetailByUidAndStatus(2, "").then(res=>{
          //   console.log(res.data),
          //   this.setData({
          //     IngProjectLists: res.data.data,
          //   })
          // }
          // )
        } else if (TabCur === 1) {

        } else if (TabCur === 2) {
          // 获取用户 uid 正在进行中的项目
          api.getIngProjectListByUidAndStatus(uid, this.data.Status["ONGOING"]).then(res=>{
            console.log(res.data),
            this.setData({
              IngProjectLists: res.data.data,
            })
            console.log("IngProjectLists: " + this.data.IngProjectLists)
          }
          )
        }else if (TabCur === 3) {
          api.getIngProjectListByUidAndStatus(uid, this.data.Status["FINISHED"]).then(res=>{
            console.log(res.data),
            this.setData({
              IngProjectLists: res.data.data,
            })
            console.log("IngProjectLists: " + this.data.IngProjectLists)
          }
          )
        }
    },
    fillProjectList(e) {
      console.log("fillProjectList: e" + e)
      let item = e.currentTarget.dataset.item
      console.log("fillProjectList item: " + item)
      item = JSON.stringify(item)
      let status = ""
      if (this.data.TabCur == 2) {
        status = this.data.Status["ONGOING"]
      }
      wx.navigateTo({
        url: './project_detail/project_detail?item=' + item + '&status=' + status,
      })
    },
    onLoad(options) {
        let {p, title} = options;
        let Tabs = [];
        //志愿者页面
        if (p === "1") {
            Tabs = ['已报名', '申请中', '被拒绝']
        } else if (p === "2") {
            Tabs = ['申请中', '被拒绝', '正在进行中', '已结束']
        }
        //志愿队伍页面
        else if (p === "3") {
            Tabs = ['待启动', '进行中', '已结束']
        } else if (p === "4") {
            Tabs = ['待审核', '已通过', '未通过']
        }
        else if (p === "5") {
            Tabs = ['待审核','通过', '未通过','待启动','进行中','已结束']
        } 
        //志愿中心页面
        else if (p === "6") {
            Tabs = ['待审核','通过', '未通过']
        }else if(p==="7"){
          Tabs = ['待审核','通过', '未通过']
        }
        this.setData({
            Tabs: Tabs,
        })
        wx.setNavigationBarTitle({
            title: "我的项目"
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
      
      // // 根据 UID PID 获取项目详情
      // api.getProjectDetailByUidAndStatus(2, "agreed").then(res=>{
      //   console.log(res.data),
      //   this.setData({
      //     IngProjectLists: res.data.data,
      //   })
      // }
      // )

      // let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjE2NTg2MDEzNzMxMzMsInVpZCI6Miwicm9sZSI6InVzZXIiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV91c2VyIn1dLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6IjE4MTM4MzIyMzg1In0.2dypH8tjkrexozEqILbZ6L5Jvt5bLFz9cofjEEd7RQw";
      // let id = 1;
      // wx.request({
      //   url: `https://dream.cihss.net/api/user/${id}/va`,
      //   method: 'GET',
      //   header: {
      //     "Authorization": token,
      //   },
      //   success(res) {
      //     console.log(res.data)
      //   },
      //   fail(res) {
      //     console.log(res.data)
      //   }
      // })
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