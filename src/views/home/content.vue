<template>
    <div class="app-content" :style="{width: ($store.state.device.width - 90) +'px'}">
        <div class="app-content-body fade-in-up">
            <transition name="custom-classes-transition" enter-active-class="fadeIn">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mainContent",
        data() {
            return {};
        },
        computed: {},
        methods: {},
        created() {}
    };

</script>
<style scoped>
    .app-content {
        height: 100%;
        float: left;
    }

    .app-content-body {
        height: 100%;
        box-sizing: border-box;
    }

</style>
