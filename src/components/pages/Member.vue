<template>
	<div>成员ID:{{id}}，用户详情页暂未开发</div>
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