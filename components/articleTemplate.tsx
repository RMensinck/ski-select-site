import Head from 'next/head'
import { useRouter } from 'next/router'
import articles from '../public/articles/articles.json'
import texts from '../texts/textsArticleTemplates'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Image from 'next/image';
import Card from '@/components/Card';

declare function gtag(...args: any[]): void;

export default function ArticleTemplate(articleSlug: string) {
  const router = useRouter()
  const { locale } = router
  const article = articles[articleSlug]

  // Initialize content
  const [shownContent, setShownContent] = useState(() => {
    return article.reviews?.[locale] || article.reviews?.[article.originalLanguage]
  })

  const [showLanguageDisclaimer, setShowLanguageDisclaimer] = useState(
    !article.reviews?.[locale] && locale !== article.originalLanguage
  )

  useEffect(() => {
    gtag('event', `article ${articleSlug} loaded`)
  }, [])

  return (
    <>
      <Head>
        <title>{article.meta_titles[locale] || article.meta_titles[article.originalLanguage]}</title>
        <meta name="description" content={article.meta_descriptions[locale] || article.meta_descriptions[article.originalLanguage]} />
      </Head>

      <div className="px-6 py-8 sm:py-32 lg:px-8">
        <Card className="mx-auto maw-w-6xl">
          <div className="mx-auto max-w-3xl text-base leading-7 text-text-muted">
            <Image
              src="/images/banner-4.jpeg"
              alt="Beautiful ski area view"
              width="486"
              height="220"
              className=" object-cover mb-6 rounded-2xl w-full max-h-28 sm:hidden"
            />
            <div className="flex mb-6">
              <img src={article.authorPicture} alt={`A Photo of ${article.author}`} className="mr-4 h-10 w-10 rounded-full bg-bg" />
              <p className=" self-center text-base font-semibold leading-7 text-accent-color">{texts.writtenBy[locale] + " " + article.author}</p>
            </div>
            {showLanguageDisclaimer && (
              <div className="mb-4 rounded-md bg-yellow-50 p-4">
                <p className="text-sm text-yellow-700">
                  This article is not available in your language. Showing original version.
                </p>
              </div>
            )}
            <ReactMarkdown
              remarkPlugins={[gfm]}
              components={{
                h1: ({ node, ...props }) => <h1 {...props} className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl" />,
                h2: ({ node, ...props }) => <h2 {...props} className="mt-16 text-2xl font-bold tracking-tight text-text" />,
                h3: ({ node, ...props }) => <h3 {...props} className="mt-6 text-xl font-bold tracking-tight text-text" />,
                h4: ({ node, ...props }) => <h4 {...props} className="mt-6 text-lg font-bold tracking-tight text-text" />,
                a: ({ node, ...props }) => <a {...props} className="text-accent-color" />,
                p: ({ node, ...props }) => <p {...props} className="mt-6 text-lg leading-8 text-text-muted" />,
                table: ({ node, ...props }) => <table {...props} className="mt-6 min-w-full divide-y divide-gray-300" />,
                th: ({ node, ...props }) => <th {...props} className="px-3 py-3.5 text-left text-sm font-semibold text-text" />,
                td: ({ node, ...props }) => <td {...props} className="whitespace-nowrap px-3 py-4 text-sm text-text-muted" />,
                tbody: ({ node, ...props }) => <tbody {...props} className="divide-y divide-gray-200" />,
                img: ({ node, ...props }) => <img {...props} className="mt-6 rounded-2xl" />,
                ul: ({ node, ...props }) => <ul {...props} className=" list-disc pl-6" />,
                li: ({ node, ...props }) => <li {...props} className="mt-2 text-lg leading-8 text-text-muted" />,
              }}
            >
              {shownContent}
            </ReactMarkdown>
          </div>
        </Card>
      </div>
    </>
  )
}
