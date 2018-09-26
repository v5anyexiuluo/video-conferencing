<template>
	<div>成员ID:{{id}}</div>
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
<style>
	
</style>