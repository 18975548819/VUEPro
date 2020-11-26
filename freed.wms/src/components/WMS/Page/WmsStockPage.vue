<!--库存报表查询-->
<template>
      <div id="data-view2" class="data-view2">
        <!-- 左边信息展示 -->
        <div id="leftDv2">
            <dv-border-box-3 style="width: calc(100% - 80px);;height:calc(100% - 80px);">
                <InStrorageGoodType style="width:calc(100% - 80px);margin-left:30px;  padding-top: 30px;"/>
                <InStrorage style="width:calc(100% - 80px);margin-left:30px;"/>
                <OutStrorageGoodType style="width:calc(100% - 80px);margin-left:30px;"/>
                <OutStrorage style="width:calc(100% - 80px);margin-left:30px;"/>
            </dv-border-box-3>
        </div>

        <div id="cententDv2">
            <dv-border-box-3 style="width:calc(100% - 10px);;height:calc(100% - 80px);">
                <WmsStock style="width:calc(100%-1px);margin-left:30px;padding-top:30px"/>
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

export default {
    components: {
    InStrorage,
    OutStrorage,
    InStrorageGoodType,
    OutStrorageGoodType,
    WmsStock
    },
    data(){
        return{
        }
    },
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
</style>