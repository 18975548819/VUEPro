<template>
    <div>
        <div class="goodCountDV" id="goodCountDV">仓库物料数量统计</div>
        <dv-active-ring-chart :config="config" style="width:420px;height:400px;text-align: left;" />
        <dv-decoration-2 style="width:420px;height:10px;" />
    </div>
</template>

<script>
import Vue from 'vue'
import {requestGetEchartsPie} from '../../../api/api'
export default {
    props:["partInfoNum"],
    data(){
        return{
            config:{
                // radius: '50%',
                // activeRadius: '55%',
                // digitalFlopStyle: {
                //     fontSize: 14
                // },
                // lineWidth: 10,
                // showOriginValue: true
            },
            whereList:this.partInfoNum,
            digitalFlopStyleValue: {
                fontSize: 14
            },
        }
    },
    methods:{
        GetGoodCountFun(){
            let self = this;
            self.config = {};
            requestGetEchartsPie({MaterieId:self.whereList.MaterieId,RepertoryId:self.whereList.RepertoryId,PageIndex:1,PageSize:100}).then(function(res){
                if(!res.hasErr)
                {
                    Vue.set(self.config,'radius','50%');
                    Vue.set(self.config,'activeRadius','55%');
                    Vue.set(self.config,'lineWidth',10);
                    Vue.set(self.config,'showOriginValue',true);
                    Vue.set(self.config,'digitalFlopStyle',self.digitalFlopStyleValue);
                    Vue.set(self.config,'data',res.data.seriesDatas);
                    Vue.set(self.config,'color',['#FFC530','#FFFF00','#fff','#FFFF84','#840000','#FF0082']);
                }

            }).catch(function(error){
                console.log(error);
                return;
            })
        }
    },
    mounted(){
        this.GetGoodCountFun();
    },
    watch:{
        partInfoNum:{
            handler(newValue, oldValue) {  
　　　　　　    this.whereList = newValue;
               this.GetGoodCountFun();
    　　　　},  
    　　　　deep: true //深度监听  
        }
    }
}
</script>