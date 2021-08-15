import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import { vueAxios } from './plugins/axios-plugin'
import ElementPlus from './plugins/element-plus'
import hljs from "highlight.js"
import "highlight.js/styles/github-gist.css"
// import { ElPagination } from 'element-plus'
// import 'element-plus/lib/theme-chalk/el-pagination.css'

// 全局样式
import 'styles/index.scss'

const app = createApp(App)
app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: any) => {
        hljs.highlightBlock(block)
    })
})
app.use(router).use(store).use(vueAxios).use(ElementPlus).mount('#app')
