# Vite Demo

## Installation Process

```shell
npm init @vitejs/app vitedemo
# follow the prompts.
#! choose vue-ts.

# add cross-env
yarn add cross-env -D 
# change dev srcipts to `cross-env NODE_ENV=development vite`

# mock data
yarn add vite-plugin-mock -D && yarn add mockjs -S

# add vue-router and vuex
yarn add vue-router@next vuex@next -S

`main.ts`
createApp(App).use(router).use(store).mount('#app')
```

## To-dos
- [x] 合理使用状态管理
- [x] 完成指令搜索功能
- [x] 完善搜索界面
- [x] 完成博客界面
  - [x] 完成detail页面(markdown support)
  - [ ] 完善界面
- [ ] 逻辑
  - [x] 文章数据
  - [x] 文章上传逻辑：如何更新文章，删除文章？通过cli上传，更新(还未做)，删除(暂无权限管理)
  - [x] 文章展示逻辑? 首先请求文章列表，文章列表带query请求，自动分页，通过文章的aid请求文章详情，marked自动解析markdown，github样式 
- [ ] 完成SSO单点登录
- [ ] 鉴权等
- [ ] 文章页面下需要版权和转载声明
- [ ] 多篇文章浏览：next prev
- [x] 没有该文章自动导航到404
- [ ] marked解析markdown tasklist会保留marker标记，想办法去除(marked.use?更改外部css属性？)
- [ ] markdown内a标签锚点跳转平滑（onMounted内劫持所有锚点a标签）
- [ ] markdown视频小尺寸下会超出，需要设置markdown-body video {max-width: 100%}
- [ ] 多行公式无法渲染（非katex问题）
- [ ] 文章标签功能
- [ ] 登录功能