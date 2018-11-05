import Vue from 'vue';
export default {
    state:{
        curMeeting: ''
    },
    mutations:{
        setCurMeeting(state, meeting){
            state.curMeeting = meeting;
            localStorage.setItem('curMeeting', JSON.stringify(state.curMeeting))
        },
        setCurMeetingStatus(state, meeting){
            if(state.curMeeting.id == meeting.id && state.curMeeting.available!=meeting.available){
                // state.curMeeting = meeting;
                Vue.set(state.curMeeting,'available',meeting.available);
                localStorage.setItem('curMeeting', JSON.stringify(state.curMeeting))
            }
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