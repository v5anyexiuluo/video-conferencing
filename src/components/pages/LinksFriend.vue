<template>
	<div>
		<div class="main-actions">
			<a href="javascript:void(0)" @click="dialogFormVisible = true">添加好友</a>
		</div>
		<div>
			<div class="main-title">
				<span>我的好友</span>
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
		<el-dialog title="请选择一个群组聊天" width="400px" center :visible.sync="dialogFormVisible">
		  <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item v-if="isCreateGroupShow" label="新建组">
          <el-input class="full-width"></el-input>
        </el-form-item>
        <el-form-item v-if="!isCreateGroupShow" label="选择组">
          <el-select v-model="form.groups" class="full-width" placeholder="选择组">
            <el-option label="群组一" value="shanghai"></el-option>
            <el-option label="群组二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div>
            <a href="javascript:void(0)" @click="isCreateGroupShow = (!isCreateGroupShow)">{{isCreateGroupShow? "新建组":"选择组"}}</a>
          </div>
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
  import BScroll from 'better-scroll'
  import Scroll from '@/components/common/Scroll.vue'
  export default {
    data() {
      return {
      	dialogTableVisible: false,
        dialogFormVisible: false,
        isCreateGroupShow: false,
        pulldown: true,
        form: {
          groups: ''
        },
        groups: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1'
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1'
          }, {
            label: '二级 2-2'
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1'
          }, {
            label: '二级 3-2'
          }, {
            label: '二级 3-2'
          }, {
            label: '二级 3-2'
          }, {
            label: '二级 3-2'
          }, {
            label: '二级 3-2'
          }, {
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    name: 'FriendsGroup',
    components: {
      scroll: Scroll
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
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
  .el-form-item:last-child{
    margin-bottom: 0px;
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