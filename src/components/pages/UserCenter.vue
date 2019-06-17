<template>
  <el-container>
    <el-header height="200px">
    </el-header>
    <el-container>
      <el-aside width="400px">
        <el-button
          class="edit"
          size="mini"
          icon="el-icon-edit"
          @click="handleEdit"
        >
          编辑
        </el-button>
        <img class="headImg" src="@/assets/images/user.jpg">

        <div class="nickname">{{UserInfo.nickname}}</div>
        <div class="motto">{{UserInfo.motto?UserInfo.motto:"编辑一段个人宣言吧！"}}</div>
        <el-form :label-position="'right'" label-width="90px" :model="UserInfo">
          <el-form-item label="手机：">
            <el-input class="info" :value="UserInfo.phone?UserInfo.phone:'未设置'" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input :value="UserInfo.email?UserInfo.email:'未设置'" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input :value="UserInfo.realname?UserInfo.realname:'未设置'" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-dialog
          title="修改个人信息"
          :visible.sync="UserInfoDialogVisible"
          width="25%">

          <el-form
            :label-position="'right'"
            label-width="90px"
            :model="EditUserInfo"
            :rules="rules"
            ref="EditUserInfo">

            <el-form-item label="头像：" prop="headimg">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="headImg">
                <img v-else class="headImg" src="@/assets/images/user.jpg">
              </el-upload>
            </el-form-item>

            <el-form-item label="昵称：" prop="nickname">
              <el-input
                v-model="EditUserInfo.nickname"
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="宣言：" prop="motto">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                v-model="EditUserInfo.motto"
                placeholder="请输入宣言"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
              <el-input
                v-model="EditUserInfo.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input
                v-model="EditUserInfo.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名：" prop="realname">
              <el-input
                v-model="EditUserInfo.realname"
                placeholder="请输入真实姓名"
              ></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="UserInfoDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="Edit('EditUserInfo')">修 改</el-button>
          </span>
        </el-dialog>
      </el-aside>
      <el-main>
        兴趣爱好
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { apiAuth, apiLinks, apiMeeting } from '@/properties/api.js'
import utils from '@/assets/js/utils.js'
export default {
  data () {
    return {
      imageUrl: '',
      UserInfo: {
        nickname: '史鑫鑫',
        motto: '一点寒芒先到，随后枪出如龙。',
        phone: '15029057276',
        email: '575893505@qq.com',
        realname: '史鑫鑫'
      },
      EditUserInfo: {
        nickname: '史鑫鑫',
        motto: '一点寒芒先到，随后枪出如龙。',
        phone: '15029057276',
        email: '575893505@qq.com',
        realname: '史鑫鑫'
      },
      disabled: true,
      UserInfoDialogVisible: false,
      rules: {
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              var MobileRegex = /^1[34578]\d{9}$/
                if (MobileRegex.test(value)) {
                callback(new Error('用户名不可以是手机号！'))
              } else {
                callback()
                }
            },
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              var MobileRegex = /^1[34578]\d{9}$/
                if (!MobileRegex.test(value)) {
                callback(new Error('手机号码格式不正确！'))
              } else {
                callback()
                }
            },
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              var MobileRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                if (!MobileRegex.test(value)) {
                callback(new Error('邮箱格式不正确！'))
              } else {
                callback()
                }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  name: 'UserCenter',
  components: {

  },
  mounted () {
    this.getInfo()
  },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log(file)
      console.log(file.raw)
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleEdit () {
      this.UserInfoDialogVisible = true
      this.getEditInfo()
    },

    getEditInfo () {
      let $this = this
      $this.getSelfInfo(
        function (res) {
          $this.EditUserInfo = res.data.data
        },
        function (res) {
          $this.$message.error('获取用户信息失败！')
        }
      )
    },

    getInfo () {
      let $this = this
      $this.getSelfInfo(
        function (res) {
          $this.UserInfo = res.data.data
        },
        function (res) {
          $this.$message.error('获取用户信息失败！')
        }
      )
    },

    getSelfInfo (cbOk, cbErr) {
      let $this = this
      $this.$axios.get(apiAuth.userInfo, null, cbOk, cbErr)
    },
    Edit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.UserInfoDialogVisible = false
          this.EditInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    EditInfo () {
      let $this = this
      $this.EditSelfInfo(
        $this.EditUserInfo,
        function (res) {
          console.log('res')
          console.log(res)
          $this.getInfo()
        }, function (res) {
          console.log('更新失败')
          console.log(res)
          $this.$message.error('更新用户信息失败！')
        }
      )
    },
    EditSelfInfo (user, cbOk, cbErr) {
      let $this = this
      $this.$axios.post(
        utils.handleParamInUrl(apiAuth.edit, {
          userid: user.id
        }),
        {
          nickname: user.nickname,
          motto: user.motto,
          phone: user.phone,
          email: user.email,
          realname: user.realname
        },
        cbOk,
        cbErr
      )
    }
  }
}
</script>
<style scoped>
.el-header {
  background: url(../../assets/images/background.jpg);
	background-size: contain;
}

.el-aside {
  position: relative;
  background-color: #D3DCE6;
  padding: 10px;
}

.el-main {
  background-color: #E9EEF3;
}

.headImg {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}

.edit {
  position: absolute;
  right: 10px;
  top: 10px;
}

.nickname {
  font-size: 25px;
  color: brown
}

.motto {
  color: chocolate;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-bottom: 50px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

</style>
