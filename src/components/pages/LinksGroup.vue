<template>
	<div class="item-container full-width full-height">
		<div class="item-list fleft full-height v-full-container">
      <div class="list-search">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <ul class="full-element">
        <li v-for="(group, index) in groups" @click="curGroup=group" class="item" :class="{'selected':group.group_id==curGroup.group_id}">
          <img src="https://picsum.photos/30/30" alt="头像">
          <span>{{group.group_name}}</span>
        </li>
      </ul>
      <div class="list-action" @click="dialogCreateGroupVisible=true;">添加分组</div>
    </div>
    <div class="item-detail full-height">
      <el-tabs v-model="activeTab" @tab-click="handlerGetMembers">
        <el-tab-pane label="基本信息" name="first" class="h-full-container">
          <img src="https://picsum.photos/200/200" alt="">
          <div class="group-info">
            <p><span>群名称:</span><span>{{curGroup? (curGroup.group_name? curGroup.group_name:''):''}}</span></p>
            <p><span>群主:</span><span>{{curGroup? (curGroup.founderId? curGroup.founderId:''):''}}</span></p>
            <p><span>创建时间:</span><span>{{curGroup? (curGroup.create_time? curGroup.create_time:''):''}}</span></p>
            <p><span>群简介:</span><span>暂无</span></p>
            <p>
              <el-button v-if="curGroup.is_builder" type="text" @click="handleDelGroup">解散群</el-button>
              <el-button v-else type="text" @click="handleQuitGroup">退出群</el-button>
              <el-button v-if="curGroup.is_builder" type="text" @click="dialogModifyGroupNameVisible=true;">修改群信息</el-button>
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="群成员" name="second">
          <el-table
            :data="groupMembers"
            style="width: 100%;text-align: left;">
            <el-table-column
              fixed
              prop="nickname"
              label="昵称"
              width="180">
              <template slot-scope="scope">
                <router-link :to="{name:'member',params:{id: scope.row.id}}" style="cursor: pointer;text-decoration: none;color: inherit;"><img :src="scope.row.headimg? scope.row.headimg:'https://picsum.photos/20/20'" alt="">
                <span style="margin-left: 10px;">{{ scope.row.nickname }}</span></router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="realname"
              label="真名">
            </el-table-column>
            <el-table-column
              prop="email"
              label="电子邮件">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button
                  @click="handlerDelMember(scope.row.nickname)"
                  type="text"
                  size="small">
                  移除
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData4)"
                  type="text"
                  size="small">
                  移动
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: left;padding-top: 10px;">
            <el-button type="text" @click="fetchFriends();dialogAddUserToGroupVisible=true;">添加群成员</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="group-actions">
        <el-button type="primary">进入群聊</el-button>
        <el-button type="primary">马上开会</el-button>
        <el-button type="primary">预约会议</el-button>
      </div>
    </div>
    <el-dialog title="新建群组" custom-class="start-meeting" width="400px" center :visible.sync="dialogCreateGroupVisible">
      <el-form :model="formNewGroup" label-width="80px">
        <el-form-item label="组名">
          <el-input v-model="formNewGroup.name"></el-input>
        </el-form-item>
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
    <el-dialog title="添加好友到组" custom-class="start-meeting" width="400px" center :visible.sync="dialogAddUserToGroupVisible">
      <el-form :model="formAddUser" label-width="80px">
        <el-form-item label="选择好友">
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
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Scroll from '@/components/common/Scroll.vue'
  import {apiAuth, apiLinks, apiMeeting} from '@/properties/api.js'
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        groups:[],
        curGroup:{},
        groupMembers:[],
        activeTab: 'first',
        dialogCreateGroupVisible: false,
        formNewGroup: {
          name:''
        },
        dialogModifyGroupNameVisible: false,
        formModifyGroupName: {
          name:''
        },
        dialogAddUserToGroupVisible: false,
        friends:[],
        formAddUser: {
          friends:[]
        },
      }
    },
    name: 'FriendsGroup',
    components: {
      
    },
    created: function() {
      this.refreshGroups();
    },
    methods: {
      //####
      refreshGroups(){
        var $this = this;
        $this.findAllGroups(function(res){
            $this.groups = res.data.data;
          },function(res){
            $this.$message.error('获取群组信息失败！');
          }
        );
      },

      handlerGetMembers(){
        var $this = this;
        // $this.curGroup = $this.groups.find((value, index, arr) => {
        //   return value.group_id == groupId;
        // })
        if(Object.keys($this.curGroup).length==0){
          return;
        }
        if($this.activeTab=="second"){
          $this.findMembersByGroupId($this.curGroup.group_id,function(res){
            // $this.curGroup["members"]=res.data.data;
            $this.groupMembers=res.data.data;
            console.log($this.curGroup.members);
          },function(res){
            $this.$message.error('获取群组成员失败失败！');
          })
        }
      },
      
      handleCreateGroup() {
        var $this = this;
        $this.createGroup($this.formNewGroup.name,function(res){
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

      handleDelGroup(){
        var $this = this;
        if(Object.keys($this.curGroup).length==0){
          return;
        }
        $this.deleteGroup($this.curGroup.group_id, function(res){
          $this.$message({
            message: '删除组成功！',
            type: 'success'
          });
          $this.refreshGroups();
        },function(res){
          $this.$message.error('删除组失败！');
        })
      },

      handleQuitGroup(){
        var $this = this;
        if(Object.keys($this.curGroup).length==0){
          return;
        }
        $this.deleteGroupMember($this.curGroup.group_id, $this.user.nickname, function(res){
          $this.$message({
            message: '退群成功！',
            type: 'success'
          });
          $this.refreshGroups();
        },function(res){
          $this.$message.error('退群失败！');
        })
      },

      handlerModifyGroupName(){
        var $this = this;
        if(Object.keys($this.curGroup).length==0){
          return;
        }
        $this.updateGroupName($this.curGroup.group_id, $this.formModifyGroupName.name,function(res){
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

      handlerAddUsers(){
        var $this = this;
        if(Object.keys($this.curGroup).length==0){
          return;
        }
        $this.appendGroupUsers($this.curGroup.group_id, $this.formAddUser.friends, function(res){
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

      fetchFriends(){
        var $this = this;
        $this.getAllFriends(function(res){
          $this.friends = res.data.data;
        },function(res){
          $this.$message.error('获取好友列表失败！');
        })
      },

      handlerDelMembers(){
        var $this = this;
        if(Object.keys($this.curGroup).length==0){
          return;
        }
        $this.deleteGroupMembers($this.curGroup.group_id, [] ,function(res){
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

      handlerDelMember(nickname){
        var $this = this;
        if(Object.keys($this.curGroup).length==0){
          return;
        }
        $this.deleteGroupMember($this.curGroup.group_id, nickname,function(res){
          $this.$message({
            message: '从组内删除好友成功！',
            type: 'success'
          });
          $this.refreshGroups();
        },function(res){
          $this.$message.error('从组内删除好友失败！');
        })
      },

      findAllGroups(cbOk,cbErr){
        var self = this;
        self.$axios.get(apiLinks.groups.all, null, cbOk, cbErr)
      },

      findMembersByGroupId(groupId,cbOk,cbErr){
        var $this = this;
        $this.$axios.post(apiLinks.groups.members, {
          group_id: groupId.toString()
        }, cbOk, cbErr)
      },

      createGroup(groupName, cbOk, cbErr) {
        var $this = this;
        $this.$axios.put(
          apiLinks.groups.create,
          {
            group_name:groupName
          },
          cbOk,
          cbErr
        )
      },

      deleteGroup(groupId, cbOk, cbErr) {
        var $this = this;
        $this.$axios.post(apiLinks.groups.delete,
          {
            group_id: groupId.toString()
          }, cbOk, cbErr
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

      getAllFriends(cbOk, cbErr) {
        var $this = this;
        $this.$axios.get(apiLinks.friends.all, null,cbOk, cbErr)
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
    },
    mounted: function() {
      
    },
    watch:{
      groupId:function(newValue, oldValue){
        var $this = this;
        if(newValue){
          $this.handlerGetMembers();
        }
      },
    },
    computed: {
      // groupMembers: function () {
      //   var $this = this;
      //   return $this.getMembersById($this.curGroup);
      // },
      groupId: function(){
        var $this = this;
        if(Object.keys($this.curGroup).length==0){
          return null;
        }
        return $this.curGroup.group_id;
      },
      ...mapGetters([
        'user'
      ]),
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
    cursor: pointer;
  }
  .list-search{
    border-bottom: 1px solid #dcdfe6;
  }
  .list-action{
    border-top: 1px solid #dcdfe6;
  }
  .item-list ul {
    flex-wrap: wrap;
    overflow-y: auto;
  }
  li.item{
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding: 10px;
    border-bottom: 1px dashed #dcdfe6;
    cursor: pointer;
  }
  li.item.selected{
    background-color: aliceblue;
  }
  .item img{
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }
  .item span{
    margin-left: 10px;
    color: #606266;
  }
  .item-detail{
    overflow: hidden;
    padding: 20px;
    /*margin-left: 200px;*/
  }
  .cell{
    text-align: left;
  }
  .group-actions{
    padding: 30px 0px;
    text-align: center;
  }
  .group-info{
    padding: 10px 20px;
    text-align: left;
  }
  .group-info p{
    height: 40px;
  }
  .group-info p span:first-child{
    color: gray;
    padding-right: 10px;
  }
</style>