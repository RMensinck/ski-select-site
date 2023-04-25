import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../components/textsReviews'
import { useRouter } from 'next/router'
import Link from 'next/link'
import reviews from '../components/reviews.json'


export default function Home() {
  const router = useRouter()
  const { locale } = router 
  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
      </Head>
      
      <main className="">
        <div className="flex">
          <SideBar />
          <div className="bg-[url('../public/background.svg')] bg-cover w-screen 
          min-h-screen absolute flex flex-col lg:justify-center 
          items-center bg-fixed">
            <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl my-10 shadow-lg lg:min-w-[48rem] mx-3">
              <div className="grid place-items-center ">
                <h1 className="text-4xl font-bold text-dark-blue mb-4 text-center">
                  {texts.title[locale]}
                </h1>
                <p className="mb-6 text-dark-blue mx-6 text-center">
                  {texts.info[locale]}
                </p>
                <p className="text-dark-blue mx-6 font-bold text-center">
                  {texts.availableReviews[locale]}
                </p>
                {reviews.map((review, index) => (
                  <Link href={review.href} key={index}>
                    <p className="mb-6 text-dark-blue mx-6 text-center hover:font-semibold">
                      {review.fullName + " " + texts.by[locale] + " " + review.author}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}