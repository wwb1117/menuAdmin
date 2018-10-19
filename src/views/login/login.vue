<template>
    <div class="login_wrap" :style="{height: $store.state.device.height + 'px', background: '#f5f5f5'}">
        <div class="login_box">
            <div class="login_logo">
                <img style="width: 320px" src="../../../static/img/login/login.png" alt="妈妈去哪儿">
            </div>
            <div class="login_content">
                <div class="login_title">登录</div>
                <div class="login_input_wrap">
                    <el-input placeholder="账号" v-model="userInfo.username" @keyup.enter.native="loginEvent" :style="{width: '320px'}"
                        clearable>
                    </el-input>
                </div>
                <div class="login_input_wrap">
                    <el-input placeholder="密码" type="password" v-model="userInfo.pwd" @keyup.enter.native="loginEvent"
                        :style="{width: '320px'}" clearable>
                    </el-input>
                </div>
                <div class="login_remPwd">
                    <el-checkbox v-model="isRemPwd">记住密码</el-checkbox>
                </div>
                <div class="login_loginBtn">
                    <el-button @click="loginEvent" class="logo_red" :style="{width: '320px'}" type="danger">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import lapi from 'api/login'
    export default {
        data() {
            return {
                isRemPwd: true,
                userInfo: {
                    username: "",
                    pwd: ""
                }
            };
        },
        computed: {},
        methods: {
            loginEvent() {
                if (this.userInfo.username == "") {
                    this.$message({
                        message: "请输入账号",
                        showClose: true,
                        type: "warning"
                    });
                    return;
                }
                if (this.userInfo.pwd == "") {
                    this.$message({
                        message: "请输入密码",
                        showClose: true,
                        type: "warning"
                    });
                    return;
                }

                if (this.isRemPwd) {
                    window.localStorage.setItem("user", JSON.stringify(this.userInfo));
                } else {
                    window.localStorage.removeItem("user");
                }

                lapi.login(this.userInfo).then(reponse => {
                    sessionStorage.setItem("user", JSON.stringify(this.userInfo))
                    this.$router.push({
                        path: '/main'
                    });
                    this.$store.commit('setUserInfo', this.userInfo)
                });
            }
        },
        activated() {
            var olduser = window.localStorage.getItem("user");

            if (olduser) {
                olduser = JSON.parse(olduser);
                this.userInfo = olduser;
            } else {
                this.userInfo = {
                    username: "",
                    pwd: ""
                };
            }
        }
    };

</script>
<style scoped>
    .login_wrap {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
    }

    .login_box {
        width: 403px;
        height: 400px;
        position: absolute;
        left: 0;
        right: 0;
        top: 20%;
        margin: auto;
    }

    .login_logo {
        text-align: center;
    }

    .login_content {
        background: #ffffff;
        height: 335px;
        border-radius: 3px;
    }

    .login_title {
        font-size: 18px;
        text-align: center;
        letter-spacing: 2px;
        color: #606266;
        padding: 30px 0;
    }

    .login_input_wrap {
        text-align: center;
        margin-bottom: 17px;
    }

    .login_remPwd {
        padding-left: 42px;
    }

    .login_loginBtn {
        padding: 40px 0;
        text-align: center;
    }

</style>
