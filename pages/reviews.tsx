import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../texts/textsReviews'
import { useRouter } from 'next/router'
import Link from 'next/link'
import reviews from '../public/reviews/reviews.json'
import { useEffect, useState } from 'react';
import React from 'react';
import Card from '@/components/Card';
import Image from 'next/image';

declare function gtag(...args: any[]): void;

export default function Opinions() {
  const router = useRouter()
  const { locale } = router
  const skiNames = Object.keys(reviews).sort()
  const [searchQuery, setSearchQuery] = useState('')

  // Featured reviews (first 6 skis)
  const featuredSkis = skiNames.slice(0, 6)

  // Filtered skis for search
  const filteredSkis = skiNames.filter((skiName) =>
    skiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reviews[skiName].brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reviews[skiName].model.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Determine which skis to show
  const skisToShow = searchQuery === '' ? featuredSkis : filteredSkis
  const isSearching = searchQuery !== ''

  useEffect(() => {
    gtag('event', 'reviews loaded')
  }, [])

  const renderSkiCard = (skiName) => {
    const review = reviews[skiName];
    const isV3Format = review.format_version === "v3";

    // Get preview text based on format
    const getPreviewText = () => {
      if (isV3Format) {
        // For v3 format, use reviews field and strip markdown formatting for preview
        const markdownText = review.reviews?.[locale] || review.reviews?.[review.originalLanguage] || '';
        return markdownText.replace(/[#*_`]/g, '').substring(0, 300) + '...';
      } else {
        // For old format, use paragraphs
        const paragraphs = review.paragraphs?.[locale] || review.paragraphs?.[review.originalLanguage] || [];
        if (Array.isArray(paragraphs) && paragraphs.length >= 3) {
          return paragraphs[0] + " " + paragraphs[1] + " " + paragraphs[2];
        } else if (Array.isArray(paragraphs) && paragraphs.length > 0) {
          return paragraphs.join(" ");
        }
        return "No preview available";
      }
    };

    return (
      <Link href={review.href} key={skiName} className="block my-6 group">
        <Card className="!p-0 bg-bg-light transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <article className="mx-4 sm:mx-0">
            <div className="grid grid-cols-3 gap-4 w-full p-4">
              <div className="col-span-1 flex justify-center items-center">
                <div className="bg-gray-200 rounded-lg w-24 h-24 flex items-center justify-center">
                  <p className="text-gray-500 text-xs">No image</p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={review.date} className="text-text-muted">
                    {review.date}
                  </time>
                </div>
                <div className="relative">
                  <h3 className="text-lg font-semibold leading-6 text-text group-hover:text-text-muted">
                    {skiName}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-text-muted">
                    {getPreviewText()}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="mr-4 h-10 w-10 rounded-full bg-bg-light overflow-hidden flex-shrink-0">
                    <Image
                      src={reviews[skiName].authorPicture}
                      alt="Picture of the review author"
                      className="h-full w-full object-cover"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-text">
                      {review.author}
                    </p>
                    <p className="text-text-muted">{review.authorInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Card>
      </Link>
    )
  }

  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]} />
      </Head>
      <div className="flex justify-center items-center bg-bg-dark">
        <Card>
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-base font-semibold leading-7 text-accent-color">{texts.header[locale]}</h2>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">{texts.title[locale]}</h1>
                <p className="mt-6 text-lg leading-8 text-text-muted">
                  {texts.info[locale]}
                </p>
              </div>
            </div>

            {/* Always visible search bar */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-text">
                  {isSearching ? 'Search Results' : 'Featured Reviews'}
                </h3>
              </div>

              <input
                type="text"
                placeholder="Search by ski name, brand, or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-color focus:border-transparent"
              />

              <p className="mt-2 text-sm text-text-muted">
                {isSearching ? (
                  <>{filteredSkis.length} {texts.reviewsFound[locale]}</>
                ) : (
                  <>{featuredSkis.length} {texts.featuredReviewsFound[locale]} {skiNames.length}</>
                )}
              </p>
            </div>

            {/* Results */}
            {isSearching ? (
              // Search Results
              filteredSkis.length > 0 ? (
                filteredSkis.map(renderSkiCard)
              ) : (
                <div className="text-center py-8 text-text-muted">
                  No reviews found for &quot;{searchQuery}&quot;
                </div>
              )
            ) : (
              // Featured Reviews
              <>
                {featuredSkis.map(renderSkiCard)}
                <div className="text-center mt-8 p-4 bg-bg-light rounded-lg">
                  <p className="text-text-muted mb-4">
                    {texts.wantMore[locale]}
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  )
}
