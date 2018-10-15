<template>
	<div style="padding:20px;">
		<template v-for="msg in msgs">
			<div v-if="msg.category==msgType.PLAIN_TEXT" class="h-full-container v-center">
				<span class="full-element">{{msg.content}}</span>
				<div class="deal-actions" style="height: 40px;">
				</div>
			</div>
			<div v-else-if="msg.category==msgType.CONFERENCE_READY_START" class="h-full-container v-center">
				<span class="full-element">{{msg.content.plain_message}}</span>
				<div class="deal-actions">
					<el-button type="text" @click="entryMeeting(msg.meetingInfoEntity)">进入会议</el-button>
				</div>
			</div>
			<div v-else-if="msg.category==msgType.CONTACT_ADDING" class="h-full-container v-center">
				<span class="full-element">{{msg.content.plain_message}}</span>
				<div class="deal-actions">
					<el-button type="text" @click="agreeAdded(url)">同意</el-button>
					<el-button type="text" @click="refuseAdded(url)">拒绝</el-button>
				</div>
			</div>
			<div v-else-if="msg.category==msgType.CONFERENCE_CREATION" class="h-full-container v-center">
				<span class="full-element">{{msg.content.plain_message}}</span>
			</div>
			<div v-else-if="msg.category==msgType.CONFERENCE_CANCEL" class="h-full-container v-center">
				<span class="full-element">{{msg.content.plain_message}}</span>
			</div>
			<div v-else-if="msg.category==msgType.CONFERENCE_ENDING" class="h-full-container v-center">
				<span class="full-element">{{msg.content.plain_message}}</span>
			</div>
		</template>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex';
	import {apiMsg} from '@/properties/api.js';
	import utils from '@/assets/js/utils.js';
	import {msgType} from '@/assets/js/common.js';
	export default {
    data: function(){
      return {
        stompClient: null,
        msgType: msgType,
        countdown: [],
        Mssage:{}
      }
    },
    name: 'Login',
    components: {
    },
    created(){
      var $this = this;
      $this.pullHistory(1, function(res){
        var msgs = res.data.data;
        msgs.forEach(function(value,index,array){
          $this.addMsg(JSON.parse(value));
        })
      },function(res){
        $this.$message.error('获取历史消息失败！');
      })

      $this.pullUndoMsg(function(res){
        var msg=res.data.data;
        console.log("Undo")
        console.log(msg)
        msg.forEach(function(value,index,array){
          $this.Mssage.push_back(JSON.parse(value));
        })
      },function(res){
        $this.$message.error('获取未读消息失败！');
      })
    },
    mounted() {
    },
    methods: {
      ...mapMutations([
        'addMsg',
        'setCurMeeting'
      ]),
      handleAdded(url){
        this.$axios.get('https://xingshidream.cn:8082'+url, null, cbOk, cbErr)
      },

      pullUndoMsg(cbOk, cbErr){
        this.$axios.get(apiMsg.pull.undo, null, cbOk, cbErr)
      },

      pullHistory(page, cbOk, cbErr){
        this.$axios.get(utils.handleParamInUrl(apiMsg.pull.history,{
          page: page
        }), null, cbOk, cbErr)
      },

      entryMeeting(meeting){
        var $this = this;
        $this.setCurMeeting(meeting);
        $this.$router.push({name: 'current'})
      }
    },
    watch:{

    },
    computed:{
      ...mapGetters([
        'user',
        'msgs',
        // 'filtedCountdownMsg'
      ]),
          // getCountdown: function(){
          // 	var $this = this
          // 	return function(id){
          // 		var result = $this.filtedCountdownMsg.find((value, index, arr) => {
            //          return value.messageId == id;
            //      })
            //      if(typeof result!='undefined'){
            //      	return result.time
            //      }else{
            //      	return '';
            //      }
          // 	}
          // }
    },
    filters:{
      
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
		/*width: 140px;*/
	}
	.content-wrap{
		width: auto;
	}
</style>