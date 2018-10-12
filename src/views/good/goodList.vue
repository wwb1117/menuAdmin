<template>
    <div>
        <div class="model_topcol">
            <span>商品</span>
            <div>
                <el-button @click="addBtn" class="wid_90" type="primary" size="small">新增</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="content_title">
                    <el-input size="small" placeholder="请输入商品名称" clearable @clear="searchInputClear" prefix-icon="el-icon-search"
                        :style="{width: '378px'}" @keyup.enter.native="searchInputClear" v-model="tableParam.goodName">
                    </el-input>
                    <el-button @click="searchInputClear" :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
                </div>
                <el-table :data="tableData" :height="$store.state.modelContentHeight - 83" ref="purchaseListTable"
                    @selection-change="handleSelectionChange" style="width: 100%">

                    <el-table-column prop="goodName" label="商品">
                        <template slot-scope="scope">
                            <img v-if="scope.row.img" :src="scope.row.img" style="float: left;width: 50px; height: 50px; margin-right: 10px">
                            <span class="color_blue goodmore" v-text="scope.row.goodName"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="_id" label="商品ID">
                    </el-table-column>
                    <el-table-column prop="categoryName" label="所属类目">
                    </el-table-column>
                    <el-table-column prop="prop" width="150" label="操作">
                        <template slot-scope="scope">
                            <el-button @click.native="tablePropEvent(scope.row, 1)" type="text" size="small">
                                修改
                            </el-button>
                            <el-button @click.native="tablePropEvent(scope.row, 3)" type="text" size="small">
                                报价
                            </el-button>
                            <el-button @click.native="tablePropEvent(scope.row, 2)" type="text" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableParam.pageNo"
                :page-sizes="[15, 30, 50, 100]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>

        <!-- 报价 -->
        <el-dialog
            title="商品报价"
            :visible.sync="goodDialogVisible"
            :close-on-click-modal="false"
            @close="dialogClose"
            width="30%"
           >

           <el-form class="myForm" label-position="right" size="small" label-width="120px" :inline="true" ref="goodPriceForm" :rules="rules" :model="goodPriceForm">
               <div style="margin-top: 20px">
                    <el-form-item prop="sizeSkuId" label="大小规格">
                        <el-select v-model="goodPriceForm.sizeSkuId" placeholder="请选择大小规格">
                            <el-option v-for="item in sizeSkuData" :key="item._id" :label="item.skuName" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item prop="cookSkuId" label="做法规格">
                        <el-select v-model="goodPriceForm.cookSkuId" placeholder="请选择做法规格">
                            <el-option v-for="item in cookSkuData" :key="item._id" :label="item.skuName" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item prop="price" label="售价">
                        <el-input style="width: 194px" v-model="goodPriceForm.price" placeholder="请输入售价"></el-input>
                    </el-form-item>
                </div>

           </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="goodDialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="makePriceEvent">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/good'
    import sapi from 'api/sku'
    export default {
        data() {
            return {
                sizeSkuData: [],
                cookSkuData: [],
                totalPage: 0,
                tableParam: {
                    pageNo: 1,
                    pageSize: 15,
                    goodName: ''
                },
                goodDialogVisible: false,
                goodPriceForm: {
                    goodId: '',
                    sizeSkuId: '',
                    cookSkuId: '',
                    price: ''
                },
                rules: {
                    sizeSkuId: [{
                        required: true,
                        message: '请选择大小规格',
                        trigger: 'blur'
                    }],
                    cookSkuId: [{
                        required: true,
                        message: '请选择做法规格',
                        trigger: 'blur'
                    }],
                    price: [{
                        required: true,
                        message: '请输入售价',
                        trigger: 'blur'
                    }]
                },
                tableData: []
            }
        },
        computed: {},
        methods: {
            makePriceEvent(){
                api.makePrice(this.goodPriceForm).then((response) => {
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '商品报价成功!'
                    })
                    this.goodDialogVisible = false
                })
            },
            getSizeSkuSelect(){
                var param = {
                    pageNo: 1,
                    pageSize: 1000,
                    skuType: 1,
                    skuName: ''
                }

                sapi.getSkuList(param).then((response) => {
                    this.sizeSkuData = response.data.list
                })
            },
            getCookSkuSelect(){
                var param = {
                    pageNo: 1,
                    pageSize: 1000,
                    skuType: 2,
                    skuName: ''
                }

                sapi.getSkuList(param).then((response) => {
                    this.cookSkuData = response.data.list
                })
            },
            dialogClose(){
                for (var kk in this.goodPriceForm) {
                    this.goodPriceForm[kk] = ''
                }
            },
            addBtn() {
                this.$router.push({
                    path: '/addGood'
                })
            },
            searchInputClear() {
                this.tableParam.pageNo = 1
                this.getTableData()
            },
            handleSizeChange(val) {
                this.tableParam.pageSize = val
                this.getTableData()
            },
            handleCurrentChange(val) {
                this.tableParam.pageNo = val
                this.getTableData()
            },
            getTableData() {
                api.getGoodList(this.tableParam).then((response) => {
                    this.tableData = response.data.list
                    this.totalPage = response.data.total
                })
            },
            tablePropEvent(rowData, type) {
                if (type == 1) { //修改
                    this.$store.commit('setCurrentModelId', rowData)
                    this.$router.push({
                        path: '/editGood'
                    })
                }
                if (type == 2) { //删除
                    var obj = {
                        id: rowData._id
                    }

                    api.removeGood(obj).then((response) => {
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '删除商品成功!'
                        })
                        this.getTableData()
                    })
                }
                if (type == 3) { //报价
                    this.goodDialogVisible = true
                    this.goodPriceForm.goodId = rowData._id
                }

            },

            handleSelectionChange(val) {}

        },
        activated() {
            this.getTableData()
            this.getSizeSkuSelect()
            this.getCookSkuSelect()
        },
        mounted() {}
    }

</script>
<style scoped>
    .content_title {
        height: 63px;
        line-height: 63px;
        padding-left: 17px;
    }

    .content_title span {
        cursor: pointer;
    }

    .model_content_inner {
        position: relative;
    }

    .el-form {
        color: #636365;
    }

</style>
