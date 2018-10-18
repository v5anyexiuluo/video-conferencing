<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>视频会议</el-breadcrumb-item>
      <el-breadcrumb-item>预约会议</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="once" ref="form" :model="form" :rules="rules" label-width="30%">
      <el-form-item label="会议名称：" prop="name">
          <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="主持人：" prop="founder">
          <el-input v-model="form.founder" :disabled="true" clearable></el-input>
      </el-form-item>

      <el-form-item label="开始时间：" prop="start_time">
        <div class="block">
          <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="选择日期时间"
            style="width: 100%"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="通知方式：">
				<div style="text-align: left;">
					<el-checkbox
						v-model="form.formMutiSelects.settings.email_notify"
						label="邮件通知"
					>
					</el-checkbox>
					<el-checkbox
						v-model="form.formMutiSelects.settings.sms_notify"
						label="短信通知"
					>
					</el-checkbox>
				</div>
			</el-form-item>

      <el-form-item label="与会成员：">
        <div style="height: 260px;">
          <el-col :span="11" style="height: 100%;display: flex;flex-wrap: nowrap;flex-direction: column;">
            <div class="tabHeader" style="height: 40px;line-height: 40px; background-color: #f5f7fa;border: 1px solid #ebeef5; border-radius: 4px 4px 0px 0px;">
              <a
                href="javascript:void(0)"
                @click="form.formMutiSelects.curTab=1"
                :class="[form.formMutiSelects.curTab==1? 'activeTab tabItem':'tabItem']"
              >
                群组
              </a>
              <a
                href="javascript:void(0)"
                @click="form.formMutiSelects.curTab=2"
                :class="[form.formMutiSelects.curTab==2? 'activeTab tabItem':'tabItem']"
              >
                好友
              </a>
              <!-- <a href="javascript:void(0)" @click="form.formMutiSelects.curTab=3" :class="[form.formMutiSelects.curTab==3? 'activeTab tabItem':'tabItem']">通知方式</a> -->
            </div>
            <div style="flex: 1;flex-wrap: wrap;overflow-y: scroll;border-left: 1px solid #ebeef5;border-right: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;padding: 10px 0;">
              <div id="tab1" v-show="form.formMutiSelects.curTab==1">
                <el-tree
                  node-key="id"
                  :data="form.formMutiSelects.srcData.groups"
                  :props="form.formMutiSelects.settings.groupsProps"
                  :default-checked-keys="form.formMutiSelects.settings.curid"
                  show-checkbox
                  @check-change="handleTreeCheckChange"
                  ref="groupTree">
                </el-tree>
              </div>
              <div id="tab2" v-show="form.formMutiSelects.curTab==2">
                <el-tree
                  node-key="id"
                  :data="form.formMutiSelects.srcData.friends"
                  :props="form.formMutiSelects.settings.friendsProps"
                  :default-checked-keys="form.formMutiSelects.settings.curid"
                  show-checkbox
                  @check-change="handleTreeCheckChange"
                  ref="friendTree">
                </el-tree>
              </div>
                <!-- <el-checkbox-group style="text-align: left;display: flex;flex-direction: column;align-items: flex-start;" v-model="form.formMutiSelects.tarData.customSel" @change="handleCustomSelect">
                  <el-tag
                    :key="tag"
                    v-for="tag in form.formMutiSelects.settings.dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                      <el-checkbox :label="tag"></el-checkbox>
                  </el-tag>
                </el-checkbox-group>
                <el-input
                  class="input-new-tag"
                  v-if="form.formMutiSelects.settings.inputVisible"
                  v-model="form.formMutiSelects.settings.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
              <!-- </div> -->
            </div>
          </el-col>
          <el-col :span="2" style="height: 100%;display: flex;flex-direction: column;flex-wrap: nowrap;justify-content: center;align-items: center;">
          </el-col>
          <el-col :span="11" style="height: 100%;display: flex;flex-wrap: nowrap;flex-direction: column;">
            <div class="tabHeader" style="height: 40px;line-height: 40px; background-color: #f5f7fa;border: 1px solid #ebeef5; border-radius: 4px 4px 0px 0px;padding-left: 10px;">结果
            </div>
            <div style="flex: 1;flex-wrap: wrap;overflow-y: scroll;border-left: 1px solid #ebeef5;border-right: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;padding: 10px;text-align: left;">
              <ul>
                <li
                  v-show="form.formMutiSelects.tarData.members.length==0"
                  style="color: lightgray;font-style: italic;"
                >
                  好友
                </li>
                <li style="margin-left: 1em; line-height: 15px" v-for="(item,index) in form.formMutiSelects.tarData.members" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectMember from "@/components/common/SelectMember";
import { apiAuth, apiLinks, apiMeeting } from "@/properties/api.js";
import utils from "@/assets/js/utils.js";
export default {
  name: "MeetingOrder",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      form: {
        name: "新建会议",
        founder: "",
        start_time: "",
        formMutiSelects: {
          curTab: 1,
          srcData: {
            groups: [],
            friends: []
          },
          tarData: {
            members: [],
            customSel: []
          },
          settings: {
            groupsProps: {
              children: "children",
              label: "name"
            },
            friendsProps: {
              children: "children",
              label: "name"
            },
            curid: [],
            email_notify: false,
            sms_notify: false,
            dynamicTags: ["标签一", "标签二", "标签三"],
            inputVisible: false,
            inputValue: ""
          }
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入会议名称', trigger: 'blur' },
          { min : 3, max: 20, message: '长度在 3 到 20个字符', trigger: 'blur'}
        ],
        founder: [
          { required: true, message: '请设置主持人', trigger: 'blur' },
        ],
        start_time: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    };
  },
  components: {
    SelectMember
  },
  methods: {
    handleClose(tag) {
      this.form.formMutiSelects.settings.dynamicTags.splice(
        this.form.formMutiSelects.settings.dynamicTags.indexOf(tag),
        1
      );
    },
    showInput() {
      this.form.formMutiSelects.settings.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      var inputValue = this.form.formMutiSelects.settings.inputValue;
      var emailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
      var phoneReg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
      if (emailReg.test(inputValue) || phoneReg.test(inputValue)) {
        this.form.formMutiSelects.settings.dynamicTags.push(inputValue)
        this.form.formMutiSelects.settings.inputVisible = false
        this.form.formMutiSelects.settings.inputValue = ""
      } else {
        this.$message.error("输入不合法！")
        return;
      }
    },

    handleCustomSelect(data) {},

    handleTreeCheckChange() {
      var $this = this;
      // if(checked){
      //  if(typeof(data.children)=="undefined"){
      //    // $this.form.formMutiSelects.tarData.groupsSel.push(item);
      //    $this.addMember(data);
      //  }
      // }else{
      //  if(typeof(data.children)=="undefined"){
      //    // $this.form.formMutiSelects.tarData.groupsSel.push(item);
      //    $this.removeMember(data);
      //  }
      // }
      $this.form.formMutiSelects.tarData.members = [];
      var groups = $this.$refs.groupTree.getCheckedNodes();
      for (var i = 0; i < groups.length; i++) {
        if (typeof groups[i].children == "undefined") {
          $this.addMember(groups[i]);
        }
      }
      var friends = $this.$refs.friendTree.getCheckedNodes();
      for (var i = 0; i < friends.length; i++) {
        if (typeof friends[i].children == "undefined") {
          $this.addMember(friends[i]);
        }
      }
      // groups.forEach(function(item,index){
      //  if(typeof(item.children)=="undefined"){
      //    $this.form.formMutiSelects.tarData.members.push(item.name);
      //  }
      // })
    },

    addMember(item) {
      var $this = this;
      var members = $this.form.formMutiSelects.tarData.members;
      var ret = members.findIndex((value, index, arr) => {
        return value.id == item.id;
      });
      if (ret == -1) {
        $this.form.formMutiSelects.tarData.members.push(item);
      }
      console.log("$this.form.formMutiSelects.tarData.members");
      console.log($this.form.formMutiSelects.tarData.members);
    },

    removeMember(item) {
      var $this = this;
      var members = $this.form.formMutiSelects.tarData.members;
      var ret = members.findIndex((value, index, arr) => {
        return value.id == item.id;
      });
      if (ret != -1) {
        $this.form.formMutiSelects.tarData.members.splice(ret, 1);
      }
      console.log($this.form.formMutiSelects.tarData.members);
    },
    getInfo() {
      var $this = this;
      $this.getSelfInfo(
        function(res) {
          $this.form.founder = res.data.data.nickname;
        },
        function(res) {
          $this.$message.error("获取用户信息失败！");
        }
      );
    },

    getSelfInfo(cbOk, cbErr) {
      var $this = this;
      $this.$axios.get(apiAuth.userInfo, null, cbOk, cbErr);
    },

    refreshDepartments() {
      var $this = this;
      $this.form.formMutiSelects.srcData.friends = [];
      $this.getAllDepartments(
        function(res) {
          var re = res.data.data;
          var temp = [];
          for (var i = 0; i < re.length; i++) {
            temp.push({
              id: re[i].department_id,
              name: re[i].department_name,
              children: []
            });
            for (var j = 0; j < re[i].departmemt_members.length; j++) {
              temp[i].children.push({
                id: re[i].departmemt_members[j].id,
                name: re[i].departmemt_members[j].nickname
              });
            }
          }
          $this.form.formMutiSelects.srcData.friends = temp;
        },
        function(res) {
          $this.$message.error("获取用户分群组失败！");
        }
      );
    },

    getAllDepartments(cbOk, cbErr) {
      var $this = this;
      this.$axios.get(apiLinks.friends.allDepartments, null, cbOk, cbErr);
    },

    refreshGroups() {
      var $this = this;
      $this.form.formMutiSelects.srcData.groups = [];
      $this.getAllGroups(
        function(res) {
          var re = res.data.data;
          var temp = [];
          for (var i = 0; i < re.length; i++) {
            temp.push({
              id: re[i].group_id,
              name: re[i].group_name,
              children: []
            });
            for (var j = 0; j < re[i].member.length; j++) {
              temp[i].children.push({
                id: re[i].member[j].id,
                name: re[i].member[j].nickname
              });
            }
          }
          $this.form.formMutiSelects.srcData.groups = temp;
        },
        function(res) {
          $this.$message.error("获取用户群组失败！");
        }
      );
    },

    getAllGroups(cbOk, cbErr) {
      var $this = this;
      this.$axios.get(apiLinks.groups.allmember, null, cbOk, cbErr);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleMeetingOrder();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    handleMeetingOrder() {
      var $this = this;
      var members = [];
      for (
        var i = 0;
        i < this.form.formMutiSelects.tarData.members.length;
        i++
      ) {
        members.push({
          nickname: this.form.formMutiSelects.tarData.members[i].name
        });
      }
      console.log(members);
      $this.createMeeting(
        $this.form.name,
        members,
        $this.form.start_time,
        $this.form.formMutiSelects.settings.email_notify,
        $this.form.formMutiSelects.settings.sms_notify,
        function(res) {
          $this.$message.success("创建会议成功");
        },
        function(res) {
          $this.$message.error("创建会议失败");
        }
      );
    },

    createMeeting(m_name, m_members, m_stime, m_email, m_sms, cbOk, cbErr) {
      var $this = this;
      $this.$axios.put(
        apiMeeting.order.create,
        {
          meeting_name: m_name,
          members: m_members,
          start_time: m_stime.toString(),
          email_notify: m_email,
          sms_notify: m_sms
        },
        cbOk,
        cbErr
      );
    },

    getGroupMember(id) {
      var $this = this;
      console.log("")
      $this.groupMember(
        id,
        function(res) {
          var re = res.data.data;
          console.log("群组成员");
          console.log(re);
          for (var i = 0; i < re.length; i++) {
            $this.form.formMutiSelects.tarData.members.push({
              id:re[i].id,
              name:re[i].nickname
            })
          }
        },
        function(res) {
          $this.$message.error("获取群组成员信息失败！");
        }
      );
    },

    groupMember(id, cbOk, cbErr) {
      var $this = this;
      $this.$axios.get(
        utils.handleParamInUrl(apiLinks.groups.members, {
          group_id: id
        }),
        null,
        cbOk,
        cbErr
      );
    },

    getMeetingMember(id) {
      var $this = this;
      $this.groupMember(
        id,
        function(res) {
          var re = res.data.data;
          console.log("会议成员");
          console.log(re);
          for (var i = 0; i < re.length; i++) {
            $this.form.formMutiSelects.settings.curid.push(re[i].id);
            $this.form.formMutiSelects.tarData.members.push({
              id:re[i].id,
              name:re[i].nickname
            })
          }
        },
        function(res) {
          $this.$message.error("获取会议成员信息失败！");
        }
      );
    },

    meetingMember(id, cbOk, cbErr) {
      var $this = this;
      $this.$axios.get(
        utils.handleParamInUrl(apiMeeting.now.members, {
          mid: id
        }),
        null,
        cbOk,
        cbErr
      );
    }
  },

  mounted() {
    this.getInfo();
    this.refreshDepartments();
    this.refreshGroups();
    if(this.$route.query.group_id) {
      this.form.formMutiSelects.settings.curid.push(this.$route.query.group_id);
      this.getGroupMember(this.$route.query.group_id);
    }
    if (this.$route.query.meeting_id) {
      this.getMeetingMember(this.$route.query.meeting_id);
    }
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
.once {
  width: 70%;
  margin-top: 15px;
}
.tabHeader {
  text-align: left;
  display: flex;
}
.el-tag {
  margin-bottom: 10px;
}
.button-new-tag {
  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  vertical-align: bottom;
}
.tabItem {
  height: 100%;
  color: #606266;
  text-decoration: none;
  padding: 0 10px;
}
.tabItem:hover {
  color: #dcdfe6;
}
.activeTab {
  color: red;
  border-bottom: 1px solid red;
}
.tabHeader {
  text-align: left;
  display: flex;
}
.el-tag {
  margin-bottom: 10px;
}
.button-new-tag {
  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  vertical-align: bottom;
}
</style>
