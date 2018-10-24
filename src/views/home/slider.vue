<template>
    <div class="slider">
        <div class="silder_left">
            <div class="slider_logo">
                <img src="../../../static/img/logo.png" alt="妈妈去哪儿">
            </div>
            <ul id="firstMenu_ul">
                <li @click="firstMenuClickEvent($event, 1)" :text="'统计'" :class="[currenMenuId == 1 ? 'active' : '']" class="fa fa-line-chart">统计</li>
                <li @click="firstMenuClickEvent($event, 2)" :text="'商品'" :class="[currenMenuId == 2 ? 'active' : '']" class="fa fa fa-th">商品</li>
                <li @click="firstMenuClickEvent($event, 6)" :text="'规格'" :class="[currenMenuId == 6 ? 'active' : '']" class="fa fa fa-street-view">规格</li>
                <li @click="firstMenuClickEvent($event, 5)" :text="'类目'" :class="[currenMenuId == 5 ? 'active' : '']" class="fa fa fa-modx">类目</li>
                <li @click="firstMenuClickEvent($event, 3)" :text="'订单'" :class="[currenMenuId == 3 ? 'active' : '']" class="fa fa-file-text-o">订单</li>
                <li @click="firstMenuClickEvent($event, 4)" :text="'桌码'" :class="[currenMenuId == 4 ? 'active' : '']" class="fa fa-bullseye">桌码</li>
            </ul>
            <el-popover placement="bottom" v-model="popoverisShow" width="127" trigger="click" :style="{textAlign: 'center'}">
                <!-- <div @click="editPasswordEvent" class="dropdown">
                    修改密码
                </div> -->
                <div @click="loginOutEvent" class="dropdown">
                    退出系统
                </div>
                <div slot="reference" class="userInfoWrap">
                    <div style="color: #E0E0DE; padding-top: 17px; text-align: center; cursor: pointer">
                        <div style="background: #f5f5f5; width: 24px; height: 24px; border-radius: 50%;display: inline-block">
                            <img src="../../../static/img/login/adm.png" alt="头像">
                        </div>
                        <br>
                        <span>{{myBase.splitUserName($store.state.userInfo.username)}}</span>
                        <!-- <span>wwww</span> -->
                        <span :class="[popoverisShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></span>
                    </div>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script>
    // import api from 'api/login'
    export default {
        name: "slider",
        data() {
            return {
                baseMenu: null,
                currenMenuId: this.$store.state.currentMenuId,
                popoverisShow: false
            };
        },
        computed: {},
        methods: {
            firstMenuClickEvent($event, type) {
                // $('#firstMenu_ul>li').removeClass('active')
                // var tha = $event.currentTarget

                this.$store.commit('setCurrentMenuId', type)
                this.currenMenuId = type

                if (type == 1) {
                    this.$router.push({
                        path: '/main'
                    })
                }
                if (type == 2) { //商品
                    this.$router.push({
                        path: '/goodList'
                    })
                }
                if (type == 4) { //桌码
                    this.$router.push({
                        path: '/deskCode'
                    })
                }
                if (type == 5) { //类目
                    this.$router.push({
                        path: '/category'
                    })
                }
                if (type == 6) { //规格
                    this.$router.push({
                        path: '/SKUList'
                    })
                }

            },

            loginOutEvent() {
                this.myBase.confirm('你确定要退出登录?', () => {
                    this.$router.push({
                        path: '/login'
                    })
                })
            },
            editPasswordEvent() {
                this.$router.push({
                    path: '/editPassword'
                })
            }
        },
        created() {
            console.log(this.$store.state.userInfo)
        }

    };

</script>
<style scoped>
    .slider {
        height: 100%;
        float: left;
    }

    .slider_logo {
        text-align: center;
        width: 100%;
        height: 90px;
        line-height: 90px;
    }

    .silder_left {
        width: 90px;
        height: 100%;
        background: #2c303c;
        float: left;
        box-sizing: border-box;
        position: relative;
    }

    .userInfoWrap {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .silder_left .active {
        background: #f5f5f5;
        color: #313131
    }

    .silder_left li {
        text-align: center;
        color: #dcdedc;
        width: 100%;
        padding: 10px 0px;
        margin: 10px 0;
        cursor: pointer;
    }

    .silder_left li:last-child {
        margin-top: 50px;
    }

    .silder_right {
        width: 110px;
        height: 100%;
        background: #ffffff;
        float: right;
        border: 1px solid #e4e8eb;
        color: #636365;
        box-sizing: border-box;
        border-bottom: none;
        border-left: none;
    }

    .silder_right_top {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e4e8eb;
    }

    .silder_right li {
        width: 90px;
        text-align: center;
        box-sizing: border-box;
        padding: 7px 0;
        margin: 13px 0 13px 0;
        margin-left: 9px;
        border-radius: 3px;
        cursor: pointer;
    }

    .silder_right li:hover {
        color: #409EFF
    }

    .silder_right .active {
        border: 1px solid #f4f4f4;
        background: #f5f5f5
    }

    ul {
        list-style: none;
        text-align: center;
        padding: 0
    }

    .silder_left ::before {
        margin-right: 10px;
    }

    .silder_left .el-icon-caret-bottom:before {
        margin-right: 0px;
    }

    .silder_left .el-icon-caret-top:before {
        margin-right: 0px;
    }

    .userInfoWrap {
        width: 100%;
        height: 75px;
        background: #374455;
        position: absolute;
        bottom: 0;
    }

    .el-popover {
        min-width: 100;
    }

    .dropdown {
        text-align: center;
        margin: 5px 0;
        padding: 5px 0;
        cursor: pointer;
    }

    .dropdown:hover {
        background: #ECF5FF;
        color: #66B1FF;
    }

</style>
