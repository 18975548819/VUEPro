<template>
    <div id="lgDV" class="lgDV">
        <dv-full-screen-container>
            <div id="lgOnDV" class="lgOnDV">
                <dv-border-box-11 title="WMS数据平台" style="width:1100px;height:500px;">
                    <!-- 登录信息 -->
                    <div id="infoDV" class="infoDV">
                        <dv-border-box-1 style="width:600px;height:400px;left:450px;top:70px">
                            <dv-border-box-10 style="width: calc(100% - 30px);;height:calc(100% - 30px);left:15px;top:15px;">
                                <div id="fromDV">
                                    <el-form ref="form" :model="form" label-width="80px">
                                        <el-form-item label="登录账户">
                                            <el-input v-model="form.name" placeholder="请输入登录用户名"></el-input>
                                        </el-form-item>
                                        <el-form-item label="登录密码">
                                            <el-input type="password" v-model="form.pwd" placeholder="请输入登录密码"></el-input>
                                        </el-form-item>
                                        <el-form-item label="登录组织">
                                            <el-select v-model="form.typeNo" @change="getRepertoty(form.typeNo)" placeholder="请选择登录组织" style="width:100%;">
                                                <el-option 
                                                    v-for="item in form.configList" 
                                                    :key="item.groupType" 
                                                    :label="item.groupName" 
                                                    :value="item.groupType">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="登录仓位">
                                            <el-select v-model="form.repertoty"  placeholder="请选择登录仓位" style="width:100%;">
                                                <el-option 
                                                    v-for="item in form.repertotyList" 
                                                    :key="item.repertoryId" 
                                                    :label="item.repertoryName" 
                                                    :value="item.repertoryId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item style="width:100%;">
                                            <el-button type="primary" style="width:50%;background:#151C64" @click="loginOn">登陆</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </dv-border-box-10>
                        </dv-border-box-1>
                    </div>

                    <!-- 动态转盘 -->
                    <dv-decoration-9 style="width:300px;height:300px;top:120px;left:50px;"><label style="font-size:20px;color:white;">WMS</label></dv-decoration-9>
                </dv-border-box-11>
            </div>
        </dv-full-screen-container>
    </div>
</template>


<script>
import axios from 'axios';
import store from '../../store/index'
import {requestCofig,requestGetRepertoty,requestLoginOn} from '../../api/api';
  export default {
    data() {
      return {
        form: {
          name: '',
          pwd:'',
          typeNo: '',
          repertoty:'',
          configList:[],
          repertotyList:[],
        },
        isRefresh:true
      }
    },
    //监听
    // watch:{
    //     'form.typeNo':function(newValues){
    //         console.log(newValues);
    //     }
    // },
    methods: {
        //获取登陆组织信息集合
        getConfigInfo()
        {
            let self = this;
            requestCofig().then(function(res){
                if(!res.hasErr && res.code>= 0)
                {
                    self.form.configList = res.results;
                }
            }).catch(function(error){
                console.log(error);
            });      
        },
        //根据选择的登陆组织获取其对应的登陆仓位
        getRepertoty(val)
        {
            let self = this;
            requestGetRepertoty({GroupType:val,PageIndex:1,PageSize:1000})
            .then(function(res){
                if(!res.hasErr && res.code >= 0)
                {
                    self.form.repertoty = null;
                    self.form.repertotyList = res.results;
                }
                else
                {
                    alert(res.msg);                    
                }

            }).catch(function(error){
                console.log(error);
            })   
        },
        //登陆
        loginOn()
        {
            let self = this;
            if(self.form.name == "" || self.form.name == null)
            {
                self.$message({message: "请输入用户名！",type: 'error'});  
                return;           
            }
            if(self.form.pwd == "" || self.form.pwd == null)
            {
                self.$message({message: "请输入密码！",type: 'error'});
                return;                    
            }
            if(self.form.typeNo == "" || self.form.typeNo == null)
            {
                self.$message({message: "请选择登陆组织！",type: 'error'});   
                return;          
            }
            if(self.form.repertoty == "" || self.form.repertoty == null)
            {
                self.$message({message: "请选择登陆仓位！",type: 'error'});   
                return;          
            }
            requestLoginOn({LoginName:self.form.name,Password:self.form.pwd,GroupType:self.form.typeNo,WmsRepertory:self.form.repertoty})
            .then(function(res){
                debugger
                if(!res.hasErr && res.code >= 0)
                {
                    self.$notify({
                    title: '成功',
                    message: 'WMS数据看板登陆成功！',
                    type: 'success',
                    duration:2000
                    });
                    store.commit("set_token", res.data);
                    self.$router.push('/Home');
                    window.localStorage.setItem('token',res.data);
                    window.localStorage.setItem('loginName',self.form.name);
                    window.localStorage.setItem('repertotyName',self.form.repertoty);
                }
                else
                {
                    self.$message({message: res.msg,type: 'error'});
                }

            }).catch(function(error){
                console.log(error);
            })
        },
        keyDown(e){
        //如果是回车则执行登录方法
            if(e.keyCode == 13){
                this.loginOn();
            }
        }
    },
    mounted(){
        //绑定事件
        window.addEventListener('keydown',this.keyDown);
        this.getConfigInfo();
    },
    created:function(){
    },
    destroyed(){
        window.removeEventListener('keydown',this.keyDown,false);
    }
  }
</script>


<style>
#lgDV{
    width: 100%;
    height: 100%;
}
#dv-full-screen-container
{
    background: url('/static/bg2.png') center center no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
}
#lgOnDV{
    width: 1100px;
    height: 500px;
    position: fixed;
    margin-top: 200px;
    margin-left: 450px;
}
#infoDV{
    position: fixed;

}
#fromDV{
    padding-top: 40px;
}
.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 16px !important;
    color: #fff !important;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

  .el-input__inner {
      background-color: transparent !important;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #fff !important;
      /* font-size: inherit; */
      font-size: 16px !important;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 90%;
  }


  .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
span{
    font-size: 14px !important;
}
</style>