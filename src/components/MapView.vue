<template>
  <div id="map2D" style="width: 100%;height: 100%;overflow: hidden">
    <div id="mapId" style="width: 100%;height: 100%;"></div>
    <div
      :class="{'alarmInfo':popWindowData.state != '正常',
      'normalInfo':popWindowData.state == '正常',
      'no-video-height':(!popWindowData.videoSrcL&&!popWindowData.videoSrcR&&!popWindowData.leftCameraId&&!popWindowData.rightCameraId)}"
      class="infoWindow"
      id="mapWindow"
      ref="mapWindow"
      v-show="isPop"
    >
      <div></div>
      <div class="title" v-if="popWindowData.state == '正常'">垃圾投递点基本信息</div>
      <div class="title" v-else>垃圾桶{{popWindowData.state}}告警</div>
      <div class="infoDiv">
        <div class="infoDivL" v-if="currentPrecinctType != '行政村'">
          <div class="row">今日投递次数：{{popWindowData.count}}次</div>
          <div class="row">
            状态：
            <span
              :class="{'stateTxtRed': popWindowData.state != '正常'}"
              class="stateTxt"
            >{{popWindowData.state}}</span>
          </div>
          <div class="row">所属小区：{{popWindowData.precinctName}}</div>
          <div :title="popWindowData.installAddr" class="row">具体位置：{{popWindowData.installAddr}}</div>
          <div class="row">所处编组：第{{popWindowData.group}}组</div>
          <div class="row">智能垃圾桶总数：{{popWindowData.deviceCount}}台</div>
        </div>
        <div class="infoDivL" v-else>
          <br />
          <!--          <div class="row">今日清运量：{{popWindowData.count}}吨</div>-->
          <div class="row">今日清运量：0.8吨</div>
          <div class="row">所属村：{{popWindowData.precinctName}}</div>
          <div
            :title="popWindowData.installAddr"
            class="row"
            style="width: 480px;"
          >具体位置：{{popWindowData.installAddr}}</div>
          <div class="row">负责人：{{popWindowData.leader}}</div>
          <div class="row">联系电话：{{popWindowData.phone}}</div>
        </div>
        <div class="infoDivR" v-if="currentPrecinctType != '行政村'">
          <div class="garbageDiv">
            <div class="bars">
              <div class="barCommon">
                <div :class="{'temRed':popWindowData.temp1 > 60}">{{popWindowData.temp1}}℃</div>
                <div class="barBase wet-color">
                  <div
                    :style="'height:'+ 0.8*(100 - popWindowData.capacity1) +'px'"
                    class="barValue wetValue"
                  ></div>
                  <div class="bar-percent">{{popWindowData.capacity1}}%</div>
                </div>
                <div class="bk-icon wet-bk"></div>
              </div>
              <div class="barCommon">
                <div :class="{'temRed':popWindowData.temp2 > 60}">{{popWindowData.temp2}}℃</div>
                <div class="barBase dry-color">
                  <div
                    :style="'height:'+0.8*(100 - popWindowData.capacity2)+'px'"
                    class="barValue dryValue"
                  ></div>
                  <div class="bar-percent">{{popWindowData.capacity2}}%</div>
                </div>
                <div class="bk-icon dry-bk"></div>
              </div>
            </div>
            <div class="barText">1 号</div>
          </div>
          <div class="garbageDiv">
            <div class="bars">
              <div class="barCommon">
                <div :class="{'temRed':popWindowData.temp3 > 60}">{{popWindowData.temp3}}℃</div>
                <div class="barBase wet-color">
                  <div
                    :style="'height:'+0.8*(100 - popWindowData.capacity3)+'px'"
                    class="barValue wetValue"
                  ></div>
                  <div class="bar-percent">{{popWindowData.capacity3}}%</div>
                </div>
                <div class="bk-icon wet-bk"></div>
              </div>
              <div class="barCommon">
                <div :class="{'temRed':popWindowData.temp4 > 60}">{{popWindowData.temp4}}℃</div>
                <div class="barBase dry-color">
                  <div
                    :style="'height:'+0.8*(100 - popWindowData.capacity4)+'px'"
                    class="barValue dryValue"
                  ></div>
                  <div class="bar-percent">{{popWindowData.capacity4}}%</div>
                </div>
                <div class="bk-icon dry-bk"></div>
              </div>
            </div>
            <div class="barText">2 号</div>
          </div>
          <div class="garbageDiv" v-if="popWindowData.deviceCount == 3">
            <div class="bars">
              <div class="barCommon">
                <div :class="{'temRed':popWindowData.temp5 > 60}">{{popWindowData.temp5}}℃</div>
                <div class="barBase dry-color">
                  <div
                    :style="'height:'+0.8*(100 - popWindowData.capacity5)+'px'"
                    class="barValue dryValue"
                  ></div>
                  <div class="bar-percent">{{popWindowData.capacity5}}%</div>
                </div>
                <div class="bk-icon dry-bk"></div>
              </div>
              <div class="barCommon">
                <div :class="{'temRed':popWindowData.temp6 > 60}">{{popWindowData.temp6}}℃</div>
                <div class="barBase recycle-color">
                  <div
                    :style="'height:'+0.8*(100 - popWindowData.capacity6)+'px'"
                    class="barValue recyleValue"
                  ></div>
                  <div class="bar-percent">{{popWindowData.capacity6}}%</div>
                </div>
                <div class="bk-icon recycle-bk"></div>
              </div>
            </div>
            <div class="barText">3 号</div>
          </div>
        </div>
      </div>
      <div class="videoDiv">
        <z-n-v-video
          :cameraId="popWindowData.leftCameraId +'_Vmap1'"
          :cameraLink="popWindowData.videoSrcL"
          :deviceId="popWindowData.deviceId +'_Vmap1'"
          :videoType="popWindowData.videoType"
          class="mapVideoDIV"
          ref="mapDevice1"
        ></z-n-v-video>
        <z-n-v-video
          :cameraId="popWindowData.rightCameraId +'_Vmap2'"
          :cameraLink="popWindowData.videoSrcR"
          :deviceId="popWindowData.deviceId +'_Vmap2'"
          :videoType="popWindowData.videoType"
          class="mapVideoDIV"
          ref="mapDevice2"
        ></z-n-v-video>
        <!--        <video v-if="popWindowData.videoSrcL!=null" :src="popWindowData.videoSrcL" autoplay controls id="mapVideo1"-->
        <!--               muted webkit-playsinline></video>-->
        <!--        <video v-if="popWindowData.videoSrcR!=null" :src="popWindowData.videoSrcR" autoplay controls id="mapVideo2"-->
        <!--               muted webkit-playsinline></video>-->
      </div>
      <i
        @click="closeInfoWindow"
        class="el-icon-close"
        style="position: absolute;top: 32px;right: 32px;cursor: pointer"
      />
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Axios from "axios";
import AMap from "AMap";
import CoordTransform from "../utils/coordtransform";
import ZNVVideo from "./ZNVVideo";

export default {
  components: { ZNVVideo },
  data() {
    return {
      websock: null,
      selfMap: null,
      CircleMarkers: [],
      infoWindow: null,
      myTimers: null,
      myTimerFlicker: null,
      isPop: false,
      currentPrecinctType: "高东镇",
      popWindowData: {
        state: "满溢",
        precinctName: "品欣雅苑",
        installAddr: "17单元配电房左侧",
        group: "1",
        deviceCount: 3, // 垃圾桶总数
        count: 20, // 投递次数
        videoSrcL: "",
        videoSrcR: "",
        capacity1: 98,
        capacity2: 0,
        capacity3: 0,
        capacity4: 0,
        capacity5: 0,
        capacity6: 0,
        temp1: 26,
        temp2: 26,
        temp3: 26,
        temp4: 26,
        temp5: 26,
        temp6: 26,
        leader: "李伟",
        phone: "18012341234"
      },
      pointDatas: componyPoints,
      alarmPointDatas: [],
      geocoder: new AMap.Geocoder({ city: "shanghai" }) // 城市设为北京，默认：“全国”
    };
  },
  mounted() {
    let contW = 1920 * 2;
    let contH = 1080 * 2;
    let cliWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    let cliHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    let w = cliWidth / contW;
    let h = cliHeight / contH;
    this.resize({ w: w, h: h });
    this.$root.eventBus.$on("resize", oo => {
      this.resize(oo);
    });
    this.$root.eventBus.$on("changePId", oo => {
      this.closeInfoWindow();
      if (this.myTimers) clearInterval(this.myTimers)
      let centerPoint, mapZoom;
      if (oo.pId == "高东镇") {
        mapZoom = 13;
        this.selfMap.setCenter([121.622783, 31.327013]);
      } else {
        mapZoom = 17;
        this.geocoder.getLocation("高东镇" + oo.pId, (status, result) => {
          if (status === "complete" && result.geocodes.length) {
            var lnglat = result.geocodes[0].location;
            this.selfMap.setCenter(lnglat);
          } else {
            console.log("根据地址查询位置失败");
          }
        });
      }
      this.selfMap.setZoom(mapZoom);
      this.initData();
    });
    this.initMap();
    this.initWebSocket();
  },
  destroyed: function() {
    this.selfMap && this.selfMap.destroy();
    this.clearAllTimer();
  },
  methods: {
    getRandomNum: function(min, max) {
      let cur = Math.floor(Math.random() * (max - min) + min);
      return cur;
    },
    resize: function(oo) {
      let w = oo.w;
      let h = oo.h;
      if (w < 1 || h < 1) {
        $("#mapId").css("transform", "scale(" + 1 / w + "," + 1 / h + ")"); // 方案1--解决图标点击坐标不准bug
      } else {
        $("#mapId")
          .css("transform", "scale(" + 1 / w + "," + 1 / h + ")")
          .css("transformOrigin", "top left"); // 方案1--解决图标点击坐标不准bug
      }
    },
    // 初始化地图
    initMap: function() {
      let self = this;
      this.selfMap = new AMap.Map("mapId", {
        center: [121.622783, 31.327013],
        zoom: 13,
        resizeEnable: true,
        zooms: [12, 18],
        mapStyle: "amap://styles/blue" // 设置地图的显示样式
        // features: ['bg', 'building', 'point']
      });
      this.selfMap.on("complete", function() {
        // 地图轮廓勾勒
        self.regionalContour();
        // 获取页面数据
        self.initData();
      });
    },
    regionalContour: function() {
      let coodData = require("@/libs/map_gaodongzhen.json");
      let path = [];
      for (let i = 0; i < coodData.features.length; i++) {
        path.push(coodData.features[i].geometry.coordinates);
      }
      for (let j = 0; j < path.length; j++) {
        var polygon0 = new AMap.Polygon({
          map: this.selfMap,
          fillColor: "rgba(10,15,97)",
          strokeColor: "rgba(72,167,255)",
          strokeWeight: 1,
          fillOpacity: 0.1,
          path: path[j],
          zIndex: 10
        });
        // 阴影效果
        var polygonk = new AMap.Polygon({
          map: this.selfMap,
          fillColor: "rgba(10,15,97)",
          strokeColor: "#0A2CAA",
          strokeWeight: 12,
          fillOpacity: 0,
          strokeOpacity: 0.84,
          path: path[j],
          zIndex: 7
        });
      }
    },
    clearAllTimer: function() {
      this.myTimers && clearInterval(this.myTimers);
      this.myTimerFlicker && clearInterval(this.myTimerFlicker);
    },
    // 关闭信息窗体
    closeInfoWindow: function() {
      this.$refs.mapDevice1 && this.$refs.mapDevice1.videoClear();
      this.$refs.mapDevice2 && this.$refs.mapDevice2.videoClear();
      this.infoWindow && this.infoWindow.close();
    },
    // 创建信息窗体
    createInfoWindow: function(data) {
      this.isPop = true;
      let url = "apis/garbage/temparatureAndValue?deviceId=" + data.deviceId;
      Axios.get(url)
        .then(res => {
          if (res.data.data) {
            let datas = res.data.data;
            this.popWindowData.capacity1 = datas.value1;
            this.popWindowData.capacity2 = datas.value2;
            this.popWindowData.capacity3 = datas.value3;
            this.popWindowData.capacity4 = datas.value4;
            this.popWindowData.capacity5 = datas.value5;
            this.popWindowData.capacity6 = datas.value6;

            this.popWindowData.temp1 = datas.temperature1;
            this.popWindowData.temp2 = datas.temperature2;
            this.popWindowData.temp3 = datas.temperature3;
            this.popWindowData.temp4 = datas.temperature4;
            this.popWindowData.temp5 = datas.temperature5;
            this.popWindowData.temp6 = datas.temperature6;

            this.popWindowData.state = datas.deviceState;
            this.popWindowData.count = datas.deliveryCount;
            this.popWindowData.deviceCount = datas.deviceCount;
            this.popWindowData.group = datas.groupInfo;
          }
        })
        .catch(e => {});
      this.popWindowData.precinctName = data.precinctName;
      this.popWindowData.installAddr = data.installAddr;
      this.popWindowData.videoSrcL = data.videoSrcL;
      this.popWindowData.videoSrcR = data.videoSrcR;
      this.popWindowData.deviceId = data.deviceId;
      this.popWindowData.leftCameraId = data.leftCameraId;
      this.popWindowData.rightCameraId = data.rightCameraId;
      this.popWindowData.videoType = demoData.sysVideoType;

      return this.$refs.mapWindow;
    },
    // 地图撒点,添加信息窗体
    addPoints: function() {
      // this.selfMap.clearInfoWindow();
      // this.selfMap.remove(this.CircleMarkers);
      // this.CircleMarkers = [];
      let points = this.pointDatas;
      let len = points.length;
      let pointColor = "#6BDE58";
      let self = this;
      let infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        anchor: "bottom-center",
        offset: new AMap.Pixel(0, -6),
        alwaysRender: true,
        showShadow: true,
        autoMove: true
        // closeWhenClickMap: true // 点击弹框以外的地方，关闭弹框
      });
      for (let i = 0; i < len; i++) {
        if (points[i].gpsx == "" || points[i].gpsy == "") return;
        let url = "";
        if (points[i].type === 1) {
          url = require("../assets/mapImg/lajitong36.png");
        } else {
          url = require("../assets/mapImg/lajidian-cun.png");
        }
        let marker = new AMap.Marker({
          position: CoordTransform.wgs84togcj02(points[i].gpsx, points[i].gpsy),
          offset: new AMap.Pixel(-18, -18),
          icon: url // 添加 Icon 图标 URL
        });
        marker.data = points[i];
        marker.isShow = true; // 标识点位的闪烁状态
        this.CircleMarkers.push(marker);
        // 绑定点击事件--弹出信息窗体
        marker.on("click", function(e) {
          self.closeInfoWindow();
          self.selfMap.setZoomAndCenter(17, [
            e.lnglat.lng,
            e.lnglat.lat + 0.00066
          ]);
          infoWindow.setContent(self.createInfoWindow(e.target.data));
          infoWindow.open(self.selfMap, e.lnglat);
          // if (e.target.isAlarm) {
          //   e.target.setIcon(require('../assets/mapImg/lajitong36.png'));
          //   e.target.isAlarm = false
          // }
          if (e.target.data.type === 1) {
            self.currentPrecinctType = "社区";
          } else {
            self.currentPrecinctType = "行政村";
            self.popWindowData.state = "正常";
          }
          setTimeout(() => {
            self.$refs.mapDevice1.videoPlay();
          }, 600);
          setTimeout(() => {
            self.$refs.mapDevice2.videoPlay();
          }, 600);
          self.infoWindow = infoWindow;
        });
      }
      this.selfMap.add(this.CircleMarkers);
    },
    showAlarmPoint: function() {
      let url =
        "apis/garbage/deviceAlarm?precinctName=" +
        this.$store.state.precinctName;
      Axios.get(url).then(res => {
        if (res.data.data) {
          let alarmPoints = res.data.data;
          if (alarmPoints.length == 0) return;
          this.$root.eventBus.$emit("refrushAlarm", alarmPoints);
          let alarmMarkers = [];
          for (let i = 0; i < this.CircleMarkers.length; i++) {
            let marker = this.CircleMarkers[i];
            let index = alarmPoints.findIndex(
              oo => marker.data.deviceId == oo.deviceId
            );
            if (index != -1) {
              marker.setIcon(require("../assets/mapImg/lajitong36_alarm.png"));
              marker.isAlarm = true;
              marker.setzIndex(this.CircleMarkers.length + 100);
              alarmMarkers.push(marker);
            } else {
              if (marker.isAlarm) {
                marker.setIcon(require("../assets/mapImg/lajitong36.png"));
                marker.isAlarm = false;
              }
            }
          }
          this.myTimerFlicker && clearInterval(this.myTimerFlicker);
          this.myTimerFlicker = setInterval(() => {
            for (let i = 0; i < alarmMarkers.length; i++) {
              if (alarmMarkers[i].isShow) {
                alarmMarkers[i].hide();
                alarmMarkers[i].isShow = false;
              } else {
                alarmMarkers[i].show();
                alarmMarkers[i].isShow = true;
              }
            }
          }, 500);
        }
      });
    },
    initData: function() {
      this.selfMap.remove(this.CircleMarkers);
      this.CircleMarkers = [];
      let url =
        "apis/garbage/queryGarbageDevice?precinctName=" +
        this.$store.state.precinctName;
      Axios.get(url).then(res => {
        if (res.data.data) {
          this.pointDatas = res.data.data;
          this.addPoints();
          // this.showAlarmPoint();
          setTimeout(() => {
             this.showAlarmPoint();
          }, 1000)
          this.myTimers = setInterval(() => {
            this.showAlarmPoint();
          }, 1000 * 60 * 10);
        }
      });
    },
    initWebSocket() {
      // 初始化weosocket
      // ws地址
      const wsuri = "ws://" + sysConfig.websocketUrl;
      if ("WebSocket" in window) {
        if (this.websock === null) {
          this.websock = new WebSocket(wsuri);
          console.log("websock已连接");
        } else {
          console.log("this.websock !=null");
          return;
        }
      } else {
        alert("当前浏览器 Not support websocket");
      }
      this.websock.onmessage = this.websocketonmessage;
    },
    websocketonmessage(e) {
      console.log(e.data);
      let data = JSON.parse(e.data);
      console.log(data);
      let deviceId = data.data;
      if (deviceId) {
        for (let i = 0; i < this.CircleMarkers.length; i++) {
          let marker = this.CircleMarkers[i];
          if (marker.data.deviceId == deviceId) {
            marker.setIcon(require("../assets/mapImg/lajitong36.png"));
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#map2D {
  position: relative;

  .infoWindow {
    position: relative;
    padding: 20px 46px 0;
    width: 560px;
    height: 476px;

    &.no-video-height {
      height: 280px;
      overflow: hidden;
    }

    .title {
      margin: 12px 0;
      font-size: 28px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }

    .infoDiv {
      width: 100%;
      height: 180px;

      .infoDivL {
        width: 48%;
        height: 180px;
        display: inline-block;

        .row {
          width: 100%;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          line-height: 28px;
          text-overflow: ellipsis; // 让超出的用...实现
          white-space: nowrap; // 禁止换行
          overflow: hidden; // 超出的隐藏
          span {
            display: inline-block;
            width: 90px;
          }

          .stateTxt {
            font-size: 22px;
            color: rgba(0, 255, 36, 1);
          }

          .stateTxtRed {
            font-size: 22px;
            color: #ff6363;
          }
        }
      }

      .infoDivR {
        display: inline-block;
        width: 50%;
        height: 180px;
        margin-top: 6px;
        vertical-align: top;
        text-align: center;

        .garbageDiv {
          display: inline-block;
          width: 32%;
          height: 100%;
          text-align: center;

          .bars {
            text-align: center;

            .barCommon {
              display: inline-block;
              vertical-align: bottom;
              width: 46%;
              height: 100%;
              font-size: 13px;
              font-weight: bold;

              .temRed {
                background: #f6ff00;
                border-radius: 3px;
                color: #fc000f;
              }

              .barBase {
                margin: 4px 0;
                height: 80px;
                border: 2px solid #c1b5a4;
                .barValue {
                  width: 100%;
                  background-color: #fff;
                  /*background-color: red;*/
                  /*border-bottom-right-radius: 10px;*/
                  /*border-bottom-left-radius: 10px;*/
                  opacity: 0.2;
                }

                .bar-percent {
                  /*line-height: 100px;*/
                }
              }
            }
          }

          .barText {
            padding-top: 10px;
          }
        }
      }
    }

    .videoDiv {
      position: relative;
      width: 100%;

      .mapVideoDIV {
        float: left;
        width: 228px;
        height: 180px;
        margin: 2px;
      }
    }
  }

  .normalInfo {

    .bk-icon {
      margin-top: 15px;
      height: 20px;
      background-size: 50% 60%;
    }
  }

  .alarmInfo {
    background-size: 100% 100%;
    animation: fadeImg 3s infinite;

    .bk-icon {
      margin-top: 15px;
      height: 20px;
      background-size: 50% 60%;
    }
  }
}

@keyframes fadeImg {
  0% {
    box-shadow: 0 0 88px #f1eb67 inset;
  }
  50% {
    box-shadow: 0 0 10px #f1eb67 inset;
  }
  100% {
    box-shadow: 0 0 88px #f1eb67 inset;
  }
}
</style>
