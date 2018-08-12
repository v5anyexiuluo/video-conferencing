// 配置API接口地址
var auth = process.env.API_AUTH_ROOT
var links = process.env.API_LINKS_ROOT
var chat = process.env.API_CHAT_ROOT
var meeting = process.env.API_MEETING_ROOT
var notify = process.env.API_NOTIFY_ROOT

export var apiAuth = {
	login: auth+'/users/sign_in',
	logout: auth+'/users/sign_out',
	regist: auth+'/users/register',
	userInfo: links+'/user/get_self_info',
	userInfoByNickname: links+'/user/get_user_info'
}
export var apiChat = {
	
}
export var apiLinks = {
	friends:{
		addFriend: links+'/friends/friend_add',
		all: links+'/friends/get_friends_all'
	},
	groups:{
		create: links+'/groups/create',
		addMember: links+'/groups/append',
		addMembers: links+'/groups/append_multi',
		deleteMember: links+'/groups/delete',
		deleteMembers: links+'/groups/delete_multi',
		modifyName: links+'/groups/update',
		all: links+'/groups/find_all_group',
		members: links+'/groups/find_all_member',
		allmember: links + '/groups/get_group_member',
	}
}
export var apiMeeting = {
	join:{
		join: meeting+'/meeting/'
	},
	order:{
		create: meeting+'/meetings/create',
		addMember: meeting+'/meeting/add_member'
	},
	history:{

	},
	miss:{

	},
	now:{

	}
}
export var apiMsg = {
	
}