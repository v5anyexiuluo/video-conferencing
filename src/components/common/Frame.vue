<template>
  <div class="full-height">
    <div class="full-height">
      <el-container v-loading="loading" class="full-height">
        <side-nav :logo="logo"></side-nav>
        <el-container>
          <el-header>
            <head-nav></head-nav>
          </el-header>
          <el-main class="full-height scroll-hidden">
            <el-row class="full-height main-wrap" style="margin: 0px;">
              <div v-show="!isTabCollapse&&subNavs.subs" class="full-height fleft sidenav-submenu-wrap hidden-xs-only">
                <sub-nav></sub-nav>
              </div>
              <div class="fright content-wrap full-height">
                <router-view></router-view>
              </div>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div style="height: 50px;line-height: 50px;background-color: rgb(84, 92, 100);color: white;border-top: 1px solid;">版权所有@西安电子科技大学Mobisys实验室</div>
  </div>
</template>

<script>
// import connect from '@/assets/js/connector.js';
import SideNav from '@/components/common/SideNav.vue';
import HeadNav from '@/components/common/HeadNav.vue';
import SubNav from '@/components/common/SubNav.vue';
// import Frame from '@/components/Frame.vue';
// import VideoConf from '@/components/VideoConf.vue';
// import MeetingNow from '@/components/MeetingNow.vue';

// import pinyin from '/static/js/pinyin/bundle.js'
import {mapState,mapMutations,mapGetters} from 'vuex';

export default {
  data() {
    return {
      logo: require("@/assets/images/logo.png")
      // isTabCollapse: true,
      // activeIndex: 1,
      // subIndex: 1,
    };
  },
  name: 'Frame',
  created: function(){
    // this.listen();
    // this.addRouters();
  },
  mounted: function() {
  },
  components: {
    'side-nav': SideNav,
    'head-nav': HeadNav,
    'sub-nav': SubNav
  },
  methods: {
    ...mapMutations([
      'changePid',
      'changeId',
      'changeTabCollapse',
      'setUser',
      'setMeeting',
    ]),
    // listen(){
    //   var $this = this;
    //   connect.$on('sub-to-parent',function(msg){
    //     if(typeof(msg.isTabCollapse)!='undefined'){
    //       $this.isTabCollapse = msg.isTabCollapse;
    //     }
    //     if(typeof(msg.navId)!='undefined'&&typeof(msg.subId)){
    //       $this.activeIndex = msg.navId;
    //       $this.subIndex = msg.subId;
    //     }
    //     if(typeof(msg.activeIndex)!='undefined'){
    //       $this.activeIndex = msg.activeIndex;
    //       for(var i=0;i<$this.sideNavs.length;i++){
    //         if($this.sideNavs[i].id==msg.activeIndex){
    //           $this.subNavs = $this.sideNavs[i]; 
    //         }
    //       }
    //     }
    //   })
    // },
    // addRouters(){
    //   var $this = this
    //   for (var i = 0; i < $this.sideNavs.length; i++) {
    //     var router = [];
    //     if(typeof($this.sideNavs[i].component)!='undefined'&&!!$this.sideNavs[i].component){
    //       router.name = $this.sideNavs[i].component;
    //       console.log(i);
    //       var path = '@/components/'+$this.sideNavs[i].component;
    //       router.component = resolve => require(['@/components/'+$this.sideNavs[i].component +'.vue'], resolve);
    //       router.path = $this.sideNavs[i].component.toLowerCase();
    //       if(typeof($this.sideNavs[i].subs)!='undefined'&&!!$this.sideNavs[i].subs){
    //         var subRouter = []
    //         for (var j = 0; j < $this.sideNavs[i].subs.length; j++) {
    //           if(typeof($this.sideNavs[i].subs[j].component)!='undefined'&&$this.sideNavs[i].subs[j].component){
    //             console.log(i+"-"+j);
    //             subRouter.push({
    //               name: $this.sideNavs[i].subs[j].component,
    //               component: resolve => require(['@/components/'+$this.sideNavs[i].subs[j].component +'.vue'], resolve),
    //               path:$this.sideNavs[i].subs[j].component.toLowerCase()
    //             })
    //           }
    //         }
    //         router.children = subRouter;
    //       }
    //       if(typeof($this.$router.options.routes[1].children)=='undefined'){
    //         $this.$router.options.routes[1].children=[]
    //       }
    //       $this.$router.options.routes[1].children.push(router);
    //     }
    //   }
    //   $this.$router.addRoutes(this.$router.options.routes);//调用addRoutes添加路由
    // }

  },
  watch:{
    nav: {
      handler:function(val, oldVal){
        var $this=this;
        val.sideNavs.map(function(item){
          if(item.id==$this.nav.activePid&&item.subs){
            item.subs.map(function(subItem){
              if(subItem.id==$this.nav.activeId&&subItem.url){
                $this.$router.push({name:subItem.url})
              }
            })
          }
        })
      },
      deep: true
    }
  },
  computed:{
    ...mapState({
      nav:state=>state.nav
    }),
    ...mapGetters([
      'loading',
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: url('');/*https://picsum.photos/1600/900/?random&blur*/
  padding-bottom: 0%;
  height: 100%;
}
.el-header {
  background-color: #3b7fa7;
  color: #333;
  height: 50px!important;
  line-height: 50px;
}

.main-wrap{
  display: flex;
  flex-wrap: nowrap;
}
.sidenav-submenu-wrap{
  padding: 0px 20px;
  background-color: #ebeef5;
  border-right: 2px solid #303133;
}
.content-wrap{
  width: 100%;
}
.el-main{
  padding: 0px;
}
</style>
