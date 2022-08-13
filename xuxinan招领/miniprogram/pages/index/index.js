// index.js


const db=wx.cloud.database();
const _ = db.command;
Page({
  data: {
    value: '',
    option1: [
      { text: '全部', value: 0 },
      { text: '学生卡', value: 1 },
      { text: '其他', value: 2 },
    ],
    dbcontent:[],
    value1: 0,
  },
  // 发布
  release: function () {
    wx.navigateTo({
      url: "/pages/inputdata/inputdata",
    })
  },
  //搜索功能实现
  onChange(e) {
    console.log(e.detail)
    this.setData({
      value: e.detail,
    });
    db.collection('findxxn').where(_.or(
      [{
        kindname: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      {
        content: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      {
        theme: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      ])).get().then(res=>{
      // console.log("ok了")
            this.setData({
              dbcontent: res.data
                  })
          })
  },
  onSearch() {
    console.log(this.data.value)
    db.collection('findxxn').where(_.or(
      [{
        kindname: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      {
        content: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      {
        theme: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      ])
).get().then(res=>{
      // console.log("ok了")
            this.setData({
              dbcontent: res.data
                  })
          })
    // Toast('搜索' + this.data.value);

  },
  onClick() {
    db.collection('findxxn').where(_.or(
      [{
        kindname: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      {
        content: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      {
        theme: db.RegExp({
          regexp: this.data.value,
          options: 'i', //大小写不区分
        })
      },
      ])
).get().then(res=>{
      // console.log("ok了")
            this.setData({
              dbcontent: res.data
                  })
          })
  },
  //下拉选项
  changevalue(event){
    if(event.detail==0){
       this.getData();
    }else{
      this.getDatakind(event.detail);
    }
  },
  getData(){
      db.collection("findxxn").get().then(res=>{
            this.setData({
              dbcontent: res.data
                  })
          })
  },
  getDatakind(kindid){
      db.collection("findxxn").where(
      {
        kind:_.eq(kindid)
      }
    ).get().then(res=>{
            this.setData({
              dbcontent: res.data
                  })
          })
  },
  jumpdetail:function(e){
    // var name=e;
    // console.log(name)
    // console.log(e.currentTarget.dataset.id);
    var dbid=this.data.dbcontent[e.currentTarget.dataset.id]._id
    // console.log(dbid);
    wx.navigateTo({
      url: "../details/details?dbid=" + dbid,
    })
  },

  onLoad: function (options) {
        this.getData();
        db.collection("findxxn").watch({
          onChange:res=>{
              this.setData({
                dbcontent:res.docs
              })
          },
          onError:err=>{
            console.log(err)
          }
        })
      },

});
