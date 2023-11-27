import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../texts/textsReviews'
import { useRouter } from 'next/router'
import Link from 'next/link'
import reviews from '../public/reviews/reviews.json'


export default function Home() {
  const router = useRouter()
  const { locale } = router 
  const skiNames = Object.keys(reviews)

  function cutStringWithEllipsis(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength -2);
    } else {
        return str;
    }
  }

  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]}/>
      </Head>
      
      <main className="">
        <div className="flex">
          <SideBar />
          <div className="standard-background">
            <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl my-10 shadow-lg lg:min-w-[48rem] mx-3">
              <div className="grid place-items-center ">
                <h1 className="text-4xl font-bold text-dark-blue mb-4 text-center">
                  {texts.title[locale]}
                </h1>
                <p className="mb-6 text-dark-blue text-center">
                  {texts.info[locale]}
                </p>
                <p className="text-dark-blue font-bold text-center">
                  {texts.availableReviews[locale]}
                </p>
                {skiNames.map((ski, index) => (
                  <Link href={reviews[ski].href} key={index}>
                    <p className="mb-2 text-dark-blue text-center underline hover:font-semibold">
                      {cutStringWithEllipsis(ski, 22) + " " + texts.by[locale] + " " + reviews[ski].author}
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