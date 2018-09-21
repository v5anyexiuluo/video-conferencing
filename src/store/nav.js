import {apiAuth} from '@/api/api.js'
export default {
    state:{
        activePid: '',
        activeId: '',
        isTabCollapse: false,
        loading: false,
        user: null,
        meeting: null,
        sideNavs: [
			{id:1, name: '会话', icon:'el-icon-message', image: '', component: ''},
			{id:2, name: '通讯录', icon:'el-icon-phone', image: '', component: '', subs:[{id: 1, name: '新的好友', icon:'', image:'', component:''},{id: 2, name: '我的好友', icon:'', image:'', url: 'friend', component:''},{id: 3, name: '我的群组', icon:'', image:'', url: 'group', component:''}]},
			{id:3, name: '视频会议', icon:'el-icon-mobile-phone', image: '', component: 'VideoConf', url:'', subs:[{id: 1, name: '加入会议', icon:'', image:'', url: 'join', component:''},{id: 2, name: '预约会议', icon:'', image:'', url: 'order', component:''},{id: 3, name: '历史会议', icon:'', image:'', url: 'history', component:''},{id: 4, name: '未参加会议', icon:'', image:'', url: 'miss', component:''},{id: 5, name: '进入会议', icon:'', image:'', url: 'now', component:'MeetingNow'}]},
			{id:4, name: '通知', icon:'el-icon-bell', image: '', component: '', subs:[{id: 1, name: '会议通知', icon:'', image:'', component:''},{id: 2, name: '好友通知', icon:'', image:'', component:''}]}
		]
    },
    mutations:{
        changeLoading(state, loading){
            state.loading = loading
        },
        changePid(state, pid){//这里的state对应着上面这个state
            state.activePid = pid;
            sessionStorage.setItem('activePid', pid)
        },
        changeId(state, id){
        	state.activeId = id;
        	sessionStorage.setItem('activeId', id)
        },
        changeTabCollapse(state){
        	state.isTabCollapse = !state.isTabCollapse;
        	sessionStorage.setItem('isTabCollapse', state.isTabCollapse)
        },
        setUser(state, user){
        	state.user = user;
        	sessionStorage.setItem('user', user)
        },
        setMeeting(state, meeting){
        	state.meeting = meeting;
        	sessionStorage.setItem('meeting', meeting)
        }
    },
    getters:{
        loading(state){
            return state.loading;
        },
    	subNavs(state){//这里的state对应着上面这个state
            if(!state.activePid){
                state.activePid=sessionStorage.getItem('activePid')
                if(!state.activePid){
                    state.activePid = 1;
                }
            }
			for(var i=0;i<state.sideNavs.length;i++){
				if(state.sideNavs[i].id==state.activePid){
					return state.sideNavs[i]
				}
			}
        },
        activePid(state){
        	if(!state.activePid){
        		state.activePid=sessionStorage.getItem('activePid')
                if(!state.activePid){
                    state.activePid = 1;
                }
        	}
        	return state.activePid;
        },
        activeId(state){
        	if(!state.activeId){
        		state.activeId=sessionStorage.getItem('activeId')
                if(!state.activeId){
                    state.activeId = 1;
                }
        	}
        	return state.activeId;
        },
        isTabCollapse(state){
        	// if(!state.isTabCollapse){
        	// 	state.isTabCollapse=sessionStorage.getItem('isTabCollapse')
         //        if(!state.isTabCollapse){
         //            state.isTabCollapse = false;
         //        }
        	// }
        	return state.isTabCollapse;
        },
        user(state){
        	if(!state.user){
        		state.user=sessionStorage.getItem('user')
        	}
        	return state.user;
        },
        meeting(state){
        	if(!state.meeting){
        		state.meeting=sessionStorage.getItem('meeting')
        	}
        	return state.meeting;
        }
    }
}