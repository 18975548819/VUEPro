<template>
    <div id="ContentDv2">
        <!-- 查询搜索条件 -->
        <div id="SelectDv2">
            所属仓位：<el-select v-model="selectWhere.RepertoryId" placeholder="请选择" style="width:200px;">
                        <el-option
                        v-for="item in this.optionsRepertoryId"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
            料号：<el-input v-model="selectWhere.MaterieId" placeholder="请输入物料编号" style="width:200px"></el-input>
            <el-button type="primary" @click="GetWmsStock()">查询库存</el-button>
            <!-- <el-button type="primary" :data = "tableData"><i class="el-icon-upload el-icon--right"></i></el-button> -->
            <download-excel
                class = "export-excel-wrapper"
                :data = "tableData"
                :fields="json_Tablefields"
                name = "物料库存.xls">
                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                 <el-button type="primary"><i class="el-icon-download el-icon--right"></i></el-button>
            </download-excel>
        </div>
        <!-- <el-scrollbar style="width: 100%;height:750px"> -->
        <!-- 数据表格 -->
        <el-table id="tableStock"
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            border
            height="760"
            :data="tableData"
            style="width: 100%;max-height:760px"
            @row-click="tableRowClickFun"
            >
            <el-table-column
            prop="materieId"
            label="物料编号"
            width="300">
            </el-table-column>
            <el-table-column
            prop="repertoryId"
            label="仓位"
            width="300">
            </el-table-column>
            <el-table-column
            prop="qty"
            label="数量"
            width="140">
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- </el-scrollbar> -->
        <!-- 分页 -->
        <el-pagination background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10,20, 50, 100, 200,500,1000]"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <!--库存明细-->
        <el-dialog title="库存详情" :visible.sync="dialogTableVisible" id="dialogDetail" width="80%">
            <el-table :data="gridData" id="tableDetail"
                v-loading="loadingDetail"
                element-loading-text="数据加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                height="500"
                border>
                <el-table-column property="id" label="Id" width="50"></el-table-column>
                <el-table-column property="fnumber" label="唯一码"></el-table-column>
                <el-table-column property="materieId" label="物料号"></el-table-column>
                <el-table-column property="repertoryId" label="仓位"></el-table-column>
                <el-table-column property="qty" label="数量" width="80"></el-table-column>
                <el-table-column property="inStorageNo" label="储位Id"></el-table-column>
                <el-table-column property="storageName" label="储位名称"></el-table-column>
                <el-table-column property="storageTime" label="生产日期"></el-table-column>
                <el-table-column property="validTime" label="有效日期"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import {requestRepertoryIdAndStorageTypeList,requestGetWmsStock,requestGetWmsStockDetail} from '../../../api/api'


export default {
    data(){
        return{
            selectWhere:{
                StorageType:'',
                RepertoryId:'',
                StartScanTime:'',
                EndtScanTime:'',
                DeliveryNo:'',
                MaterieId:'',
                SeachData:[]
            },
            tableClickObj:{
                MaterieId:'',
                RepertoryId:''
            },
            loading: true,
            loadingDetail:true,
            total:1000,
            currentPage: 1,
　　　　　　 pageSize: 20,
            optionsStorageType:[],
            optionsRepertoryId:[],
            tableData:[],//出入库明细集合
            json_Tablefields:{ //Excel导出表头
                "物料编号":"materieId",
                "仓位":"repertoryId",
                "数量":"qty",
            },
            gridData: [], //物料库存详情
            dialogTableVisible:false
        }
    },
    methods:{
        formatterFun(row, column) {
        return row.address;
        },
        tableRowClickFun(row, event, column){
            debugger
            this.tableClickObj.MaterieId = row.materieId;
            this.tableClickObj.RepertoryId = row.repertoryId;
            this.$emit('tableClick',this.tableClickObj);
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.GetWmsStock();
            //this.fetchData(1, val);
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.GetWmsStock();
            //this.fetchData(val, this.pageSize);
            //console.log(`当前页: ${val}`);
        },
        //查询条件：获取仓位集合和出入库类型集合
        getRepertoryIdAndStorageTypeList()
        {
            let self = this;
            requestRepertoryIdAndStorageTypeList().then(function(res){
                if(!res.hasErr)
                {
                    self.optionsRepertoryId = res.data.repertoryIdList;
                    self.optionsStorageType = res.data.storageTypeList;
                }
            }).catch(function(error){
                console.log(error);
            })
        },
        //获取库存
        GetWmsStock()
        {
            let self = this;
            self.loading = true;
            requestGetWmsStock({RepertoryId:self.selectWhere.RepertoryId,StorageType:self.selectWhere.StorageType,
            DeliveryNo:self.selectWhere.DeliveryNo,MaterieId:self.selectWhere.MaterieId,
            ScanTime:self.selectWhere.SeachData,PageIndex:self.currentPage,PageSize:self.pageSize}).then(function(res){
                if(!res.hasErr)
                {
                    self.tableData = res.results;
                    self.total = res.pageModel.totalCount;
                    self.loading = false;
                    self.$emit("setSelectWher",self.selectWhere);
                }
            }).catch(function(error){
                console.log(error);
                return;
            })
        },
        handleClick(row) {
            let self = this;
            self.loadingDetail = true;
            self.dialogTableVisible = true;
            self.gridData = [];
            requestGetWmsStockDetail({RepertoryId:row.repertoryId,MaterieId:row.materieId,
            ScanTime:self.selectWhere.SeachData,PageIndex:self.currentPage,PageSize:self.pageSize})
            .then(function(res){
                if(!res.hasErr)
                {
                    self.gridData = res.results;
                    self.loadingDetail = false;
                }
            }).catch(function(error){

            })
        }
    },
    mounted(){
        this.getRepertoryIdAndStorageTypeList();
        this.GetWmsStock();
    }
}
</script>

<style scoped>
#ContentDv2{
    width: 93%;
    height: 800px;
}
.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view{
   white-space: nowrap;
}
#tableStock{
    position: relative;
    overflow:auto;
    background: rgba(255,255,255,0);
}
#tableStock,.el-table th, .el-table tr {
    background-color:rgba(255, 255, 255, 0) !important;
    color: rgb(148, 142, 142);
}
/* 表格鼠标悬浮时的样式（高亮） */
#tableDetail .el-table--enable-row-hover .el-table__body tr:hover {
  background: rgb(255, 255, 255,0);
  border: 1px solid #313463;
}
/*表格鼠标悬停的样式（背景颜色）*/
#tableDetail .el-table tbody tr:hover > td {
  background-color: #001851 !important;
}

.el-button+.el-button {
    margin-left: 0px;
}
.export-excel-wrapper{
    float:right;
    position: relative;
    left: 0px;
}
#SelectDv2{
    margin-left: 15px;
}
.el-icon-arrow-right:before {
    font-size: 15px;
    /* color: white; */
    content: "\E6E0";
    /* background: white; */
}
.v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0 !important;
    background:rgba(255, 255, 255, 0) !important;
}

#tableDetail{
    max-height: 500px;
}
</style>