<template>
    <div class="blog-app">
        <Suspense>
            <router-view />
        </Suspense>
        <page-footer></page-footer>
    </div>
</template>
<script setup lang='ts'>
import PageFooter from 'comps/blog/page-footer.vue'

</script>
<style lang="scss">
.blog-app {
    z-index: 1;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
}

.btn-blog {
    // background-color: transparent;
    background-color: white;
    color: #3c4043;
    // width: 64px;
    height: 36px;
    outline: none;
    border-radius: 6px;
    border: 1px solid #333;
    cursor: pointer;
    margin: 11px 4px;
    line-height: 27px;
    text-align: center;
    min-width: 54px;
    font-size: 14px;
    padding: 0 16px;
    transition: 0.3s box-shadow ease;
    &:hover {
        box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
    }
}
</style>