import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/components/Frame'
import MeetingJoin from '@/components/pages/MeetingJoin'
import MeetingOrder from '@/components/pages/MeetingOrder'
import MeetingHistory from '@/components/pages/MeetingHistory'
import MeetingMiss from '@/components/pages/MeetingMiss'
import MeetingNow from '@/components/pages/MeetingNow'
import LinksGroup from '@/components/pages/LinksGroup'
import LinksFriend from '@/components/pages/LinksFriend'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		redirect: { name: 'frame' },
    },
    {
	    name: 'frame',
	    path: '/frame',
	    component: Frame,
	    children: [
			{ name: 'join', path: 'meeting/join', component: MeetingJoin },
			{ name: 'order', path: 'meeting/order', component: MeetingOrder },
			{ name: 'history', path: 'meeting/history', component: MeetingHistory },
			{ name: 'miss', path: 'meeting/miss', component: MeetingMiss },
			{ name: 'now', path: 'meeting/now', component: MeetingNow },
			{ name: 'group', path: 'friends/group', component: LinksGroup },
			{ name: 'friend', path: 'friends/friend', component: LinksFriend }
	    ]
	}
  ]
})
