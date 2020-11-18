<template>
  <div id="data-view" class="data-view">
    <div id="menuDv">
       <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        direction="ltr"
        :with-header="false" 
        size="20%">
        <NavMenu style="width:100%;"/>
        <span>我来啦!</span>
        </el-drawer> 
    </div>
    <dv-full-screen-container id="dv-full-screen-container">
        <dv-border-box-11 title="WMS系统数据管理平台">
            <div id="dateDV">
                <div id="dleftDv">
                    <button @click="toHomePageFun()" id=CloseBt><i class="el-icon-menu"></i></button><label style="margin-left:10px">{{nowDate}}</label>
                </div>
                <div id="drightDv">
                    当前登陆：<label style="margin-right:10px">{{loginName}}</label>||<label style="margin-left:10px">{{repertotyName}}</label> <button @click="eixtOn()" id=CloseBt><i class="el-icon-close"></i></button>
                </div>
            </div>
            <!-- 左边 -->
            <div id="leftDv">
                <dv-border-box-3 style="width: calc(100% - 80px);;height:calc(100% - 80px);">
                    <InStrorageGoodType style="width:calc(100% - 80px);margin-left:30px;  padding-top: 30px;"/>
                    <InStrorage style="width:calc(100% - 80px);margin-left:30px;"/>
                    <OutStrorageGoodType style="width:calc(100% - 80px);margin-left:30px;"/>
                    <OutStrorage style="width:calc(100% - 80px);margin-left:30px;"/>
                </dv-border-box-3>
            </div>
            <!--中间-->
            <div id="contentDv">
                <dv-border-box-3 style="width: calc(100% - 80px);;height:calc(100% - 80px);">
                    <InfoOverview/>
                </dv-border-box-3>
            </div>
            <!--右边-->
            <div id="rightDv">
                <dv-border-box-3 style="width: calc(100% - 80px);;height:calc(45% - 5px);">
                    <ServerGood style="width:calc(100% - 60px);margin-left:30px; padding-top: 28px;"/>
                </dv-border-box-3>

                <dv-border-box-4 style="width: calc(100% - 80px);;height:calc(45% - 5px);" :reverse="true">
                    <ServerMaterial style="width:calc(100% - 60px);margin-left:30px; padding-top: 28px;"/>
                </dv-border-box-4>
            </div>
            <!--底部-->
            <div id="ButtonDv">
                <dv-border-box-4 style="width: calc(100% - 80px);;height:calc(45% - 5px);">
                    <InventoryStatistics style="width: calc(100% - 80px);height:calc(90% - 80px);padding-top: 25px;padding-left: 25px;"/>
                </dv-border-box-4>
            </div>
        </dv-border-box-11>
    </dv-full-screen-container>
  </div>
</template>

<script>

import InStrorage from '../WMS/Component/InStrorageGood'
import OutStrorage from '../WMS/Component/OutStrorageGood'
import ServerGood from '../WMS/Component/ServerInAndOutGood'
import ServerMaterial from '../WMS/Component/ServerDayMaterial'
import InStrorageGoodType from '../WMS/Component/InStrorageGoodType'
import OutStrorageGoodType from '../WMS/Component/OutStrorageGoodType'
import InfoOverview from '../WMS/Component/InfoOverview'
import InventoryStatistics from '../WMS/Component/InventoryStatistics'
import Cmp from '../WMS/CenterCmp'
import store from '../../store/index'
import NavMenu from '../WMS/Component/NavMenuCompnents'

export default {
    name: 'DataView',
    components: {
    Cmp,
    InStrorage,
    OutStrorage,
    ServerGood,
    ServerMaterial,
    InStrorageGoodType,
    OutStrorageGoodType,
    InfoOverview,
    InventoryStatistics,
    NavMenu
  },
  data () {
    return {
        loginName:"",
        nowDate: "", // 当前日期
        repertotyName:"",
        drawer: false,
    }
  },
  methods:{
    eixtOn()
    {
        let left = this;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('loginName'); 
        window.localStorage.removeItem('repertotyName'); 
        store.commit('set_token',null)
        left.$router.push('/');
    },
    currentTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = `${year}-${month}-${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
    },
    toHomePageFun()
    {
        let self = this;
        self.$router.push('/Home');      
    }
  },
  mounted(){
      this.loginName = window.localStorage.getItem('loginName');
      this.repertotyName = window.localStorage.getItem('repertotyName');
      this.currentTime();
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>



<style scoped>
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;
}
#dv-full-screen-container
{
    background: url('/static/bg.png') center center no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
}
#leftDv{
    width: 30%;
    height: 100%;
    position: fixed;
    left: 20px;
    top: 60px;
}

#contentDv{
    width: 50%;
    height: 70%;
    position: fixed;
    left: 27%;
    top: 60px;
    
}
#rightDv{
    width: 30%;
    height: 70%;
    position: fixed;
    top: 60px;
    left: 73%;
}
#ButtonDv{
    width: 76%;
    height: 65%;
    position: fixed;
    top: 69%;
    left: 27%;
}
#dateDV{
    height: 28px;
    width: 100%;
    color: #08E5FF;
}
p {
    display:block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

element.style {
    margin: 0px;
}
#dleftDv{
    width: 300px;
    float: left;
    left: 200px;
    padding-top: 5px;
}
#drightDv{
    width: 500px;
    float: right;
    margin-left: 200px;
    padding-top: 5px;
}
.el-button--primary {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    width: 15px;
    height: 15px;
}
.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: transparent !important;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    /* padding-right: 0px 10px; */
    font-size: 14px;
    border-radius: 4px;
}
#CloseBt{
    background:transparent !important;
    color: #08E5FF;
}
#menuDv{
    width: 100px;
}


@keyframes glow {
	0% {
	background-position:40% center;
}
100% {
	background-position:50% center;
	box-shadow:1px 1px 3px rgba(4,100,100,1),inset 0 0 3px rgba(4,191,255,1),2px 2px 3px #aaa;
}
}button {
    height: 25px;
	color:#fff;
	text-shadow:0 3px 1px 2px;
	outline:0;
	border:0;
	/* background:url(http://www.jq22.com/img/cs/500x300-1.png) no-repeat; */
	background-position:center;
	background-size:150%;
	font-size:12px;
	padding:10px 20px;
	border-radius:4px;
	animation:glow 800ms ease-out infinite alternate;
}
</style>