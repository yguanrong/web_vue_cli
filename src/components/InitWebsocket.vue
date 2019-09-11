<template>
    <div>
        <p>websocket</p>
      <p>{{msg}}</p>
    </div>
</template>

<script>
    export default {
        name: "InitWebsocket",
      data(){
          return{
            websocket:null,
            msg:''
          }
      },
      methods:{
          initWebSocket(){
            if ('WebSocket' in window){
              this.websocket = new WebSocket('ws://localhost:8088/websocket/20190911')
            }else {
              alert('not support websocket！')
            }
            this.websocket.onmessage = this.onMessage
          },
          onMessage(e){
            let message = JSON.parse(e.data);
            console.log(message)
          },
          onSendMsg(msg){
            this.websocket.send(msg);
          }
      },
      mounted() {
          this.initWebSocket()
      }
    }
</script>

<style scoped>

</style>
