import {msgType} from '@/assets/js/common.js';
import utils from '@/assets/js/utils.js';
import Vue from 'vue';
import Stomp from "stompjs";

function handleMsg(msg){
  // msg = JSON.parse(msg) 
  if(typeof msg.category == 'undefined'){
    return '';
  }
  switch(msg.category){
    case msgType.PLAIN_TEXT:
      break;
    case msgType.CONTACT_ADDING:
      msg.content.plain_message = '⽤户'+msg.content.user_name+'请求添加您为好友！'
      break;
    case msgType.CONFERENCE_AREADY_START:
      msg.content.plain_message = '会议'+msg.content.conference_name+'即将开始，开始时间为'+msg.content.start_time
      break;
    case msgType.CONFERENCE_CANCEL:
        msg.content.plain_message = '您的好友'+msg.content.friend_name+'邀请您参加会议'+msg.content.conference_name+',会议开始时间为'+msg.content.cancel_time
      break;
    case msgType.CONFERENCE_ENDING:
        msg.content.plain_message = '会议'+msg.content.conference_name+'已经结束'
      break;
    case msgType.CONFERENCE_CREATION:
      msg.content.plain_message = '您的好友'+msg.content.friend_name+'邀请您参加会议'+msg.content.conference_name+',会议开始时间为'+msg.content.start_time
      break;
    default:
      // return '';
      break;
  }
  return msg;
}

function formatToStamp(value){
    var timeStr = value.replace(/年|月/g, '/').replace(/时|分/g,':').replace(/日|秒/g,'')
    var date = new Date(timeStr).getTime();
    return Math.ceil((date-(new Date()).getTime())/1000);
}

export default {
  state:{
    stompClient: null,
    historyMsgs: [],
    undoMsgs: [],
    countdown: {}
  },
  mutations:{
    clearMsg(state) {
      state.historyMsgs = []
      state.undoMsgs = []
    },
    addMsg(state, data) {
      var msg = data.data;
      var msgs = null;
      if(data.type=="history"){
        msgs = state.historyMsgs;
      }else if(data.type=="undo"){
        msgs = state.undoMsgs;
      }else{
        return;
      }
      var result = msgs.findIndex((value, index, arr) => {
          return value.messageId == msg.messageId;
      })
      if(result==-1){
        if(msg.category==msgType.CONFERENCE_CREATION||msg.category==msgType.CONFERENCE_AREADY_START){
          if(Object.prototype.toString.call(msg.content.start_time) !== "[object String]"){
            return;
          }
          state.countdown[msg.messageId]=formatToStamp(msg.content.start_time);
        }
        if(handleMsg(msg)){
          msgs.push(handleMsg(msg))
          // localStorage.setItem('msgs',JSON.stringify(state.msgs))
        }
      } else {
        // state.msgs[result]=handleMsg(msg, state)
        Vue.set(msgs,result,handleMsg(msg));
      }
    },
    setCountdownTime(state, id){
      if(state.countdown[id]>0){
        Vue.set(state.countdown,id,state.countdown[id]-1);
      }
    },
    over(state, socket) {
      state.stompClient = Stomp.over(socket);
    }
  },
  getters:{
    stompClient(state) {
      return state.stompClient
    },
    historyMsgs(state){
      // if(localStorage.getItem('msgs')){
      //     state.msgs = JSON.parse(localStorage.getItem('msgs'))
      // }
      return state.historyMsgs;
    },
    undoMsgs(state){
      // if(localStorage.getItem('msgs')){
      //     state.msgs = JSON.parse(localStorage.getItem('msgs'))
      // }
      return state.undoMsgs;
    },
    countdown(state){
      return state.countdown;
    }
  }
}