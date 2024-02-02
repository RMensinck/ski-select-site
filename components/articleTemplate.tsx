import Head from 'next/head'
import { useRouter } from 'next/router'
import articles from '../public/articles/articles.json'
import texts from '../texts/textsArticleTemplates'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

declare function gtag(...args: any[]): void;

export default function ArticleTemplate(articleHref) {
 
  const router = useRouter()
  const { locale } = router 
  const article = articles.find(x => x.href === articleHref)
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {

    fetch('/api/articles?articleFileName=' + article.textFileName[locale])
      .then(response => response.json())
      .then(data => {
        setMarkdownContent(data.data)
      });
  }, []);

  useEffect(() => {
    gtag('event', `article ${articleHref} loaded`)
  }, [])

  return (
    <>
      <Head>
        <title>{article.title[locale]}</title>
        <meta name="description" content={article.metaDescription[locale]}/>
      </Head>

      <div className="bg-white px-6 py-8 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <img src="/images/banner-4.jpeg" alt="Beautiful ski area view" className=" object-cover mb-6 rounded-2xl w-full max-h-28 sm:hidden"/>
          <div className="flex mb-6">
            <img src={article.author.imageUrl} alt={`A Photo of ${article.author.name}`} className="mr-4 h-10 w-10 rounded-full bg-gray-50" />
            <p className=" self-center text-base font-semibold leading-7 text-accent-color">{texts.writtenBy[locale] + " " + article.author.name}</p>
          </div>
          <ReactMarkdown
            remarkPlugins={[gfm]}
            components={{
              h1: ({node, ...props}) => <h1 {...props} className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" />,
              h2: ({node, ...props}) => <h2 {...props} className="mt-16 text-2xl font-bold tracking-tight text-gray-900" />,
              a: ({node, ...props}) => <a {...props} className="text-3xl font-bold text-blue-500" />,
              p: ({node, ...props}) => <p {...props} className="mt-6 text-lg leading-8 text-gray-600" />,
              table: ({node, ...props}) => <table {...props} className="mt-6 min-w-full divide-y divide-gray-300" />,
              th: ({node, ...props}) => <th {...props} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" />,
              td: ({node, ...props}) => <td {...props} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" />,
              tbody: ({node, ...props}) => <tbody {...props} className="divide-y divide-gray-200" />,
              img: ({node, ...props}) => <img {...props} className="mt-6 rounded-2xl" />,
            }}
            >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
      

    </>
  )  
}

