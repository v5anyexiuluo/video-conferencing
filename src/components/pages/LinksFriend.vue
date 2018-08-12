<template>
	<div>
		<div class="main-actions">
			<a href="javascript:void(0)" @click="dialogAddFriendVisible = true">添加好友</a>
		</div>
		<div>
			<div class="main-title">
				<span>我的好友</span>
			</div>
			<div style="padding: 20px;">
				<div class="hidden-sm-and-up card-wrap">
          <!-- <el-card v-for="group in groups" :key="group.id" class="full-width margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>{{group.label}}</span>
              <el-button style="float: right; padding: 3px 0" type="text"></el-button>
            </div>
            <scroll :data="group.children" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in group.children" :key="item.id" class="card-item">{{item.label}}</li>
              </ul>
            </scroll>
          </el-card> -->
          <el-card class="one-third margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>默认用户组</span>
              <div class="fright card-actions">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="friends" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in friends" :key="item.phone" class="card-item">{{item.nickname}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-lg-and-up hidden-xs-only card-wrap">
          <el-card class="one-third margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>默认用户组</span>
              <div class="fright card-actions">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="friends" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in friends" :key="item.phone" class="card-item">{{item.nickname}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-md-and-down card-wrap">
          <el-card class="one-third margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>默认用户组</span>
              <div class="fright card-actions">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="friends" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in friends" :key="item.phone" class="card-item">{{item.nickname}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
			</div>
		</div>
    <el-dialog title="新建群组" custom-class="start-meeting" width="400px" center :visible.sync="dialogAddFriendVisible">
      <el-form :model="formAddFriend" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="formAddFriend.nickName" @focus="formAddFriend.formError=''"></el-input>
        </el-form-item>
        <el-form-item v-if="formAddFriend.formError" center>
          <span style="color:red;">{{formAddFriend.formError}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFriendVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddFriend">确 定</el-button>
      </div>
    </el-dialog>
		<!-- <el-dialog title="请选择一个群组聊天" width="400px" center :visible.sync="dialogFormVisible">
		  <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item v-if="isCreateGroupShow" label="新建组">
          <el-input class="full-width"></el-input>
        </el-form-item>
        <el-form-item v-if="!isCreateGroupShow" label="选择组">
          <el-select v-model="form.groups" class="full-width" placeholder="选择组">
            <el-option label="群组一" value="shanghai"></el-option>
            <el-option label="群组二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div>
            <a href="javascript:void(0)" @click="isCreateGroupShow = (!isCreateGroupShow)">{{isCreateGroupShow? "新建组":"选择组"}}</a>
          </div>
        </el-form-item>
      </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog> -->
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Scroll from '@/components/common/Scroll.vue'
  import {apiAuth,apiLinks} from '@/api/api.js'
  export default {
    data() {
      return {
        dialogAddFriendVisible: false,
        // dialogFormVisible: false,
        pulldown: true,
        friends: [],
        formAddFriend: {
          nickName: '',
          formError: ''
        }
      };
    },
    name: 'FriendsGroup',
    components: {
      scroll: Scroll
    },
    created: function(){
      this.refreshFriends();
    },
    methods: {
      handleAddFriend(){
        var $this = this;
        $this.findFriendByNickname($this.formAddFriend.nickName, function(res){
          $this.addFriend($this.formAddFriend.nickName, function(res){
            $this.$message({
              message: '添加好友成功！',
              type: 'success'
            });
            $this.dialogAddFriendVisible=false;
            $this.refreshFriends();
          },function(res){
            $this.$message.error('添加好友失败！'+res.msg);
          })
        },function(res){
          $this.formAddFriend.formError = '用户不存在！'
        })
      },
      
      refreshFriends(){
        var $this = this;
        $this.getAllFriends(function(res){
          // $this.$message({
          //   message: '获取好友列表成功！',
          //   type: 'success'
          // });
          $this.friends = res.data.data;
        },function(res){
          $this.$message.error('获取好友列表失败！');
        })
      },

      addFriend(nickname, cbOk, cbErr) {
        var self = this;
        self.$axios.put(apiLinks.friends.addFriend, 
          {
            nickname:nickname
          },
          cbOk, cbErr
        )
      },

      getAllFriends(cbOk, cbErr) {
        var self = this;
        self.$axios.get(apiLinks.friends.all, null,cbOk, cbErr)
      },

      findFriendByNickname(nickname, cbOk, cbErr){
        var self = this;
        self.$axios.post(apiAuth.userInfoByNickname,
          {
            nickname:nickname
          }, cbOk, cbErr
        )
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
  .el-card{
    border-width: 0px;
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
  .el-form-item:last-child{
    margin-bottom: 0px;
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