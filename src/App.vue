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
      }
    },
    methods: {
      resize: function () {
        let contW = 1920 ;
        let contH = 1080 ;
        let cliWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let cliHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let w = cliWidth / contW;
        let h = cliHeight / contH;
        $("#app")
          .css("transform", "scale(" + w + "," + h + ")")
          .css("transformOrigin", "top left")
          .width(contW).height(contH)

        this.$root.eventBus.$emit('resize', {'w': w, 'h': h}); // 地图自适应，解决坐标异常问题
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
