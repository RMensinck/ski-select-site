const fs = require('fs-extra')
const articles = require('./public/articles/articles.json')


fs.emptyDirSync('./pages/articles')

articles.map((article, index) => {
    const articlePage = 
    `import ArticleTemplate from '../../components/articleTemplate'

    export default function Article() {
        return ArticleTemplate("${article.href}")
    }`

    fs.writeFile(`./pages${article.href}.tsx`, articlePage, function(error) {
        if (error) throw error
    }, )
})

