<template>
    <footer class="footer-wrapper">
        <div class="footer-content">
            <!-- center footer -->
            <div class="center-footer">
                <div class="footer-item">
                    <router-link class="text" to="/">搜索</router-link>
                    <span class="dot">・</span>
                </div>
                <div class="footer-item">
                    <router-link class="text" to="/blog">博客</router-link>
                    <span class="dot">・</span>
                </div>
                <div class="footer-item">
                    <a class="text">聊天</a>
                    <span class="dot">・</span>
                </div>
                <div class="footer-item">
                    <a class="text">关于我</a>
                </div>
            </div>
            <div class="center-footer">
                <div class="footer-item">
                    <a class="text">条款</a>
                    <span class="dot">・</span>
                </div>
                <div class="footer-item">
                    <a class="text">隐私权</a>
                </div>
            </div>
            <!-- footer padding -->
        </div>
    </footer>
</template>
<script setup lang='ts'>

</script>
<style lang="scss" scoped>
.footer-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    padding-top: 40px;
    padding-bottom: 100px;
    box-sizing: border-box;
    .footer-content {
        width: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .center-footer {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-bottom: 8px;
            font-family: nunito, "yt", sans-serif;

            .footer-item {
                color: #3281db;
                font-size: 0.875rem;

                .text {
                    margin-left: 5px;
                    color: #3281db;
                    text-decoration: none;
                    position: relative;
                    transition: 0.3s color ease-in-out;
                    &::after {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        width: 0;
                        height: 1px;
                        transition: 0.3s width ease-in-out;
                        left: 0;
                        background-color: #3281db;
                    }

                    &:hover {
                        // color:rgb(22, 72, 129);

                        &::after {
                            width: 100%;
                        }
                    }
                    // margin-right: 10px;
                }

                .dot {
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>