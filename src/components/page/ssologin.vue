<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'ssologin',
  data () {
    return {
      state:"",
      code:"",
    }
  },
  methods:{
    getToken:function(){
      this.$token.getTokenFromService(this,this.code,(response)=>{
        debugger;
        this.$token.savetoken(response.data);
        console.log(response.data);
        this.$router.push('/');
      },function (error) {
        alert(error);
      });
    }
  },
  mounted:function () {
    this.code = this.$route.query.code;
    this.state = this.$route.query.state;
    if(!this.code){
        return;
    }
    this.getToken();
  }
}
</script>

<style>
</style>

