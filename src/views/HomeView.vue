<script setup lang="ts">
import { ref } from "vue";
const showVideoModal = ref(false);
const handleOpen = () => {
  showVideoModal.value = true;
};
const toggleFullScreen = () => {
  const videoElement = document.getElementById("myVideo");
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.mozRequestFullScreen) {
    // 兼容 Firefox
    videoElement.mozRequestFullScreen();
  } else if (videoElement.webkitRequestFullscreen) {
    // 兼容 Chrome、Safari 和 Opera
    videoElement.webkitRequestFullscreen();
  } else if (videoElement.msRequestFullscreen) {
    // 兼容 IE/Edge
    videoElement.msRequestFullscreen();
  }
};
const closeVideoModal = (event) => {
  if (
    !event.target.closest(".fullscreenButton") &&
    !event.target.closest("video")
  ) {
    showVideoModal.value = false;
  }
};
</script>

<template>
  <div
    style="background: #000; width: 100vw; height: 9999vh; padding-top: 30px"
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

      
    </div>
  </div>
  <div v-if="showVideoModal" class="videoModal" @click="closeVideoModal">
    <!-- 在这里放置全屏播放的视频组件 -->
    <!-- 例如：<VideoPlayer :src="videoSrc" /> -->
    <video
      id="myVideo"
      src="https://media.w3.org/2010/05/sintel/trailer.mp4"
      controls
      autoplay
      style="width: 100vw; height: 100vw"
    ></video>
    <button @click="toggleFullScreen" class="fullscreenButton">全屏</button>
  </div>
</template>
<style>
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
</style>
