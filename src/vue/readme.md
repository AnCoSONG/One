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