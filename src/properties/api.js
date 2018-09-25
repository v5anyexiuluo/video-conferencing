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
	sms: auth+'/users/getSms',
	userInfo: links+'/user/get_self_info',
	userInfoByNickname: links+'/user/get_user_info'
}
export var apiChat = {
	
}
export var apiLinks = {
	friends:{
		all: links+'/friends/get_friends_all',  //
		add: links+'/friends/friend_add',  //
		delete: links+'/friends/',  //
		allDepartments: links+'/departments/',  //
		addDepartment: links+'/departments/',
		updateDepartment: links+'/departments/{department_id}',
		deleteDepartment: links+'/departments/{department_id}',  //
		addFriendToDepartment: links+'/departments/{department_id}/member',
		addFriendsToDepartment: links+'/departments/{department_id}/members',
		updateDepartmentOfFriend: links+'/departments/{department_id}/members/exchange',  //
	},
	groups:{
		create: links+'/groups/create',
		delete: links+'/groups/delete_group',
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
	base:{
		info: meeting+'/meetings/',
		all: ''
	},
	join:{
		
	},
	order:{
		all: meeting+'/meetings/find_all_meetings_unready',
		create: meeting+'/meetings/create',
		addMember: meeting+'/meetings/add_member'
	},
	history:{
		all: meeting+'/meetings/find_all_meetings_ing'
	},
	miss:{
		all: meeting+'/meetings/find_all_meetings_end'
	},
	now:{
		all: meeting+'/meetings/find_all_meetings_ing',
		start: meeting+'/meetings/start_meeting_status',
		end: meeting+'/meetings/end_meeting_status',
		members: meeting+'/meetings/get_meeting_members',
		exit: meeting+'/meetings/member_exit_meeting',
		entry: meeting+'/meetings/member_entry_meeting',
	}
}
export var apiMsg = {
	
}