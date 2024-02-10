import { useRouter } from 'next/router'
import skis from '../components/allSkisFrontend.json'
import Head from 'next/head'
import texts from '../texts/textsOpinions'
import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import brands from '../public/brands/brands.json'
import Link from 'next/link'

declare function gtag(...args: any[]): void;
interface Ski {
  name: string
  brand: string
  href: string
  model: string
}



export default function Opinions() {
  const router = useRouter()
  const { locale } = router
  const [query, setQuery] = useState('')
  const [selectedSki, setSelectedSki] = useState(null)

  useEffect(() => {
    gtag('event', 'opinions loaded')
  }, [])

  const skisByBrand = skis.reduce((groups, ski) => {
    const brand = ski.brand;
    if (!groups[brand]) {
      groups[brand] = [];
    }
    groups[brand].push(ski);
    return groups;
  }, {});

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const filteredSkis =
  query === ''
    ? skis
    : skis.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })
  
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

          <div className="bg-white py-4 sm:py-8">
            <h2 className="block text-lg leading-6 text-gray-600 mt-6 font-semibold">
              {texts.brandsTitle[locale]}
            </h2>            
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                {brands.map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => {
                      setQuery(brand.name.toLowerCase())
                      window.scrollTo(0, document.body.scrollHeight);
                    }}
                  >
                    <img
                      key={brand.name}
                      className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                      src={brand.logo}
                      alt={brand.logoAlt}
                    />
                  </button>
                )
                )}
              </div>
            </div>
          </div>

          <Combobox as="div" className="py-4" value={selectedSki} onChange={
            setSelectedSki
            }>
            <Combobox.Label className="block text-lg font-semibold leading-6 text-gray-600 mt-6">{texts.quickSearch[locale]}</Combobox.Label>
            <div className="relative mt-2">
              <Combobox.Input
                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(ski: Ski) => ski ? ski.name : ''}
              />
            </div>
          </Combobox>
            

          
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
                    {filteredSkis ? (
                      filteredSkis.map((ski) => (
                        <tr key={ski.name}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <Link href={ski.href}>{ski.name}</Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      skis.map((ski) => (
                        <tr key={ski.name}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <Link href={ski.href}>{ski.name}</Link>
                          </td>
                        </tr>
                      ))
                    )}
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
