<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">桌码管理</span>
            <span></span>
            <!-- <div>
                <el-button type="primary" size="small">下载模板</el-button>
            </div> -->
        </div>
        <div class="model_content" :style="{height: $store.state.modelContentHeight + 'px', overflow: 'auto'}">
            <div class="model_content_inner">
                <el-card shadow="hover" class="cardSuccess">
                    <div slot="header" class="clearfix">
                        <span>生成桌面码</span>
                    </div>
                    <div>
                        <el-input size="small" style="width: 294px;" type="number" placeholder="请输入数量" v-model.number="deskNum">
                            <template slot="prepend">数量</template>
                        </el-input>
                        <el-button @click="makeDeskCode" size="small" style="margin-left: 20px" type="primary">生成桌面码</el-button>
                    </div>
                    <div>
                        <el-card style="margin-top: 20px" shadow="hover" class="cardWarning">
                            <div slot="header" class="clearfix">
                                <span>注:</span>
                            </div>
                            <div>
                                <p>1.数量为你门店的桌子的数量,默认生成一个前台桌面码(请填写数字)</p>
                                <p>2.二次生成会删除之前的二维码,更换麻烦请慎重</p>
                            </div>
                        </el-card>
                    </div>
                </el-card>
                <el-card shadow="hover" class="cardSuccess">
                    <div slot="header" class="clearfix">
                        <span>我的桌面码</span>
                    </div>
                    <div>
                        <div style="float: left; width: 250px;" v-for="item in imgCodeArr" :key="item.index">
                            <el-card id="deskCodeImgWrap" class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>桌号: {{item.index}}</span>
                                </div>
                                <div>
                                    <img style="width: 250px" :src="item.imgUrl" alt="小程序码">
                                </div>
                            </el-card>
                        </div>

                    </div>
                </el-card>


            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" style="width: 90px; margin-left: 25px;">返 回</el-button>
        </div>
    </div>
</template>

<script>
    import wxapi from 'api/wx'
    export default {
        data() {
            return {
                deskNum: null,
                imgCodeArr: []
            }
        },
        computed: {},
        methods: {
            makeDeskCode(){
                if (typeof this.deskNum == 'number') {
                    wxapi.getWXACode({deskNum: this.deskNum}).then(response => {
                        var resArr = response.data.imgArr

                        this.imgCodeArr = []
                        resArr.forEach((item, index) => {
                            var obj = {
                                index: item.index,
                                imgUrl: item.codeUrl
                                // imgUrl: item.codeData
                            }

                            this.imgCodeArr.push(obj)
                        });
                    })
                } else {
                    this.$message({
                        message: '请输入正确的数字',
                        duration: 1500,
                        showClose: true,
                        type: 'warning'
                    });
                }

            }

        },
        created() {},
        mounted() {}
    }

</script>
<style scoped>
    .model_content_inner {
        position: relative;
    }

    .model_footer {
        text-align: left;
        padding-top: 10px;
    }

</style>
