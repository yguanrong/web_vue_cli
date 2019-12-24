<template>
  <div class="VideoContent">
      <video id="myVideo" width="960" height="610" :poster="img" autoplay controls>
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
        let video = jq('#myVideo')[0];
        video.src = url;
        video.load();
        video.play();
      }
    },
    mounted(){
      let self = this;
      this.$root.Bus.$on('changeSrc',(url)=>{
        self.videoPlay(url);
      })
    }
  }
</script>

<style lang="scss">
  .VideoContent {
    width: 100%;
    height: 100%;
    border: 1px solid darkcyan;
    background: black;
  }
</style>
