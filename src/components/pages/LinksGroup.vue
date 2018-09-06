<template>
	<div>
		<div class="main-actions">
			<a href="javascript:void(0)" @click="dialogMakeMeetingVisible = true">发起会议</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" @click="dialogCreateGroupVisible = true">新建群组</a>
		</div>
		<div>
			<div class="main-title">
				<span>我的群组</span>
			</div>
			<div style="padding: 20px;">
				<div class="hidden-sm-and-up card-wrap">
          <el-card v-for="group in groups" :key="group.group_id" class="full-width margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>{{group.group_name}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit" @click="dialogModifyGroupNameVisible=true;curGroup=group.group_id"></i>
                <i class="el-icon-remove-outline" @click="dialogDelUserFromGroupVisible=true;curGroup=group.group_id"></i>
                <i class="el-icon-circle-plus-outline" @click="dialogAddUserToGroupVisible=true;curGroup=group.group_id;fetchFriends();"></i>
                <i>&nbsp;|&nbsp;</i>
                <i class="el-icon-delete" @click="handleDelGroup(group.group_id)"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="group.member" style="height: 120px;">
              <ul class="card-item-wrap">
                <li v-for="item in group.member" :key="item.phone" class="card-item"><span>{{item.nickname}}</span><span><i @click="handlerDelMember(group.group_id, item.nickname)">删除</i></span></li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-lg-and-up hidden-xs-only card-wrap">
          <el-card v-for="(group, index) in groups" :key="group.group_id" :class="[index%2!=0? 'one-second margin-l-2P margin-b-20':'one-second margin-b-20']">
            <div slot="header" class="card-title clearfix">
              <span>{{group.group_name}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit" @click="dialogModifyGroupNameVisible=true;curGroup=group.group_id"></i>
                <i class="el-icon-remove-outline" @click="dialogDelUserFromGroupVisible=true;curGroup=group.group_id"></i>
                <i class="el-icon-circle-plus-outline" @click="dialogAddUserToGroupVisible=true;curGroup=group.group_id;fetchFriends();"></i>
                <i>&nbsp;|&nbsp;</i>
                <i class="el-icon-delete" @click="handleDelGroup(group.group_id)"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="group.member" style="height: 120px;">
              <ul class="card-item-wrap">
                <li v-for="item in group.member" :key="item.phone" class="card-item"><span>{{item.nickname}}</span><span><i @click="handlerDelMember(group.group_id, item.nickname)">删除</i></span></li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-md-and-down card-wrap">
          <el-card v-for="(group, index) in groups" :key="group.group_id" :class="[index%3!=0? 'one-third margin-l-2P margin-b-20':'one-third margin-b-20']">
            <div slot="header" class="card-title clearfix">
              <span>{{group.group_name}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit" @click="dialogModifyGroupNameVisible=true;curGroup=group.group_id"></i>
                <i class="el-icon-remove-outline" @click="dialogDelUserFromGroupVisible=true;curGroup=group.group_id"></i>
                <i class="el-icon-circle-plus-outline" @click="dialogAddUserToGroupVisible=true;curGroup=group.group_id;fetchFriends();"></i>
                <i>&nbsp;|&nbsp;</i>
                <i class="el-icon-delete" @click="handleDelGroup(group.group_id)"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="group.member" style="height: 120px;">
              <ul class="card-item-wrap">
                <li v-for="item in group.member" :key="item.phone" class="card-item"><span>{{item.nickname}}</span><span><i @click="handlerDelMember(group.group_id, item.nickname)">删除</i></span></li>
              </ul>
            </scroll>
          </el-card>
        </div>
			</div>
		</div>
		<el-dialog title="请选择一个群组视频" custom-class="start-meeting" width="400px" center :visible.sync="dialogMakeMeetingVisible">
		  <el-form :model="formMeeting" label-width="80px">
		    <el-form-item label="会议名称">
          <el-input v-model="formMeeting.name"></el-input>
        </el-form-item>
        <el-form-item label="群组">
		      <el-select v-model="formMeeting.groupId" placeholder="选择群组" style="width: 100%;">
            <el-option
              v-for="group in groups"
              :label="group.group_name"
              :value="group.group_id">
            </el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogMakeMeetingVisible = false">取 消</el-button>
	      <el-button type="primary" @click="handleCreateMeeting()">确 定</el-button>
		  </div>
		</el-dialog>
    <el-dialog title="新建群组" custom-class="start-meeting" width="400px" center :visible.sync="dialogCreateGroupVisible">
      <el-form :model="formNew" label-width="80px">
        <el-form-item label="组名">
          <el-input v-model="formNew.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="导入好友">
          <el-select v-model="formNew.friends" multiple collapse-tags style="width: 100%;" placeholder="选择群组">
            <el-option
              v-for="(item,index) in groups"
              :key="item.label"
              :label="item.label"
              :value="index.toString()">
            </el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateGroupVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateGroup()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改群名称" custom-class="start-meeting" width="400px" center :visible.sync="dialogModifyGroupNameVisible">
      <el-form :model="formModifyGroupName" label-width="80px">
        <el-form-item label="新组名">
          <el-input v-model="formModifyGroupName.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyGroupNameVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerModifyGroupName()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入好友" custom-class="start-meeting" width="400px" center :visible.sync="dialogAddUserToGroupVisible">
      <el-form :model="formAddUser" label-width="80px">
        <el-form-item label="导入好友">
          <el-select v-model="formAddUser.friends" multiple collapse-tags style="width: 100%;" placeholder="选择好友">
            <el-option
              v-for="(item,index) in filteUsers"
              :key="item.nickname"
              :label="item.nickname"
              :value="item.nickname">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUserToGroupVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerAddUsers()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除好友" custom-class="start-meeting" width="400px" center :visible.sync="dialogDelUserFromGroupVisible">
      <el-form :model="formDelUser" label-width="80px">
        <el-form-item label="删除好友">
          <el-select v-model="formDelUser.friends" multiple collapse-tags style="width: 100%;" placeholder="选择好友">
            <el-option
              v-for="(item,index) in groupMembers"
              :key="item.nickname"
              :label="item.nickname"
              :value="item.nickname">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDelUserFromGroupVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerDelMembers()">确 定</el-button>
      </div>
    </el-dialog> 
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Scroll from '@/components/common/Scroll.vue'
  import {apiAuth, apiLinks, apiMeeting} from '@/api/api.js'
  import {mapMutations} from 'vuex';
  export default {
    data() {
      return {
        dialogMakeMeetingVisible: false,
        dialogCreateGroupVisible: false,
        dialogAddUserToGroupVisible: false,
        dialogDelUserFromGroupVisible: false,
        dialogModifyGroupNameVisible: false,
        curGroup: 1,
        pulldown: true,
        // filteUsers: [],
        // groupMembers:[],
        //所有群
        groups: [],
        friends: [],
        formMeeting: {
          groupId:'',
          name:''
        },
        formNew: {
          name:''
        },
        formModifyGroupName: {
          name:''
        },
        formAddUser: {
          friends:[]
        },
        formDelUser: {
          friends:[]
        }
      }
    },
    name: 'FriendsGroup',
    components: {
      scroll: Scroll
    },
    created: function() {
      var $this = this;
      $this.refreshGroups();
    },
    methods: {
      refreshGroups(){
        var $this = this;
        $this.findAllMembers(function(res){
            $this.groups = res.data.data;
          },function(res){
            $this.$message.error('获取群组信息失败！');
          }
        );
      },

      fetchFriends(){
        var $this = this;
        $this.getAllFriends(function(res){
          $this.friends = res.data.data;
        },function(res){
          $this.$message.error('获取好友列表失败！');
        })
      },
      
      //创建群(已完成)
      handleCreateGroup() {
        var $this = this;
        $this.createGroup($this.formNew.name,function(res){
          $this.$message({
            message: '创建群组成功！',
            type: 'success'
          });
          $this.dialogCreateGroupVisible = false;
          $this.refreshGroups();
        },function(res){
          $this.$message.error('创建群组失败！');
        });
      },

      handlerModifyGroupName(){
        var $this = this;
        $this.updateGroupName($this.curGroup, $this.formModifyGroupName.name,function(res){
          $this.$message({
            message: '修改群名称成功！',
            type: 'success'
          });
          $this.dialogModifyGroupNameVisible=false;
          $this.refreshGroups();
        },function(res){
          $this.$message.error('修改群名称失败！');
        })
      },

      handleDelGroup(group_id){
        var $this = this;
        $this.deleteGroup(group_id, function(res){
          $this.$message({
            message: '删除组成功！',
            type: 'success'
          });
          $this.refreshGroups();
        },function(res){
          $this.$message.error('删除组失败！');
        })
      },

      handleCreateMeeting(){
        var $this = this;
        var members = $this.getMembersById($this.formMeeting.groupId);
        var memTemp = [];
        for(var i=0;i<members.length;i++){
          memTemp.push({nickname:members[i].nickname})
        }
        $this.createMeeting({
          meeting_name: $this.formMeeting.name,
          members: memTemp,
          start_time: "0"
        },function(res){
          $this.$message({
            message: '创建会议成功！',
            type: 'success'
          });
          $this.setMeeting(res.data.data);
          $this.dialogMakeMeetingVisible=false;
          // $this.$router.push({path:'/frame/meeting/now'});
          $this.$router.push({name: 'now'})
        },function(res){
          $this.$message.error('创建会议失败！');
        })
      },

      handlerDelMembers(){
        var $this = this;
        $this.deleteGroupMembers($this.curGroup, $this.formDelUser.friends,function(res){
          $this.$message({
            message: '从组内删除好友成功！',
            type: 'success'
          });
          $this.dialogDelUserFromGroupVisible=false;
          $this.refreshGroups();
        },function(res){
          $this.$message.error('从组内删除好友失败！');
        })
      },

      handlerDelMember(groupId, nickname){
        var $this = this;
        $this.deleteGroupMember(groupId, nickname,function(res){
          $this.$message({
            message: '从组内删除好友成功！',
            type: 'success'
          });
          $this.refreshGroups();
        },function(res){
          $this.$message.error('从组内删除好友失败！');
        })
      },

      handlerAddUsers(){
        var $this = this;
        $this.appendGroupUsers($this.curGroup, $this.formAddUser.friends,function(res){
          $this.$message({
            message: '向组内添加好友成功！',
            type: 'success'
          });
          $this.dialogAddUserFromGroupVisible=false;
          $this.refreshGroups();
        },function(res){
          $this.$message.error('向组内添加好友失败！');
        })
      },
      
      //查找所有群组所有成员(完成)
      findAllMembers(cbOk,cbErr) {
        var self = this;
        self.$axios.get(apiLinks.groups.allmember, null, cbOk, cbErr)
      },

      //创建群(已完成)
      createGroup(groupName, cbOk, cbErr) {
        var self = this;
        self.$axios.put(
          apiLinks.groups.create,
          {
            group_name:groupName
          },
          cbOk,
          cbErr
        )
      },
      
      //群组添加用户(未测试)
      appendGroupUsers(groupId, members, cbOk, cbErr) {
        var self = this;
        self.$axios.put(apiLinks.groups.addMembers, 
          {
            group_id:groupId.toString(),
            members:members
          },
          cbOk, cbErr
        )
      },

      //删除群组中的用户
      deleteGroupMembers(groupId, members, cbOk, cbErr) {
        var self = this;
        self.$axios.post(apiLinks.groups.deleteMembers,
          {
            group_id:groupId.toString(),
            members:members
          },
          cbOk, cbErr
        )
      },
      deleteGroupMember(groupId, nickname, cbOk, cbErr) {
        var self = this;
        self.$axios.post(apiLinks.groups.deleteMember,
          {
            group_id:groupId.toString(),
            nickname:nickname
          },
          cbOk, cbErr
        )
      },
      //更新群组名称
      updateGroupName(groupId, newGroupName, cbOk, cbErr) {
        var self = this;
        self.$axios.post(apiLinks.groups.modifyName,
          {
            group_id: groupId.toString(),
            group_name: newGroupName
          }, cbOk, cbErr
        )
      },
      deleteGroup(groupId, cbOk, cbErr) {
        var self = this;
        self.$axios.post(apiLinks.groups.delete,
          {
            group_id: groupId.toString()
          }, cbOk, cbErr
        )
      },

      getAllFriends(cbOk, cbErr) {
        var self = this;
        self.$axios.get(apiLinks.friends.all, null,cbOk, cbErr)
      },

      //根据昵称获取用户信息(完成)
      getUserInfo(nickname, cbOk, cbErr) {
        var self = this;
        self.$axios.get(apiAuth.userInfoByNickname, 
          {
            nickname:nickname
          }, cbOk, cbErr
        )
      },

      createMeeting(meeting, cbOk, cbErr){
        var self = this;
        self.$axios.put(apiMeeting.order.create,meeting, cbOk, cbErr
        )
      },

      getMembersById(groupId){
        var $this = this;
        var member = [];
        for (var i = 0; i < $this.groups.length; i++) {
          if($this.groups[i].group_id==groupId){
            member = $this.groups[i].member;
            break;
          }
        }
        return member;
      },

      ...mapMutations([
        'setMeeting',
      ]),
    },
    mounted: function() {
      
    },
    computed: {
      groupMembers: function () {
        var $this = this;
        return $this.getMembersById($this.curGroup);
      },
      filteUsers: function(){
        var $this = this;
        var friends = [];
        for(var i=0;i<$this.friends.length;i++){
          var ret = $this.groupMembers.findIndex((value, index, arr) => {
            return value.nickname == $this.friends[i].nickname;
          })
          if(ret==-1){
            friends.push($this.friends[i])
          }
          // for(var j=0;j<$this.groupMembers.lenght;j++){
          //   if($this.friends[i].nickname==$this.groupMembers[j].nickname){
          //     isExist = true;
          //     break;
          //   }
          // }
          // if(!isExist){
          //   friends.push($this.friends[i])
          // }
        }
        return friends;
      },
    }
  };
</script>
<style>
  .main-actions{
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid gray;
    text-align: right;
    padding-right: 20px;
    background-color: #ebeef5;
  }
  .main-title{
    height: 40x;
    line-height: 40px;
    text-align: left;
    padding-left: 20px;
    background-color: #f7f7f7;
  }
  .el-card{
    border-width: 0px;
  }
  .card-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .card-title {
    text-align: left;
  }
  .card-item-wrap{
    padding: 0px;
    margin: 0px;
  }

  .card-item-wrap li{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .card-item-wrap li i{
    cursor: pointer;
  }
  .card-item-wrap li i:hover{
    color: rgb(255, 208, 75);
  }

  .card-actions i{
    margin-left: 10px;
  }
  .card-item{
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    list-style: none;
    text-align: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>