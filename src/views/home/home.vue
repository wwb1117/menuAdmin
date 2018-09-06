<template>
    <div class="app" :style="{width: $store.state.device.width+'px', height: $store.state.device.height+'px'}">
        <HQSilder></HQSilder>
        <HQContent></HQContent>
    </div>
</template>

<script>
    import HQSilder from "views/home/slider";
    import HQContent from "views/home/content";
    export default {
        name: "home",
        components: {
            HQSilder,
            HQContent
        },
        data() {
            return {};
        },
        computed: {

        },
        methods: {},
        created() {

        }
    };

</script>
