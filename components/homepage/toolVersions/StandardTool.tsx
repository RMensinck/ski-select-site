import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import texts from '../../../texts/textsHome'
import { useState } from 'react';
import ToolResults from '@/components/homepage/toolResults';
import getScores from '@/components/getScores';
import setTextWithAnimation from '@/components/setTextWithAnimation';

const StandardTool: React.FC = ({ }) => {
  
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
  const [result1, setResult1] = useState("")
  const [result2, setResult2] = useState("")
  const [result3, setResult3] = useState("")
  const [result4, setResult4] = useState("")
  const [result5, setResult5] = useState("")
  
  const showScores = async () => {
    await getScores(setLoading, level, playfull, piste, powder, freeride, park, touring).then((result) => {
    setScores(result)
    setTextWithAnimation(result[0].score + " | " + result[0].name, setResult1)
    setTextWithAnimation(result[1].score + " | " + result[1].name, setResult2)
    setTextWithAnimation(result[2].score + " | " + result[2].name, setResult3)
    setTextWithAnimation(result[3].score + " | " + result[3].name, setResult4)
    setTextWithAnimation(result[4].score + " | " + result[4].name, setResult5)
  })}
  
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
              defaultValue={input.default_val.toString()}
              min="1"
              max="10"
              onChange={(val) => {                         
                input.setFunction(Number(val.target.value))
                input.setInfo(texts.sliders[input.id][locale][val.target.value])                         
                setButtonVisable(false)
              }}
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
      />

    </div>
  )
}


export default StandardTool