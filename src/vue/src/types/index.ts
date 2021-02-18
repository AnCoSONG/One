declare interface Article {
    _id: string,
    title: string,
    author: string,
    date: string,
    preface: string,
    content: string
}

declare interface ArticleListDto {
    pageNo: number,
    pageSize: number,
    total: number,
    data: [Article]
}