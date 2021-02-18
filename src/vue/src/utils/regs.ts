// 正则
export function matchGoogleQuery (src:string):Object|false {
    if (/^(google|gg) (.+)$/g.test(src)) {
        return {type: 'google', content: RegExp.$2}
    }
    return false
}

export function matchBaiduQuery (src:string):{}|null {
    if (/^(baidu|bd) (.+)$/g.test(src)) {
        return {type: 'baidu', content: RegExp.$2}
    }
    return false
}