<template >
    <div data-theme="cupcake" class="detail">
        <div class="navbar bg-base-100 shadow-sm">
            <div class="navbar-start ">
                <button class="btn btn-ghost" @click="goBack">
                    <IconBack class="size-5"></IconBack>
                </button>
            </div>

            <div class="navbar-center">
                <h1 class="text-xl ">停车场监控</h1>
            </div>
            <div class="navbar-end">

            </div>

        </div>
        <div class="flex justify-center p-5">

            <div
                class="grid  card-compact grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div v-for="(item, index) in data" :key="index" class="card w-full shadow-xl">
                    <figure><img :src="item.picture_url" alt="Shoes"></figure>
                    <div class="card-body">
                        <h2 class="card-title text-sm">{{ item.title }}</h2>
                        <p class="text-xs">{{ item.updatedAt }}</p>
                        <div class="card-actions justify-center">
                            <button class="btn btn-block btn-primary" @click="handleOpen(item)">查看</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <PlayView v-if="showPlayView" @close="handleClose" :item="currentSelectItem" />
</template>

<script setup lang="js">
import { onMounted, ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import IconBack from '../components/icons/IconBack.vue'
import PlayView from './PlayView.vue'

const showPlayView = ref(false);
const store = useStore();
const data = ref();
const router = useRouter();
const currentSelectItem = ref();
function goBack() {
    router.go(-1);
}
const handleOpen = async (item) => {
    currentSelectItem.value = item
    showPlayView.value = true
};
function handleClose() {

    showPlayView.value = false
}
const getData = async () => {
    const info = store.state.userInfo;
    const token = info ? info.token : null;
    const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/getVideos?parking_lot_id=${1}`, {
        headers: token ? { 'Authorization': `${token}` } : {}
    }); // 调用 API 获取用户信息
    const result = await response.json();
    if (result.code === 0) {
        data.value = result.data
    } else {
        alert(result.message);
    }
};
getData();
</script>