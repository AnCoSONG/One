<template>
    <div class="view-404">
        <div>🛰️</div>
        <div>您已失联</div>
        <button class="btn" @click="router.replace({name:'search'})">请求返航</button>
    </div>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style scoped lang="scss">
.view-404 {
    width: 100%;
    height: calc(100vh);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
}

</style>