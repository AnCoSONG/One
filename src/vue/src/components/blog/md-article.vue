<template>
    <!-- markdown article component -->
    <!-- 1. marked 解析 -->
    <!-- 2. dom purify 防止xss攻击 -->
    <!-- 3. auto-render 数学公式渲染 -->
    <!-- 本组件只负责markdown文件的解析和渲染展示 -->
    <div class="md-article-comp">
        <main class="markdown-body" v-html="cleanHtml"></main>
    </div>
</template>
<script setup lang='ts'>
import marked from 'marked'
import DOMPurify from 'dompurify'
import katex from 'katex'
import { computed, onMounted, defineProps,toRef } from 'vue';
// import { md } from './temp'
import renderMathInElement from 'katex/dist/contrib/auto-render';


//// 根据article id拿到文章详细
// 通过props拿到原始md，进行处理
//! MD必须要将\转换为\\，即'\\\\'防止之后无法渲染
const props = defineProps({
    md: String // vue3 setup的props定义方式
})
const md = toRef(props, 'md')
const cleanHtml = computed(() => {
    if (md.value) {
        return DOMPurify.sanitize(marked(md.value))
    } else {
        return '<em>MD is NULL!<em>'
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
            { left: "\\[", right: "\\]", display: true }
        ]
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
    }

    @include md-font;
}
</style>