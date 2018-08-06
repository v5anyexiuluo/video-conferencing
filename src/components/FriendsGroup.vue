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
      }
    }
  };
</script>
<style>
	
</style>