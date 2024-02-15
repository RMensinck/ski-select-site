import ArticleTemplate from '../../components/articleTemplate'
    import articles from '../../public/articles/articles.json'

    export default function Article({ article }) {
        return ArticleTemplate("/articles/top-5-freeride-skis-2024", article)
    }
    export async function getServerSideProps(context) {
        const { locale } = context
        const article = articles.find(x => x.href === "/articles/top-5-freeride-skis-2024")
        const response = await fetch(`https://pick-a-ski.com/api/articles?articleFileName=${article.textFileName[locale]}`)
        const data = await response.json()
    
        return { props: { article: data.data } }
    }