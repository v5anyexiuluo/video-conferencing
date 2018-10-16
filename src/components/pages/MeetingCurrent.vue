<template>
  <div class="full-height content full-width h-full-container">
    <div class="content-main full-element v-full-container">
      <div v-if="isMaster" ref="videoWindows" id="videoWindows" align="center" class="full-element h-full-container" style="background-color: #145">
        <div class="full-element h-full-container" style="position: relative;">
          <video :src="isShare? shareVideo.src:localVideo.src" ref="mainVideo" id="mainVideo" class="full-element" style="object-fit: fill;position:absolute; left: 0px; bottom: 0px; right: 0px; width: 100%; height: 100%;" poster="avatar.png" playsinline autoplay controls muted>
          您的浏览器不支持 video 标签。
        </video>
        <video v-if="isShare" :src="localVideo.src" ref="localVideo" id="localVideo" style="position: absolute;left: 20px;top: 20px;width: 200px;height: 120px;background: gray;object-fit: fill;" poster="avatar.png" playsinline autoplay controls muted>
          您的浏览器不支持 video 标签。
        </video>
        </div>
        <div class="v-full-container" style="width:200px;background-color: #ecf5ff;">
        <scroll ref="videoScroll" class="full-element" style="overflow: hidden;padding: 0 10px;height: 0px;">
          <div>
            <video
              v-if="item.id!=user.id"
              v-for="(item, index) in meetingMembers"
              :key="index"
              :src="videoSrc(item.id)"
              style="width: 100%;height: 110px;background: red;object-fit: fill;"
              poster="avatar.png"
              playsinline autoplay controls muted
            >
              您的浏览器不支持 video 标签。
            </video>
          </div>
        </scroll>
        </div>
    </div>
    <div v-else ref="videoWindows" id="videoWindows" align="center" class="full-element h-full-container" style="background-color: #145;position: relative;">
        <video :src="remoteVideo.src" ref="mainVideo" id="mainVideo" class="full-element" style="object-fit: fill;position:absolute; left: 0px; bottom: 0px; right: 0px; width: 100%; height: 100%;" poster="avatar.png" playsinline autoplay controls muted>
        您的浏览器不支持 video 标签。
      </video>
      <video :src="localVideo.src" ref="remoteVideo" id="remoteVideo" style="position: absolute;right: 20px;top: 20px;width: 200px;height: 120px;background: gray;object-fit: fill;" poster="avatar.png" playsinline autoplay controls muted>
        您的浏览器不支持 video 标签。
      </video>
      <!-- {{isShare}} -->
      <video v-if="isShare" :src="shareVideo.src" ref="localVideo" id="localVideo" style="position: absolute;right: 20px;top: 200px;width: 200px;height: 120px;background: gray;" poster="avatar.png" playsinline autoplay controls muted>
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div ref="audioWindows" id="audioWindows" align="center">
      </div>
    <el-row class="btn-group" type="flex" align="middle" justify="space-between" style="width:100%;height: 50px;line-height: 50px;background-color: white;">
      <el-col :span="3"><a @click="dialogSelectMeetingVisible = true" href="javascript:void(0)">切换会议</a></el-col>
      <el-col :span="3"><a @click="dialogInviteFriendVisible = true" href="javascript:void(0)">邀请+</a></el-col>
      <!-- <el-col :span="3"><a href="javascript:void(0)">主持人</a></el-col> -->
      <el-col :span="3"><a @click="onStartOrEndShare" href="javascript:void(0)">{{Share}}</a></el-col>
      <!-- <el-col :span="3"><a href="javascript:void(0)">聊天</a></el-col> -->
      <el-col :span="3"><a href="javascript:void(0)">设置</a></el-col>
      <el-col :span="3"></el-col>
      <el-col :span="3"></el-col>
      <!-- <el-col :span="3" @click="uploadVideoVisible=true;">上传视频</el-col> -->
      <el-col :span="3"><a @click="onStartOrEndConference" href="javascript:void(0)">{{Conference}}</a></el-col>
    </el-row>
    </div>
    <div class="content-right">
      <chat style="position: relative; height: 100%;" :chatroom="chatroom"></chat>
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
      <!-- <el-dialog title="上传会议视频" custom-class="start-meeting" width="400px" center :visible.sync="uploadVideoVisible">
        <el-form :model="formUploadVideo" label-width="80px">
          <el-form-item label="用户名">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="uploadVideoVisible = false">取 消</el-button>
          <el-button type="primary" @click="onUploadVideoClicked">确 定</el-button>
        </div>
      </el-dialog> -->
  </div>
</template>
<script>
import {apiMeeting} from '@/properties/api.js';
import {mapState,mapMutations,mapGetters} from 'vuex';
import BScroll from 'better-scroll'
import Scroll from '@/components/common/Scroll.vue'
import Chat from "@/components/common/Chat.vue"
import Meet from '@/assets/js/meeting.core.js';
import utils from '@/assets/js/utils.js'
export default {
  data () {
    return {
      dialogInviteFriendVisible: false,
      dialogSelectMeetingVisible: false,
      // uploadVideoVisible: false,
      formMeeting: {
        meetingId: null
      },
      formInviteFriend: {
            nickName: '',
            formError: ''
          },
          // formUploadVideo: {

          // },
          nowMeetings:[],
          isMaster: true,
          isShare: false,
      localVideo: {
        src: ''
      },
      remoteVideo: {
        src: ''
      },
      shareVideo: {
        src: ''
      },
      meetingMembers: [],
      remoteResources: [],
      meetCore: null,
      chatroom: '',
      Conference: '开始会议',
      Share: '共享桌面',
    }
  },
  created(){
    var $this = this;
    $this.getNowMeetings(function(res){
      if(res.data.data.length<1){
        $this.$message({
                message: '暂无正在进行的会议！',
                type: 'success'
            });
      }else{
        $this.nowMeetings=res.data.data;
      }
    },function(res){
      $this.$message.error('获取正在进行的会议信息失败！');
    });
    $this.initXChatKit();
  },
  mounted() {
    
  },
  updated() {
    
  },
  components:{
    'scroll': Scroll,
    'chat': Chat
  },
  methods:{
    // handleSelectMeeting(){
    // 	var $this = this;
    // 	if($this.formMeeting.meetingId){
    // 		$this.getMeetingInfo($this.formMeeting.meetingId, function(res){
    // 			$this.setMeeting(res.data.data)
    // 			if($this.user.id==$this.meeting.founderId){
    // 				$this.isMaster = true;
    // 			}else{
    // 				$this.isMaster = false;
    // 			}
    // 		},function(res){
    // 			$this.$message.error('获取会议信息失败！'+res.msg);
    // 		});
    // 		$this.chatroom = $this.formMeeting.meetingId.toString();
    // 		$this.meetingjson.fromuser = $this.user.id;
    // 		$this.meetingjson.fromname = $this.user.nickname;
    // 		$this.meetingjson.chatroom = $this.formMeeting.meetingId;
    // 		$this.xchatkit = new XChatKit($this.meetingjson);
    // 		$this.dialogSelectMeetingVisible = false;
    // 	}
    // },
    // onUploadVideoClicked(){
    // 	var $this = this;
    // 	$this.uploadVideoVisible = false;
    // },

    refreshNowMembers(){
      var $this = this;
      $this.getMeetingMembers($this.curMeeting.id, function(res){
        $this.meetingMembers = res.data.data;
      },function(res){
        console.log("获取会议成员失败！")
      })
    },

      handleSelectMeeting () {
        var $this = this;
        if($this.formMeeting.meetingId){
          $this.getMeetingInfo($this.formMeeting.meetingId, function(res){
            $this.setCurMeeting(res.data.data)
          },function(res){
            $this.$message.error('获取会议信息失败！'+res.msg);
          });
          $this.dialogSelectMeetingVisible = false;
        }
      },

    // 视频回调函数
    onCallback(json) {
        if ("EventLocalStream" === json.msgtype){
          this.onEventLocalStream(json);
        }
        else if("EventPartyAdded" === json.msgtype){
          this.onEventPartyAdded(json);
        }
        else if("EventPartyRemoved" === json.msgtype){
          this.onEventPartyRemoved(json);
        }
        else if("EventPartyConnected" === json.msgtype){
          this.onEventPartyConnected(json);
        }
        else if("EventPartyDisconnected" === json.msgtype){
          this.onEventPartyDisconnected(json);
        }
    },

    // 设置会议流回调
    onEventLocalStream(json) {
      var $this = this;
      var meetingObj = json;
      if($this.isShare){
        $this.localVideo.src=window.URL.createObjectURL($this.meetCore.GetLocalStream());
        $this.shareVideo.src=window.URL.createObjectURL(meetingObj.stream);
      }else{
        $this.localVideo.src=window.URL.createObjectURL(meetingObj.stream);
      }
    },

    //加入会议回调
    onEventPartyAdded(json) {
      var $this = this;
      var meetingObj = json;
      if(!$this.isMaster && $this.curMeeting.founderId==meetingObj.fromuser){
        $this.remoteVideo.src=window.URL.createObjectURL(meetingObj.stream);
        return;
      }
      var result = $this.remoteResources.findIndex((value, index, arr) => {
        return value.id == meetingObj.id;
      })
      if(result==-1){
        $this.remoteResources.push(meetingObj);
      }
    },

    // 离开会议的回调
    onEventPartyRemoved(json) {
      var $this = this;
      var meetingObj = json;
      var result = $this.remoteResources.findIndex((value, index, arr) => {
        return value.id == meetingObj.id;
      })
      if(result != -1) {
        $this.remoteResources.splice(result,1);
      }

    },

    // 开始录像
    onEventPartyConnected(json) {
      var $this = this;
      var meetingObj = json;
      $this.meetCore.StartRecording(meetingObj.fromuser);
    },

    // 结束录像
    onEventPartyDisconnected(json) {
      var $this = this;
      var meetingObj = json;
      $this.meetCore.StopRecording(meetingObj.fromuser);
    },

      // 开始或者结束会议
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

    onJoinConferenceClicked () {
      var $this = this;
      $this.refreshNowMembers();
      if($this.isMaster){
        $this.startMeeting($this.curMeeting.id, function(res){
          $this.meetCore.JoinConference();
        }, function(res){
          $this.$message.error('启动会议失败！'+res.msg);
        })
      }else{
        $this.entryMeeting($this.curMeeting.id, $this.user.nickname, function(res){
          $this.meetCore.JoinConference();
        }, function(res){
          $this.$message.error('进入会议失败！'+res.msg);
        })
      }
    },

      onLeaveConferenceClicked () {
        var $this = this;
        $this.meetCore.LeaveConference();
        $this.meetCore.ClearXChatKit();
        //刷新与会人员列表
        $this.refreshNowMembers();
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
        $this.meetCore.StartShare();
      },

      //停止屏幕共享
      onStopShareClicked()
      {
        var $this = this;
        $this.isShare = false;
        $this.meetCore.StopShare();
        $this.localVideo.src = window.URL.createObjectURL($this.meetCore.GetLocalStream());
      },
      //加入会议事件
      onEventPartyAdded(json)
      {
        if(!this.isMaster && this.curMeeting.founderId==json.fromuser) {
         this.remoteVideo.src = window.URL.createObjectURL(json.stream);
        return;
        }
        var result = this.remoteResources.findIndex((value, index, arr) => {
          return value.id == json.id;
        })
        if(result==-1) {
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


      //启用摄像头
      onEnableCameraClicked()
      {
        var $this = this;
        $this.localVideo.src = $this.meetCore.GetLocalStream();
        $this.meetCore.EnableCamera();
      },
      //禁用摄像头
      onDisableCameraClicked()
      {
        $this.localVideo.src = '';
        localVideo.poster = "avatar.png";
        $this.meetCore.DisableCamera();
      },

      //启用麦克风
      onDisableMicphoneClicked()
      {
        var $this = this;
        $this.meetCore.DisableMicphone();
      },
      //禁用麦克风
      onDisableMicphoneClicked()
      {
        var $this = this;
        $this.meetCore.DisableMicphone();
      },

    /*
    *此处往上为本次封装代码
    *2018-9-28
    *史鑫鑫
    */


    //开始会议与结束会议
    // onStartOrEndConference()
    // {
    // 	var $this = this;
    // 	if($this.Conference == '开始会议') {
    // 		$this.onJoinConferenceClicked();
    // 		$this.Conference = '结束会议';
    // 	} else {
    // 		$this.onLeaveConferenceClicked();
    // 		$this.Conference = '开始会议';
    // 	}
    // },

    //开始会议
    // onJoinConferenceClicked()
    // {
    // 	var $this = this;
    // 	if($this.isMaster){
    // 		$this.startMeeting($this.meeting.id, function(res){
    // 			$this.xchatkit.JoinConference($this.meetingjson);
    // 		}, function(res){
    // 			$this.$message.error('启动会议失败！'+res.msg);
    // 		})
    // 	}else{
    // 		$this.entryMeeting($this.meeting.id, $this.user.nickname, function(res){
    // 			$this.xchatkit.JoinConference($this.meetingjson);
    // 		}, function(res){
    // 			$this.$message.error('进入会议失败！'+res.msg);
    // 		})
    // 	}
    // },
    //结束
    // onLeaveConferenceClicked()
    // {
    // 	var $this = this;
    // 	$this.xchatkit.LeaveConference($this.meetingjson);
   //        //刷新与会人员列表
   //        $this.refreshNowMembers();
    // 	// var $this = this;
    // 	// if($this.isMaster){
    // 	// 	$this.endMeeting($this.meeting.id, function(res){
    // 	// 		$this.xchatkit.LeaveConference($this.meetingjson);
    // 	//         //刷新与会人员列表
    // 	//         $this.refreshNowMembers();
    // 	// 	}, function(res){
    // 	// 		$this.$message.error('结束会议失败！'+res.msg);
    // 	// 	})
    // 	// }else{
    // 	// 	$this.exitMeeting($this.meeting.id, $this.user.nickname, function(res){
    // 	// 		// alert("离开会议,会议号:" + this.meetingjson.chatroom);
    // 	//         $this.xchatkit.LeaveConference($this.meetingjson);
    // 	//         //刷新与会人员列表
    // 	//         $this.refreshNowMembers();
    // 	// 	}, function(res){
    // 	// 		$this.$message.error('退出会议失败！'+res.msg);
    // 	// 	})
    // 	// }
    // },

    //邀请人
    onInviteFriendClicked()
    {
      this.dialogInviteFriendVisible = false;
        this.addMember(this.room, this.formInviteFriend.nickName);
    },

    // onHoldCallClicked()
    // {
    // 	var $this = this;
    // 	$this.meetingjson.chatroom = '';
   //        $this.xchatkit.HoldCall($this.meetingjson);
    // },

    // onRetrieveCallClicked()
    // {
    // 	var $this = this;
    // 	$this.meetingjson.chatroom = '';
   //        this.xchatkit.RetrieveCall($this.meetingjson);
    // },

    // onMakeCallClick(){
    // 	var json = myjson;
   //        json.touser = '';//对方Id
   //        json.chatroom = '';//会议Id
   //        this.xchatkit.MakeCall ( json );
    // },
    // onReleaseCallClick(){
    // 	var json = myjson;
   //        json.touser = '';
   //        json.chatroom = '';
   //        this.xchatkit.ReleaseCall ( json );
    // },

    // //共享桌面与停止共享
    // onStartOrEndShare()
    // {
    // 	var $this = this;
    // 	if($this.Share == '共享桌面') {
    // 		$this.onStartShareClicked();
    // 		$this.Share = '停止共享';
    // 	} else {
    // 		$this.onStopShareClicked();
    // 		$this.Share = '共享桌面';
    // 	}
    // },

    // //开始屏幕共享
    // onStartShareClicked()
    // {
    // 	var $this = this;
    // 	$this.isShare = true;
    //     $this.xchatkit.StartShare();
    //     // this.shareVideo.src=window.URL.createObjectURL(json.stream);
    // },

    // //停止屏幕共享
    // onStopShareClicked()
    // {
    // 	var $this = this;
    // 	$this.isShare = false;
    //     $this.xchatkit.StopShare();
    //     $this.localVideo.src = window.URL.createObjectURL($this.xchatkit.GetLocalStream());
    // },
    // //回调函数
    // //本地流事件
    // // onEventLocalStream(json)
    // // {
    // // 	// this.$refs.localVideo.srcObject = json.stream;
    // // 	var $this = this;
    // // 	if($this.isShare){
    // // 		$this.localVideo.src=window.URL.createObjectURL($this.xchatkit.GetLocalStream());
    // // 		$this.shareVideo.src=window.URL.createObjectURL(json.stream);
    // // 	}else{
    // // 		$this.localVideo.src=window.URL.createObjectURL(json.stream);
    // // 	}
    // // 	// $this.localVideo.src=window.URL.createObjectURL(json.stream);
    // // },

    // //加入会议事件
    // onEventPartyAdded(json)
    // {
      
    // 	if(!this.isMaster && this.meeting.founderId==json.fromuser){
    // 		this.remoteVideo.src=window.URL.createObjectURL(json.stream);
    // 		return;
    // 	}
    // 	var result = this.remoteResources.findIndex((value, index, arr) => {
  //           	return value.id == json.id;
  //         	})
  //         	if(result==-1){
  //         		this.remoteResources.push(json);
  //         	}
    // },
    // //离开会议
    // onEventPartyRemoved(json)
    // {
    //     var result = this.remoteResources.findIndex((value, index, arr) => {
  //           	return value.id == json.id;
  //         	})
  //         	if(result!=-1){
  //         		this.remoteResources.splice(result,1);
  //         	}
    // },


    // //启用摄像头
    // onEnableCameraClicked()
    // {
    // 	var $this = this;
   //        $this.localVideo.src = window.URL.createObjectURL($this.xchatkit.GetLocalStream());
   //        var json = $this.meetingjson;
   //        json.chatroom = '';
   //        xchatkit.EnableCamera(json);
    // },
    // //禁用摄像头
    // onDisableCameraClicked()
    // {
   //        $this.localVideo.src = '';
   //        localVideo.poster = "avatar.png";
   //        json = $this.meetingjson;
   //        json.chatroom = '';
   //        xchatkit.DisableCamera(json);
    // },

    // //启用麦克风
    // onDisableMicphoneClicked()
    // {
   //        var $this = this;
   //        $this.xchatkit.EnableMicphone();
    // },
    // //禁用麦克风
    // onDisableMicphoneClicked()
    // {
   //        var $this = this;
   //        $this.xchatkit.DisableMicphone();
    // },


    // onEventRDPEnabled(json)
    // {
          
    // },
    // onEventRDPDisabled(json)
    // {
        
    // },

    //启动录像
    // onEventPartyConnected(json){
    // 	var $this = this;
    // 	$this.xchatkit.StartRecording(json.fromuser);
    // },
    //停止录像
    // onEventPartyDisconnected(json){
    // 	var $this = this;
    // 	$this.StopRecording(json.fromuser);
    // },

    //回调函数
    // onCallback(json) {
    //     console.log ( json );
    //     console.log ( JSON.stringify ( json ) );
    //     if ( "EventLocalStream" == json.msgtype )
    //         this.onEventLocalStream ( json );
    //     else if ( "EventPartyAdded" === json.msgtype )
    //         this.onEventPartyAdded ( json );
    //     else if ( "EventPartyRemoved" === json.msgtype )
    //         this.onEventPartyRemoved ( json );
    //     else if ( "EventRDPEnabled" === json.msgtype )
    //         this.onEventRDPEnabled ( json );
    //     else if ( "EventRDPDisabled" === json.msgtype )
    //         this.onEventRDPDisabled ( json );
    //     else if ( "EventPartyConnected" === json.msgtype )
    //         this.onEventPartyConnected ( json );
    //     else if ( "EventPartyDisconnected" === json.msgtype )
    //         this.onEventPartyDisconnected ( json );
    // },


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
      $this.$axios.post(utils.handleParamInUrl(apiMeeting.now.members, {
        mid: id.toString()
      }), {}, cbOk, cbErr)
    },

    startMeeting(meetingId, cbOk, cbErr){
      var $this = this;
      $this.$axios.post(utils.handleParamInUrl(apiMeeting.now.start, {
        mid: meetingId.toString()
      }), {}, cbOk, cbErr)
    },

    endMeeting(meetingId, cbOk, cbErr){
      var $this = this;
      $this.$axios.post(utils.handleParamInUrl(apiMeeting.now.end, {
        mid: meetingId.toString()
      }), {}, cbOk, cbErr)
    },

    entryMeeting(meetingId, nickname, cbOk, cbErr){
      var $this = this;
      $this.$axios.post(utils.handleParamInUrl(apiMeeting.now.entry, {
        mid: meetingId.toString(),
      }), {
        user_nickname: nickname
      }, cbOk, cbErr)
    },

    exitMeeting(meetingId, nickname, cbOk, cbErr){
      var $this = this;
      $this.$axios.post(utils.handleParamInUrl(apiMeeting.now.exit, {
        meeting_id: meetingId.toString(),
      }), {
        user_nickname: nickname
      }, cbOk, cbErr)
    },

    initXChatKit(){
      var $this = this;
      if($this.curMeeting){
        if($this.user.id==$this.curMeeting.founderId){
          $this.isMaster = true;
        }else{
          $this.isMaster = false;
        }
            $this.meetCore = new Meet($this.user.id, $this.user.nickname, $this.curMeeting.id, $this.onCallback).getXchatkit();
            // $this.chatroom = 'meeting:'+$this.formMeeting.meetingId.toString();
            $this.chatroom = $this.meetCore;
      }
    },

    ...mapMutations([
      'setCurMeeting'
    ]),
  },
  name: 'MeetingNow',
  watch:{
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
    },
    curMeeting:{
      handler:function(val, oldVal) {
        var $this = this;
        $this.initXChatKit();
      },
      deep: true
    }
  },
  computed:{
    ...mapState({
      nav:state=>state.nav
    }),
    ...mapGetters([
      'user',
      'curMeeting'
    ]),
    videoSrc: function(){
      return function(uid){
        var $this = this;
        var json = $this.remoteResources.find((value, index, arr) => {
                return value.fromuser == uid;
              })
              if(typeof(json)!="undefined"){
                 return window.URL.createObjectURL(json.stream);
                // remoteVideo.srcObject=json.stream;
              }
      }
    }
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
  /* .content{
    
  } */
  .btn-group a{
    color: gray;
    text-decoration: none;
  }
  .content-main{
    border-right: 2px solid gray;
  }
  .content-right{
    width: 200px;
  }
  .chat-message{
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 130px;
    left: 0px;
  }
  .chat-text{
    height: 130px;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
  .chat-message >>> .text{
    line-height: 1.8em;
  }
</style>
