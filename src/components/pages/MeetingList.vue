<template>
  <div class="crad-group" style="height: 100%; overflow: scroll;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>视频会议</el-breadcrumb-item>
      <el-breadcrumb-item>历史会议</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">    
      <el-tab-pane label="正在进行" name="first">
        <div style="width:100%;height:500px;">
          <el-card 
            v-for="item in StartingMeetingList.data" 
            :key="item.meeting_id" 
            class="box-card"
          >
            <div @click="showInfo(item)">
              <div class="text item">
                会议名称：{{item.meetingName}}<br>
                会议时间：<span v-text="timestampToTime(item.createTime)"></span><br>
                主持人：{{item.founder_user_nickname}}<br>
                视频回放：<div class="el-icon-service"></div>
                <!-- "item.videoPath" -->
              </div>
              <div style="text-align: left; font-size: 14px; margin: 5px;">会议纪要：这是一段会议纪要{{item.reviewtime}}</div>
            </div>
            <div v-if="item.founder_user_nickname==selfInfo">
              <router-link :to="{name: 'now', query:{meeting_id:item.id}}">
                <el-button type="primary">马上开会</el-button>
              </router-link>
              <router-link :to="{name: 'order', query:{meeting_id:item.id}}">
                <el-button type="primary">预约会议</el-button>
              </router-link>
            </div>
            <div v-else>
              <el-button type="primary" @click="showInfo(item)">查看会议详情</el-button>
            </div>
          </el-card>
        </div>

        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :page-count="StartingMeetingList.total"
          :current-page="currentPage"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="待参加会议" name="second">
        <div style="width:100%;height:500px;">
          <el-card 
            v-for="item in UnreadyMeetingList.data" 
            :key="item.meeting_id" 
            class="box-card"
          >
            <div @click="showInfo(item)">
              <div class="text item">
                会议名称：{{item.meetingName}}<br>
                会议时间：<span v-text="timestampToTime(item.createTime)"></span><br>
                主持人：{{item.founder_user_nickname}}<br>
                视频回放：<div class="el-icon-service"></div>
                <!-- "item.videoPath" -->
              </div>
              <div style="text-align: left; font-size: 14px; margin: 5px;">会议纪要：这是一段会议纪要{{item.reviewtime}}</div>
            </div>
            <div v-if="item.founder_user_nickname==selfInfo">
              <router-link :to="{name: 'now', query:{meeting_id:item.id}}">
                <el-button type="primary">马上开会</el-button>
              </router-link>
              <router-link :to="{name: 'order', query:{meeting_id:item.id}}">
                <el-button type="primary">预约会议</el-button>
              </router-link>
            </div>
            <div v-else>
              <el-button type="primary" @click="showInfo(item)">查看会议详情</el-button>
            </div>
          </el-card>
        </div>

        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :page-count="UnreadyMeetingList.total"
          :current-page="currentPage"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="历史会议" name="third">
        <div style="width:100%;height:500px;">
          <el-card 
            v-for="item in EndMeetingList.data" 
            :key="item.meeting_id" 
            class="box-card"
          >
            <div @click="showInfo(item)">
              <div class="text item">
                会议名称：{{item.meetingName}}<br>
                会议时间：<span v-text="timestampToTime(item.createTime)"></span><br>
                主持人：{{item.founder_user_nickname}}<br>
                视频回放：<div class="el-icon-service"></div>
                <!-- "item.videoPath" -->
              </div>
              <div style="text-align: left; font-size: 14px; margin: 5px;">会议纪要：这是一段会议纪要{{item.reviewtime}}</div>
            </div>
            <div v-if="item.founder_user_nickname==selfInfo">
              <router-link :to="{name: 'now', query:{meeting_id:item.id}}">
                <el-button type="primary">马上开会</el-button>
              </router-link>
              <router-link :to="{name: 'order', query:{meeting_id:item.id}}">
                <el-button type="primary">预约会议</el-button>
              </router-link>
              <router-link :to="{name: 'video', query:{id:item.id}}">
                <el-button type="primary">查看回放</el-button>
              </router-link>
            </div>
            <div v-else>
              <el-button type="primary" @click="showInfo(item)">查看会议详情</el-button>
            </div>
          </el-card>
        </div>

        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :page-count="EndMeetingList.total"
          :current-page="currentPage"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="会议信息"
      :visible.sync="dialogMeetingInfo"
      width="30%">
      <span>
        <div v-if="curMeeting" class="text item">
          会议名称：{{curMeeting.meetingName}}<br>
          会议时间：<span v-text="timestampToTime(curMeeting.createTime)"></span><br>
          主持人：{{curMeeting.founder_user_nickname}}<br>
          视频回放：<div class="el-icon-service"></div><br>
          会议纪要：这是一段会议纪要<br>
          会议成员： 
          <div>
            <div class="member" v-for="member in curMember" :key="member.id">
              <img :src="member.headimg ? member.headimg : 'https://picsum.photos/20/20'" alt="">
              <div>{{member.nickname}}</div>
            </div>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMeetingInfo = false">取 消</el-button>
        <el-button type="primary" @click="dialogMeetingInfo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiAuth, apiMeeting } from "@/properties/api.js";
import utils from '@/assets/js/utils.js';
export default {
  name: "MeetingHistory",
  data() {
    return {
      currentPage:1,  //    初始页
      pagesize:8,    //    每页的数据
      EndMeetingList: [],
      StartingMeetingList: [],
      UnreadyMeetingList: [],
      dialogMeetingInfo: false,
      curMeeting: null,
      curMember:[],
      selfInfo: null,
      activeName: 'first'
    };
  },
  mounted() {
    this.refreshAllStartingMeeting();
    this.getInfo();
  },
  methods: {
    refreshTab(){
      var $this = this;
      if($this.activeName=="first"){
        $this.refreshAllStartingMeeting();
      }else if($this.activeName=="second"){
        $this.refreshAllUnreadyMeeting();
      }else if($this.activeName=="third"){
        $this.refreshAllEndMeeting();
      }
    },

    handleClick(tab, event) {
      // console.log(tab, event);
      var $this = this;
      $this.currentPage = 1;
      $this.refreshTab();
    },

    handleCurrentChange(currentPage) {
      // console.log(this.currentPage)  //点击第几页
      var $this = this;
      $this.currentPage = currentPage;
      // console.log(this.currentPage)
      $this.refreshTab();
    },

    showInfo(info) {
      this.curMeeting = info;
      console.log("curMeeting")
      console.log(this.curMeeting);
      this.getMeetingMember(this.curMeeting.id)
      this.dialogMeetingInfo = true;
    },
    
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },

    sortTime(a,b){  
       return b.createTime-a.createTime  
    },

    refreshAllUnreadyMeeting() {
      var $this = this;
      this.getUnreadyMeeting(
        function(res) {
          $this.UnreadyMeetingList = res.data.data;
          $this.UnreadyMeetingList.data.sort($this.sortTime);
        },
        function(res) {
          console.log("error" + res);
        }
      );
    },
    getUnreadyMeeting(cbOk, cbErr) {
      var $this = this;
      $this.$axios.get(apiMeeting.order.all+'?page='+$this.currentPage+'&size='+$this.pagesize, {}, cbOk, cbErr);
    },

    refreshAllStartingMeeting() {
      var $this = this;
      this.getStartingMeeting(
        function(res) {
          $this.StartingMeetingList = res.data.data;
          $this.StartingMeetingList.data.sort($this.sortTime);
        },
        function(res) {
          console.log("error" + res);
        }
      );
    },
    getStartingMeeting(cbOk, cbErr) {
      var $this = this;
      $this.$axios.get(apiMeeting.now.all+'?page='+$this.currentPage+'&size='+$this.pagesize, {}, cbOk, cbErr);
    },

    refreshAllEndMeeting() {
      var $this = this;
      this.getEndMeeting(
        function(res) {
          $this.EndMeetingList = res.data.data;
          $this.EndMeetingList.data.sort($this.sortTime);
        },
        function(res) {
          console.log("error" + res);
        }
      );
    },
    getEndMeeting(cbOk, cbErr) {
      var $this = this;
      $this.$axios.get(apiMeeting.miss.all+'?page='+$this.currentPage+'&size='+$this.pagesize, {}, cbOk, cbErr);
    },
    getInfo() {
      var $this = this;
      $this.getSelfInfo(
        function(res) {
          $this.selfInfo = res.data.data.nickname;
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

    // 获取会议成员
    getMeetingMember(id) {
      var $this = this;
      $this.meetingMember(
        id,
        function(res) {
          var re = res.data.data;
          console.log("会议成员");
          console.log(re);
          $this.curMember = re;
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
  computed:{
    splice: function(){
      var $this = this;
      return function(value){
        return value.splice(($this.currentPage-1)*$this.pagesize,$this.currentPage*$this.pagesize);
      }
    }
  },
  filters: {
    splice: function(value, currentPage, pagesize){
      return value.splice((currentPage-1)*pagesize,currentPage*pagesize);
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
  margin-left: 20px;
  text-align: left;
}

.box-card {
  background-color: #ffffcc;
  width: 20%;
  height: 210px;
  margin: 15px;
  float: left;
}

.crad-group {
  overflow-y: scroll;
}

.member {
  margin-right: 10px;
  float: left;
  text-align: center;
}
::-webkit-scrollbar {
  display: none;
}
</style>
