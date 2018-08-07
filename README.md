# video-conferencing

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 2018-08-07 史鑫鑫
#### FriendsGroup:好友群组页面
        data:添加的data
            1.selfInfo:个人信息
            {
                nickname:"b",
                phone:"141312",
                ......
            }
            2.allGroup:所有群信息列表，json数组
            [{
                id:123,
                groupName:"视频会议",
                ...
            },{
                id:456,
                groupName:"研究生2018",
                ...
            }]
            3.allMember:所有群成员信息列表，map格式，key为群id,value为所有群成员信息
            [
                10001=>[{
                    nickname:"a",
                    phone:"123456",
                    ......
                },{
                    nickname:"b",
                    phone:"141312",
                    ......
                }]
            ]
        methods:添加的method
            1.createGroup():创建一个群
                params:
                    groupName:群名
                return:
                    allGroups:所有群信息列表中添加该群
                    allMember:所有群成员信息列表中添加自己
            2.appendGroupUser():群组添加用户
                params:
                    groupId:群id
                    nickname:用户昵称
                return:
                    allMember:所有群成员信息列表添加该成员信息
            3.deleteGroupUser():删除群组中的用户
                params:
                    groupId:群id
                    nickname:用户昵称
                return:
                    allMember:所有群成员信息列表删除该成员信息
            4.updateGroupName():更新群组名称
                params:
                    groupId:群id
                    newGroupName:群新名称
                return：
                    allGroups:所有群信息列表中更新群信息
            5.findAllGroup():查找用户所有群组
                params:
                    无
                return：
                    allGroups:所有群信息列表重新赋值
            6.findAllMember():查找群中所有成员
                params:
                    groupId:群id
                return:
                    allMember:更新该群群成员信息
            7.getSelfInfo():获取个人信息
                params:
                    无
                return:
                    selfInfo:返回个人信息
            8.getUserInfo():根据昵称返回用户信息
                params:
                    nickname:昵称
                return：
                    用户信息
#### MeetingOrder:预约会议界面
        data:添加的data
            1.MeetingInfo:会议信息
        methods:添加的method
            1.createMeeting():创建会议
                params:
                    meetingName:会议名称
                    member:会议成员
                return:
                    MeetingInfo:返回会议信息
#### MeetingNow:开会界面
        data:添加的data
            无
        methods:添加的方法
            1.addMember():会议加人
                params:
                    meetingId:会议Id
                    userNickname:用户昵称
                return:
                    无
#### MeetingJoin:加入会议
        data:添加的data
            1.url:会议连接
        methods:添加的method
            1.joinMeetings():加入会议
                params:
                    mid:会议id
                return：
                    url:返回会议的url














