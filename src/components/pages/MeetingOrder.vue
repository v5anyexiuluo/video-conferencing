<template>
	<div>
		<el-form class="once" :rules="rules" ref="form" :model="form" label-width="30%">
			<el-form-item label="会议名称：" prop="meeting_name">
				<el-input v-model="form.meeting_name" placeholder="请输入主题" clearable></el-input>
			</el-form-item>

			<el-form-item label="开始时间：">
        <div class="block">
			    <el-date-picker
			      v-model="form.start_time"
			      type="datetime"
			      placeholder="选择日期时间"
			      style="width: 100%"
			      value-format="timestamp"
			    >
			    </el-date-picker>
			  </div>
      </el-form-item>

			<el-form-item label="主持人：" prop="founder_id">
				<el-input v-model="form.founder_id" placeholder="请输入主持人" clearable></el-input>
			</el-form-item>

			<el-form-item label="参会人员：" prop="founder_member">
				<el-col :span="20" >
          <div class="mmember">
              <div v-if="tempMember.length==0 && tempGroup.length==0">
                <div style="color: #bcbcbc">请选择参会人员</div>
              </div>
              <div v-else>
                <el-tag v-for="mem in tempMember">{{mem}}</el-tag>
                <el-tag v-for="gro in tempGroup">{{gro.group_name}}</el-tag>
              </div>
          </div>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="selectDialogVisible = true">选择</el-button>
				</el-col>
			</el-form-item>

			<el-form-item label="通知方式：" prop="founder_member">
        <el-checkbox v-model="c_email">发送邮件</el-checkbox>
        <el-checkbox v-model="c_message">发送短信</el-checkbox>
      </el-form-item>
      <el-form-item label="通知时间：" prop="founder_member">
        <el-checkbox v-model="c_once">立即发送</el-checkbox>
        <el-checkbox v-model="c_five">前五分钟</el-checkbox>
      </el-form-item>

      <el-form-item>
				<el-button type="primary" @click="handleCreateMeeting">预约会议</el-button>
				<el-button>取消会议</el-button>
			</el-form-item>
		</el-form>

		<el-dialog
		  :visible.sync="selectDialogVisible"
		  title="选择会议成员"
		  width="70%"
		>
      <el-row>
        <el-col :span='8'>
  				<el-card class="list">
  					<el-collapse v-model="activeNames" @change="handleChange" style="text-align: left;">
  					  <el-collapse-item title="我的好友" name="1">
  					    <el-collapse class="s_list" v-model="activeNames1" @change="handleChange">
  					  		<el-collapse-item 
                    v-for="(department, index) of departments"
                    :key="department.department_id" 
                    :title="department.department_name" 
                    :name="department.department_id"
                  >
  					  			<div 
                      v-for="item in department.departmemt_members"
                      :key="item.phone"
                    >
                      {{item.nickname}}
                      <i 
                        class="el-icon-circle-plus"
                        @click="handleAddTempMember(item.nickname)" 
                        style="float: right;"
                      >
                      </i>
                    </div>
  					  		</el-collapse-item>
  					  	</el-collapse>
  					  </el-collapse-item>
  					  <el-collapse-item title="我的群组" name="2">
  					    <div
                  v-for="group in groups"
                  :key="group.group_id"
                >
                  {{group.group_name}}
                  <i 
                    class="el-icon-circle-plus" 
                    @click="handleAddTempGroup(group.group_id, group.group_name)"
                    style="float: right;"
                  >
                  </i>
                </div>
  					  </el-collapse-item>
  					</el-collapse>
          </el-card>
        </el-col>
        <el-col :span='8'>
          <el-card class="select">
            <div slot="header" class="clearfix">
              <span>好友</span>
            </div>
            <div 
              class="m_list"
              v-for="(tm,index) in tempMember"
              :key="index"
            >
              {{tm}}
              <i
                class="el-icon-circle-close"
                @click="handleDeleteTempMember(tm)"
              >
              </i>
            </div>
          </el-card>
        </el-col>
        <el-col :span='8'>
          <el-card class="select">
            <div slot="header" class="clearfix">
              <span>群组</span>
            </div>
            <div 
              class="m_list"
              v-for="(tm,index) in tempGroup"
              :key="index"
            >
              {{tm.group_name}}
              <i
                class="el-icon-circle-close"
                @click="handleDeleteTempGroup(tm)"
              >
              </i>
            </div>
          </el-card>
        </el-col>
    	</el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirmMember">确 认</el-button>
        <el-button @click="selectDialogVisible = false">取 消</el-button>
      </span>
		</el-dialog>
	</div>
</template>
<script>
import {apiAuth,apiLinks,apiMeeting} from '@/api/api.js';
export default {
  name: 'MeetingJoin',
	data() {
		return {
			c_email: false,
			c_message: false,
			c_once: false,
			c_five: false,
			activeNames: [],
			activeNames1: [],
			MeetingInfo: null,
			date:null,
			form: {
				meeting_name: '新建会议',
				start_time: 0,
				founder_id: '002',
				member:[],
				passwd: '123456',
				repasswd: '123456'
	    },
      form1: {
      	name: []
      },
      dialogVisible: false,
      selectDialogVisible: false,
      selectVisible: false,
      pwdType: true,
      pwdType2: true,
      departments: [],
      groups: [],
      tempMember: [],
      tempGroup: [],
      tempMemberSet: new Set(),
      tempGroupSet: new Set(),
      tempMeetingMemberSet: new Set(),
      rules: {
        meeting_name: [
          {
            required: true, message: '请输入会议名称', trigger: 'blur' 
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
              callback(new Error('请输入会议名称'));
              } else {
              callback();
              }
            },
            trigger: 'blur'
          }
        ],
        founder_id: [
          {
          required: true, message: '请输入主持人', trigger: 'blur' 
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入主持人'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        passwd: [
          {
            required: true, message: '请输入密码', trigger: 'blur' 
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                if (this.form.repasswd !== '') {
                this.$refs.form.validateField('repasswd');
                }
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        repasswd: [
          {
            required: true, message: '请确认密码', trigger: 'blur' 
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.form.passwd) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
			}
    }
	},
  mounted() {
    this.refreshDepartments();
    this.refreshGroups();
  },
	methods: {
		hhh() {
			alert(this.date);
			console.log(this.date);
		},
		onSubmit() {
	    console.log('submit!');
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
         	done();
      })
      .catch(_ => {});
    },
    handleChange(value) {
      // this.selectedOptions = [];
      this.form1.name.push(value[1]);
	  },

    refreshGroups() {
      var $this = this;
      $this.getAllGroups(function(res){
        $this.groups = res.data.data;
      },function(res){
        $this.$message.error('获取用户群组失败！');
      })
    },

    getAllGroups(cbOk, cbErr) {
      var $this = this;
      this.$axios.get(apiLinks.groups.all, null, cbOk, cbErr);
    },

    handleAddTempGroup(id, g) {
      this.tempGroupSet.add({group_id:id,group_name:g});
      this.tempGroup=Array.from(this.tempGroupSet);
    },

    handleDeleteTempGroup(m) {
      this.tempGroupSet.delete(m);
      this.tempGroup=Array.from(this.tempGroupSet);
    },

    refreshDepartments() {
      var $this = this;
      $this.getAllDepartments(function(res){
        $this.departments = res.data.data;
      },function(res){
        $this.$message.error('获取用户分组失败！');
      })
    },

    getAllDepartments(cbOk, cbErr) {
      var $this = this;
      this.$axios.get(apiLinks.friends.allDepartments, null, cbOk, cbErr)
    },

    handleAddTempMember(m) {
      this.tempMemberSet.add(m);
      this.tempMember=Array.from(this.tempMemberSet);
    },

    handleDeleteTempMember(m) {
      this.tempMemberSet.delete(m);
      this.tempMember=Array.from(this.tempMemberSet);
    },

    handleConfirmMember() {
      var $this = this;
      $this.selectDialogVisible = false;
      for (var i = $this.tempMember.length - 1; i >= 0; i--) {
        $this.tempMeetingMemberSet.add($this.tempMember[i]);
      }
      for (var i = $this.tempGroup.length - 1; i >= 0; i--) {
        console.log("会议id" + $this.tempGroup[i].group_id);
        $this.getGroupsMember($this.tempGroup[i].group_id.toString(), function(res) {
          var re = res.data;
          console.log("请求到的数据:");
          console.log(re.data);
          for(var i = re.data.length-1; i>=0; i--) {
            console.log("获取群组成员：" + re.data[i].nickname);
            $this.tempMeetingMemberSet.add(re.data[i].nickname);
          }
        }, function(err){
          $this.$message.error('获取群组成员失败');
        });
      }
    },

    handleCreateMeeting() {
      var $this = this;
      $this.form.member = Array.from($this.tempMeetingMemberSet);
      $this.createMeeting(form.member, form.meeting_member, form.meeting_time, function(res){
      	$this.$message.success('创建会议成功');
      },function(err) {
        $this.$message.error('创建会议失败');
      });
    },

    createMeeting(m_name, cbOk, cbErr) {
      this.$axios.put(apiMeeting.order.create,{
        meeting_name: m_name,
        meeting_member: m_member,
        meeting_time: m_time
      }, cbOk, cbErr)
    },

    getGroupsMember(id, cbOk, cbErr) {
      this.$axios.post(apiLinks.groups.members,{
        group_id: id
      }, cbOk, cbErr)
    }
	},
	computed: {
		// filteUsers: function(){
		// 	var $this = this;
		// 	var friends = [];
		// 	for(var i=0;i<$this.friends.length;i++){
		// 	    friends.push($this.friends[i])
		// 	}
		// 	return friends;
		// }
	},
	watch: {

	}
}
</script>
<style scoped>
	::-webkit-scrollbar {display: none}
  .m_list {
    float: left;
    margin-right: 30px;
  }
  .once {
    width: 70%; 
    margin-top: 50px;
  }
  .mmember {
    border: solid;
    border-width: thin; 
    border-color: #dcdfe6; 
    border-radius: 4px; 
    text-align: left; 
    padding-left: 5px;
  }
  .list {
    height: 250px; 
    overflow: scroll;
  }
  .s_list {
    width: 80%;
    float: right;
  }
  .select {
    height: 250px;
    text-align: left; 
    overflow: scroll;
  }
</style>