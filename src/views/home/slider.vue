<template>
    <div class="slider">
        <div class="silder_left">
            <div class="slider_logo">
                <img src="../../../static/img/logo.png" alt="妈妈去哪儿">
            </div>
            <ul id="firstMenu_ul">
                <li @click="firstMenuClickEvent($event)" :type="'shouye'" :text="'首页'" :class="[$store.state.home.menuSetting.currFid ? '' : 'active' , 'fa fa-desktop']">首页</li>
                <li @click="firstMenuClickEvent($event)" v-for="(item, index) in baseMenu" :key="item.resourceId" :text="item.resourceName"
                    :type="item.resourceId" :class="[$store.state.home.menuSetting.currFid == item.resourceId ? 'active' : '', iconArr[index]]"
                    v-text="item.resourceName"></li>
                <!-- <li @click="oderlistClick($event)" class="fa fa-file-text-o">订单</li> -->
            </ul>
            <el-popover placement="bottom" v-model="popoverisShow" width="127" trigger="click" :style="{textAlign: 'center'}">
                <div @click="editPasswordEvent" class="dropdown">
                    修改密码
                </div>
                <div @click="loginOutEvent" class="dropdown">
                    退出系统
                </div>
                <div slot="reference" class="userInfoWrap">
                    <div style="color: #E0E0DE; padding-top: 17px; text-align: center; cursor: pointer">
                        <div style="background: #f5f5f5; width: 24px; height: 24px; border-radius: 50%;display: inline-block">
                            <img src="../../../static/img/login/adm.png" alt="头像">
                        </div>
                        <br>
                        <span>{{myBase.splitUserName($store.state.home.userInfo.user.userName)}}</span>
                        <span :class="[popoverisShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></span>
                    </div>
                </div>
            </el-popover>
        </div>
        <div v-show="$store.state.home.menuSetting.isNextMenuShow" class="silder_right">
            <div class="silder_right_top">
                <h4 :style="{textAlign: 'center', margin: '0', padding: '0', lineHeight: '45px', color: '#313131'}"
                    v-text="nextMenuTitle"></h4>
            </div>
            <ul id="secondMenu_ul">
                <li @click="secondMenuClickEvent($event)" v-for="(item, index) in $store.state.home.menuSetting.currSlist"
                    :class="[index == 0 && !$store.state.home.menuSetting.currSid ? 'active' : '', $store.state.home.menuSetting.currSid == item.resourceId ? 'active' : '']"
                    :routerUrl="item.frontPath" :type="item.resourceId" :key="item.resourceId" v-text="item.resourceName"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    // import api from 'api/login'
    export default {
        name: "slider",
        props: ["menuList"],
        data() {
            return {
                baseMenu: null,
                iconArr: ["fa fa-th", "fa fa-file-text-o", "fa fa-clipboard", "fa fa-cubes", "fa fa-user-o", "fa fa-gear"],
                popoverisShow: false,
                nextMenuList: this.$store.state.home.menuSetting.currSlist,
                nextMenuMap: {},
                nextMenuTitle: '商品'
            };
        },
        computed: {},
        methods: {
            firstMenuClickEvent($event) {
                $('#firstMenu_ul>li').removeClass('active')
                var tha = $event.currentTarget
                var type = $(tha).attr('type')
                var text = $(tha).attr('text')

                $(tha).addClass('active')
                if (type == 'shouye') {
                    this.$store.commit('setNextMenuShow', false)
                    this.$router.push({
                        path: '/main'
                    });
                    return
                } else {
                    this.$store.commit('setNextMenuShow', true)
                }
                this.baseMenu.forEach((item, index) => {
                    if (type == item.resourceId) {
                        this.nextMenuList = item.childMenus
                        this.$store.commit("setCurrFid", type)
                        this.$store.commit("setCurrSid", this.nextMenuList[0].resourceId)
                        this.$store.commit("setCurrSlist", this.nextMenuList)
                    }
                });

                this.nextMenuTitle = text
                this.$router.push({
                    path: this.nextMenuList[0].frontPath
                });
            },
            secondMenuClickEvent($event) {
                $('#secondMenu_ul>li').removeClass('active')
                var tha = $event.currentTarget
                var path = $(tha).attr('routerUrl')
                var type = $(tha).attr('type')

                this.$store.commit("setCurrSid", type)

                $(tha).addClass('active')
                this.$router.push({
                    path: path
                });

            },
            loginOutEvent() {
                this.myBase.confirm('你确定要退出登录?', () => {
                    // api.loginOut().then(() => {
                    //     this.$router.push({
                    //         path: '/login'
                    //     })
                    // })
                })
            },
            editPasswordEvent() {
                this.$router.push({
                    path: '/editPassword'
                })
            }
        },
        created() {
            this.baseMenu = this.$store.state.home.userInfo.menuList
            this.nextMenuMap = this.$store.state.home.nextMenuMap
            var perssionArr = []

            for (var item0 of this.baseMenu) {
                if (item0.childMenus) {
                    for (var item1 of item0.childMenus) {
                        perssionArr.push(item1.resourceName)
                        if (item1.childMenus) {
                            for (var item2 of item1.childMenus) {
                                perssionArr.push(item2.resourceName)
                            }
                        }
                    }
                }
            }

            console.log(perssionArr)

            this.$store.commit("setPerssionArr", perssionArr)
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
