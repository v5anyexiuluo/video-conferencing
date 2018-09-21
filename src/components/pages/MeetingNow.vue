<template>
	<div class="full-height content">
	  <div class="content-main" style="position: relative;">
	  	<div v-if="isMaster" ref="videoWindows" id="videoWindows" align="center" style="height:90%; background-color: #145">
	  		{{shareVideo.src}}
	  		<video :src="isShare? shareVideo.src:localVideo.src" ref="mainVideo" id="mainVideo" style="width:100%; height:100%;object-fit: fill;" poster="avatar.png" playsinline autoplay controls muted>
				您的浏览器不支持 video 标签。
			</video>
			<video :src="remoteVideo.src" ref="remoteVideo" id="remoteVideo" style="position: absolute;right: 20px;top: 50px;width: 200px;height: 120px;background: gray;" poster="avatar.png" playsinline autoplay controls muted>
				您的浏览器不支持 video 标签。
			</video>
			<el-select v-model="formMonitoredUser.id" collapse-tags style="position: absolute;right: 20px;top: 10px;width: 200px;" placeholder="选择被监控与会者" @change="handleMonitoredChange" @visible-change="handleMonitoredSelectShow">
				<el-option v-for="item in meetingMembers" :key="item.id" :label="item.nickname" :value="item.id">
				</el-option>
			</el-select>
			<video v-if="isShare" :src="localVideo.src" ref="localVideo" id="localVideo" style="position: absolute;right: 20px;top: 220px;width: 200px;height: 120px;background: gray;" poster="avatar.png" playsinline autoplay controls muted>
				您的浏览器不支持 video 标签。
			</video>
		</div>
		<div v-else ref="videoWindows" id="videoWindows" align="center" style="height:90%; background-color: #145">
	  		<video :src="remoteVideo.src" ref="mainVideo" id="mainVideo" style="width:100%; height:100%;object-fit: fill;" poster="avatar.png" playsinline autoplay controls muted>
				您的浏览器不支持 video 标签。
			</video>
			<video :src="localVideo.src" ref="remoteVideo" id="remoteVideo" style="position: absolute;right: 20px;top: 20px;width: 200px;height: 120px;background: gray;" poster="avatar.png" playsinline autoplay controls muted>
				您的浏览器不支持 video 标签。
			</video>
			<!-- {{isShare}} -->
			<video v-if="isShare" :src="shareVideo.src" ref="localVideo" id="localVideo" style="position: absolute;right: 20px;top: 200px;width: 200px;height: 120px;background: gray;" poster="avatar.png" playsinline autoplay controls muted>
				您的浏览器不支持 video 标签。
			</video>
		</div>
		<div ref="audioWindows" id="audioWindows" align="center">
  		</div>
		<el-row class="btn-group" type="flex" align="middle" justify="space-between" style="position: absolute;left: 0px;bottom: 0px;width:100%;height: 50px;line-height: 50px;background-color: white;">
			<el-col :span="3"><a @click="dialogSelectMeetingVisible = true" href="javascript:void(0)">切换会议</a></el-col>
			<el-col :span="3"><a @click="dialogInviteFriendVisible = true" href="javascript:void(0)">邀请+</a></el-col>
			<!-- <el-col :span="3"><a href="javascript:void(0)">主持人</a></el-col> -->
			<el-col :span="3"><a @click="onStartOrEndShare" href="javascript:void(0)">{{Share}}</a></el-col>
			<!-- <el-col :span="3"><a href="javascript:void(0)">聊天</a></el-col> -->
			<el-col :span="3"><a href="javascript:void(0)">设置</a></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"><a @click="onStartOrEndConference" href="javascript:void(0)">{{Conference}}</a></el-col>
		</el-row>
	  </div>
	  <div class="content-right">
	  	<div style="position: relative; height: 100%">
		  	<div ref="scro" style="height: 430px; overflow-y: auto;">
				<p style="word-break:break-all; text-align: left" v-for="item in MessageList">{{item}}</p>
		  	</div>
			<div style="position: absolute; bottom: 0">
		        <el-input
				  type="textarea"
				  :rows="3"
				  placeholder="请输入内容"
				  v-model="msg"
				  style="width: 100%"
				  @keyup.enter.native="onEventSendGroupChat">
				</el-input>
		        <el-button style="float:right" type="primary" size="mini" @click="onEventSendGroupChat">发送</el-button>
	        </div>
	    </div>
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
          <el-button type="primary" @click="onInviteFriendClicked">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择会议" width="400px" center :visible.sync="dialogSelectMeetingVisible">
        <el-form :model="formMeeting" label-width="80px">
          <el-form-item label="用户名">
            <el-select v-model="formMeeting.meetingId" collapse-tags style="width: 100%;" placeholder="选择会议">
				<el-option v-for="item in nowMeetings" :key="item.id" :label="item.meetingName" :value="item.id">
				</el-option>
			</el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSelectMeetingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSelectMeeting">确 定</el-button>
        </div>
      </el-dialog>
	</div>
</template>
<script>
import XChatKit from '@/assets/js/xchat.min.js'
import {apiMeeting} from '@/api/api.js';
import {mapState,mapMutations,mapGetters} from 'vuex';
export default {
	data() {
		return {
			dialogInviteFriendVisible: false,
			dialogSelectMeetingVisible: false,
			formMeeting: {
				meetingId: null
			},
			formMonitoredUser: {
				id: null
			},
			formInviteFriend: {
	          nickName: '',
	          formError: ''
	        },
	        nowMeetings:[],
	        isMaster: false,
	        isShare: false,
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
			},
			localVideo: {
				src: ''
			},
			remoteVideo: {
				src: '巴拉巴拉'
			},
			shareVideo: {
				src: ''
			},
			meetingMembers: [],
			remoteResources: [],
			msg: '',
			MessageList: [],
			Conference: '开始会议',
			Share: '共享桌面'
		}
	},
	created(){

	},
	mounted() {
		this.dialogSelectMeetingVisible=true;
	},
	updated() {
		this.$refs.scro.scrollTop = this.$refs.scro.scrollHeight;
	},
	methods:{
		handleSelectMeeting(){
			var $this = this;
			if($this.formMeeting.meetingId){
				$this.getMeetingInfo($this.formMeeting.meetingId, function(res){
					$this.setMeeting(res.data.data)
					if($this.user.id==$this.meeting.founderId){
						$this.isMaster = true;
					}else{
						$this.isMaster = false;
					}
				},function(res){
					$this.$message.error('获取会议信息失败！'+res.msg);
				});
				$this.meetingjson.fromuser = $this.user.id;
				$this.meetingjson.fromname = $this.user.nickname;
				$this.meetingjson.chatroom = $this.formMeeting.meetingId;
				$this.xchatkit = new XChatKit($this.meetingjson);
				$this.dialogSelectMeetingVisible = false;
			}
		},

		handleMonitoredChange(newVal){
			var $this = this
			var json = $this.remoteResources.find((value, index, arr) => {
            	return value.fromuser == newVal;
          	})
          	if(typeof(json)!="undefined"){
          		$this.remoteVideo.src=window.URL.createObjectURL(json.stream);
          		// remoteVideo.srcObject=json.stream;
          	}
		},

		handleMonitoredSelectShow(isShow){
			var $this = this;
			if(isShow){
				$this.refreshNowMembers();
			}
		},

		refreshNowMembers(){
			var $this = this;
			$this.getMeetingMembers($this.meeting.id, function(res){
				$this.meetingMembers = res.data.data;
			},function(res){
				console.log("获取会议成员失败！")
			})
		},

		//开始会议与结束会议
		onStartOrEndConference()
		{
			var $this = this;
			if($this.Conference == '开始会议') {
				$this.onJoinConferenceClicked();
				$this.Conference = '结束会议';
			} else {
				$this.onLeaveConferenceClicked();
				$this.Conference = '开始会议';
			}
		},

		//开始会议
		onJoinConferenceClicked()
		{
			var $this = this;
			if($this.isMaster){
				$this.startMeeting($this.meeting.id, function(res){
					$this.xchatkit.JoinConference($this.meetingjson);
				}, function(res){
					$this.$message.error('启动会议失败！'+res.msg);
				})
			}else{
				$this.entryMeeting($this.meeting.id, $this.user.nickname, function(res){
					$this.xchatkit.JoinConference($this.meetingjson);
				}, function(res){
					$this.$message.error('进入会议失败！'+res.msg);
				})
			}
		},
		//结束
		onLeaveConferenceClicked()
		{
			var $this = this;
			$this.xchatkit.LeaveConference($this.meetingjson);
	        //刷新与会人员列表
	        $this.refreshNowMembers();
			// var $this = this;
			// if($this.isMaster){
			// 	$this.endMeeting($this.meeting.id, function(res){
			// 		$this.xchatkit.LeaveConference($this.meetingjson);
			//         //刷新与会人员列表
			//         $this.refreshNowMembers();
			// 	}, function(res){
			// 		$this.$message.error('结束会议失败！'+res.msg);
			// 	})
			// }else{
			// 	$this.exitMeeting($this.meeting.id, $this.user.nickname, function(res){
			// 		// alert("离开会议,会议号:" + this.meetingjson.chatroom);
			//         $this.xchatkit.LeaveConference($this.meetingjson);
			//         //刷新与会人员列表
			//         $this.refreshNowMembers();
			// 	}, function(res){
			// 		$this.$message.error('退出会议失败！'+res.msg);
			// 	})
			// }
		},

		//邀请人
		onInviteFriendClicked()
		{
			this.dialogInviteFriendVisible = false;
		    this.addMember(this.room, this.formInviteFriend.nickName);
		},

		onHoldCallClicked()
		{
			var $this = this;
			$this.meetingjson.chatroom = '';
	        $this.xchatkit.HoldCall($this.meetingjson);
		},

		onRetrieveCallClicked()
		{
			var $this = this;
			$this.meetingjson.chatroom = '';
	        this.xchatkit.RetrieveCall($this.meetingjson);
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

		//共享桌面与停止共享
		onStartOrEndShare()
		{
			var $this = this;
			if($this.Share == '共享桌面') {
				$this.onStartShareClicked();
				$this.Share = '停止共享';
			} else {
				$this.onStopShareClicked();
				$this.Share = '共享桌面';
			}
		},

		//开始屏幕共享
		onStartShareClicked()
		{
			var $this = this;
			$this.isShare = true;
		    $this.xchatkit.StartShare();
		    // this.shareVideo.src=window.URL.createObjectURL(json.stream);
		},

		//停止屏幕共享
		onStopShareClicked()
		{
			var $this = this;
			$this.isShare = false;
		    $this.xchatkit.StopShare();
		    $this.localVideo.src = window.URL.createObjectURL($this.xchatkit.GetLocalStream());
		},
		//回调函数
		//本地流事件
		onEventLocalStream(json)
		{
			// this.$refs.localVideo.srcObject = json.stream;
			var $this = this;
			if($this.isShare){
				$this.localVideo.src=window.URL.createObjectURL($this.xchatkit.GetLocalStream());
				$this.shareVideo.src=window.URL.createObjectURL(json.stream);
			}else{
				$this.localVideo.src=window.URL.createObjectURL(json.stream);
			}
			// $this.localVideo.src=window.URL.createObjectURL(json.stream);
		},

		//加入会议事件
		onEventPartyAdded(json)
		{
			
			if(!this.isMaster && this.meeting.founderId==json.fromuser){
				this.remoteVideo.src=window.URL.createObjectURL(json.stream);
				return;
			}
			var result = this.remoteResources.findIndex((value, index, arr) => {
            	return value.id == json.id;
          	})
          	if(result==-1){
          		this.remoteResources.push(json);
          	}
		},
		//离开会议
		onEventPartyRemoved(json)
		{
		    var result = this.remoteResources.findIndex((value, index, arr) => {
            	return value.id == json.id;
          	})
          	if(result!=-1){
          		this.remoteResources.splice(result,1);
          	}
		},

		onEventSendChat(){
			var json = JSON.parse ( "{}" );
		    json.chatroom = '';
		    json.content = '';
		    this.xchatkit.SendInput ( json );
		},
		onEventRevieveChat(json){

		},
		//发送消息
		onEventSendGroupChat(){
			var $this = this;
			var json = JSON.parse ( "{}" );
		    json.chatroom = $this.meetingjson.chatroom;
		    json.content = $this.meetingjson.fromname+":"+$this.msg;
		    this.xchatkit.SendText ( json );
		    $this.msg = "";
		},
		//将消息添加到消息列表
		onEventRevieveGroupChat(json){
			var $this = this;
			$this.MessageList.push(json.content);
		},


		//启用摄像头
		onEnableCameraClicked()
		{
			var $this = this;
	        $this.localVideo.src = window.URL.createObjectURL($this.xchatkit.GetLocalStream());
	        var json = $this.meetingjson;
	        json.chatroom = '';
	        xchatkit.EnableCamera(json);
		},
		//禁用摄像头
		onDisableCameraClicked()
		{
	        $this.localVideo.src = '';
	        localVideo.poster = "avatar.png";
	        json = $this.meetingjson;
	        json.chatroom = '';
	        xchatkit.DisableCamera(json);
		},

		//启用麦克风
		onDisableMicphoneClicked()
		{
	        var $this = this;
	        $this.xchatkit.EnableMicphone();
		},
		//禁用麦克风
		onDisableMicphoneClicked()
		{
	        var $this = this;
	        $this.xchatkit.DisableMicphone();
		},


		onEventRDPEnabled(json)
		{
	        
		},
		onEventRDPDisabled(json)
		{
		    
		},

		//启动录像
		onEventPartyConnected(json){
			var $this = this;
			$this.xchatkit.StartRecording(json.fromuser);
		},
		//停止录像
		onEventPartyDisconnected(json){
			var $this = this;
			$this.StopRecording(json.fromuser);
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
		    else if ( "text" === json.msgtype )
		    	this.onEventRevieveGroupChat(json);
		    else if ( "onText" === json.msgtype )
		    	this.onEventRevieveChat(json);
		},


		//会议加人
		addMember(meetingId, userNickname, cbOk, cbErr) {
			
		},

		getNowMeetings(cbOk, cbErr){
			var $this = this;
			$this.$axios.get(apiMeeting.now.all, null, cbOk, cbErr)
		},

		getMeetingInfo(id, cbOk, cbErr){
			var $this = this;
			$this.$axios.get(apiMeeting.base.info+id, null, cbOk, cbErr)
		},

		getMeetingMembers(id, cbOk, cbErr){
			var $this = this;
			$this.$axios.post(apiMeeting.now.members, {
				mid: id.toString()
			}, cbOk, cbErr)
		},

		startMeeting(meetingId, cbOk, cbErr){
			var $this = this;
			$this.$axios.post(apiMeeting.now.start, {
				mid: meetingId.toString()
			}, cbOk, cbErr)
		},

		endMeeting(meetingId, cbOk, cbErr){
			var $this = this;
			$this.$axios.post(apiMeeting.now.end, {
				mid: meetingId.toString()
			}, cbOk, cbErr)
		},

		entryMeeting(meetingId, nickname, cbOk, cbErr){
			var $this = this;
			$this.$axios.post(apiMeeting.now.entry, {
				meeting_id: meetingId.toString(),
				user_nickname: nickname
			}, cbOk, cbErr)
		},

		exitMeeting(meetingId, nickname, cbOk, cbErr){
			var $this = this;
			$this.$axios.post(apiMeeting.now.exit, {
				meeting_id: meetingId.toString(),
				user_nickname: nickname
			}, cbOk, cbErr)
		},

		...mapMutations([
			'setMeeting'
		]),
	},
	name: 'MeetingNow',
	watch:{
		user: function(val, oldVal){
			if(val){
				var $this = this;
				$this.meetingjson.fromuser = $this.user.id;
				$this.meetingjson.fromname = $this.user.id;
				$this.getNowMeetings(function(res){
					if(res.data.data.length<1){
						$this.$message({
				            message: '暂无正在进行的会议！',
				            type: 'success'
				        });
					}else{
						$this.nowMeetings=res.data.data;
					}
					// else if(res.data.data.length==1){
					// 	$this.setMeeting(res.data.data);
					// 	$this.formMeeting.meetingId = res.data.data[0].id;
					// 	$this.meetingjson.chatroom = $this.formMeeting.meetingId;
					// 	$this.xchatkit = new XChatKit($this.meetingjson);
					// }
				},function(res){
					$this.$message.error('获取正在进行的会议信息失败！');
				});
			}
		},
		dialogSelectMeetingVisible: function(val, oldVal){
			var $this = this;
			if(val){
				$this.getNowMeetings(function(res){
					if(res.data.data.length>0){
						$this.nowMeetings=res.data.data;
					}
				},function(res){
					$this.$message.error('获取正在进行的会议信息失败！');
				});
			}
		}
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
