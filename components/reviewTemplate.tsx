import SideBar from './sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router'
import reviews from '../public/reviews/reviews.json'
import titles from '../texts/textsSingleReview'
import text from '../texts/textsSingleReview'
import { useEffect, useState } from 'react';


export default function Review(skiName: string) {
 
  const router = useRouter()
  const { locale } = router 
  const review = reviews[skiName]
  const [shownParagraphs, setShownParagraphs] = useState(review.paragraphs[locale])
  const [showLanguageDisclaimer, setShowLanguageDisclaimer] = useState(false)
  
  useEffect(() => {
    if (locale != review.originalLanguage) {
      setShowLanguageDisclaimer(true)
    }
  }, [])
  return (
    <>
      <Head>
        <title>{skiName + " " + text.review[locale]}</title>
      </Head>   
      <main className="">
        <div className="flex">
          <SideBar />
          <div className="standard-background">
            <div className="rounded-xl py-4 bg-opacity-90 bg-grey max-w-3xl lg:mx-auto mx-3 my-10 shadow-lg lg:min-w-[48rem]">
              <article className="grid place-items-center ">
                <h1 className="text-4xl font-bold text-dark-blue text-center">
                  {skiName + " " + text.review[locale]}
                </h1>
                <h2 className="text-2xl font-bold text-dark-blue mb-4 text-center">
                  {text.by[locale] + " " +  review.author}
                </h2>
                { showLanguageDisclaimer && 
                  <p 
                    onClick={() => {
                      setShownParagraphs(review.paragraphs[review.originalLanguage ])
                      setShowLanguageDisclaimer(false)
                    }}
                    className="text-dark-blue mx-6 mb-4 font-bold text-center cursor-pointer underline"
                    >
                    {text.originalLanguage1[locale] + " " + text[review.originalLanguageFull][locale]}
                  </p>
                }
                { shownParagraphs.map((paragraph: string, index:number) => (
                  <p key={index} className="text-dark-blue mx-6 mb-6 text-center">{paragraph}</p>
                ))}
                { review.disclaimer && 
                  <>
                  <h3 className="text-dark-blue mt-4 mx-6 mb-2 font-bold">{titles.disclaimer[locale]}</h3>
                  {review.disclaimer[locale].map((text: string, index:number) => (
                    <p key={index} className="text-dark-blue mx-6 mb-6 text-center">{text}</p>
                  ))}
                  </>
                }
              </article>
            </div>
            { review.picture != "" &&
              <div className="rounded-xl py-4 bg-opacity-90 bg-grey max-w-3xl mx-auto my-10 shadow-lg lg:min-w-[12rem]">
              <img src={review.picture} alt={review.fullName} className="max-h-[80vh]" />
            </div>}
          </div>
        </div> 
      </main>
    </>
  )  
}