<template>
    <div class="callback-container">
    </div>
</template>
  
<script lang="js" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGuard } from '@authing/guard-vue3'
// import { JwtTokenStatus, User } from '@authing/guard-vue3'
import { useStore } from 'vuex'
const store = useStore();
const router = useRouter()

const guard = useGuard()

const handleAuthingLoginCallback = async () => {
    try {
        // 1. 触发 guard.handleRedirectCallback() 方法完成登录认证
        // 用户认证成功之后，我们会将用户的身份凭证存到浏览器的本地缓存中
        await guard.handleRedirectCallback()

        // 2. 处理完 handleRedirectCallback 之后，你需要先检查用户登录态是否正常
        const loginStatus = await guard.checkLoginStatus()

        if (!loginStatus) {
            return console.error('Guard is not get login status')
        }

        // 3. 获取到登录用户的用户信息
        const userInfo  = await guard.trackSession()

        // console.log(userInfo)
        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/auth/saveUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInfo: userInfo }) // 添加 userInfo 参数
        });
        const result = await response.json();
        if (result.code === 0) {
            store.commit('SET_USER_INFO', result.data);
            localStorage.setItem('userInfo', JSON.stringify(result.data));
            router.replace({
                name: 'Home',
                // query: { id_token: result.data.id_token },
            })
        } else {
            alert(result.message);
        }
        // 你也可以重定向到你的任意业务页面，比如重定向到用户的个人中心
        // 如果你希望实现登录后跳转到同一页面的效果，可以通过在调用 startWithRedirect 时传入的自定义 state 实现
        // 之后你在这些页面可以通过 trackSession 方法获取用户登录态和用户信息

        // 示例一：跳转到固定页面
        // router.replace({
        //     name: 'Personal'
        // })

        // 示例二：获取自定义 state，进行特定操作
        // const search = window.location.search
        // 从 URL search 中解析 state
    } catch (e) {
        // 登录失败，推荐再次跳转到登录页面
        console.error('Guard handleAuthingLoginCallback error: ', e)
    }
}

onMounted(() => {
    handleAuthingLoginCallback()
})
</script>