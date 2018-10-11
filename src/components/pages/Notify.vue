<template>
	<div style="padding:20px 0px;">
		<div class="h-full-container v-center">
			<span class="full-element">这是一条普通消息，不用操作</span>
			<div class="deal-actions" style="height: 40px;">
			</div>
		</div>
		<div class="h-full-container v-center">
			<span class="full-element">XXX会议即将开始，主持人：xxx，请你看好时间准时参加，会议时间：2018-09-10 11:00</span>
			<div class="deal-actions">
				<el-button type="text" disabled>倒计时&nbsp;05:11:50</el-button>
			</div>
		</div>
		<div class="h-full-container v-center">
			<span class="full-element">XXX邀请你为好友</span>
			<div class="deal-actions">
				<el-button type="text">同意</el-button>
				<el-button type="text">拒绝</el-button>
			</div>
		</div>
		<div class="h-full-container v-center">
			<span class="full-element">XXX邀请你加入群</span>
			<div class="deal-actions">
				<el-button type="text">同意</el-button>
				<el-button type="text">拒绝</el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      context:"",
      history:""
    }
  },
	methods: {
    refreshAllMsg() {
      var $this = this;
      getMsg( function(res) {
        $this.context = res;
      }, function(){
        $this.$message.error('获取通知失败');
      })
    },
		getMsg(cbOk, cbErr){
      var $this = this;
        $this.$axios.get(apiMsg.msg, {
      }, cbOk, cbErr)
    },
    refreshAllHistoryMsg() {
      var $this = this;
      getHistory( function(res) {
        $this.history = res;
      }, function() {
        $this.$message.error('获取历史通知失败');
      })
    },
    getHistory(cbOk, cbErr) {
      var $this = this;
        $this.$axios.get(apiMsg.historymsg, {
      }, cbOk, cbErr)
    }
  },
  mounted() {
    // refreshAllMsg();
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