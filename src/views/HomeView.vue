<template>
  <div
    style="background: #000; width: 100vw; height: 120vh; padding-top: 30px"
  >
    <div class="top">
      <div>
        <div style="display: flex">
          <img src="../assets/avator.jpg" alt="" class="avator" />
          <div class="tip">Hello,David</div>
        </div>
      </div>
      <div>
        <img src="../assets/设置.png" alt="" width="28px" />
      </div>
    </div>
    <div class="content">
      <div class="img1Container">
        <img src="../assets/1.jpg" alt="" class="img1" @click="handleOpen" />
        <div class="title">
          <div>
            <div class="title_title">Guest Room</div>
            <div class="title_detail">1 Device - Active</div>
          </div>
          <div>
            <img
              src="../assets/箭头.png"
              alt=""
              class="jiantou"
              @click="handleOpen"
            />
          </div>
        </div>
      </div>
      <div class="img2Container">
        <img src="../assets/1.jpg" alt="" class="img1" @click="handleOpen" />
        <div class="title">
          <div>
            <div class="title_title">Guest Room</div>
            <div class="title_detail">1 Device - Active</div>
          </div>
          <div>
            <img
              src="../assets/箭头.png"
              alt=""
              class="jiantou"
              @click="handleOpen"
            />
          </div>
        </div>
      </div>
      <div class="img2Container">
        <img src="../assets/1.jpg" alt="" class="img1" @click="handleOpen" />
        <div class="title">
          <div>
            <div class="title_title">Guest Room</div>
            <div class="title_detail">1 Device - Active</div>
          </div>
          <div>
            <img
              src="../assets/箭头.png"
              alt=""
              class="jiantou"
              @click="handleOpen"
            />
          </div>
        </div>
      </div>

      <div class="img2Container">
        <img src="../assets/1.jpg" alt="" class="img1" @click="handleOpen" />
        <div class="title">
          <div>
            <div class="title_title">Guest Room</div>
            <div class="title_detail">1 Device - Active</div>
          </div>
          <div>
            <img
              src="../assets/箭头.png"
              alt=""
              class="jiantou"
              @click="handleOpen"
            />
          </div>
        </div>
      </div>

      <div class="img2Container">
        <img src="../assets/1.jpg" alt="" class="img1" @click="handleOpen" />
        <div class="title">
          <div>
            <div class="title_title">Guest Room</div>
            <div class="title_detail">1 Device - Active</div>
          </div>
          <div>
            <img
              src="../assets/箭头.png"
              alt=""
              class="jiantou"
              @click="handleOpen"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="showVideoModal" class="videoModal" >
    <!-- 在这里放置全屏播放的视频组件 -->
    <!-- 例如：<VideoPlayer :src="videoSrc" /> -->
    <div id='playWind1' class="player"></div>
    
  

  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import EZUIKit from "ezuikit-js";
const showVideoModal = ref(false);
const handleOpen = () => {
  showVideoModal.value = true;
  var width = document.documentElement.clientWidth;
  var height = (document.documentElement.clientWidth * 9) / 16;
 
  

  const ezopenInit = (elementId, url, accessToken) => {
    const player = new EZUIKit.EZUIKitPlayer({
      id: elementId,
      useHardDev: true,
      width: width,
      height: height,
      template: "c064bc45dd0b4d27ba16d7835199f85d",
      url: url,
      accessToken: accessToken,
    });
    return player;
  };
  const videoElement = document.getElementById("playWind1");


  // Initialize the first player
  window.EZOPENDemo1 = ezopenInit(
    "playWind1",
    "ezopen://open.ys7.com/BB8967325/1.hd.live",
    "at.ac3w8280awshig7d6u119gd6ajkgd8pb-1vybn8xky0-1iz72vc-jccsbwdjp"
  );

  // Initialize the second player
  window.EZOPENDemo2 = ezopenInit(
    "playWind2",
    "ezopen://open.ys7.com/BB8967325/2.hd.live",
    "at.ac3w8280awshig7d6u119gd6ajkgd8pb-1vybn8xky0-1iz72vc-jccsbwdjp"
  );
};

const closeVideoModal = (event) => {
  const targetElement = event.target;

  // 通过 querySelector 获取指定元素
  const playWind1Element = document.querySelector("#playWind1");

  // 判断 event.target 是否是指定元素
  if (
   
    targetElement !== playWind1Element
  ) {
    showVideoModal.value = false;
  }
};
</script>
<style scoped>
 .player {
      margin-bottom: 15px;
      margin-top:30px;
    }
.top {
  padding: 0 20px 20px;
  width: 100vw;
  height: 40px;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
.avator {
  width: 30px;
  border-radius: 50%;
}
.tip {
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  margin-left: 10px;
}
.content {
  margin-top: 20px;
  padding: 0 20px 0px;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.img1Container {
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
}
.img2Container {
  width: 47%;
  height: 150px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
}
.img1 {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.videoModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  /* 样式调整和视频组件的布局等 */
}
.fullscreenButton {
  padding: 10px 20px;
  background-color: gray;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.title {
  background-color: rgba(0, 0, 0, 0.3); /* 透明黑色背景 */
  position: absolute;
  bottom: -22px;
  height: 55px;
  border-radius: 20px;
  width: 96%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px 4px;
  backdrop-filter: blur(10px); /* 使用模糊效果，可以根据需要调整模糊程度 */
}
.title_title {
  font-weight: 600;
}
.title_detail {
  font-size: 12px;
}
.jiantou {
  width: 35px;
  margin-top: 8px;
  transform: rotate(135deg);
}
::v-deep #playWind1-wrap{
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%,-50%);
}
::v-deep #playWind2-wrap{
    margin-top:20px;
}
</style>
