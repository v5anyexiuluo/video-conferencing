<template>
	<div>
		<chat-message :messages="messages"></chat-message>
      	<chat-text></chat-text>
	</div>
</template>
<script>
  	import md5 from 'js-md5';
	import ChatMessage from "@/components/common/ChatMessage.vue"
	import ChatText from "@/components/common/ChatText.vue"
  	import {mapGetters, mapMutations} from 'vuex';
  	import Chat from '@/assets/js/meeting.core.js';
  	import connect from '@/assets/js/connector.js';
  	export default {
	    name: 'Chat',
	    data(){
			return {
				chatCore: null,
				isMeeting: false,
				messages: []
			}
		},
		props:[
			'chatroom'
		],
		components: {
			'chat-message': ChatMessage,
			'chat-text': ChatText
		},
		methods: {
			...mapMutations([
				'addChatItem',
				'removeChatItem',
				'addChatMsg'
			]),

			// 聊天回调函数
			onCallback(json) {
				if("text" === json.msgtype)
					this.onEventRevieveChat(json);
			},

			onEventRevieveChat(json){
				var $this = this;
				var msgObj = JSON.parse(json.content);
				$this.messages.push(msgObj);
			},

			initChat(){
				var $this = this;
				connect.$off('msg');
				connect.$on('msg',function(msg){
					$this.chatCore.SendText(msg);
				})
				if(!$this.isMeeting){
					$this.chatCore = new Chat($this.user.id, $this.user.nickname, md5.hex($this.chatroom), $this.onCallback).getXchatkit();
					$this.chatCore.JoinConference();
					setTimeout(() => {
						$this.chatCore.GetLocalStream().getTracks().forEach(function(e){
							e.stop();
						})
					}, 1000);
				}else{
					$this.chatCore.addCallBack($this.onCallback)
				}			
			}
		},
		created(){
		},
		mounted() {
		},
		computed:{
			...mapGetters([
				'user',
				'chatList',
				'historyMsg'
			]),
		},
		watch:{
			chatroom:function(newVal, oldVal){
				var $this = this;
				if(oldVal){
					$this.addChatMsg({chatroom: oldVal, msg:$this.messages})
				}
				// var temp = newVal.split(":");
				// if(temp[0]=='meeting'){
				// 	$this.isMeeting = true;
				// }else{
				// 	$this.isMeeting = false;
				// }
				if(typeof newVal == 'string'){
					$this.isMeeting = false;
				}else{
					$this.isMeeting = true;
					$this.chatCore = newVal;
				}
				$this.initChat();
				$this.messages=$this.historyMsg(newVal);
			}
		},
		beforeDestroy: function () {
		    this.chatCore.LeaveConference();
		    this.chatCore.ClearXChatKit();
		    this.addChatMsg({chatroom: this.chatroom, msg:this.messages})
		},
	}
</script>
<style>
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
</style>