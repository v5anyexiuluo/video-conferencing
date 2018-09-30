import XChatKit from '@/assets/js/xchat.min.js'
export default (function(){
  return {
    xchatkit: null,
    meetingjson: {
      mgw : "wss://webrtc.myegoo.com.cn/ws",
      turn : "turn:webrtc.myegoo.com.cn",
      fromuser : '',
      fromname : '',
      chatroom : '',
      callback : '',
      camera : 0,
      bps : null
    },

    //回调函数
    // onCallback(json) {
    //   if ( "EventLocalStream" == json.msgtype )
    //       this.onEventLocalStream ( json );
    //   else if ( "EventPartyAdded" === json.msgtype )
    //       this.onEventPartyAdded ( json );
    //   else if ( "EventPartyRemoved" === json.msgtype )
    //       this.onEventPartyRemoved ( json );
    //   else if ( "EventRDPEnabled" === json.msgtype )
    //       this.onEventRDPEnabled ( json );
    //   else if ( "EventRDPDisabled" === json.msgtype )
    //       this.onEventRDPDisabled ( json );
    //   else if ( "EventPartyConnected" === json.msgtype )
    //       this.onEventPartyConnected ( json );
    //   else if ( "EventPartyDisconnected" === json.msgtype )
    //       this.onEventPartyDisconnected ( json );
    //   else if ( "text" === json.msgtype )
    //     this.onEventRevieveGroupChat(json);
    //   else if ( "onText" === json.msgtype )
    //     this.onEventRevieveChat(json);
    // },

    getXchatkit(fromuser, fromname, chatroom, callback){
      this.meetingjson.fromuser = fromuser;
      this.meetingjson.fromname = fromname;
      this.meetingjson.chatroom = chatroom;
      this.meetingjson.callback = callback;
      if(this.xchatkit==null){
        this.xchatkit = new XChatKit(this.meetingjson);
      }
      return this;
    },

    ClearXChatKit(){
      this.xchatkit.ClearXChatKit(this.meetingjson);
    },

    //开始会议
    onJoinConferenceClicked()
    {
      this.xchatkit.JoinConference(this.meetingjson);
    },
    //结束
    onLeaveConferenceClicked()
    {
      this.xchatkit.LeaveConference(this.meetingjson);
    },

    // //回调函数
    // //本地流事件
    // onEventLocalStream(json)
    // {
    //   // return window.URL.createObjectURL(this.xchatkit.GetLocalStream());
    //   return window.URL.createObjectURL(json.stream);
    // },
    onEventLocalStream(json)
    {
      // return window.URL.createObjectURL(this.xchatkit.GetLocalStream());
      return window.URL.createObjectURL(json.stream);
    },
    // //加入会议事件
    // onEventPartyAdded(json)
    // {

    // },
    // //离开会议
    // onEventPartyRemoved(json)
    // {

    // },

    onHoldCallClicked()
    {
      this.meetingjson.chatroom = '';
      this.xchatkit.HoldCall(this.meetingjson);
    },

    onRetrieveCallClicked()
    {
      this.meetingjson.chatroom = '';
      this.xchatkit.RetrieveCall(this.meetingjson);
    },

    onMakeCallClick(){
      var json = myjson;
      json.touser = '';//对方Id
      json.chatroom = '';//会议Id
      this.xchatkit.MakeCall ( json );
    },
    onReleaseCallClick(){
      var json = myjson;
      json.touser = '';
      json.chatroom = '';
      this.xchatkit.ReleaseCall ( json );
    },

    //开始屏幕共享
    onStartShareClicked()
    {
      this.xchatkit.StartShare();
    },

    //停止屏幕共享
    onStopShareClicked()
    {
      this.xchatkit.StopShare();
    },

    onEventSendInputChat(){
      var json = JSON.parse ( "{}" );
      json.chatroom = this.meetingjson.chatroom;
      json.content = '';
      this.xchatkit.SendInput ( json );
    },
    // onEventRevieveChat(json){

    // },
    //发送消息
    onEventSendChat(msg){
      var json = JSON.parse ( "{}" );
      json.chatroom = this.meetingjson.chatroom;
      json.content = msg;
      this.xchatkit.SendText ( json );
    },
    // //将消息添加到消息列表
    // onEventRevieveGroupChat(json){

    // },


    //启用摄像头
    onEnableCameraClicked()
    {
      var json = this.meetingjson;
      json.chatroom = '';
      this.xchatkit.EnableCamera(json);
    },
    //禁用摄像头
    onDisableCameraClicked()
    {
      var json = this.meetingjson;
      json.chatroom = '';
      this.xchatkit.DisableCamera(json);
    },

    //启用麦克风
    onDisableMicphoneClicked()
    {
      this.xchatkit.EnableMicphone();
    },
    //禁用麦克风
    onDisableMicphoneClicked()
    {
      this.xchatkit.DisableMicphone();
    },


    // onEventRDPEnabled(json)
    // {
          
    // },
    // onEventRDPDisabled(json)
    // {
        
    // },

    // //启动录像
    // onEventPartyConnected(json){
    //   this.xchatkit.StartRecording(json.fromuser);
    // },
    // //停止录像
    // onEventPartyDisconnected(json){
    //   this.StopRecording(json.fromuser);
    // }
  }
})()