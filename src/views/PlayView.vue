<template >
    <dialog id="my_modal_play" class="modal">
        <div class="modal-box p-0">
            <!-- <div class="text text-accent text-center bg-base-100 ">您未在此停车场下单,只能查看一个角度</div> -->
            <div class="" id="playWind1"></div>
            
            <!-- 您可以在这里添加一个关闭按钮 -->
            <button class="btn btn-sm absolute right-4 top-4 " @click="closeClick">
                <IconClose class="text-primary-500 h-5 w-5"></IconClose>
            </button>
            <button class="btn btn-sm absolute right-4 bottom-4" @click="fullScreen">
                <IconBig class="text-primary-500 h-5 w-5"></IconBig>
            </button>
        </div>
    </dialog>
</template>

<script setup lang="js">

import { onMounted, onUnmounted,ref, defineComponent } from "vue";
import EZUIKit from "ezuikit-js";
import IconBig from '../components/icons/IconBig.vue'
import IconClose from '../components/icons/IconClose.vue'

const modalPlay = ref(null);
let player;
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
onMounted(() => {
    modalPlay.value = document.getElementById('my_modal_play');

    handleOpen(props.item);
});
onUnmounted(() => {
  if (player) {
    console.log('销毁了');
    player.destroy();// 不调这个方法的话,不会停止流
    player = null;
  }
});
const emit = defineEmits(["close"]);
console.log('创建了');
function closeClick(){
    const close = document.getElementById('my_modal_play');
    close.close()
    emit('close'); // 发送关闭事件
}
const handleOpen = (item) => {
    if (modalPlay.value) modalPlay.value.showModal();
    var width = document.documentElement.clientWidth;
    var height = (document.documentElement.clientWidth * 9) / 16;
    // 取出modal-box的宽度
    var width = document.querySelector(".modal-box").offsetWidth;
    player = new EZUIKit.EZUIKitPlayer({
        id: "playWind1",
        useHardDev: true,
        width: width,
        height: height,
        template: "c064bc45dd0b4d27ba16d7835199f85d",
        url: item.play_url,
        accessToken: item.accessToken,
        handleError: (err) => {
            console.log(err);
        },
    });
    window.EZOPENDemo1 = player
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

</script>