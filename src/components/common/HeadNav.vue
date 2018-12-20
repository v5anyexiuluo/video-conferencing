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
  <!-- <img src="@/assets/images/logo.png" style="height: 30px;width: 120px;" alt=""> -->
	<el-row type="flex" justify="end" class="header-wrap" style="margin: 0px;">
    <!-- <div class="iconfont el-icon-lg-collapse-on" style="margin: 0 20px;"></div>
    <div> -->
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link v-center">
        <el-badge :value="undoMsgs.length">
          <el-button type="warning" icon="el-icon-bell" circle></el-button>
        </el-badge>
      </span>
      <el-dropdown-menu :popper-append-to-body="false" slot="dropdown">
        <el-dropdown-item v-for="msg in undoMsgs"><router-link tag="span" :to="{name: 'notifies'}">{{msg.content.plain_message}}</router-link></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown placement="bottom" style="cursor: pointer;" @command="handleUserCommand">
      <span class="el-dropdown-link v-center">
        <img src="@/assets/images/user.jpg" style="height: 40px;width: 40px;border-radius: 20px; margin-right: 6px;" alt="">{{user? user.nickname: "用户"}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu :popper-append-to-body="false" slot="dropdown">
        <el-dropdown-item command="center"><router-link tag="span" :to="{name: 'usercenter'}">用户中心</router-link></el-dropdown-item>
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- </div> -->
	</el-row>
</template>
<script>
import {mapState,mapMutations,mapGetters} from 'vuex';
import {apiAuth} from '@/properties/api.js'
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
  mounted: function(){
    var $this = this;
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
      'user',
      'undoMsgs'
    ])
  },
  watch: {
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
.el-badge >>> .el-badge__content.is-fixed{
  top: 12px;
}
/*.el-menu-item.is-active {
  background-color: rgb(173, 173, 173) !important;
}*/
</style>