<template>
    <div id="data-view" class="data-view">
    <!-- 左侧菜单 -->
    <div id="menuDv">
       <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        direction="ltr"
        :with-header="false" 
        size="20%">
          <div>
            <el-row type="flex">
                <el-col :sm="24" :xs="24" :xl="24" :lg="24" :md="24">
                        <el-container>
                            <el-col :xs="24" :xl="24" :md="24" :lg="4" :sm="24">
                                <el-aside width="100%" class="aside">
                                    <div class="app-side-logo">
                                        <img src='../../../static/logo.png'
                                            :width="isCollapse ? '60' : '60'"
                                            height="60" />
                                    </div>
                                    <div class="menuDiv">
                                        <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"  active-text-color="#ffd04b">
                                            <el-menu-item index="1">
                                                <template slot="title">
                                                  <i class="el-icon-location"></i>
                                                  <span slot="title"><router-link to="/Index">首页</router-link></span>
                                                </template>
                                            </el-menu-item>
                                            <el-submenu index="2">
                                              <template slot="title">
                                                <i class="el-icon-menu"></i>
                                                <span slot="title">WMS报表查询</span>
                                              </template>
                                              <el-menu-item-group :v-show="true">
                                                <el-menu-item index="2-1"><i class="el-icon-pie-chart"></i><router-link to="/WarehouseInAndOut">出入库明细</router-link></el-menu-item>
                                                <el-menu-item index="2-2"><i class="el-icon-pie-chart"></i><router-link to="/WmsStockPage">库存查询</router-link></el-menu-item>
                                              </el-menu-item-group>
                                            </el-submenu>
                                            <el-menu-item index="3">
                                                <i class="el-icon-document"></i>
                                                <span slot="title"><router-link to="/Kanban">仓库总览</router-link></span>
                                            </el-menu-item>
                                            <el-menu-item index="4">
                                                <i class="el-icon-setting"></i>
                                                <span slot="title">导航四</span>
                                            </el-menu-item>
                                        </el-menu>
                                    </div>
                                </el-aside>
                            </el-col>
                        </el-container>
                </el-col>
            </el-row>
        </div>
        </el-drawer> 
    </div>

    <!-- ---------内容部分------------ -->
    <dv-full-screen-container id="dv-full-screen-container">
        <dv-border-box-13>
          <el-row type="flex">
            <el-col :sm="24" :xs="24" :xl="24" :lg="24" :md="24">
              <el-container>
                  <el-col :xs="24" :xl="24" :md="24" :lg="24" :sm="24">
                    <!-- 头部信息 -->
                      <el-header class="app-header" >
                        <!-- 导航菜单按钮 -->
                        <div id="menuDv">
                          <button @click="drawer = true" id=CloseBt><i class="el-icon-menu"></i></button>
                        </div>

                        <!-- 装饰 -->
                        <div id="ZSDv1">
                          <dv-decoration-8 style="width:300px;height:55px;"/>
                        </div>
                        <div id="ZSDv2">
                          <label>WMS系统信息管理平台</label>
                          <dv-decoration-5 style="width:400px;height:70px;"/>
                        </div>
                        <div id="ZSDv3">
                          <dv-decoration-8 :reverse="true" style="width:300px;height:55px;"/>
                        </div>

                        <!-- 用户信息 -->
                        <div class="app-header-userinfo">
                            <el-dropdown trigger="hover" :hide-on-click="false">
                            <span class="el-dropdown-link userinfo-inner"><el-image src="../../../static/logo.png"  class="heardImge">
                            <dv-decoration-8 :reverse="true" style="width:300px;"/>
                            </el-image> {{ loginName }}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>我的消息</el-dropdown-item>
                                <el-dropdown-item>设置</el-dropdown-item>
                                <el-dropdown-item divided @click.native="eixtOnFun">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown> 
                        </div>
                        <dv-decoration-10  style="width:100%;height:5px;" />
                      </el-header>

                      <!-- 中间内容 -->
                      <el-main  class="app-body">
                          <template>
                              <router-view/>
                          </template>
                      </el-main>
                  </el-col>
              </el-container>
            </el-col>
        </el-row>
        </dv-border-box-13>
      </dv-full-screen-container>
    </div>
</template>


<script>
import NavMenu from '../WMS/Component/NavMenuCompnents'
import store from '../../store/index'
  export default {
    components: {
    NavMenu
    },
    data() {
      return {
        drawer: false,
        loginName: '',
        isCollapse: false,
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    eixtOnFun()
    {
        let left = this;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('loginName'); 
        window.localStorage.removeItem('repertotyName'); 
        store.commit('set_token',null)
        left.$router.push('/');
    },
    },
    mounted(){
      this.loginName = window.localStorage.getItem('loginName');
    },
    created:function(){
      this.$router.push('/Kanban');
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
.container .main aside .el-menu[data-v-57bf35f5] {
    height: 100%;
}
.el-dropdown{
  color: white;
}
.container .main aside .el-menu[data-v-57bf35f5] {
    height: 100%;
}
.app-header-userinfo {
  height: 60px;
  line-height: 60px;
  text-align: right;
  padding-right: 10px;
  /* background: lightcoral; */
}
.userinfo-inner {
  cursor: pointer;
  color:#fff;
}
.heardImge {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
  .app-header{
      background: rgba(4,49,128,0.3);
      margin-top: 13px;
      margin-left: 10px;
      text-align: center;
      width: calc(100% - 20px);
  }
  #CloseBt{
    background:transparent !important;
    color: #08E5FF;
    height: 45px;
    width: 80px;
    font-size: 30px;
}
@keyframes glow {
	0% {
	background-position:40% center;
}
100% {
	background-position:50% center;
	box-shadow:1px 1px 3px rgba(4,100,100,1),inset 0 0 3px rgba(4,191,255,1),2px 2px 3px #aaa;
}}
button {
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
#menuDv{
  height: 60px;
  width: 80px;
  float: left;
  line-height: 80px;
}

#ZSDv1{
  width: 300px;
  height: 60px;
  float: left;
  margin-left: 250px;
}

#ZSDv2{
  width: 400px;
  height: 60px;
  float: left;
  text-align:center;
  margin: 0px 100px 0px 100px;
}
#ZSDv2 label{
  position: fixed;
  top: 20px;
  left: 875px;
}

#ZSDv3{
  width: 300px;
  height: 60px;
  float: left;
}
</style>