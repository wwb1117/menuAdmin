// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        version: '1.0',
        baseUrl: '',
        menuSetting: {
            isNextMenuShow: false, //二级菜单是否显示
            currFid: 0,
            currSid: null,
            currSlist: [],
            currRoutUrl: '/main',
            perssionArr: []
        },
        device: {
            width: null,
            height: null
        },
        modelContentHeight: null,
        modelContentWidth: null,
        currentModelId: '',
        userInfo: null,
        // 商品包装类型
        typesMsg: '',
        // 商品规格
        specMsg: '',
        // 商品品牌
        brandId: '',
        // 流程配置id
        flowId: '',
        // 流程配置名称
        flowName: '',
        // 角色id
        userId: '',
        userName: '',
        // 商品分类查询详情ID
        itemId: '',
        // 商品分类新增父ID
        parentId: '',

        // 查看商品详情id
        goodsmoreId: ''
    },
    mutations: {
        setDevice(state, value){
            state.device.width = value.width
            state.device.height = value.height
            window.localStorage.setItem("device", JSON.stringify(state.device))
        },
        setModelContentHeight(state, value){
            state.modelContentHeight = value
        },
        setModelContentWidth(state, value){
            state.modelContentWidth = value
        },
        setCurrentModelId(state, value){
            state.currentModelId = value
            window.localStorage.setItem("currentModelId", JSON.stringify(state.currentModelId))
        },
        setUserInfo(state, value){
            state.userInfo = value
            window.localStorage.setItem("userInfo", JSON.stringify(value))
        },
        setCurrFid(state, value){
            state.menuSetting.currFid = value
            window.localStorage.setItem("menuSetting", JSON.stringify(state.menuSetting))
        },
        setCurrSid(state, value){
            state.menuSetting.currSid = value
            window.localStorage.setItem("menuSetting", JSON.stringify(state.menuSetting))
        },
        setCurrSlist(state, value){
            state.menuSetting.currSlist = value
            window.localStorage.setItem("menuSetting", JSON.stringify(state.menuSetting))
        },
        setCurrRoutUrl(state, value){
            state.menuSetting.currRoutUrl = value
            window.localStorage.setItem("menuSetting", JSON.stringify(state.menuSetting))
        },
        setNextMenuShow(state, value){
            state.menuSetting.isNextMenuShow = value
            window.localStorage.setItem("menuSetting", JSON.stringify(state.menuSetting))
        },
        setMenuSetting(state, value){
            state.menuSetting = value
            window.localStorage.setItem("menuSetting", JSON.stringify(state.menuSetting))
        },
        setPerssionArr(state, value){
            state.menuSetting.perssionArr = value
            window.localStorage.setItem("menuSetting", JSON.stringify(state.menuSetting))
        },
        // 商品包装类型
        setTypes(state, value){
            state.typesMsg = value
        },
        // 商品规格
        setSpec(state, value){
            state.specMsg = value
        },
        // 商品品牌
        setBrand(state, value){
            state.brandId = value
        },
        // 流程配置ID
        setFlow(state, value){
            state.flowId = value
        },
        // 流程配置名称
        setFlowN(state, value){
            state.flowName = value
        },
        // 根据角色ID获取资源权限
        setUserid(state, value){
            state.userId = value
        },
        setRoleName(state, value){
            state.userName = value
        },
        // 商品分类查询详情ID
        setItemid(state, value){
            state.itemId = value
        },
        // 商品分类新增父ID
        setparentid(state, value){
            state.parentId = value
        },

        // 获取商品详情ID
        setgoodsmoreid(state, value){
            state.goodsmoreId = value
        }
    }
})

export default store
