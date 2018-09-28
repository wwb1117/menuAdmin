<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">类目管理</span>
            <span></span>
            <div>
                <el-button @click="addBtn" class="wid_90" type="primary" size="small">新增</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <el-table
                    :data="tableData"
                    :height="$store.state.modelContentHeight - 83"
                    style="width: 100%">

                    <el-table-column
                        prop="categoryName"
                        label="类目名称">
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                         <template slot-scope="scope">
                            <el-button
                            @click.native="tablePropEvent(scope.row, 2)"
                            type="text"
                            size="small">
                            修改
                            </el-button>
                            <el-button
                            @click.native="tablePropEvent(scope.row, 3)"
                            type="text"
                            size="small">
                            删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
        </div>
        <div class="model_footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableParam.pageNo"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
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
            <el-input
            type="text"
            placeholder="请输入类目名称"
            v-model="categoryName">
            </el-input>
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
            @close="dialogClose"
            width="30%"
           >
            <el-input
            type="text"
            placeholder="请输入类目名称"
            v-model="categoryName">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="editEvent">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from 'api/category'
    export default {
        data() {
            return {
                tableData: [],
                addDialogVisible: false,
                editDialogVisible: false,
                categoryName: '',
                currentTable: null,
                tableParam: {
                    pageNo: 1,
                    pageSize: 15
                },
                totalPage: 0
            }
        },
        computed: {},
        methods: {
            handleSizeChange(val){
                this.tableParam.pageSize = val
                this.getTableData()
            },
            handleCurrentChange(val){
                this.tableParam.pageNo = val
                this.getTableData()
            },
            dialogClose(){
                this.categoryName = ''
            },
            addEvent(){
                if (this.categoryName == '') {
                    this.$message({
                        type: 'warning',
                        duration: 1500,
                        showClose: true,
                        message: '请输入类目名称!'
                    });
                    return
                }
                var param = {
                    categoryName: this.categoryName
                }

                api.addCategory(param).then((response) => {
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '新增类目成功!'
                    })
                    this.addDialogVisible = false
                    this.getTableData()
                })
            },
            editEvent(){
                if (this.categoryName == '') {
                    this.$message({
                        type: 'warning',
                        duration: 1500,
                        showClose: true,
                        message: '请输入类目名称!'
                    });
                    return
                }

                var param = {
                    _id: this.currentTable._id,
                    categoryName: this.categoryName
                }

                api.editCategory(param).then((response) => {
                    this.editDialogVisible = false
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '修改类目成功!'
                    })
                    this.getTableData()
                })

            },
            getTableData(){
                api.getCategoryList(this.tableParam).then((response) => {
                    this.tableData = response.data.list
                    this.totalPage = response.data.total
                })
            },
            addBtn(){
                this.addDialogVisible = true
            },
            tablePropEvent(rowData, type){
                this.currentTable = rowData

                if (type == 2){ //修改
                    this.editDialogVisible = true

                }
                if (type == 3){ //删除
                    var obj = {
                        id: rowData._id
                    }

                    api.removeCategory(obj).then((response) => {
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '删除类目成功!'
                        })
                        this.getTableData()
                    })
                }

            }
        },
        created() {},
        activated(){
            this.getTableData()
        },
        mounted() {}
    }

</script>
<style scoped>
    .model_content_inner {
        position: relative;
    }
</style>
