<template>
    <div>
        <ul class="step-container">
            <li v-for="n in stepNums" :key="n" :style="{width: 100 / stepNums + '%'}" v-if="n < currentStep" class="step-past">
                <span v-text="stepTexts[n-1]"></span>
                <span class="arrow arrow-past">
                    <span class="arrow-pre"></span>
                    <span class="arrow-next"></span>
                </span>
            </li>
            <li v-else-if="n == currentStep && currentStep != stepNums" :style="{width: 100 / stepNums + '%'}" class="step-current">
                <span v-text="stepTexts[n-1]"></span>
                <span class="arrow arrow-current">
                    <span class="arrow-pre"></span>
                    <span class="arrow-next"></span>
                </span>
            </li>
            <li v-else-if="n == currentStep && currentStep == stepNums" :style="{width: 100 / stepNums + '%'}" class="step-current">
                <span v-text="stepTexts[n-1]"></span>
                <span class="arrow arrow-current arrow-final">

                </span>
            </li>
            <li v-else-if="n > currentStep && n != stepNums" class="step-next" :style="{width: 100 / stepNums + '%'}">
                <span v-text="stepTexts[n-1]"></span>
                <span class="arrow arrow-next">
                    <span class="arrow-pre"></span>
                    <span class="arrow-next"></span>
                </span>
            </li>
            <li v-else-if="n > currentStep && n == stepNums" class="step-next" :style="{width: 100 / stepNums + '%'}">
                <span v-text="stepTexts[n-1]"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: [
        'stepTexts',
        'stepNums',
        'currentStep'
    ],
    data(){
        return {
        }
    },
    watch: {
        stepTexts(newvalue){
            if (newvalue){
                this.stepTexts = newvalue
            }
        },
        stepNums(newvalue){
            if (newvalue){
                this.stepNums = newvalue
            }
        },
        currentStep(newvalue){
            if (newvalue){
                this.currentStep = newvalue
            }
        }
    },
    computed:{},
    methods:{},
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped>
.step-container {
    margin: 0;
    padding: 0;
    width: 99.5%;
}
.step-container li {
    float: left;
    position: relative;
    margin: 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    text-align: center;
    background-color: #ccc;
    color: #ffffff;
}
.step-container li.step-past {
    background-color: #409EFF;
    width: 34%;
}
.step-container li.step-current {
    background-color: #409EFF;
}

.arrow {
    position: absolute;
    right: -7.5px;
    height: 40px;
    background-color: #ffffff;
    z-index: 2;
}
.arrow span {
    display: inline-block;
    border-left: 20px solid transparent;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
}
.arrow-next {
    margin-left: -20px;
}
.arrow-past .arrow-pre {
    border-left: 20px solid #409EFF;
}
.arrow-past .arrow-next {
    border-top: 20px solid #409EFF;
    border-bottom: 20px solid #409EFF;
}
.arrow-current .arrow-pre {
    border-left: 20px solid #409EFF;
}
.arrow-current .arrow-next {
    border-top: 20px solid #cccccc;
    border-bottom: 20px solid #cccccc;
}
.arrow-next .arrow-pre{
    border-left: 20px solid #cccccc;
}
.arrow-next .arrow-next {
    border-top: 20px solid #cccccc;
    border-bottom: 20px solid #cccccc;
}
.arrow-final .arrow-next{
    border-top: 20px solid #409EFF;
    border-bottom: 20px solid #409EFF;
}
.clearfix:after {
    content:".";
    display:block;
    height:0;
    visibility:hidden;
    clear:both;
}
</style>
