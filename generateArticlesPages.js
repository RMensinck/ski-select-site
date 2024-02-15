const fs = require('fs-extra')
const articles = require('./public/articles/articles.json')


fs.emptyDirSync('./pages/articles')

articles.map((article, index) => {
    const articlePage = 
    `import ArticleTemplate from '../../components/articleTemplate'
    import articles from '../../public/articles/articles.json'

    export default function Article({ article }) {
        return ArticleTemplate("${article.href}", article)
    }
    export async function getServerSideProps(context) {
        const { locale } = context
        const article = articles.find(x => x.href === "${article.href}")
        const response = await fetch(\`https://pick-a-ski.com/api/articles?articleFileName=\${article.textFileName[locale]}\`)
        const data = await response.json()
    
        return { props: { article: data.data } }
    }`

    fs.writeFile(`./pages${article.href}.tsx`, articlePage, function(error) {
        if (error) throw error
    }, )
})

