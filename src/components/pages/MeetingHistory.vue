<template>
  <div class="crad-group" style="height: 100%; overflow: scroll;">
    <el-card 
      v-for="item in MeetingList" 
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
        <!-- <router-link :to="{name: 'now', query:{group_id:curGroup.group_id}}" > -->
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
    <el-dialog
      title="会议信息"
      :visible.sync="dialogMeetingInfo"
      width="30%"
      :before-close="handleClose">
      <span>
        <div v-if="curMeeting" class="text item">
          会议名称：{{curMeeting.meetingName}}<br>
          会议时间：<span v-text="timestampToTime(curMeeting.createTime)"></span><br>
          主持人：{{curMeeting.founder_user_nickname}}<br>
          视频回放：<div class="el-icon-service"></div><br>
          会议成员： 
          <div>
            <div class="member" v-for="(n, index) in 10" :key="index">{{n + ","}}</div>
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
import {apiAuth, apiMeeting} from '@/properties/api.js';
export default {
  name: 'MeetingHistory',
  data() {
    return {
      MeetingList: [],
      dialogMeetingInfo: false,
      curMeeting: null,
      selfInfo: null
    }
  },
  mounted() {
    this.refreshAllHistoryMeeting();
    this.getInfo();
  },
  methods: {
    showInfo(info) {
      this.curMeeting = info
      console.log(this.curMeeting)
      this.dialogMeetingInfo = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    timestampToTime(timestamp) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    refreshAllHistoryMeeting() {
      var $this = this;
      this.getHistoryMeeting(function(res) {
        res = res.data;
        $this.MeetingList = res.data;
      }, function(res) {
        console.log("error" + res);
      })
    },
    getHistoryMeeting(cbOk, cbErr){
      var $this = this;
      $this.$axios.get(apiMeeting.order.all, {
      }, cbOk, cbErr)
    },
    getInfo () {
      var $this = this;
      $this.getSelfInfo (function (res){
        console.log("selfres")
        console.log(res);
        console.log(res.data.data.nickname)
        $this.selfInfo = res.data.data.nickname
        console.log("SELFINFO")
        console.log($this.selfInfo)
      }, function (res){
        $this.$message.error('获取用户信息失败！');
      })
    },

    getSelfInfo (cbOk, cbErr) {
      var $this = this;
      $this.$axios.get(apiAuth.userInfo, null, cbOk, cbErr);
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
    margin-left: 20px;
    text-align: left;
  }

  .box-card {
    background-color: #ffffcc;
    width: 270px;
    margin: 15px;
    float: left;
  }

  .crad-group {
    overflow-y: scroll;
  }

  .member {
    float: left;
  }
  ::-webkit-scrollbar {display: none}
</style>