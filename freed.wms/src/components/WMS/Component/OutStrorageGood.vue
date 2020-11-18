<template>
    <div id="InDv" class="InDv">
        <div class="lc1-details">物料出库明细(当天)</div>
        <dv-scroll-board :config="config" style="width:435px;height:200px;font-size: 5px;" />
        <dv-decoration-2 style="width:435px;height:10px;" />
  </div>
</template>

<script>
import {requestOutStroageInfo} from '../../../api/api'
import Vue from 'vue'
export default {
    data(){
        return{
            timer:null,
            config:{}
        }
    },
    methods:{
        getOutStrorageGoodsInfo(){
            let self = this;
            Vue.set(self.config,'data',[]); 
            requestOutStroageInfo({PageIndex:1,PageSize:20}).then(function(res){
                if(!res.hasErr && res.code >= 0)
                {
                    Vue.set(self.config,'header',res.data.header);
                    Vue.set(self.config,'data',res.data.data);    
                    Vue.set(self.config,'columnWidth',[200]);  
                }
                else
                {
                    self.$notify({
                    title: '警告',
                    message: '物料出库明细数据暂未！',
                    type: 'warning',
                    duration:2000
                    });
                }
                // self.config = res.data;
          }).catch(function(error){
            self.$notifyerror({
                title: '错误',
                message: '物料出库明细接口异常'
                });
              console.log(error);
          })
        },
        setTimer:function(){
                this.timer = setInterval(()=>{
                    this.getOutStrorageGoodsInfo();
            },30000)
        },
    },
    destroyed() {
        clearInterval(this.timer)
    },
    mounted(){
        this.setTimer();
        this.getOutStrorageGoodsInfo();
    }
}
</script>

<style>
</style>