<template>
  <div data-theme="cupcake" class="bg-base-100">
    <Fixations>
      <div class="navbar shadow-sm">
        <div class="flex-none">
          <button class="btn btn-sm" onclick="alert('目前仅开通成都市');">
            成都
            <IconPoint class="size-5"></IconPoint>
          </button>
        </div>
        <div class="flex-1">
          <div class="avatar">
            <div class="size-10 rounded-full">
              <img src="../assets/avator.jpg" @click="goProfile" alt="" />
            </div>
          </div>
          <div class="badge badge-secondary badge-lg ml-0" @click="goProfile">
            {{
              ($store.state.userInfo && $store.state.userInfo.phone) || "请登录"
            }}
          </div>
        </div>
        <div class="flex-none gap-2">
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar"
            >
              <button class="btn btn-circle">
                <IconSetting class="text-primary-500 size-6"></IconSetting>
              </button>
            </div>
            <ul
              tabindex="0"
              class="mt-3 z-[1] p-2 shadow menu menu-lg dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button class="justify-between" @click="goProfile">
                  个人中心
                  <span class="badge">New</span>
                </button>
                <button class="justify-between" @click="goOrder">
                  订单
                  <span class="badge">看监控</span>
                </button>
              </li>

              <li v-if="store.state.userInfo">
                <button @click="goLogout">退出登录</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fixations>

    <div v-if="isLoading" class="center-box">
      <span v-if="isLoading" class="loading loading-spinner loading-lg"></span>
    </div>

    <div class="flex justify-center">
      <div
        class="grid card-compact grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-3 mt-2"
      >
        <div
          v-for="(item, index) in data"
          :key="index"
          class="card w-full shadow-xl"
        >
          <figure><img :src="item.scene_imgs[0].url" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title text-sm">
              {{ item.title }}
              <!-- <div class="badge badge-secondary">新</div> -->
            </h2>
            <p class="text-xs">距离机场约9分钟车程</p>

            <div class="card-actions justify-end">
              <div
                v-for="tag in item.tag"
                :key="tag"
                class="badge badge-accent badge-outline badge-sm"
              >
                {{ tag.title }}
              </div>

              <button
                class="btn btn-block btn-primary"
                @click="handleOpen(item)"
              >
                查看
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import IconSetting from '../components/icons/IconSetting.vue'
import IconPoint from '../components/icons/IconPoint.vue'
import { useStore } from 'vuex';
import { useGuard } from "@authing/guard-vue3";
import Fixations from "@/components/Fixations/index.vue"
const data = ref();
const isLoading = ref(true);

const router = useRouter();
const store = useStore();
const guard = useGuard();


function goProfile() {
    router.push({ name: 'Profile' });
}
function goOrder() {
    // router.push({ name: 'Order' });
    // router.push({ name: 'CameraList' });
    router.push({
        path :"/userOrderlist"
     });

}

async function goLogout() {
    // 调试的时候可以把await去掉,这样再次登录的时候就不用验证码了,因为平台没退出
    await guard.logout();
    store.commit('SET_USER_INFO', null);
    localStorage.removeItem('userInfo');
    // 刷新
    window.location.reload();

}
onMounted(() => {

})

const handleOpen = async (item) => {
    router.push({ name: 'Detail', params: { id: item.id } });
};
const getData = async () => {
    const info = store.state.userInfo;
    console.log(info);
    const token = info ? info.token : null;
    const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/get_parking_lot`, {
        headers: token ? { 'Authorization': `${token}` } : {}
    }); // 调用 API 获取用户信息
    const result = await response.json();
    if (result.code === 0) {
        // data.value = [...result.data,...result.data,...result.data,...result.data,...result.data, ...result.data, ...result.data];
        data.value = result.data
    } else {
        alert(result.message);
    }
    isLoading.value = false
};
getData();
</script>
<style scoped>
.center-box {
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
