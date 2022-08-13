// pages/details/details.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    list:[]
  },
  previewImage: function (e) {
    console.log(e);
    var current = e.currentTarget.dataset.id;
    console.log(current);
    wx.previewImage({
       current: this.data.list[0].pics[current], // 当前显示图片的http链接
      urls: this.data.list[0].pics, // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.pics[0])
    // var dbcon1=JSON.parse(options.dbcon);
    this.setData({
      id:options.dbid
    })

    db.collection('findxxn').where({
      _id: options.dbid,
    })
    .get({
      success :(res)=>{
        this.setData({
          list:res.data
        })
        // console.log(res.data);//满足条件的数据
     }
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