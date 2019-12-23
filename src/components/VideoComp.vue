<template>
  <div class="VideoContent">
      <video id="myVideo" style="width: 100%" :poster="img" autoplay controls>
        <source id="mysource" src="" type="video/mp4">
      </video>
  </div>
</template>

<script>
  import jq from 'jquery'
  export default {
    name: "ZNVVideo",
    data() {
      return {
        videoLink: '',
        img:require('../assets/bg.jpg'),
      }
    },
    methods: {
      videoPlay(url) {

        jq('#mysource').attr('src',url)
        // video.load();
        // video.play();
        // jq('#myVideo').play()
      }
    },
    mounted(){
      let self = this;
      this.$root.Bus.$on('changeSrc',(url)=>{
        // self.videoLink = url
        self.videoPlay(url);
      })
    }
  }
</script>

<style lang="scss">
  .VideoContent {
    width: 100%;
    height: 100%;
  }
</style>
