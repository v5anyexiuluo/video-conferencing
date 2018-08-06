import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/components/Frame'
import MeetingJoin from '@/components/MeetingJoin'
import MeetingOrder from '@/components/MeetingOrder'
import MeetingHistory from '@/components/MeetingHistory'
import MeetingMiss from '@/components/MeetingMiss'
import MeetingNow from '@/components/MeetingNow'
import FriendsGroup from '@/components/FriendsGroup'

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
			{ name: 'group', path: 'friends/group', component: FriendsGroup }
	    ]
	}
  ]
})
