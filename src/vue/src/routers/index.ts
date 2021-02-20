import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'search',
            component: () => import('views/search.vue'),
            meta: {title: 'One 搜索'}
        },
        {
            path: '/test',
            name:'test',
            component: () => import('views/test.vue'),
            meta: {title: '测试'}
        },
        {
            path: '/blog',
            component: () => import('views/blog.vue'),
            meta: { title: 'One 博客'},
            children: [
                {path: '', name: 'blog', component: () => import('comps/blog/blog-home.vue')},
                {path: 'article/:aid',name: 'article', component: () => import('comps/blog/blog-article.vue')}
            ]
        },
        {
            // path: '/:\w+',
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('views/notfound.vue'),
            meta: {title: '您已失联~ ✈️'}
        }
    ],
    scrollBehavior: (to, from, savedPosition) => {
        return { left: 0, top: 0, behavior: 'smooth' }
    }
})

import NProgress from 'nprogress'
import 'styles/nprogress.scss'

NProgress.configure({easing: 'ease', speed: 500, showSpinner: false })

const defaultTitle = 'One应用'
router.beforeEach((to, from, next) => {
    // console.log(to, from)
    NProgress.start()
    document.title = to.meta.title ? to.meta.title : defaultTitle
    next()
})

router.afterEach((to, from) => {
    // console.log(to, from)
    NProgress.done()
})


export default router