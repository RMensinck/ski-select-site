import Head from 'next/head'
import { useState, useEffect } from 'react';
import SideBar from './sidebar';

const info_texts = {
  "level": {
    1: "I never skied before.",
    2: "I never skied before.",
    3: "I've skied a couple of weeks.",
    4: "I've skied a couple of weeks.",
    5: "I ski 1-10 days a year.",
    6: "I ski 1-10 days a year.",
    7: "I ski multiple weeks every year.",
    8: "I ski multiple weeks every year.",
    9: "I live in the mountains!",
    10: "I live in the mountains!",
  },
  "piste": {
    1: "I never ski on piste.",
    2: "I never ski on piste.",
    3: "I wont use this ski on piste.",
    4: "I wont use this ski on piste.",
    5: "I want it to be decent on piste.",
    6: "I want it to be decent on piste.",
    7: "I spend most days on piste.",
    8: "I spend most days on piste.",
    9: "Skiing slopes is my life!",
    10: "Skiing slopes is my life!",
  },
  "powder": {
    1: "I never ski powder.",
    2: "I never ski powder.",
    3: "I like fresh snow on the slopes.",
    4: "I like fresh snow on the slopes.",
    5: "I like to ski between slopes",
    6: "I like to ski between slopes",
    7: "I like long powder runs",
    8: "I like long powder runs",
    9: "I travel for deep powder!",
    10: "I travel for deep powder!",
  },
  "freeride": {
    1: "I dont care about freeride.",
    2: "I dont care about freeride.",
    3: "I like to ski trails in the forrest",
    4: "I like to ski trails in the forrest",
    5: "I occasionally go off-piste",
    6: "I occasionally go off-piste",
    7: "I'm often looking cool lines",
    8: "I'm often looking cool lines",
    9: "I ride freeride competitions!",
    10: "I ride freeride competitions!",
  },
  "touring": {
    1: "I never go skitouring.",
    2: "I never go skitouring.",
    3: "I might try skitouring once.",
    4: "I might try skitouring once.",
    5: "I go touring once or twice",
    6: "I go touring once or twice",
    7: "I like skitouring regularly",
    8: "I like skitouring regularly",
    9: "Skitouring is all i do!",
    10: "Skitouring is all i do!",
  },
  "park": {
    1: "I never ski in the funpark.",
    2: "I never ski in the funpark.",
    3: "I might try a funpark lap.",
    4: "I might try a funpark lap.",
    5: "I occasionally ride park.",
    6: "I occasionally ride park.",
    7: "I regularly ride park",
    8: "I regularly ride park",
    9: "I spend most time in the park!",
    10: "I spend most time in the park!",
  },
  "playfull": {
    1: "I like high-performance ski's!",
    2: "I like high-performance ski's!",
    3: "I'm a strong, fast skier.",
    4: "I'm a strong, fast skier.",
    5: "I like a stable, forgiving ski.",
    6: "I like a stable, forgiving ski.",
    7: "I like a playfull ski.",
    8: "I like a playfull ski.",
    9: "I just butter and jump around!",
    10: "I just butter and jump around!",
  }
}

export default function Home() {
  const playfull_default = 5
  const level_default = 1
  const piste_default = 7
  const powder_default = 1
  const freeride_default = 1
  const park_default = 1
  const touring_default = 1
  const [level, setLevel] = useState(level_default)
  const [playfull, setPlayfull] = useState(playfull_default)
  const [piste, setPiste] = useState(piste_default)
  const [park, setPark] = useState(park_default)
  const [powder, setPowder] = useState(powder_default)
  const [freeride, setFreeride] = useState(freeride_default)
  const [touring, setTouring] = useState(touring_default)
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)
  const [pisteInfo, setPisteInfo] = useState(info_texts.piste[piste_default])
  const [powderInfo, setPowderInfo] = useState(info_texts.powder[powder_default])
  const [freerideInfo, setFreerideInfo] = useState(info_texts.freeride[freeride_default])
  const [parkInfo, setParkInfo] = useState(info_texts.park[park_default])
  const [touringInfo, setTouringInfo] = useState(info_texts.touring[touring_default])
  const [levelInfo, setLevelInfo] = useState(info_texts.level[level_default])
  const [playfullInfo, setPlayfullInfo] = useState(info_texts.playfull[playfull_default])
  const [buttonVisable, setButtonVisable] = useState(true)
  const [testText, setTestText] = useState("test text 1")
  const alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrestuvwxyz"
  const numbers: string ="0123456789"
  const [result1, setResult1] = useState("")
  const [result2, setResult2] = useState("")
  const [result3, setResult3] = useState("")
  const [result4, setResult4] = useState("")
  const [result5, setResult5] = useState("")


  const getScores = async () => {
    setLoading(true)
    const result = await (await fetch(`https://ski-selector-rhsyf3ay4q-ez.a.run.app/?level=${level}&playfull=${playfull}&piste=${piste}&powder=${powder}&freeride=${freeride}&park=${park}&touring=${touring}`)).text()
    const json_result = JSON.parse(result)
    const ski_names = Object.keys(json_result)
    const result_array = []
    
    for (const ski of ski_names) {
      result_array.push({ "name": ski, "score": json_result[ski].toFixed(1) })
    }
    // CAREFULL, toFixed turns scores into strings
    const sorted_results: any = result_array.sort(
      (ski1, ski2) => (ski1.score.parseInt < ski2.score) ? 1 : (ski1.score > ski2.score) ? -1 : 0
    )
    setScores(sorted_results)
    setLoading(false)
    setTextWithAnimation(sorted_results[0].score + " | " + sorted_results[0].name, setResult1)
    setTextWithAnimation(sorted_results[1].score + " | " + sorted_results[1].name, setResult2)
    setTextWithAnimation(sorted_results[2].score + " | " + sorted_results[2].name, setResult3)
    setTextWithAnimation(sorted_results[3].score + " | " + sorted_results[3].name, setResult4)
    setTextWithAnimation(sorted_results[4].score + " | " + sorted_results[4].name, setResult5)
  }
  
  const setTextWithAnimation = (text: string, setFunction) => {
    let iterations: number = 0 
    const interval = setInterval(() => {
      setFunction(text.split("").map((letter: string, index: number) => {
        if(index + 15 < iterations ) {
          return letter
        }        
        if (letter == " " || letter == "|" || letter == ".") {
          return letter
        }
        if (parseInt(letter)) {
          return numbers[(Math.floor((Math.random()) * 10))]
        }

        return alphabet[(Math.floor((Math.random()) * 52))]
      }).join("")
      )
      
      if(iterations >= 60) clearInterval(interval)
      iterations += 1
      
    }, 25)
  }


  const inputFields = [
    { "name": "Piste", "id": "piste", "setFunction": setPiste, "default_val": piste_default, "info": pisteInfo, "setInfo": setPisteInfo },
    { "name": "Park", "id": "park", "setFunction": setPark, "default_val": park_default, "info": parkInfo, "setInfo": setParkInfo },
    { "name": "Powder", "id": "powder", "setFunction": setPowder, "default_val": powder_default, "info": powderInfo, "setInfo": setPowderInfo },
    { "name": "Freeride", "id": "freeride", "setFunction": setFreeride, "default_val": freeride_default, "info": freerideInfo, "setInfo": setFreerideInfo },
    { "name": "Touring", "id": "touring", "setFunction": setTouring, "default_val": touring_default, "info": touringInfo, "setInfo": setTouringInfo },
    { "name": "User level", "id": "level", "setFunction": setLevel, "default_val": level_default, "info": levelInfo, "setInfo": setLevelInfo },
    { "name": "Playfullness", "id": "playfull", "setFunction": setPlayfull, "default_val": playfull_default, "info": playfullInfo, "setInfo": setPlayfullInfo },
  ]

  return (
    <>
      <Head>
        <title>Ski Selector</title>
      </Head>
      
      <main className="">
        <div className="flex">
          <SideBar />
          <div className="bg-[url('../public/layered-peaks-haikei.svg')] bg-cover w-screen h-[150vh] absolute">
            <div className="rounded-xl py-4 bg-opacity-50 bg-slate-100 max-w-3xl mx-auto lg:my-10 shadow-lg">
              <div className="grid place-items-center ">
                <h1 className="text-4xl font-bold mb-4">Ski Selector</h1>
                <p className="text-gray-600 mb-6">
                  Move the sliders around to find the right ski!
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-lg ">
                  {inputFields.map((input, index) => (
                    <div key={index}>
                      <label htmlFor={input.id} className="text-gray-600 block mb-2">
                        {`"${input.info}"`}
                      </label>
                      <input
                        type="range"
                        id={input.id}
                        name={input.id}
                        defaultValue={input.default_val.toString()}
                        min="1"
                        max="10"
                        onChange={(val) => {                         
                          input.setFunction(Number(val.target.value))
                          input.setInfo(info_texts[input.id][val.target.value])                         
                          setButtonVisable(false)
                        }}
                        onMouseUp={() => getScores()}
                        onTouchEnd={() => getScores()}
                        className="w-60 accent-blue-500"
                      />
                    </div>
                  ))}
                </div>
                {buttonVisable && <button 
                  onClick={() => {
                    getScores()
                    setButtonVisable(false)
                  }} 
                  className="bg-blue-500 text-white py-2 px-4 rounded-full mt-6 hover:bg-blue-700 transition duration-500 shadow-lg"
                  >
                  {loading ? 'Loading...' : 'Find skis!'}
                </button>}
                
                <div className={`mt-6 bg-slate-200 rounded-xl  transition-all ease-in duration-700 ${scores.length > 0 ? 'opacity-100 px-4 py-4' : 'opacity-0'}`}>
                  <h2 className="text-2xl font-bold mb-2">Your Top Ski Choices</h2>
                  <p className="text-gray-600 font-mono">{result1}</p>
                  <p className="text-gray-600 font-mono">{result2}</p>
                  <p className="text-gray-600 font-mono">{result3}</p>
                  <p className="text-gray-600 font-mono">{result4}</p>
                  <p className="text-gray-600 font-mono">{result5}</p>
                </div>
              </div>
            </div>

          </div>
        </div>


      </main>
    </>
  )
}



