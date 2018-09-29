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
                        :style="{width: '378px'}" @keyup.enter.native="searchInputClear" v-model="tableParam.sellerName">
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
                    <el-table-column prop="goodId" label="商品ID">
                    </el-table-column>
                    <el-table-column prop="categoryName" label="所属类目">
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectTableData: [],
                tableHeight: 500,
                totalPage: 0,
                tableParam: {
                    pageNo: 1,
                    pageSize: 15,
                    goodName: ''
                },
                tableData: [{
                    goodName: '小鸡炖蘑菇',
                    img: 'http://192.168.1.104:3000/code/imgcode1.jpg',
                    goodId: '77581',
                    categoryName: '精品类'
                }]
            }
        },
        computed: {},
        methods: {
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

            },
            tablePropEvent(rowData, type) {
                if (type == 1) { //修改

                }
                if (type == 2) { //删除

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
