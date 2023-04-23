<template>
    <div class="home">
        <!-- 卡片列表 -->
        <div class="card-wrap">
            <card v-for="item in cardList" :key="item.id" :card="item"></card>
        </div>
        <div class="home" id="home"></div>
    </div>
</template>

<script>
import Card from './Card.vue';
import { getHomeData } from '@/api/order'
export default {
    components: {
        Card
    },
    data() {
        return {
            cardList: [
                { id: 1, imgUrl: require('@/assets/img/logo.png'), title: '总订单', },
                { id: 2, imgUrl: require('@/assets/img/logo.png'), title: '总销售额', },
                { id: 3, imgUrl: require('@/assets/img/logo.png'), title: '今日订单数', },
                { id: 4, imgUrl: require('@/assets/img/logo.png'), title: '今日销售额', },
            ]
        }
    },
    mounted() {
        // 当需要使用echarts的时候,建议在mounted里面发起请求
        this.getHomeData();
    },
    methods: {
        async getHomeData() {
            let res = await getHomeData();
            // 从数据中将我们需要的数据解构出来
            let { xData, orderData, amountData, totalOrder, totalAmount, todayOrder, totayAmount } = res.data;
            [totalOrder, totalAmount, todayOrder, totayAmount].forEach((item, i) => {
                // 问题: 对于对象, vue无法监听data数据中对象属性的新增或删除(Object.defineProperty)
                // this.cardList[i].num = item;(这种方式不生效)
                // 解决:
                // 方式一: 针对只有一个新增属性的情况
                //  this.$set(源对象, '新增的属性', 属性对应的值)
                // 方式二: 针对新增一个对象的情况 浅拷贝
                // this.obj = { ...this.obj, ...newObj }
                this.$set(this.cardList[i], 'num', item)
            });
            // 渲染可视化图表
            this.drawHomeChart(xData, orderData, amountData);
        },
        drawHomeChart(xData, orderData, amountData) {
            var myChart = this.$echarts.init(document.getElementById('home'));

            var option = {
                color: ['#80FFA5', '#00DDFF'],
                title: {
                    text: '数据统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['订单数据', '金额数据']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                // x轴
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                // 数据
                series: [
                    {
                        name: '订单数据',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(255, 188, 66)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(26, 250, 41)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: orderData
                    },
                    {
                        name: '金额数据',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(0, 221, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(77, 119, 255)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: amountData
                    }
                ]
            };

            myChart.setOption(option);
            window.addEventListener('resize', function () {
                myChart.resize();
            })
        }
    }
}
</script>

<style lang="less" scoped>
.card-wrap {
    display: flex;
}

.home {
    margin: 0 auto;
    width: 96%;
    height: 400px;
}
</style>