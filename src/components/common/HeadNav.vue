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
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link v-center">
        <el-button type="warning" icon="el-icon-bell" circle></el-button>
      </span>
      <el-dropdown-menu :popper-append-to-body="false" slot="dropdown">
        <el-dropdown-item>你有一条系统通知</el-dropdown-item>
        <el-dropdown-item>修罗请求添加你</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
		<el-dropdown placement="bottom"  @command="handleUserCommand">
		  <span class="el-dropdown-link v-center">
		    <img src="@/assets/images/user.jpg" style="height: 40px;width: 40px;border-radius: 20px; margin-right: 6px;" alt="">{{user? user.nickname: "用户"}}<i class="el-icon-arrow-down el-icon--right"></i>
		  </span>
		  <el-dropdown-menu :popper-append-to-body="false" slot="dropdown">
		    <el-dropdown-item command="center">用户中心</el-dropdown-item>
        <el-dropdown-item command="logout">注销</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</el-row>
</template>
<script>
import {mapState,mapMutations,mapGetters} from 'vuex';
import {apiAuth} from '@/api/api.js'
export default {
  data () {
    return {
    };
  },
  name: 'head-nav',
  created: function(){
    var $this = this;
    $this.getSelfInfo(function(res){
      $this.setUser(res.data.data);
    },function(res){
      $this.$message.error('请先登录！');
      $this.$router.push({name: 'login'})
    });
  },
  methods: {
    handleUserCommand(command){
      var $this = this;
      switch(command){
        case 'center':
          break;
        case 'logout':
          $this.logout(function(res){
            $this.setUser(null);
            $this.$message({
              message: '注销成功！',
              type: 'success'
            });
            $this.$router.push({name: 'login'})
          },function(res){
            $this.$message.error('注销失败！');
          })
          break;
      }
    },
    // handleLogout(){
    //   var $this = this;
    //   $this.logout(function(res){
    //     $this.nav.user = null;
    //     $this.$message({
    //       message: '注销成功！',
    //       type: 'success'
    //     });
    //     $this.$router.push({name: 'login'})
    //   },function(res){
    //     $this.$message.error('注销失败！');
    //   })
    // },
    //获取本人信息
    getSelfInfo(cbOk, cbErr) {
      var $this = this;
      $this.$axios.get(apiAuth.userInfo,null,cbOk,cbErr)
    },
    logout(cbOk, cbErr){
      var $this = this;
      $this.$axios.get(apiAuth.logout,null,cbOk, cbErr)
    },
    ...mapMutations([
      'setUser'
    ]),
  },
  computed:{
    ...mapState({
      nav:state=>state.nav
    }),
    ...mapGetters([
      'user'
    ])
  }
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