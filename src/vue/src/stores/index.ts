import { createStore } from 'vuex'
import { md } from './temp'

const store = createStore({
    modules: {
        test: {
            state: {
                counter: 0
            },
            mutations: {
                increment(state) {
                    state.counter ++
                }
            }
        },
        search: {
            state: {
                defaultSearchEngine: 'google'
            },
            mutations: {
                
            }
        },
        blog: {
            state: {
                //* 如何请求文章？
                //* 我请求aid=1的文章，点击相应文章之后，可以拿到点击的aid
                //* 拿到aid之后，请求文章，拿到文章后缓存在state，然后路由到文章渲染页面，渲染页面默认读取article.content即可渲染出效果
                //* article: {aid: 1, title: '', date: '', author: '', reads:'', content: '...'}
                article: {
                    aid: 1,
                    title: 'Transformer:神经网络的破局者',
                    date: 'Feburary 12, 2021',
                    author: 'Justin',
                    content: md
                },
                articles: {}, // cache all articles here
            },
            mutations: {
                pushArticles(state, payload:Array<Article>) {
                    for(let i of payload) {
                        const {_id, ...res} = i
                        console.log(_id, res)
                        if (!state.articles.hasOwnProperty(_id)) {
                            state.articles[_id] = res
                        } else {
                            console.log(_id, '已缓存')
                        }
                    }
                }
            },
            actions: {

            }
        }
    }
})

export default store