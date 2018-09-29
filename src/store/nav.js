import {apiAuth} from '@/properties/api.js'

export default {
    state:{
        loading: false,
        user: null,
        meeting: null,
        activeIndex: "1",
        firstInit: true
    },
    mutations:{
        setActiveIndex(state, index){
            state.activeIndex = index;
            //sessionStorage.setItem('activeIndex', index)
        },
        changeLoading(state, loading){
            state.loading = loading
        },
        setUser(state, user){
        	state.user = user;
        	sessionStorage.setItem('user', user)
        },
        setMeeting(state, meeting){
        	state.meeting = meeting;
        	sessionStorage.setItem('meeting', meeting)
        },
        setFirstInit(state, firstInit){
            state.firstInit = firstInit;
        }
    },
    getters:{
        loading(state){
            return state.loading;
        },
        activeIndex(state){
            if(sessionStorage.getItem('meeting')){
                state.activeIndex = sessionStorage.getItem('meeting')
            }
            return state.activeIndex;
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
        },
        firstInit(state){
            return state.firstInit;
        }
    }
}