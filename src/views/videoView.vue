<template>
  <div class="video-view">
    <div class="title-class">
      <el-row>
        <el-col :span="4">
          <h3 class="h-text">{{label}}</h3>
        </el-col>
        <el-col :span="16">
          <h3 class="h-text">{{titleName}}</h3>
        </el-col>
        <el-col :span="4">
          <h3 class="h-text">11:24</h3>
        </el-col>
      </el-row>
      <hr class="line">
    </div>
    <video-comp ref="videoComponent" class="video-class"></video-comp>
    <div class="btn-class">
      <el-button v-for="item in videoData" @click="videoPlay(item.label)" type="warning">
        {{item.label}}
      </el-button>
    </div>
  </div>

</template>

<script>
  import videoComp from '../components/VideoComp'

    export default {
      name: "videoView",
      components:{
        'video-comp':videoComp
      },
      data(){
        return{
          videoData:[
            {num:1,label:'第32集'},
            {num:2,label:'第33集'},
            {num:3,label:'第34集'},
            {num:4,label:'第35集'},
            {num:5,label:'第36集'},
            {num:6,label:'第37集'},

          ],
          titleName:'庆余年',
          label:'第1集'
        }
      },
      methods:{
        videoPlay(label){
          let url = 'http://101.132.137.213:8080/video/' + this.titleName + label;
          this.$root.Bus.$emit('changeSrc',url);
        },

      }
    }
</script>

<style lang="scss">
  .video-view{
    width: 100%;
    height: 95%;

    .title-class{
      width: 100%;
      height: 8%;

      .line{
        text-align: center;
        width: 95%;
        height: 1px;
        background-image: linear-gradient(to right, greenYellow,red, #fefff6);
      }
      .h-text{
        text-align: center;color: white;font-size: 25px
      }
      h3 {
        margin-block-end: 0em;
      }
    }
    .video-class{
      width: 50%;
      height: 60%;
      margin: 20px 25%;
    }
    .btn-class{
      width: 50%;
      text-align: left;
      height: 30%;
      margin: 10px 25%;
      padding-left: 10px;
      font-size: 30px;

      .el-button{
        font-size: 22px;
        margin:10px;
      }
    }
  }
</style>
