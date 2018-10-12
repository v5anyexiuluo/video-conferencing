<template>
	<div style="padding:20px 0px;">
		<template v-for="(msg, index) in msgs">
			<div v-if="msg.type==msgType.PLAIN_TEXT" class="h-full-container v-center">
				<span class="full-element">{{msg.content}}</span>
				<div class="deal-actions" style="height: 40px;">
				</div>
			</div>
			<div v-else-if="msg.type==msgType.CONFERENCE_READY_START" class="h-full-container v-center">
				<span class="full-element">{{msg.content.template}}</span>
				<div class="deal-actions">
					<el-button type="text" disabled>{{msg.content.start_time}}倒计时&nbsp;05:11:50</el-button>
				</div>
			</div>
			<div v-else-if="msg.type==msgType.CONTACT_ADDING" class="h-full-container v-center">
				<span class="full-element">{{msg.content.plain_message}}</span>
				<div class="deal-actions">
					<el-button type="text">同意</el-button>
					<el-button type="text">拒绝</el-button>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
	import SockJS from "sockjs-client";
	import Stomp from "stompjs";
	import md5 from 'js-md5';
	import {mapGetters} from 'vuex';
	import {apiMsg} from '@/properties/api.js';
	import utils from '@/assets/js/utils.js';
	const msgType={
		CONFERENCE_CREATION: 'CONFERENCE_CREATION',
		CONFERENCE_CANCEL: 'CONFERENCE_CANCEL',
		CONFERENCE_ENDING: 'CONFERENCE_ENDING',
		CONTACT_ADDING: 'CONTACT_ADDING',
		PLAIN_TEXT: 'PLAIN_TEXT'
	}
	export default {
        data: function(){
        	return {
        		stompClient: null,
        		msgs:[]
        	}
        },
        name: 'Login',
        components: {
        },
        created(){
        	var $this = this;
        	// $this.connect();
        },
        mounted() {
        },
        methods: {
        	// websocket连接
			connect() {
				var $this = this;
	    		// “/ws/contacts”为接入点（endpoint）
	            var socket = new SockJS(apiMsg.ws.endpoint);
	            $this.stompClient = Stomp.over(socket);
	            $this.stompClient.connect({}, function (frame) {
	                console.log('Connected: ' + frame);
	                var subcribePath = utils.handleParamInUrl(apiMsg.ws.subcribe,{
			        	id: md5.hex($this.user.nickname)
			        })
	                // var subcribePath= '/topic/' + md5.hex($this.user.nickname);
	                // 开始订阅消息
	                subcribe(subcribePath);
	            });
	        },

			// 订阅消息
			subcribe(subcribePath)
			{
				var $this = this;
			    $this.stompClient.subscribe(subcribePath, function (response) {
					// 这5句其实没啥用
				    // var response1 = document.getElementById('response');
				    // var p = document.createElement('p');
				    // p.style.wordWrap = 'break-word';
				    // p.appendChild(document.createTextNode(response.body));
				    // response1.appendChild(p);
					// 有用的是从这里开始，将消息字符串转Object
				    var content = JSON.parse(response.body);
				    $this.msgs.push(content);
					// 接收到消息后，发送消息确认给服务端，下面这段代码是固定的
				    if (content.id != undefined) {
				        $this.stompClient.send(subcribePath, {}, JSON.stringify({
				            'userId': $this.user.nickname,
				            "type": "ack",
				            "content": {
				                "messageId": (content.id),
				                "time": new Date().getTime()
				            }
				        }));
				    }
				}, {ack: 'client'});
			},

			// 发送消息给服务器的函数，用于客户端与服务端的通信
			sendSometing(subcribePath) {
				var $this = this;
	            $this.stompClient.send(subcribePath, {}, JSON.stringify({'name': $this.user.nickname}));
	        }
        },
        watch:{

        },
        computed:{
        	...mapGetters([
				'user'
			]),
        }
    }
</script>
<style scoped>
	.h-full-container{
		margin: 0px 0px 20px 20px;
		vertical-align: middle;
		text-align: left;
		border-bottom: 1px solid #e4e7ed;
	}
	.deal-actions{
		width: 140px;
	}
</style>