<!-- 出入库明细 -->
<template>
      <div id="data-view" class="data-view">
        <!-- 左边信息展示 -->
        <div id="leftDv">
            <dv-border-box-3 style="width: calc(100% - 80px);;height:calc(100% - 80px);">
                <InStrorageGoodType style="width:calc(100% - 80px);margin-left:30px;  padding-top: 30px;"/>
                <InStrorage style="width:calc(100% - 80px);margin-left:30px;"/>
                <OutStrorageGoodType style="width:calc(100% - 80px);margin-left:30px;"/>
                <OutStrorage style="width:calc(100% - 80px);margin-left:30px;"/>
            </dv-border-box-3>
        </div>

        <div id="cententDv">
            <dv-border-box-3 style="width: calc(100% - 1px);;height:calc(100% - 80px);">
                <WarehouseInAndOut style="width:calc(100% - 60px);margin-left:30px;padding-top:30px"/>
            </dv-border-box-3>
        </div>
      </div>
</template>

<script>
import InStrorage from '../Component/InStrorageGood'
import OutStrorage from '../Component/OutStrorageGood'
import InStrorageGoodType from '../Component/InStrorageGoodType'
import OutStrorageGoodType from '../Component/OutStrorageGoodType'
import WarehouseInAndOut from '../Component/WarehouseInAndOut'
import store from '../../../store/index'

export default {
    components: {
    InStrorage,
    OutStrorage,
    InStrorageGoodType,
    OutStrorageGoodType,
    WarehouseInAndOut
    },
    data(){
        return{

        }
    },
}
</script>


<style>
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;
}
#leftDv{
    width: 30%;
    height: 100%;
    position: fixed;
    left: 20px;
    top: 80px;
}
#cententDv{
    width: 72%;
    height: 100%;
    position: fixed;
    left: 27%;
    top: 80px;
}
</style>