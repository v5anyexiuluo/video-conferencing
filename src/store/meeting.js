export default {
    state:{
        curMeeting: ''
    },
    mutations:{
        setCurMeeting(state, meeting){
            state.curMeeting = meeting;
        }
    },
    getters:{
        curMeeting(state){
            return state.curMeeting;
        }
    }
}