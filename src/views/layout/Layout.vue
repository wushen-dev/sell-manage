<template>
    <div class="layout">
        <left-nav class="left-nav"></left-nav>
        <div class="right-con">
            <top-nav class="top"></top-nav>
            <router-view class="content"></router-view>
        </div>
    </div>
</template>

<script>
import LeftNav from '@/views/layout/LeftNav.vue'
import TopNav from '@/views/layout/TopNav.vue'
export default {
    components: {
        LeftNav,
        TopNav
    },
}
</script>

<style lang="less" scoped>
.layout {
    display: flex;
    height: 100%;
    overflow: hidden;

    .right-con {
        flex: 1;

        .top {
            height: 50px;
            line-height: 50px;
        }

        .content {
            height: 100%;
            overflow-y: scroll;
            background-color: #f0f2f5;
        }
    }
}
</style>