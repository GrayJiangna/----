// app.js
App({
  onLaunch:function(){
    if(!wx.cloud){}
    else{
      wx.cloud.init({
        traceUser:true,
      })
    }
    this.globalData={}
    
  
  }
})
