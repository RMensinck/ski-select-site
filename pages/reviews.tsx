import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../texts/textsReviews'
import { useRouter } from 'next/router'
import Link from 'next/link'
import reviews from '../public/reviews/reviews.json'
import { useEffect } from 'react';
import React from 'react';

declare function gtag(...args: any[]): void;

export default function Opinions() {
  const router = useRouter()
  const { locale } = router
  const skiNames = Object.keys(reviews).sort()

  useEffect(() => {
    gtag('event', 'reviews loaded')
  }, [])

  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]}/>
      </Head>
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-3xl ">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-base font-semibold leading-7 text-accent-color">{texts.header[locale]}</h2>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{texts.title[locale]}</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {texts.info[locale]}
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                    {skiNames.map((skiName) => (
                      <React.Fragment key={skiName}>
                      <article className="flex max-w-xl flex-col items-start justify-between mx-4 sm:mx-0">
                        <img src={reviews[skiName].picture} alt={"Picture of the " + skiName} />
                        <div className="flex items-center gap-x-4 text-xs">
                          <time dateTime={reviews[skiName].date} className="text-gray-500">
                            {reviews[skiName].date}
                          </time>
                          <a
                            href={"/" + locale + reviews[skiName].href}
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {texts.indepthReview[locale]}
                          </a>
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            <a href={"/" + locale + reviews[skiName].href}>
                              <span className="absolute inset-0" />
                              {skiName}
                            </a>
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{reviews[skiName].paragraphs[locale][0] + " " + reviews[skiName].paragraphs[locale][1] + " " + reviews[skiName].paragraphs[locale][2]}</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4">
                          <img src={reviews[skiName].authorPicture} alt="Picture of the review's author" className="h-10 w-10 rounded-full bg-gray-50" />
                          <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                              <a href={"/" + locale + reviews[skiName].href}>
                                <span className="absolute inset-0" />
                                {reviews[skiName].author}
                              </a>
                            </p>
                            <p className="text-gray-600">{reviews[skiName].authorInfo}</p>
                          </div>
                        </div>

                      </article>
                      <div className="border-t border-gray-200" key={skiName + "3"}></div>
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
