<template>
  <div class="video-view">
    <div class="title-class">
      <el-row>
        <el-col :span="8">
          <h3 class="l-text">{{label}}</h3>
        </el-col>
        <el-col :span="8">
          <h3 class="h-text">{{titleName}}</h3>
        </el-col>
        <el-col :span="8">
          <h3 class="r-text">{{time}}</h3>
        </el-col>
      </el-row>
      <hr class="line">
    </div>
    <video-comp ref="videoComponent" class="video-class"></video-comp>
    <h4 class="h4-num">集 数</h4>
    <div class="btn-class">
      <el-button v-for="item in videoData" @click="videoPlay(item)" type="warning">
        {{item.label}}
      </el-button>
    </div>
  </div>

</template>

<script>
  import videoComp from '../../components/mobile/VideoComp_m'
    export default {
      name: "videoView",
      components:{
        'video-comp':videoComp
      },
      data(){
        return{
          videoData:[
            {num:32,label:'第32集'},
            {num:33,label:'第33集'},
            {num:34,label:'第34集'},
            {num:35,label:'第35集'},
            {num:36,label:'第36集'},
            {num:37,label:'第37集'},
            {num:38,label:'第38集'},
            {num:39,label:'第39集'},
            {num:40,label:'第40集'},
            {num:41,label:'第41集'},
            {num:42,label:'第42集'},
            {num:43,label:'第43集'},
            {num:44,label:'第44集'},
            {num:45,label:'第45集'},
            {num:46,label:'第46集'},
            {num:1,label:'第hp集'},
          ],
          titleName:'庆余年',
          label:'第32集',
          time:new Date(),
          timer: null  // 定时器名称
        }
      },
      methods:{
        videoPlay(item){
          //http://101.132.137.213:8080/file/video/qyn/庆余年32集.mp4
          let url = 'http://101.132.137.213:8080/file/video/qyn/' + this.titleName + item.num+'.mp4';
          if (item.label.indexOf('hp')) {
            url = 'http://101.132.137.213:8080/file/video/hp/hp' + item.num+'.mp4';
          }
          this.$root.Bus.$emit('changeSrc',url);
          document.title = item.label;
          this.label = item.label;
        },
        //时间函数
        getCurrentTime(){
          let str='';
          let date = new Date();
          let hh = '';
          let mm = '';
          let ss = '';
          if (date.getHours()>=10){
            hh = date.getHours()+'';
          } else {
            hh = '0'+date.getHours();
          }
          if (date.getMinutes()>=10){
            mm = date.getMinutes()+'';
          } else {
            mm = '0'+date.getMinutes();
          }
          if (date.getSeconds()>=10){
            ss = date.getSeconds()+'';
          } else {
            ss = '0'+date.getSeconds();
          }
          str = hh+':'+mm+':'+ss;
          return str;
        },
      },
      mounted() {
        this.time = setInterval(() =>{
          this.time = this.getCurrentTime();
        }, 1000);
      },
      beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
</script>

<style lang="scss">
  .el-button{
    font-size: 40px;
    margin:10px;
  }
</style>
