<template>
    <div id="chartLineMaterial" class="chartLineMaterial"></div>
</template>

<script>
import echarts from 'echarts'
import {requestMaterialInfo} from '../../../api/api'

export default {
    data(){
        return{
            timer:null,
            lineData:{
                xData:[],
                inType:'入库单据数量',
                inData:[],
                outType:'出库单据数量',
                outData:[],
                xData:[]
            }
        }
    },
    methods:{
        echartsLineM(){
            var echartsLine = this.$echarts.init(document.getElementById('chartLineMaterial'));
            var option = {
                        title: {
                            text: '近七天单据出入库记录数',
                        },
                        legend:{
                                data:[this.lineData.inType,this.lineData.outType],
                                textStyle:{
                                    color:'#fff',
                                    align: 'right',
                                },
                                x:'right'
                        },
                        //backgroundColor: "#344b58",
                        backgroundColor:'rgba(255, 255, 255, 0)',
                        "tooltip": {
                            "trigger": "axis",
                            "axisPointer": {
                                "type": "shadow",
                                textStyle: {
                                    color: "#fff"
                                }

                            },
                        },
                        "grid": {
                            top: '15%',
                            left: '15%',
                            right: '8%',
                            bottom: '15%',
                            // "borderWidth": 0,
                            // "top": 10,
                            // "bottom": 25,
                            // textStyle: {
                            //     color: "#fff"
                            // }
                        },
                        "calculable": true,
                        "xAxis": [{
                            "type": "category",
                            "axisLine": {
                                lineStyle: {
                                    color: 'rgba(255,255,255,.5)'
                                }
                            },
                            "splitLine": {
                                "show": false
                            },
                            "axisTick": {
                                "show": false
                            },
                            "splitArea": {
                                "show": false
                            },
                            "axisLabel": {
                                "interval": 0,
                                //color:'rgba(255,255,255,0.7)',
                                //fontSize:12,
                                color:'#fff',
                                rotate: 25
                                
                            },
                            boundaryGap: false,
                            "data": this.lineData.xData,
                        }],
                        "yAxis": [{
                            "type": "value",
                            "splitLine": {
                                "show": false
                            },
                            "axisLine": {
                                "show": false
                            },
                            "axisTick": {
                                "show": false
                            },
                            "axisLabel": {
                                "interval": 0,
                                //color:'rgba(255,255,255,0.5)',
                                color:'#fff',
                                fontSize:12

                            },
                            "splitArea": {
                                "show": false
                            },

                        }],
                        "series": [{
                                "name": this.lineData.inType,
                                "type": "bar",
                                "stack": "记录条数",
                                "barMaxWidth": 35,
                                "barGap": "10%",
                                "itemStyle": {
                                    "normal": {
                                        "color": 
                                        {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0,
                                                color: 'rgba(35, 157, 250, 1)' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: 'rgba(35, 157, 250, 0)' // 100% 处的颜色
                                            }],
                                            global: false // 缺省为 false
                                        }
                                    }
                                },
                                "data": this.lineData.inData,
                            },

                            {
                                "name": this.lineData.outType,
                                "type": "line",
                                "stack": "记录调试",
                                "itemStyle": {
                                    "normal": {
                                        "color": {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0,
                                                color: 'rgba(35, 250, 187, 1)' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: 'rgba(35, 250, 187, 0)' // 100% 处的颜色
                                            }],
                                            global: false // 缺省为 false
                                        },
                                        "barBorderRadius": 0
                                    }
                                },
                                "data": this.lineData.outData
                            }
                        ]
                    };
                echartsLine.setOption(option);
        },

        getEchartsLineData(){
            let self = this;
            self.lineData.xData = [],
            self.lineData.inData = [],
            self.lineData.outData = [],
            self.echartsLineM();
            requestMaterialInfo({PageIndex:1,PageSize:20}).then(function(res){
                if(!res.hasErr && res.code >= 0)
                {
                    self.lineData.xData = res.data.xAxisData;
                    self.lineData.inData = res.data.yAxisData1;
                    self.lineData.outData = res.data.yAxisData2;
                    self.echartsLineM();
                }
            }).catch(function(error){
                    self.$notify({
                    title: '警告',
                    message: '近七天物料出入库接口请求异常',
                    type: 'warning',
                    duration:2000
                    });
            });
        },
        setTimer:function(){
                this.timer = setInterval(()=>{
                    this.getEchartsLineData();
            },30000)
        },
    },
    destroyed() {
        clearInterval(this.timer)
    },
    mounted:function(){
        this.setTimer();
        var myChartLineMat = this.$echarts.init(document.getElementById('chartLineMaterial'));
	    window.onresize = function () {
	    	myChartLineMat.resize();
        }
        this.getEchartsLineData();
    },
    created(){

    }
}
</script>

<style>
#chartLineMaterial{
    width: 280px;
    height: 280px;
}
</style>



