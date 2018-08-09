// 配置API接口地址
var auth = process.env.API_AUTH_ROOT
var data = process.env.API_DATA_ROOT

export var apiAuth = {
	login: auth+'/users/sign_in',
	logout: auth+'/users/sign_out',
	userInfo: data+'user/get_self_info',
	userInfoByNickname: data+'user/get_user_info'
}
export var apiLinks = {
	friends:{

	},
	groups:{
		create: data+'/groups/create',
		addMember: data+'/groups/append',
		deleteMember: data+'/groups/delete',
		modifyName: data+'/group/update',
		all: data+'/groups/find_all_group',
		members: data+'/groups/find_all_member',
		allmember: data + 'groups/get_group_member',
	}
}
export var apiMeeting = {
	
}
export var apiMsg = {
	
}