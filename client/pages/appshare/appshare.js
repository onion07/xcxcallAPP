
// import { orIsAnd } from '../../utils/util';
const app = getApp();
const systeminfo = wx.getSystemInfoSync();

Page({
  data: {
    sharepath: '',
    ops_param: '',
    gamename: '',
    nickname: '',
    imgsrc: '',
    imageScreen: '', //转发封面图
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
    let name = ops.nickname ? decodeURIComponent(ops.nickname) : 'UU';
    let gamename = ops.gamename ? decodeURIComponent(ops.gamename) : '有信游戏';
    let roomid = ops.roomid || '0000000';
    let src = ops.head || 'http://res.uxin.com/default/default_head.png?t=0';
    let gametype = 2;
    let imageScreen = ops.imageScreen;
    let pm = null;
    let pmto = {};
    // ios 和 开发工具devtools
    pmto.jump = 'uxincustomwebjump://littlegame?type=' + gametype +'&roomid=' + ops.roomid;

    if (thedevice === 'android') { // android
      pmto.jump = 'uxinopen://littlegame?type=' + gametype +'&roomid=' + ops.roomid;
    }
    pm = JSON.stringify(pmto);
    // console.warn(thedevice)


    // if (ops.roomid) {
    this.setData({
      ops_param: pm,
      gamename: gamename,
      gametype: gametype,
      nickname: name,
      imageScreen: imageScreen,
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
  },
  //调APP 错误处理
  launchAppError: function (e) {
    console.log(e.detail.errMsg);
    if ( systeminfo.platform === 'ios') {
      wx.showToast({
        title: '你手机还没安装有信，去应用商店下载吧',
        icon: 'none',
        duration: 3500
      });
    }
  },
  // 转发
  onShareAppMessage: function (res) {
    const _ts = this;

    let querypath2 = `/pages/appshare/appshare?gamename=${decodeURIComponent(this.data.gamename)}&nickname=${decodeURIComponent(this.data.nickname)}&gametype=${this.data.gametype}&roomid=${this.data.roomid}&imageScreen=${this.data.imageScreen}&head=${this.data.imgsrc}`;

    this.setData({
      sharepath: querypath2      
    });
    console.info('-----', _ts.data.sharepath)
    
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '听说你很会玩，我想挑战你',
      imageUrl: _ts.data.imageScreen,
      path: _ts.data.sharepath,
      success: function (res) {
        // 转发成功
        console.info('success: ' + JSON.stringify(res))
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