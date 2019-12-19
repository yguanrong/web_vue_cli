<template>
  <div id="map2D" style="width: 100%;height: 100%;overflow: hidden">
    <div id="mapId" style="width: 100%;height: 100%;"></div>
    <div
      class="infoWindow"
      id="mapWindow"
      ref="mapWindow"
      v-show="isPop">
      <div class="title" >垃圾投递点基本信息</div>
      <div class="infoDiv">
        <div class="infoDivL">
          <br />
          <div class="row">今日清运量：0.8吨</div>
          <div class="row">所属村：{{popWindowData.precinctName}}</div>
          <div
            :title="popWindowData.installAddr"
            class="row">具体位置：{{popWindowData.installAddr}}</div>
          <div class="row">负责人：{{popWindowData.leader}}</div>
          <div class="row">联系电话：{{popWindowData.phone}}</div>
        </div>
      </div>
      <i
        @click="closeInfoWindow"
        class="el-icon-close"
        style="position: absolute;top: 32px;right: 20px;cursor: pointer"
      />
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Axios from "axios";
import AMap from "AMap";
import CoordTransform from "../utils/coordtransform";
import sysConfig from '../../static/sysConfig'
import componyPoints from '../../static/mapPoints'
import demoData from '../../static/demoData'
// import ZNVVideo from "./ZNVVideo";

export default {
  // components: { ZNVVideo },
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
        state: "正常",
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
  methods: {
    // 、、地图缩放
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
        zooms: [10, 18],
        // mapStyle: "amap://styles/blue" // 设置地图的显示样式
      });
      this.selfMap.on("complete", function() {
        // 地图轮廓勾勒
        self.regionalContour();
        // 获取页面数据
        self.initData();
        self.addPoints()
      });

    },
    //画出范围轮廓
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
          strokeWeight: 8,
          fillOpacity: 0,
          strokeOpacity: 0.84,
          path: path[j],
          zIndex: 7
        });
      }
    },
    //  清楚定时器
    clearAllTimer: function() {
      this.myTimers && clearInterval(this.myTimers);
      this.myTimerFlicker && clearInterval(this.myTimerFlicker);
    },
    // 关闭信息窗体
    closeInfoWindow: function() {
      this.infoWindow && this.infoWindow.close();
    },
    // 创建信息窗体
    createInfoWindow: function(data) {
      this.isPop = true;
      this.popWindowData.precinctName = data.precinctName;
      this.popWindowData.installAddr = data.installAddr;
      this.popWindowData.deviceId = data.deviceId;
      this.popWindowData.leftCameraId = data.leftCameraId;
      this.popWindowData.rightCameraId = data.rightCameraId;
      return this.$refs.mapWindow;
    },
    // 地图撒点,添加信息窗体
    addPoints: function() {
      //点集合
      let points = this.pointDatas;
      console.log(points);
      let len = points.length;
      let self = this;
      let infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        anchor: "bottom-center",
        offset: new AMap.Pixel(-10, -10),
        alwaysRender: true,
        showShadow: true,
        autoMove: true
        // closeWhenClickMap: true // 点击弹框以外的地方，关闭弹框
      });
      for (let i = 0; i < len; i++) {
        if (points[i].gpsx === "" || points[i].gpsy === "") return;
        let url = "";
        if (i%2 === 0) {
          url = require("../assets/mapImg/lajitong36.png");
        } else {
          url = require("../assets/mapImg/lajidian-cun.png");
        }
        let marker = new AMap.Marker({
          //84坐标转高德
          position: CoordTransform.wgs84togcj02(points[i].gpsx, points[i].gpsy),
          offset: new AMap.Pixel(-18, -18),
          icon: url // 添加 Icon 图标 URL
        });
        marker.data = points[i];
        marker.isShow = true; // 标识点位的闪烁状态
        this.CircleMarkers.push(marker);
        // 绑定点击事件--弹出信息窗体
        marker.on("click", function(e) {
          console.log(e);
          self.closeInfoWindow();
          self.selfMap.setZoomAndCenter(17, [
            e.lnglat.lng,
            e.lnglat.lat + 0.00066
          ]);
          infoWindow.setContent(self.createInfoWindow(e.target.data));
          infoWindow.open(self.selfMap, e.lnglat);
          if (e.target.data.type === 1) {
            self.currentPrecinctType = "社区";
          } else {
            self.currentPrecinctType = "行政村";
            self.popWindowData.state = "正常";
          }

          self.infoWindow = infoWindow;
        });
      }
      this.selfMap.add(this.CircleMarkers);
    },
    //初始化数据
    initData: function() {
    },
    // 初始化weosocket
    initWebSocket() {
      // ws地址
      const wsuri = "ws://127.0.0.1:8088/websocket";
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
    //监听websocket消息
    websocketonmessage(e) {
      console.log(e.data);
      let data = JSON.parse(e.data);
      console.log(data);
    }
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
    // this.initWebSocket();
  },
  destroyed: function() {
    this.selfMap && this.selfMap.destroy();
    this.clearAllTimer();
  }

};
</script>
<style lang="scss" scoped>
#map2D {
  position: relative;

  .infoWindow {
    position: relative;
    padding: 20px 46px 0;
    width: 350px;
    height: 314px;
    text-align: center;
    background-color: rgba(0, 139, 139, 0.54);
    border-style:solid;
    border-width:2px;
    border-color: chartreuse;

    &.no-video-height {
      height: 280px;
      overflow: hidden;
    }
    .el-icon-close:before {
      content: "\E6DB";
      color: white;
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
      height: 90%;
      margin-top: 10%;

      .infoDivL {
        width: 100%;
        height: 100%;
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
