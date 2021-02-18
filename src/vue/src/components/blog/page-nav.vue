<template>
    <nav class="nav-wrapper">
        <div class="nav-content">
            <div class="right-nav">
                <div class="search-wrapper" :class="focusMode ? 'focus' : ''">
                    <div class="icon"></div>
                    <input
                        type="text"
                        v-model="queryStr"
                        @blur="doWhenQueryStrBlur()"
                        @focus="doWhenQueryStrFocus()"
                        class="search-input"
                        placeholder="search..."
                    />
                </div>
                <div class="user">
                    <button class="btn-blog">登录</button>
                </div>
            </div>
        </div>
    </nav>
</template>
<script setup lang='ts'>
import { defineProps, ref } from 'vue';

defineProps({
    queryStr: String
})
const focusMode = ref(false)
const doWhenQueryStrFocus = () => {
    focusMode.value = true
}

const doWhenQueryStrBlur = () => {
    focusMode.value = false
}
</script>
<style scoped lang="scss">
.nav-wrapper {
    width: 100%;
    // background-color: rgb(3, 218, 247);
    // border-bottom: 2px solid rgba(0,0,0,.1);
    // box-shadow: 0px 0px 4px 1px rgba(0,0,0,.2);
    padding: 0 20px;
    // background-color: rgba(0,0,0,.2);
    box-sizing: border-box;
    @media screen and (max-width: 800px) {
        padding: 0;
    }

    .nav-content {
        padding: 5px 0px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        .right-nav {
            display: flex;
            justify-content: center;
            align-items: center;

            > * {
                margin-left: 10px;
                margin-right: 10px;
            }
            .search-wrapper {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                position: relative;
                padding: 10px 0;
                border-bottom: 0px solid #333;
                transition: 0.3s border-bottom ease;

                &::after {
                    content: "";
                    height: 1px;
                    width: 0%;
                    background-color: #333;
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transition: 0.3s width ease-in-out;
                }

                &.focus::after {
                    width: 100%;
                }
                .icon {
                    width: 24px;
                    height: 24px;
                    background: url(../../assets/searchDarker.svg) no-repeat
                        center center;
                    background-size: contain;
                    margin-right: 3px;
                }

                .search-input {
                    margin-left: 3px;
                    // height: 28px;
                    font-size: 18px;
                    border: none;
                    color: #333;
                    outline: none;
                    width: 150px;
                    transition: 0.5s width ease-in-out;

                    @media screen and (max-width: 800px) {
                        width: 100px;
                    }

                    @media screen and (max-width: 600px) {
                        width: 0px;
                    }
                }
            }
        }
    }
}
</style>