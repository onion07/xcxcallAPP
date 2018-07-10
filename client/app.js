//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function (o) {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    onShow: function (ops) {
      console.log('app-path:', ops);
      this.dealButton(ops);
    },
    //显示打开APP 按钮
    dealButton: function (res) {
      console.log('[dealButton]场景值：' + res.scene);
      console.info('canOpenApp==', this.globalData.canOpenApp)

      if (res.scene === 1036 || res.scene === 1089 || res.scene === 1090) {
        this.globalData.canOpenApp = true;
        console.info('canOpenApp==', this.globalData.canOpenApp)
      } else {
        this.globalData.canOpenApp = false;
      }
    },
    globalData: {
      userInfo: null,
      canOpenApp: false
    }
})