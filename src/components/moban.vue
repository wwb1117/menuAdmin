<template>
    <section>
        <header class="details_header">
            <div>
                <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                    <el-breadcrumb-item :to="{ path: '/goodsList' }">商品列表</el-breadcrumb-item>
                    <el-breadcrumb-item>商品详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div style="margin-top:7px">
                <el-button size='small'>删除</el-button>
                <el-button type="primary" size='small'>修改</el-button>
            </div>
        </header>
        <section class="details_conent">
            <div class="details_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <!-- conents -->
            </div>
        </section>
        <footer class="details_footer">
            <el-button size='small'>返回</el-button>
        </footer>
    </section>
</template>
<script>
export default {

}
</script>
<style scoped>
/* 顶部 */
.details_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    justify-content: space-between
}
.details_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.details_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 48px 20px 0 20px;
}

/* 底部 */
.details_footer{
    border-top:1px solid #e5e8e8;
    padding: 12px 30px;
    background: white
}
</style>
