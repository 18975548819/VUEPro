<!--库存报表查询-->
<template>
      <div id="data-view2" class="data-view2">
        <!-- 左边信息展示 -->
        <div id="leftDv2">
            <dv-border-box-3 style="width: calc(100% - 80px);;height:calc(100% - 80px);">
                <StockNumberStatistics :partInfo="selectWhereInfo" style="width:calc(100% - 10px);margin-left:30px;  padding-top: 30px;"/>
                <GoodStocCountStatistics :partInfoNum="selectWhereInfo" style="width:calc(100% - 10px);margin-left:30px;  padding-top: 30px;"/>
            </dv-border-box-3>
        </div>

        <!-- 右边信息展示1 -->
        <div id="bottomDv2">
            <dv-border-box-4 style="width:calc(100% - 10px);;height:calc(100% - 10px);">
                <GoodInStrotorageGoodList :rowObj="tableObj" style="width:calc(100% - 50px);;height:calc(95% - 80px);padding-top:30px;padding-left:30px"/>
            </dv-border-box-4>
        </div>
        <!-- 右边信息展示2 -->
        <div id="bottomDv3">
            <dv-border-box-4 :reverse="true" style="width:calc(100% - 10px);;height:calc(100% - 10px);">
                <GoodOutStrotorageGoodList :rowObj="tableObj" style="width:calc(100% - 50px);;height:calc(95% - 80px);padding-top:30px;padding-left:30px"/>
            </dv-border-box-4>
        </div>

        <!-- 中间库存报表查询 -->
        <div id="cententDv2">
            <dv-border-box-3 style="width:calc(100% - 10px);;height:calc(100% - 80px);">
                <WmsStock @setSelectWher="handleInfo" @tableClick="tableClickFun" style="width:calc(100%-1px);margin-left:30px;padding-top:30px"/>
            </dv-border-box-3>
        </div>
      </div>
</template>

<script>
import InStrorage from '../Component/InStrorageGood'
import OutStrorage from '../Component/OutStrorageGood'
import InStrorageGoodType from '../Component/InStrorageGoodType'
import OutStrorageGoodType from '../Component/OutStrorageGoodType'
import WmsStock from '../Component/WmsStock'
import store from '../../../store/index'
import StockNumberStatistics from '../Component/StockNumberStatistics'
import GoodStocCountStatistics from '../Component/GoodStockCountStatistics'
import GoodInStrotorageGoodList from '../Component/GetInStrorageGoodList'
import GoodOutStrotorageGoodList from '../Component/GetOutStrorageGoodList'

export default {
    components: {
    InStrorage,
    OutStrorage,
    InStrorageGoodType,
    OutStrorageGoodType,
    WmsStock,
    StockNumberStatistics,
    GoodStocCountStatistics,
    GoodInStrotorageGoodList,
    GoodOutStrotorageGoodList
    },
    data(){
        return{
            selectWhereInfo:[],
            tableObj:{}
        }
    },
    methods:{
        handleInfo(data){
            this.selectWhereInfo = data;
        },
        tableClickFun(tabObj){
            this.tableObj = tabObj;
        },
    }
}
</script>


<style>
#data-view2 {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;
}
#leftDv2{
    width: 30%;
    height: 100%;
    position: fixed;
    left: 20px;
    top: 80px;
}
#cententDv2{
    width: 48%;
    height: 100%;
    position: fixed;
    left: 27%;
    top: 80px;
}

#bottomDv2{
    width: 25%;
    height: 46%;
    position: fixed;
    left: 74.5%;
    top: 80px;
}

#bottomDv3{
    width: 25%;
    height: 46%;
    position: fixed;
    left: 74.5%;
    top: 54%;
}
</style>