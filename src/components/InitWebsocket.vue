<template>
    <div style="height: 100%; width: 100%">
        <el-row style="height: 100%; width: 100%">
          <div class="mainDiv">
            <el-row style="text-align: center">
              <el-col :span="7" style="margin-left: 10px;margin-top: 10px;font-size: 16px">
                <el-col :span="10"><el-input v-model="sendId" placeholder="发送人的id"></el-input></el-col>
                <el-col :span="10"><el-button  @click="conn()" type="success">登录链接</el-button></el-col>
              </el-col>
              <el-col :span="5">
                <h3 style="color: white">聊天室--{{receiverId}}</h3>
              </el-col>
              <el-col style="margin-top: 10px" :span="8">
                <el-select v-model="receiverId" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="text-box" id="text_box">
            </el-row>
            <el-row style="text-align: center">
              <el-col :span="18">
                <el-input v-model="msg" placeholder="请输入内容" class="input-box"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary"
                           @click="sendData()"
                           style="margin-top: 10px; margin-left:30px;width: 100%">发送</el-button>
              </el-col>
            </el-row>
          </div>
        </el-row>
    </div>
</template>

<script>
import $ from 'jquery'
    export default {
        name: "InitWebsocket",
      components:{
      },
      data(){
          return{
            websocket:null,
            msg:'',
            receiverId:'',
            sendId:'444',
            options:[
              {value:'1111',label:'小明'},
              {value:'2222',label:'小王'},
              {value:'3333',label:'小张'}
            ],
            sendTemp:'<div class="el-row"><p style="color: blue;margin-right: 20px;float: right;font-size: 20px;">',
            endTemp:'</p></div>',
            receiverTemp:'<div class="el-row"><p style="color: white;margin-left: 20px;float: left;font-size: 20px;">'
          }
      },
      methods:{
        initWebSocket(){
          if ('WebSocket' in window){
            this.websocket = new WebSocket('ws://localhost:8088/websocket/'+this.sendId)
          }else {
            alert('not support websocket！')
          }
          this.websocket.onmessage = this.onMessage
        },
        onMessage(e){
          let message = JSON.parse(e.data);
          console.log(message);
          this.receiverData(message.data)
        },
        onSendMsg(msg){
          this.websocket.send(msg);
        },
        sendData(){
          let text_box = $('#text_box');
          text_box.append(this.sendTemp+this.msg+this.endTemp);
          let message = {
            type:0,
            sendId:this.sendId,
            receiverId:this.receiverId,
            data:this.msg
          };
          this.onSendMsg(JSON.stringify(message));
          this.msg = ''
        },
        receiverData(msg){
          let text_box = $('#text_box');
          text_box.append(this.receiverTemp+ msg +this.endTemp);
        },
        conn(){
          this.initWebSocket()
        }

      },
      mounted() {

      }
    }
</script>

<style scoped>
  .mainDiv{
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid #00F;
    background: rgba(0, 139, 139, 0.53);
    /*margin-top: 200px;*/
    /*margin-left: 500px;*/
    /*text-align: center;*/
  }
  .text-box{
    background: rgba(189, 183, 107, 0.49);
    border-radius: 4px;
    border: 1px solid #00F;
    height: 88%;
    overflow-y: auto;
    margin-left: 10px;
    margin-right: 10px;
  }
  .input-box{
    margin-left: 10px;
    top: 10px;
  }
</style>
