<template>
<div class="chat-message" v-scroll-bottom="messages">
    <ul style="height:100%;overflow-y: scroll;">
        <li v-for="item in messages">
            <p class="time">
                <span>{{ item.timestamp | time }}</span>
            </p>
            <div class="main h-full-container" :class="{ self: item.from==user.id }">
                <img class="avatar" width="30" height="30" src="https://picsum.photos/40/40" />
                <div class="text">{{ item.content }}</div>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
import utils from '@/assets/js/utils.js';
export default {
    data(){
        return{
            // 会话列表
            // messages: [
            //     {
            //         content: '项目地址: https://github.com/coffcer/vue-chat',
            //         timestamp: new Date(),
            //         from: 1
            //     }
            // ]
        }
    },
    props:['messages'],
    computed:{
      ...mapGetters([
        'user'
      ]),
    },
    filters: {
        // 将日期过滤为 hour:minutes
        time (date) {
            return utils.formatDate(new Date(date), 'yyyy-MM-dd hh:mm');
        }
    },
    directives: {
        // 发送消息后滚动到底部
        'scroll-bottom' (el) {
            el.scrollTop = el.scrollHeight - el.clientHeight;
        }
    }
};
</script>

<style scoped>
.chat-message {
    padding: 10px 15px;
    /*padding: 10px 10px;*/
    overflow-y: scroll;
}
.chat-message li {
    margin-bottom: 15px;
}
.time {
    margin: 7px 0;
    text-align: center;
}
.time > span {
    display: inline-block;
    padding: 0 18px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #dcdcdc;
}
.avatar {
    margin: 0 10px 0 0;
    border-radius: 3px;
}
.text {
    position: relative;
    padding: 0 10px;
    /*max-width: ~'calc(100% - 40px)';*/
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;
}

.text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #fafafa;
}

.self {
    flex-direction: row-reverse;
    padding-right: 15px;
}
.self .avatar {
    margin: 0 0 0 10px;
}
.self .text {
    background-color: #b2e281;
}
.self .text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #b2e281;
}
</style>