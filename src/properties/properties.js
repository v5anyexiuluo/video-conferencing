export default {
	sideNavs: [
        {id:'1', name: 'meeting', title: '视频会议', icon:'el-icon-view', image: '', badge: false, component: '', subs:[{id: '1-1', name: 'now', title: '马上开会', icon:'', image:'', component:'MeetingNow'},{id: '1-2', name: 'order', title: '预约会议', icon:'', image:'', component:'MeetingOrder'},{id: '1-3', name: 'list', title: '会议列表', icon:'', image:'', component:'MeetingList'},{id: '1-4', name: 'current', title: '开会大厅', icon:'', image:'', component:'MeetingCurrent'}]},
		{id:'2', name: 'links', title: '通讯录', icon:'el-icon-tickets', image: '', badge: false, component: '', subs:[{id: '2-1', name: 'friend', title: '我的好友', icon:'', image:'', component:'LinksFriend'},{id: '2-2', name: 'group', title: '我的群组', icon:'', image:'', component:'LinksGroup'}]},
        {id:'3', name: 'chatlist', title: '聊天记录', icon:'el-icon-service', image: '', badge: false, component: 'ChatList'},
		{id:'4', name: 'notifies', title: '通知', icon:'el-icon-bell', image: '', badge: true, component: 'Notify'},
        {id:'5', name: 'settings', title: '设置', icon:'el-icon-setting', image: '', badge: false, component: 'Settings'}
	],
}