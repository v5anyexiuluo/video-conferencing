import {msgType} from '@/assets/js/common.js';
import utils from '@/assets/js/utils.js';
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
    case msgType.CONFERENCE_READY_START:
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
      return '';
  }
  return msg;
}

function formatToStamp(value){
    var arr = value.replace(' ', '').replace(/年|月|日|时|分|秒/g, '-').split('-')
    var date = new Date(Date.UTC(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])).getTime();
    return Math.ceil(((new Date()).getTime()-date)/1000);
}

export default {
    state:{
    	msgs: [],
        // filtedCountdownMsg:[]
    },
    mutations:{
    	addMsg(state, msg) {
            var result = state.msgs.findIndex((value, index, arr) => {
                return value.messageId == msg.messageId;
            })
            if(result==-1){
                // if(msg.category==msgType.CONFERENCE_CREATION){
                //     var timerObj = {id:msg.messageId, timer: null, time: formatToStamp(msg.content.start_time)}
                //     var timer = setTimeout(function(){
                //         if(timerObj.time<=0){
                //             clearTimeout(timerObj.time);
                //         }else{
                //             timerObj.time--;
                //         }
                //     },1000)
                //     state.filtedCountdownMsg.push(timerObj);
                //     localStorage.setItem('filtedCountdownMsg',JSON.stringify(state.filtedCountdownMsg))
                // }
                if(handleMsg(msg, state)){
                    state.msgs.push(handleMsg(msg, state))
                    localStorage.setItem('msgs',JSON.stringify(state.msgs))
                }
            }
        },
    },
    getters:{
    	msgs(state){
            if(localStorage.getItem('msgs')){
                state.msgs = JSON.parse(localStorage.getItem('msgs'))
            }
            return state.msgs;
        },
        // filtedCountdownMsg(state){
        //     if(localStorage.getItem('filtedCountdownMsg')){
        //         state.filtedCountdownMsg = JSON.parse(localStorage.getItem('filtedCountdownMsg'))
        //     }
        //     return state.filtedCountdownMsg;
        // }
    }
}