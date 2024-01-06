import { useRouter } from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'
import { ScaleIcon, HandThumbUpIcon } from '@heroicons/react/20/solid'
import texts from '@/texts/textsResults'
import Link from 'next/link'


interface ToolResultsProps {
    scores: any[]; 
    shareURL?: string;
}
declare function gtag(...args: any[]): void;

const ToolResults: React.FC<ToolResultsProps> = ({ scores, shareURL="" }) => {
  const router = useRouter()
  const { locale } = router
  const [ski1, setSki1] = useState({})
  const [ski2, setSki2] = useState({})
  const [ski3, setSki3] = useState({})
  const [ski4, setSki4] = useState({})
  const [ski5, setSki5] = useState({})
  const [ski6, setSki6] = useState({})
  


  useEffect(() => {
    
    try {
      setSki1({name: scores[0].name, imageUrl: `/skis/${scores[0].name.replace(/[/_]/g, '')}.png`, opinionsHref: "/opinions/"+scores[0].name.replace(/[ /._-]/g, ''), score: scores[0].score, rank: 1})
      setSki2({name: scores[1].name, imageUrl: `/skis/${scores[1].name.replace(/[/_]/g, '')}.png`, opinionsHref: "/opinions/"+scores[1].name.replace(/[ /._-]/g, ''), score: scores[1].score, rank: 2})
      setSki3({name: scores[2].name, imageUrl: `/skis/${scores[2].name.replace(/[/_]/g, '')}.png`, opinionsHref: "/opinions/"+scores[2].name.replace(/[ /._-]/g, ''), score: scores[2].score, rank: 3})
      setSki4({name: scores[3].name, imageUrl: `/skis/${scores[3].name.replace(/[/_]/g, '')}.png`, opinionsHref: "/opinions/"+scores[3].name.replace(/[ /._-]/g, ''), score: scores[3].score, rank: 4})
      setSki5({name: scores[4].name, imageUrl: `/skis/${scores[4].name.replace(/[/_]/g, '')}.png`, opinionsHref: "/opinions/"+scores[4].name.replace(/[ /._-]/g, ''), score: scores[4].score, rank: 5})
      setSki6({name: scores[5].name, imageUrl: `/skis/${scores[5].name.replace(/[/_]/g, '')}.png`, opinionsHref: "/opinions/"+scores[5].name.replace(/[ /._-]/g, ''), score: scores[5].score, rank: 6})
    } catch (error) {
    }
  }, [scores])

  const skis = [ski1, ski2, ski3, ski4, ski5, ski6]
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {skis.map((ski: any, index: number) => (
        <li
          key={Math.random().toString(36).substring(2, 15)}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow fade-in"
          style={{ animationDelay: `${index * 0.3}s` }}
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-contain rotate-90" src={ski.imageUrl} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{ski.name}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">{texts.score[locale]}</dt>
              <dd className="text-sm text-gray-500">{`${texts.score[locale]}: ${ski.score}`}</dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={ski.opinionsHref}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <HandThumbUpIcon className="h-5 w-5 text-accent-color" aria-hidden="true" />
                  {texts.opinions[locale]}
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  href="/reviews"
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <ScaleIcon className="h-5 w-5 text-accent-color" aria-hidden="true" />
                  {texts.reviews[locale]}
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) 
}

export default ToolResults
