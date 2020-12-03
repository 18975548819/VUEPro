<template>
    <div id="kcDv" class="kcDv">
        <div class="lc1-details">当前仓库物料库存数量前100排名</div>
        <dv-scroll-ranking-board :config="config" style="width:1300px;height:260px;text-align: left;" />
    </div>
</template>

<script>
import Vue from 'vue'
import {requestDvScrollRankingBoard} from '../../../api/api'

export default {
    data(){
        return{
            timer:null,
            config:{
                // data: [
                        
                //     ],
                //     unit: 'PS',
                //     valueFormatter ({ value }) {
                //         console.warn(arguments)
                //         const reverseNumber = (value + '').split('').reverse()
                //         let valueStr = ''

                //         while (reverseNumber.length) {
                //         const seg = reverseNumber.splice(0, 3).join('')
                //         valueStr += seg
                //         if (seg.length === 3) valueStr += ','
                //         }

                //         return valueStr.split('').reverse().join('')
                //     }
            }
        }
    },
    methods:{
        getRankingData(){
            let self = this;
            requestDvScrollRankingBoard({PageIndex:1,PageSize:100}).then(function(res){
                Vue.set(self.config,'data',res.data.seriesDatas);   
                //Vue.set(self.config,'unit','数量');
            }).catch(function(error){

            })
        },
        setTimer:function(){
                this.timer = setInterval(()=>{
                    this.getRankingData();
            },30000)
        }
    },
    destroyed() {
        clearInterval(this.timer)
    },
    mounted:function(){
        this.setTimer();
        this.getRankingData();
    }
}
</script>

<style>
#kcDv{
    width: 600px;
    height: 260px;
}
</style>