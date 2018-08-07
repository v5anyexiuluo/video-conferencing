<template>
	<div>
		<div style="height: 40px;line-height: 40px;border-bottom: 2px solid gray;text-align: right;padding-right: 20px;background-color: #ebeef5;">
			<a href="javascript:void(0)" @click="dialogFormVisible = true">发起群聊</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">新建群组</a>
		</div>
		<div>
			<div style="height: 40x;line-height: 40px;text-align: left;padding-left: 20px;background-color: #f7f7f7;">
				<span>我的群组</span>
			</div>
			<div style="padding: 20px;">
				<el-tree :data="groups" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		<el-dialog title="请选择一个群组聊天" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="群组" :label-width="formLabelWidth">
		      <el-select v-model="form.groups" placeholder="选择群组">
		        <el-option label="群组一" value="shanghai"></el-option>
		        <el-option label="群组二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>	
	</div>
</template>
<script>
  export default {
    data() {
      return {
      	dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
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
        },
        groups: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    name: 'FriendsGroup',
    methods: {
      handleNodeClick(data) {
        console.log(data);
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
        axios.get('/groups/find_all_group')
          .then(function(response) {
            if(response.code == 0) {
              this.allGroups = response.data;
              console.log(response.msg);
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
            this.allMember[groupId] = response.data; 
            console.log(response.msg);
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
    }
  };
</script>
<style>
	
</style>