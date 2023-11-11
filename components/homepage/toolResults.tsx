import texts from '../../texts/textsHome'
import { useRouter } from 'next/router'
import React from 'react'

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

  return (
        <div className={`mt-6 bg-grey rounded-xl bg-opacity-90 transition-all ease-in duration-700 ${scores.length > 0 ? 'opacity-100 px-4 py-4' : 'opacity-0'}`}>
            <h2 className="text-2xl text-dark-blue font-bold mb-2">{texts.choicesTitle[locale]}</h2>
            <p className="text-dark-blue font-mono text-sm">{result1}</p>
            <p className="text-dark-blue font-mono text-sm">{result2}</p>
            <p className="text-dark-blue font-mono text-sm">{result3}</p>
            <p className="text-dark-blue font-mono text-sm">{result4}</p>
            <p className="text-dark-blue font-mono text-sm">{result5}</p>
        </div>
  ) 
}

export default ToolResults
