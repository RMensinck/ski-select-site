import React from 'react'
import { useRouter } from 'next/router'
import texts from '../../texts/textsHome'
import { useState } from 'react';
import StandardTool from './toolVersions/StandardTool';
import RaceTool from './toolVersions/RaceTool';
import BeginnerTool from './toolVersions/BeginnerTool';

const PasTool: React.FC = ({ }) => {
  
  const router = useRouter()
  const { locale } = router
  const [toolVersion, setToolVersion] = useState("standard")
  
  return (
    <div className="rounded-xl py-4 bg-opacity-50 bg-grey min-w-[340px] max-w-3xl mx-auto my-10 shadow-lg lg:min-w-[48rem]">
      <div className="grid place-items-center ">
        <h1 className="text-4xl font-bold text-dark-blue my-4">
          {texts.title[locale]}
        </h1>

        <p className="mb-6 text-dark-blue">
        {texts.info[locale]}
        </p>

        <select 
          name="" 
          id="" 
          onChange={(val) => setToolVersion(val.target.value)} 
          className="bg-white outline outline-1 outline-dark-blue text-dark-blue mb-6 rounded-sm"
        >
          <option value="standard">{texts.selectStandard[locale]}</option>
          <option value="beginner">{texts.selectBeginner[locale]}</option>
          <option value="race">{texts.selectRace[locale]}</option>
        </select>

        {toolVersion === "standard" && <StandardTool/>}
        {toolVersion === "beginner" && <BeginnerTool/>}
        {toolVersion === "race" && <RaceTool/>}

      </div>
    </div>
  ) 
}

export default PasTool