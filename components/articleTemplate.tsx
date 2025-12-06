import Head from 'next/head'
import { useRouter } from 'next/router'
import articles from '../public/articles/articles.json'
import texts from '../texts/textsArticleTemplates'
import affiliateTexts from '../texts/textsAffiliateCard'
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Image from 'next/image';
import Card from '@/components/Card';
import AffiliateCard from '@/components/AffiliateCard';

declare function gtag(...args: any[]): void;

import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebaseConfig'

export default function ArticleTemplate(articleSlug: string) {
  const router = useRouter()
  const { locale } = router
  const article = articles[articleSlug]

  // Initialize content
  const [shownContent, setShownContent] = useState(() => {
    return article.articles?.[locale] || article?.articles[article.originalLanguage]
  })

  useEffect(() => {
    gtag('event', `article ${articleSlug} loaded`)
  }, [])

  const trackAffiliateClick = async () => {
    try {
      const clickData = {
        timestamp: new Date(),
        path: router.asPath,
        locale: locale,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent
      }

      const affiliateRef = doc(db, 'affiliate clicks', 'clipstic')
      await updateDoc(affiliateRef, {
        clicks: arrayUnion(clickData)
      })

      gtag('event', 'affiliate_click', {
        'event_category': 'affiliate',
        'event_label': 'clipstic',
        'value': 1
      })
    } catch (error) {
      console.error('Error tracking affiliate click:', error)
    }
  }

  return (
    <>
      <Head>
        <title>{article.meta_titles[locale]}</title>
        <meta name="description" content={article.meta_descriptions[locale]} />
      </Head>

      <div className="px-6 py-8 sm:py-32 lg:px-8">
        <Card className="mx-auto maw-w-6xl">
          <div className="mx-auto max-w-3xl text-base leading-7 text-text-muted">
            <div className="flex mb-6">
              <div className="mr-4 h-10 w-10 rounded-full bg-bg-light overflow-hidden flex-shrink-0">
                <Image
                  src={article.authorPicture}
                  alt={`A Photo of ${article.author}`}
                  className="h-full w-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <p className=" self-center text-base font-semibold leading-7 text-accent-color">{texts.writtenBy[locale] + " " + article.author}</p>
            </div>
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

            {/* Affiliate Product Promotion */}
            <AffiliateCard
              productName={affiliateTexts.productName[locale]}
              description={affiliateTexts.description[locale]}
              affiliateUrl="https://25553a.myshopify.com?ref=4Io7TnpszTD5&mid=205&d=UE9QRkxZQkZBOEMyQUY="
              imageUrl="/brands/affiliates/clipstic2.webp"
              ctaText={affiliateTexts.ctaText[locale]}
              badgeText={affiliateTexts.badgeText[locale]}
              disclaimer=""
              onClick={trackAffiliateClick}
            />
          </div>
        </Card>
      </div>
    </>
  )
}
