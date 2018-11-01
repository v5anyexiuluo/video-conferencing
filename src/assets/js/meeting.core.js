import XChatKit from '@/assets/js/xchat.min.js'
export default (function(){
  return function(fromuser, fromname, chatroom, callback){

    this.callbackList = []
    this.callbackList.push(callback)
    var $this = this;
    // 回调函数
    this.onCallback = function(json) {
      $this.callbackList.forEach(function(e){
        e(json);
      })
    }

    this.meetingjson = {
      mgw : "wss://webrtc.myegoo.com.cn/ws",
      turn : "turn:webrtc.myegoo.com.cn",
      fromuser : fromuser,
      fromname : fromname,
      chatroom : chatroom,
      callback : this.onCallback,
      camera : 0,
      bps : null
    }
    this.xchatkit = null,

    this.addCallBack = function(callback){
      this.callbackList.push(callback);
    }

    this.getXchatkit = function(){
      // this.meetingjson.fromuser = fromuser;
      // this.meetingjson.fromname = fromname;
      // this.meetingjson.chatroom = chatroom;
      // this.meetingjson.callback = callback;
      // if(this.xchatkit==null){
      //   this.xchatkit = new XChatKit(this.meetingjson);
      // }
      // return this;
      this.xchatkit = new XChatKit(this.meetingjson);
      return this;
    }



    this.ClearXChatKit = function (){
      this.xchatkit.ClearXChatKit(this.meetingjson);
    }

    //开始会议
    this.JoinConference = function()
    {
      console.log(this)
      this.xchatkit.JoinConference(this.meetingjson);
    }
    //结束
    this.LeaveConference = function()
    {
      this.xchatkit.LeaveConference(this.meetingjson);
      // this.xchatkit.ClearXChatKit(this.meetingjson);
    }

    // //回调函数
    // //本地流事件
    // onEventLocalStream(json)
    // {
    //   // return window.URL.createObjectURL(this.xchatkit.GetLocalStream());
    //   return window.URL.createObjectURL(json.stream);
    // },
    this.GetLocalStream = function(){
      return this.xchatkit.GetLocalStream();
    }

    this.LocalStream = function(json)
    {
      // return window.URL.createObjectURL(this.xchatkit.GetLocalStream());
      return window.URL.createObjectURL(json.stream);
    }

    this.HoldCall = function()
    {
      this.meetingjson.chatroom = '';
      this.xchatkit.HoldCall(this.meetingjson);
    }

    this.RetrieveCall = function()
    {
      this.meetingjson.chatroom = '';
      this.xchatkit.RetrieveCall(this.meetingjson);
    }

    this.MakeCall = function(){
      var json = myjson;
      json.touser = '';//对方Id
      json.chatroom = '';//会议Id
      this.xchatkit.MakeCall ( json );
    }
    this.ReleaseCall = function(){
      var json = myjson;
      json.touser = '';
      json.chatroom = '';
      this.xchatkit.ReleaseCall ( json );
    }

    //开始屏幕共享
    this.StartShare = function()
    {
      this.xchatkit.StartShare();
    }

    //停止屏幕共享
    this.StopShare = function()
    {
      this.xchatkit.StopShare();
    }

    this.SendInput = function(){
      var json = JSON.parse ( "{}" );
      json.chatroom = this.meetingjson.chatroom;
      json.content = '';
      this.xchatkit.SendInput ( json );
    }

    //发送消息
    this.SendText = function(msg){
      var json = JSON.parse ( "{}" );
      json.chatroom = this.meetingjson.chatroom;
      json.content = msg;
      this.xchatkit.SendText ( json );
    }

    //启用摄像头
    this.EnableCamera = function()
    {
      var json = this.meetingjson;
      json.chatroom = '';
      this.xchatkit.EnableCamera(json);
    }
    //禁用摄像头
    this.DisableCamera = function()
    {
      var json = this.meetingjson;
      json.chatroom = '';
      this.xchatkit.DisableCamera(json);
    }

    //启用麦克风
    this.EnableMicphone = function()
    {
      this.xchatkit.EnableMicphone();
    }
    //禁用麦克风
    this.DisableMicphone = function()
    {
      this.xchatkit.DisableMicphone();
    }

    //启动录像
    this.StartRecording = function(json){
      this.xchatkit.StartRecording(json.fromuser);
    }
    //停止录像
    this.StopRecording = function(json){
      this.xchatkit.StopRecording(json.fromuser);
    }
  }
})()