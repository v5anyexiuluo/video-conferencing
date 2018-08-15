<template>
	<div class="full-height content">
	  <div class="content-main" style="position: relative;">
	  	<div ref="videoWindows" id="videoWindows" align="center" style="height:90%; background-color: #145">
			<video ref="localVideo" id="localVideo" style="width:100%; height:100%;object-fit: fill;" poster="avatar.png" playsinline autoplay controls muted>
				您的浏览器不支持 video 标签。
			</video>
			<!-- <video style="position: absolute;right: 20px;top: 20px;width: 200px;height: 120px;background: gray;">
				您的浏览器不支持 video 标签。
			</video>
			<video style="position: absolute;right: 20px;top: 200px;width: 200px;height: 120px;background: gray;">
				您的浏览器不支持 video 标签。
			</video> -->
		</div>
		<div ref="audioWindows" id="audioWindows" align="center">
  		</div>
		<el-row class="btn-group" type="flex" align="middle" justify="space-between" style="position: absolute;left: 0px;bottom: 0px;width:100%;height: 50px;line-height: 50px;background-color: white;">
			<el-col :span="3"><a @click="dialogInviteFriendVisible = true" href="#">邀请+</a></el-col>
			<el-col :span="3"><a href="#">主持人</a></el-col>
			<el-col :span="3"><a @click="onStartShareClicked" href="javascript:void(0)">共享桌面</a></el-col>
			<el-col :span="3"><a @click="onStopShareClicked" href="javascript:void(0)">停止</a></el-col>
			<el-col :span="3"><a href="#">聊天</a></el-col>
			<el-col :span="3"><a href="#">设置</a></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"><a @click="onJoinConferenceClicked" href="javascript:void(0)">开始</a></el-col>
			<el-col :span="3"><a @click="onLeaveConferenceClicked" href="javascript:void(0)">会议结束</a></el-col>
		</el-row>
	  </div>
	  <div class="content-right">
	  	
	  </div>
	  <el-dialog title="邀请好友" custom-class="start-meeting" width="400px" center :visible.sync="dialogInviteFriendVisible">
        <el-form :model="formInviteFriend" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="formInviteFriend.nickName" @focus="formInviteFriend.formError=''"></el-input>
          </el-form-item>
          <el-form-item v-if="formInviteFriend.formError" center>
            <span style="color:red;">{{formInviteFriend.formError}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogInviteFriendVisible = false">取 消</el-button>
          <el-button type="primary" @click="">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择会议" width="400px" center :visible.sync="dialogSelectMeetingVisible">
        <el-form :model="formMeeting" label-width="80px">
          <el-form-item label="用户名">
            <el-select v-model="formMeeting.meetingId" collapse-tags style="width: 100%;" placeholder="选择会议">
				<el-option v-for="item in meeting" :key="item.id" :label="item.meetingName" :value="item.id">
				</el-option>
			</el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSelectMeetingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSelectMeeting">确 定</el-button>
        </div>
      </el-dialog>
<!-- <script src="/static/js/webrtc/webrtc.min.js"></script>
<script src="/static/js/webrtc/recorder.min.js"></script>
<script src="/static/js/webrtc/xchat.min.js"></script> -->
	</div>
</template>
<script>
// import $ from 'jquery'
import {apiMeeting} from '@/api/api.js';
import {mapState,mapMutations,mapGetters} from 'vuex';
export default {
	data() {
		return {
			dialogInviteFriendVisible: false,
			dialogSelectMeetingVisible: false,
			nowMeetings: [],
			formMeeting: {
				meetingId: null
			},
			formInviteFriend: {
	          nickName: '',
	          formError: ''
	        },
			xchatkit: null,
			meetingjson: {
				mgw : "wss://webrtc.myegoo.com.cn/ws",
				turn : "turn:webrtc.myegoo.com.cn",
				fromuser : '',
				fromname : '',
				chatroom : '',
				callback : this.onCallback,
				camera : 0,
				bps : null
			}
		}
	},
	created() {
		var $this = this;
		// console.log(videoWindows)
		// console.log(localVideo)
		$this.meetingjson.fromuser = $this.user.nickname,
		$this.meetingjson.fromname = $this.user.nickname,
		$this.getNowMeetings(function(res){
			if(res.data.data.length<1){
				$this.$message({
		            message: '暂无正在进行的会议！',
		            type: 'success'
		        });
			}else if(res.data.data.length==1){
				$this.setMeeting(res.data.data);
				$this.formMeeting.meetingId = res.data.data[0].id;
				$this.meetingjson.chatroom = $this.formMeeting.meetingId;
				$this.xchatkit = new XChatKit($this.meetingjson);
			}else{
				$this.setMeeting(res.data.data);
				$this.dialogSelectMeetingVisible=true;
			}
		},function(res){
			$this.$message.error('获取正在进行的会议信息失败！');
		})
		// this.myjson.mgw = "wss://webrtc.myegoo.com.cn/ws";
		// this.myjson.turn = "turn:webrtc.myegoo.com.cn";
		// this.myjson.fromuser = this.user;
		// this.myjson.fromname = this.name;
		// this.myjson.chatroom = this.room;
		// this.meetingjson.callback = this.onCallback;
		// this.myjson.camera = 0;
		// this.myjson.bps = null;
	},
	mounted(){

	},
	methods:{
		handleSelectMeeting(){
			var $this = this;
			if($this.formMeeting.meetingId){
				$this.meetingjson.chatroom = $this.formMeeting.meetingId;
				$this.xchatkit = new XChatKit($this.meetingjson);
				$this.dialogSelectMeetingVisible = false;
			}
		},
		//加入会议
		onJoinConferenceClicked()
		{
			// alert("开始会议,会议号:" + this.meetingjson.chatroom);
	        this.xchatkit.JoinConference(this.meetingjson);
		},
		//离开会议
		onLeaveConferenceClicked()
		{
			// alert("离开会议,会议号:" + this.meetingjson.chatroom);
	        this.xchatkit.LeaveConference ( this.meetingjson );
		    //把当前用户从其他用户的页面移除
		    for ( var j = videoWindows.children.length - 1; j > 0; --j )
		    {
		        videoWindows.removeChild ( videoWindows.children[j] );
		    }

		    for ( var i = audioWindows.children.length - 1; i > -1; --i )
		    {
		        audioWindows.removeChild ( audioWindows.children[i] );
		    }
		},
		//邀请人
		onMakeCallClicked()
		{
			this.dialogInviteFriendVisible = false
		    var json = this.meetingjson;
		    json.touser = this.formInviteFriend.nickName;
		    json.chatroom = this.room;//会议Id
		    this.xchatkit.MakeCall(json);
		    this.addMember(this.room, userNickname);
		},
		//开始屏幕共享
		onStartShareClicked()
		{
			alert("正在共享屏幕");
		    this.xchatkit.StartShare();
		},

		//停止屏幕共享
		onStopShareClicked()
		{
		    localVideo.srcObject = this.xchatkit.GetLocalStream();
		    this.xchatkit.StopShare();
		},
		//本地流事件
		onEventLocalStream(json)
		{
			localVideo.srcObject = json.stream;
		},
		//加入会议事件
		onEventPartyAdded(json)
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
		        var loc = 0;
		        if(videoWindows.children.length == 1) {
		        	video.style = "position: absolute;right: 20px;top: 20px;width: 200px;height: 120px;background: gray;"
		        } else if(videoWindows.children.length == 2) {
		        	video.style = "position: absolute;right: 20px;top: 200px;width: 200px;height: 120px;background: gray;"
		        } else {
		        	return;
		        }
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
		},
		//离开会议
		onEventPartyRemoved(json)
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
		},
		onEventRDPEnabled(json)
		{
		    var video = document.getElementById ( json.fromuser + "screen" );

		    if ( video !== null )
		    {
		        video.style = "width:auto;height:400px;";
		    }
		},
		onEventRDPDisabled(json)
		{
		    var video = document.getElementById ( json.fromuser + "screen" );
		    
		    if ( video !== null )
		    {
		        video.style = "width:0px;height:400px;";
		    }
		},
		//回调函数
		onCallback(json) {
		    console.log ( json );
		    console.log ( JSON.stringify ( json ) );
		    if ( "EventLocalStream" == json.msgtype )
		        this.onEventLocalStream ( json );
		    else if ( "EventPartyAdded" === json.msgtype )
		        this.onEventPartyAdded ( json );
		    else if ( "EventPartyRemoved" === json.msgtype )
		        this.onEventPartyRemoved ( json );
		    else if ( "EventRDPEnabled" === json.msgtype )
		        this.onEventRDPEnabled ( json );
		    else if ( "EventRDPDisabled" === json.msgtype )
		        this.onEventRDPDisabled ( json );
		    else if ( "EventPartyConnected" === json.msgtype )
		        this.onEventPartyConnected ( json );
		    else if ( "EventPartyDisconnected" === json.msgtype )
		        this.onEventPartyDisconnected ( json );
		},


		//会议加人
		addMember(meetingId, userNickname) {
			// axios.put('/meeting/add_member', {
			// 	params:{
			// 		meeting_id: meetingId,
			// 		user_nickname: userNickname
			// 	}
			// })
			// .then(function(response) {
			// 	if(response.code == 0) {
			// 		console.log(response.msg);
			// 	} else {
			// 		console.log(response.msg);
			// 	}
			// })
			// .catch(function(error) {
			// 	console.log(error);
			// })
		},

		getNowMeetings(cbOk, cbErr){
			var $this = this;
			$this.$axios.get(apiMeeting.now.all, null, cbOk, cbErr)
		},

		...mapMutations([
			'setMeeting'
		]),
	},
	name: 'MeetingNow',
	watch:{
	},
	computed:{
		...mapState({
			nav:state=>state.nav
		}),
		...mapGetters([
			'user',
			'meeting'
		])
	},
	beforeDestroy: function () {
	    this.onLeaveConferenceClicked();
	},
}
</script>
<style scoped>
	.el-main{
		width: 100%;
		height: 100%;
	}
	.el-row{
		margin: 0px;
	}
	.content{
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
	}
	.btn-group a{
		color: gray;
		text-decoration: none;
	}
	.content-main{
		width: 80%;
		border-right: 2px solid gray;
	}
	.content-right{
		width: 20%;
	}
</style>