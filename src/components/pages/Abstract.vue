<template>
	<div>摘要id：{{id}}，摘要模块暂未开发</div>
</template>
<script>
export default {
	data() {
		return{
			id: ''
		}
	},
	name: 'Member',
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