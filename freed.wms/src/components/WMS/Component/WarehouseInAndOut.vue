<template>
    <div id="ContentDv">
        <!-- 查询搜索条件 -->
        <div id="SelectDv">
            所属仓位：<el-select v-model="selectWhere.RepertoryId" placeholder="请选择" style="width:170px">
                        <el-option
                        v-for="item in this.optionsRepertoryId"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
            出入库类型：<el-select v-model="selectWhere.StorageType" placeholder="请选择" style="width:170px">
                        <el-option
                        v-for="item in this.optionsStorageType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
            时间：<el-date-picker 
                    format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:230px"
                    v-model="selectWhere.SeachData"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
            单号：<el-input v-model="selectWhere.DeliveryNo" placeholder="请输入单据号" style="width:120px"></el-input>
            料号：<el-input v-model="selectWhere.MaterieId" placeholder="请输入物料编号" style="width:120px"></el-input>
            <el-button type="primary" @click="getWmsEntryAndExitGoods()">信息按钮</el-button>
            <!-- <el-button type="primary" :data = "tableData"><i class="el-icon-upload el-icon--right"></i></el-button> -->
            <download-excel
                class = "export-excel-wrapper"
                :data = "tableData"
                :fields="json_Tablefields"
                name = "出入库明细.xls">
                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                 <el-button type="primary"><i class="el-icon-download el-icon--right"></i></el-button>
            </download-excel>
        </div>
        <!-- <el-scrollbar style="width: 100%;height:750px"> -->
        <!-- 数据表格 -->
        <el-table
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            border
            height="760"
            :data="tableData"
            style="width: 100%;max-height:760px"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <!-- <el-table-column
            prop="id"
            label="ID"
            sortable
            width="80">
            </el-table-column> -->
            <el-table-column
            prop="deliveryNo"
            label="出入库单号"
            width="150">
            </el-table-column>
            <el-table-column
            prop="materieId"
            label="物料编号"
            width="200">
            </el-table-column>
            <el-table-column
            prop="repertoryId"
            label="仓位"
            width="180">
            </el-table-column>
            <el-table-column
            prop="storageName"
            label="储位名称"
            width="150">
            </el-table-column>
            <el-table-column
            prop="lotNumber"
            label="批次"
            width="180">
            </el-table-column>
            <el-table-column
            prop="qty"
            label="数量"
            width="80">
            </el-table-column>
            <el-table-column
            prop="staffNo"
            label="操作人"
            width="80">
            </el-table-column>
            <el-table-column
            prop="scanTime"
            label="操作时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="storageType"
            label="出入库类型"
            width="150">
            </el-table-column>
            <el-table-column
            prop="materialCode"
            label="物料二维码"
            width="200">
            </el-table-column>
            <el-table-column
            prop="storageTime"
            label="生产日期"
            width="150">
            </el-table-column>
            <el-table-column
            prop="validTime"
            label="有效日期"
            width="150">
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
    </div>
</template>

<script>
import {requestRepertoryIdAndStorageTypeList,requestGetWmsEntryAndExitGoods} from '../../../api/api'


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
            loading: true,
            total:1000,
            currentPage: 1,
　　　　　　 pageSize: 20,
            optionsStorageType:[],
            optionsRepertoryId:[],
            tableData:[],//出入库明细集合
            json_Tablefields:{ //Excel导出表头
                "出入库单号":"deliveryNo",
                "物料编号":"materieId",
                "仓位":"repertoryId",
                "储位名称":"storageName",
                "批次":"lotNumber",
                "数量":"qty",
                "操作人":"staffNo",
                "操作时间":"scanTime",
                "出入库类型":"storageType",
                "物料二维码":"materialCode",
                "生产日期":"storageTime",
                "有效日期":"validTime"
            }
        }
    },
    methods:{
        formatterFun(row, column) {
        return row.address;
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.getWmsEntryAndExitGoods();
            //this.fetchData(1, val);
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getWmsEntryAndExitGoods();
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
        //获取出入库明细
        getWmsEntryAndExitGoods()
        {
            let self = this;
            self.loading = true;
            console.log(self.selectWhere.StartScanTime);
            requestGetWmsEntryAndExitGoods({RepertoryId:self.selectWhere.RepertoryId,StorageType:self.selectWhere.StorageType,
            DeliveryNo:self.selectWhere.DeliveryNo,MaterieId:self.selectWhere.MaterieId,
            ScanTime:self.selectWhere.SeachData,PageIndex:self.currentPage,PageSize:self.pageSize}).then(function(res){
                if(!res.hasErr)
                {
                    self.tableData = res.results;
                    self.total = res.pageModel.totalCount;
                    self.loading = false;
                }
            }).catch(function(error){
                console.log(error);
            })
        },
        reportExcel(){
            window.open();
        }
    },
    mounted(){
        this.getRepertoryIdAndStorageTypeList();
        this.getWmsEntryAndExitGoods();
    }
}
</script>

<style>
#ContentDv{
    widows: 100%;
    height: 800px;
}
.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view{
   white-space: nowrap;
}
.el-table{
    position: relative;
    overflow:auto;
    background: rgba(255,255,255,0);
}
.el-table th, .el-table tr {
    background-color:rgba(255, 255, 255, 0);
    color: white;
}
/* 表格鼠标悬浮时的样式（高亮） */
.el-table--enable-row-hover .el-table__body tr:hover {
  background: rgb(255, 255, 255,0);
  border: 1px solid #313463;
}
/*表格鼠标悬停的样式（背景颜色）*/
.el-table tbody tr:hover > td {
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
</style>