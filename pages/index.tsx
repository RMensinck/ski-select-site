import Head from 'next/head'
import { useState } from 'react';
import SideBar from '../components/sidebar';
import texts from '../components/textsHome'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const { locale } = router 
  const playfull_default: number = 5
  const level_default: number = 1
  const piste_default: number = 7
  const powder_default: number = 1
  const freeride_default: number = 1
  const park_default: number = 1
  const touring_default: number = 1
  const [level, setLevel] = useState(level_default)
  const [playfull, setPlayfull] = useState(playfull_default)
  const [piste, setPiste] = useState(piste_default)
  const [park, setPark] = useState(park_default)
  const [powder, setPowder] = useState(powder_default)
  const [freeride, setFreeride] = useState(freeride_default)
  const [touring, setTouring] = useState(touring_default)
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)
  const [pisteInfo, setPisteInfo] = useState(texts.sliders.piste[locale][piste_default])
  const [powderInfo, setPowderInfo] = useState(texts.sliders.powder[locale][powder_default])
  const [freerideInfo, setFreerideInfo] = useState(texts.sliders.freeride[locale][freeride_default])
  const [parkInfo, setParkInfo] = useState(texts.sliders.park[locale][park_default])
  const [touringInfo, setTouringInfo] = useState(texts.sliders.touring[locale][touring_default])
  const [levelInfo, setLevelInfo] = useState(texts.sliders.level[locale][level_default])
  const [playfullInfo, setPlayfullInfo] = useState(texts.sliders.playfull[locale][playfull_default])
  const [buttonVisable, setButtonVisable] = useState(true)
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
      (ski1, ski2) => (parseFloat(ski1.score) < parseFloat(ski2.score)) ? 1 : (parseFloat(ski1.score) > parseFloat(ski2.score)) ? -1 : 0
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
        <title>{texts.header[locale]}</title>
      </Head>
      
      <main className="">
        <div className="flex">
          <SideBar />
          <div className="standard-background">
            
            <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl mx-3 shadow-lg lg:min-w-[48rem]">
              <p className="mb-6 mt-6 text-dark-blue font-bold text-center mx-3">
                {texts.upperAlert1[locale]}
              </p>
              <p className="mb-6 text-dark-blue font-bold text-center">
                {texts.upperAlert2[locale]}
              </p>
              <Link href="/opinions"><p className="mb-6 underline text-dark-blue font-bold text-center">{texts.upperAlert3[locale]}</p></Link>
            </div>

            <div className="rounded-xl py-4 bg-opacity-50 bg-grey min-w-[340px] max-w-3xl mx-auto my-10 shadow-lg lg:min-w-[48rem]">
              <div className="grid place-items-center ">
                <h1 className="text-4xl font-bold text-dark-blue my-4">
                  {texts.title[locale]}
                </h1>
                <p className="mb-6 text-dark-blue">
                {texts.info[locale]}
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-lg ">
                  {inputFields.map((input, index) => (
                    <div key={index} className="">
                      <label htmlFor={input.id} className="text-dark-blue block mb-2 w-auto  text-center">
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
                          input.setInfo(texts.sliders[input.id][locale][val.target.value])                         
                          setButtonVisable(false)
                        }}
                        onMouseUp={() => getScores()}
                        onTouchEnd={() => getScores()}
                        className="accent-dark-blue w-72 lg:w-60"
                      />
                    </div>
                  ))}
                </div>
                {buttonVisable && <button 
                  onClick={() => {
                    getScores()
                    setButtonVisable(false)
                  }} 
                  className="bg-dark-blue text-white py-2 px-4 rounded-full mt-6 hover:bg-blue-700 transition duration-500 shadow-lg"
                  >
                  {loading ? texts.buttonLoading[locale] : texts.button[locale]}
                </button>}
                
                <div className={`mt-6 bg-grey rounded-xl bg-opacity-90 transition-all ease-in duration-700 ${scores.length > 0 ? 'opacity-100 px-4 py-4' : 'opacity-0'}`}>
                  <h2 className="text-2xl text-dark-blue font-bold mb-2">{texts.choicesTitle[locale]}</h2>
                  <p className="text-dark-blue font-mono text-sm">{result1}</p>
                  <p className="text-dark-blue font-mono text-sm">{result2}</p>
                  <p className="text-dark-blue font-mono text-sm">{result3}</p>
                  <p className="text-dark-blue font-mono text-sm">{result4}</p>
                  <p className="text-dark-blue font-mono text-sm">{result5}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl mb-10 mx-3 shadow-lg lg:min-w-[48rem]">
              <p className="mb-6 mt-6 text-dark-blue font-bold text-center mx-3">
                {texts.welcomeMessage[locale]}
              </p>
              <p className="mb-6 text-dark-blue font-bold text-center">
                {texts.welcomeMessage2[locale]}
              </p>
            </div>
          </div>
        </div>


      </main>
    </>
  )
}



