<template>
    <div id="DvType" class="DvType">
        <div class="lc1-details">物料入库类型占比(当天:{{this.ct}}条记录)</div>
        <dv-active-ring-chart :config="config" style="width:435px;height:200px;font-size: 5px;" />
        <dv-decoration-2 style="width:435px;height:10px;" />
    </div>
</template>


<script>
import {requestInStroageInfoDvActiveRingChart} from '../../../api/api'
import Vue from 'vue'
export default {
    data(){
        return{
            timer:null,
            ct:0,
            config:{        
                radius: '80%',
                activeRadius: '60%'
                }
        }
    },
    methods:{
        getDataFun(){
            let self = this;
            Vue.set(self.config,'data',[]);
            self.ct = 0;
            requestInStroageInfoDvActiveRingChart({PageIndex:1,PageSize:20}).then(function(res){
                if(!res.hasErr && res.code >= 0)
                {
                    Vue.set(self.config,'data',res.data.data);    
                    Vue.set(self.config,'color',['#FFC530','#fff']);  
                    for (let index = 0; index < res.data.data.length; index++) {
                        self.ct += res.data.data[index].value;
                    }
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
            }).catch(function(error){

            })
        },
        setTimer:function(){
                this.timer = setInterval(()=>{
                    this.getDataFun();
            },30000)
        },
    },
    destroyed() {
        clearInterval(this.timer)
    },
    mounted:function(){
        this.setTimer();
        this.getDataFun();
    }
}
</script>

<style>

</style>