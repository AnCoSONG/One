import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import { vueAxios } from './plugins/axios-plugin'
import ElementPlus from './plugins/element-plus'
// import { ElPagination } from 'element-plus'
// import 'element-plus/lib/theme-chalk/el-pagination.css'

// 全局样式
import 'styles/index.scss'

createApp(App).use(router).use(store).use(vueAxios).use(ElementPlus).mount('#app')
