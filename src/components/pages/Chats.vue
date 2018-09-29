<template>
  <div class="item-container full-width full-height">
    <div class="item-list fleft full-height v-full-container">
      <div class="list-search">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <ul class="full-element">
        <li @click="initChat(chat)" class="item h-full-container" :class="{selected: curChat==chat}" v-for="chat in chatList">
          <img :src="chat.data.headimg? chat.data.headimg:'https://picsum.photos/20/20'" alt="头像">
          <div
            style="margin-left: 10px;line-height: initial;"
            class="full-element"
          >
            <h4>{{chat.type=="friend"? chat.data.nickname:chat.data.group_name}}</h4>
            <router-link to="/regist" tag="p" style="font-size: 14px;" class="item h-full-container">会议纪要{{chat.data.realname}}</router-link>
          </div>
          <div><el-button type="text" icon="el-icon-circle-close-outline" style="font-size: 18px;" @click.stop="removeChatItem(chat);"></el-button></div>
        </li>
      </ul>
    </div>
    <div class="item-detail full-height">
      <el-tabs v-model="activeTab" type="border-card" style="height: 100%;">
        <el-tab-pane label="聊天" name="first" class="full-height" style="position: relative;">
          <chat-message :messages="messages"></chat-message>
          <chat-text></chat-text>
        </el-tab-pane>
        <el-tab-pane label="文件" name="second">
          <div class="card-wrap">
            <el-card v-for="(o, index) in 4" :key="o" class="box-card margin-b-20 one-second" :class="{'margin-l-2P': index%2!=0}">
              <div class="h-full-container">
                <span class="el-icon-document"></span>
                <div>
                  <div>{{'列表内容 ' + o }}</div>
                  <div>2018-08-12</div>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="音视频" name="third">

          <div>音视频</div>
        
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import ChatMessage from "@/components/common/ChatMessage.vue"
  import ChatText from "@/components/common/ChatText.vue"
  import {mapGetters, mapMutations} from 'vuex';
  import md5 from 'js-md5';
  import chat from '@/assets/js/meeting.core.js';
  import connect from '@/assets/js/connector.js'
  export default {
    name: 'LinksFriend',
    data(){
      return {
        activeTab: 'first',
        curChat: null,
        chatCore: null,
        messages:[]
      }
    },
    components: {
      'chat-message': ChatMessage,
      'chat-text': ChatText
    },
    methods: {
      ...mapMutations([
        'addChatItem',
        'removeChatItem',
        'addChatMsg'
      ]),

      // 聊天回调函数
      onCallback(json) {
        if("text" === json.msgtype)
          this.onEventRevieveChat(json);
      },

      onEventRevieveChat(json){
        var $this = this;
        var msgObj = JSON.parse(json.content);
        $this.messages.push(msgObj);
      },

      initChat(chatItem){
        var $this = this;
        $this.curChat=chatItem;
        if(typeof chatItem.messages != 'undefined'){
          $this.messages=chatItem.messages;
        }
        connect.$off('msg');
        connect.$on('msg',function(msg){
          $this.chatCore.onEventSendChat(msg);
        })
        var chatroom = '';
        if($this.curChat.type=="friend"){
          chatroom = $this.user.id>$this.curChat.data.id? ($this.curChat.data.id.toString()+$this.user.id):($this.user.id.toString()+$this.curChat.data.id)
        }else if($this.curChat.type=="group"){
          chatroom = $this.curChat.data.group_id.toString();
        }else{
          return;
        }
        $this.chatCore = chat.getXchatkit($this.user.id, $this.user.nickname, md5.hex(chatroom), $this.onCallback);
        $this.chatCore.onJoinConferenceClicked();
      }
    },
    created(){
      console.log(this.chatList)
    },
    mounted() {
    },
    computed:{
      ...mapGetters([
        'user',
        'chatList'
      ]),
    },
    watch:{
      curChat: function(newVal, oldVal){
        var $this = this;
        $this.addChatMsg(oldVal);
      }
    }
  }
</script>
<style scoped>
  .item-container{
    position: relative;
  }
  .item-list{
    /*width: 200px;
    position: absolute;
    left: 0px;
    right: 0px;*/
    /*margin-right: 20px;*/
    min-width: 160px;
    border-right: 1px solid rgb(84, 92, 100);
    height: 100%;
  }
  .list-search, .list-action{
    height: 40px;
    line-height: 40px;
    padding: 10px;
    background-color: #f5f7fa;
  }
  .list-search{
    border-bottom: 1px solid #dcdfe6;
  }
  .item-list ul {
    flex-wrap: wrap;
    overflow-y: auto;
  }
  li.item{
    height: 40px;
    align-items: center;
    text-align: left;
    padding: 10px;
    border-bottom: 1px dashed #dcdfe6;
    cursor: pointer;
  }
  li.selected{
    background-color: #ecf5ff;
  }
  .item img{
    height: 40px;
    width: 40px;
    vertical-align: middle;
  }
  .item-detail{
    overflow: hidden;
    /*margin-left: 200px;*/
  }
  .el-tabs{
    height: 100%;
    position: relative;
  }
  .item-detail >>> .el-tabs__header{
    height: 39px;
  }
  .item-detail >>> .el-tabs__content{
    /*padding: 0px!important;*/
    width: 100%;
    padding: 0px!important;
    position: absolute;
    left: 0px;
    top: 40px;
    bottom: 0px;
  }
  .item-detail >>> .el-tab-pane{
    overflow:hidden;
  }
  .chat-message{
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 130px;
    left: 0px;
  }
  .chat-text{
    height: 130px;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
  .el-card{
    box-sizing: border-box;
  }
  .card-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  .h-full-container{
    align-items: center;
  }
  .h-full-container>span{
    font-size: 30px;
    margin-right: 10px;
  }
  .h-full-container>div{
    text-align: left;
  }
  .h-full-container>div>div:not(:first-child){
    text-align: right;
  }
</style>