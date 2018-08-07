<template>
	<span>加入会议</span>
</template>
<script>
export default {
	data() {
		return {
			url:""
		}
	},
	methods:{
		joinMeetings(mid) {
			axios.get('/meeting/' + mid)
			.then(function(response){
				if(response.code == 0) {
					this.url = response.url;
					console.log(response.msg);
				} else {
					console.log(response.msg);
				}
			})
			.catch(function(error) {
				console.log(error);
			})
		}
	},
	name: 'MeetingJoin'
}
</script>
<style>
	
</style>