<template>
	<div class="full-height content">
	  <div class="content-main" style="position: relative;">
		<video src="movie.ogg" style="height: 100%;width: 100%;background: white;">
			您的浏览器不支持 video 标签。
		</video>
		<video src="movie.ogg" style="position: absolute;right: 20px;top: 20px;width: 200px;height: 120px;background: gray;">
			您的浏览器不支持 video 标签。
		</video>
		<video src="movie.ogg" style="position: absolute;right: 20px;top: 200px;width: 200px;height: 120px;background: gray;">
			您的浏览器不支持 video 标签。
		</video>
		<el-row class="btn-group" type="flex" align="middle" justify="space-between" style="position: absolute;left: 0px;bottom: 0px;width: 100%;height: 50px;line-height: 50px;">
			<el-col :span="3"><a href="#">邀请+</a></el-col>
			<el-col :span="3"><a href="#">选择主持人</a></el-col>
			<el-col :span="3"><a href="#">共享桌面</a></el-col>
			<el-col :span="3"><a href="#">聊天</a></el-col>
			<el-col :span="3"><a href="#">设置</a></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"></el-col>
			<el-col :span="3"><a href="#">会议结束</a></el-col>
		</el-row>
	  </div>
	  <div class="content-right">
	  	
	  </div>
	</div>
</template>
<script>
export default {
	data() {
		return {
		}
	},
	name: 'MeetingNow'
}
</script>
<style scoped>
	.el-main{
		width: 100%;
		height: 100%;
	}
	.el-row{
		margin: 0px;
	}
	.content{
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
	}
	.btn-group a{
		color: gray;
		text-decoration: none;
	}
	.content-main{
		width: 80%;
		border-right: 2px solid gray;
	}
	.content-right{
		width: 20%;
	}
</style>