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
  const [piste, setPiste] = useState(7)
  const [level, setLevel] = useState(3)
  const [playfull, setPlayfull] = useState(5)
  const [freeride, setFreeride] = useState(1)
  const [powder, setPowder] = useState(1)
  const [park, setPark] = useState(1)
  const [touring, setTouring] = useState(1)
  const [bodyHeight, setBodyHeight] = useState(175)
  const [bodyWeight, setBodyWeight] = useState(75)
  const [fitness, setFitness] = useState(6)
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
    await getScores(setLoading, level, playfull, piste, powder, freeride, park, touring, bodyHeight, bodyWeight, fitness).then((result) => {
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
      defaultIndex: 3,
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
      defaultIndex: 2,
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
      defaultIndex: 2,
      options: [
        {id: 1, name: texts.playfullOptions[locale][1], value: 1},
        {id: 2, name: texts.playfullOptions[locale][2], value: 3},
        {id: 3, name: texts.playfullOptions[locale][3], value: 5},
        {id: 4, name: texts.playfullOptions[locale][4], value: 7},
        {id: 5, name: texts.playfullOptions[locale][5], value: 10},
      ]
    },
    {
      name: texts.freeride[locale],
      description: texts.freerideExplainer[locale],
      icon: FaSnowman,
      setterFunction: setFreeride,
      defaultIndex: 1,
      options: [
        {id: 1, name: texts.freerideOptions[locale][1], value: 1},
        {id: 2, name: texts.freerideOptions[locale][2], value: 3},
        {id: 3, name: texts.freerideOptions[locale][3], value: 5},
        {id: 4, name: texts.freerideOptions[locale][4], value: 7},
        {id: 5, name: texts.freerideOptions[locale][5], value: 10},
      ]
    },
  ]
  const addableFields = [
    {
      name: texts.powder[locale],
      description: texts.powderExplainer[locale],
      icon: FaSnowflake,
      setterFunction: setPowder,
      defaultIndex: 1,
      options: [
        {id: 1, name: texts.powderOptions[locale][1], value: 1},
        {id: 2, name: texts.powderOptions[locale][2], value: 3},
        {id: 3, name: texts.powderOptions[locale][3], value: 5},
        {id: 4, name: texts.powderOptions[locale][4], value: 7},
        {id: 5, name: texts.powderOptions[locale][5], value: 10},
      ]
    },

    {
      name: texts.touring[locale],
      description: texts.touringExplainer[locale],
      icon: FaSkiingNordic,
      setterFunction: setTouring,
      defaultIndex: 1,
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
      defaultIndex: 1,
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
    gtag('event', 'pick-a-ski loaded')
  }, [])


  return (
    <>
      <Head>
        <title>{texts.upperTitle[locale] + " | " + texts.title[locale]}</title>
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

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:max-w-2xl mx-auto">
          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="bodyHeight" className="block text-sm font-medium leading-6 text-gray-900">
              {texts.height[locale]}
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="bodyHeight"
                id="bodyHeight"
                placeholder="175"
                min="50"
                max="250"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 1) {
                    value = 1;
                  }
                  e.target.value = Math.round(value).toString();
                  setBodyHeight(value)
                }}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="bodyWeight" className="block text-sm font-medium leading-6 text-gray-900">
              {texts.weight[locale]}
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="bodyWeight"
                id="bodyWeight"
                placeholder='75'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                min="20"
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 1) {
                    value = 1;
                  }
                  e.target.value = Math.round(value).toString();
                  setBodyWeight(value)
                }}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="fitness" className="block text-sm font-medium leading-6 text-gray-900">
              {texts.fitness[locale]}
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="fitness"
                id="fitness"
                placeholder="6"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                min="1"
                max="10"
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 1) {
                    value = 1;
                  }
                  if (value > 10) {
                    value = 10;
                  }
                  e.target.value = Math.round(value).toString();
                  setFitness(value);
                }}
              />
            </div>
          </div>
        </div>


        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl ">
          <dl className=" grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 mb-16 sm:mb-20 lg:mb-24">
            {fields.map((field) => (
              <div key={field.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900" title={field.description}>
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-color">
                    <field.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {field.name}
                </dt>

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
                className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
          <button 
            className='mx-auto my-6 block rounded-md bg-accent-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            onClick={showScores}
          >
            {texts.getRecommendations[locale]}
          </button>
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
