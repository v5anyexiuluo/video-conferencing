import {apiAuth} from '@/api/index.js'
export default {
    state:{
        activePid: 2,
        activeId: 2,
        isTabCollapse: false,
        user: null,
        sideNavs: [
			{id:1, name: '会话', icon:'el-icon-location', image: '', component: ''},
			{id:2, name: '通讯录', icon:'el-icon-location', image: '', component: '', subs:[{id: 1, name: '新的好友', icon:'', image:'', component:''},{id: 2, name: '我的好友', icon:'', image:'', url: 'friend', component:''},{id: 3, name: '我的群组', icon:'', image:'', url: 'group', component:''}]},
			{id:3, name: '视频会议', icon:'el-icon-location', image: '', component: 'VideoConf', url:'', subs:[{id: 1, name: '加入会议', icon:'', image:'', url: 'join', component:''},{id: 2, name: '预约会议', icon:'', image:'', url: 'order', component:''},{id: 3, name: '历史会议', icon:'', image:'', url: 'history', component:''},{id: 4, name: '未参加会议', icon:'', image:'', url: 'miss', component:''},{id: 5, name: '进入会议', icon:'', image:'', url: 'now', component:'MeetingNow'}]},
			{id:4, name: '通知', icon:'el-icon-location', image: '', component: '', subs:[{id: 1, name: '会议通知', icon:'', image:'', component:''},{id: 2, name: '好友通知', icon:'', image:'', component:''}]}
		]
		// headNavs: [
		// 	{id:1, name: '用户', icon: '', image: '/static/images/user.jpg', subs:[{id: 1, name: '用户中心', icon:'', image:'', url:apiAuth.logout, component:''},{id: 2, name: '注销', icon:'', image:'', url:'', component:''}]},
		// 	{id:2, name: '', icon: 'el-icon-bell', image: '', subs:[{id: 1, name: '你有一条系统消息', icon:'', image:'', component:''},{id: 2, name: '修罗请求添加你', icon:'', image:'', component:''}]}
		// ]
    },
    getters:{
    	subNavs(state){//这里的state对应着上面这个state
			for(var i=0;i<state.sideNavs.length;i++){
				if(state.sideNavs[i].id==state.activePid){
					return state.sideNavs[i]
				}
			}
        }
    }
}