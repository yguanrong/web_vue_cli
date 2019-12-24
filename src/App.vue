<template>
  <div class="app" id="app">
    <router-view/>
  </div>
</template>

<script>
  import $ from "jquery";

  export default {
    name: "App",
    components: {},
    mounted() {
      this.resize();
      // 防抖
      let resizeTag = true;
      window.onresize = () => {
        return (() => {
          if (resizeTag) {
            this.resize()
            resizeTag = false
            setTimeout(() => {
              resizeTag = true
            }, 100)
          }
        })()
      };
      let self = this;
      this.$root.Bus.$on('busResize',()=>{
        self.resize();
        if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
          require('./common/style/index.scss');
          console.log('is pc')
        }else{
          require('./common/style/mobile.scss');
          console.log('is phone')
        }
      })
    },
    methods: {
      resize: function () {
        let contW = 1920 ;
        let contH = 1080 ;
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
          contW = 1080;
          contH = 2340;
        }
        let cliWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let cliHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let w = cliWidth / contW;
        let h = cliHeight / contH;
        $("#app")
          .css("transform", "scale(" + w + "," + h + ")")
          .css("transformOrigin", "top left")
          .width(contW).height(contH)

        this.$root.Bus.$emit('resize', {'w': w, 'h': h}); // 地图自适应，解决坐标异常问题
      },
    },
    created() {
      if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        require('./common/style/index.scss');
        console.log('is pc')
      }else{
        require('./common/style/mobile.scss');
        console.log('is phone')
      }
    }
  };
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    background-color: #162469;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
  }
</style>
