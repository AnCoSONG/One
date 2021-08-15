<template>
    <!-- markdown article component -->
    <!-- 1. marked 解析 -->
    <!-- 2. dom purify 防止xss攻击 -->
    <!-- 3. auto-render 数学公式渲染 -->
    <!-- 本组件只负责markdown文件的解析和渲染展示 -->
    <div class="md-article-comp">
        <main class="markdown-body" v-html="cleanHtml" v-highlight></main>
    </div>
</template>
<script setup lang='ts'>
import marked from 'marked'
import hljs from "highlight.js"
import DOMPurify from 'dompurify'
import { useRouter } from 'vue-router'
import katex from 'katex'
import { computed, onMounted, defineProps, toRef } from 'vue';
// import { md } from './temp'
import renderMathInElement from 'katex/dist/contrib/auto-render';
const router = useRouter()


//// 根据article id拿到文章详细
// 通过props拿到原始md，进行处理
//! MD必须要将\转换为\\，即'\\\\'防止之后无法渲染
const props = defineProps({
    md: String // vue3 setup的props定义方式
})
const md = toRef(props, 'md')
// marked.setOptions({
//     renderer: new marked.Renderer(),
//     highlight: function(code) {
//         // console.log(hljs.highlightAuto(code).value)
//         // return hljs.highlightAuto(code).value
//     },
// })

const cleanHtml = computed(() => {
    if (md.value) {
        // console.log(md.value)
        return DOMPurify.sanitize(marked(md.value))
    } else {
        router.push({ name: '404', query: { backName: 'blog' } })
        return '';
        // return `<div style="width:100%;height: 300px;display: flex; justify-content: center; align-items: center;flex-direction: column;">
        //     <div class="no-data" style="margin-bottom:10px;"></div>
        //     <em style="font-size:20px; font-weight: 400;margin-bottom:10px;">文档已被移除</em>
        //     <a href="/blog" style="text-decoration:none; border:1px solid #2886f1;border-radius:6px;width:100px;text-align:center;line-height:30px;">返回</a>
        // <div>`
    }
})
//! 再次强调，读入的markdown文件必须将斜杠转换为\\才行
//mounted 之后调用auto-render渲染公式
onMounted(() => renderMathInElement(document.querySelector('.markdown-body') as HTMLElement,
    {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
        ],
        // preProcess(math:string) {
        //     //! 这里表明解析时双斜杠会自动转义为单斜杠
        //     //! 因此对全文的单斜杠转换为双斜杠是可行的！
        //     console.log(math)
        //     return math;
        // }
    }))
</script>
<style lang="scss">
@import "styles/md.scss";

.md-article-comp {
    padding: 0 10px;
    margin-bottom: 2.5rem;
    margin-top: 1.5rem;
    .markdown-body {
        text-align: left;
        font-family: nunito, Helvetica, Arial, sans-serif;

        .no-data {
            background: url(../../assets/nodata.svg) no-repeat center center;
            background-size: contain;
            height: 120px;
            width: 160px;
        }

        span.katex {
            overflow: auto hidden;
        }
    }

    @include md-font;
}
</style>