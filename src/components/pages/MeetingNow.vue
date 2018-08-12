<template>
	<div class="full-height content">
	  <div class="content-main" style="position: relative;">
	  	<div id = "videoWindows" align="center" style="height:90%; background-color: #145">
			<video ref="localVideo" id="localVideo" style="height: 600px;width: auto;background: white;">
				您的浏览器不支持 video 标签。
			</video>
			<!-- <video style="position: absolute;right: 20px;top: 20px;width: 200px;height: 120px;background: gray;">
				您的浏览器不支持 video 标签。
			</video>
			<video style="position: absolute;right: 20px;top: 200px;width: 200px;height: 120px;background: gray;">
				您的浏览器不支持 video 标签。
			</video> -->
		</div>
		<div id="audioWindows" align="center">
  		</div>
		<el-row class="btn-group" type="flex" align="middle" justify="space-between" style="position: absolute;left: 0px;bottom: 0px;width: 100%;height: 50px;line-height: 50px;">
			<el-col :span="3"><a href="#">邀请+</a></el-col>
			<el-col :span="3"><a href="#">选择主持人</a></el-col>
			<el-col :span="3"><a href="#">共享桌面</a></el-col>
			<el-col :span="3"><a href="#">聊天</a></el-col>
			<el-col :span="3"><a href="#">设置</a></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"><a href="#">开始</a></el-col>
			<el-col :span="3"><a href="#">会议结束</a></el-col>
		</el-row>
	  </div>
	  <div class="content-right">
	  	
	  </div>
	</div>
</template>
<script>
//import xchatkit from 'xchat'
// import $ from 'jquery'
import {mapState} from 'vuex';
export default {
	data() {
		return {
			user: "15029057276",
			name: "001",
			room: "96685",
			xchatkit: null,
			myjson: JSON.parse ( "{}" ),
			localVideo: null
		}
	},
	created() {
		// this.myjson.mgw = "wss://webrtc.myegoo.com.cn/ws";
		// this.myjson.turn = "turn:webrtc.myegoo.com.cn";
		// this.myjson.fromuser = this.user;
		// this.myjson.fromname = this.name;
		// this.myjson.chatroom = this.room;
		// this.myjson.callback = this.onCallback;
		// // this.myjson.fromuser = this.nav.user.nickname;
		// // this.myjson.fromname = this.nav.user.nickname;
		// // this.myjson.chatroom = this.$route.params.meeting.id;
		// this.myjson.camera = 0;
		// this.myjson.bps = null;
		// this.xchatkit = new XChatKit ( this.myjson );
		// // this.localVideo = this.$refs.localVideo;
	},
	mounted(){

	},
	methods:{
		
	},
	name: 'MeetingNow',
	computed:{
		...mapState({
		  nav:state=>state.nav
		}),
	}
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