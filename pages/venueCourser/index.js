// pages/venueCourser/index.js
import {
    config
} from '../../config.js';
import {
    VenueModel
} from '../../models/venue.js';

let venueModel = new VenueModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl: config.base_img_url,
      venueKc:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id = options.id;
      console.log(id);
      this._getKc(id);
  },

    onGoDetail(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/kechen/kechenDetails/index?id='+id,
        })
    },
    onShareAppMessage(Object) {

    },

    //课程
    _getKc(id) {
        venueModel.getKc(id, 6).then(res => {
            console.log(res.data.items)
            this.setData({
                venueKc: res.data.items
            })

        })
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