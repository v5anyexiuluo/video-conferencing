<template>
	<span>预约会议</span>
</template>
<script>
export default {
	data() {
		return {
			MeetingInfo: null
		}
	},
	methods: {
		createMeeting(meetingName, members) {
			axios.put('/meetings/create', {
	          params: {
	            meeting_name: meeting_name,
	            members: members
	          }
	        })
	        .then(function(response) {
	          if(response.code == 0) {
	            this.MeetingInfo = response.data;
	            console.log(response.msg);
	          } else {
	            console.log(response.msg);
	          }
	        })
	        .catch(function(err) {
	          console.log(err)
	        })
		}
	},
	name: 'MeetingOrder'
}
</script>
<style>
	
</style>