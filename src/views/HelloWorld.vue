<template>
  <div style="height: 100%; width: 100%">
    <!--<init-websocket></init-websocket>-->
    <map-view></map-view>
  </div>

</template>

<script>
import mapView from '../components/MapView'
export default {
  name: 'HelloWorld',
  components:{
    // 'init-websocket': InitWebsoket
    'map-view': mapView
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
