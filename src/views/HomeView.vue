<template>
  <div
    style="background: #000; width: 100vw; min-height: 100vh; padding-top: 30px"
  >
    <div class="top">
      <div>
        <div style="display: flex">
          <img src="../assets/avator.jpg" alt="" class="avator" />
          <div class="tip" @click="open">{{ userPhone }}</div>
        </div>
      </div>
      <div>
        <img src="../assets/设置.png" alt="" width="28px" />
      </div>
    </div>

    <div class="content">
      <div
        v-for="(item, index) in channel"
        :key="index"
        :style="{ width: (index === 0 ? 100 : 43) + 'vw' }"
      >
        <div class="img1Container" v-if="index == 0">
          <img
            :src="item.imageUlr"
            alt=""
            class="img1"
            @click="handleOpen(item)"
          />
          <div class="title">
            <div>
              <div class="title_title">{{ item.channelName }}</div>
              <div class="title_detail">{{ item.shootTime }}</div>
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
        <div class="img2Container" v-else>
          <img
            :src="item.imageUlr"
            alt=""
            class="img1"
            @click="handleOpen(item)"
          />
          <div class="title">
            <div>
              <div class="title_title">{{ item.channelName }}</div>
              <div class="title_detail">{{ item.shootTime }}</div>
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
  </div>

  <div class="phoneContainer" v-show="ifLogin">
    <div class="phone">
      <input type="text" placeholder="请输入手机号" v-model="phoneNum" />
      <input type="submit" value="登录" @click="login" />
    </div>
  </div>
  <div v-show="showVideoModal" class="videoModal">
    <!-- 在这里放置全屏播放的视频组件 -->
    <!-- 例如：<VideoPlayer :src="videoSrc" /> -->
    <div>
      <div>
        <img
          src="../assets/关闭.png"
          class="close"
          alt=""
          @click="closeVideoModal"
        />
      </div>
      <div id="playWind1" class="player"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import EZUIKit from "ezuikit-js";
import axios from "axios";

const ifLogin = ref(true);
const phoneNum = ref();
const userPhone = ref("未登录");
const channel = ref();
const phoneNumber = localStorage.getItem("phoneNumber");
userPhone.value = phoneNumber == null ? "未登录" : phoneNumber;
if (phoneNumber != null) {
  ifLogin.value = false;
}
userPhone.value = phoneNumber == undefined ? "未登录" : phoneNumber;

if (phoneNumber !== undefined) {
  ifLogin.value = false;
}
const open = () => {
  ifLogin.value = true;
  phoneNum.value = userPhone.value;
};
const getVideos = () => {
  const apiUrl = `https://fc.mayizuanqian.com/getVideos?phone=${userPhone.value}`; // 将<phone>替换为实际的电话号码

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response);
      channel.value = response.data.data;
    })
    .catch((error) => {});
};
getVideos();
const login = () => {
  var data = JSON.stringify({
    phone: phoneNum.value,
  });
  onMounted(() => {});

  var config = {
    method: "post",
    url: "https://fc.mayizuanqian.com/submitPhone",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Host: "fc.mayizuanqian.com",
      Connection: "keep-alive",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data.message));
      // console.log(JSON.stringify(response.data.message == "手机号不合法"));
      // if (JSON.stringify(response.data.message) == "手机号不合法") {
      //   alert("手机号不合法");
      //   debugger;
      //   return;
      // }
      // debugger;
      userPhone.value = phoneNum.value;
      localStorage.setItem("phoneNumber", phoneNum.value);

      ifLogin.value = false;
      getVideos();
    })
    .catch(function (error) {
      console.log(error);
    });
};

const showVideoModal = ref(false);
const handleOpen = (item) => {
  // console.log(item.url)
  // debugger
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
  window.EZOPENDemo1 = ezopenInit("playWind1", item.url, item.accessToken);
};

const closeVideoModal = (event) => {
  showVideoModal.value = false;
};
</script>
<style scoped>
.phoneContainer {
  position: relative;
}

.phoneContainer::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* 蒙版的颜色和透明度 */
  z-index: 110;
}
.phone {
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 111;
  background: #fff;
  width: 300px;
  height: 150px;
  border-radius: 10px;
}
.phone input[type="text"] {
  width: 80%;
  height: 40px;
  margin-top: 40px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.phone input[type="submit"] {
  display: block;
  width: 100px;
  height: 30px;
  margin: 0 auto;
  margin-top: 10px;
  background: #007bff;
  color: #fff;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.phone input[type="submit"]:hover {
  background: #0056b3;
}
.close {
  position: fixed;
  z-index: 1111;
  top: 10px;
  right: 10px;
  width: 20px;
}
.player {
  margin-bottom: 15px;
  margin-top: 30px;
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
  width: 100%;
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
  width: 100vw;
  height: 100vh;
  z-index: 2222;
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
::v-deep #playWind1-wrap {
  z-index: 11;
}
::v-deep #playWind2-wrap {
  margin-top: 20px;
}
::v-deep #playWind1-loading-item-txt {
  margin-top: 40px;
}
</style>
