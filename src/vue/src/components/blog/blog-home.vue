<template>
    <div class="blog-home">
        <page-nav :queryStr="query"></page-nav>
        <main class="main-wrapper">
            <div class="main-content">
                <div class="title-proverb">
                    <!-- blog title -->
                    <div class="title">Blog</div>
                    <!-- blog proverb -->
                    <div class="proverb">
                        <!-- <span class="left-quote">“</span> -->
                        <em class="proverb-content">{{ randomProverb }}</em>
                        <!-- <span class="right-quote">”</span> -->
                    </div>
                </div>
                <div class="articles" v-if="articles.length > 0">
                    <div
                        class="article-card"
                        v-for="(it,idx) in articles"
                        :key="it._id"
                        @click="showArticle(it._id)"
                    >
                        <div class="title">{{ it.title }}</div>
                        <div class="date">{{ it.date }}</div>
                        <div class="content">{{ it.preface }}</div>
                    </div>
                </div>
                <div class="no-articles" v-else>
                    <!-- icon + text -->
                    <div class="no-data-icon"></div>
                    <div class="no-data-text">正在载入</div>
                </div>
                <!-- <div class="loading-articles" v-else>
                    <div class="loading-icon"></div>
                    <div class="loading-text">Loading</div>
                </div> -->
                <div class="pagination">
                    <el-pagination
                        hide-on-single-page
                        layout="prev, pager, next"
                        :current-page="pageNo"
                        @current-change="handleCurrentPage"
                        :page-size="pageSize"
                        :total="totalNumber"
                    ></el-pagination>
                </div>
                <!-- todo: blog content page(5~10) -->
                <!-- todo: pager -->
            </div>
        </main>
    </div>
</template>
<script setup lang='ts'>
import { computed, onBeforeMount, onMounted, reactive, ref, toRefs, watch, watchEffect } from 'vue';
// import PageFooter from 'comps/blog/page-footer.vue'
import PageNav from 'comps/blog/page-nav.vue'
import { useRouter } from 'vue-router'
import { useAxios } from '../../plugins/axios-plugin'
import { useStore } from 'vuex'
import NProgress from 'nprogress'
const axios = useAxios()
const router = useRouter()
const store = useStore()
const randomProverb = ref('Everything not kills me make me feel alive')

//* 从后端拿到文章列表对象
const articles = ref<Array<Article>>([])
const pageNo = ref(1)
const pageSize = ref(5)
const totalNumber = ref(0)
const query = ref('')
const queryString = computed(() => {
    let queryStr = `/article?pageNo=${pageNo.value}&pageSize=${pageSize.value}`
    if (query.value !== '') {
        const temp = encodeURIComponent(query.value)
        queryStr += `&query=${temp}`
    }
    return queryStr
})

const updateArticleList = async () => {
    //* 展示articles
    console.log(queryString.value)
    NProgress.start()
    const res = (await axios.get(queryString.value)).data as ArticleListDto
    const data = res.data
    pageNo.value = res.pageNo
    pageSize.value = res.pageSize
    totalNumber.value = res.total
    articles.value.length = 0
    articles.value.push(...data)
    NProgress.done()
}
onBeforeMount(updateArticleList) // async component
watch([pageNo, pageSize, query], updateArticleList);
const handleCurrentPage = (val: any) => {
    console.log(`第${val}页`)
    pageNo.value = val
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
}

const showArticle = (id: string): void => {
    router.push({ name: 'article', params: { aid: id } })
}

//todo: 前后端实现随机格言(支持显示出处)
</script>
<style lang="scss">
.blog-app {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;

    .main-wrapper {
        // background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        margin: 20px 0px;
        padding: 20px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;

        .main-content {
            // min-height: calc(60vh);
            width: 70%;
            min-width: 300px;
            max-width: 660px;

            @media screen and (max-width: 500px) {
                width: 100%;
            }

            .title-proverb {
                // position: sticky;
                // top: 0px;
                position: relative;
                // padding: 20px 0;
                // box-sizing: border-box;
                // background-color: white;

                .title {
                    font-family: nunito, Helvetica, Arial, sans-serif;
                    cursor: pointer;
                    font-size: 2em;
                    font-weight: 700;
                    margin-block-end: 0.85em;
                    margin-block-start: 0.85em;
                }

                .proverb {
                    font-family: nunito, Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    color: #333333ad;
                    pointer-events: none;
                    padding: 0 20px;
                    position: relative;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    .proverb-content {
                        // quotes: "“" "„" "‘" "‚";
                        position: relative;
                        line-height: 30px;

                        // &::before {
                        //     content: open-quote;
                        // }

                        // &::after {
                        //     content: close-quote;
                        // }
                    }
                }
            }

            .no-articles {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 300px;

                .no-data-icon {
                    background: url(../../assets/nodata.svg) no-repeat center
                        center;
                    background-size: contain;
                    height: 150px;
                    width: 150px;
                    box-sizing: border-box;
                }

                .no-data-text {
                    font-size: 14px;
                    font-weight: 400;
                    color: #444;
                }
            }
            .articles {
                width: 100%;
                margin-top: 2.5rem;
                margin-bottom: 2.5rem;
                .article-card {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    border-radius: 0px;
                    background-color: white;
                    border-bottom: 1px solid rgba(224, 224, 224, 0.25);
                    box-sizing: border-box;
                    transition: 0.3s box-shadow ease-in-out;
                    padding: 2.5rem;
                    width: 100%;
                    height: auto;
                    text-align: left;
                    font-family: nunito, Helvetica, Arial, sans-serif;
                    cursor: pointer;
                    &:hover {
                        border-radius: 8px;
                        box-shadow: 0px 6px 12px 2px rgba(0, 0, 0, 0.1);
                    }

                    .title {
                        margin-bottom: 5px;
                        font-size: 24px;
                        font-weight: 700;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .date {
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgb(143, 142, 142);
                    }
                    .content {
                        color: rgba(172, 172, 172, 0.596);
                        font-size: 14px;
                        font-weight: 700;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

            .loading-articles {
                height: 500px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .loading-icon {
                    width: 160px;
                    height: 128px;
                    background: url(../../assets/loading.svg) no-repeat center center;
                    background-size: contain;
                }
            }

            .pagination {
                // margin-top: 10px;
                .el-pagination {
                    .el-pager {
                        font-family: nunito, Helvetica, Arial, sans-serif;
                        li.active,
                        li:hover {
                            color: #3281db !important;
                        }
                    }
                }
            }
        }
    }
}
</style>