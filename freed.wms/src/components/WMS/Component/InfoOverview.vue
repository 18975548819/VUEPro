<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div>仓库信息总览</div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>

    <div class="cc-details">
      <div>受控储位</div>
      <div class="card">{{skcw.skcw0}}</div>
      <div class="card">{{skcw.skcw1}}</div>
      <div class="card">{{skcw.skcw2}}</div>
      <div class="card">{{skcw.skcw3}}</div>
    </div>


    <div class="cc-main-container">
      <div class="ccmc-left">
        <div class="station-info" style="width:200px;mar">
          使用仓位<span style="margin-left: 20px;">{{this.sycwCount}}</span>
        </div>
        <div class="station-info" style="width:200px;mar">
          监控仓位<span style="margin-left: 20px;">{{this.sycwCount}}</span>
        </div>
      </div>

      <!-- <dv-active-ring-chart class="ccmc-middle" :config="config" /> -->
      <div id="PieDv" class="PieDv"></div>

      <div class="ccmc-right">
        <div class="station-info" style="width:200px;margin-left: -60px;">
          <span>{{this.sumCount}}</span>总物料数量
        </div>
        <!-- <div class="station-info">
          <span>0</span>其他
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {requestGetStorage,requestGetEchartsPie} from '../../../api/api'

export default {
  name: 'CenterCmp',
  components: {
  },
  data () {
    return {
      timer:null,
      //受控储位
      skcw:{
        skcw0:'0',
        skcw1:'0',
        skcw2:'0',
        skcw3:'0',
      },
      pie:{
        lenghtData:[],
        xData:[]
      },
      sycwCount:0, //使用仓位个数
      sumCount:0,//物料种个数

    }
  },
  methods:{
    GetStroageInfos(){
      let self = this;
      requestGetStorage().then(function(res){
        var num = res.results.length.toString();
        var lens = self.formatZero(res.results.length,4);
        self.skcw.skcw0 = lens.slice(0,1);
        self.skcw.skcw1 = lens.slice(1,2);
        self.skcw.skcw2 = lens.slice(2,3);
        self.skcw.skcw3 = lens.slice(3,4);
      }).catch(function(error){

      })
    },
    //不足补0
   formatZero(num, len) {
    if(String(num).length > len) return num;
    return (Array(len).join(0) + num).slice(-len);
    },

    drawPieChartOut() {
      this.chartPieOut = echarts.init(document.getElementById('PieDv'));
      
      this.chartPieOut.setOption({
          toolbox: {
              show: true,
              // feature: {
              //     // mark: {show: true},
              //     // dataView: {show: true, readOnly: false},
              //     magicType: {
              //         show: true,
              //         type: ['pie', 'funnel']
              //     },
              //     restore: {show: true},
              //     // saveAsImage: {show: true}
              // }
          },
          // title: {
          //     text: '123',
          //     subtext: '出库单据(数量)',
          //     x: 'center'
          // },
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          // legend: {
          //     orient: 'vertical',
          //     left: 'left',
          //     data:this.pie.lenghtData
          // },
          series: [
              {
                  name: '仓库物料数量',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data:this.pie.xData,
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      });
    },

    //获取各仓物料数量统计
    GetEchartsPieData(){
      let self = this;
      self.pie.lenghtData=[];
      self.pie.xData = [];
      self.sycwCount = 0;
      self.sumCount = 0;
      self.drawPieChartOut();
      requestGetEchartsPie().then(function(res){
        self.pie.lenghtData = res.data.legendData;
        self.pie.xData = res.data.seriesDatas;
        self.sycwCount = res.data.seriesDatas.length;
        for (let index = 0; index < res.data.seriesDatas.length; index++) {
            self.sumCount += res.data.seriesDatas[index].value;
        }
        self.drawPieChartOut();

      }).catch(function(error){

      })
    },
    setTimer:function(){
            this.timer = setInterval(()=>{
                this.GetEchartsPieData();
        },30000)
    },
  },
  destroyed() {
        clearInterval(this.timer)
  },
  mounted(){
    this.setTimer();
    this.GetEchartsPieData();
    this.GetStroageInfos();
  }
}
</script>

<style scoped>
.center-cmp {
  width: calc(100% - 50px);
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
}

  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    margin-top: 30px;
    margin-left: 40px;
  }

  .cc-details {
    height: 100px;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;
  }

    .card {
      background-color: rgba(4,49,128,.6);
      color: #08e5ff;
      height: 70px;
      width: 70px;
      font-size: 45px;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      margin: 10px;
    
  }

  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;
    margin-left: 80px;
  }

    .ccmc-middle {
      width: 50%;
      height: 90%;
    }

      .active-ring-name {
        font-size: 20px !important;
      
    }

    .ccmc-left, .ccmc-right {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 18px;
    }

      span {
        font-size: 40px;
        font-weight: bold;
      }

      .station-info {
        height: 80px;
        width: 80%;
        display: flex;
        align-items: center;
        margin-right: -60px;
      
    }

    .ccmc-left {
      align-items: flex-end;
    }

      span {
        margin-left: 0px;
      
    }

    .ccmc-right {
      align-items: flex-start;
    }

      span {
        margin-right: 20px;
    }
  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  #PieDv{
    width: 900px;
    height:400px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
