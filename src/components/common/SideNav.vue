<template>
  <el-aside class="hidden-xs-only">
    <el-row :gutter="10" class="logo-row v-center">
      <el-col :span="18" v-if="!isCollapse"><img :src="logo" style="height: 30px;width: 120px;" alt=""></el-col>
      <el-col :span="isCollapse? 24:6"><div class="grid-content" @click="collapseSideBar"><i class="iconfont el-icon-lg-collapse-on"></i></div></el-col>
    </el-row>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo full-height"
      unique-opened
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for="(item, index) in sideNavs">
        <el-submenu v-if="item.subs" :index="item.id.toString()" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>
              <el-badge v-if="item.badge" :value="undoMsgs.length" class="item">
                {{item.title}}
              </el-badge>
              <template v-else>
                {{item.title}}
              </template>
            </span>
          </template>
          <router-link v-for="(subItem, subIndex) in item.subs" :key="subIndex" :to="{name: subItem.name}" class="a-navmenu">
            <el-menu-item :index="subItem.id.toString()" style="padding-left: 54px;">
              <span>{{subItem.title}}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
        <el-menu-item v-else :index="item.id.toString()" :key="index">
          <router-link :to="{name: item.name}" class="a-navmenu">
            <i :class="item.icon"></i>
            <span>
              <el-badge v-if="item.badge" :value="undoMsgs.length" class="item">
                {{item.title}}
              </el-badge>
              <template v-else>
                {{item.title}}
              </template>
            </span>
          </router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
// import connect from '@/assets/js/connector.js';
import {mapState, mapMutations, mapGetters} from 'vuex'
import properties from '@/properties/properties.js'
export default {
  data () {
    return {
      isCollapse: false,
      sideNavs: properties.sideNavs
      // isTabCollapse: true,
    }
  },
  name: 'side-nav',
  props: ['logo'],
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      // this.nav.activePid = key;
      // this.nav.activeId = 1;
      // connect.$emit('sub-to-parent',{activeIndex: key});
    },
    collapseSideBar () {
      this.isCollapse = !this.isCollapse
    },
    ...mapMutations([
      'setUser',
      'setMeeting'
    ])
  },
  filters: {
    // toString: function(value){
    //   return value.toString();
    // }
  },
  created: function () {

  },
  watch: {
  },
  computed: {
    ...mapState({
      nav: state => state.nav
    }),
    ...mapGetters([
      'activeIndex',
      'user',
      'meeting',
      'undoMsgs'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /*min-width: 54px;*/
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
  /*min-width: 54px;*/
  width: 200px;
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

.el-menu {
  border-right-width: 0px;
  text-align: left;
  /*text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;*/
}
.a-navmenu{
  color: white;
  text-decoration: none;
}
.a-navmenu:hover{
  color: rgba(255, 208, 72, 1);
}
.is-active .a-navmenu{
  color: rgb(255, 208, 75);
}

.el-badge>>>.el-badge__content{
  top: 28px!important;
  right: -20px!important;
}
</style>
