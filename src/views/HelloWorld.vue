<template>
  <div style="height: 100%; width: 100%">
    <init-websocket></init-websocket>
  </div>

</template>

<script>
  import InitWebsoket from '../components/InitWebsocket'
export default {
  name: 'HelloWorld',
  components:{
    'init-websocket': InitWebsoket
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
