import {
    Message
} from 'element-ui';
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
    },
    //////////////////////////////////////////////////////////////////////验证弹框
    confirm(text, success, cancel) {
        Message.confirm(text, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if (success) {
                success()
            }

        }).catch(() => {
            Message.info({
                type: 'info',
                duration: 1500,
                showClose: true,
                message: '已取消操作'
            });
        });
    },
    confirmDelet(text, success, cancel) {
        Message.confirm(text, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if (success) {
                success()
            }
        }).catch(() => {
            Message.info({
                type: 'info',
                duration: 1500,
                showClose: true,
                message: '已取消删除'
            });
        });
    },
    //////////////////////////////////////////////////////////////////////深拷贝
    deepCopy(initalObj) {
        var obj = {};

        obj = JSON.parse(JSON.stringify(initalObj));
        return obj;
    },
    //////////////////////////////////////////////////////////////////////随机编码
    MathRand(type) {
        let sixNum = ''
        let myDate = new Date()
        let monthArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        let day = myDate.getDate().toString() > 9 ? myDate.getDate() : '0' + myDate.getDate()

        for (let i = 0; i < 6; i++) {
            sixNum += Math.floor(Math.random() * 10);
        }
        return type + '-' + myDate.getFullYear() + monthArr[myDate.getMonth()] + day + '-' + sixNum
    },
    MathRand2(type) {
        let sixNum = ''

        for (let i = 0; i < 7; i++) {
            sixNum += Math.floor(Math.random() * 10);
        }
        return type + '-' + sixNum
    },
    splitUserName(str) {
        if (typeof str == 'undefined') {
            return ""
        }
        if (str.length > 7) {
            return str.substring(0, 6) + '...'
        } else {
            return str
        }
    },
    //////////////////////////////////////////////////////////////////////时间戳计算时间
    computeTime(start, end) {
        var contTime = parseFloat(end) - parseFloat(start)
        var day = Math.round(contTime / 86400)
        var reshour = contTime % 86400
        var hour = Math.round(reshour / 3600)
        var resmin = reshour % 3600
        var min = Math.round(resmin / 60)

        if (hour < 10) {
            hour = '0' + hour
        }
        if (min < 10) {
            min = '0' + min
        }
        return day + '天' + hour + '小时' + min + '分'

    },
    //////////////////////////////////////////////////////////////////////时间戳换算成当前时间
    changeTime(num) {
        if (!num) {
            return ''
        }
        var date = new Date(num * 1000);
        var cc = 'day_min'

        //日期格式化
        var y = date.getFullYear() + '-';
        var m = date.getMonth() + 1 + '-';
        var d = String(date.getDate());

        var h = date.getHours();
        // var am=h>=12?'  下午':'  上午';
        //h=h>12  ?  h-12  :  h;

        d = d < 10 ? '0' + d : String(d);
        h = h < 10 ? '0' + h : String(h);

        var mi = date.getMinutes();

        mi = mi < 10 ? '0' + mi : String(mi);

        var s = date.getSeconds();

        s = s < 10 ? '0' + s : String(s);

        var str = '';

        if (cc == 'day') {
            str = y + m + d;
        } else if (cc == 'min') {
            str = h + ' : ' + mi;
        } else if (cc == 'day_min') {
            str = y + m + d + ' ' + h + ' : ' + mi;
        } else if (cc == 'day_min_s') {
            str = y + m + d + ' ' + h + ' : ' + mi + ' : ' + s;
        }
        return str;
    },
    //////////////////////////////////////////////////////////////////////限制输入框只能输入整数,小数,且整数位首位不能为零
    formatNum(value) {
        if (typeof value == 'undefined') {
            return '0'
        }
        if (value == '') {
            return '0'
        }

        var val = value

        val = val.replace(/^0*(0\.|[1-9])/, '$1') //解决粘贴不起作用的问题
        val = val.replace(/[^\d\.]/g, '') //清除“数字”和“.”以外的字符
        val = val.replace(/\.{2,}/g, ".") //只能输入一个小数点
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".") //只能输入一个小数点

        if (val.indexOf(".") < 0 && val != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == '0' && val.length == 2) {
                val = val.substr(1, val.length);
            }
        }
        return val
    },
    //////////////////////////////////////////////////////////////////////限制输入框只能输入整数,小数,且整数位首位不能为零
    formatNum2(value) {
        if (typeof value == 'undefined') {
            return ''
        }

        var val = value

        val = val.replace(/^0*(0\.|[1-9])/, '$1') //解决粘贴不起作用的问题
        val = val.replace(/[^\d\.]/g, '') //清除“数字”和“.”以外的字符
        val = val.replace(/\.{2,}/g, ".") //只能输入一个小数点
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".") //只能输入一个小数点

        if (val.indexOf(".") < 0 && val != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == '0' && val.length == 2) {
                val = val.substr(1, val.length);
            }
        }
        return val
    },
    formatIntNum(value) {
        if (typeof value == 'undefined') {
            return '0'
        }
        if (value == '') {
            return '0'
        }

        var val = value

        val = val.replace(/^0*(0|[1-9])/, '$1') //解决粘贴不起作用的问题
        val = val.replace(/[^\d]/g, '') //清除“数字”以外的字符

        if (val.indexOf(".") < 0 && val != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (val.substr(0, 1) == '0' && val.length == 2) {
                val = val.substr(1, val.length);
            }
        }
        return val
    }

}
