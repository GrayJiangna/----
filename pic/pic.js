// pages/pic/pic.js
//全局变量
//全局变量
var urlArr=[];
var filePath=[];
var prev=[];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '添加图片：',
  },

//上传图片 获取临时路径
clickBtn(){
  wx.chooseMedia({
    count:6,
    success:res=>{

      console.log(res)
      filePath=res.tempFiles
      for (let index = 0; index < filePath.length; index++) {
        prev.push(res.tempFiles[index].tempFilePath)
      }

      this.setData({
        prev
      })
    }
  })
},

//提交图片入库
subBtn(){
  for (let index = 0; index < filePath.length; index++) {
    var item  = filePath[index].tempFilePath;
    var filename=Date.now()+"_"+index;
    this.cloudFile(filename,item)
  }
},

//上传图片到数据库，产生真实路径
cloudFile(filename,path){
  wx.showLoading({
    title: '上传中',
  })
  wx.cloud.uploadFile({
    //上传要有两个参数，路径文件名
    cloudPath:filename+".jpg",
    //临时路径filepath
    filePath:path
  }).then(res=>{
    wx.hideLoading()
    urlArr.push(res.fileID)
    if(filePath.length==urlArr.length){
      this.setData({
        urlArr
      })
    }
    
    if(res.statusCode==204){
      wx.showToast({
        title: 'Successful',
        icon:"none",
        duration:1500
      })
    }
    console.log(res)
  })
},

//删除图片
delBtn:function(e){
var that=this
  wx.showModal({
    title:"提示",
    content:"是否删除该图片？",
  success:function(res){
  if(res.confirm){
  prev.splice(e.currentTarget.dataset.index,1)
  that.setData({
    prev
  })
}else if(res.cancel){
  console.log("The user choose to cancel delete the picture")
}
  }
})
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