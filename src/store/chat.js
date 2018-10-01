import {apiAuth} from '@/properties/api.js'

export default {
    state:{
        chatList: [],
        historyMsg: []
    },
    mutations:{
        addChatItem(state, item) {
            var result = state.chatList.findIndex((value, index, arr) => {
                if(item.type=="group"){
                    return value.data.group_id == item.data.group_id;
                }
                if(item.type=="friend"){
                    return value.data.id == item.data.id;
                }
            })
            if(result==-1){
                state.chatList.push(item)
                localStorage.setItem('chatList',JSON.stringify(state.chatList))
            }
        },
        removeChatItem(state, item) {
            var result = state.chatList.findIndex((value, index, arr) => {
                if(item.type=="group"){
                    return value.data.group_id == item.data.group_id;
                }
                if(item.type=="friend"){
                    return value.data.id == item.data.id;
                }
            })
            if(result!=-1){
                state.chatList.splice(result,1)
                localStorage.setItem('chatList',JSON.stringify(state.chatList))
            }
        },
        addChatMsg(state, chat){
            if(chat){
                var result = state.historyMsg.findIndex((value, index, arr) => {
                    return value.chatroom == chat.chatroom;
                })
                if(result!=-1){
                    state.historyMsg[result]['msg']=chat.msg;
                }else{
                    state.historyMsg.push({chatroom: chat.chatroom, msg: chat.msg})
                }
                localStorage.setItem('historyMsg',JSON.stringify(state.historyMsg))
            }
            
        },
    },
    getters:{
        chatList(state){
            if(localStorage.getItem('chatList')){
                state.chatList = JSON.parse(localStorage.getItem('chatList'))
            }
            return state.chatList;
        },
        historyMsg: (state)=>(chatroom)=>{
            if(localStorage.getItem('historyMsg')){
                state.historyMsg = JSON.parse(localStorage.getItem('historyMsg'))
            }
            var result = state.historyMsg.find((value, index, arr) => {
                return value.chatroom == chatroom;
            })
            if(typeof result=='undefined'){
                return [];
            }
            return result.msg;
        }
    }
}