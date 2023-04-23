<template>
    <div class="card-list">
        <img :src="card.imgUrl" alt="">
        <div class="text">
            <p>{{ card.title }}</p>
            <span>{{ card.num }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            default: ({})
        }
    }
}
</script>

<style lang="less" scoped>
.card-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 10px;
    width: 250px;
    height: 120px;
    background-color: #fff;
    border-radius: 4px;

    img {
        width: 80px;
        height: 80px;
    }

    .text {
        p {
            margin-bottom: 8px;
            color: gray;
        }

        span {
            font-weight: 700;
        }
    }
}
</style>