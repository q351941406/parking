
<template >
  <div data-theme="cupcake" class="bg-base-100">

    <div class=" mx-5">
      
      <div class="flex justify-between p-4">
        <div class="flex items-center">
          <div class="avatar">
            <div class="size-14 rounded-full">
              <img src="../assets/avator.jpg" alt="" />
            </div>
          </div>
          <div class="badge badge-secondary badge-lg ml-2">{{ userPhone }}</div>
        </div>

        <div>
          <button class="btn btn-circle" @click="openLogin">
            <!-- <img src="../assets/设置.png" alt="" width="28px"> -->
            <IconSetting class="text-primary-500 h-6 w-6"></IconSetting>
          </button>
          <dialog id="my_modal_1" class="modal">
            <div class="modal-box ">
              <label class="form-control">
                <div class="label justify-start">
                  <span class="label-text mx-3">手机号</span>
                </div>
                <div class="flex justify-between">
                  <input type="text" placeholder="请输入手机号" v-model="inputPhone"
                    class="input input-bordered w-full max-w-xs" />
                  <div class="mx-1"></div>
                  <button v-if="!loginLoading" class="btn btn-primary btn-block w-20" @click="login">确定</button>
                  <button v-else class="btn disabled:opacity-75"  disabled>
                    <span class="loading loading-spinner"></span>
                  </button>
                </div>
              </label>
            </div>
            <form method="dialog" class="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>

      <div class="flex justify-center">

        <div
          class="grid  card-compact grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div v-for="(item, index) in channel" :key="index" class="card w-full shadow-xl">
            <figure><img :src="item.imageUlr" alt="Shoes"></figure>
            <div class="card-body">
              <h2 class="card-title text-sm">{{ item.channelName }}</h2>
              <p class="text-xs">{{ item.shootTime }}</p>
              <div class="card-actions justify-center">
                <button class="btn btn-primary btn-block" @click="handleOpen(item)">查看</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
  <dialog id="my_modal_play" class="modal">
    <div class="modal-box p-0">
      <div id="playWind1"></div>
      <!-- 您可以在这里添加一个关闭按钮 -->
      <button class="btn btn-sm absolute right-4 top-4 " onclick="my_modal_play.close()">
        <IconClose class="text-primary-500 h-5 w-5"></IconClose>
      </button>
      <button class="btn btn-sm absolute right-4 bottom-4" @click="fullScreen">
        <IconBig class="text-primary-500 h-5 w-5"></IconBig>
      </button>
    </div>
  </dialog>

</template>
<script setup lang="js">
import { onMounted, ref } from "vue";
import EZUIKit from "ezuikit-js";
import axios from "axios";
import IconSetting from '../components/icons/IconSetting.vue'
import IconBig from '../components/icons/IconBig.vue'
import IconClose from '../components/icons/IconClose.vue'

const login_show = ref(true);
const inputPhone = ref();
const userPhone = ref("");
const channel = ref();
const loginLoading = ref();
const phoneNumber = localStorage.getItem("phoneNumber");
userPhone.value = phoneNumber == null ? "" : phoneNumber;
login_show.value = phoneNumber == null ? true : false;
const modalPhone = ref(null);
const modalPlay = ref(null);

const openLogin = () => {
  if (modalPhone.value) modalPhone.value.showModal();
};
function fullScreen() {
    var element = document.getElementById('my_modal_play');
    if (element.classList.contains('rotate-90')) {
        element.classList.remove('rotate-90');
        element.classList.remove('scale-150'); // 移除全屏样式
    } else {
        element.classList.add('rotate-90');
        element.classList.add('scale-150'); // 添加全屏样式
    }
}




onMounted(() => {
  // 在组件挂载后获取对话框元素的引用
  modalPhone.value = document.getElementById('my_modal_1');
  modalPlay.value = document.getElementById('my_modal_play');
  if (phoneNumber) {
    inputPhone.value = phoneNumber;
    login()
  }else {
    if (modalPhone.value) modalPhone.value.showModal();
  }
});
const login = () => {
  loginLoading.value = true;
  const apiUrl = `https://fc.mayizuanqian.com/getVideos?phone=${inputPhone.value}`; // 将<phone>替换为实际的电话号码
  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data);
      if (response.data.code == "0") {
        userPhone.value = inputPhone.value;
        localStorage.setItem("phoneNumber", inputPhone.value);
        login_show.value = false;
        if (modalPhone.value) modalPhone.value.close();
        channel.value = response.data.data;
      } else {
        alert(response.data.message);
      }
      loginLoading.value = false;
    })
    .catch((error) => { });
  return

};

const handleOpen = (item) => {
  if (modalPlay.value) modalPlay.value.showModal();
  console.log(item.url);
  var width = document.documentElement.clientWidth;
  var height = (document.documentElement.clientWidth * 9) / 16;
  let player;
  // 取出modal-box的宽度
  var width = document.querySelector(".modal-box").offsetWidth;
  player = new EZUIKit.EZUIKitPlayer({
    id: "playWind1",
    useHardDev: true,
    width:width,
    height: height,
    template: "c064bc45dd0b4d27ba16d7835199f85d",
    url: item.url,
    accessToken: item.accessToken,
    handleError: (err) => {
      console.log(err);
    },
  });
  window.EZOPENDemo1 = player
};


</script>
<style>

</style>