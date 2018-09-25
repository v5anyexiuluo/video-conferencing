<template>
  <div class="full-height v-full-container">
    <div class="full-element full-element">
      <el-container v-loading="loading" class="full-height">
        <side-nav :logo="logo"></side-nav>
        <el-container>
          <el-header>
            <head-nav></head-nav>
          </el-header>
          <el-main class="full-height scroll-hidden">
            <el-row class="full-height main-wrap" style="margin: 0px;">
              <div class="fright content-wrap full-height">
                <router-view></router-view>
              </div>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div style="height: 50px;line-height: 50px;background-color: rgb(84, 92, 100);color: white;border-top: 1px solid;">版权所有@西安电子科技大学Mobisys实验室</div>
    <circle-menu v-drag slot="reference" class="drag" type="top" :number='2' :btn='true' animate="animated jello" mask='white' circle>
      <el-tooltip slot="item_1" class="item" effect="dark" content="新建会议" placement="left">
        <router-link style="width: 48px;height: 48px;display: inline-block;" :to="{name: 'now'}"><span class="el-icon-plus"></span></router-link>
      </el-tooltip>
      <el-tooltip slot="item_2" class="item" effect="dark" content="添加好友" placement="left">
        <router-link style="width: 48px;height: 48px;display: inline-block;" :to="{name: 'now'}"><span class="el-icon-plus"></span></router-link>
      </el-tooltip>
    </circle-menu>
  </div>
</template>

<script>
// import connect from '@/assets/js/connector.js';
import SideNav from '@/components/common/SideNav.vue';
import HeadNav from '@/components/common/HeadNav.vue';
// import SubNav from '@/components/common/SubNav.vue';
import CircleMenu from 'vue-circle-menu';
// import Frame from '@/components/Frame.vue';
// import VideoConf from '@/components/VideoConf.vue';
// import MeetingNow from '@/components/MeetingNow.vue';

// import pinyin from '/static/js/pinyin/bundle.js'
import {mapState,mapMutations,mapGetters} from 'vuex';

export default {
  data() {
    return {
      logo: require("@/assets/images/logo.png"),
      isShow: true
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
    var $this = this;
    if($this.firstInit){
      $this.$confirm('有会议待参加，是否参加?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true,
      type: 'warning'
      }).then(() => {
        $this.setFirstInit(false)
        $this.$router.push({name:'current'});
      }).catch(() => {
                
      });
    }
  },
  components: {
    'side-nav': SideNav,
    'head-nav': HeadNav,
    'circle-menu': CircleMenu
  },
  methods: {
    ...mapMutations([
      'setFirstInit'
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
    // nav: {
    //   handler:function(val, oldVal){
    //     var $this=this;
    //     val.sideNavs.map(function(item){
    //       if(item.id==$this.nav.activePid&&item.subs){
    //         item.subs.map(function(subItem){
    //           if(subItem.id==$this.nav.activeId&&subItem.url){
    //             $this.$router.push({name:subItem.url})
    //           }
    //         })
    //       }
    //     })
    //   },
    //   deep: true
    // }
  },
  computed:{
    ...mapState({
      nav:state=>state.nav
    }),
    ...mapGetters([
      'loading',
      'firstInit'
    ])
  },
  directives:{
    drag(el,bindings){
      let oDiv = el
      //  左边距最大值
      let maxLeft = el.parentNode.clientWidth - el.clientWidth
      //  上边距最大值
      let maxTop = el.parentNode.clientHeight - el.clientHeight
      oDiv.style.left = (maxLeft-40)+'px';
      oDiv.style.top = (maxTop-40)+'px';
      oDiv.onmousedown = function (e) {
        //  鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft
        let disY = e.clientY - oDiv.offsetTop
        document.onmousemove = function (e) {
          //  获取到鼠标拖拽后的横向位移(距离父级元素)
          let l = e.clientX - disX
          //  获取到鼠标拖拽后的纵向位移(距离父级元素)
          let t = e.clientY - disY 
       
          oDiv.style.left = l + 'px' 
       
          oDiv.style.top = t + 'px'

          if (e.clientX - disX <= 0) { oDiv.style.left = 0 + 'px' } 

          if (e.clientY - disY <= 0) { oDiv.style.top = 0 + 'px' } 

          if (e.clientX - disX >= maxLeft) { oDiv.style.left = maxLeft + 'px' } 

          if (e.clientY - disY >= maxTop) { oDiv.style.top = maxTop + 'px' } 

          //     将此时的位置传出去  
          // bindings.value({x: oDiv.style.left, y: oDiv.style.top})
        } 
        //     松开事件后，移除事件
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        } 
      }
    } 
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

#backBox{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #000;
    top: 0;
    z-index: 1000;
    opacity: 0.6;
}
.imgs{
    opacity: 1;
    position: absolute;
    top:0;
    // right:1167px
}
.btn{
    bottom: 20px;
    right: 500px;
    position: absolute;
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
.drag{
  position: absolute;
}
</style>
