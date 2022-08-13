// pages/show/show.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageFileList: [
    ],
  },


//封装上传图片函数,利用小程序云开函数
  uploadFilePromise(fileItem) {
    // TODO:优化-带上用户标示作为区分
    const imageName = fileItem?.url.slice(11, -4).slice(0,6)+Date.now();
    // console.log(`imageName`, imageName)
    return wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: `用户上传图片/${imageName}.png`,
      // 指定要上传的文件的小程序临时文件路径
      filePath: fileItem.url,
    });
  },

  // 文件读取完成后触发，event.detail.file: 当前读取的文件，再上传到图片服务器上
  afterRead(event) {
    wx.showLoading({
      title: '上传中...'
    })
    const { file } = event.detail //获取所需要上传的文件列表
    wx.cloud.init();
    
    const uploadTasks = file.map(fileItem => this.uploadFilePromise(fileItem));
    Promise.all(uploadTasks)
      .then(data => {
        wx.hideLoading()
        wx.showToast({ title: '上传成功', icon: 'none' });
        const newFileList = data.map(item => ({ url: item.fileID }));
        this.setData({ 
          imageFileList: this.data.imageFileList.concat(newFileList)
        });
        console.log(this.data.imageFileList)
      })
      .catch(() => {
          //存在有上传失败的文件
          wx.hideLoading()
          wx.showToast({
            title: '上传失败！',
            icon: 'none',
          })
      });
  },
  deleteImg(event){
    let index= event.detail.index
    console.log(index)//输出的就是图片所在fileList的下标，自己根据需要进行操作就行
    var templist=this.data.imageFileList.splice(index,1)
    // console.log(templist[0].url)
    wx.cloud.deleteFile({
      fileList: [templist[0].url]
    }).then(res => {
      // handle success
      // console.log(res.fileList)
      this.setData({ 
        imageFileList: this.data.imageFileList
      });
    })
   
  },
  turndb(){
      console.log(this.data.imageFileList)
      var datas = this.data.imageFileList
      datas.forEach(function(item, index){
      console.log(item.url)
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