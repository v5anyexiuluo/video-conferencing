<template>
	<div>
		<div class="main-actions">
			<a href="javascript:void(0)" @click="dialogAddFriendVisible = true">添加好友</a>
      <a href="javascript:void(0)" @click="dialogAddDepartmentVisible = true">添加分组</a>
		</div>
		<div>
			<div class="main-title">
				<span>我的好友</span>
			</div>
			<div style="padding: 20px;">
				<div class="hidden-sm-and-up card-wrap">
          <el-card v-for="department in departments" :key="department.department_id" class="full-width margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>{{department.department_name}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit" @click="dialogModifyDepartmentNameVisible=true;formUpdateDepartmentName.departmentId=department.department_id"></i>
                <i class="el-icon-delete" @click="handleDelDepartment(department.department_id)"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="department.departmemt_members" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in department.departmemt_members" :key="item.phone" class="card-item"><span>{{item.nickname}}</span><span><i @click="dialogMoveFriendToDepartmentVisible=true;formMoveFriendToDepartment.departmentId=department.department_id;formMoveFriendToDepartment.userId=item.id;">移动</i>&nbsp;<i @click="handlerDelFriend(item.id)">删除</i>&nbsp;</span></li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-lg-and-up hidden-xs-only card-wrap">
          <el-card v-for="(department, index) in departments" :key="department.department_id" :class="[index%2!=0? 'one-second margin-l-2P margin-b-20':'one-second margin-b-20']">
          <!-- <el-card class="one-second margin-b-20"> -->
            <div slot="header" class="card-title clearfix">
              <span>{{department.department_name}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit" @click="dialogModifyDepartmentNameVisible=true;formUpdateDepartmentName.departmentId=department.department_id"></i>
                <i class="el-icon-delete" @click="handleDelDepartment(department.department_id)"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="department.departmemt_members" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in department.departmemt_members" :key="item.phone" class="card-item"><span>{{item.nickname}}</span><span><i @click="dialogMoveFriendToDepartmentVisible=true;formMoveFriendToDepartment.departmentId=department.department_id;formMoveFriendToDepartment.userId=item.id;">移动</i>&nbsp;<i @click="handlerDelFriend(item.id)">删除</i>&nbsp;</span></li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-md-and-down card-wrap">
          <el-card v-for="(department, index) in departments" :key="department.department_id" :class="[index%3!=0? 'one-third margin-l-2P margin-b-20':'one-third margin-b-20']">
            <div slot="header" class="card-title clearfix">
              <span>{{department.department_name}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit" @click="dialogModifyDepartmentNameVisible=true;formUpdateDepartmentName.departmentId=department.department_id"></i>
                <i class="el-icon-delete" @click="handleDelDepartment(department.department_id)"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="department.departmemt_members" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in department.departmemt_members" :key="item.phone" class="card-item"><span>{{item.nickname}}</span><span><i @click="dialogMoveFriendToDepartmentVisible=true;formMoveFriendToDepartment.departmentId=department.department_id;formMoveFriendToDepartment.userId=item.id;">移动</i>&nbsp;<i @click="handlerDelFriend(item.id)">删除</i>&nbsp;</span></li>
              </ul>
            </scroll>
          </el-card>
        </div>
			</div>
		</div>
    <el-dialog title="添加好友" custom-class="start-meeting" width="400px" center :visible.sync="dialogAddFriendVisible">
      <el-form :model="formAddFriend" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="formAddFriend.nickName" @focus="formAddFriend.formError=''"></el-input>
        </el-form-item>
        <el-form-item label="选择分组">
          <el-select v-model="formAddFriend.departmentId" collapse-tags style="width: 100%;" placeholder="选择分组">
            <el-option
              v-for="(item,index) in departments"
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
        <el-button type="primary" @click="handleAddFriend">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加分组" custom-class="start-meeting" width="400px" center :visible.sync="dialogAddDepartmentVisible">
      <el-form :model="formAddDepartment" label-width="80px">
        <el-form-item label="组名">
          <el-input v-model="formAddDepartment.departmentName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddDepartmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddDepartment">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改好友分组" custom-class="start-meeting" width="400px" center :visible.sync="dialogMoveFriendToDepartmentVisible">
      <el-form :model="formMoveFriendToDepartment" label-width="80px">
        <el-form-item label="选择新组">
          <el-select v-model="formMoveFriendToDepartment.newDepartmentId" collapse-tags style="width: 100%;" placeholder="选择新组">
            <el-option
              v-for="(item,index) in filteDepartments"
              :key="item.department_id"
              :label="item.department_name"
              :value="item.department_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMoveFriendToDepartmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerMoveMember">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改分组名称" custom-class="start-meeting" width="400px" center :visible.sync="dialogModifyDepartmentNameVisible">
      <el-form :model="formUpdateDepartmentName" label-width="80px">
        <el-form-item label="分组名称">
          <el-input v-model="formUpdateDepartmentName.departmentName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyDepartmentNameVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateDepartmentName">确 定</el-button>
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
  import utils from '@/assets/js/utils.js'
  export default {
    data() {
      return {
        dialogAddFriendVisible: false,
        dialogAddDepartmentVisible: false,
        dialogModifyDepartmentNameVisible: false,
        dialogMoveFriendToDepartmentVisible: false,
        pulldown: true,
        friends: [],
        formAddFriend: {
          nickName: '',
          departmentId: '',
          formError: ''
        },
        formAddDepartment: {
          departmentName: ''
        },
        formUpdateDepartmentName: {
          departmentId: '',
          departmentName: ''
        },
        formMoveFriendToDepartment: {
          departmentId: '',
          newDepartmentId: '',
          userId: ''
        },
        departments:null,
        curDepartment:null,

      };
    },
    name: 'FriendsGroup',
    components: {
      scroll: Scroll
    },
    created: function(){
      this.refreshDepartments();
    },
    mounted: function() {
      
    },
    methods: {
      handleAddFriend(){
        var $this = this;
        $this.findFriendByNickname($this.formAddFriend.nickName, function(res){
          $this.addFriend($this.formAddFriend, function(res){
            $this.$message({
              message: '添加好友成功！',
              type: 'success'
            });
            $this.dialogAddFriendVisible=false;
            $this.refreshDepartments();
          },function(res){
            $this.$message.error('添加好友失败！'+res.msg);
          })
        },function(res){
          $this.formAddFriend.formError = '用户不存在！'
        })
      },

      handlerDelFriend(userId){
        var $this = this;
        $this.deleteFriend(userId, function(res){
          $this.$message({
            message: '删除好友成功！',
            type: 'success'
          });
          $this.refreshDepartments();
        },function(res){
          $this.$message.error('删除好友失败！');
        })
      },

      handleAddDepartment(){
        var $this = this;
        $this.addDepartment($this.formAddDepartment.departmentName, function(res){
          $this.$message({
            message: '添加分组成功！',
            type: 'success'
          });
          $this.dialogAddDepartmentVisible = false;
          $this.refreshDepartments();
        },function(res){
          $this.$message.error('添加分组失败！');
        })
      },

      handleUpdateDepartmentName(){
        var $this = this;
        $this.updateDepartment($this.formUpdateDepartmentName.departmentId, $this.formUpdateDepartmentName.departmentName, function(res){
          $this.$message({
            message: '修改分组名称成功！',
            type: 'success'
          });
          $this.dialogModifyDepartmentNameVisible = false;
          $this.refreshDepartments();
        },function(res){
          $this.$message.error('修改分组名称失败！');
        })
      },

      handleDelDepartment(departmentId){
        var $this = this;
        $this.deleteDepartment(departmentId, function(res){
          $this.$message({
            message: '删除分组成功！',
            type: 'success'
          });
          $this.refreshDepartments();
        },function(res){
          $this.$message.error('删除分组失败！');
        })
      },

      handlerMoveMember(){
        var $this = this;
        $this.moveMemberToDepartment($this.formMoveFriendToDepartment.departmentId, $this.formMoveFriendToDepartment.newDepartmentId, $this.formMoveFriendToDepartment.userId, function(res){
          $this.$message({
            message: '移动分组成功！',
            type: 'success'
          });
          $this.dialogMoveFriendToDepartmentVisible = false;
          $this.refreshDepartments();
        },function(res){
          $this.$message.error('移动分组失败！');
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


      refreshDepartments(){
        var $this = this;
        $this.getAllDepartments(function(res){
          $this.departments = res.data.data;
        },function(res){
          $this.$message.error('获取用户分组失败！');
        })
      },

      addFriend(newFriend, cbOk, cbErr) {
        var self = this;
        self.$axios.put(apiLinks.friends.add, 
          {
            nickname: newFriend.nickName,
            department_id: newFriend.departmentId.toString()
          },
          cbOk, cbErr
        )
      },

      deleteFriend(userId, cbOk, cbErr){
        var $this = this;
        $this.$axios.delete(apiLinks.friends.delete, {
          deleted_user_id: userId.toString()
        }, cbOk, cbErr)
      },

      getAllFriends(cbOk, cbErr) {
        var self = this;
        self.$axios.get(apiLinks.friends.all, null, cbOk, cbErr)
      },

      findFriendByNickname(nickname, cbOk, cbErr){
        var self = this;
        self.$axios.post(apiAuth.userInfoByNickname,
          {
            nickname:nickname
          }, cbOk, cbErr
        )
      },

      getAllDepartments(cbOk, cbErr){
        var $this = this;
        this.$axios.get(apiLinks.friends.allDepartments, null, cbOk, cbErr)
      },

      addDepartment(departmentName, cbOk, cbErr){
        var $this = this;
        $this.$axios.put(apiLinks.friends.addDepartment, {
          department_name: departmentName
        }, cbOk, cbErr)
      },

      updateDepartment(departmentId, departmentName, cbOk, cbErr){
        var $this = this;
        $this.$axios.post(utils.handleParamInUrl(apiLinks.friends.updateDepartment,{
          department_id: departmentId
        }), {
          department_name: departmentName
        }, cbOk, cbErr)
      },

      deleteDepartment(departmentId, cbOk, cbErr){
        var $this = this;
        $this.$axios.delete(utils.handleParamInUrl(apiLinks.friends.deleteDepartment,{
          department_id: departmentId
        }), null, cbOk, cbErr)
      },

      moveMemberToDepartment(departmentId, newDepartmentId, userId, cbOk, cbErr){
        var $this = this;
        $this.$axios.post(utils.handleParamInUrl(apiLinks.friends.updateDepartmentOfFriend,{
          department_id: departmentId
        }), {
          new_department_id: newDepartmentId.toString(),
          move_user_id: userId.toString()
        }, cbOk, cbErr)
      },

    },
    computed:{
      filteDepartments: function(){
        var $this = this;
        if(!$this.departments){
          return [];
        }
        var departments = [];
        for (var i = 0; i < $this.departments.length; i++) {
          if($this.departments[i].department_id!=$this.formMoveFriendToDepartment.departmentId){
            departments.push($this.departments[i])
          }
        }
        return departments;
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
  .card-actions i{
    margin-left: 10px;
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