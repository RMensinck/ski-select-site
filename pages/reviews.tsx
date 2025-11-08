import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../texts/textsReviews'
import { useRouter } from 'next/router'
import Link from 'next/link'
import reviews from '../public/reviews/reviews.json'
import { useEffect, useState } from 'react';
import React from 'react';
import Card from '@/components/Card';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

declare function gtag(...args: any[]): void;

export default function Opinions() {
  const router = useRouter()
  const { locale } = router
  const skiNames = Object.keys(reviews).sort()
  const [firebaseImages, setFirebaseImages] = useState({})
  const [loadingImages, setLoadingImages] = useState({}) // Track which images are loading
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
    // Only load featured images on initial load
    loadImagesForSkis(featuredSkis)
  }, [])

  // Load images when search results change
  useEffect(() => {
    if (isSearching) {
      loadImagesForSkis(filteredSkis)
    }
  }, [filteredSkis, isSearching])

  const loadImagesForSkis = async (skisToLoad) => {
    const skisNeedingImages = skisToLoad.filter(skiName => 
      !firebaseImages[skiName] && !loadingImages[skiName]
    )

    if (skisNeedingImages.length === 0) return

    // Mark images as loading
    const newLoadingState = { ...loadingImages }
    skisNeedingImages.forEach(skiName => {
      newLoadingState[skiName] = true
    })
    setLoadingImages(newLoadingState)

    const imagePromises = skisNeedingImages.map(async (skiName) => {
      const review = reviews[skiName]
      const imagePath = `skis/${review.brand}/${review.model}-1.webp`
      
      try {
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        return { skiName, url };
      } catch (error) {
        console.log(`Image not found: ${imagePath}`);
        return { skiName, url: null };
      }
    });

    const results = await Promise.all(imagePromises);
    
    // Update images and loading states
    setFirebaseImages(prev => {
      const newImages = { ...prev }
      results.forEach(({ skiName, url }) => {
        if (url) newImages[skiName] = url;
      })
      return newImages
    })

    setLoadingImages(prev => {
      const newLoading = { ...prev }
      results.forEach(({ skiName }) => {
        delete newLoading[skiName]
      })
      return newLoading
    })
  }

  const renderSkiCard = (skiName) => {
    const review = reviews[skiName];
    const isV3Format = review.format_version === "v3";
    
    // Get preview text based on format
    const getPreviewText = () => {
      if (isV3Format) {
        // For v3 format, use markdown field and strip markdown formatting for preview
        const markdownText = review.markdown?.[locale] || review.markdown?.[review.originalLanguage] || '';
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
      <Card key={skiName} className="my-6 !p-0 bg-bg-light transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <article className="mx-4 sm:mx-0">
          <div className="grid grid-cols-3 gap-4 w-full p-4">
            <div className="col-span-1 flex justify-center items-center">
              {loadingImages[skiName] ? (
                <div className="flex items-center justify-center h-24 w-24">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-color"></div>
                </div>
              ) : firebaseImages[skiName] ? (
                <img 
                  src={firebaseImages[skiName]} 
                  alt={`Picture of the ${skiName}`} 
                  className="max-w-full h-auto object-contain"
                />
              ) : (
                <div className="bg-gray-200 rounded-lg w-24 h-24 flex items-center justify-center">
                  <p className="text-gray-500 text-xs">No image</p>
                </div>
              )}
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={review.date} className="text-text-muted">
                  {review.date}
                </time>
              </div>
              <div className="group relative">
                <h3 className="text-lg font-semibold leading-6 text-text group-hover:text-text-muted">
                  <Link href={review.href}>
                    <span className="absolute inset-0" />
                    {skiName}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-text-muted">
                  {getPreviewText()}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img 
                  src={review.authorPicture} 
                  alt="Picture of the review's author" 
                  className="h-10 w-10 rounded-full bg-gray-50" 
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-text">
                    <Link href={review.href}>
                      <span className="absolute inset-0" />
                      {review.author}
                    </Link>
                  </p>
                  <p className="text-text-muted">{review.authorInfo}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Card>
    )
  }

  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]}/>
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
