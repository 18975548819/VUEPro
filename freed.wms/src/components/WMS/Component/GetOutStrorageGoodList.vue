<template>
    <div id="InGoodDv">
        <el-table
            id="inGoodTable"
            :data="tableData"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            border
            height="760"
            style="width: 100%;max-height:430px;">
            <el-table-column
            prop="materieId"
            label="物料编号"
            >
            </el-table-column>
            <el-table-column
            prop="lotNumber"
            label="批次"
            >
            </el-table-column>
            <el-table-column
            prop="qty"
            label="数量">
            </el-table-column>
            <el-table-column
            prop="outStorageType"
            label="出库类型">
            </el-table-column>
           <el-table-column
            prop="repertoryId"
            label="出库仓位">
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
import {requestOutStroageList} from '../../../api/api'

export default {
    props:["rowObj"],
    data(){
        return{
            tableData: [],
            obj:this.rowObj,
            loading: false,
        }
    },
    methods:{
        getOutGoodListFun(){
            let self = this;
            self.loading = true;
            requestOutStroageList({PageIndex:1,PageSize:100,MaterieId:self.obj.MaterieId,RepertoryId:self.obj.RepertoryId}).then(function(res){
                if(!res.hasErr)
                {
                    self.tableData = res.results;
                    self.loading = false;
                }

            }).catch(function(error){
                console.log(error);
                return;
            });
        }
    },
    mounted(){
    },
    watch:{
        rowObj:{
            handler(newValue, oldValue) {  
　　　　　　    this.obj = newValue;
               this.getOutGoodListFun();
    　　　　},  
    　　　　deep: true //深度监听  
        }
    },
}
</script>

<style>
#InGoodDv{
    width: 400px;
}

#inGoodTable{
    position: relative;
    overflow:auto;
    background: rgba(255,255,255,0);
}
.el-table th, .el-table tr {
    background-color:rgba(255, 255, 255, 0) !important;
    color: rgb(148, 142, 142);
}
/* 表格鼠标悬浮时的样式（高亮） */
#inGoodTable .el-table--enable-row-hover .el-table__body tr:hover {
  background: rgb(255, 255, 255,0);
  border: 1px solid #313463;
}
/*表格鼠标悬停的样式（背景颜色）*/
#inGoodTable .el-table tbody tr:hover > td {
  background-color: #001851 !important;
}
</style>