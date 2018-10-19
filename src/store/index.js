// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        version: '1.0',
        baseUrl: '',
        device: {
            width: null,
            height: null
        },
        modelContentHeight: null,
        modelContentWidth: null,
        currentModelId: '',
        userInfo: null
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
        }

    }
})

export default store
