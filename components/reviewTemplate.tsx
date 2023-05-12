import SideBar from './sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router'
import reviews from './reviews.json'
import titles from './textsSingleReview'

export default function Review(skiName: string) {
 
  const router = useRouter()
  const { locale } = router 
  const review = reviews.find(x => x.fullName===skiName)
  const texts = review["review"]

  return (
    <>
      <Head>
        <title>{texts.title[locale]}</title>
      </Head>   
      <main className="">
        <div className="flex">
          <SideBar />
          <div className="bg-[url('../public/background.svg')] bg-cover w-screen min-h-screen absolute flex flex-col lg:flex-row items-center bg-fixed">
            <div className="rounded-xl py-4 bg-opacity-90 bg-grey max-w-3xl lg:mx-auto mx-3 my-10 shadow-lg lg:min-w-[48rem]">
              <div className="grid place-items-center ">
                <h1 className="text-4xl font-bold text-dark-blue mb-4 text-center">
                  {texts.title[locale]}
                </h1>       
                <h3 className="text-dark-blue mx-6 mb-2 font-bold text-center">{titles.intro[locale]}</h3>
                {texts.intro[locale].map((text:string, index:number) => (
                  <p key={index} className="text-dark-blue mx-6 mb-6 text-center">{text}</p>
                ))}
                <h3 className="text-dark-blue mt-4 mx-6 mb-2 font-bold">{titles.pros[locale]}</h3>
                {texts.pros[locale].map((text: string, index: number) => (
                  <p key={index} className="text-dark-blue mx-6 mb-6 text-center">{text}</p>
                ))}
                <h3 className="text-dark-blue mt-4 mx-6 mb-2 font-bold">{titles.cons[locale]}</h3>
                {texts.cons[locale].map((text: string, index:number) => (
                  <p key={index} className="text-dark-blue mx-6 mb-6 text-center">{text}</p>
                ))}
                <h3 className="text-dark-blue mt-4 mx-6 mb-2 font-bold">{titles.conclusion[locale]}</h3>
                {texts.conclusion[locale].map((text: string, index:number) => (
                  <p key={index} className="text-dark-blue mx-6 mb-6 text-center">{text}</p>
                ))}
                { texts.disclaimer[locale].length > 0 && (
                  <>
                  <h3 className="text-dark-blue mt-4 mx-6 mb-2 font-bold">{titles.disclaimer[locale]}</h3>
                  {texts.disclaimer[locale].map((text: string, index:number) => (
                    <p key={index} className="text-dark-blue mx-6 mb-6 text-center">{text}</p>
                  ))}
                  </>
                )}
              </div>
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