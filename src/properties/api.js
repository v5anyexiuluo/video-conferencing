// 配置API接口地址
var auth = process.env.API_AUTH_ROOT
var links = process.env.API_LINKS_ROOT
var chat = process.env.API_CHAT_ROOT
var meeting = process.env.API_MEETING_ROOT
var notify = process.env.API_NOTIFY_ROOT
var websocket = process.env.API_WS_ROOT

export var apiAuth = {
	auth: auth,
	login: auth+'/users/sign_in',
	logout: auth+'/users/sign_out',
	regist: auth+'/users/register',
	forget: auth+'/users/forget',
	sms: auth+'/users/getSms',
	forgetsms: auth+'/users/getForgetSms',
	userInfo: links+'/user',
	userInfoByNickname: links+'/user/{nickname}',
	edit: auth+'/users/{userid}'
}
export var apiChat = {
	chat: chat
}
export var apiLinks = {
	links: links,
	friends:{
		all:links+'/friends',
		add: links+'/friends/notification',
		delete: links+'/friends/',
		allDepartments: links+'/departments/',
		addDepartment: links+'/departments/',
		updateDepartment: links+'/departments/{department_id}',
		deleteDepartment: links+'/departments/{department_id}',
		addFriendToDepartment: links+'/departments/{department_id}/member',
		addFriendsToDepartment: links+'/departments/{department_id}/members',
		updateDepartmentOfFriend: links+'/departments/{department_id}/members/exchange'
	},
	groups:{
		create: links+'/groups',
		delete: links+'/groups/{group_id}/delete',
		addMember: links+'/groups/{group_id}/member',
		addMembers: links+'/groups/{group_id}/members',
		deleteMember: links+'/groups/{group_id}/member/delete',
		deleteMembers: links+' /groups/{group_id}/members/delete',
		modifyName: links+'/groups/{group_id}',
		all: links+'/groups',
		members: links+'/groups/{group_id}/member',
		allmember: links + '/groups/members',
		exit: links + '/groups/{group_id}/exit'
	}
}
export var apiMeeting = {
	meeting: meeting,
	base:{
		info: meeting+'/meetings/',
		all: '',
		self: meeting+'/meetings/founder',
		cancle: meeting+'/meetings/{mid}/cancelling'
	},
	join:{
		
	},
	order:{
		all: meeting+'/meetings/unready',
		create: meeting + '/meetings',
		addMember: meeting+'/meetings/{mid}/members'
	},
	history:{
		all: meeting+'/meetings/find_all_meetings_history'
	},
	miss:{
		all: meeting+'/meetings/end'
	},
	now:{
		all: meeting+'/meetings/starting',
		start: meeting+'/meetings/{mid}/start',
		end: meeting+'/meetings/{mid}/end',
		delete:meeting+'/meetings/{mid}/members/delete',
		add: meeting+'/meetings/{mid}/members',
		members: meeting+'/meetings/{mid}/members',
		exit: meeting+'/meetings/{mid}/exit',
		entry: meeting+'/meetings/{mid}'
	}
}
export var apiMsg = {
	websocket: websocket,
	notify: notify,
	ws:{
		endpoint: websocket+'/ws/contacts',
		subcribe: '/topic/{id}' 
	},
	pull:{
		undo: notify+'/notifications',
		history: notify+'/notifications/history'
	}
} 
