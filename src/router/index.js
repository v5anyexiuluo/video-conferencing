import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/components/common/Frame'
import Login from '@/components/pages/Login'
import Regist from '@/components/pages/Regist'
import MeetingOrder from '@/components/pages/MeetingOrder'
import MeetingHistory from '@/components/pages/MeetingHistory'
import MeetingCurrent from '@/components/pages/MeetingCurrent'
import MeetingNow from '@/components/pages/MeetingNow'
import LinksGroup from '@/components/pages/LinksGroup'
import LinksFriend from '@/components/pages/LinksFriend'
import Member from '@/components/pages/Member'
import NotFound from '@/components/pages/NotFound'
import properties from '@/properties/properties.js';
import store from '@/store/'

Vue.use(Router)

var genComponent = componentName=> resolve => require(['../components/pages/'+componentName], resolve)

function getRoutes() {
  var sideNavs = properties.sideNavs
  var routes = []
  for(var i=0;i<sideNavs.length;i++){
    if(typeof(sideNavs[i].subs)!="undefined"&&sideNavs[i].subs){
      var subNavs=sideNavs[i].subs;
      for(var j=0;j<subNavs.length;j++){
        var sub = {};
        sub["name"]=subNavs[j].name;
        sub['path']='/'+sideNavs[i].name+'/'+subNavs[j].name;
        sub['meta']={activeIndex: subNavs[j].id}
        if(subNavs[j].component){
          sub['component']=genComponent(subNavs[j].component);
          // sub['component']=import('@/components/pages/'+subNavs[j].component);
        }
        routes.push(sub);
      }
    }else{
      var sub = {};
      sub["name"]=sideNavs[i].name;
      sub['path']='/'+sideNavs[i].name;
      sub['meta']={activeIndex: sideNavs[i].id.toString()}
      if(sideNavs[i].component){
        sub['component']=genComponent(sideNavs[i].component);
      }
      routes.push(sub);
    }
  }
  return routes;
  // return [
  //     { name: 'order', path: '/meeting/order', component: MeetingOrder },
  //     { name: 'history', path: '/meeting/history', component: MeetingHistory },
  //     { name: 'current', path: '/meeting/current', component: MeetingCurrent },
  //     { name: 'now', path: '/meeting/now', component: MeetingNow },
  //     { name: 'group', path: '/friends/group', component: LinksGroup },
  //     { name: 'friend', path: '/friends/friend', component: LinksFriend }
  // ];
}


const router = new Router({
  // mode: 'history',
  base: '/videoconferencing/',
  routes: [
    {
      name: 'frame',
      path: '/frame',
      component: Frame,
      children: getRoutes()
    },
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'regist',
      path: '/regist',
      component: Regist
    },
    {
      name: 'frame',
      path: '/frame',
      component: Frame,
      children:[
        {
          name: 'member',
          path: '/member/:id',
          component: Member
        }
      ]
    },
    { path:'*' , component:NotFound}
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(store)
  // console.log(to.meta.activeIndex);
  store.commit('setActiveIndex',to.meta.activeIndex)
  next();
})

export default router
