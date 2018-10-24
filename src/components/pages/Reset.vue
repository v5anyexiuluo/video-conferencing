<template>
    <div class="login-wrap">
        <div class="ms-title">重置密码</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="phone">
                    <el-input v-model="ruleForm.phone" clearable placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="新密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input type="password" placeholder="重复新密码" v-model="ruleForm.repassword" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="smscode">
                    <div class="inline-ele">
                        <el-input
                          type="text"
                          clearable
                          placeholder="请输入短信验证码"
                          v-model="ruleForm.smscode"
                          @keyup.enter.native="submitForm('ruleForm')"
                        >
                        </el-input>
                        <el-button
                          type="primary"
                          style="margin-left: 10px;"
                          :disabled="smscode.disabled"
                          @click="handleSendForgetSmsCode"
                        >
                          {{smscode.tip}}
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">重置密码</el-button>
                    <router-link to="/login"><el-button>取消</el-button></router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { apiAuth } from "@/properties/api.js";
export default {
  data() {
    return {
      smscode: {
        tip: "发送验证码",
        time: 60,
        timer: null,
        disabled: false
      },
      ruleForm: {
        phone: "",
        password: "",
        repassword: "",
        smscode: ""
      },
      rules: {
        phone: [{ required: true, message: "请输入手机", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.password) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        smscode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
          // { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created: function() {
    // console.log(process.env)
  },
  name: "Reset",
  methods: {
    // 重置
    reset(ruleForm, cbOk, cbErr) {
      var $this = this;
      $this.$axios.post(
        apiAuth.forget,
        {
          phone: ruleForm.phone,
          passwd: ruleForm.password,
          verify_code: ruleForm.smscode
        },
        cbOk,
        cbErr
      );
    },
    submitForm(formName) {
      var $this = this;
      $this.$refs[formName].validate(valid => {
        if (valid) {
          // localStorage.setItem('ms_username',this.ruleForm.username);
          // this.$router.push('/');
          $this.reset(
            $this.ruleForm,
            function(res) {
              $this.$router.push({ name: "login" });
              $this.$message({
                message: "重置密码成功",
                type: "success"
              });
            },
            function(res) {
              $this.$router.push({ name: "login" });
              $this.$message.error("重置密码失败");
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSendForgetSmsCode() {
      var $this = this;
      $this.sendForgetSmsCode(
        $this.ruleForm.phone,
        function(res) {
          $this.smscode.tip = $this.smscode.time + "秒后重试";
          $this.smscode.disabled = true;
          $this.smscode.timer = setInterval(function() {
            $this.smscode.time--;
            if ($this.smscode.time > 0) {
              $this.smscode.tip = $this.smscode.time + "秒后重试";
            } else {
              clearInterval($this.smscode.timer);
              $this.smscode.disabled = false;
              $this.smscode.time = 60;
              $this.smscode.tip = "重新发送";
            }
          }, 1000);
        },
        function(res) {
          $this.$message.error("发送验证码失败！" + res.data.msg);
        }
      );
    },
    sendForgetSmsCode(phone, cbOk, cbErr) {
      var $this = this;
      $this.$axios.post(
        apiAuth.forgetsms,
        {
          phone: phone
        },
        cbOk,
        cbErr
      );
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: fill-available;
  background-color: #324157;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
</style>