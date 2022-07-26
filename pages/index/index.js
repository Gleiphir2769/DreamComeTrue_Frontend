Page({
    data: {
        cardCur: 0,
        role:'user',
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://s.zhiyuanyun.com/www.bv2008.cn/cms/202201/29/61f52d5776754.jpg'
        }, {
            id: 1,
            type: 'image',
            url: 'https://s.zhiyuanyun.com/www.bv2008.cn/cms/202205/11/627b68b912822.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://s.zhiyuanyun.com/www.bv2008.cn/cms/202205/12/627c722c58bee.jpg'
        }, {
            id: 3,
            type: 'image',
            url: 'https://s.zhiyuanyun.com/www.bv2008.cn/cms/202202/13/62090a745bc5a.jpg'
        }],
        src: '../../images/main.png'
    },
    onLoad() {
        this.towerSwiper('swiperList');
      
    },
    onShow(){
      this.setData({
        role:wx.getStorageSync('role')
      })
    },
    navigate: function (e) {
        let url = e.currentTarget.dataset.url;
        url = `../${url}/${url}`
        wx.navigateTo({
            url
        })
    },
    switchTab: function (e) {
        let url = e.currentTarget.dataset.url;
        url = `../${url}/${url}`
        wx.switchTab({url})
    },
    DotStyle(e) {
        this.setData({
            DotStyle: e.detail.value
        })
    },
    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
        let list = this.data[name];
        for (let i = 0; i < list.length; i++) {
            list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
            list[i].mLeft = i - parseInt(list.length / 2)
        }
        this.setData({
            swiperList: list
        })
    },


})