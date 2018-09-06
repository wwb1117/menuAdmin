<template>
    <section>
        <div @click="dialogVisible = true" class="updata">
            <i class="el-icon-plus"></i>
        </div>
        <div style="margin-top:-30px">
            <!-- 外层上传 -->
            <el-dialog
                title="选择图片"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
                <div style="display:flex;margin-top:-30px">
                    <div style="width:160px;border-right:1px solid #e6e6e6;height:500px;padding-right:15px">
                        <div>
                            <el-input size='small' suffix-icon="el-icon-search"></el-input>
                        </div>
                        <ul class="team_list" style="padding:0">
                            <li v-for="(item,index) in team" :key="index">{{item.conent}}</li>
                        </ul>
                        <el-button type='text' @click="addteam = true">+新建分组</el-button>
                        <el-dialog
                            width="20%"
                            title="新建分组"
                            :visible.sync="addteam"
                            append-to-body>
                            <el-input v-model="text" size='small'></el-input>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="additem" size='small'>确 定</el-button>
                                <el-button @click="addteam = false" size='small'>取 消</el-button>
                            </span>
                        </el-dialog>
                    </div>
                    <div>
                        <div class="up_box">
                            <div style="margin-left:63.5%;margin-botoom:10px">
                                <el-checkbox v-model="checked">开启图片水印</el-checkbox>
                                <el-button size='small' type='primary' @click="innerVisible = true" style="margin-left:37px">本地上传</el-button>
                            </div>
                            <!-- 内层上传 -->
                            <el-dialog
                                width="50%"
                                title="本地上传"
                                :visible.sync="innerVisible"
                                append-to-body>
                                <el-form label-width="80px" style="height:425px;padding:0 30px" class="upupload">
                                    <el-form-item label="上传分组">
                                        <el-select v-model="list" placeholder="请选择分组" size='small' style='width:338px'>
                                            <el-option
                                                v-for="item in team"
                                                :key="item.id"
                                                :label="item.conent"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="本地上传">
                                        <el-upload
                                            :action="upDateImgUrl"
                                            :data="sentData"
                                            :file-list="fileList"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-success="handleAvatarSuccess"
                                            :on-remove="handleRemove">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="upimg">
                                            <img width="100%" :src="ImageUrl" alt="">
                                        </el-dialog>
                                    </el-form-item>
                                </el-form>
                                <span slot="footer" class="dialog-footer" style="padding:0 20px">
                                    <el-button type="primary" @click="innerVisible = false" size='small'>确 定</el-button>
                                    <el-button @click="innerVisible = false" size='small'>取 消</el-button>
                                </span>
                            </el-dialog>
                        </div>
                        <ul class="img_box">
                            <li v-for="(data,index) in img" :key='index' @click='opentrue($event)'>
                                <!-- <img :src="data.imgurl" alt=""> -->
                                <div style='width:118px ;height:118px; background:pink' ></div>
                                <div class="opentrue" ><i class="el-icon-check"></i></div>
                                <p>{{data.conent}}</p>
                            </li>
                        </ul>
                        <div class="progin">
                            <p>已选 <span> {{imgnum}} </span >个，可选100个</p>
                            <div class="block">
                                <el-pagination
                                    small
                                    layout="prev, pager, next"
                                    :total="1000">
                                </el-pagination>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer" style="padding:0 20px">
                            <el-button type="primary" @click="dialogVisible = false" size='small'>确 定</el-button>
                            <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                        </span>
                    </div>
                </div>
            </el-dialog>
        </div>

    </section>
</template>
<script>
export default {
    data() {
        return {
            upDateImgUrl: process.env.API_ROOT + '/f/upload',
            sentData: {
                file: "",
                uploadType: 'erp'
            },
            ImageUrl: '',
            upimg: false,
            fileList:[],

            dialogVisible: false,
            innerVisible:false,
            addteam: false,
            checked: false,
            text: '',
            // 分组
            team: [
                {
                    id: '1',
                    conent: '全部图片'
                },
                {
                    id: '2',
                    conent: '未分组'
                },
                {
                    id: '3',
                    conent: '阿拉奶粉'
                },
                {
                    id: '4',
                    conent: '商品品牌'
                },
                {
                    id: '5',
                    conent: '阿拉分享图'
                },
                {
                    id: '6',
                    conent: '商品分类'
                }
            ],

            img: [
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                }
            ],
            imgnum:0,

            list:[]

        };
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        additem() {
            this.addteam = false
            this.team.push(this.text)
        },
        handleRemove(file, fileList) {
            for (var i in this.fileList){
                if (this.fileList[i].url == file.url){

                    this.fileList.splice(i, 1)
                }
            }
        },
        handlePictureCardPreview(file) {
            this.ImageUrl = file.url;
            this.upimg = true;
        },
        // 图片上传成功
        handleAvatarSuccess(file, fileList) {
            this.fileList.push(fileList.response.data)
        },
        opentrue($event) {
            var tha = $event.currentTarget

            $(tha).find('.opentrue').toggleClass('active')
            this.imgnum = $(tha).parent().find('.active').length

        }
    }
}
</script>
<style scoped>
.updata{
    width: 88px;
    height: 88px;
    line-height: 88px;
    border: 1px dashed #888888;
    text-align: center;
    font-size: 26px
}
.team_list{
    text-indent: 5px;
    font-size: 15px;
    margin-top: 10px
}
.team_list li{
    height: 30px;
    line-height: 30px
}
.team_list li:hover{
    background: #f5f5f5;
    cursor: pointer;
}
.up_box{
    line-height: 32px;
    display: flex;
    width: 750px;
    padding-bottom:10px;
    border-bottom: 1px solid #e4e9ea
}
.progin{
    padding: 0 15px ;
    display: flex;
    line-height: 45px;
    justify-content: space-between
}
.img_box{
    height: 360px;
    width: 730px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto
}
.img_box li{
    width: 120px;
    border: 1px solid #dee1e1;
    margin-left: 20px;
    margin-top: 15px;
    position: relative;
    cursor: pointer;
}
.img_box li img{
    width: 118px;
    height: 118px;
}
.img_box li p{
    width: 118px ;
    height: 29px ;
    border-top:1px solid #dee1e1;
    line-height: 34px
}
.opentrue{
    position: absolute;
    left: 0;
    top:0;
    width: 118px;
    height: 118px;
    background: #888888;
    opacity: 0.6;
    z-index: 9;
    color:white;
    font-size: 35px;
    text-align: center;
    line-height: 118px;
    display: none
}
.active{
    display: block;
}


</style>
