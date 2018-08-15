<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名或手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item>
                    <router-link to="/frame">
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </router-link>
                    <router-link to="/regist"><el-button>去注册</el-button></router-link>
                </el-form-item>
                <p style="font-size:12px;margin:0px;color:#999;">Tips : 请填写用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {apiAuth} from '@/api/api.js'
    export default {
        data(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        created: function(){
            // console.log(process.env)
        },
        name: 'Login',
        methods: {
            //登录
            login(user, cbOk, cbErr) {
                var $this = this;
                $this.$axios.post(apiAuth.login,
                    {
                        nickname: user.username,
                        password: user.password
                    },
                    cbOk, cbErr
                )
            },
            submitForm(formName) {
                var $this = this
                $this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // localStorage.setItem('ms_username',this.ruleForm.username);
                        // this.$router.push('/');
                        $this.login($this.ruleForm, function(){
                            $this.$router.push({name: 'friend'})
                            $this.$message({
                                message: '登录成功！',
                                type: 'success'
                            });
                        },function(){
                            $this.$router.push({name: 'login'})
                            $this.$message.error('用户名或密码错误！');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
</style>