<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">商品</span>
            <span> - 修改</span>
        </div>
        <div class="model_content" :style="{height: $store.state.modelContentHeight + 'px'}">
            <div class="model_content_inner form_wrap">
                <el-form id="supplier_form" class="myForm" :inline="true" ref="addpayNoForm" :rules="rules" :model="formData"
                    label-position="right" size="small" label-width="120px">
                    <div class="banner">
                        基本信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item prop="goodName" label="商品名称">
                            <el-input v-model="formData.goodName" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                        <el-form-item prop="categoryId" label="所属类目">
                            <el-select @change="categoryChangeEvent" v-model="formData.categoryId" placeholder="请选择所属类目">
                                <el-option v-for="item in categoryData" :key="item._id" :label="item.categoryName" :value="item._id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item prop="lowPrice" label="最低售价">
                            <el-input style="width: 194px" v-model="formData.lowPrice" placeholder="请输入最低售价"></el-input>
                        </el-form-item>
                    </div>
                    <div class="banner">
                        其他信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item prop="sizeSku" label="大小规格">
                            <el-select multiple v-model="formData.sizeSku" collapse-tags placeholder="请选择大小规格">
                                <el-option v-for="item in sizeSkuData" :key="item._id" :label="item.skuName" :value="item._id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item prop="cookSku" label="做法规格">
                            <el-select multiple v-model="formData.cookSku" collapse-tags placeholder="请选择做法规格">
                                <el-option v-for="item in cookSkuData" :key="item._id" :label="item.skuName" :value="item._id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item required label="上传附件">
                            <span slot="label">
                                商品图片
                            </span>
                            <div style="display: inline-block">
                                <el-upload :action="uploadURL" ref="imgLicenseUpload" :data="sendData" :show-file-list="false"
                                    list-type="picture-card" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload">
                                    <img style="width: 140px; height: 140px;" v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                    <i v-if="!imageUrl3" class="el-icon-plus"></i>
                                </el-upload>
                                <!-- <span class="card_tip">经营许可<br>证照片</span> -->
                            </div>
                        </el-form-item>
                    </div>

                </el-form>

            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" @click="saveBtnEvent" type="primary" style="width: 90px; margin-left: 25px;">保存</el-button>
            <el-button @click="pageCansoleEvent" size="small" style="width: 90px; margin-left: 25px;">取消</el-button>
        </div>
    </div>
</template>

<script>
    import api from 'api/good'
    import capi from 'api/category'
    import sapi from 'api/sku'
    export default {
        data() {
            return {
                imageUrl3: "",
                uploadURL: '/api/f/upload',
                sendData: {
                    file: "",
                    uploadType: 'erp'
                },
                categoryData: [],
                sizeSkuData: [],
                cookSkuData: [],
                formData: {
                    goodName: '',
                    goodId: '',
                    img: '',
                    categoryName: '',
                    categoryId: '',
                    lowPrice: '',
                    sizeSku: [],
                    cookSku: []
                },
                rules: {
                    goodName: [{
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    }],
                    categoryId: [{
                        required: true,
                        message: '请选择所属类目',
                        trigger: 'blur'
                    }],
                    lowPrice: [{
                        required: true,
                        message: '请输入最低起售价',
                        trigger: 'blur'
                    }],
                    sizeSku: [{
                        required: true,
                        message: '请选择大小规格',
                        trigger: 'blur'
                    }],
                    cookSku: [{
                        required: true,
                        message: '请选择做法规格',
                        trigger: 'blur'
                    }]
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        computed: {},
        methods: {
            categoryChangeEvent(data){
                for (var item of this.categoryData) {
                    if (data == item._id) {
                        this.formData.categoryName = item.categoryName
                        return
                    }
                }
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
            getCategorySelect(){
                capi.getCategoryList({pageNo: 1, pageSize: 1000}).then((response) => {
                    this.categoryData = response.data.list
                })
            },
            pageCansoleEvent() {
                this.$router.push({
                    path: '/goodList'
                })
            },
            setSelectName(fid, Arr) {
                var itemobj = {}

                Arr.forEach((item, index) => {
                    if (fid == item.id) {
                        itemobj = item
                    }
                })

                return itemobj
            },
            handleAvatarSuccess3(res, file) {
                this.formData.img = res.data.url

                this.imageUrl3 = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                var isJPG = false

                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    isJPG = true
                }

                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '上传图片只能是 JPG 或 PNG 格式!'
                    })
                }
                if (!isLt2M) {
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '上传图片大小不能超过 2MB!'
                    })
                }

                return isJPG && isLt2M;
            },

            saveBtnEvent() {
                this.$refs['addpayNoForm'].validate((valid) => {
                    if (valid) {
                        if (this.formData.img == '') {
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: '请选择商品图片!'
                            })
                            return
                        }

                        api.editGood(this.formData).then((response) => {
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '商品修改成功!'
                            })
                            this.$router.push({
                                path: '/goodList'
                            })
                        })
                    }
                })
            },
            formRestEvent() {
                for (var kk in this.formData) {
                    this.formData[kk] = ""
                }
                this.formData.sizeSku = []
                this.formData.cookSku = []
                this.imageUrl3 = ''
                this.formData.img = ''
            }


        },
        activated() {
            this.getCategorySelect()
            this.getSizeSkuSelect()
            this.getCookSkuSelect()
            this.formRestEvent()
            this.formData = this.$store.state.currentModelId
            this.imageUrl3 = this.formData.img

        }

    }

</script>
<style scoped>
    .model_content_inner {
        position: relative;
        overflow: auto;
    }

    .model_footer {
        text-align: left;
        padding-top: 10px;
    }

    .banner {
        height: 40px;
        background: #f5f5f5;
        line-height: 40px;
        color: #606266;
        font-weight: 600;
        padding-left: 10px;
    }

    .card_tip {
        display: inline-block;
        text-align: center;
        width: 88px;
    }

</style>
