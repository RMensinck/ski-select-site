import articles from '../public/articles/articles.json'
import texts from '../texts/textsBlog'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Card from '@/components/Card'
import { extractH1 } from '../utils/markdown'
import Image from 'next/image'

export default function Blog() {
  const router = useRouter()
  const { locale } = router

  // Convert object to array and sort by date
  const articlesArray = Object.keys(articles).map(slug => ({
    slug,
    ...articles[slug]
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]} />
      </Head>
      <div className="py-4 px-2">
        <Card className="p-0 py-8 mx-auto lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{texts.title[locale]}</h1>
              <p className="mt-2 text-lg leading-8 text-text-muted">
                {texts.body[locale]}
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {articlesArray.map((article) => {
                const markdown = article.articles[locale] || article.articles[article.originalLanguage];
                const title = extractH1(markdown) || article.meta_titles[locale] || article.meta_titles[article.originalLanguage];

                return (
                  <Card key={article.slug} className="bg-bg-light my-0 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
                    <article className="flex flex-col items-start justify-between">
                      <div className="max-w-xl">
                        <div className="flex items-center gap-x-4 text-xs">
                          <time dateTime={article.date} className="text-text-muted">
                            {article.date}
                          </time>

                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-text group-hover:text-text-muted">
                            <Link href={article.href}>
                              <span className="absolute inset-0" />
                              {title}
                            </Link>
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm leading-6 text-text-muted">{article.meta_descriptions[locale] || article.meta_descriptions[article.originalLanguage]}</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4">
                          <div className="mr-4 h-10 w-10 rounded-full bg-bg-light overflow-hidden flex-shrink-0">
                            <Image
                              src={article.authorPicture}
                              alt={`A Photo of ${article.author}`}
                              className="h-full w-full object-cover"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <p className="font-semibold text-text">
                              <Link href={article.href}>
                                <span className="absolute inset-0" />
                                {article.author}
                              </Link>
                            </p>
                            <p className="text-text-muted">{article.authorInfo}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Card>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
