# 文章存取逻辑

## 创建
前端需要通过input和FileReader拿到内容，根据情况将\\转义成\\\\后，包装成json提交到post接口即可。
在没有UI交互时，前端可以封装一个node.js脚本将数据发送到本接口

## 获取
1. 请求`article/:id`拿到id对应的文章`content`
2. 请求`article?pageNo={1}&pageSize={2}&query={3}`拿到文章列表数据,结构为
`{pageNo:..., pageSize: ..., total: ..., data: ... }`

## 更新
前端需要提供一个表单来更新

## 删除
删除功能需要权限验证（在用户、登录没有实现之前暂时不提供）