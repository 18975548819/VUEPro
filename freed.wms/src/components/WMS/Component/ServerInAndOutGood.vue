<template>
    <div id="chartLine" class="chartLine"></div>
</template>

<script>
import echarts from 'echarts'
import {requestServerGoods} from '../../../api/api'

export default {
    data(){
        return{
            timer:null,
            serverDayLine:{
            XData:[],
            InType:'物料入库记录数',
            InData:[],
            OutType:'物料出库记录数',
            OutData:[]
            }
        }
    },
    methods:{
        //#region  折线图
        myEcharts(){
            var myChart = this.$echarts.init(document.getElementById('chartLine'));
            var option = {
                        title: {
                            text: '近七天物料出入库记录数',
                        },
                        legend:{
                                data:[this.serverDayLine.InType,this.serverDayLine.OutType],
                                textStyle:{
                                    color:'#fff',
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
                            top: '15%',
                            left: '15%',
                            right: '8%',
                            bottom: '15%',
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
                                width:100
                            },
                            splitLine: {
                                show: false
                            },
                            boundaryGap: false,
                            data: this.serverDayLine.XData//this.$moment(data.times).format("HH-mm") ,

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
                        series: [
                            {
                                name:this.serverDayLine.InType,
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
                                data: this.serverDayLine.InData//data.values
                            },
                            {
                                name:this.serverDayLine.OutType,
                                type: 'line',
                                showAllSymbol: true,
                                symbol: 'circle',
                                symbolSize: 10,
                                lineStyle: {
                                    normal: {
                                        color: "#2CABE3",
                                    },
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#2CABE3',
                                    }
                                },
                                itemStyle: {
                                    color: "#2CABE3",
                                    borderColor: "#2CABE3",
                                    borderWidth: 2,
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgba(81,150,164,0.3)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(81,150,164,0)'
                                            }
                                        ], false),
                                    }
                                },
                                data: this.serverDayLine.OutData//data.values
                            },
                        ]
                    };
                myChart.setOption(option);
            },
            //#endregion

        getServerGoodInfo()
        {
            let self = this;
            self.serverDayLine.XData = [],
            self.serverDayLine.InData = [],
            self.serverDayLine.OutData = [],
            self.myEcharts();
            requestServerGoods({PageIndex:1,PageSize:20}).then(function(res){
                if(!res.hasErr && res.code >= 0)
                {
                    self.serverDayLine.XData = res.data.xAxisData;
                    self.serverDayLine.InData =res.data.yAxisData1;
                    self.serverDayLine.OutData = res.data.yAxisData2;
                    self.myEcharts();
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
        var myChartLine = this.$echarts.init(document.getElementById('chartLine'));
	    window.onresize = function () {
	    	myChartLine.resize();
        }
        this.getServerGoodInfo();
    }
}
</script>


<style>
#chartLine{
    height: 280px;
    width: 500px;
}
</style>