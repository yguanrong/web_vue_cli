<template>
    <el-row>
      <el-button @click="queryData">点击</el-button>
    </el-row>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "test",
      data(){
          return{

        }
      },
      methods:{
          queryData(){
            let url = '/queryData?id=1';
            axios.get('/apis'+url)
              .then((res)=>{
                console.log(res);
              })
              .catch((error)=>{
                console.log(error)
              })
          }
      }
    }
</script>

<style scoped>

</style>
