// btnJoinConference.onclick = onJoinConferenceClicked;
$("btnJoinConference").on("click",onJoinConferenceClicked)
btnMakeCall.onclick = onMakeCallClicked;
btnInputText.onclick = onInputTextClicked;
btnSendText.onclick = onSendTextClicked;
btnDisableCamera.onclick = onDisableCameraClicked;
btnDisableMicphone.onclick = onDisableMicphoneClicked;
btnHoldCall.onclick = onHoldCallClicked;
btnAutoTest.onclick = onAutoTestClicked;
btnStartShare.onclick = onStartShareClicked;
btnStopShare.onclick = onStopShareClicked;

var fromuser = getParam ( "fromuser" );
var fromname = getParam ( "fromname" );
fromuser = fromuser === null ? getGUID() : fromuser;
fromname = fromname === null ? fromuser : fromname;

var myjson = JSON.parse ( "{}" );
myjson.mgw = "wss://webrtc.myegoo.com.cn/ws";
myjson.turn = "turn:webrtc.myegoo.com.cn";
myjson.fromuser = fromuser;
myjson.fromname = fromname;
myjson.chatroom = textTarget.value;
myjson.callback = onCallback;
myjson.camera = 0;
myjson.bps = null;//限速

var xchatkit = new XChatKit(myjson);//开始创建会议并推流

//获取url参数
function getParam(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);

    if ( r !== null )
      return decodeURI ( r[2] );

    return null;
}

function getGUID()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
    {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

//加入会议与离开会议
function onJoinConferenceClicked()
{
    console.log ( "onJoinConferenceClicked" );
    console.log ( localVideo.videoWidth + "*" + localVideo.videoHeight );

    //更改加入/离开会议按钮text
    if ( btnJoinConference.innerHTML == "JoinConference" )
    {
        btnJoinConference.innerHTML = "LeaveConference";
        var json = myjson;

        //从数据框中获取房间号
        json.chatroom = textTarget.value;
        xchatkit.JoinConference ( myjson );
        return;
    }
    //按钮文本赋值
    btnJoinConference.innerHTML = "JoinConference";
    btnHoldCall.innerHTML = "HoldCall";

    //切断流获取
    xchatkit.LeaveConference ( myjson );

    //把当前用户从其他用户的页面移除
    for ( var j = videoWindows.children.length - 1; j > 0; --j )
    {
        videoWindows.removeChild ( videoWindows.children[j] );
    }

    for ( var i = audioWindows.children.length - 1; i > -1; --i )
    {
        audioWindows.removeChild ( audioWindows.children[i] );
    }
}

//一对一打电话
function onMakeCallClicked()
{
    //获取一对一对方Id
    var peer = textTarget2.value;

    //更改拨打/挂断电话按钮text
    if ( btnMakeCall.innerHTML == "MakeCall" )
    {
        //拨打电话处理
        btnMakeCall.innerHTML = "ReleaseCall";
        btnJoinConference.innerHTML = "LeaveConference";

        var json = myjson;
        json.touser = textTarget2.value;//对方Id
        json.chatroom = textTarget.value;//会议Id
        xchatkit.MakeCall ( json );
    }
    else
    {
        //挂断电话处理
        btnMakeCall.innerHTML = "MakeCall";
        var json = myjson;
        json.touser = textTarget2.value;
        json.chatroom = textTarget.value;
        xchatkit.ReleaseCall ( json );

        if ( audioWindows.children.length < 2 )
        {
            btnJoinConference.innerHTML = "LeaveConference";
            onJoinConferenceClicked ();
        }
    }
}
//给对方input框输入信息
function onInputTextClicked()
{
    console.log ( "onInputTextClicked" );

    var json = JSON.parse ( "{}" );
    json.chatroom = textTarget.value;
    json.content = textInput.value;
    xchatkit.SendInput ( json );
}

//给群组中发送消息
function onSendTextClicked()
{
    console.log ( "onSendTextClicked" );

    var json = JSON.parse ( "{}" );
    json.content = textSend.value;
    json.chatroom = textTarget.value;
    xchatkit.SendText ( json );
}

//禁用摄像头
function onDisableCameraClicked()
{
    var bEnabled;
    var json;

    if ( btnDisableCamera.innerHTML == "DisableCamera" )
    {
        bEnabled = false;
        btnDisableCamera.innerHTML = "EnableCamera";
        localVideo.srcObject = null;
        localVideo.poster = "avatar.png";

        json = myjson;
        json.chatroom = textTarget.value;
        xchatkit.DisableCamera ( json );
    }
    else
    {
        bEnabled = true;
        btnDisableCamera.innerHTML = "DisableCamera";
        localVideo.srcObject = xchatkit.GetLocalStream();

        json = myjson;
        json.chatroom = textTarget.value;
        xchatkit.EnableCamera ( json );
    }
}
//禁用麦克风
function onDisableMicphoneClicked()
{
    console.log ( "onDisableMicphoneClicked" );

    if ( btnDisableMicphone.innerHTML == "DisableMicphone" )
    {
        btnDisableMicphone.innerHTML = "EnableMicphone";
        xchatkit.DisableMicphone();
    }
    else
    {
        btnDisableMicphone.innerHTML = "DisableMicphone";
        xchatkit.EnableMicphone();
    }
}

function onHoldCallClicked()
{
    if ( btnHoldCall.innerHTML == "HoldCall" )
    {
        btnHoldCall.innerHTML = "RetrieveCall";
        myjson.chatroom = textTarget.value;
        xchatkit.HoldCall ( myjson );
    }
    else
    {
        btnHoldCall.innerHTML = "HoldCall";
        myjson.chatroom = textTarget.value;
        xchatkit.RetrieveCall ( myjson );
    }
}
//Desperated
function onAutoTestClicked()
{
    if ( btnAutoTest.innerHTML == "StartAutoTest" )
    {
        btnAutoTest.innerHTML = "StopAutoTest";
        btnAutoTest.autotestid = setInterval(onJoinConferenceClicked, 5000);
    }
    else
    {
        btnAutoTest.innerHTML = "StartAutoTest";
        clearInterval ( btnAutoTest.autotestid );
        btnAutoTest.autotestid = null;
    }
}

//开始屏幕共享
function onStartShareClicked()
{
    xchatkit.StartShare();
}

//停止屏幕共享
function onStopShareClicked()
{
    localVideo.srcObject = xchatkit.GetLocalStream();
    xchatkit.StopShare();
}

// 设置会议流
function onEventLocalStream(json)
{
	console.log("json.stream\n\n\n\n");
	console.log(json.stream);
    localVideo.srcObject = json.stream;
}

//加入会议
function onEventPartyAdded(json)
{
    //查找页面中是否已存在该用户的画面
    var obj = document.getElementById ( json.fromuser + json.streamtype );

    //如果页面中，用户画面已存在，则直接赋新流
    if ( obj !== null )
    {
      obj.srcObject = json.stream;
      return;
    }

    //如果是音频流，则直接创建音频对象
    if ( "audio" === json.streamtype )
    {
        var audio = document.createElement ( "audio" );
        audio.id = json.fromuser + json.streamtype;
        audio.srcObject = json.stream;
        audio.autoplay = "autoplay";
        audioWindows.appendChild ( audio );
    }
    else if ( "video" === json.streamtype )
    {
        var video = localVideo.cloneNode();
        video.id = json.fromuser + json.streamtype;
        video.srcObject = json.stream;
        videoWindows.appendChild ( video );
    }
    else if ( "screen" === json.streamtype )
    {
        var video = localVideo.cloneNode();
        video.id = json.fromuser + json.streamtype;
        video.style = "width:0px;height:400px;";
        video.srcObject = json.stream;
        videoWindows.appendChild ( video );
    }
}

function onEventPartyRemoved(json)
{
    var audio = document.getElementById ( json.fromuser + "audio" );
    if ( audio !== null )
        audioWindows.removeChild ( audio );

    var video = document.getElementById ( json.fromuser + "video" );
    if ( video !== null )
        videoWindows.removeChild ( video );

    var screen = document.getElementById ( json.fromuser + "screen" );
    if ( screen !== null )
        videoWindows.removeChild ( screen );
}

function onEventRDPEnabled(json)
{
    var video = document.getElementById ( json.fromuser + "screen" );

    if ( video !== null )
    {
        video.style = "width:auto;height:400px;";
    }
}

function onEventRDPDisabled(json)
{
    var video = document.getElementById ( json.fromuser + "screen" );
    
    if ( video !== null )
    {
        video.style = "width:0px;height:400px;";
    }
}

//开始录像
function onEventPartyConnected(json)
{
    xchatkit.StartRecording ( json.fromuser );
}

//结束录像
function onEventPartyDisconnected(json)
{
    xchatkit.StopRecording ( json.fromuser );
}

function onCallback(json)
{
    console.log ( json );
    console.log ( JSON.stringify ( json ) );

    if ( "EventLocalStream" == json.msgtype )
        onEventLocalStream ( json );
    else if ( "EventPartyAdded" === json.msgtype )
        onEventPartyAdded ( json );
    else if ( "EventPartyRemoved" === json.msgtype )
        onEventPartyRemoved ( json );
    else if ( "EventRDPEnabled" === json.msgtype )
        onEventRDPEnabled ( json );
    else if ( "EventRDPDisabled" === json.msgtype )
        onEventRDPDisabled ( json );
    else if ( "EventPartyConnected" === json.msgtype )
        onEventPartyConnected ( json );
    else if ( "EventPartyDisconnected" === json.msgtype )
        onEventPartyDisconnected ( json );
}
