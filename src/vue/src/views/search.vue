<template>
    <!-- 页面的需求：中间搜索面板，找个地方放置其它正在开发的应用，提供账号系统 -->
    <!-- ONE SEARCH EVERY THING -->
    <div class="search-app" @click="isShowing = false" @keydown.enter="searchParams()" ref="searchApp">
        <nav class="right-nav">
            <div class="debug" v-if="dev" @click="debug=!debug">debug: {{debug?'✅':'❌'}}</div>
            <div class="apps-entry" :class="isShowing ? 'showing' : ''" @click.stop="toggleShowing">
                <!-- 点击显示所有apps -->
                <img class="entry-image" src="../assets/apps.svg" alt="apps" width="20" height="20" />
                <teleport to="body">
                    <ul class="apps-panel" v-if="isShowing">
                        <!-- 这里的appList应该是从数据库动态获取的，现在先写死 -->
                        <!-- <li v-show='false' class='app-item' v-for="(it, idx) in appList" :key="it+idx">
                            <img class='img' :src="it.src"/>
                            <span class='text'>{{it.text}}</span>
                        </li>-->
                        <!-- 暂时写死 -->
                        <li class="app-item" @click="routeTo('blog')">
                            <img src="../assets/blogger.svg" alt="博客" class="img" />
                            <span class="text">博客</span>
                        </li>
                        <li class="app-item">
                            <img src="../assets/chat.svg" alt="聊天" class="img" />
                            <span class="text">聊天</span>
                        </li>
                        <li class="app-item">
                            <img src="../assets/search.svg" alt="搜索" class="img" />
                            <span class="text">搜索</span>
                        </li>
                        <!-- 最后一个可以添加新的路由,方便到时候开发好了动态配置 -->
                        <li class="app-item">
                            <img src="../assets/add.svg" alt="添加" class="img" />
                            <span class="text">添加</span>
                        </li>
                    </ul>
                </teleport>
            </div>
            <div class="user-entry">
                <!-- 这里的逻辑是，没有账号的，显示“登录” 有账号的显示头像 -->
                <button class="btn-primary" @click="notsupport()">登录</button>
            </div>
        </nav>
        <main class="main-search">
            <div class="content-wrapper">
                <img
                    class
                    src="../assets/one.svg"
                    alt="logo"
                    height="196"
                    style="object-fit: contain"
                />
                <div
                    class="search-wrapper"
                    ref="searchBox"
                    :class="searchRecommandation.length !== 0 ? 'recommand' : ''"
                >
                    <div class="prefix"></div>
                    <input
                        v-model="queryStr"
                        type="text"
                        class="main-input"
                        :placeholder="searchPlaceholder"
                    />
                    <div class="suffix">
                        <div class="clearQuery" v-if="queryStr != ''" @click="clearQueryStr"></div>
                        <div class="vertical-line" v-if="queryStr != ''"></div>
                        <div class="voiceInput" @click="notsupport()"></div>
                    </div>
                </div>
                <div class="search-recommandations" v-if="searchRecommandation.length !== 0">
                    <div class="inner-content">
                        <div class="horizontal-divider"></div>
                        <ul class='rec-list'>
                            <li class="rec-item" v-for="(it, idx) in searchRecommandation" :key="it.toString()+idx">
                            <div class="item-content">
                                <div class="type-icon" :class="it.type"></div>
                                <div class="detail">{{it.content}}</div>
                                <div class="operands">
                                    <div class="operand" @click="notsupport()">删除</div>
                                </div>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="search-btns">
                    <button class="btn" @click="searchParams()">One 搜索</button>
                    <p
                        v-if="queryParams.type && debug"
                    >{{ queryParams?.type }}:{{ queryParams?.content }}</p>
                </div>
            </div>
        </main>
        <footer class="page-footer">
            <div class="footer-items-wrapper">
                <div class="footer-left-wrapper">
                    <a class="footer-item">One 应用</a>
                    <a class="footer-item">合作</a>
                    <a class="footer-item">One Search是如何进行搜索的?</a>
                </div>
                <div class="footer-right-wrapper">
                    <a class="footer-item">条款</a>
                    <span class="footer-item">设置</span>
                </div>
            </div>
        </footer>
    </div>
</template>
<script setup lang="ts">

import { reactive, readonly, ref, computed, onMounted, watch } from "vue";
import { openInNewPage } from "../utils/utils";
import { useStore } from "vuex";

// debug mode
const dev = ref(false)
const debug = ref(false)

// 动态控制高度
const searchApp = ref<HTMLElement|null>(null)
onMounted(() => {
    searchApp.value!.style.height = `${window.innerHeight}px`
    window.addEventListener('resize', () => {
        searchApp.value!.style.height = `${window.innerHeight}px`
    })
})

// 展示应用列表
const isShowing = ref(false);
const toggleShowing = () => {
    isShowing.value = !isShowing.value;
};

// const appList = readonly([
//     {text: 'ONE博客', src: blogImg },
//     {text: 'ONE随聊', src: chatImg },
//     {text: 'ONE搜', src: searchImg }
// ])

// 搜索
const searchBox = ref(null); // vue3中通过ref获取元素，创建一个和元素ref同名的对象，mount之后这个元素会被自动挂载
onMounted(() => {
    console.log(searchBox.value);
});
const searchPlaceholder = ref("支持指令搜索");
const updateSearchPlaceholder = (text: string) => {
    searchPlaceholder.value = text;
};

const searchState = useStore().state.search;
const defaultSearchEngine = computed(() => searchState.defaultSearchEngine);
const queryStr = ref("");

const clearQueryStr = () => {
    queryStr.value = "";
    updateSearchPlaceholder("支持指令搜索");
};

const queryParams = computed(
    (): QueryParam => {
        if (/^(google|gg) (.+)$/g.test(queryStr.value)) {
            return { type: "google", content: RegExp.$2 };
        } else if (/^(baidu|bd) (.+)$/g.test(queryStr.value)) {
            return { type: "baidu", content: RegExp.$2 };
        } else if (/^(wd) (\w+)$/g.test(queryStr.value)) {
            return { type: "wd", content: RegExp.$2 };
        } else if (/^(zh|zhihu) (.+)$/g.test(queryStr.value)) {
            return { type: "zhihu", content: RegExp.$2 };
        } else if (/^(.+) (.+)$/g.test(queryStr.value)) {
            return { type: RegExp.$1, content: RegExp.$2 };
        }

        return { content: queryStr.value };
    }
);

interface QueryParam {
    type?: string;
    subType?: string; // for supporting syntax like zhihu:people 张某
    content: string;
}
const searchParams = () => {
    if (queryParams.value) {
        const type = queryParams.value.type ?? null;
        const subType = queryParams.value.subType ?? null;
        const content = queryParams.value.content;

        function searchByGoogle(content: string) {
            const urlContent = encodeURIComponent(content);
            openInNewPage(`https://www.google.com/search?q=${urlContent}`);
        }

        function searchByBaidu(content: string) {
            const urlContent = encodeURIComponent(content);
            openInNewPage(`https://www.baidu.com/s?wd=${urlContent}`);
        }

        function searchByWebsterDictionary(content: string) {
            const urlContent = encodeURIComponent(content);
            openInNewPage(
                `https://www.learnersdictionary.com/definition/${urlContent}`
            );
        }

        function searchByZhihuContent(content: string) {
            const urlContent = encodeURIComponent(content);
            openInNewPage(
                `https://www.zhihu.com/search?q=${urlContent}&type=content`
            );
        }

        function searchByType(type: string, content: string) {
            switch (type) {
                case "google":
                    searchByGoogle(content);
                    break;
                case "baidu":
                    searchByBaidu(content);
                    break;
                case "wd":
                    searchByWebsterDictionary(content);
                    break;
                case "zhihu":
                    searchByZhihuContent(content);
                    break;
                default:
                    clearQueryStr();
                    updateSearchPlaceholder(`暂不支持${type}参数`);
                    break;
            }
        }
        if (type) {
            searchByType(type, content);
        } else {
            // 使用默认搜索引擎,后续可以做一个单独的页面展示整合搜索结果
            searchByType(defaultSearchEngine.value, content);
        }
    } else {
        updateSearchPlaceholder("请按规定输入参数");
    }
};
interface RecoType {
    type: string,
    content: string
}
const searchRecommandation = reactive<Array<RecoType>>([])


//* to-do
//* debounce化，使用localStorage记录搜索历史记录，并作为推荐依据
//* 完善搜索推荐操作逻辑
watch(queryStr, (newVal) => {
    if(newVal =='hello') {
        searchRecommandation.push({type: 'hist', content: 'data1'})
        searchRecommandation.push({type: 'reco', content: 'data2'})
    } else {
        searchRecommandation.length = 0;

    }
})

// 路由
import { useRouter } from 'vue-router'
const router = useRouter()
const routeTo = (name:string) => {
    // console.log(name, router)
    router.push({name})
}

//不支持 兜底
const notsupport = () => {
    alert('暂不支持')
}
</script>
<style lang="scss" scoped>
@import "styles/mixin.scss";
.search-app {
    // min-width: 350px;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .right-nav {
        align-self: flex-end;
        margin-right: 1.6rem;
        margin-top: 1rem;
        flex-grow: 0;
        display: flex;
        flex-shrink: 0;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > * {
            margin-left: 1rem;
        }
        .apps-entry {
            border-radius: 50%;
            height: 40px;
            cursor: pointer;
            width: 40px;
            transition: 0.3s background-color ease;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background-color: rgba(0, 0, 0, 0.12);
            }

            &.showing {
                background-color: rgba(0, 0, 0, 0.12);
            }
        }
    }
}

.apps-panel {
    overflow-x: hidden;
    width: 300px;
    position: absolute;
    top: 0;
    box-sizing: content-box;
    margin-top: calc(1rem + 40px + 20px);
    right: 0;
    margin-right: 1.6rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    // height: 448px;
    max-height: 448px;
    z-index: 999;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%),
        0 2px 6px 2px rgb(60 64 67 / 15%);
    @include scrollbar;
    width: 300px;
    padding: 0 0 0 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    
    // display: flex;
    // padding-left: 20px;
    // padding-right: 20px;
    // flex-wrap: wrap;
    li {
        cursor: pointer;
        list-style-type: none;
        width: 84px;
        height: 84px;
        padding: 6px;
        display: inline-block;
        position: relative;
        text-align: center;
        vertical-align: top;
        // margin-top: 3px;
        // margin-bottom: 3px;

        &:hover {
            background-color: rgba(171, 220, 240, 0.3);
            border-radius: 10px;
        }

        .img {
            transform: scale(calc(4 / 6));
            transition: 0.3s transform ease;
            display: inline-block;
            vertical-align: top;
            height: 64px;
            width: 64px;
        }

        .text {
            display: inline-block;
            width: 76px;
            letter-spacing: 0.09px;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 18px;
            white-space: nowrap;
            font-size: 14px;
        }
    }
}

.btn {
    background-color: #f8f9fa;
    color: #3c4043;
    // width: 64px;
    height: 36px;
    outline: none;
    border-radius: 6px;
    border: 1px solid #f8f9fa;
    cursor: pointer;
    margin: 11px 4px;
    line-height: 27px;
    text-align: center;
    min-width: 54px;
    font-size: 14px;
    padding: 0 16px;
    transition: 0.3s box-shadow ease;
    &:hover {
        // shadow
        box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }
}
.btn-primary {
    background-color: #2575ee;
    color: white;
    width: 56px;
    height: 36px;
    outline: none;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}

.main-search {
    display: flex;
    flex-grow: 1;
    width: 100%;
    padding: 0;
    // padding: 5px 8px 0px 16px;
    // padding-left: 14px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 60px;

    @media screen and (max-height: 569px) {
        padding-bottom: 0px;
    }

    .content-wrapper {
        position: relative;
        width: auto;

        .search-wrapper {
            width: calc(50vw);
            z-index: 3;
            max-width: 500px;
            min-width: 290px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            height: 42px;
            border-radius: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 4px;
            padding-left: 10px;
            padding-right: 10px;
            transition: 0.3s box-shadow ease;

            &.recommand {
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;
                box-shadow: 0 0px 4px rgb(32 33 36 / 28%);
                border: 0px solid rgba(0, 0, 0, 0.1)
            }
            
            &:hover {
                box-shadow: 0 0px 4px rgb(32 33 36 / 28%);
            }

            .prefix {
                margin-right: 6px;
                width: 24px;
                height: 24px;
                background: url(../assets/searchPrefix.svg) no-repeat center
                    center;
                background-size: contain;
            }
            .main-input {
                flex: 1;
                outline: none;
                border: none;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.8);

                &::-webkit-input-placeholder {
                    color: rgba(0, 0, 0, 0.4);
                }
                &::placeholder {
                    color: rgba(0, 0, 0, 0.4);
                }
            }
            .suffix {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                .clearQuery {
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    margin-left: 3px;
                    margin-right: 3px;
                    background: url(../assets/clear.svg) no-repeat center center;
                    background-size: contain;
                }

                .vertical-line {
                    width: 1px;
                    height: 20px;
                    background-color: rgba(0, 0, 0, 0.2);
                }
                .voiceInput {
                    width: 32px;
                    height: 32px;
                    margin-left: 3px;
                    margin-right: 3px;
                    background: url(../assets/microphone.svg) no-repeat center
                        center;
                    background-size: contain;
                }
            }
        }

        .search-recommandations {
            position: absolute;
            width: 100%;
            background-color: white;
            margin-top: -1px;

            .inner-content {
                text-align: left;
                box-shadow: 0 2px 4px rgb(32 33 36 / 28%);
                margin: 0;
                padding: 0;
                border: 0;
                border-radius: 0 0 20px 20px;
                padding-bottom: 4px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                list-style-type: none;
                z-index: 3;

                .horizontal-divider {
                    border-top: 1px solid #e8eaed;
                    margin: 0 20px 0 14px;
                    padding-bottom: 4px;
                }
                .rec-list {
                    list-style-type: none;
                    padding: 0;
                    padding-bottom: 8px;
                    // display: flex;
                    flex: auto;
                    margin: 0;
                    
                    .rec-item {
                        display: flex;
                        align-items: center;

                        &:hover {
                            background-color: #eee;
                        }
                        
                        .item-content {
                            display: flex;
                            flex:auto;
                            align-items: center;
                            margin: 0 20px 0 14px;

                            .type-icon {
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                background-color: #2575ee;
                                margin: 0 13px 0 1px;

                                &.hist {
                                    background: url(../assets/history.svg) no-repeat center center;
                                    background-size: contain;
                                }

                                &.reco {
                                    background: url(../assets/reco.svg) no-repeat center center;
                                    background-size: contain;
                                }
                            }
                            .detail {
                                padding: 6px 0px;
                                display: flex;
                                flex-direction: column;
                                flex: auto;
                            }
                            .operands {
                                align-self: stretch;
                                display: flex;

                                .operand {
                                    align-self: center;
                                    font-size: 14px;
                                    &:hover {
                                        text-decoration: underline;
                                        color: #2575ee;
                                        cursor: default;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .search-btns {
            z-index: -1;
            margin-top: 20px;
            height: 60px;
            width: 100%;
            padding-bottom:40px;
        }
    }
    // .main-input {
    //     width: 60%;
    //     min-width: 400px;
    //     border: 1px solid rgba(0,0,0,.06);
    //     // shadow
    //     height: 48px;
    //     border-radius: 16px;
    //     outline: none;
    // }
}

.page-footer {
    background-color: #eee;
    width: 100%;
    display: block;
    font-size: 14px;
    flex-shrink: 0;
    flex-grow: 0;
    color: #222;
    padding: 0 20px;
    box-sizing: border-box;
    // display:flex;
    // flex-direction: row;
    // justify-content: space-between;
    // align-items: center;

    .footer-items-wrapper {
        // padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        @media screen and (max-width: 600px) {
            justify-content: space-evenly;
        }
        .footer-left-wrapper {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
        }

        .footer-right-wrapper {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
        }

        .footer-item {
            cursor: pointer;
            color: #70757a;
            padding: 15px;
            font-size: 14px;
            white-space: nowrap;
            display: block;
            text-decoration: none;

            @media screen and (max-height: 569px) {
                padding: 8px;
            }
        }
        // height: 40px;
    }
}
</style>
