<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="user" :rules="rules" ref="user" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="nickname">
                    <el-input v-model="user.nickname" placeholder="输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input type="password" placeholder="重复密码" v-model="user.repassword"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="user.phone" placeholder="输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="smscode">
                    <div class="inline-ele">
                        <el-input type="text" placeholder="请输入短信验证码" v-model="user.smscode" @keyup.enter.native="submitForm('user')"></el-input>
                        <el-button type="primary" style="margin-left: 10px;" :disabled="smscode.disabled" @click="handleSendSmsCode">{{smscode.tip}}</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('user')">注册</el-button>
                    <router-link to="/login"><el-button>去登录</el-button></router-link>
                </el-form-item>
                <p style="font-size:12px;margin:0px;color:#999;">Tips : 请填写用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {apiAuth} from '@/api/api.js'
    export default {
        data: function(){
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         if (this.ruleForm.repassword !== '') {
            //             this.$refs.ruleForm.validateField('repassword');
            //         }
            //         callback();
            //     }
            // };
            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请再次输入密码'));
            //     } else if (value !== this.ruleForm.password) {
            //         callback(new Error('两次输入密码不一致!'));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                smscode:{
                    tip: '发送验证码',
                    time: 60,
                    timer: null,
                    disabled: false
                },
                user: {
                    nickname: '',
                    password: '',
                    repassword: '',
                    phone: '',
                    email: '',
                    realname: '',
                    headimg: '',
                    smscode: ''
                },
                rules: {
                    nickname: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        {
                            validator: function (rule, value, callback) {
                                var MobileRegex = /^1[0-9]{10}$/;
                                if (!MobileRegex.test(value)) {
                                    callback(new Error('手机号码格式不正确！'))
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请输入密码'));
                                } else {
                                    if (this.user.repassword !== '') {
                                        this.$refs.user.validateField('repassword');
                                    }
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    repassword: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        {
                            validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请再次输入密码'));
                                } else if (value !== this.user.password) {
                                    callback(new Error('两次输入密码不一致!'));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    smscode: [
                        {required: true, message: '请输入短信验证码', trigger: 'blur' },
                        // { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        name: 'Login',
        methods: {
            submitForm(formName) {
                var $this = this;
                $this.$refs[formName].validate((valid) => {
                    if (valid) {
                        $this.regist($this.user, function(res){
                            $this.$message({
                                message: '注册成功！请登录！',
                                type: 'success'
                            });
                            $this.$router.push({name: 'login'});
                        },function(res){
                           $this.$message.error('注册失败！'+res.msg);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleSendSmsCode() {
                var $this = this;
                $this.sendSmsCode($this.user.nickname, $this.user.phone,function(res){
                    $this.smscode.tip = $this.smscode.time+"秒后重试"
                    $this.smscode.disabled = true;
                    $this.smscode.timer = setInterval(function(){
                        $this.smscode.time--;
                        if($this.smscode.time>0){
                            $this.smscode.tip = $this.smscode.time+"秒后重试"
                        }else{
                            clearInterval($this.smscode.timer);
                            $this.smscode.disabled = false;
                            $this.smscode.time = 60;
                            $this.smscode.tip = "重新发送"
                        }
                    }, 1000);
                }, function(res){
                    $this.$message.error('发送验证码失败！'+res.msg);
                })
                
            },
            sendSmsCode(nickname, phone, cbOk, cbErr){
                var $this = this;
                $this.$axios.post(apiAuth.sms,{
                    nickname: nickname,
                    phone: phone
                }, cbOk, cbErr)
            },
            regist(user, cbOk, cbErr){
                var $this = this;
                $this.$axios.put(apiAuth.regist,
                    {
                        nickname: user.nickname,
                        passwd: user.password,
                        phone: user.phone,
                        verify_code: user.smscode,
                        email: user.email,
                        realname: user.realname,
                        headimg: user.headimg
                    },
                    cbOk, cbErr
                )
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        min-height: fill-available;
        background-color: #324157;
    }
    .ms-title{
        position: absolute;
        top:45%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:42%;
        width:300px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
</style>