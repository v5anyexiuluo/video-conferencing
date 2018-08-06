<template>
	<!-- <el-menu class="fright" :default-active="activeIndex" background-color="#3b7fa7" text-color="white" active-text-color="#ffd04b" mode="horizontal" @select="handleSelect">
        <el-menu-item class="v-center" index="1">处理中心</el-menu-item>
        <el-submenu :popper-append-to-body="false" index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item class="v-center" index="3" disabled>消息中心</el-menu-item>
        <el-menu-item class="v-center" index="4">订单管理</el-menu-item>
      </el-menu> -->
	<el-row type="flex" justify="end" class="header-wrap">
		<el-dropdown v-for="(nav, index) in navs" placement="bottom">
		  <span class="el-dropdown-link v-center">
		    <img v-if="nav.image" :src="nav.image" style="height: 40px;width: 40px;border-radius: 20px; margin-right: 6px;" alt="">{{nav.name}}<i v-if="nav.image" class="el-icon-arrow-down el-icon--right"></i>
		    <el-button v-if="nav.icon" type="warning" :icon="nav.icon" circle></el-button>
		  </span>
		  <el-dropdown-menu :popper-append-to-body="false" slot="dropdown">
		    <el-dropdown-item v-for="(subNav, index) in nav.subs">{{subNav.name}}</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
		<!-- <el-dropdown placement="bottom">
		  <span class="el-dropdown-link">
		    <el-button type="warning" icon="el-icon-bell" circle></el-button>
		  </span>
		  <el-dropdown-menu :popper-append-to-body="false" slot="dropdown">
		    <el-dropdown-item>黄金糕</el-dropdown-item>
		    <el-dropdown-item>狮子头</el-dropdown-item>
		    <el-dropdown-item>螺蛳粉</el-dropdown-item>
		    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
		    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown> -->
	</el-row>
</template>
<script>
export default {
  data () {
    return {
      
    };
  },
  name: 'head-nav',
  props:['navs']
}
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.header-wrap{
  align-items: center;
  height: 100%;
  margin-bottom: 0px;
}
.header-wrap>*{
  margin: 0 20px;
  color: white;
}

/*.el-menu--horizontal{
  border-bottom: 0px;
  height: 100%;
}
.el-menu--horizontal>.el-submenu, .el-menu--horizontal>.el-menu-item{
  height: 100%;
  padding-right: 20px!important;
}
.el-menu--horizontal>.el-submenu>*{
  height: 100%!important;
  height: 50px !important;
  line-height: 50px !important;
}*/

.el-menu-item {
  text-align: left!important;
  padding-right: 0!important;
}
/*.el-menu-item.is-active {
  background-color: rgb(173, 173, 173) !important;
}*/
</style>