<template>
    <div class="main_wrap">
        <div class="main_top" v-text="$store.state.home.userInfo.user.buyerCompanyName"></div>
        <div class="main_content">
            <div class="main_cont_left">
                <div class="main_cont_left_top">
                    今日简报
                </div>
                <ul class="main_jianbao_ul">
                    <li><span :class="[myBase.isHasPerssion('首页统计') ? 'num' : '']">{{baseData.totalDeliverMoney |
                            numFormat}}</span><br><span class="text">出库金额</span></li>
                    <li :style="{borderLeft: '1px solid #E4E7ED', borderRight: '1px solid #E4E7ED'}"><span :class="[myBase.isHasPerssion('首页统计') ? 'num' : '']">{{baseData.totalInventoryMoney
                            | numFormat}}</span><br><span class="text">库存金额</span></li>
                    <li><span :class="[myBase.isHasPerssion('首页统计') ? 'num' : '']">{{baseData.totalPurchaseMoneyByWeek
                            | numFormat}}</span><br><span class="text">本周采购</span></li>
                </ul>
                <div class="main_cont_left_top">
                    常用功能
                </div>
                <ul class="main_func_ul">
                    <li @click="skipEvent(1)" :style="{background: '#439EFF', cursor: 'pointer'}">
                        <div :style="{color: '#439EFF'}"><span class="fa fa-plus"></span></div><span class="text">新增商品</span>
                    </li>
                    <li @click="skipEvent(2)" :style="{background: '#67C23D', cursor: 'pointer', borderLeft: '1px solid #E4E7ED', borderRight: '1px solid #E4E7ED'}">
                        <div :style="{color: '#67C23D'}"><span class="fa fa-file"></span></div><span class="text">新增采购单</span>
                    </li>
                    <li @click="skipEvent(3)" :style="{background: '#E6A23F', cursor: 'pointer'}">
                        <div :style="{color: '#E6A23F'}"><span class="fa fa-download"></span></div><span class="text">商品入库</span>
                    </li>
                    <li @click="skipEvent(4)" :style="{background: '#F56C6C', cursor: 'pointer'}">
                        <div :style="{color: '#F56C6C'}"><span class="fa fa-upload"></span></div><span class="text">商品出库</span>
                    </li>
                    <li @click="skipEvent(5)" :style="{background: '#CA7ABD', cursor: 'pointer'}">
                        <div :style="{color: '#CA7ABD'}"><span class="fa fa-search"></span></div><span class="text">库存查询</span>
                    </li>
                </ul>
                <div class="main_cont_left_top">
                    销售统计
                </div>
                <div id="main_chart_wrap">
                    <div id="main_chart_left">
                        <div class="main_chart_left_top">
                            <div :style="{height: '45px', lineHeight: '45px', color: '#606266'}">本周销售额</div>
                            <div :style="{fontSize: '20px'}">123,000.00</div>
                            <div :style="{color: '#909399'}">同比上周 <span> 10% </span> <span class="fa fa-level-up upGreen"></span></div>
                        </div>
                        <div class="main_chart_left_bot">
                            <div :style="{height: '45px', lineHeight: '45px', color: '#606266'}">本周毛利</div>
                            <div :style="{fontSize: '20px'}">3,000.00</div>
                            <div :style="{color: '#909399'}">同比上周 <span> 10% </span> <span class="fa fa-level-up upGreen"></span></div>
                        </div>
                    </div>
                    <div id="main_chart_right">
                        <Echart :option="echartOpt"></Echart>
                    </div>
                </div>
            </div>
            <div class="main_cont_right">
                <div class="main_cont_left_top">
                    待办事件
                </div>
                <ul class="main_cont_right_ul" id="main_cont_preEvent">
                    <li>待审核采购单<el-badge :value="baseData.purchaseCount" :max="10"></el-badge>
                    </li>
                    <li>待审核入库单<el-badge :value="baseData.storeCount" :max="10"></el-badge>
                    </li>
                </ul>
                <div class="main_cont_left_top">
                    商品预警
                </div>
                <ul class="main_cont_right_ul" id="main_cont_preGood">
                    <li>商品库存高于上限<el-badge :value="baseData.totalUpper" :max="10"></el-badge>
                    </li>
                    <li>商品库存低于下限<el-badge :value="baseData.totalLower" :max="10"></el-badge>
                    </li>
                    <li>商品效期预警<el-badge :value="baseData.totalOutter" :max="10"></el-badge>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Echart from 'components/Echart'
    // import api from 'api/home'
    export default {
        name: 'main',
        components: {
            Echart
        },
        data() {
            return {
                echartOpt: {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                },
                baseData: {
                    totalDeliverMoney: 'xx',
                    totalInventoryMoney: 'xx',
                    totalPurchaseMoneyByWeek: 'xx',
                    purchaseCount: '*',
                    storeCount: '*',
                    totalUpper: '*',
                    totalLower: '*',
                    totalOutter: '*'
                }
            }

        },
        methods: {
            // getData() {
            //     api.getHomeInfo().then((response) => {
            //         this.baseData = response.data
            //     })
            // },
            setMenu(firid, secid) {
                $('#firstMenu_ul>li').removeClass('active')
                $('#secondMenu_ul>li').removeClass('active')
                this.$store.commit('setNextMenuShow', true)

                this.$store.state.home.userInfo.menuList.forEach((item, index) => {
                    if (item.resourceId == firid) {
                        this.$store.commit("setCurrFid", item.resourceId)
                        this.$store.commit("setCurrSlist", item.childMenus)
                    }
                })
                $('#firstMenu_ul>[type=' + firid + ']').addClass('active')
                $('#secondMenu_ul>[type=' + secid + ']').addClass('active')
                this.$store.commit("setCurrSid", secid)
            },
            skipEvent(type) {
                if (type == 1) {
                    if (this.myBase.isHasPerssion('添加商品')) {
                        this.$router.push({
                            path: '/addGoods'
                        })
                        this.setMenu(1, 2)

                    } else {
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '对不起,你无此权限!'
                        })
                    }
                }
                if (type == 2) {
                    if (this.myBase.isHasPerssion('新建采购单')) {
                        this.$router.push({
                            path: '/addPurchaseList/' + '1'
                        })
                        this.setMenu(34, 35)
                    } else {
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '对不起,你无此权限!'
                        })
                    }
                }
                if (type == 3) {
                    if (this.myBase.isHasPerssion('新增入库单')) {
                        this.$router.push({
                            name: '新增入库',
                            params: {
                                type: '入库'
                            }
                        })
                        this.setMenu(57, 58)
                    } else {
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '对不起,你无此权限!'
                        })
                    }
                }
                if (type == 4) {
                    if (this.myBase.isHasPerssion('新增出库单')) {
                        this.$router.push({
                            name: '新增入库',
                            params: {
                                type: '出库'
                            }
                        })
                        this.setMenu(57, 66)
                    } else {
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '对不起,你无此权限!'
                        })
                    }
                }
                if (type == 5) {
                    if (this.myBase.isHasPerssion('商品库存')) {
                        this.$router.push({
                            path: '/repertoryList'
                        })
                        this.setMenu(57, 71)
                    } else {
                        this.$message({
                            type: 'warning',
                            duration: 1500,
                            showClose: true,
                            message: '对不起,你无此权限!'
                        })
                    }
                }
            }
        },
        activated() {
            if (this.myBase.isHasPerssion('首页统计')) {
                // this.getData()
            }
        }

    }

</script>

<style scoped>
    .main_cont_right_ul {
        height: 337px;
        background: #ffffff;
        padding: 0 10px;
    }

    #main_cont_preGood {
        height: 270px;
    }

    .main_cont_right_ul .sup {
        top: 0;
        float: right;
    }

    .main_cont_right_ul .el-badge {
        float: right;
    }

    .main_cont_right_ul>li {
        height: 60px;
        line-height: 60px;
        float: left;
        width: 100%;
        border-bottom: 1px solid #E4E7ED;
    }

    .main_wrap {
        width: 100%;
        height: 100%;
        background: #F5F5F5;
        overflow: auto;
    }

    .main_top {
        height: 46px;
        border-bottom: 1px solid #E4E7ED;
        font-size: 18px;
        color: #606266;
        line-height: 46px;
        padding-left: 25px;
        background: #ffffff;
    }

    .main_content {
        padding: 0 25px;
    }

    .main_cont_left {
        width: 70%;
        float: left;
    }

    .main_cont_left_top {
        height: 52px;
        color: #323436;
        padding-top: 25px;
        font-weight: 600;
    }

    ul {
        list-style: none;
    }

    .main_jianbao_ul {
        list-style: none;
        height: 122px;
        background: #ffffff;
        padding: 35px 0;
    }

    .main_jianbao_ul>li {
        width: 33.3%;
        float: left;
        text-align: center;
    }

    .main_jianbao_ul .num {
        font-size: 26px;
    }

    .main_jianbao_ul .text {
        color: #606266;
    }

    .main_func_ul {
        text-align: left;
        overflow: hidden;
        padding: 0;
        display: flex;
        justify-content: space-around;
    }

    .main_func_ul li {
        width: 19%;
        padding: 25px 0;
        text-align: center;
        color: #ffffff;

    }

    .main_func_ul li>div {
        display: inline-block;
        background: #ffffff;
        padding: 0 4px;
        border-radius: 2px;
        margin-right: 10px;
    }

    #main_chart_wrap {
        width: 100%;
        height: 300px;
        background: #ffffff;
    }

    #main_chart_wrap>div {
        float: left;
    }

    #main_chart_left {
        width: 20%;
        height: 100%;
        padding-left: 20px;
    }

    #main_chart_right {
        width: 80%;
        height: 100%;
    }

    .main_chart_left_top {
        height: 50%;
    }

    .main_chart_left_bot {
        height: 50%;
    }

    .upGreen {
        color: #79CD52;
    }

    .main_cont_right {
        float: left;
        width: 30%;
        padding-left: 20px;
    }

</style>
