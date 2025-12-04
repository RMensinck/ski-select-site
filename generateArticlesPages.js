const fs = require('fs-extra')
const articlesData = require('./public/articles/articles.json')

fs.emptyDirSync('./pages/articles')

// Iterate over the articles object entries to get both slug and article data
Object.entries(articlesData).forEach(([articleSlug, article]) => {
    const articlePage =
        `import ArticleTemplate from '../../components/articleTemplate'

    export default function Article() {
        return ArticleTemplate("${articleSlug}")
    }`

    fs.writeFile(`./pages${article.href}.tsx`, articlePage, function (error) {
        if (error) throw error
    },)
})

