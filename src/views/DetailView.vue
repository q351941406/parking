<template>
  <div data-theme="cupcake" class="detail">
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start ">
        <button class="btn btn-ghost" @click="goBack">
          <IconBack class="size-5"></IconBack>
        </button>
      </div>

      <div class="navbar-center">
        <h1 class="text-xl ">详情</h1>
      </div>
      <div class="navbar-end">

      </div>

    </div>
    <div v-if="isLoading" class="fixedbg-opacity-50 z-50 flex items-center justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
    <div class="mt-0 shadow-sm bg-white">
      <div class="carousel carousel-center  p-0 space-x-1 bg-neutral  w-full" id="gallery">
        <a class="carousel-item flex items-end" v-for="(item, index) in data.scene_imgs" :key="index" :href="item.url"
          :data-pswp-src="item.url" :data-pswp-width="item.w" :data-pswp-height="item.h">
          <div class="">
            <img :src="item.url" class="size-40" alt="Tailwind CSS Carousel component" />
          </div>
        </a>
      </div>
      <div class=" px-2 flex justify-between items-start">
        <div>
          <h1 class="text-neutral text-xl">{{ data.title }}</h1>
          <div class="flex  items-start">
            <IconPoint class="size-5"></IconPoint>
            <p class="text-neutral text-sm">距离机场约9分钟车程</p>
          </div>
        </div>
        <button class="btn btn-sm btn-primary" @click="togglePlayView">
          <IconLive class="size-5"></IconLive>
          查看直播
        </button>
      </div>
    </div>

    <div class="shadow my-3 bg-white">
      <div class="grid grid-cols-3 gap-4 mb-4 p-3">
        <div class="flex flex-col items-center justify-center text-center" v-for="(item, index) in data.tag" :key="index">
          <img :src="item.url" class="size-8" />
          <div class="text-xs mt-1">{{ item.title }}</div>
        </div>
      </div>
    </div>



    <!-- select -->
    <div class="price-wrapper flex flex-col p-5 bg-white gap-2.5 shadow-sm">
      <div v-for="(item, index) in data.price" :key="index"
        class="price-item flex justify-between bg-white p-5 rounded-lg text-xl border border-gray-200"
        :class="{ 'border-primary': currentPrice == item.price }" @click="currentPrice = item.price">
        <div class="left">
          <strong class="text-lg">{{ item.name }}</strong>
          <div class="text-sm">{{ item.detail }}</div>
        </div>

        <div class="left">
          <span class="stat-value text-accent text-2xl"> ¥{{ item.price }}/天</span>
        </div>
      </div>
    </div>


    <!-- Footer -->
    <div class="fixed inset-x-0 bottom-0 bg-white px-4 py-3 border-t border-gray-300 ">
      <div class="flex justify-between items-center">
        <div class="flex-1 align-middle">
          <!-- <div class=" align-middle"> -->
            <span class="text  mr-2 total-price">总费用：
              <span class="stat-value text-accent text-2xl">¥{{ currentPrice * currentPriceCount }}</span>
            </span>
          <!-- </div> -->
        </div>
        <div class="flex-1">
          <div class="items-center">
            
            <button class="btn btn-sm mx-1.5 btn-primary" :disabled="currentPriceCount == 1"
              @click="currentPriceCount -= 1">
              - </button>
              <span class="stat-value text-xl">{{ currentPriceCount }}</span>
            <button class="btn btn-sm mx-1 btn-primary" @click="currentPriceCount += 1"> + </button>
            
          </div>
        </div>
        <button class="btn rounded-lg btn-primary" :disabled="currentPrice == 0" @click="alertTip">立即下单</button>
      </div>
    </div>




    <!-- 弹窗 -->

    <PlayView v-if="showPlayView" @close="handleClose" :item="data.Cameras[0]" />


  </div>
</template>


<script setup lang="js">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useGuard } from '@authing/guard-vue3'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import IconPoint from '../components/icons/IconPoint.vue'
import IconLive from '../components/icons/IconLive.vue'
import IconBack from '../components/icons/IconBack.vue'
import PlayView from './PlayView.vue'

const data = ref([]);
const isLoading = ref(true);
const store = useStore();
const router = useRouter();
const lightbox = ref(null);
const showPlayView = ref(false);
let id = 0;
const guard = useGuard()

const currentPrice = ref(null);
const currentPriceCount = ref(1);

function alertTip() {
  if (store.state.userInfo) {
    alert('请致电客服:18380486293');
  } else {
    guard.startWithRedirect({
      state: 'some-random-string'
    })
  }
}
function goBack() {
  router.go(-1);
}
function togglePlayView() {
  if (data.value.Cameras.length === 0) {
    alert('暂无直播');
    return;
  }
  // 有问题,第一次能打开,第二次需要点两次才能打开
  // showPlayView.value = !showPlayView.value;
  showPlayView.value = true
}
function handleClose() {
  showPlayView.value = false
}

onMounted(async () => {

  id = router.currentRoute.value.params.id;

  lightbox.value = new PhotoSwipeLightbox({
    gallerySelector: '#gallery', // Change to match your gallery ID
    childSelector: 'a',
    pswpModule: () => import('photoswipe')
  });
  lightbox.value.init();

  await getData();


})
onUnmounted(() => {
  if (lightbox.value) {
    lightbox.value.destroy();
  }
});
const handleOpen = async (item) => {
  // router.push({ name: 'Detail', params: { id: item.id }});
};
const getData = async () => {
  // const info = localStorage.getItem('userInfo');
  const info = store.state.userInfo;
  const token = info ? info.token : null;

  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/get_parking_lot?id=${id}`, {
    headers: token ? { 'Authorization': `${token}` } : {}
  }); // 调用 API 获取用户信息
  const result = await response.json();
  if (result.code === 0) {
    data.value = result.data;
    currentPrice.value = result.data.price[0].price
  } else {
    alert(result.message);
  }
  isLoading.value = false
};

</script>