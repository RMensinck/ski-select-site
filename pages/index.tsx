import Head from 'next/head'
import { useState } from 'react';
import SideBar from '../components/sidebar';
import texts from '../texts/textsHome'
import { useRouter } from 'next/router'
import ToolResults from '@/components/homepage/toolResults';
import TextField from '@/components/textField';
import PasTool from '@/components/homepage/PasTool';

export default function Home() {
  const router = useRouter()
  const { locale } = router 

  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
      </Head>
      
      <main className="">
        <div className="flex">
          <SideBar />
          <div className="standard-background">
            
            <TextField
              texts={[texts.upperAlert1[locale], texts.upperAlert2[locale]]}
              links={[{text: texts.upperAlert3[locale], href: "/opinions"}]}
            />

            <PasTool />

            <TextField
              texts={[texts.welcomeMessage[locale], texts.welcomeMessage2[locale]]}
              links={[]}
            />

          </div>
        </div>
      </main>
    </>
  )
}



