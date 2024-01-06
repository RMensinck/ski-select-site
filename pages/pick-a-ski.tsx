import { FaSnowflake, FaSkiing, FaChartLine, FaSkiingNordic, FaSnowplow, FaSnowman, FaBalanceScale } from 'react-icons/fa'
import InputSelectMenu from '../components/InputSelectMenu'
import { useState, useEffect } from 'react'
import getScores from '@/components/getScores'
import ToolResults from '@/components/homepage/toolResults'
import { useRouter } from 'next/router'
import texts from '@/texts/textsPickaski'
import Head from 'next/head'
import { PlusIcon } from '@heroicons/react/20/solid'

declare function gtag(...args: any[]): void;

export default function PickASki() {
  const router = useRouter()
  const { locale } = router
  const [piste, setPiste] = useState(4)
  const [level, setLevel] = useState(1)
  const [playfull, setPlayfull] = useState(3)
  const [freeride, setFreeride] = useState(1)
  const [powder, setPowder] = useState(1)
  const [park, setPark] = useState(1)
  const [touring, setTouring] = useState(1)
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAddField = (targetName: string) => {
    const newField = addable.find(feature => feature.name === targetName)
    if (newField){
      setFields([...fields, newField]);
      setAddable(addable.filter(feature => feature.name !== targetName));
    }
    gtag('event', 'New field added', {
      'event_category': 'tool results',
      'event_label': "tool results",
      'value': `${newField.name}`
    })
  };

  const showScores = async () => {
    await getScores(setLoading, level, playfull, piste, powder, freeride, park, touring).then((result) => {
    setScores(result)
    gtag('event', 'Tool results loaded', {
      'event_category': 'tool results',
      'event_label': "tool results",
      'value': `level: ${level}, playfull: ${playfull}, piste: ${piste}, powder: ${powder}, freeride: ${freeride}, park: ${park}, touring: ${touring}`
    })
  })}
  
  const initialFields = [
    {
      name: texts.piste[locale],
      description: texts.pisteExplainer[locale],
      icon: FaSkiing,
      setterFunction: setPiste,
      defaultIndex: piste - 1,
      options: [
        {id: 1, name: texts.pisteOptions[locale][1], value: 1},
        {id: 2, name: texts.pisteOptions[locale][2], value: 3},
        {id: 3, name: texts.pisteOptions[locale][3], value: 5},
        {id: 4, name: texts.pisteOptions[locale][4], value: 7},
        {id: 5, name: texts.pisteOptions[locale][5], value: 10},
      ]

    },
    {
      name: texts.level[locale],
      description: texts.levelExplainer[locale],
      icon: FaChartLine,
      setterFunction: setLevel,
      defaultIndex: level - 1,
      options: [
        {id: 1, name: texts.levelOptions[locale][1], value: 1},
        {id: 2, name: texts.levelOptions[locale][2], value: 3},
        {id: 3, name: texts.levelOptions[locale][3], value: 5},
        {id: 4, name: texts.levelOptions[locale][4], value: 7},
        {id: 5, name: texts.levelOptions[locale][5], value: 10},
      ]
    },
    {
      name: texts.playfull[locale],
      description: texts.playfullExplainer[locale],
      icon: FaBalanceScale,
      setterFunction: setPlayfull,
      defaultIndex: playfull - 1,
      options: [
        {id: 1, name: texts.playfullOptions[locale][1], value: 1},
        {id: 2, name: texts.playfullOptions[locale][2], value: 3},
        {id: 3, name: texts.playfullOptions[locale][3], value: 5},
        {id: 4, name: texts.playfullOptions[locale][4], value: 7},
        {id: 5, name: texts.playfullOptions[locale][5], value: 10},
      ]
    },
  ]
  const addableFields = [
    {
      name: texts.powder[locale],
      description: texts.powderExplainer[locale],
      icon: FaSnowflake,
      setterFunction: setPowder,
      defaultIndex: powder - 1,
      options: [
        {id: 1, name: texts.powderOptions[locale][1], value: 1},
        {id: 2, name: texts.powderOptions[locale][2], value: 3},
        {id: 3, name: texts.powderOptions[locale][3], value: 5},
        {id: 4, name: texts.powderOptions[locale][4], value: 7},
        {id: 5, name: texts.powderOptions[locale][5], value: 10},
      ]
    },
    {
      name: texts.freeride[locale],
      description: texts.freerideExplainer[locale],
      icon: FaSnowman,
      setterFunction: setFreeride,
      defaultIndex: freeride - 1,
      options: [
        {id: 1, name: texts.freerideOptions[locale][1], value: 1},
        {id: 2, name: texts.freerideOptions[locale][2], value: 3},
        {id: 3, name: texts.freerideOptions[locale][3], value: 5},
        {id: 4, name: texts.freerideOptions[locale][4], value: 7},
        {id: 5, name: texts.freerideOptions[locale][5], value: 10},
      ]
    },
    {
      name: texts.touring[locale],
      description: texts.touringExplainer[locale],
      icon: FaSkiingNordic,
      setterFunction: setTouring,
      defaultIndex: touring - 1,
      options: [
        {id: 1, name: texts.touringOptions[locale][1], value: 1},
        {id: 2, name: texts.touringOptions[locale][2], value: 3},
        {id: 3, name: texts.touringOptions[locale][3], value: 5},
        {id: 4, name: texts.touringOptions[locale][4], value: 7},
        {id: 5, name: texts.touringOptions[locale][5], value: 10},
      ]
    },
    {
      name: texts.park[locale],
      description: texts.parkExplainer[locale],
      icon: FaSnowplow,
      setterFunction: setPark,
      defaultIndex: park - 1,
      options: [
        {id: 1, name: texts.parkOptions[locale][1], value: 1},
        {id: 2, name: texts.parkOptions[locale][2], value: 3},
        {id: 3, name: texts.parkOptions[locale][3], value: 5},
        {id: 4, name: texts.parkOptions[locale][4], value: 7},
        {id: 5, name: texts.parkOptions[locale][5], value: 10},
      ]
    },
  ]

  const [fields, setFields] = useState(initialFields)
  const [addable, setAddable] = useState(addableFields)
  const [fieldToAdd, setFieldToAdd] = useState(addable[0])

  useEffect(() => {
    showScores()
  }, [piste, level, playfull, powder, freeride, park, touring])

  useEffect(() => {
    gtag('event', 'pick-a-ski loaded')
  }, [])

  return (
    <>
      <Head>
        <title>{texts.upperTitle[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]}/>
      </Head>
      <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-accent-color">{texts.upperTitle[locale]}</h2>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {texts.title[locale]}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {texts.explainer[locale]}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl ">
          <dl className=" grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 mb-16 sm:mb-20 lg:mb-24">
            {fields.map((field) => (
              <div key={field.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-color">
                    <field.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {field.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{field.description}</dd>
                <InputSelectMenu
                  options={field.options}
                  onSelectionChange={(x) => {
                    field.setterFunction(x.value)
                  }}
                  defaultIndex={field.defaultIndex}
                  />
              </div>
            ))}
            
            {/* add field button */}
            {
              addable.length > 0 &&
              <div
                className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <InputSelectMenu
                  options={addable.map(field => ({id: field.name, name: field.name}))}
                  onSelectionChange={setFieldToAdd}
                  
                />
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 mt-4 rounded-md bg-accent-color hover:bg-indigo-500 hover:shadow-xl px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick = {() => handleAddField(fieldToAdd.name)}
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    {texts.addProperties[locale]}
                  </button>
              </div>
            }

            {/* end add field button */}

          </dl>
          {
            scores.length > 0 &&
            <ToolResults
              scores={scores}
            />
          }

        </div>
      </div>
    </div>
    </>
    
  )
}
