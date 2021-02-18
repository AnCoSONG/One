<template>
    <div class="article-app">
        <div class="article-content">
            <!-- article只包含header\main, main由md-article封装,本comp主要提供样式布局 -->
            <header class="top-header">
                <router-link class="back-to-home" to="/blog">
                    <span
                        style="font-size: 1.25em;color: rgb(180, 180, 180);margin-right: 6px; "
                    >&larr;</span>
                    <span style="font-size: 1em;letter-spacing: 0.1rem;">Blog</span>
                </router-link>
                <div class="title">{{ title }}</div>
                <div class="article-info">
                    <!-- author -->
                    <div class="author">{{ author }}</div>
                    <!-- date -->
                    <div class="date">{{ date }}</div>
                    <!-- count -->
                    <!-- <div class="count">{{ count }}</div> -->
                </div>
            </header>
            <main class="article-wrapper">
                <md-article :md="mdContent" v-if="loaded"></md-article>
                <div class="article-loading" v-else>
                    <div class="loading-icon"></div>
                    <div class="loading-text">Loading</div>
                </div>
            </main>
            <!-- 声明文章的版权归我所有，有限转载 -->
        </div>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import MdArticle from 'comps/blog/md-article.vue'
import { useAxios } from '../../plugins/axios-plugin'
import { useRoute } from 'vue-router'
//! UPDATE: 可以通过props = defineProps({...}) 来定义属性，没有任何问题
//! UPDATE: 使用aid拿到文章对象即可
const route = useRoute()
const id = route.params.aid
// console.log(id)
const axios = useAxios()
const loaded = ref(false)
const title = ref('')
const author = ref('')
const date = ref('')
const mdContent = ref('')
const loadArticle = async () => {
    const articleContent = (await axios.get(`/article/${id}`)).data as Article
    loaded.value = true
    title.value = articleContent.title
    author.value = articleContent.author
    date.value = articleContent.date
    mdContent.value = articleContent.content
}
onMounted(loadArticle)
//// 本来想在这个页面完整拿取数据，给md-article传参，但是新的script setup不知道为什么无法定义props
//// UPDATE：目前将md-article转换为普通的setup语法，貌似没有问题

</script>
<style scoped lang="scss">
.article-app {
    font-family: nunito, Helvetica, Arial, sans-serif;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    .article-content {
        width: 70%;
        max-width: 60rem;
        min-width: 320px;
        height: auto;
        padding-top: 2.5em;

        // background-color: bisque;

        @media screen and (max-width: 800px) {
            width: 100%;
        }

        .top-header {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 10px;
            .back-to-home {
                margin-bottom: 0.5rem;
                // text-align: left;
                align-self: flex-start;
                text-transform: uppercase;
                color: rgb(202, 202, 202);
                font-family: nunito, Helvetica, Arial, sans-serif;
                display: flex;
                cursor: pointer;
                align-items: center;
                text-decoration: none;

                &:hover {
                    text-decoration: none;
                }
            }

            .title {
                font-size: 2.75rem;
                font-weight: 700;
                color: #333;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                @media screen and (max-width: 800px) {
                    font-size: 2rem;
                }
            }

            .article-info {
                margin-top: 1.5em;
                // font-size: 1.06rem;
                color: rgba(128, 128, 128, 1);
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                // width: 80%;
                line-height: 1.5;
                margin-bottom: 1.5em;

                > * {
                    margin: 0 20px;
                }
            }
        }

        .article-wrapper {
            position: relative;
            .article-loading {
                min-height: 500px;
                overflow: hidden;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                .loading-icon {
                    background-size: contain;
                    background: url(../../assets/loading.svg) no-repeat center center;
                    // width: 128px;
                    width: 160px;
                    height: 128px;
                }
                
                .loading-text {
                    font-size: 20px;
                    font-weight: 700;
                    letter-spacing: 0.9px;
                }
            }
        }
    }
}
</style>