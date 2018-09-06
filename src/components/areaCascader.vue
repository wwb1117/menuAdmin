<template>
    <div>
        <el-cascader
        style="width: 194px"
        :options="proviceData"
        v-model="modelValue"
        :change-on-select="false"
        :disabled="bool"
        @change="change"
        @active-item-change="handleItemChange"
        :props="props"
        ></el-cascader>
    </div>
</template>

<script>
import api from 'api/common'
export default {
    data(){
        return {
            proviceData: [],
            modelValue: [],
            selectedOptions3: [],
            bool: false,
            props: {
                value: 'id'
            }
        }
    },
    props: [
        'fatherValue',
        'disabled'
    ],
    computed:{},
    watch: {
        fatherValue(newvalue){
            if (newvalue && newvalue.length == 3){
                this.getProviceData()
            } else {
                this.modelValue = []
            }
        },
        disabled(newBool) {
            this.bool = newBool
        }
    },
    methods:{
        handleItemChange(val){
            if (val){
                var leng = val.length
                var proItemData = null

                if (leng == 1){
                    var proid = val[leng - 1]

                    proItemData = this.findProData(proid)
                    api.getCityData(proid).then((response) => {
                        if (response.data.length > 0){
                            proItemData.children = []
                            for (var city of response.data){
                                proItemData.children.push({
                                    id: city.id,
                                    label: city.cityName,
                                    children: []
                                })
                            }
                        }
                    })
                } else if (leng == 2){
                    var cityid = val[leng - 1]

                    proItemData = this.findProData(val[0]).children
                    var cityItemData = this.findCityData(proItemData, cityid)

                    api.getAreaData(cityid).then((response) => {

                        if (response.data.length > 0){
                            cityItemData.children = []
                            for (var area of response.data){
                                cityItemData.children.push({
                                    id: area.id,
                                    label: area.areaName
                                })
                            }
                        }
                    })

                } else {
                }
            }
        },
        change(val){
            this.$emit("areaFromChild", val)
        },
        getProviceData(){
            this.bool = this.disabled
            api.getProviceData().then((response) => {
                this.proviceData = []
                for (let item of response.data){
                    this.proviceData.push({
                        id: item.id,
                        label: item.provinceName,
                        children: []
                    })
                }
            }).then((reponse) => {
                if (this.fatherValue && this.fatherValue.length == 3){
                    api.getCityData(this.fatherValue[0]).then((response) => {
                        if (response.data.length > 0){
                            var proItemData = this.findProData(this.fatherValue[0])

                            proItemData.children = []
                            for (var city of response.data){
                                proItemData.children.push({
                                    id: city.id,
                                    label: city.cityName,
                                    children: []
                                })
                            }
                        }
                    }).then((response) => {
                        if (this.fatherValue && this.fatherValue.length == 3){
                            var proItemData = this.findProData(this.fatherValue[0]).children
                            var cityItemData = this.findCityData(proItemData, this.fatherValue[1])

                            api.getAreaData(this.fatherValue[1]).then((respon) => {

                                if (respon.data.length > 0){
                                    cityItemData.children = []
                                    for (var area of respon.data){
                                        cityItemData.children.push({
                                            id: area.id,
                                            label: area.areaName
                                        })
                                    }
                                }

                                this.modelValue = this.fatherValue

                            })
                        }
                    })
                }
            })
        },
        findProData(id){
            for (var item of this.proviceData){
                if (item.id == id){
                    return item
                }
            }
        },
        findCityData(proArr, id){
            for (var item of proArr){
                if (item.id == id){
                    return item
                }
            }
        }
    },
    created(){
        this.getProviceData()
    },
    mounted(){}
}
</script>
<style scoped>
</style>
