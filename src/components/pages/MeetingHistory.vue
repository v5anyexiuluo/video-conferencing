<template>
  <div class="crad-group" style="height: 100%; overflow: scroll;">
    <el-card 
      v-for="item in MeetingList" 
      :key="item.meeting_id" 
      class="box-card"
    >
      <div class="text item">
        会议名称：{{item.meetingName}}<br>
        会议时间：<span v-text="timestampToTime(item.createTime)"></span><br>
        主持人：{{item.founder_user_nickname}}<br>
        视频回放：<a href="https://www.baidu.com" class="el-icon-caret-right"></a>
        <!-- "item.videoPath" -->
      </div>
      <div style="text-align: left; font-size: 14px; margin: 5px;">会议纪要：这是一段会议纪要{{item.reviewtime}}</div>
      <el-button type="primary" @click="handleClick">马上开会</el-button>
      <el-button type="primary">预约会议</el-button>
    </el-card>
  </div>
</template>

<script>
import {apiMeeting} from '@/properties/api.js';
export default {
  name: 'MeetingHistory',
  data() {
    return {
      MeetingList: [],
    }
  },
  mounted() {
    this.refreshAllHistoryMeeting();
  },
  methods: {
    handleClick() {
      this.y = 2;
      alert("sss");
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
      $this.$axios.get(apiMeeting.history.all, {
      }, cbOk, cbErr)
    },
  }
}
</script>

<style>
  .text {
    font-size: 14px;
    margin-left: 40px;
    text-align: left;
  }

  .box-card {
    background-color: #bcbcbc;
    width: 280px;
    margin: 15px;
    float: left;
  }

  .crad-group {
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {display: none}
</style>