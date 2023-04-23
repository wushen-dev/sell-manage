<template>
    <div>
        <div class="order" id="order"></div>
    </div>
</template>

<script>
import { getOrderData } from '@/api/order'
export default {
    mounted() {
        this.getOrderData();
    },
    methods: {
        async getOrderData() {
            let res = await getOrderData({
                date: JSON.stringify([])
            });
            console.log(res);
            let xData = res.data.data.map(item => item.orderTime);
            let orderData = res.data.data.map(item => item.orderAmount);
            this.drawOrderChart(xData, orderData);
        },
        drawOrderChart(xData, orderData) {
            var myChart = this.$echarts.init(document.getElementById('order'));

            var option = {
                xAxis: {
                    type: 'category',
                    data: xData
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '<strong>时间:</strong>{b}</br><strong>订单数量:</strong><span>{c}</span>'
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: orderData,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            };

            myChart.setOption(option);
            // 图表自适应
            window.addEventListener('resize', function () {
                myChart.resize();
            })
        }
    }
}
</script>

<style lang="less" scoped>
.order {
    margin: 0 auto;
    width: 96%;
    height: 500px;
}
</style>