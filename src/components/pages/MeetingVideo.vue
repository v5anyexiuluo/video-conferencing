<template>
	<div>会议视频ID:{{id}}，会议回放暂未开发</div>
</template>
<script>
export default {
	data() {
		return{
			id: ''
		}
	},
	name: 'MeetingVideo',
	components: {
	  
	},
	created: function() {
		var $this = this;
		$this.id=$this.$route.params.id;
	},
	methods: {
	}
}
</script>
<style scoped>
	
</style>