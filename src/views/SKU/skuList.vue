<template>
    <div>
        <div class="model_topcol">
            <span>规格</span>
            <div>
                <el-button @click="addBtn" class="wid_90" type="primary" size="small">新增</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="content_title">
                    <el-select :style="{width: '128px', marginRight: '10px'}" size="small" @change="statusChange" v-model="tableParam.skuType" placeholder="请选择规格类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="大小规格" :value="1"></el-option>
                        <el-option label="做法规格" :value="2"></el-option>
                    </el-select>
                    <el-input size="small" placeholder="请输入规格名称" clearable @clear="searchInputClear" prefix-icon="el-icon-search"
                        :style="{width: '378px'}" @keyup.enter.native="searchInputClear" v-model="tableParam.skuName">
                    </el-input>
                    <el-button @click="searchInputClear" :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
                </div>
                <el-table :data="tableData" :height="$store.state.modelContentHeight - 83" ref="purchaseListTable"
                    @selection-change="handleSelectionChange" style="width: 100%">
                    <el-table-column prop="skuName" label="规格名称">
                    </el-table-column>
                    <el-table-column prop="skuId" label="规格ID">
                    </el-table-column>
                    <el-table-column prop="skuType" label="规格类型">
                        <template slot-scope="scope">
                            <div>
                                <span v-if="scope.row.skuType == 1">大小规格</span>
                                <span v-if="scope.row.skuType == 2">做法规格</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" width="150" label="操作">
                        <template slot-scope="scope">
                            <el-button @click.native="tablePropEvent(scope.row, 1)" type="text" size="small">
                                修改
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


        <!-- 新增 -->
        <el-dialog
            title="新增类目"
            :visible.sync="addDialogVisible"
            :close-on-click-modal="false"
            @close="dialogClose"
            width="30%"
           >
            <el-form class="myForm" ref="addSkuForm" :rules="rules" :model="addFormData"
                    label-position="right" size="small" label-width="120px">
                    <el-form-item prop="skuType" label="规格类型">
                        <el-select v-model="addFormData.skuType" placeholder="请选择规格类型">
                            <el-option label="大小规格" value="1"></el-option>
                            <el-option label="做法规格" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="skuName" label="规格名称">
                        <el-input v-model="addFormData.skuName" placeholder="请输入规格名称"></el-input>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addEvent">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog
            title="修改类目"
            :visible.sync="editDialogVisible"
            :close-on-click-modal="false"
            @close="editdialogClose"
            width="30%"
           >
            <el-form class="myForm" ref="editSkuForm" :rules="rules" :model="editFormData"
                    label-position="right" size="small" label-width="120px">
                    <el-form-item prop="skuType" label="规格类型">
                        <el-select v-model="editFormData.skuType" placeholder="请选择规格类型">
                            <el-option label="大小规格" value="1"></el-option>
                            <el-option label="做法规格" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="skuName" label="规格名称">
                        <el-input v-model="editFormData.skuName" placeholder="请输入规格名称"></el-input>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="editEvent">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/sku'
    export default {
        data() {
            return {
                addDialogVisible: false,
                editDialogVisible: false,
                totalPage: 0,
                addFormData: {
                    skuType: '',
                    skuName: ''
                },
                editFormData: {},
                rules:{
                    skuType: [
                        {required: true, message: '请选择规格类型', trigger: 'blur'}
                    ],
                    skuName: [
                        {required: true, message: '请输入规格名称', trigger: 'blur'}
                    ]
                },
                tableParam: {
                    pageNo: 1,
                    pageSize: 15,
                    skuName: '',
                    skuType: ''
                },
                tableData: []
            }
        },
        computed: {},
        methods: {
            editdialogClose(){
                for (var kk in this.editFormData) {
                    this.editFormData[kk] = ''
                }
                this.$refs.editSkuForm.clearValidate()
            },
            dialogClose(){
                for (var kk in this.addFormData) {
                    this.addFormData[kk] = ''
                }
                this.$refs.addSkuForm.clearValidate()
            },
            statusChange(){
                this.tableParam.pageNo = 1
                this.getTableData()
            },
            addBtn() {
                this.addDialogVisible = true
            },
            addEvent(){
                this.$refs['addSkuForm'].validate((valid) => {
                    if (valid) {
                        api.addSku(this.addFormData).then((response) => {
                            this.addDialogVisible = false
                            this.getTableData()
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '规格新增成功!'
                            })
                        })
                    }
                })
            },
            editEvent(){
                this.$refs['editSkuForm'].validate((valid) => {
                    if (valid) {
                        api.editSku(this.editFormData).then((response) => {
                            this.editDialogVisible = false
                            this.getTableData()
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '规格修改成功!'
                            })
                        })
                    }
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
                api.getSkuList(this.tableParam).then((response) => {
                    this.tableData = response.data.list
                    this.totalPage = response.data.total
                })
            },
            tablePropEvent(rowData, type) {
                if (type == 1) { //修改
                    this.editDialogVisible = true
                    this.editFormData = rowData

                }
                if (type == 2) { //删除
                    var obj = {
                        id: rowData._id
                    }

                    api.removeSku(obj).then((response) => {
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '删除规格成功!'
                        })
                        this.getTableData()
                    })
                }

            },

            handleSelectionChange(val) {}

        },
        activated() {
            this.getTableData()
        },
        created() {
            this.getTableData()
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
