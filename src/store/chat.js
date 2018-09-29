import {apiAuth} from '@/properties/api.js'

export default {
    state:{
        chatList: [],
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
                var result = state.chatList.findIndex((value, index, arr) => {
                    return value.data == chat.data;
                })
                if(result!=-1){
                    state.chatList[result]['messages']=chat.messages;
                    localStorage.setItem('chatList',JSON.stringify(state.chatList))
                }
            }
            
        }
    },
    getters:{
        chatList(state){
            if(localStorage.getItem('chatList')){
                state.chatList = JSON.parse(localStorage.getItem('chatList'))
            }
            return state.chatList;
        }
    }
}