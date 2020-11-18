import axios from 'axios'
import url from 'postcss-url'

//let base = 'http://10.0.40.68:5088/v1/api/';  //Linx服务器接口地址
let base = 'http://localhost:5088/v1/api/';  //本地接口地址

//#region 登陆界面接口
// 获取配置信息
export const requestCofig= (data,url)=>{ return  axios({url: base + 'Account/get_wms_pda_config', method: 'get', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//获取仓位信息
export const requestGetRepertoty= (data,url)=>{ return  axios({url: base + 'Account/get_wms_pda_repertoty', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//登陆接口
export const requestLoginOn= (data,url)=>{ return  axios({url: base + 'Account/login', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};
//#endregion


//#region 入库
//当天物料入库（动态图表）
export const requestInStroageInfo= (data,url)=>{ return  axios({url: base + 'InStorageGoods/get_InStorageGoodsInfo_DvScrollBoard', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//近七天入库
export const requestServerGoods= (data,url)=>{ return  axios({url: base + 'InStorageGoods/get_InStorageGoodsInfo_ServerData', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//当天入库（动态环图）
export const requestInStroageInfoDvActiveRingChart= (data,url)=>{ return  axios({url: base + 'InStorageGoods/get_InStorageGoodsInfo_DvActiveRingChart', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};
//#endregion


//#region 出库
//动态图表
export const requestOutStroageInfo= (data,url)=>{ return  axios({url: base + 'OutStorageGoods/get_OutStorageGoodsInfo_DvScrollBoard', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};
//动态环图
export const requestOutStroageInfoDvActiveRingChart= (data,url)=>{ return  axios({url: base + 'OutStorageGoods/get_OutStorageGoodsInfo_DvActiveRingChart', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};
//#endregion

//近七天单据出入库
export const requestMaterialInfo= (data,url)=>{ return  axios({url: base + 'StorageMaterial/get_StorageMaterialInfo', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//获取储位信息
export const requestGetStorage= (data,url)=>{ return  axios({url: base + 'WmsBasicInfo/get_wms_storage', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//获取各仓位物料数量
export const requestGetEchartsPie= (data,url)=>{ return  axios({url: base + 'WmsBasicInfo/get_EchartsPieData', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//获取当前登录仓库物料库存前100的物料库存数量
export const requestDvScrollRankingBoard= (data,url)=>{ return  axios({url: base + 'WmsBasicInfo/get_EchartsPieDataKC', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//获取仓位信息个出入库类型（出入库明细查询条件）
export const requestRepertoryIdAndStorageTypeList= (data,url)=>{ return  axios({url: base + 'WmsBasicInfo/get_RepertoryIdAndStorageTypeList', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//出入库明细报表查询
export const requestGetWmsEntryAndExitGoods= (data,url)=>{ return  axios({url: base + 'ReportQuery/get_WmsEntryAndExitGoods', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};

//近七天仓库库存趋势变化
export const requestServerDayInAndOutWarehouseTrends= (data,url)=>{ return  axios({url: base + 'WmsBasicInfo/get_ServerDayInAndOutWarehouseTrends', method: 'post', data: data,headers: {'Content-Type':'application/json'}}).then(res=> res.data)};


