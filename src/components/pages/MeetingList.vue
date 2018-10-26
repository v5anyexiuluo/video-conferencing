<template>
  <div class="crad-group">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>视频会议</el-breadcrumb-item>
      <el-breadcrumb-item>会议列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs style="height:94%;" v-model="activeName" type="card" @tab-click="handleClick">    
      <el-tab-pane label="正在进行" name="first" style="height:95%;">
        <div class="box-win">
          <el-card 
            v-for="item in StartingMeetingList.data" 
            :key="item.meeting_id" 
            class="box-card"
          >
            <div @click="showInfo(item)">
              <div class="text item">
                <h1 class="m-title">{{item.meetingName}}</h1>
                <div class="m-time"><span v-text="timestampToTime(item.createTime)"></span></div>
                <div class="m-founder">
                  <img :src="item.headimg ? item.headimg : 'https://picsum.photos/20/20'" class="m-img" alt="">
                  <div>{{item.founder_user_nickname}}</div>
                </div>
                <div class="m-desc">会议正在进行中。。。</div>
              </div>
            </div>
            <div v-if="item.founder_user_nickname==selfInfo" class="box-crl">
              <!-- <router-link :to="{name: 'now', query:{meeting_id:item.id}}">
                <el-button size="small" type="primary">马上开会</el-button>
              </router-link> -->
              <router-link :to="{name: 'order', query:{meeting_id:item.id}}">
                <el-button size="small" type="primary">预约会议</el-button>
              </router-link>
              <el-button size="small" type="primary" @click="entryMeeting(item)">进入会议</el-button>
              <el-button size="small" type="primary" @click="showInfo(item)">查看详情</el-button>
            </div>
            <div v-else class="box-crl">
              <el-button size="small" type="primary" @click="entryMeeting(item)">进入会议</el-button>
              <el-button size="small" type="primary" @click="showInfo(item)">查看详情</el-button>
            </div>
          </el-card>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next, jumper"
          :page-count="StartingMeetingList.total"
          :current-page="currentPage"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="待参加会议" name="second" style="height:95%;">
        <div class="box-win">
          <el-card 
            v-for="item in UnreadyMeetingList.data" 
            :key="item.meeting_id" 
            class="box-card"
          >
            <div @click="showInfo(item)">
              <div class="text item">
                <h1 class="m-title">{{item.meetingName}}</h1>
                <div class="m-time"><span v-text="timestampToTime(item.createTime)"></span></div>
                <div class="m-founder">
                  <img :src="item.headimg ? item.headimg : 'https://picsum.photos/20/20'" class="m-img" alt="">
                  <div>{{item.founder_user_nickname}}</div>
                </div>
                <div class="m-desc">待参加的会议。。。</div>
              </div>
            </div>
            <div v-if="item.founder_user_nickname==selfInfo" class="box-crl">
              <router-link :to="{name: 'now', query:{meeting_id:item.id}}">
                <el-button size="small" type="primary">马上开会</el-button>
              </router-link>
              <router-link :to="{name: 'order', query:{meeting_id:item.id}}">
                <el-button size="small" type="primary">预约会议</el-button>
              </router-link>
              <el-button size="small" type="primary" @click="showInfo(item)">查看详情</el-button>
            </div>
            <div v-else class="box-crl">
              <el-button size="small" type="primary" @click="showInfo(item)">查看详情</el-button>
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
      <el-tab-pane label="历史会议" name="third" style="height:95%;">
        <div class="box-win">
          <el-card 
            v-for="item in EndMeetingList.data" 
            :key="item.meeting_id" 
            class="box-card"
          >
            <div @click="showInfo(item)">
              <div class="text item">
                <h1 class="m-title">{{item.meetingName}}</h1>
                <div class="m-time"><span v-text="timestampToTime(item.createTime)"></span></div>
                <div class="m-desc">这是一段会议纪要</div>
                <div class="m-founder">
                  <img :src="item.headimg ? item.headimg : 'https://picsum.photos/20/20'" class="m-img" alt="">
                  <div>{{item.founder_user_nickname}}</div>
                </div>
                视频回放：
                <router-link :to="{name: 'video', params:{id: item.id}}">
                  <el-button type="success" size="mini" icon="el-icon-arrow-right" circle></el-button>
                </router-link>
              </div>
            </div>
            <div v-if="item.founder_user_nickname==selfInfo" class="box-crl">
              <router-link :to="{name: 'now', query:{meeting_id:item.id}}">
                <el-button size="small" type="primary">马上开会</el-button>
              </router-link>
              <router-link :to="{name: 'order', query:{meeting_id:item.id}}">
                <el-button size="small" type="primary">预约会议</el-button>
              </router-link>
              <!-- <router-link :to="{name: 'video', query:{id:item.id}}"> -->
                <el-button size="small" type="primary" @click="showInfo(item)">查看详情</el-button>
              <!-- </router-link> -->
            </div>
            <div v-else class="box-crl">
              <!-- <el-button size="small" type="primary" @click="showInfo(item)">查看会议详情</el-button> -->
              <!-- <router-link :to="{name: 'video', params:{id: item.id}}"> -->
                <el-button size="small" type="primary" @click="showInfo(item)">查看详情</el-button>
              <!-- </router-link> -->
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
      title="会议详细信息"
      :visible.sync="dialogMeetingInfo"
      width="30%">
      <span>
        <div v-if="curMeeting" class="text item">
          <h1 class="m-title"> {{curMeeting.meetingName}}</h1>
          <div class="m-time"><span v-text="timestampToTime(curMeeting.createTime)"></span></div>
          主持人：{{curMeeting.founder_user_nickname}}<br>
          <div v-if="curMeeting.videoPath==''">
          视频回放：
            <el-button type="success" size="small" icon="el-icon-arrow-right" circle @click="handlePlayback"></el-button>
          </div>
          会议纪要：这是一段会议纪要,记录了会议的简要信息<br>
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
import {mapMutations} from 'vuex';
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
    ...mapMutations([
      'setCurMeeting'
    ]),

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

    handlePlayback() {
      this.dialogMeetingInfo = false;
      this.$router.push({path:'/video/'+this.curMeeting.id});
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
    },

    entryMeeting(meeting){
      var $this = this;
      $this.setCurMeeting(meeting);
      $this.$router.push({name: 'current'})
    },
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

.crad-group {
  height: 100%;
}

.crad-group >>> .el-tabs__content {
  height: 90%;
}

.text {
  font-size: 14px;
  text-align: left;
}

.box-win {
  width: 100%;
  height: 100%;
}

.box-card {
  background-color: #ffff99;
  width: 22%;
  height: 40%;
  margin: 15px;
  float: left;
  position: relative;
}

.box-crl {
  position: absolute;
  bottom: 10%;
  right: 0;
  left: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

.m-title {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  text-align: center;
}

.m-time {
  margin-top: 5%;
  margin-bottom: 5%;
  text-align: right;
  color:#999999;
}

.m-founder {
  float: left;
  width: 30%;
  text-align: center;
}

.m-img {
  width: 50%;
  height: 50%;
}

.m-desc {
  float: right;
  width: 70%;
  height: 40%;
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
