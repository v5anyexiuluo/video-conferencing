<template>
  <el-aside class="hidden-xs-only">
    <el-row :gutter="10" class="logo-row v-center">
      <el-col :span="18" v-if="!isCollapse"><img :src="logo" style="height: 30px;width: 120px;" alt=""></el-col>
      <el-col :span="isCollapse? 24:6"><div class="grid-content" @click="collapseSideBar"><i class="iconfont el-icon-lg-collapse-on"></i></div></el-col>
    </el-row>
    <el-menu
      :default-active="activePid.toString()"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item v-for="(item, index) in nav.sideNavs" :index="item.id.toString()" :key=index>
        <el-popover
          v-show="item.subs"
          placement="right"
          popper-class="sidenav-submenu"
          trigger="hover"
          :disabled="!isTabCollapse"
          v-if="!isCollapse">
            <div class="toolbar"><i @click="collapseTab" class="el-icon-lg-fixed-off fright"></i></div>
            <ul v-for="(subNav, index) in item.subs">
              <li @click="getNavId(item.id, subNav.id)">{{subNav.name}}</li>
            </ul>
            <span slot="reference" style="display: inline-block;width: 96%;height: 100%;position: absolute;left: 0px;"></span>
        </el-popover>
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
        <span v-show="item.subs" class="fright" @click="collapseTab"><i :class="[isTabCollapse? 'triangle-left':'triangle-right','triangle']"></i></span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
// import connect from '@/assets/js/connector.js';
import {mapState,mapMutations,mapGetters} from 'vuex';
export default {
  data () {
    return {
      isCollapse: false,
      // isTabCollapse: true,
      // activeIndex: '1',
    };
  },
  name: 'side-nav',
  props:['logo'],
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // this.nav.activePid = key;
      // this.nav.activeId = 1;
      this.changePid(key);
      this.changeId(1);
      this.isPopoverShow = false;
      // connect.$emit('sub-to-parent',{activeIndex: key});
    },
    collapseSideBar(){
      this.isCollapse = !this.isCollapse;
    },
    collapseTab(){
      // this.nav.isTabCollapse = !this.nav.isTabCollapse;
      this.changeTabCollapse()
      // connect.$emit('sub-to-parent',{isTabCollapse: this.isTabCollapse});
    },
    getNavId(pid, id){
      // this.nav.activePid = pid;
      // this.nav.activeId = id;
      this.changePid(pid);
      this.changeId(id);
      this.isPopoverShow = false;
    },
    ...mapMutations([
      'changePid',
      'changeId',
      'changeTabCollapse',
      'setUser',
      'setMeeting',
    ]),
  },
  filters:{
    // toString: function(value){
    //   return value.toString();
    // }
  },
  created:function(){
    
  },
  watch:{
  },
  computed:{
    ...mapState({
      nav:state=>state.nav
    }),
    ...mapGetters([
      'subNavs',
      'activePid',
      'activeId',
      'isTabCollapse',
      'user',
      'meeting'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-aside {
  color: #333;
  overflow: hidden;
  max-width: 200px;
  width: auto!important;
}
.logo-row .grid-content {
  height: 50px;
  line-height: 50px;
}
.logo-row {
  background-color: #3c8dbc;
  margin-bottom: 0px;
}
.el-icon-lg-collapse-on{
  font-size: 14px;
  cursor: pointer;
}
.el-aside .el-menu{
  padding: 20px 0!important;
}
.is-active .triangle{
    display: inline-block;
    height: 0;
    width: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
}
.is-active .triangle-right{
    border-right: 15px solid #ebeef5;
}
.is-active .triangle-left{
    border-right: 15px solid rgb(255, 208, 75);
}
.is-active .triangle:after{
    content: '';
}

.el-menu-item {
  text-align: left!important;
  padding-right: 0!important;
}
/*.el-menu-item.is-active {
  background-color: rgb(173, 173, 173) !important;
}*/
.sidenav-submenu{
  padding: 0px;

}
.sidenav-submenu .toolbar{
  height: 30px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}
.sidenav-submenu .toolbar i{
  padding-right: 10px;
  color: #ebeef5;
  font-size: 30px;
  font-weight: 500;
}
.sidenav-submenu ul{
  list-style: none;
}
.sidenav-submenu li{
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.sidenav-submenu li:hover{
  color: rgb(255, 208, 75);
}

</style>
