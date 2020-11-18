<template>
    <div>
        <el-row type="flex">
            <el-col :sm="24" :xs="24" :xl="24" :lg="24" :md="24">
                    <el-container>
                        <el-col :xs="24" :xl="24" :md="24" :lg="4" :sm="24">
                            <el-aside width="100%" class="aside">
                                <div class="app-side-logo">
                                    <img src='../../../../static/logo.png'
                                        :width="isCollapse ? '60' : '60'"
                                        height="60" />
                                </div>
                                <div class="menuDiv">
                                    <el-menu default-active="2" default-openeds="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"  active-text-color="#ffd04b" collapse-transition="true">
                                        <el-menu-item index="1">
                                            <template slot="title">
                                              <i class="el-icon-location"></i>
                                              <span slot="title" @click="toIndexFun()">首页</span>
                                            </template>
                                        </el-menu-item>
                                        <el-submenu index="2">
                                          <template slot="title">
                                            <i class="el-icon-menu"></i>
                                            <span slot="title" @click="toKanbanFun()">WMS</span>
                                          </template>
                                          <!-- <el-menu-item-group :v-show="true">
                                            <el-menu-item index="2-1"><i class="el-icon-pie-chart">WMS主页</el-menu-item>
                                            <el-menu-item index="2-2"><i class="el-icon-pie-chart"></i>深圳仓库</el-menu-item>
                                          </el-menu-item-group> -->
                                        </el-submenu>
                                        <el-menu-item index="3">
                                            <i class="el-icon-document"></i>
                                            <span slot="title">导航三</span>
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
</template>


<script>
  export default {
    data() {
      return {
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
      toIndexFun()
      {
          let self = this;
          self.$router.push('/Index');      
      },
      toKanbanFun()
      {
          let self = this;
          self.$router.push('/Kanban');      
      },
    },
    created:function(){
    }
  }
</script>


<style scoped>
.header{
    height: 100px;
    background: blue;
}
.aside{
    height: 100%;
    width: 100%;
    border-right: white 1px solid;
    overflow: hidden;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
    height: 100%; 
  }
  .app-side-logo{
  background: rgba(4,49,128,0.9);
  
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
.app-side-logo{
  background: rgba(4,49,128,0.9);
  height: 60px;
  border: 1px  white block;
}
.app-header-userinfo {
  height: 60px;
  line-height: 60px;
  text-align: right;
  padding-right: 35px;
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
      background: rgba(4,49,128,.9);
  }
  .menuDiv{
    height: 100%;
    overflow: hidden;
  }
</style>>