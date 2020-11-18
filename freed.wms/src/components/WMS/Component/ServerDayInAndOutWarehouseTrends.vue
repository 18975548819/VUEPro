<template>
    <div id="chartLine2" class="chartLine2"></div>
</template>

<script>
import echarts from 'echarts'
import {requestServerDayInAndOutWarehouseTrends} from '../../../api/api'

export default {
    data(){
        return{
            timer:null,
            serverDayLine2:{
            XData2:[],
            seriesData2:[],
            legendData:[]
            }
        }
    },
    methods:{
        //#region  折线图
        myEcharts2(){
            var myChart2 = this.$echarts.init(document.getElementById('chartLine2'));
            var option = {
                        title: {
                            text: '近七天库存趋势',
                            textStyle:{
                                    color:'#F0F0F0',
                                    align: 'right',
                                },
                        },
                        legend:{
                                data:this.serverDayLine2.legendData,
                                textStyle:{
                                    color:'#F0F0F0',
                                    align: 'right',
                                },
                                x:'right'
                        },
                        //backgroundColor:'#232d36',
                        backgroundColor:'rgba(255, 255, 255, 0)',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(0, 255, 233,0)'
                                        }, {
                                            offset: 0.5,
                                            color: 'rgba(255, 255, 255,1)',
                                        }, {
                                            offset: 1,
                                            color: 'rgba(0, 255, 233,0)'
                                        }],
                                        global: false
                                    }
                                },
                            },
                        },
                        grid: {
                            top: '20%',
                            left: '8%',
                            right: '5%',
                            bottom: '10%',
                            // containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            axisLine: {
                                show: false,
                                color:'#A582EA'
                            },
                        
                            axisLabel: {
                                color: '#fff',
                                width:200
                            },
                            splitLine: {
                                show: false
                            },
                            boundaryGap: false,
                            data: this.serverDayLine2.XData2//this.$moment(data.times).format("HH-mm") ,

                        }],

                        yAxis: [{
                            type: 'value',
                            min: 0,
                            // max: 140,
                            splitNumber: 4,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#00BFF3',
                                    opacity:0.23
                                }
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: true,
                                margin: 20,
                                textStyle: {
                                    color: '#fff',

                                },
                            },
                            axisTick: {
                                show: false,
                            },
                        }],
                        series:this.serverDayLine2.seriesData2
                    };
                myChart2.setOption(option);
            },
            //#endregion

        getServerGoodInfo()
        {
            let self = this;
            self.serverDayLine2.XData2 = [],
            self.serverDayLine2.seriesData2 = [],
            self.serverDayLine2.legendData = [],
            self.myEcharts2();
            requestServerDayInAndOutWarehouseTrends().then(function(res){
                if(!res.hasErr && res.code >= 0)
                {
                    self.serverDayLine2.XData2 = res.data.xAxisData;
                    for (const key in res.data.yAxisDataMultiple) {
                        var object =  res.data.yAxisDataMultiple[key];
                        for (const key2 in object) {
                            if (object.hasOwnProperty(key2)) {
                                // const element = object[key2];
                                // const ss = key2;
                                self.serverDayLine2.legendData.push(key2);
                                self.serverDayLine2.seriesData2.push(
                                {
                                name:key2,
                                type: 'line',
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#A582EA",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#A582EA',
                                    }
                                },
                                itemStyle: {
                                    color: "#A582EA",
                                    borderColor: "#A582EA",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(43,193,145,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(43,193,145,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: object[key2]//data.values
                            })
                        }
                    }
                    }
                    self.myEcharts2();
                }

            }).catch(function(error){
                self.$notify({
                title: '警告',
                message: '近七天单据出入库接口请求异常',
                type: 'warning',
                duration:2000
                });
            })
        },
        setTimer:function(){
                this.timer = setInterval(()=>{
                    this.getServerGoodInfo();
            },30000)
        },
    },
    destroyed() {
        clearInterval(this.timer)
    },
    mounted:function(){
        this.setTimer();
        var myChartLine2 = this.$echarts.init(document.getElementById('chartLine2'));
	    window.onresize = function () {
	    	myChartLine2.resize();
        }
        this.getServerGoodInfo();
    }
}
</script>


<style>
#chartLine2{
    height: 280px;
    width: 1400px;
}
</style>