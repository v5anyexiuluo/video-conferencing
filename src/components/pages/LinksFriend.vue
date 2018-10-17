<template>
	<div class="item-container full-width full-height">
		<div class="item-list fleft full-height" style="position: relative;">
      <div class="list-search">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!-- <ul class="full-element">
        <li v-for="(department, index) in departments" @click="curDepartment=department;depMembers=department.departmemt_members" class="item" :class="{'selected':department.department_id==curDepartment.department_id}">
          <img src="https://picsum.photos/30/30" alt="头像">
          <span>{{department.department_name}}</span>
        </li>
      </ul> -->
      <el-collapse v-model="activeName" @change="handleDepChange" class="full-element" style="position: absolute;top: 60px;bottom: 60px;width: 100%;overflow-y: auto;" accordion>
        <el-collapse-item
          v-for="(department, index) in departments"
          :key="index"
          class="item"
          :class="{'selected':department.department_id==curDepartment.department_id}"
          :name="department.department_id"
        >
          <template slot="title" class="cece">
            <span>{{department.department_name}}</span>
          </template>
          <ul>
            <li
              v-for="(item, index) in depMembers"
              :key="index"
              @click="handleJoinChat(item)"
            >
              <img src="https://picsum.photos/30/30" alt="头像">
              <span>{{item.nickname}}</span>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <div class="list-action" style="width: 100%;position: absolute;bottom: 0px;left: 0px;">
        <el-button type="text" @click="dialogAddFriendVisible=true;">添加好友</el-button>
        <el-button type="text" @click="dialogAddDepartmentVisible=true;">添加分组</el-button>
      </div>
    </div>
    <div v-if="showInfo" class="item-detail full-height">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本信息" name="first" class="h-full-container">
          <img src="https://picsum.photos/200/200" alt="">
          <div class="group-info">
            <p><span>群名称:</span><span>{{curDepartment? (curDepartment.department_name? curDepartment.department_name:''):''}}</span></p>
            <p><span>创建时间:</span><span></span></p>
            <p><span>分组简介:</span><span>暂无</span></p>
            <!-- 做好的设计应该是后台返回的分组项里有一个属性标明这是默认分组 -->
            <p v-if="curDepartment.department_name!='默认分组'">
              <el-button type="text" @click="handleDelDepartment">删除分组</el-button>
              <el-button type="text" @click="dialogModifyDepartmentNameVisible=true;">修改分组信息</el-button>
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="组内成员" name="second">
          <el-table
            :data="depMembers"
            style="width: 100%;text-align: left;">
            <el-table-column
              fixed
              prop="nickname"
              label="昵称"
              width="180">
              <template slot-scope="scope">
                <router-link :to="{name:'member',params:{id: scope.row.id}}" style="cursor: pointer;text-decoration: none;color: inherit;">
                  <img :src="scope.row.headimg? scope.row.headimg:'https://picsum.photos/20/20'" alt="">
                  <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
                </router-link>
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
                  @click="handlerDelFriend(scope.row.id)"
                  type="text"
                  size="small">
                  移除
                </el-button>
                <el-button
                  @click="dialogMoveFriendToDepartmentVisible=true;formMoveFriendToDepartment.userId=scope.row.id;"
                  type="text"
                  size="small">
                  移动
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: left;padding-top: 10px;">
            <el-button type="text" @click="handleAddFriendInner">添加成员</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
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
    <el-dialog title="修改好友分组" custom-class="start-meeting" width="400px" center :visible.sync="dialogMoveFriendToDepartmentVisible">
      <el-form :model="formMoveFriendToDepartment" label-width="80px">
        <el-form-item label="选择新组">
          <el-select v-model="formMoveFriendToDepartment.newDepartmentId" collapse-tags style="width: 100%;" placeholder="选择新组">
            <el-option
              v-for="item in filteDepartments"
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
    <el-dialog title="添加好友" custom-class="start-meeting" width="400px" center :visible.sync="dialogAddFriendVisible">
      <el-form :model="formAddFriend" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="formAddFriend.nickName" @focus="formAddFriend.formError=''"></el-input>
        </el-form-item>
        <el-form-item label="选择分组">
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
        <el-button type="primary" @click="handleAddFriend">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Scroll from '@/components/common/Scroll.vue'
  import {apiAuth, apiLinks, apiMeeting} from '@/properties/api.js'
  import {mapGetters, mapMutations} from 'vuex';
  import utils from '@/assets/js/utils.js'
  export default {
    data() {
      return {
        activeName: '1',
        departments:[],
        curDepartment:{},
        depMembers:[],
        activeTab: 'first',
        dialogAddDepartmentVisible: false,
        formAddDepartment: {
          departmentName:''
        },
        dialogModifyDepartmentNameVisible: false,
        formUpdateDepartmentName: {
          departmentName:''
        },
        dialogMoveFriendToDepartmentVisible: false,
        formMoveFriendToDepartment:{
          newDepartmentId: '',
          userId: ''
        },
        dialogAddFriendVisible: false,
        formAddFriend:{
          nickName: '',
          departmentId: '',
          formError: ''
        },
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
      this.refreshDepartments();
    },
    methods: {
      handleDepChange(id){
        var $this = this;
        var ret = $this.getDepartmentById(id);
        if(ret!=null){
          $this.curDepartment = ret;
          $this.depMembers = ret.departmemt_members;
        }        
      },
      refreshDepartments(){
        var $this = this;
        $this.getAllDepartments(function(res){
          $this.departments = res.data.data;
          $this.depMembers = $this.curDepartment.member
        },function(res){
          $this.$message.error('获取用户分组失败！');
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

      handleDelDepartment () {
        var $this = this;
        if(Object.keys($this.curDepartment).length==0){
          console.log("NULL")
          return;
        }
        $this.deleteDepartment($this.curDepartment.department_id, function(res) {
          $this.$message({
            message: '删除分组成功！',
            type: 'success'
          });
          $this.refreshDepartments();
        },function(res){
          $this.$message.error('删除分组失败！');
        })
      },

      handleUpdateDepartmentName(){
        var $this = this;
        if(Object.keys($this.curDepartment).length==0){
          return;
        }
        $this.updateDepartment($this.curDepartment.department_id, $this.formUpdateDepartmentName.departmentName, function(res){
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

      handlerMoveMember(){
        var $this = this;
        $this.moveMemberToDepartment($this.curDepartment.department_id, $this.formMoveFriendToDepartment.newDepartmentId, $this.formMoveFriendToDepartment.userId, function(res){
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

      handleAddFriendInner() {
        this.dialogAddFriendVisible = true
        this.formAddFriend.departmentId = this.curDepartment.department_id
      },

      handleAddFriend() {
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
            $this.$message.error('添加好友失败！'+res.data.msg);
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

      handleJoinChat(item) {
        this.addChatItem({type:'friend',data:item});
        this.$router.push({name:'chatlist'});
      },

      getAllDepartments(cbOk, cbErr){
        var $this = this;
        this.$axios.get(apiLinks.friends.allDepartments, null, cbOk, cbErr)
      },

      getDepartmentById(id){
        var $this = this;
        return $this.departments.find((value, index, arr) => {
          return value.department_id == id;
        })
      },
      // utils.handleParamInUrl
      addDepartment(departmentName, cbOk, cbErr){
        var $this = this;
        $this.$axios.put(apiLinks.friends.addDepartment, {
          department_name: departmentName
        }, cbOk, cbErr)
      },

      // bug 删除分组
      deleteDepartment(departmentId, cbOk, cbErr){
        var $this = this;
        $this.$axios.delete(utils.handleParamInUrl(apiLinks.friends.deleteDepartment,{
          department_id: departmentId
        }), null, cbOk, cbErr)
      },

      updateDepartment(departmentId, departmentName, cbOk, cbErr){
        var $this = this;
        $this.$axios.post(utils.handleParamInUrl(apiLinks.friends.updateDepartment,{
          department_id: departmentId
        }), {
          department_name: departmentName
        }, cbOk, cbErr)
      },

      findFriendByNickname(nickname, cbOk, cbErr){
        var $this = this;
        $this.$axios.get(utils.handleParamInUrl(apiAuth.userInfoByNickname,
          {
            nickname:nickname
          }),null, cbOk, cbErr
        )
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

      addFriend(newFriend, cbOk, cbErr) {
        var $this = this;
        $this.$axios.post(apiLinks.friends.add, 
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

      ...mapMutations(['addChatItem'])
    },
    mounted: function() {
      
    },
    watch:{

    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      showInfo () {
        return this.curDepartment.department_name
      },
      filteDepartments: function(){
        var $this = this;
        if(!$this.departments){
          return [];
        }
        var departments = [];
        for (var i = 0; i < $this.departments.length; i++) {
          if($this.departments[i].department_id!=$this.curDepartment.department_id){
            departments.push($this.departments[i])
          }
        }
        return departments;
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
    height: 60px;
    line-height: 60px;
    padding: 0px 10px;
    background-color: #f5f7fa;
    cursor: pointer;
    box-sizing: border-box;
  }
  .list-search{
    border-bottom: 1px solid #dcdfe6;
  }
  .list-action{
    border-top: 1px solid #dcdfe6;
  }
  .el-collapse{
    border-width: 0px;
  }
  .item{
    text-align: left;
    border-bottom: 1px dashed #dcdfe6;
    cursor: pointer;
  }
  .item.selected{
    background-color: aliceblue;
  }
  .item >>> .el-collapse-item__header, .item >>> .el-collapse-item__wrap{
    border-bottom-width: 0px;
    background-color: transparent;
  }
  .item >>> .el-collapse-item__header{
    padding: 0px 10px;
  }
  .item >>> .el-collapse-item__content{
    padding-bottom: 0px;
  }
  .item li{
    padding: 10px 20px;
  }
  .item li:hover{
    background-color: #ebeef5;
  }
  .item img{
    height: 30px;
    width: 30px;
    border-radius: 15px;
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