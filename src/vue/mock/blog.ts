import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: '/api/article',
        method: 'get',
        response: ({ body }) => {
          console.log('body>>>>>>>>', body);
          return {
            code: 0,
            message: 'ok',
            data: `# 书目

            - 白帽子与Web安全
            - 推荐系统实践
            - 乌合之众
            
            > 黑亮
            \`\`\`js
            console.log(abc)
            abc
            \`\`\`
            
            #### 嘿嘿
            
            $$abc$$
            
            根据公式$\\sum_{a}^{n}\\frac{1}{a^n}$`
          };
        },
      },
]