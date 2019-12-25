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
    <div class="type-class">
      <el-button v-for="item in videoList" @click="changeVideo(item)" type="success">
        {{item.videoSub}}
      </el-button>
    </div>
    <h4 class="h4-num">集 数</h4>
    <div class="btn-class">
      <el-button v-for="item in videoData" @click="videoPlay(item)" type="warning">
        第{{item.videoIndex}}集
      </el-button>
    </div>
  </div>

</template>

<script>
  import videoComp from '../../components/mobile/VideoComp_m'
  import axios from 'axios'
    export default {
      name: "videoView",
      components:{
        'video-comp':videoComp
      },
      data(){
        return{
          videoData:[],
          videoList:[],
          titleName:'庆余年',
          label:'第32集',
          time:new Date(),
          timer: null  // 定时器名称
        }
      },
      methods:{
        videoPlay(item){
          //http://101.132.137.213:8080/file/video/qyn/庆余年32集.mp4
          let url = 'http://101.132.137.213:8080/file/' + item.videoPath;

          this.$root.Bus.$emit('changeSrc',url);
          document.title = item.videoType;
          this.label = '第' + item.videoIndex + '集';
        },
        initData(){
          let url = '/apis/queryVideoData';
          axios.get(url)
            .then((res)=>{
              console.log(res)
              if (res.status === 200){
                this.videoList = res.data;
                this.videoData = this.videoList[0];
              }
            })
            .catch((error)=>{
              console.log(error);
            })
        },
        changeVideo(item){
          this.videoData = item.videos;
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
        this.timer = setInterval(() =>{
          this.time = this.getCurrentTime();
        }, 1000);
        this.initData();
      },
      beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
</script>

<style lang="scss">

</style>
