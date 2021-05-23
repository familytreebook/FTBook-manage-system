<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">FamilyTreeBook</div>         
                <div class="login-btn">
                      <div>
                            <p class="login-tips">GitHub登录</p>
                            <h1 v-show="!islogin">尚未登录</h1>
                            <button @click="login" v-show="!islogin"  style="cursor:pointer">登录</button>
                            <h1 v-show="islogin">已登录</h1>
                        </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            islogin: false,
            param: {
                username: 'admin',
                password: '123123',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        checkLogin:function(){
            this.islogin = this.$login.checkLogin(this);
            return this.islogin;
        },
        login:function(){
            this.$login.login(this);
        },
        successCallback:function(){
            this.checkLogin();
            this.$message.success('登录成功');
            this.$router.push('/dashboard');
        },
        errorCallback:function(){
            this.checkLogin();
        },
        getToken:function(){
            this.$login.getToken(this,this.successCallback,this.errorCallback);
        }
        // ,
        // logout:function () {
        //     this.$login.logout(this,"http://localhost:8080"+"/");
        // }
    },
    mounted:function () {
        console.log("mounted")
        
        if(!this.checkLogin()){
            this.getToken();
        }else{
            this.successCallback();
        }
        
        
        console.log(this.islogin)
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>