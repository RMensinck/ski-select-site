import React from 'react'
import { useRouter } from 'next/router'
import texts from '../../../texts/textsHome'


const StandardTool: React.FC = ({ }) => {
  
  const router = useRouter()
  const { locale } = router




  return (
    <p className="standard-text">{texts.placeholderRace[locale]}</p>
  )
}


export default StandardTool