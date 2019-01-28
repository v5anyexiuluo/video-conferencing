<template>
	<div style="padding:20px;">
    <el-tabs style="height:94%;" v-model="activeName" type="card" @tab-click="handleClick">    
      <el-tab-pane label="未读消息" name="undo" style="height:95%;">
        <template v-if="undoMsgs.length==0">暂无消息</template>
        <template v-else v-for="msg in undoMsgs">
          <div v-if="msg.category==msgType.PLAIN_TEXT" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
            <div class="deal-actions" style="height: 40px;">
            </div>
          </div>
          <div v-else-if="msg.category==msgType.CONFERENCE_READY_START" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
            <div class="deal-actions">
              <el-button type="text" :disabled="countdown[msg.messageId]>0" @click="entryMeeting(msg.meetingInfoEntity)">{{countdown[msg.messageId] | countdownBtnText}}</el-button>
            </div>
          </div>
          <div v-else-if="msg.category==msgType.CONTACT_ADDING" class="h-full-container v-center">
            <!-- /{{msg.messageState}}/ -->
            <span class="full-element">{{msg.content.plain_message}}</span>
            <div v-if="msg.messageState!=msgStatus.PROCESSED" class="deal-actions">
              <el-button type="text" @click="formAddFriend.nickName=msg.content.user_name;formAddFriend.api=msg.content.agree;formAddFriend.messageId=msg.messageId;dialogAddFriendVisible=true;">同意</el-button>
              <el-button type="text" @click="handleRefuseFrdAdd(msg.content.refuse, msg.messageId)">拒绝</el-button>
            </div>
            <div v-else>已处理</div>
          </div>
          <div v-else-if="msg.category==msgType.CONFERENCE_CREATION" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
            <div class="deal-actions">
              <el-button type="text" :disabled="countdown[msg.messageId]>0" @click="entryMeeting(msg.meetingInfoEntity)">{{countdown[msg.messageId] | countdownBtnText}}</el-button>
            </div>
          </div>
          <div v-else-if="msg.category==msgType.CONFERENCE_CANCEL" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
          </div>
          <div v-else-if="msg.category==msgType.CONFERENCE_ENDING" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
          </div>
        </template>
        <el-pagination
          v-if="undoMsgs.length!=0"
          @current-change="handleCurrentChange('undo')"
          :current-page.sync="undo.currentPage"
          :page-count="undo.total"
          layout="total, prev, pager, next">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="历史消息" name="history" style="height:95%;">
        <template v-if="historyMsgs.length==0">暂无消息</template>
        <template v-else v-for="msg in historyMsgs">
          <div v-if="msg.category==msgType.PLAIN_TEXT" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
            <div class="deal-actions" style="height: 40px;">
            </div>
          </div>
          <div v-else-if="msg.category==msgType.CONFERENCE_READY_START" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
            <div class="deal-actions">
              <el-button type="text" :disabled="countdown[msg.messageId]>0" @click="entryMeeting(msg.meetingInfoEntity)">{{countdown[msg.messageId] | countdownBtnText}}</el-button>
            </div>
          </div>
          <div v-else-if="msg.category==msgType.CONTACT_ADDING" class="h-full-container v-center">
            <!-- /{{msg.messageState}}/ -->
            <span class="full-element">{{msg.content.plain_message}}</span>
            <div v-if="msg.messageState!=msgStatus.PROCESSED" class="deal-actions">
              <el-button type="text" @click="formAddFriend.nickName=msg.content.user_name;formAddFriend.api=msg.content.agree;formAddFriend.messageId=msg.messageId;dialogAddFriendVisible=true;">同意</el-button>
              <el-button type="text" @click="handleRefuseFrdAdd(msg.content.refuse, msg.messageId)">拒绝</el-button>
            </div>
            <div v-else>已处理</div>
          </div>
          <div v-else-if="msg.category==msgType.CONFERENCE_CREATION" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
            <div class="deal-actions">
              <el-button type="text" :disabled="countdown[msg.messageId]>0" @click="entryMeeting(msg.meetingInfoEntity)">{{countdown[msg.messageId] | countdownBtnText}}</el-button>
            </div>
          </div>
          <div v-else-if="msg.category==msgType.CONFERENCE_CANCEL" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
          </div>
          <div v-else-if="msg.category==msgType.CONFERENCE_ENDING" class="h-full-container v-center">
            <span class="full-element">{{msg.content.plain_message}}</span>
          </div>
        </template>
        <el-pagination
          v-if="historyMsgs.length!=0"
          @current-change="handleCurrentChange('history')"
          :current-page.sync="history.currentPage"
          :page-count="history.total"
          layout="total, prev, pager, next">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="添加好友" custom-class="start-meeting" width="400px" center :visible.sync="dialogAddFriendVisible">
      <el-form :model="formAddFriend" :rules="addFriendRules" ref="addFriendForm" label-width="80px">
        <el-form-item label="用户名" prop="nickName">
          <el-input v-model="formAddFriend.nickName" disabled @focus="formAddFriend.formError=''"></el-input>
        </el-form-item>
        <el-form-item label="选择分组" prop="departmentId">
          <el-select v-model="formAddFriend.departmentId" collapse-tags style="width: 100%;" placeholder="选择分组">
            <el-option
              v-for="item in departments"
              :key="item.department_id"
              :label="item.department_name"
              :value="item.department_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formAddFriend.formError" center>
          <span style="color:red;">{{formAddFriend.formError}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFriendVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddFriendForm('addFriendForm')">确 定</el-button>
        <!-- handleAddFriend -->
      </div>
    </el-dialog>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex';
	import {apiLinks, apiMsg} from '@/properties/api.js';
	import utils from '@/assets/js/utils.js';
	import {msgType, msgStatus} from '@/assets/js/common.js';
	export default {
    data() {
      return {
        stompClient: null,
        msgType: msgType,
        msgStatus: msgStatus,
        departments: [],
        dialogAddFriendVisible: false,
        formAddFriend:{
          nickName: '',
          departmentId: '',
          messageId: '',
          api: '',
          formError: ''
        },
        addFriendRules: {
          nickName: [
            { required: true, message: '请输入对方昵称或者手机号', trigger: 'blur' },
          ],
          departmentId: [
            { required: true, message: '请选择分组', trigger: 'change' }
          ]
        },
        timer: null,
        count: 0,
        activeName: 'undo',
        undo: {
          total: 10,
          currentPage: 1
        },
        currentPage: 1,
        history: {
          total: 10,
          currentPage: 1
        },
      }
    },
    name: 'Login',
    components: {
    },
    created(){
      var $this = this;
      $this.refreshNotifies();
      $this.initTimer();
    },
    mounted() {
    },
    methods: {
      ...mapMutations([
        'clearMsg',
        'addMsg',
        'setCurMeeting',
        'setCountdownTime'
      ]),

      handleClick(tab, event) {
        // console.log(tab, event);
        var $this = this;
        if(tab.name == 'undo'){
          $this.refreshUndo();
        }else if(tab.name == 'history'){
          $this.refreshHistory();
        }else{
          return;
        }
        // $this.currentPage = 1;
        // $this.refreshTab();
      },

      refreshNotifies(){
        var $this = this;
        $this.refreshHistory();
        $this.refreshUndo();
      },

      refreshHistory(){
        var $this = this;
        $this.pullHistory($this.history.currentPage, 10, function(res){
          console.log('refreshHistory')
          console.log(res)
          $this.history.total = res.data.data.total;
          var msgs = res.data.data.data;
          $this.clearMsg()
          msgs.forEach(function(value,index,array){
            $this.addMsg({type:'history', data:JSON.parse(value)});
          })
        },function(res){
          $this.$message.error('获取历史消息失败！');
        })
      },

      refreshUndo(){
        var $this = this;
        $this.pullUndoMsg($this.undo.currentPage, 10, function(res){
          $this.undo.total = res.data.data.total;
          var msg=res.data.data.data;
          $this.clearMsg()
          msg.forEach(function(value,index,array){
            $this.addMsg({type:'undo', data:JSON.parse(value)});
          })
        },function(res){
          $this.$message.error('获取未读消息失败！');
        })
      },

      submitAddFriendForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.handleAgreeFrdAdd()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      handleAgreeFrdAdd(){
        var $this = this;
        $this.agreeFrdAdd($this.formAddFriend.api, $this.formAddFriend.messageId, $this.formAddFriend.departmentId, function(){
          $this.$message({
            message: '已添加好友',
            type: 'success'
          });
          $this.refreshNotifies();
        },function(){
          $this.$message.error('添加好友失败');
        })
        $this.dialogAddFriendVisible = false;
      },

      handleRefuseFrdAdd(api, messageId){
      	var $this = this;
        this.refuseFrdAdd(api, messageId, function(){
        	$this.$message({
            message: '拒绝好友请求成功',
            type: 'success'
          });
          $this.refreshNotifies();
        },function(){
        	$this.$message.error('拒绝好友请求失败');
        })
      },

      handleCurrentChange(type){
        var $this = this;
        console.log($this.undo.currentPage)
        if(type=="undo"){
          $this.refreshUndo();
        }else if(type == "history"){
          $this.refreshHistory();
        }else{
          return;
        }
      },

      pullUndoMsg(page, size, cbOk, cbErr){
        this.$axios.get(apiMsg.pull.undo+'?page='+page+'&size='+size, null, cbOk, cbErr)
      },

      pullHistory(page, size, cbOk, cbErr){
        this.$axios.get(apiMsg.pull.history+'?page='+page+'&size='+size, null, cbOk, cbErr)
      },

      entryMeeting(meeting){
        var $this = this;
        $this.setCurMeeting(meeting);
        $this.$router.push({name: 'current'})
      },

      refreshDepartments(){
        var $this = this;
        $this.getAllDepartments(function(res){
          $this.departments = res.data.data;
        },function(res){
          $this.$message.error('获取用户分组失败！');
        })
      },

      getAllDepartments(cbOk, cbErr){
        var $this = this;
        this.$axios.get(apiLinks.friends.allDepartments, null, cbOk, cbErr)
      },

      agreeFrdAdd(api, messageId, departmentId, cbOk, cbErr){
        this.$axios.put(apiLinks.links+api, {
          department_id: departmentId.toString(),
          message_id: messageId.toString()
        }, cbOk, cbErr)
      },

      refuseFrdAdd(api, messageId, cbOk, cbErr){
        this.$axios.put(apiLinks.links+api, {
          message_id: messageId.toString()
        }, cbOk, cbErr)
      },

      initTimer(){
        var $this = this;
        if($this.timer){
          clearTimeout($this.timer);
        }
        if($this.countdown){
          $this.timer = setInterval(function(){
            for(var key in $this.countdown) {
              // console.log($this.countdown[key]);
              $this.setCountdownTime(key);
            }
            $this.$forceUpdate();
          },1000)
        }
      },
      
    },
    watch:{
      dialogAddFriendVisible: function(newVal, oldValue){
        var $this = this;
        if(newVal){
          $this.refreshDepartments();
        }
      },
      countdown: function(newVal, oldValue){
        var $this = this;
        $this.initTimer();
      }
    },
    computed:{
      ...mapGetters([
        'user',
        'historyMsgs',
        'undoMsgs',
        'countdown'
      ]),
      // timedown: function(){
      // 	var $this = this;
      // 	return function(id){
      // 		return $this.countdown[id]+($this.count-$this.count);
      // 	}
      // }
    },
    filters: {
      countdownBtnText: function(stamp){
        var $this = this;
        if(stamp>0){
          var day = Math.floor(stamp/(24*60*60));
          var hour = Math.floor((stamp%(24*60*60))/(60*60));
          var minute = Math.floor(((stamp%(24*60*60))%(60*60))/60);
          var second = ((stamp%(24*60*60))%(60*60))%60;
          return '剩余 '+day+'天'+hour+'小时'+minute+'分钟'+second+'秒';
        }else{
          return '进入会议'
        }
        
      }
    }
  }
</script>
<style scoped>
	.h-full-container{
		margin: 0px 0px 20px 20px;
		vertical-align: middle;
		text-align: left;
		border-bottom: 1px solid #e4e7ed;
	}
	.deal-actions{
		/*width: 140px;*/
	}
	.content-wrap{
		width: auto;
	}
</style>