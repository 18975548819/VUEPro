<template>
    <div id="InDv" class="InDv">
        <div class="lc1-details">物料入库明细(当天)</div>
        <dv-scroll-board :config="config" style="width:435px;height:200px;font-size: 5px;" />
        <dv-decoration-2 style="width:435px;height:10px;" />
  </div>
</template>

<script>
import {requestInStroageInfo} from '../../../api/api'
import Vue from 'vue'
export default {
    data(){
        return{
            timer:null,
            config:{}
        }
    },
    methods:{
        getInStrorageGoodsInfo(){
            let self = this;
            Vue.set(self.config,'data',[]); 
            requestInStroageInfo({PageIndex:1,PageSize:20}).then(function(res){
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
                    message: '物料入库明细数据暂未！',
                    type: 'warning',
                    duration:2000
                    });
                }
                // self.config = res.data;
          }).catch(function(error){
            self.$notify.error({
                title: '错误',
                message: '物料入库明细接口异常'
                });
              console.log(error);
          })
        },
        setTimer:function(){
                this.timer = setInterval(()=>{
                    this.getInStrorageGoodsInfo();
            },30000)
        },
    },
    destroyed() {
        clearInterval(this.timer)
    },
    mounted(){
        this.setTimer();
        this.getInStrorageGoodsInfo();
    }
}
</script>

<style>
</style>