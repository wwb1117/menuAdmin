
import store from 'store'

// noinspection JSAnnotator
export default {
    ///////////////////////////////////////////////////////////////////////禁止返回键
    backSpaceBiden() {
        function doKey(e) {
            var ev = e || window.event; //获取event对象
            var obj = ev.target || ev.srcElement; //获取事件源
            var t = obj.type || obj.getAttribute('type'); //获取事件源类型

            if (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") {
                return false;
            }
        }
        //禁止后退键 作用于Firefox、Opera
        document.onkeypress = doKey;

        //禁止后退键  作用于IE、Chrome
        document.onkeydown = doKey;
    },
    //////////////////////////////////////////////////////////////////////是否有权限
    isHasPerssion(keyvalue) {
        var perssionArr = store.state.home.menuSetting.perssionArr
        var res = perssionArr.indexOf(keyvalue)

        if (res === -1) {
            return false
        }
        return true
    }

}
