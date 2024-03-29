import { createStore } from 'vuex'
 
export default createStore({
  //数据，相当于data
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) ||null, // 初始信息,因为这SB vuex框架是内存的,刷新就没了,所以要先从缓存里读出来
  },
  getters: {
    
  },
  //里面定义方法，操作state方发
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo; // 更新用户信息
    },
  },
  // 操作异步操作mutation
  actions: {
    async fetchUserInfo({ commit }) {
      const urlParams = new URLSearchParams(window.location.search);
      let token = urlParams.get('id_token');
      if (!token) {
        const info = localStorage.getItem('userInfo');
        const parsedInfo = JSON.parse(info); // Convert JSON string to object
        token = parsedInfo ? parsedInfo.id_token : null;
        
      }
      // console.log('开始请求用户信息')
      const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/user_info`, {
        headers: token ? { 'Authorization': `${token}` } : {}
      }); // 调用 API 获取用户信息
      // console.log('开始结束')
      const result = await response.json();
      if(result.code === 0) {
        commit('SET_USER_INFO', result.data); // 使用 mutation 更新用户信息
        localStorage.setItem('userInfo', JSON.stringify(result.data)); // 将用户信息保存到本地存储中
      }
    },
  },
  modules: {
    
  },

})