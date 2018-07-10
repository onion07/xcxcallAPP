
// import { orIsAnd } from '../../utils/util';
const app = getApp();
const systeminfo = wx.getSystemInfoSync();

Page({
    data: {
      ops_param: '', 
      gamename: '',
      nickname: '',
      imgsrc: '',
      roomid: '',
      nowOpenApp: false

    },
    onLaunch: function (ops) {

      // console.log('page-onLaunch: ', ops);
      // this.dealButton(ops);
    },
    onLoad: function (ops) {
      console.info('onload::', ops); // 可以获取query
      let thedevice = systeminfo.platform;
      let name = ops.nickname || '二狗子';
      let gamename = ops.gamename || '有信游戏';
      let roomid = ops.roomid || '0000000';
      let src = ops.head || 'http://res.uxin.com/default/default_head.png?t=0';
      let pm = null;
      let pmto = {};

      // ios 和 开发工具devtools
      pmto.jump = 'uxincustomwebjump://littlegame?type=2&roomid=' + ops.roomid;

      if (thedevice === 'android') { // android
        pmto.jump = 'uxinopen://tab?index=randomVideo?type=2&roomid=' + ops.roomid;
        // pm = 'uxinopen://tab?index=randomVideo?roomid=112'
      }
      pm = JSON.stringify(pmto); 
      console.warn(thedevice)


      // if (ops.roomid) {
        this.setData({
          ops_param: pm ,
          gamename: gamename,
          nickname: name,
          imgsrc: src,
          roomid: roomid
        });
      // }
      console.info(this.data.ops_param)
    },
    onShow: function (ops) {
      //拿到query
      console.info('onshow::query参数值:', ops, this.data.ops_param);
      this.setData({
        nowOpenApp: app.globalData.canOpenApp
      });

      console.log('canOpenApp=>nowOpenApp:', this.data.nowOpenApp);
      // console.info('[page]canOpenApp: ',app.globalData.canOpenApp)
    },
    //调APP 错误处理
    launchAppError: function (e) {
      console.log(e.detail.errMsg)
    },
    // 转发
    onShareAppMessage: function (res) {
      const _ts = this;
      console.info('-----', _ts.data.ops_param)
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '哈哈哈标题',
        // path: '/pages/apptest/apptest?abc=123',
        path: _ts.data.ops_param,        
        success: function (res) {
          // 转发成功
          console.info('success: ' +JSON.stringify(res))
        },
        fail: function (res) {
          console.info('fail: ' + JSON.stringify(res))
        }
      }
    },
    //获取转发信息
    getShareInfo: function (res) {
      console.info('getShareInfo:' + JSON.stringify(res))
    }
});