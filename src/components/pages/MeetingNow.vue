<template>
	<div style="padding: 30px 0px;">
		<el-col :span="14" :offset="2">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="会议名称">
					<el-col :span="16">
						<el-input v-model="form.name"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="会议发起人">
					<el-col :span="16">
						<el-input v-model="form.founder"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="开会时间">
					<el-col :span="8">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="1">-</el-col>
					<el-col :span="7">
						<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="与会成员">
					<el-col :span="18">
						<div style="height: 260px;">
							<el-col :span="11" style="height: 100%;display: flex;flex-wrap: nowrap;flex-direction: column;">
								<div class="tabHeader" style="height: 40px;line-height: 40px; background-color: #f5f7fa;border: 1px solid #ebeef5; border-radius: 4px 4px 0px 0px;">
									<a href="javascript:void(0)" @click="form.formMutiSelects.curTab=1" :class="[form.formMutiSelects.curTab==1? 'activeTab tabItem':'tabItem']">群组</a>
									<a href="javascript:void(0)" @click="form.formMutiSelects.curTab=2" :class="[form.formMutiSelects.curTab==2? 'activeTab tabItem':'tabItem']">好友</a>
									<a href="javascript:void(0)" @click="form.formMutiSelects.curTab=3" :class="[form.formMutiSelects.curTab==3? 'activeTab tabItem':'tabItem']">电话/邮件</a>
								</div>
								<div style="flex: 1;flex-wrap: wrap;overflow-y: scroll;border-left: 1px solid #ebeef5;border-right: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;padding: 10px 0;">
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
									<div id="tab3" style="text-align: left; padding: 10px;" v-show="form.formMutiSelects.curTab==3">
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
							<el-col :span="2" style="height: 100%;display: flex;flex-direction: column;flex-wrap: nowrap;justify-content: center;align-items: center;">
							</el-col>
							<el-col :span="11" style="height: 100%;display: flex;flex-wrap: nowrap;flex-direction: column;">
								<div class="tabHeader" style="height: 40px;line-height: 40px; background-color: #f5f7fa;border: 1px solid #ebeef5; border-radius: 4px 4px 0px 0px;padding-left: 10px;">结果
								</div>
								<div style="flex: 1;flex-wrap: wrap;overflow-y: scroll;border-left: 1px solid #ebeef5;border-right: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;padding: 10px;text-align: left;">
									<ul>
										<li style="color: lightgray;font-style: italic;">好友</li>
										<li style="margin-left: 1em;" v-for="item in form.formMutiSelects.tarData.members">{{item.name}}</li>
									</ul>
									<ul>
										<li style="color: lightgray;font-style: italic;">邮件/手机号</li>
										<li style="margin-left: 1em;" v-for="item in form.formMutiSelects.tarData.customSel">{{item}}</li>
									</ul>
								</div>
							</el-col>
						</div>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">立即创建</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</div>
</template>
<script>
export default {
	data() {
		return {
			form:{
				name: '',
				founder: '',
				date:'',
				time:'',
				formMutiSelects: {
					curTab: 1,
					srcData: {
						groups:[
							{name: '分组1', children:[{ id: '1', name:'名字1'},{ id: '2',name:'名字2'}]},
							{name: '分组2', children:[{ id: '3',name:'名字1'},{ id: '4',name:'名字2'}]}
						],
						friends:[
							{name: '分组1', children:[{ id: '1', name:'名字1'},{ id: '2',name:'名字2'}]},
							{name: '分组2', children:[{ id: '3',name:'名字1'},{ id: '4',name:'名字2'}]}
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
			}
		};
	},
	methods:{
		handleClose(tag) {
			this.form.formMutiSelects.settings.dynamicTags.splice(this.form.formMutiSelects.settings.dynamicTags.indexOf(tag), 1);
		},
		showInput() {
			this.form.formMutiSelects.settings.inputVisible = true;
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus();
			});
		},
		handleInputConfirm() {
			var inputValue = this.form.formMutiSelects.settings.inputValue;
			var emailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
			var phoneReg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
			if(emailReg.test(inputValue)||phoneReg.test(inputValue)){
				this.form.formMutiSelects.settings.dynamicTags.push(inputValue);
				this.form.formMutiSelects.settings.inputVisible = false;
				this.form.formMutiSelects.settings.inputValue = '';
			}else{
				this.$message.error('输入不合法！');
				return;
			}
		},

		handleCustomSelect(data){
			
		},

		handleTreeCheckChange(data, checked, indeterminate) {
			var $this = this;
			if(checked){
				if(typeof(data.children)=="undefined"){
					// $this.form.formMutiSelects.tarData.groupsSel.push(item);
					$this.addMember(data);
				}
			}else{
				if(typeof(data.children)=="undefined"){
					// $this.form.formMutiSelects.tarData.groupsSel.push(item);
					$this.removeMember(data);
				}
			}
	  //       var groups = $this.$refs.groupTree.getCheckedNodes();
			// groups.forEach(function(item,index){
			// 	if(typeof(item.children)=="undefined"){
			// 		$this.form.formMutiSelects.tarData.groupsSel.push(item);
			// 	}
			// })
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
		// joinMeetings(mid) {
		// 	axios.get('/meeting/' + mid)
		// 	.then(function(response){
		// 		if(response.code == 0) {
		// 			this.url = response.url;
		// 			console.log(response.msg);
		// 		} else {
		// 			console.log(response.msg);
		// 		}
		// 	})
		// 	.catch(function(error) {
		// 		console.log(error);
		// 	})
		// }
	},
	name: 'MeetingJoin'
}
</script>
<style>
	.tabHeader{
		text-align: left;
		display: flex;
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