export default {
    state:{
        loading: false,
        user: null,
        activeIndex: "1",
        firstInit: true
    },
    mutations:{
        setActiveIndex(state, index){
            state.activeIndex = index;
            localStorage.setItem('activeIndex', index)
        },
        changeLoading(state, loading){
            state.loading = loading
        },
        setUser(state, user){
        	state.user = user;
        	localStorage.setItem('user', JSON.stringify(user));
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
            if(localStorage.getItem('meeting')){
                state.activeIndex = localStorage.getItem('meeting')
            }
            return state.activeIndex;
        },
        user(state){
        	if(!state.user){
        		state.user=JSON.parse(localStorage.getItem('user'))
        	}
        	return state.user;
        },
        firstInit(state){
            return state.firstInit;
        }
    }
}