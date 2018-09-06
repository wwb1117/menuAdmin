export default{
  data:{
    validate:{ //校验规则
		tel:function(telNum){

			return /^1[34578]\d{9}$/.test(telNum)
		},
		psw:function(psw){//匹配6-20位的任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
			return /^(\w){6,16}$/.test(psw)
		},
		numAs:function(numAs){ //匹配6-16位的数字和字母的字符，包括数字、字母大小写区分
			return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(numAs)
		},
		email:function(email){//匹配6-20位的任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
			return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
		},
		mustnum:function(val){//只能输入数字
			return /^\d+$/.test(val)
		},
		security_code:function(val){//验证码
			return /^\d{6}$/.test(val)
		},
		certificate:function(val){//验证身份证号
			return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(val)
		},
    jugNum:function(val){
      var str
      str = val.replace(/\D/g,'')
      return str // 整数,不包括小数点
    },
    jugNumYS:function(val){
      var str
      str = val.replace(/[^\w\.\/]/ig,'')
      return str // 只能输入英文字母和数字,不能输入中文
    },
    jugNum2:function(val){
      var str
      str = val.replace(/^(([0-9]+[\.]?[0-9]{1,2})|[1-9])$/,'')
      console.log(str,'aaaaa')
      return str // 只能输入英文字母和数字,不能输入中文
    }
	},
	validator:{//表单自定义验证
    checkBankCard:function(rule, value, callback){

      if (!( /^\d{15}|\d{20}$/.test(value) ) ) {
        callback(new Error('请输入15到19位的银行卡号'));
      } else {
        callback();
      }
    },
    num:(rule, value, callback) => {
      if (!( /^\d+$/.test(value) ) ) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    },
    jugNum:(rule, value, callback) => {
      if (!( /^\d+$/.test(value) ) ) {
        return value
      } else {
        return
      }
    },
    security_code:(rule, value, callback) => { //验证码校验
      if (!( /^\d{6}$/.test(value) ) ) {
        callback(new Error('请输入6位数字验证码'));
      } else {
        callback();
      }
    },
    licenseno:(rule,value,callback) => {
    	if(!( /^[A-Za-z0-9]{15,18}$/.test(value))){
			callback(new Error('请输入正确的15~18位营业执照编号'));
    	} else {
    		callback();
    	}
    },
     licenseno1:(rule,value,callback) => {
     	if(!value){
     		callback();
     	}else{
	    	if(!( /^[A-Za-z0-9]{15,18}$/.test(value))){
				callback(new Error('请输入正确的15~18位营业执照编号'));
	    	} else {
	    		callback();
	    	}
    	}
    },
     phone1:(rule,value,callback) => {
     	if(!value){
     		callback();
     	}else{
			   if (( /^1[34578]\d{9}$/.test(value) ) || (/^0\d{2,3}-?\d{7,8}$/.test(value)) ) {
					 callback();

		      } else {

							callback(new Error('请正确输入电话号码或者手机号码'))


	    	}
    	}
    },
    man1:(rule,value,callback) => {
     	if(!value){
     		callback();
     	}else{
			   if (value.length<3 || value.length>8) {
		        callback(new Error('人名字符应在3-8位'));
		      } else {
	    		callback();
	    	}
    	}
    },
    address12:(rule,value,callback) => {
    	if(!value){

    		callback();
    	}else{

    	}
    },
    email:(rule, value, callback) =>{
    	if(!( /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))){
			callback(new Error('请输入正确的邮箱'));
    	} else {
    		callback();
    	}
    },
    tel:(rule, value, callback) => {
      if (!( /^1[34578]\d{9}$/.test(value) ) ) {
        callback(new Error('请输入正确11位手机号'));
      } else {
        callback();
      }
    },
    tel_email:(rule, value, callback) => {
      if (( /^1[34578]\d{9}$/.test(value) || /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) ) {

       callback();

      } else {
        alert(1)
        callback(new Error('请输入正确手机号或者邮箱号'));
      }
    },
    mustFixed2:(rule, value, callback) => {
      if (!( /^-?\d+\.?\d{0,2}$/.test(value) ) ) {
        callback(new Error('请输入精确到小数点后两位的数字'));
      } else {
        callback();
      }
    },
    canFix2:(rule, value, callback) => {
      if(!(  /^\d+(\.\d+)?$/.test(value) ) ){
        callback(new Error('请输入数字'));
      }else {
        callback();
      }

    },
    telOrPhone:(rule, value, callback) => {
      if ((! (/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value) ))   && (!( /^1[34578]\d{9}$/.test(value) ))   ) {
        callback(new Error('请填写如010-XXXXXXX固定电话或手机号'));
      } else {
        callback();
      }
    },
		telOrEmail:(rule, value, callback)=>{

			if (( /^1[34578]\d{9}$/.test(value)) || ( /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) ) {
				callback();
      } else {
        callback(new Error('手机号或邮箱号有误'));
      }
		},
    psw:(rule, value, callback) => {
      if (!( /^\w+$/.test(value) ) ) {
        callback(new Error('请输入英文、数字、下划线组合的密码'));
      } else {
        callback();
      }
    },
    textOrnum:(rule, value, callback) => {
		if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value))) {
			callback(new Error('密码6-16个字母和数字的结合，区分大小写'));
		} else {
			callback();
		}
	},
    carNum:(rule, value, callback) => {
      if (!( /^[a-z0-9]+$/i.test(value) ) ) {
        callback(new Error('请输入数字与字母组合'));
      } else if(val.length!=6 || val.length!=5){
        callback(new Error('请输入5~6位的车牌号'));
      }else{
        callback();
      }
    },
  },
	deep_copy:function (obj) { //深拷贝
		 //利用递归的方式
    var newOBJ={};
    if(typeof obj!='object'){
        return obj;//终止条件，如果不是对象就放回该值
    }
    for (var arrt in obj) {
        newOBJ[arrt]=deep_copy(obj[arrt]);//再一次拷贝（递归）
    };
    return newOBJ;
	},

  }
}
