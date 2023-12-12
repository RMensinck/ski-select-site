import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import texts from '../../../texts/textsHome'
import { useState } from 'react';
import ToolResults from '@/components/homepage/toolResults';
import getScores from '@/components/getScores';
import setTextWithAnimation from '@/components/setTextWithAnimation';

declare function gtag(...args: any[]): void;

const StandardTool: React.FC = ({ }) => {
  
  const router = useRouter()
  const { locale } = router
  const [level, setLevel] = useState(1)
  const [playfull, setPlayfull] = useState(5)
  const [piste, setPiste] = useState(7)
  const [park, setPark] = useState(1)
  const [powder, setPowder] = useState(1)
  const [freeride, setFreeride] = useState(1)
  const [touring, setTouring] = useState(1)
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)
  const [pisteInfo, setPisteInfo] = useState(texts.sliders.piste[locale][piste])
  const [powderInfo, setPowderInfo] = useState(texts.sliders.powder[locale][powder])
  const [freerideInfo, setFreerideInfo] = useState(texts.sliders.freeride[locale][freeride])
  const [parkInfo, setParkInfo] = useState(texts.sliders.park[locale][park])
  const [touringInfo, setTouringInfo] = useState(texts.sliders.touring[locale][touring])
  const [levelInfo, setLevelInfo] = useState(texts.sliders.level[locale][level])
  const [playfullInfo, setPlayfullInfo] = useState(texts.sliders.playfull[locale][playfull])
  const [buttonVisable, setButtonVisable] = useState(true)
  const [result1, setResult1] = useState("")
  const [result2, setResult2] = useState("")
  const [result3, setResult3] = useState("")
  const [result4, setResult4] = useState("")
  const [result5, setResult5] = useState("")
  const [shareURL, setShareURL] = useState("")

  useEffect(() => {
    const query = router.query;
    if (Object.keys(query).length > 0) {
      // Process query parameters
      Object.entries(query).forEach(([key, value]) => {
        localStorage.setItem(key, value.toString());
      });
    }
  }, [router.query]);

  useEffect(() => {

    const savedPlayfullValue = localStorage.getItem('playfull')
    const savedParkValue = localStorage.getItem('park')
    const savedPisteValue = localStorage.getItem('piste')
    const savedPowderValue = localStorage.getItem('powder')
    const savedFreerideValue = localStorage.getItem('freeride')
    const savedTouringValue = localStorage.getItem('touring')
    const savedLevelValue = localStorage.getItem('level')

    if (savedPlayfullValue) {setPlayfull(parseInt(savedPlayfullValue, 10))}
    if (savedParkValue) {setPark(parseInt(savedParkValue, 10))}
    if (savedPisteValue) {setPiste(parseInt(savedPisteValue, 10))}
    if (savedPowderValue) {setPowder(parseInt(savedPowderValue, 10))}
    if (savedFreerideValue) {setFreeride(parseInt(savedFreerideValue, 10))}
    if (savedTouringValue) {setTouring(parseInt(savedTouringValue, 10))}
    if (savedLevelValue) {setLevel(parseInt(savedLevelValue, 10))}

    setShareURL(createShareURL())
  }, [])

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      router.replace(router.pathname, undefined, { shallow: true });
      showScores()
    }
  }, [router]);

  
  useEffect(() => {
    setPlayfullInfo(texts.sliders.playfull[locale][playfull])
    setParkInfo(texts.sliders.park[locale][park])
    setPisteInfo(texts.sliders.piste[locale][piste])
    setPowderInfo(texts.sliders.powder[locale][powder])
    setFreerideInfo(texts.sliders.freeride[locale][freeride])
    setTouringInfo(texts.sliders.touring[locale][touring])
    setLevelInfo(texts.sliders.level[locale][level])

    setShareURL(createShareURL())
  }, [playfull, park, piste, powder, freeride, touring, level]);

  const showScores = async () => {
    await getScores(setLoading, level, playfull, piste, powder, freeride, park, touring).then((result) => {
    setScores(result)
    setTextWithAnimation(result[0].score + " | " + result[0].name, setResult1)
    setTextWithAnimation(result[1].score + " | " + result[1].name, setResult2)
    setTextWithAnimation(result[2].score + " | " + result[2].name, setResult3)
    setTextWithAnimation(result[3].score + " | " + result[3].name, setResult4)
    setTextWithAnimation(result[4].score + " | " + result[4].name, setResult5)
  })}

  const handleChange = (val, inputField) => {
    inputField.setFunction(Number(val.target.value))
    localStorage.setItem(inputField.id, val.target.value)
    setButtonVisable(false)
    setShareURL(createShareURL())  
    gtag('event', 'slider_change', {
      'event_category': 'Standard_tool_slider',
      'event_label': inputField.id,
      'value': val.target.value
    })
  }

  const createShareURL = () => {
    const params = new URLSearchParams()
    params.append("level", level.toString())
    params.append("playfull", playfull.toString())
    params.append("piste", piste.toString())
    params.append("powder", powder.toString())
    params.append("freeride", freeride.toString())
    params.append("park", park.toString())
    params.append("touring", touring.toString())
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }
  
  const inputFields = [
    { "name": "Piste", "id": "piste", "setFunction": setPiste, "default_val": piste, "info": pisteInfo, "setInfo": setPisteInfo },
    { "name": "Park", "id": "park", "setFunction": setPark, "default_val": park, "info": parkInfo, "setInfo": setParkInfo },
    { "name": "Powder", "id": "powder", "setFunction": setPowder, "default_val": powder, "info": powderInfo, "setInfo": setPowderInfo },
    { "name": "Freeride", "id": "freeride", "setFunction": setFreeride, "default_val": freeride, "info": freerideInfo, "setInfo": setFreerideInfo },
    { "name": "Touring", "id": "touring", "setFunction": setTouring, "default_val": touring, "info": touringInfo, "setInfo": setTouringInfo },
    { "name": "User level", "id": "level", "setFunction": setLevel, "default_val": level, "info": levelInfo, "setInfo": setLevelInfo },
    { "name": "Playfullness", "id": "playfull", "setFunction": setPlayfull, "default_val": playfull, "info": playfullInfo, "setInfo": setPlayfullInfo },
  ]

  return (
    <div className='grid place-items-center'>
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
              value={input.default_val.toString()}
              min="1"
              max="10"
              onChange={(val) => {handleChange(val, input)}}
              onMouseUp={() => showScores()}
              onTouchEnd={() => showScores()}
              className="accent-dark-blue w-72 lg:w-60"
            />
          </div>
        ))}
      </div>

      {buttonVisable && <button 
      onClick={() => {
      showScores()
      setButtonVisable(false)
      }} 
      className="bg-dark-blue text-white py-2 px-4 rounded-full mt-6 hover:bg-blue-700 transition duration-500 shadow-lg"
      >
      {loading ? texts.buttonLoading[locale] : texts.button[locale]}
      </button>}

      <ToolResults
      result1={result1}
      result2={result2}
      result3={result3}
      result4={result4}
      result5={result5}
      scores={scores}
      shareURL={shareURL}
      />

    </div>
  )
}


export default StandardTool