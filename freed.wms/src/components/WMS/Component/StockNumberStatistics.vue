<template>
    <div id="stockDv" class="stockDv">
        <div class="lc2-details">物料库存数量统计</div>
        <dv-scroll-ranking-board :config="config" style="width:420px;height:400px;text-align: left;"/>
        <dv-decoration-2 style="width:420px;height:10px;" />
    </div>
</template>

<script>
import Vue from 'vue'
import {requestDvScrollRankingBoard} from '../../../api/api'

export default {
    props:["partInfo"],
    data(){
        return{
            config:{},
            infos:this.partInfo,
            serData:[]
        }
    },
    methods:{
        getStockNumberData(){
            let self = this;
            self.config = {};
            requestDvScrollRankingBoard({MaterieId:self.infos.MaterieId,RepertoryId:self.infos.RepertoryId,PageIndex:1,PageSize:20}).then(function(res){
                Vue.set(self.config,'data',res.data.seriesDatas);   
            }).catch(function(error){
                console.log(error);
                return;
            })
        }
    },
    mounted(){
        this.getStockNumberData();
    },
    watch:{
        partInfo:{
            handler(newValue, oldValue) {  
　　　　　　    this.infos = newValue;
               this.getStockNumberData();
    　　　　},  
    　　　　deep: true //深度监听  
        }
    },
}
</script>