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
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </div>
            <scroll :data="group.member" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in group.member" :key="item.phone" class="card-item">{{item.nickname}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-lg-and-up hidden-xs-only card-wrap">
          <el-card v-for="group in groups" :key="group.group_id" class="one-second margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>{{group.group_name}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </div>
            <scroll :data="group.member" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in group.member" :key="item.phone" class="card-item">{{item.nickname}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-md-and-down card-wrap">
          <el-card v-for="group in groups" :key="group.group_id" class="one-third margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>{{group.group_name}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="group.member" style="height: 120px;overflow-y: scroll;">
              <ul class="card-item-wrap">
                <li v-for="item in group.member" :key="item.phone" class="card-item">{{item.nickname}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
			</div>
		</div>
		<el-dialog title="请选择一个群组视频" custom-class="start-meeting" width="400px" center :visible.sync="dialogMakeMeetingVisible">
		  <el-form :model="formMeeting" label-width="80px">
		    <el-form-item label="群组">
		      <el-select v-model="formMeeting.group" placeholder="选择群组">
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
        <router-link to="/frame/meeting/now">
		      <el-button type="primary" @click="dialogMakeMeetingVisible = false">确 定</el-button>
        </router-link>
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
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Scroll from '@/components/common/Scroll.vue'
  import {apiAuth, apiLinks} from '@/api/api.js'
  export default {
    data() {
      return {
        dialogMakeMeetingVisible: false,
        dialogCreateGroupVisible: false,
        pulldown: true,
        //所有群
        groups: [],
        formMeeting: {
          group:''
        },
        formNew: {
          name:''
        }
      }
    },
    name: 'FriendsGroup',
    components: {
      scroll: Scroll
    },
    created: function() {
      this.findAllMembers(function(data){
        self.groups = re.data;
      },function(){

      });
    },
    methods: {
      //创建群(已完成)
      handleCreateGroup() {
        var $this = this;
        $this.dialogCreateGroupVisible = false;
        $this.createGroup($this.formNew);
      },
      
      //查找所有群组所有成员(完成)
      findAllMembers(cbOk,cbErr) {
        var self = this;
        self.$axios.get(apiLinks.groups.allmember)
        .then(function(response) {
          var re = response.data;
          if(re.code == 0) {
            typeof(cbOk)!="undefined"&&cbOk(re.data);
            console.log(re.msg);
          } else {
            typeof(cbErr)!="undefined"&&cbErr()
            console.log(re.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      },

      //创建群(已完成)
      createGroup(group) {
        var self = this;
        this.$axios.put(apiLinks.groups.create,
          {
            group_name:group.name
          }
        )
        .then(function(response) {
          var re = response.data;
          if(re.code == 0) {
            self.findAllMembers();
            console.log(re.msg);
          } else {
            console.log(re.msg);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      },
      
      //群组添加用户(未测试)
      appendGroupUser(groupId, nickname) {
        var self = this;
        this.$axios.put(create.addMember, 
          {
            group_id:groupId,
            nickname:nickname
          }
        )
        .then(function(response) {
          var re = response.data;
          if(re.code == 0) {
            self.groups.push(self.tempInfo);
            console.log(re.msg);
          } else {
            console.log(re.msg);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      },

      //删除群组中的用户
      deleteGroupUser(groupId, nickname) {
        axios.delete(apiLinks.deleteMember, {
          params: {
            group_id:groupId,
            nickname:nickname
          }
        })
        .then(function(response){
          if(response.code == 0) {
            var userInfo = getUserInfo(nickname);
            allMember[groupId].splice(allMember[groupId].indexOf(userInfo));
            console.log(response.msg);
          } else {
            console.log(response.msg);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      },
      //更新群组名称
      updateGroupName(groupId, newGroupName) {
        axios.post(apiLinks.modifyName, {
          params: {
            group_id: groupId,
            nickname: newGroupName
          }
        })
        .then(function(response) {
          if (response.code == 0) {
            for(var i = 0; i < allGroups; i++) {
              if(allGroups[i].id == groupId) {
                allGroups[i].groupName == newGroupName;
                break;
              }
            }
            console.log(response.msg);
          } else {
            console.log(response.msg);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      },

      //根据昵称获取用户信息(完成)
      getUserInfo(nickname) {
        var self = this;
        this.$axios.get(apiAuth.userInfoByNickname, 
          {
            nickname:nickname
          }
        )
        .then(function(response){
          var re = response;
          if(re.code == 0) {
            self.tempInfo.id = re.data.phone;
            self.tempInfo.label = re.data.nickname;
            console.log(re.msg);
          } else {
            console.log(re.msg);
            response.data
          }
        })
        .catch(function(error) {
          console.log(error);
          return null;
        })
      }
    },
    mounted: function() {
      
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
  .card-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .card-title {
    text-align: left;
  }
  .card-item-wrap{
    padding: 0px;
    margin: 0px;
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