import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../components/textsProfile' 
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth'
import notLoggedIn from '@/components/notLoggedIn';
import { useState } from 'react';

export default function Home() {
    const router = useRouter()
    const { locale } = router
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)


    if (user) return (
      <>
        <Head>
          <title>{texts.header[locale]}</title>
        </Head>
        <main className="">
          <div className="flex">
            <SideBar />
            <div className="bg-[url('../public/background.svg')] bg-cover w-screen min-h-screen absolute flex flex-col lg:flex-row items-center bg-fixed">
              <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl mx-3 lg:mx-auto my-10 shadow-lg lg:min-w-[48rem]">
                <div className="grid place-items-center ">
                  <h1 className="text-4xl font-bold text-dark-blue mx-3 mb-6 mt-7 text-center">
                    {texts.welcome[locale] + ", " + user.displayName}
                  </h1>
                  <p className="mx-3 text-center">
                    {texts.soon[locale]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
    else return (
      notLoggedIn()
    )
  }