import Head from 'next/head'
import { useRouter } from 'next/router'
import reviews from '../public/reviews/reviews.json'
import texts from '../texts/textsSingleReview'
import { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react'
import Image from 'next/image';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import Card from '@/components/Card';
import ReactMarkdown from 'react-markdown';

declare function gtag(...args: any[]): void;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Review(skiName: string) {
  const router = useRouter()
  const { locale } = router 
  const review = reviews[skiName]
  const [firebaseImages, setFirebaseImages] = useState([])
  const [firebaseImagesLoading, setFirebaseImagesLoading] = useState(true)

  // Check if this is the new v3 format
  const isV3Format = review.format_version === "v3"
  
  // Initialize content based on format
  const [shownContent, setShownContent] = useState(() => {
    if (isV3Format) {
      return review.reviews?.[locale] || review.markdown?.[review.originalLanguage]
    } else {
      return review.paragraphs?.[locale] || review.paragraphs?.[review.originalLanguage] || []
    }
  })
  
  const [showLanguageDisclaimer, setShowLanguageDisclaimer] = useState(false)

  useEffect(() => {
    if (locale != review.originalLanguage) {
      setShowLanguageDisclaimer(true)
    }
    gtag('event', `review ${skiName} loaded`)
  }, [locale, review.originalLanguage, skiName])

  useEffect(() => {
    const loadFirebaseImages = async () => {
      setFirebaseImagesLoading(true)
      const imagePromises = []
      
      // Create promises for first 10 images using Firebase SDK
      for (let i = 1; i <= 10; i++) {
        const imagePath = `skis/${review.brand}/${review.model}-${i}.webp`
        
        imagePromises.push(
          (async () => {
            try {
              const imageRef = ref(storage, imagePath);
              const url = await getDownloadURL(imageRef);
              return {
                id: i - 1,
                name: 'Ski',
                src: url,
                alt: `Picture of the ${review.brand} ${review.model} skis.`,
              };
            } catch (error) {
              console.log(`Image not found: ${imagePath}`);
              return null;
            }
          })()
        );
      }

      const results = await Promise.all(imagePromises)
      const validImages = results.filter(img => img !== null)
      console.log("Loaded Firebase images:", validImages);
      setFirebaseImages(validImages)
      setFirebaseImagesLoading(false)
    }

    loadFirebaseImages()
  }, [review])

  const renderContent = () => {
    if (isV3Format) {
      // Render markdown for v3 format
      return (
        <div className="max-w-xl text-base leading-7 text-text-muted lg:max-w-lg prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-xl font-semibold text-text mt-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-text mt-6" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-text mt-4" {...props} />,
              p: ({node, ...props}) => <p className="mt-6 first:mt-0" {...props} />,
            }}
          >
            {typeof shownContent === 'string' ? shownContent : ''}
          </ReactMarkdown>
        </div>
      )
    } else {
      // Render old format with titles and paragraphs
      return (
        <div className="max-w-xl text-base leading-7 text-text-muted lg:max-w-lg">
          {Array.isArray(shownContent) && shownContent.map((paragraph: string, index: number) => (
            <div key={index}>
              {review.titles && review.titles[locale] && review.titles[locale][index] && (
                <h2 className="mt-6 text-xl font-semibold text-text">
                  {review.titles[locale][index]}
                </h2>
              )}
              <p
                className={index === 0 ? "mt-0" : "mt-6"}
                key={index}
              >
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <>
      <Head>
        {review.meta_titles ? <meta name="title" content={review.meta_titles[locale]} /> : <title>{skiName + " " + texts.review[locale]}</title>}
        {review.meta_descriptions ? <meta name="description" content={review.meta_descriptions[locale]} /> : <meta name="description" content={texts.metaDescription[locale]}/>}
      </Head>

      <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <Card className="mx-auto">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <div className="flex">
                    <Image
                      src={reviews[skiName].authorPicture}
                      alt="Picture of the review author"
                      className="mr-4 h-10 w-10 rounded-full bg-bg-light"
                      width={40}
                      height={40}
                    />
                    <p className=" self-center text-base font-semibold leading-7 text-accent-color">{texts.by[locale] + " " + reviews[skiName].author}</p>
                  </div>
          
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">{skiName + " " + texts.review[locale]}</h1>
                  { showLanguageDisclaimer &&
                    <p
                      className="mt-2 text-base leading-8 text-text-muted underline hover:cursor-pointer"
                      onClick={() => {
                        if (isV3Format) {
                          setShownContent(review.markdown?.[review.originalLanguage] || '')
                        } else {
                          setShownContent(review.paragraphs[review.originalLanguage])
                        }
                        setShowLanguageDisclaimer(false)
                      }}
                      >
                      {texts.originalLanguage1[locale] + " " + texts[review.originalLanguageFull][locale]+ "."}
                    </p>
                  }
                </div>
              </div>
            </div>
            
            {/* Firebase images with loading state */}
            {firebaseImagesLoading ? (
              <div className="lg:p-12 lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 sticky lg:translate-y-60 xl:translate-y-40 2xl:translate-y-20 max-w-[900px]">
                <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-color mx-auto mb-4"></div>
                    <p className="text-text-muted">Loading images...</p>
                  </div>
                </div>
              </div>
            ) : firebaseImages.length > 0 ? (
              <div className=" lg:p-12 lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 sticky lg:translate-y-60 xl:translate-y-40 2xl:translate-y-20 max-w-[900px]">
                <TabGroup as="div" className="flex flex-col-reverse">
                  {/* Image selector */}
                  <div className="mx-auto mt-6 w-full max-w-2xl block lg:max-w-none px-4">
                    <TabList className="grid grid-cols-4 gap-6">
                      {firebaseImages.map((image) => (
                        <Tab
                          key={image.id}
                          className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-text hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="sr-only">{image.name}</span>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  className="h-full w-full object-contain object-center"
                                  fill
                                  sizes="96px"
                                />
                              </span>
                              <span
                                className={classNames(
                                  selected ? 'ring-accent-color' : 'ring-transparent',
                                  'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>
                      ))}
                    </TabList>
                  </div>
                  <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                    {firebaseImages.map((image) => (
                      <Tab.Panel key={image.id}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-contain object-center sm:rounded-lg"
                          height={700}
                          width={700}
                        />
                      </Tab.Panel>
                    ))}
                  </TabPanels>
                </TabGroup>
              </div>
            ) : (
              <div className="lg:p-12 lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 sticky lg:translate-y-60 xl:translate-y-40 2xl:translate-y-20 max-w-[900px]">
                <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                  <p className="text-text-muted">No images available</p>
                </div>
              </div>
            )}
          
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                {renderContent()}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )  
}