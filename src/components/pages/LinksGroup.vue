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
          <el-card v-for="group in groups" :key="group.id" class="full-width margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>{{group.label}}</span>
              <el-button style="float: right; padding: 3px 0" type="text"></el-button>
            </div>
            <!-- <ul class="card-item-wrap" ref="wrapper">
              <li v-for="item in group.children" :key="item.id" class="card-item">{{item.label}}</li>
            </ul> -->
            <scroll :data="group.children" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in group.children" :key="item.id" class="card-item">{{item.label}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-lg-and-up hidden-xs-only card-wrap">
          <el-card v-for="group in groups" :key="group.id" class="one-second margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>{{group.label}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <scroll :data="group.children" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in group.children" :key="item.id" class="card-item">{{item.label}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
        <div class="hidden-md-and-down card-wrap">
          <el-card v-for="group in groups" :key="group.id" class="one-third margin-b-20">
            <div slot="header" class="card-title clearfix">
              <span>{{group.label}}</span>
              <div class="fright card-actions">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              <!-- <el-button style="float: right; padding: 3px 0" type="text"></el-button> -->
            </div>
            <scroll :data="group.children" style="height: 120px;overflow: hidden;">
              <ul class="card-item-wrap">
                <li v-for="item in group.children" :key="item.id" class="card-item">{{item.label}}</li>
              </ul>
            </scroll>
          </el-card>
        </div>
			</div>
		</div>
		<el-dialog title="请选择一个群组聊天" custom-class="start-meeting" width="400px" center :visible.sync="dialogMakeMeetingVisible">
		  <el-form :model="form" label-width="80px">
		    <el-form-item label="群组">
		      <el-select v-model="form.groups" placeholder="选择群组">
		        <el-option label="群组一" value="shanghai"></el-option>
		        <el-option label="群组二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogMakeMeetingVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogMakeMeetingVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
    <el-dialog title="新建群组" custom-class="start-meeting" width="400px" center :visible.sync="dialogCreateGroupVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="组名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="导入好友">
          <el-select v-model="form.groups" multiple collapse-tags style="width: 100%;" placeholder="选择群组">
            <el-option
              v-for="(item,index) in groups"
              :key="item.label"
              :label="item.label"
              :value="index.toString()">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateGroupVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogCreateGroupVisible = false">确 定</el-button>
      </div>
    </el-dialog>  
	</div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Scroll from '@/components/common/Scroll.vue'
  export default {
    data() {
      return {
        dialogMakeMeetingVisible: false,
        dialogCreateGroupVisible: false,
        pulldown: true,
        //个人信息
        selfInfo: null,
        /*
        {
          nickname:"a",
          phone:"15029057276",
          realname:"shixinxin",
          email:"575893505@qq.com",
          headimg:"String"
        }
        */
        //所有群
        allGroups: [],
        /*
        allGroups: [{
            id:10001,
            groupName:"视频会议",
            founderId:101,
            createTime:1533183890720,
            available:1
          }
        ],
        */
        //所有成员
        allMembers:[],
        /*
        allMembers: [(
            10001,
            [{
                nickname:"a",
                phone:"15029057276",
                realname:"shixinxin",
                email:"575893505@qq.com",
                headimg:"String"
              },{
                nickname:"b",
                phone:"15029057277",
                realname:"linxiaoming",
                email:"575893202@qq.com",
                headimg:"String"
              }
            ]
          )
        ],
        */
        form: {
          groups: ''
        }
      }
    },
    name: 'FriendsGroup',
    components: {
      scroll: Scroll
    },
    methods: {
      FindObjectByID(array, id){
        return array.findIndex((value, index, arr) => {
          value.id = id
        })
      },
      //创建群
      createGroup(groupName) {
        axios.put('/groups/create', {
          params: {
            group_name:groupName
          }
        })
        .then(function(response){
          if(response.code == 0) {
            this.allGroups.push(response.data);
            appendGroupUser(response.data.group_id, this.selfInfo);
            console.log(response.msg);
          } else {
            console.log(response.msg);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      },

      //群组添加用户
      appendGroupUser(groupId, nickname) {
        axios.put('/groups/append', {
          params: {
            group_id:groupId,
            nickname:nickname
          }
        })
        .then(function(response){
          if(response.code == 0) {
            var userInfo = getUserInfo(nickname);
            if(this.allMember.hasOwnProperty(groupId)) {
              this.allMember[(groupId)].push(userInfo);
            } else {
              this.allMember[(groupId)] = [];
              this.allMember[(groupId)].push(info);
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

      //删除群组中的用户
      deleteGroupUser(groupId, nickname) {
        axios.delete('/groups/delete', {
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
        axios.post('/group/update', {
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
      //查找用户的所有群组
      findAllGroup() {
        var $this = this;
        axios.get('/groups/find_all_group')
          .then(function(response) {
            if(response.code == 0) {
              var groups = response.data;
              $this.allGroups = groups;
              groups.map(function(item){
                $this.allGroups[FindObjectByID($this.allGroups,item.id)]['members']=$this.findAllMember(item.id)
              })
              // console.log(response.msg);
            } else {
              console.log(response.msg);
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      //查找群组中的所有成员
      findAllMember(groupId) {
        axios.post('/groups/find_all_member',{
          params: {
            group_id: groupId
          }
        })
        .then(function(response) {
          if(response.code == 0) {
            return response.data; 
            // console.log(response.msg);
          } else {
            console.log(response.msg);
          }
        })
        .catch(function(err) {
          console.log(err)
        })
      },
      //获取本人信息
      getSelfInfo() {
        axios.get('get_self_info')
        .then(function(response) {
          if(response.code == 0) {
            this.selfInfo = response.data;
            console.log(response.msg);
          } else {
            console.log(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        })
      },

      //根据昵称获取用户信息
      getUserInfo(nickname) {
        axios.get('get_user_info', {
          params: {
            nickname:nickname
          }
        })
        .then(function(response){
          if(response.code == 0) {
            console.log(response.msg);
            return response.data;
          } else {
            console.log(response.msg);
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