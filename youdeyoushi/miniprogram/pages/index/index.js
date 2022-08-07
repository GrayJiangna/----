
const db=wx.cloud.database()

Page({

 
  /**
   * 页面的初始数据
   */
  data:{
    ne:[],  //这是一个空的数组，等下获取到云数据库的数据将存放在其
},
/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
var _this = this;
const db = wx.cloud.database({
  //这个是环境ID不是环境名称     
  env: 'youdeyoushi-4gjcw9pf97fb47aa'
})
//1、引用数据库   
//2、开始查询数据了  news对应的是集合的名称   
db.collection('gatherlist').get({
  //如果查询成功的话    
  success: res => {
    console.log(res.data)
    //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
    this.setData({
      ne: res.data
    })
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
