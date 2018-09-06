<template>
    <div class="app-content">
        <div class="app-content-body fade-in-up" :class="[$store.state.home.menuSetting.isNextMenuShow ? 'nextmenushow' : 'nextmenuhide']">
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
    }

    .app-content-body {
        height: 100%;
        box-sizing: border-box;
    }

    .nextmenuhide {
        padding-left: 90px;
    }

    .nextmenushow {
        padding-left: 200px;
    }

</style>
