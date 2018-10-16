export default {
    state:{
        curMeeting: ''
    },
    mutations:{
        setCurMeeting(state, meeting){
            state.curMeeting = meeting;
            localStorage.setItem('curMeeting', JSON.stringify(state.curMeeting))
        }
    },
    getters:{
        curMeeting(state){
            if(localStorage.getItem('curMeeting')){
                state.curMeeting = JSON.parse(localStorage.getItem('curMeeting'))
            }
            return state.curMeeting;
        }
    }
}