<template>
  <div class="selectmember">
    <el-col class="selectlist" :span="11">
      <div class="tabHeader">
        <a href="javascript:void(0)" @click="form.formMutiSelects.curTab=1" :class="[form.formMutiSelects.curTab==1? 'activeTab tabItem':'tabItem']">群组</a>
        <a href="javascript:void(0)" @click="form.formMutiSelects.curTab=2" :class="[form.formMutiSelects.curTab==2? 'activeTab tabItem':'tabItem']">好友</a>
        <a href="javascript:void(0)" @click="form.formMutiSelects.curTab=3" :class="[form.formMutiSelects.curTab==3? 'activeTab tabItem':'tabItem']">电话/邮件</a>
      </div>
      <div class="flist">
        <div id="tab1" v-show="form.formMutiSelects.curTab==1">
          <el-tree
            node-key="id"
            :data="form.formMutiSelects.srcData.groups"
            :props="form.formMutiSelects.settings.groupsProps"
            :default-checked-keys="form.formMutiSelects.srcData.groups"
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
            show-checkbox
            @check-change="handleTreeCheckChange"
            ref="friendTree">
          </el-tree>
        </div>
        <div id="tab3" v-show="form.formMutiSelects.curTab==3">
          <el-checkbox-group style="text-align: left;display: flex;flex-direction: column;align-items: flex-start;" v-model="form.formMutiSelects.tarData.customSel" @change="handleCustomSelect">
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
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </div>
      <!-- <div style="height: 40px;line-height: 40px; background-color: #f5f7fa;border: 1px solid #ebeef5; border-radius: 0px 0px 4px 4px;">
        
      </div> -->
    </el-col>
    <el-col :span="2" class="resultlist">
    </el-col>
    <el-col class="reslut" :span="11" style="height: 100%;display: flex;flex-wrap: nowrap;flex-direction: column;">
      <div class="tabHeader" style="padding-left: 10px;">
        成员
      </div>
      <div class="rlist">
        <ul>
          <li style="color: lightgray;font-style: italic;">
            好友
          </li>
          <li style="margin-left: 1em; line-height: 15px" v-for="item in form.formMutiSelects.tarData.members">
            {{item.name}}
          </li>
        </ul>
        <ul>
          <li style="color: lightgray;font-style: italic;">邮件/手机号</li>
          <li style="margin-left: 1em; line-height: 15px" v-for="item in form.formMutiSelects.tarData.customSel">{{item}}</li>
        </ul>
      </div>
    </el-col>
  </div>
</template>

<script>
import {apiAuth,apiLinks,apiMeeting} from '@/properties/api.js';
export default {
  name: "SelectMember",
  props: ['curid'],
  data () {
    return {
      form:{
        formMutiSelects: {
          curTab: 1,
          srcData: {
            groups:[
              {name: '群组1', children:[{ id: '1', name:'名字1'},{ id: '2', name:'名字2'}]},
              {name: '群组2', children:[{ id: '3', name:'名字1'},{ id: '4', name:'名字2'}]}
            ],
            friends:[
              {name: '分组1', children:[{ id: '1', name:'名字1'},{ id: '2', name:'名字2'}]},
              {name: '分组2', children:[{ id: '3', name:'名字1'},{ id: '4', name:'名字2'}]}
            ]
          },
          tarData: {
            members:[],
            customSel:[]
          },
          settings:{
            groupsProps: {
              children: 'children',
              label: 'name'
            },
            friendsProps: {
              children: 'children',
              label: 'name'
            },
            dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: ''
          }
        }
      },
    }
  },
  methods: {
    handleTreeCheckChange(data, checked, indeterminate) {
      var $this = this;
      if(checked){
        if(typeof(data.children)=="undefined"){
          // $this.form.formMutiSelects.tarData.groupsSel.push(item);
          $this.addMember(data);
        }
      } else{
        if(typeof(data.children)=="undefined"){
          // $this.form.formMutiSelects.tarData.groupsSel.push(item);
          $this.removeMember(data);
        }
      }
    //       var groups = $this.$refs.groupTree.getCheckedNodes();
      // groups.forEach(function(item,index){
      //  if(typeof(item.children)=="undefined"){
      //    $this.form.formMutiSelects.tarData.groupsSel.push(item);
      //  }
      // })
    },
    handleCustomSelect(data){
      
    },
    showInput() {
      this.form.formMutiSelects.settings.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    addMember(item){
      var $this = this;
      var members = $this.form.formMutiSelects.tarData.members;
      var ret = members.findIndex((value, index, arr) => {
            return value.id == item.id;
          })
      if(ret==-1){
        $this.form.formMutiSelects.tarData.members.push(item);
      }
      console.log($this.form.formMutiSelects.tarData.members)
    },

    removeMember(item){
      var $this = this;
      var members = $this.form.formMutiSelects.tarData.members;
      var ret = members.findIndex((value, index, arr) => {
            return value.id == item.id;
          })
      if(ret!=-1){
        $this.form.formMutiSelects.tarData.members.splice(ret,1);
      }
      console.log($this.form.formMutiSelects.tarData.members)
    },
    refreshDepartments() {
      var $this = this;
      $this.form.formMutiSelects.srcData.friends = [];
      $this.getAllDepartments(function(res) {
        var re = res.data.data
        console.log("你好")
        console.log("hhhhh")
        for (var i = 0; i < res.data.data.length; i++) {
          $this.form.formMutiSelects.srcData.friends.push({id: re[i].department_id, name: re[i].department_name, children:[]})
          for (var j = 0; j < re[i].departmemt_members.length; j++) {
            $this.form.formMutiSelects.srcData.friends[i].children.push({
              id: re[i].departmemt_members[j].id,
              name: re[i].departmemt_members[j].nickname
            })
          }
        }
      },function(res){
        $this.$message.error('获取用户分群组失败！');
      })
    },

    getAllDepartments(cbOk, cbErr) {
      var $this = this;
      this.$axios.get(apiLinks.friends.allDepartments, null, cbOk, cbErr)
    },

    refreshGroups() {
      var $this = this;
      $this.form.formMutiSelects.srcData.groups = [];
      $this.getAllGroups(function(res) {
        var re = res.data.data
        console.log("hhhhh")
        for (var i = 0; i < res.data.data.length; i++) {
          $this.form.formMutiSelects.srcData.groups.push({id: re[i].group_id, name: re[i].group_name, children:[]})
          for (var j = 0; j < re[i].member.length; j++) {
            $this.form.formMutiSelects.srcData.groups[i].children.push({
              id: re[i].member[j].id,
              name: re[i].member[j].nickname
            })
          }
        }
      },function(res){
        $this.$message.error('获取用户群组失败！');
      })
    },

    getAllGroups(cbOk, cbErr) {
      var $this = this;
      this.$axios.get(apiLinks.groups.allmember, null, cbOk, cbErr);
    },
  },
  mounted() {
    this.refreshDepartments();
    this.refreshGroups();
    this.$refs.tree.setCheckedKeys([curid]);
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar {display: none}
  .selectmember {
    height: 260px;
  }
  .selectlist {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
  }
  .tabHeader {
    height: 40px;
    line-height: 40px;
    background-color: #f5f7fa;
    border: 1px solid #ebeef5;
    border-radius: 4px 4px 0px 0px;
  }
  .flist {
    flex: 1;
    flex-wrap: wrap;
    overflow-y: scroll;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    padding: 10px 0;
  }
  #tab3 {
    text-align: left;
    padding: 10px;
  }
  .resultlist {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  .rlist {
    flex: 1;
    flex-wrap: wrap;
    overflow-y: scroll;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    padding: 10px;
    text-align: left;
  }
  .tabItem{
    height: 100%;
    color: #606266;
    text-decoration: none;
    padding: 0 10px;
  }
  .tabItem:hover{
    color: #dcdfe6;
  }
  .activeTab{
    color: red;
    border-bottom: 1px solid red;
  }
  .tabHeader{
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