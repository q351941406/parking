import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import { createGuard } from '@authing/guard-vue3'
import type { GuardOptions } from '@authing/guard-vue3'
import '@authing/guard-vue3/dist/esm/guard.min.css'
import store from '../src/components/Store.js'




const domain = `${window.location.origin}/callback`
// console.log('dumain',dumain);

// 全部在前端处理完,不需要后端处理
const guardOptions: GuardOptions = {
    appId: '65d8b5d805fe059574b1ff72',
    // redirectUri:`${import.meta.env.VITE_APP_API_BASE_URL}/auth/loginCallback`,
    redirectUri:domain,// 官网后台可以配置多个,但这里指定其中一个
}

const app = createApp(App)
app.use(
    createGuard(guardOptions)
)
app.use(router)
app.use(store)

// store.dispatch('fetchUserInfo') // 在这里调用action获取用户信息
// window.addEventListener("beforeunload", async () => {
//     await store.dispatch('fetchUserInfo') // 在这里调用action获取用户信息
// })
// await store.dispatch('fetchUserInfo') // 在这里调用action获取用户信息
async function init() {
    // 如果有必要的话，执行异步操作来加载用户信息
    await store.dispatch('fetchUserInfo');
  
   
  }
// 初始化应用
await init();
app.mount('#app')
