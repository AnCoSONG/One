import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        code: 0,
        message: 'ok',
        data: [123, 234],
      };
    },
  },
  {
    url: '/api/getAvatar',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        code: 0,
        message: 'ok',
        data: 'https://picsum.photos/200',
      };
    },
  },
  {
    url: '/api/getApps',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        code: 0,
        message: 'ok',
        data: (() => {
          let arr = []
          for(let i = 0; i < 100; i ++){
            arr.push({text: 'One Blog', src: '/src/assets/apps.svg'})
          }
          return arr
        })(),
      };
    },
  },
  
] as MockMethod[];