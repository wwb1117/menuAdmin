import Vue from 'vue'
Vue.prototype.$allEnumeration = { //仓库枚举类型
    // 仓库管理
    activateState:{
        0: '停用',
        1: '启用'
    },
    // 入库类型
    storeType: {
        1: '采购入库',
        2: '销售退货入库',
        3: '其他入库',
        4: '调拨入库'
    },
    // 入库单审核状态
    auditStatus: {
        0: '待审核',
        1: '审核中',
        2: '通过',
        3: '不通过',
        4: '撤销'
    },
    // 出库类型
    deliverType: {
        0: '商城订单出库',
        1: '线下订单出库',
        2: '采购退货出库',
        3: '批发出库',
        4: '其他出库',
        5: '调拨出库'
    },
    // 仓库类型
    boundType: {
        inbound: '入库',
        outbound: '出库'
    },
    bool: {
        0: false,
        1: true
    },
    notBool: {
        false: 0,
        true: 1
    },
    // 入库状态
    storeStatus: {
        0: '待入库',
        1: '部分入库',
        2: '已入库'
    },
    //审批流程类型
    processType: {
        1: '采购流程',
        2: '采购退货流程',
        3: '入库流程',
        4: '出库流程',
        5: '调拨',
    },
    //物流公司
    logistics: {
        sf : '顺丰',
        sto: '申通',
        yt: '圆通',
        yd: '韵达',
        tt: '天天',
        ems: 'EMS',
        zto: '中通',
        ht: '汇通',
        qf: '全峰',
        db: '德邦',
        gt: '国通',
        rfd: '如风达',
        jd: '京东快递',
        zjs: '宅急送',
        emsg: 'EMS国际',
        fedex: 'Fedex国际',
        yzgn: '邮政国内',
        ups: 'UPS国际快递',
        ztky: '中铁快运',
        jiaji: '佳吉快运',
        suer: '速尔快递',
        xfwl: '信丰物流',
        yousu: '优速快递',
        zhongyou: '中邮物流',
        tdhy: '天地华宇',
        axd: '安信达快递',
        kuaijie: '快捷速递'
    },
    // 子订单状态
    secondaryStatus: {
        0: '待支付',
        1: '待发货',
        2: '待收货',
        3: '已完成',
        4: '已关闭',
        5: '交易关闭'
    },
    //售后状态
    serviceStatus:[
        {
            value:'0',
            label:'无售后'
        },
        {
            value:'1',
            label:'待审核'
        },
        {
            value:'2',
            label:'待寄回（审核成功）'
        },
        {
            value:'3',
            label:'已寄回（审核成功）'
        },
        {
            value:'4',
            label:'退款成功（审核成功）'
        },
        {
            value:'5',
            label:'退款失败（审核成功），可再次发起'
        },
        {
            value:'6',
            label:'撤销退款'
        }
    ]

}
