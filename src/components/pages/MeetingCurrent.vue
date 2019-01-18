<template>
	<div class="full-height content full-width h-full-container">
	  <div class="content-main full-element v-full-container">
	  	<div class="full-element h-full-container" v-if="videoShow">
	  		<div v-if="isMaster" ref="videoWindows" id="videoWindows" align="center" class="full-element h-full-container" style="background-color: #145">
		  		<div class="full-element h-full-container" style="position: relative;">
		  			<video :src="centerVideo.src" ref="mainVideo" id="mainVideo" class="full-element" style="object-fit: contain;position:absolute; left: 0px; bottom: 0px; right: 0px; width: 100%; height: 100%;" poster="@/assets/images/master-away.jpg" playsinline autoplay controls muted>
						您的浏览器不支持video标签。
					</video>
					<div class="full-element" style="position:absolute; left: 0px; bottom: 0px; right: 0px; width: 100%; height: 100%;background-image: url('@/assets/images/master-away.jpg')"></div>
					<video v-if="isShare" :src="secondVideo.src" ref="localVideo" id="localVideo" style="position: absolute;left: 20px;top: 20px;width: 200px;height: 120px;background: gray;object-fit: contain;" poster="@/assets/images/master-away.jpg" playsinline autoplay controls muted>
						您的浏览器不支持video标签。
					</video>
		  		</div>
		  		<div class="v-full-container" style="width:200px;background-color: #ecf5ff;">
					<scroll ref="videoScroll" class="full-element" style="overflow: hidden;padding: 0 10px;height: 0px;">
						<div>
							<div class="scroll-item" style="width: 100%;height: 110px;position: relative;" v-if="item.id!=user.id" v-for="(item, index) in meetingMembers">
								<video :src="videoSrc(item.id)" style="width: 100%;height: 110px;background: #9E9E9E;object-fit: contain;" poster="avatar.png" playsinline autoplay controls >
									您的浏览器不支持 video 标签。
								</video>
								<div style="position: absolute; width: 100%; top: 6px; font-size: 12px;color: white;display: flex;justify-content: space-between; padding: 0 10px;box-sizing: border-box;">
									<span>
										<i class="iconfont"  :class="[item['keepSilence']?  'el-icon-lg-keep-silence': 'el-icon-lg-keep-speak']" @click="onKeepSpeakOrSilence(index)"></i>
										<i class="iconfont el-icon-lg-select" :class="[item['asMasterScreen']?  'active': '']" @click="onSelectAsMasterScreen(index)"></i>
										<i class="iconfont el-icon-lg-force-exit" @click="onForceExit(item)"></i>
									</span>
									<span>
										<span>{{item.nickname}}</span>
										<span style="margin-left: 10px;" :style="{color: item.status!=memberStatus.USER_ENTERED? 'red':''}">{{item.status==memberStatus.USER_ENTERED? '在线':'离线'}}</span>
									</span>
								</div>
							</div>
						</div>
					</scroll>
		  		</div>
			</div>
			<div v-else ref="videoWindows" id="videoWindows" align="center" class="full-element h-full-container" style="background-color: #145">
		  		<div class="full-element h-full-container" style="position: relative;">
		  			<video :src="centerVideo.src" ref="mainVideo" id="mainVideo" class="full-element" style="object-fit: contain;position:absolute; left: 0px; bottom: 0px; right: 0px; width: 100%; height: 100%;" poster="@/assets/images/master-away.jpg" playsinline autoplay controls >
						您的浏览器不支持 video 标签。
					</video>
					<video :src="secondVideo.src" ref="localVideo" id="localVideo" style="position: absolute;left: 20px;top: 20px;width: 200px;height: 120px;background: gray;object-fit: contain;" poster="@/assets/images/master-away.jpg" playsinline autoplay controls muted>
						您的浏览器不支持 video 标签。
					</video>
		  		</div>
		  		<div class="v-full-container" style="width:200px;background-color: #ecf5ff;">
					<scroll ref="videoScroll" class="full-element" style="overflow: hidden;padding: 0 10px;height: 0px;">
						<div>
							<div style="width: 100%;height: 110px;position: relative;" v-if="item.id!=user.id && item.id!=curMeeting.founderId" v-for="(item, index) in meetingMembers">
								<video :src="videoSrc(item.id)" style="width: 100%;height: 110px;background: #9E9E9E;object-fit: contain;" poster="avatar.png" playsinline autoplay controls >
									您的浏览器不支持 video 标签。
								</video>
								<div style="position: absolute; width:100%; top: 6px; font-size: 12px;color: white;">
									<span></span>
									<span>
										<span>{{item.nickname}}</span>
										<span style="margin-left: 10px;" :style="{color: item.status!=memberStatus.USER_ENTERED? 'red':''}">{{item.status==memberStatus.USER_ENTERED? '在线':'离线'}}</span>
									</span>
								</div>
							</div>
						</div>
					</scroll>
		  		</div>
			</div>
			<div ref="audioWindows" id="audioWindows" align="center">
	  		</div>
	  	</div>
	  	<div v-else class="full-element v-full-container" style="background-size: 100% 100%;" :style="{backgroundImage:'url(' + (curMeeting.available==meetingStatus.BEFORE? require('@/assets/images/meeting-before.jpg'):(curMeeting.available==meetingStatus.ENDED? require('@/assets/images/meeting-ended.jpg'):(isMasterLeft? require('@/assets/images/master-away.jpg'):require('@/assets/images/client-away.jpg')))) + ')'}"></div>
		<el-row class="btn-group" type="flex" align="middle" justify="space-between" style="width:100%;height: 50px;line-height: 50px;background-color: white;">
			<el-col :span="3"><el-button :disabled="curMeeting.available!=meetingStatus.STARTED || (isMaster&&isLeft) || (!isMaster&&(isMasterLeft||isLeft))" @click="dialogSelectMeetingVisible = true" href="javascript:void(0)">切换会议</el-button></el-col>
			<!-- {{meetingStatus.STARTED}}-{{isLeft}}-{{isMasterLeft}} -->
			<!-- <el-col :span="3"><a @click="dialogInviteFriendVisible = true" href="javascript:void(0)">邀请+</a></el-col> -->
			<!-- <el-col :span="3"><a href="javascript:void(0)">主持人</a></el-col> -->
			<el-col :span="3"><el-button :disabled="curMeeting.available!=meetingStatus.STARTED || (isMaster&&isLeft) || (!isMaster&&(isMasterLeft||isLeft))" @click="onStartOrEndShare" href="javascript:void(0)">{{isShare? '结束共享':'共享桌面'}}</el-button></el-col>
			<!-- <el-col :span="3"><a href="javascript:void(0)">聊天</a></el-col> -->
			<!-- <el-col :span="3"><a href="javascript:void(0)">设置</a></el-col> -->
			<el-col :span="3"></el-col>
			<!-- <el-col :span="3" @click="uploadVideoVisible=true;">上传视频</el-col> -->
			<el-col :span="3"></el-col>
			<el-col :span="3"><el-button :disabled="!(curMeeting.available==meetingStatus.STARTED && (isMaster || (!isMaster&&!isMasterLeft)))" @click="onPlayOrPauseConference" href="javascript:void(0)">{{isLeft? '继续':'暂停'}}</el-button>&nbsp;&nbsp;&nbsp;&nbsp;<span v-if="isMaster"><el-button v-if="curMeeting.available==meetingStatus.BEFORE" @click="onStartOrEndConference" href="javascript:void(0)">开始</el-button><el-button :disabled="curMeeting.available!=meetingStatus.STARTED" v-if="curMeeting.available!=meetingStatus.BEFORE" @click="onStartOrEndConference" href="javascript:void(0)">结束</el-button></span></el-col>
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
// 房间可能的属性所有者、管理员、成员
// 成员可能的角色主持人、参与者	
import {apiMeeting} from '@/properties/api.js';
import {mapState,mapMutations,mapGetters} from 'vuex';
import BScroll from 'better-scroll'
import Scroll from '@/components/common/Scroll.vue'
import Chat from "@/components/common/Chat.vue"
import Meet from '@/assets/js/meeting.core.js';
import utils from '@/assets/js/utils.js';
import {meetingStatus, memberStatus} from '@/assets/js/common.js';
import Vue from 'vue';
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
	        isCenter: false,
			secondVideo: {
				src: ''
			},
			centerVideo: {
				src: ''
			},
			shareVideo: {
				src: ''
			},
			masterVideo: {
				src: ''
			},
			meetingStatus: meetingStatus,
			memberStatus: memberStatus,
			meetingMembers: [],
			remoteResources: [],
			meetCore: null,
			chatroom: '',
			isLeft: true,
			isMasterLeft: true
		}
	},
	created(){
		var $this = this;
		if(!$this.curMeeting){
			$this.$alert('暂无正在进行的会议，确定后跳转到会议列表！', '提示', {
				confirmButtonText: '确定',
				callback: action => {
				$this.$router.push({name: 'list'})
				}
			});
	    }
	    if($this.curMeeting.available==$this.meetingStatus.BEFORE){
	    	$this.refreshNowMembers();
	    	$this.$notify({
				title: '提示',
				message: '会议还未开始'
			});
			return;
	    }
	    if($this.curMeeting.available==$this.meetingStatus.ENDED){
	    	$this.$notify({
				title: '提示',
				message: '会议已经结束'
			});
			return;
	    }
	    $this.refreshNowMembers();
		// $this.initXChatKit();
	},
	mounted() {
		window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
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
		// 			$this.$message.error('获取会议信息失败！'+res.data.msg);
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
				$this.$message.error('获取与会成员失败！'+res.data.msg);
			})
		},

		refreshCurMeetingStatus(){
			var $this = this;
			$this.getMeetingInfo($this.curMeeting.id, function(res){
	          $this.setCurMeetingStatus(res.data.data)
	        },function(res){
	          $this.$message.error('更新会议信息失败！'+res.data.msg);
	        });
		},

	    handleSelectMeeting () {
	      var $this = this;
	      if($this.formMeeting.meetingId){
	        $this.getMeetingInfo($this.formMeeting.meetingId, function(res){
	          $this.setCurMeeting(res.data.data)
	        },function(res){
	          $this.$message.error('获取会议信息失败！'+res.data.msg);
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
		    else if("onText" === json.msgtype){
		    	this.onEventRecievedCmd(json);
		    }
	    	// else if("EventPartyClosed" === json.msgtype){
		    //   this.onEventPartyDisconnected(json);
		    // }
		},

		// 设置会议流回调
		onEventLocalStream(json) {
			var $this = this;
			var meetingObj = json;
			if($this.isMaster){
				if($this.isShare){
					$this.secondVideo.src=window.URL.createObjectURL($this.meetCore.GetLocalStream());
					$this.masterVideo.src=$this.centerVideo.src=window.URL.createObjectURL(meetingObj.stream);
				}else{
					$this.masterVideo.src=$this.centerVideo.src=window.URL.createObjectURL(meetingObj.stream);
				}
			}else{
				$this.secondVideo.src = window.URL.createObjectURL(meetingObj.stream);
			}
		},

		//加入会议事件
	    onEventPartyAdded(json)
	    {
	      if(this.curMeeting.founderId==json.fromuser){
	      	this.isMasterLeft = false;
	      	this.isLeft = false;
	      	this.refreshCurMeetingStatus();
	      }
	      if(this.curMeeting.founderId==json.fromuser){
	      	this.masterVideo.src = window.URL.createObjectURL(json.stream);
	      	if(!this.isMaster){
	      		this.centerVideo.src = window.URL.createObjectURL(json.stream);
	      	}
	      	return;
	      }
	      // if(!this.isMaster && this.curMeeting.founderId==json.fromuser) {
	      //  	this.centerVideo.src = window.URL.createObjectURL(json.stream);
	      // 	return;
	      // }
	      var result = this.meetingMembers.findIndex((value, index, arr) => {
	        return value.id == json.fromuser;
	      })
	      if(result!=-1) {
	        Vue.set(this.meetingMembers[result],'status', memberStatus.USER_ENTERED);
	      }
	      if(json.fromuser==this.user.id){
	      	return
	      }
	      result = this.remoteResources.findIndex((value, index, arr) => {
			return value.fromuser == json.fromuser;
		  })
		  if(result==-1) {
			  this.remoteResources.push(json);
		  }else{
			  Vue.set(this.remoteResources, result, json);
		  }
	    },

	    //离开会议
	    onEventPartyRemoved(json)
	    {
	      if(this.curMeeting.founderId==json.fromuser){
	      	this.isMasterLeft = true;
	      	//TODO: 能否将一下方法合并到一起
	      	this.refreshCurMeetingStatus();
	      	if(this.isMaster){
	      		this.PauseConference();
	      	}
	      }
	      var result = this.meetingMembers.findIndex((value, index, arr) => {
	        return value.id == json.fromuser;
	      })
	      if(result!=-1) {
	        Vue.set(this.meetingMembers[result],'status', memberStatus.USER_LEFT);
	      }
	      result = this.remoteResources.findIndex((value, index, arr) => {
	        return value.fromuser == json.fromuser;
	      })
	      if(result!=-1){
	        this.remoteResources.splice(result,1);
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

		onEventRecievedCmd(json){
			console.log(json)
			var $this = this;
			if(json.content.cmd=="forceExit"){
				if(json.content.data.id==$this.user.id){
					$this.$notify({
						title: '提示',
						message: '你已被踢出会议！'
					});
					$this.MeetingExit();
					$this.setCurMeeting(null);
					$this.isLeft = true;
					$this.isMasterLeft = true;
				}
			}else if(json.content.cmd=="keepSilence"){
				if(json.content.data.id==$this.user.id){
					$this.$notify({
						title: '提示',
						message: '你已被禁言！'
					});
					$this.disableMicphone();
				}
			}else if(json.content.cmd=="keepSpeak"){
				if(json.content.data.id==$this.user.id){
					$this.$notify({
						title: '提示',
						message: '解除禁言！'
					});
					$this.enableMicphone();
				}
			}else if(json.content.cmd=="asMasterScreen"){
				$this.secondVideo.src = $this.masterVideo.src;
				if(json.content.data.id==$this.user.id){
					$this.isCenter = true;
					$this.$notify({
						title: '提示',
						message: '作为主屏！'
					});
					$this.centerVideo.src = $this.secondVideo.src;
				}else{
					$this.isCenter = false;
					var result = this.remoteResources.find((value, index, arr) => {
						return value.fromuser == json.content.data.id;
					})
					if(typeof(result)!="undefined"){
		          		$this.centerVideo.src = window.URL.createObjectURL(result.stream);
		          		// remoteVideo.srcObject=json.stream;
		          	}
				}
			}else if(json.content.cmd=="noAsMasterScreen"){
				if(json.content.data.id==$this.user.id){
					$this.$notify({
						title: '提示',
						message: '取消作为主屏！'
					});
				}
				// if($this.isMaster){
				// 	$this.centerVideo.src = window.URL.createObjectURL($this.meetCore.GetLocalStream());
				// }else{
				// 	$this.centerVideo.src = $this.masterVideo.src;
				// }
				$this.centerVideo.src = $this.masterVideo.src;
				if($this.isMaster){
					$this.isCenter = true;
					$this.secondVideo.src = window.URL.createObjectURL($this.meetCore.GetLocalStream());
				}else{
					$this.isCenter = false;
					$this.secondVideo.src = window.URL.createObjectURL($this.meetCore.GetLocalStream());
				}
			}
		},

		SendCmd(cmd){
		    // var json = JSON.parse ( "{}" );
		    // json.chatroom = textTarget.value;
		    // json.content = textInput.value;
		    var $this = this;
		    $this.meetCore.SendInput(cmd);
		},

	    // 开始或者结束会议
	    onStartOrEndConference()
	    {
	      var $this = this;
	      if($this.curMeeting.available==$this.meetingStatus.BEFORE) {
	        $this.startConference();
	      } else if($this.curMeeting.available==$this.meetingStatus.STARTED) {
	        $this.endConference();
	      }
	    },

	    onPlayOrPauseConference(){
	    	var $this = this;
			if($this.isLeft) {
				$this.PlayConference();
			} else {
				$this.PauseConference();
			}
	    },

		startConference(){
			var $this = this;
			if($this.isMaster){
				$this.startMeeting($this.curMeeting.id, function(res){
					$this.PlayConference();
					$this.refreshCurMeetingStatus();
				}, function(res){
					$this.$message.error('启动会议失败！'+res.data.msg);
					$this.isLeft = true;
				})
			}
		},

	   endConference(){
	    	var $this = this;
			if($this.isMaster){
				$this.endMeeting($this.curMeeting.id, function(res){
					$this.PauseConference();
					$this.refreshCurMeetingStatus();
				}, function(res){
					$this.$message.error('结束会议失败！'+res.data.msg);
					$this.isLeft = false;
				})
			}
		},

		PlayConference(){
			var $this = this;
			$this.entryMeeting($this.curMeeting.id, $this.user.nickname, function(res){
				$this.isLeft = false;
				$this.MeetingJoin();
			}, function(res){
				$this.$message.error('进入会议失败！'+res.data.msg);
				$this.isLeft = true;
			})
		},

		PauseConference(){
			var $this = this;
			$this.exitMeeting($this.curMeeting.id, $this.user.nickname, function(res){
				$this.isLeft = true;
				$this.MeetingExit();
			}, function(res){
				$this.$message.error('退出会议失败！'+res.data.msg);
				$this.isLeft = false;
			})
		},

		MeetingJoin(){
			var $this = this;
			$this.meetCore = new Meet($this.user.id, $this.user.nickname, $this.curMeeting.id, $this.onCallback).getXchatkit();
	        $this.chatroom = $this.meetCore;
	        $this.meetCore.JoinConference();
		},

		MeetingExit(){
			var $this = this;
			$this.meetCore.ClearXChatKit();
		},
			
		// onLeaveConferenceClicked () {
		// 	var $this = this;
		// 	if($this.isMaster){
		// 		$this.endMeeting($this.curMeeting.id, function(res){
		// 			$this.$message.success('结束会议成功！'+res.data.msg);
		// 			$this.meetCore.LeaveConference();
	  //   		$this.meetCore.ClearXChatKit();
		// 			$this.refreshNowMembers();
		// 		}, function(res){
		// 			$this.$message.error('结束会议失败！'+res.data.msg);
		// 		})
		// 	}else{
		// 		$this.exitMeeting($this.curMeeting.id, $this.user.nickname, function(res){
		// 			$this.$message.success('退出会议成功！'+res.data.msg);
		// 			$this.meetCore.LeaveConference();
	  //   		$this.meetCore.ClearXChatKit();
		// 			$this.refreshNowMembers();
		// 		}, function(res){
		// 			$this.$message.error('退出会议失败！'+res.data.msg);
		// 		})
		// 	}
	  // },

	    //共享桌面与停止共享
	    onStartOrEndShare()
	    {
	      var $this = this;
	      if($this.isShare) {
	        $this.stopShare();
	      } else {
	        $this.startShare();
	      }
	    },

	    //开始屏幕共享
	    startShare()
	    {
	      var $this = this;
	      $this.meetCore.StartShare();
	      $this.isShare = true;
	    },

	    //停止屏幕共享
	    stopShare()
	    {
	      var $this = this;
	      $this.meetCore.StopShare();
	      if($this.isMaster){
	      	$this.centerVideo.src = window.URL.createObjectURL($this.meetCore.GetLocalStream());
	      }else{
	      	$this.secondVideo.src = window.URL.createObjectURL($this.meetCore.GetLocalStream());
	      }
	      $this.isShare = false;
	    },
	    
	    //启用摄像头
	    enableCamera()
	    {
	      var $this = this;
	      if($this.isMaster){
	      	$this.centerVideo.src = $this.meetCore.GetLocalStream();
	      }else{
	      	$this.secondVideo.src = $this.meetCore.GetLocalStream();
	      }
	      $this.meetCore.EnableCamera();
	    },
	    //禁用摄像头
	    disableCamera()
	    {
    	  if($this.isMaster){
	      	$this.centerVideo.src = '';
	      }else{
	      	$this.secondVideo.src = '';
	      }
	      // $this.localVideo.src = '';
	      // localVideo.poster = "@/assets/images/master-away.jpg";
	      $this.meetCore.DisableCamera();
	    },

	    //启用麦克风
	    enableMicphone()
	    {
	      var $this = this;
	      $this.meetCore.EnableMicphone();
	    },
	    //禁用麦克风
	    disableMicphone()
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
		// 			$this.$message.error('启动会议失败！'+res.data.msg);
		// 		})
		// 	}else{
		// 		$this.entryMeeting($this.meeting.id, $this.user.nickname, function(res){
		// 			$this.xchatkit.JoinConference($this.meetingjson);
		// 		}, function(res){
		// 			$this.$message.error('进入会议失败！'+res.data.msg);
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
		// 	// 		$this.$message.error('结束会议失败！'+res.data.msg);
		// 	// 	})
		// 	// }else{
		// 	// 	$this.exitMeeting($this.meeting.id, $this.user.nickname, function(res){
		// 	// 		// alert("离开会议,会议号:" + this.meetingjson.chatroom);
		// 	//         $this.xchatkit.LeaveConference($this.meetingjson);
		// 	//         //刷新与会人员列表
		// 	//         $this.refreshNowMembers();
		// 	// 	}, function(res){
		// 	// 		$this.$message.error('退出会议失败！'+res.data.msg);
		// 	// 	})
		// 	// }
		// },

		//邀请人
		onInviteFriendClicked()
		{
			this.dialogInviteFriendVisible = false;
		    this.addMember($this.curMeeting.id, this.formInviteFriend.nickName, function(res){
		    	$this.$message({
					message: '添加会议成员成功！',
					type: 'success'
				});
		    	$this.refreshNowMembers();
		    }, function(res){
		    	$this.$message.error('添加与会成员失败！'+res.data.msg);
		    });
		},

		onForceExit(target){
			var $this = this;
			if($this.isMaster){
				$this.deleteMemeber($this.curMeeting.id, target.nickname, function(res){
					$this.SendCmd({cmd: "forceExit", data: target});
					$this.$message({
						message: '踢出成员成功！',
						type: 'success'
					});
					$this.refreshNowMembers();
				},function(res){
					$this.$message.error('踢出与会成员失败！'+res.data.msg);
				})
			}
		},

		onSelectAsMasterScreen(index){
			var $this = this;
			if($this.isMaster){
				if(typeof $this.meetingMembers[index]["asMasterScreen"] == "undefined"||!$this.meetingMembers[index]["asMasterScreen"]){
					var temp = $this.meetingMembers[index];
					temp["asMasterScreen"]=true;
					Vue.set($this.meetingMembers, index, temp);
					// $this.meetingMembers[index]["keepSilence"]=true;
					$this.SendCmd({cmd: "asMasterScreen", data: $this.meetingMembers[index]});
					$this.$message({
						message: '设置'+temp.nickname+'为主屏成功！',
						type: 'success'
					});
				}else{
					var temp = $this.meetingMembers[index];
					temp["asMasterScreen"]=false;
					Vue.set($this.meetingMembers, index, temp);
					// $this.meetingMembers[index]["keepSilence"]=false;
					$this.SendCmd({cmd: "noAsMasterScreen", data: $this.meetingMembers[index]});
					$this.$message({
						message: '取消'+temp.nickname+'主屏！',
						type: 'success'
					});
				}
			}
		},

		onKeepSpeakOrSilence(index){
			var $this = this;
			if($this.isMaster){
				if(typeof $this.meetingMembers[index]["keepSilence"] == "undefined"||!$this.meetingMembers[index]["keepSilence"]){
					var temp = $this.meetingMembers[index];
					temp["keepSilence"]=true;
					Vue.set($this.meetingMembers, index, temp);
					// $this.meetingMembers[index]["keepSilence"]=true;
					$this.SendCmd({cmd: "keepSilence", data: $this.meetingMembers[index]});
					$this.$message({
						message: '禁言成功！',
						type: 'success'
					});
				}else{
					var temp = $this.meetingMembers[index];
					temp["keepSilence"]=false;
					Vue.set($this.meetingMembers, index, temp);
					// $this.meetingMembers[index]["keepSilence"]=false;
					$this.SendCmd({cmd: "keepSpeak", data: $this.meetingMembers[index]});
					$this.$message({
						message: '取消禁言成功！',
						type: 'success'
					});
				}
			}
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
		// 		$this.startShare();
		// 		$this.Share = '停止共享';
		// 	} else {
		// 		$this.stopShare();
		// 		$this.Share = '共享桌面';
		// 	}
		// },

		// //开始屏幕共享
		// startShare()
		// {
		// 	var $this = this;
		// 	$this.isShare = true;
		//     $this.xchatkit.StartShare();
		//     // this.shareVideo.src=window.URL.createObjectURL(json.stream);
		// },

		// //停止屏幕共享
		// stopShare()
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
	 //        localVideo.poster = "@/assets/images/master-away.jpg";
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

		getNowMeetings(cbOk, cbErr){
			var $this = this;
			$this.$axios.get(apiMeeting.now.all+'?page=-1&size=-1', {}, cbOk, cbErr)
		},

		getMeetingInfo(id, cbOk, cbErr){
			var $this = this;
			$this.$axios.get(apiMeeting.base.info+id, null, cbOk, cbErr)
		},

		getMeetingMembers(id, cbOk, cbErr){
			var $this = this;
			$this.$axios.get(utils.handleParamInUrl(apiMeeting.now.members, {
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


		//会议加人
		addMember(meetingId, nickname, cbOk, cbErr) {
			var $this = this;
			$this.$axios.put(utils.handleParamInUrl(apiMeeting.now.add, {
				mid: meetingId.toString(),
			}), {
				user_nickname: nickname
			}, cbOk, cbErr)
		},

		deleteMemeber(meetingId, nickname, cbOk, cbErr){
			var $this = this;
			$this.$axios.post(utils.handleParamInUrl(apiMeeting.now.delete, {
				mid: meetingId.toString(),
			}), {
				members: [nickname]
			}, cbOk, cbErr)
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
				mid: meetingId.toString(),
			}), {
				user_nickname: nickname
			}, cbOk, cbErr)
		},

		initXChatKit(){
			var $this = this;
			if($this.curMeeting){
				if($this.user.id==$this.curMeeting.founderId){
					$this.isMaster = true;
					$this.isCenter = true;
				}else{
					$this.isMaster = false;
					$this.isCenter = false;
				}
		        // $this.chatroom = 'meeting:'+$this.formMeeting.meetingId.toString();
		        if(!$this.isMaster){
		        	$this.MeetingJoin();		        	
		        }
			}
		},

		beforeunloadHandler(e){
			if(this.meetCore){
				this.meetCore.ClearXChatKit();
			}
		},

		...mapMutations([
			'setCurMeeting',
			'setCurMeetingStatus'
		]),
	},
	name: 'MeetingNow',
	watch:{
		dialogSelectMeetingVisible: function(val, oldVal){
			var $this = this;
			if(val){
				$this.getNowMeetings(function(res){
					if(res.data.data.data.length>0){
						$this.nowMeetings=res.data.data.data;
						$this.nowMeetings.sort((a,b)=>{  
							return b.createTime-a.createTime  
						});
					}
				},function(res){
					$this.$message.error('获取正在进行的会议信息失败！');
				});
			}
		},
		curMeeting:{
			immediate:true,
			handler:function(val, oldVal) {
				var $this = this;
				if(val){
					$this.refreshCurMeetingStatus();
				}
				if(val.available==$this.meetingStatus.BEFORE||val.available==$this.meetingStatus.STARTED){
					if((oldVal && val.id != oldVal.id)||!oldVal){
						$this.initXChatKit();
					}
				}
			},
			deep: false
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
		},
		videoShow: function(){
			var $this = this;
			if($this.curMeeting.available==$this.meetingStatus.BEFORE||$this.curMeeting.available==$this.meetingStatus.ENDED){
				return false;
			}
			console.log($this.isMasterLeft);
			if($this.isMaster){
				return $this.isLeft? false: true;
			}else{
				return ($this.isLeft || $this.isMasterLeft)? false: true;
			}
		}
	},
	beforeDestroy: function () {
		if(this.meetCore){
			this.meetCore.ClearXChatKit();
		}
	},

	destroyed() {
		window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
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
	.btn-group .el-button{
	    line-height: initial;
	    padding: 4px 10px;
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
	.scroll-item .iconfont{
		cursor: pointer;
		padding-right: 4px;
	}
	.scroll-item .iconfont:hover{
		color: red;
	}
	.el-icon-lg-keep-silence, .el-icon-lg-select.active{
		color: red;
	}
</style>
