import texts from '../../texts/textsHome'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ToolResultsProps {
    result1: string;
    result2: string;
    result3: string;
    result4: string;
    result5: string;
    scores: any[]; 
}


const ToolResults: React.FC<ToolResultsProps> = ({ result1, result2, result3, result4, result5, scores }) => {
  const router = useRouter()
  const { locale } = router
  const [link1, setLink1] = useState("")
  const [link2, setLink2] = useState("")
  const [link3, setLink3] = useState("")
  const [link4, setLink4] = useState("")
  const [link5, setLink5] = useState("")

  useEffect(() => {
    try {
      setLink1("/opinions/"+scores[0].name.replace(/[ /._-]/g, ''))
      setLink2("/opinions/"+scores[1].name.replace(/[ /._-]/g, ''))
      setLink3("/opinions/"+scores[2].name.replace(/[ /._-]/g, ''))
      setLink4("/opinions/"+scores[3].name.replace(/[ /._-]/g, ''))
      setLink5("/opinions/"+scores[4].name.replace(/[ /._-]/g, ''))
    } catch (error) {
    }
    
  }, [scores])

  return (
        <div className={`mt-6 bg-grey rounded-xl bg-opacity-90 transition-all ease-in duration-700 ${scores.length > 0 ? 'opacity-100 px-4 py-4' : 'opacity-0'}`}>
            <h2 className="text-2xl text-dark-blue font-bold mb-2">{texts.choicesTitle[locale]}</h2>
            <Link href={link1}>
              <p className="text-dark-blue font-mono text-sm">{result1}</p></Link>
            <Link href={link2}>
              <p className="text-dark-blue font-mono text-sm">{result2}</p></Link>
            <Link href={link3}>
              <p className="text-dark-blue font-mono text-sm">{result3}</p></Link>
            <Link href={link4}>
              <p className="text-dark-blue font-mono text-sm">{result4}</p></Link>
            <Link href={link5}>
              <p className="text-dark-blue font-mono text-sm">{result5}</p></Link>
        </div>
  ) 
}

export default ToolResults
