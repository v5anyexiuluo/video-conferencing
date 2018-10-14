// 配置API接口地址
var auth = process.env.API_AUTH_ROOT
var links = process.env.API_LINKS_ROOT
var chat = process.env.API_CHAT_ROOT
var meeting = process.env.API_MEETING_ROOT
var notify = process.env.API_NOTIFY_ROOT
var websocket = process.env.API_WS_ROOT

export var apiAuth = {
	login: auth+'/users/sign_in',
	logout: auth+'/users/sign_out',
	regist: auth+'/users/register',
	sms: auth+'/users/getSms',
	// userInfo: links+'/user/get_self_info',
	userInfo: links+'/user',
	// userInfoByNickname: links+'/user/get_user_info'
	userInfoByNickname: links+'/user/{nickname}'
}
export var apiChat = {
	
}
export var apiLinks = {
	friends:{
		// all: links+'/friends/get_friends_all',  //
		all:links+'/friends',
		// add: links+'/friends/friend_add',  //
		add: links+'/friends/notification',
		delete: links+'/friends/',  //
		allDepartments: links+'/departments/',  //
		addDepartment: links+'/departments/',
		updateDepartment: links+'/departments/{department_id}',
		deleteDepartment: links+'/departments/{department_id}',  //
		addFriendToDepartment: links+'/departments/{department_id}/member',
		addFriendsToDepartment: links+'/departments/{department_id}/members',
		updateDepartmentOfFriend: links+'/departments/{department_id}/members/exchange',  //
		allMemberSimple: links + "/departments/temp_in_page"
	},
	groups:{
		// create: links+'/groups/create',
		create: links+'/groups',
		// delete: links+'/groups/delete_group',
		delete: links+'/groups/{group_id}/delete',
		// addMember: links+'/groups/append',
		addMember: links+'/groups/{group_id}/member',
		// addMembers: links+'/groups/append_multi',
		addMembers: links+'/groups/{group_id}/members',
		// deleteMember: links+'/groups/delete',
		deleteMember: links+'/groups/{group_id}/member/delete',
		// deleteMembers: links+'/groups/delete_multi',
		deleteMembers: links+' /groups/{group_id}/members/delete',
		// modifyName: links+'/groups/update',
		modifyName: links+'/groups/{group_id}',
		// all: links+'/groups/find_all_group',
		all: links+'/groups',
		// members: links+'/groups/find_all_member',
		members: links+'/groups/{group_id}/member',
		// allmember: links + '/groups/get_group_member',
		allmember: links + '/groups/members',
		// exit: links + '/groups/exit_group',	
		exit: links + '/groups/{group_id}/exit_group',		
		allMemberSimple: links + '/groups/get_group_member_in_page'
	}
}
export var apiMeeting = {
	base:{
		info: meeting+'/meetings/',
		all: '',
		self: meeting+'/meetings/founder',
		cancle: meeting+'/meetings/{mid}/cancelling'
	},
	join:{
		
	},
	order:{
		// all: meeting+'/meetings/find_all_meetings_unready',
		all: meeting+'/meetings/unready',
		// create: meeting+'/meetings/create',
		create: meeting + '/meetings',
		// addMember: meeting+'/meetings/add_member'
		addMember: meeting+'/meetings/{mid}/members'
	},
	history:{
		all: meeting+'/meetings/find_all_meetings_history'
	},
	miss:{
		// all: meeting+'/meetings/find_all_meetings_end'
		all: meeting+'/meetings/end'
	},
	now:{
		// all: meeting+'/meetings/find_all_meetings_ing',
		all: meeting+'/meetings/starting',
		// start: meeting+'/meetings/start_meeting_status',
		start: meeting+'/meetings/{mid}/start',
		// end: meeting+'/meetings/end_meeting_status',
		end: meeting+'/meetings/{mid}/end',

		delete:meeting+'/meetings/{mid}/members/delete',

		// members: meeting+'/meetings/get_meeting_members',
		members: meeting+'/meetings/{mid}/members',
		// exit: meeting+'/meetings/member_exit_meeting',
		exit: meeting+'/meetings/{mid}/exit',
		// entry: meeting+'/meetings/member_entry_meeting',
		entry: meeting+'/meetings/{mid}'
	}
}
export var apiMsg = {
	ws:{
		endpoint: websocket+'/ws/contacts',
		subcribe: '/topic/{id}' 
	},
	pull:{
		undo: notify+'/notifications',
		history: notify+'/notifications/history/{page}'
	}
}