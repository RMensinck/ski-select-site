import ArticleTemplate from '../../components/articleTemplate'
    import articles from '../../public/articles/articles.json'

    export default function Article({ article }) {
        return ArticleTemplate("/articles/ultimate-guide-rocker-camber-ski-fit", article)
    }
    export async function getServerSideProps(context) {
        const { locale } = context
        const article = articles.find(x => x.href === "/articles/ultimate-guide-rocker-camber-ski-fit")
        const response = await fetch(`https://pick-a-ski.com/api/articles?articleFileName=${article.textFileName[locale]}`)
        const data = await response.json()
    
        return { props: { article: data.data } }
    }