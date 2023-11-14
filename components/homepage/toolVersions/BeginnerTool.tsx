import React from 'react'
import { useRouter } from 'next/router'
import texts from '../../../texts/textsHome'
import { useState } from 'react';
import ToolResults from '@/components/homepage/toolResults';
import getScores from '@/components/getScores';
import setTextWithAnimation from '@/components/setTextWithAnimation';


const StandardTool: React.FC = ({ }) => {
  
    const router = useRouter()
    const { locale } = router
    const fitness_default: number = 1
    const playfull_default: number = 7
    const [fitness, setFitness] = useState(fitness_default)
    const [playfull, setPlayfull] = useState(playfull_default)
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(false)
    const [fitnessInfo, setFitnessInfo] = useState(texts.beginnerSliders.fitness[locale][fitness_default])
    const [playfullInfo, setPlayfullInfo] = useState(texts.beginnerSliders.playfull[locale][playfull_default])
    const [buttonVisable, setButtonVisable] = useState(true)
    const [result1, setResult1] = useState("")
    const [result2, setResult2] = useState("")
    const [result3, setResult3] = useState("")
    const [result4, setResult4] = useState("")
    const [result5, setResult5] = useState("")
    
    const showScores = async () => {
      let level: number
      let powder: number
      let freeride: number
      let park: number
      let touring: number
      let piste: number 

      if (fitness < 3) {
        level= 1 
        piste = 6 
        powder = 1 
        freeride = 1 
        park = 1 
        touring = 1 
      } else if (fitness < 5) {
        level= 2 
        piste = 7 
        powder = 2 
        freeride = 2 
        park = 2 
        touring = 2 
      } else if (fitness < 7) {
        level= 3 
        piste = 7 
        powder = 3 
        freeride = 3 
        park = 3 
        touring = 3 
      } else {
        level= 3 
        piste = 10
        powder = 3
        freeride = 3
        park = 3
        touring = 3
      }
      await getScores(setLoading, level, playfull, piste, powder, freeride, park, touring).then((result) => {
      setScores(result)
      setTextWithAnimation(result[0].score + " | " + result[0].name, setResult1)
      setTextWithAnimation(result[1].score + " | " + result[1].name, setResult2)
      setTextWithAnimation(result[2].score + " | " + result[2].name, setResult3)
      setTextWithAnimation(result[3].score + " | " + result[3].name, setResult4)
      setTextWithAnimation(result[4].score + " | " + result[4].name, setResult5)
    })}
    
    const inputFields = [
      { "name": "Fitness", "id": "fitness", "setFunction": setFitness, "default_val": fitness_default, "info": fitnessInfo, "setInfo": setFitnessInfo },
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
                  input.setInfo(texts.beginnerSliders[input.id][locale][val.target.value])                         
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