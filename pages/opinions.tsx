import { useRouter } from 'next/router'
import skis from '../components/allSkisFrontend.json'
import Head from 'next/head'
import texts from '../texts/textsOpinions'
import { useEffect } from 'react'

declare function gtag(...args: any[]): void;

export default function Opinions() {
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    gtag('event', 'opinions loaded')
  }, [])
  
  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]}/>
      </Head>
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8  lg:pt-16 max-w-3xl ">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-base font-semibold leading-7 text-accent-color">{texts.opinions[locale]}</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{texts.title[locale]}</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {texts.body[locale]}
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          {texts.skiName[locale]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {skis.map((ski) => (
                        <tr key={ski.name}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <a href={ski.href}>{ski.name}</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
