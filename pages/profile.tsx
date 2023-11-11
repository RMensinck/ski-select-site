import SideBar from '../components/sidebar';
import Head from 'next/head'
import Link from 'next/link'
import texts from '../texts/textsProfile' 
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth'
import notLoggedIn from '@/components/notLoggedIn';
import { useState, useEffect } from 'react';
import { setDoc, getDoc, doc } from "firebase/firestore"
import { db } from '@/firebaseConfig';

export default function Home() {
    const router = useRouter()
    const { locale } = router
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    const [enableEdit, setEnableEdit] = useState(false)
    const [name, setName] = useState("Loading..")
    const [level, setLevel] = useState("Loading..")
    const [description, setDescription] = useState("Loading..")
    
    
    
    useEffect(() => {
      const readData = async () => {
        const docSnap = await getDoc(doc(db, "users" , user.uid))
        if (docSnap.exists()) {
          setName(docSnap.data().name)
          setLevel(docSnap.data().level)
          setDescription(docSnap.data().description)
          console.log(docSnap.data().description)
        }
      }
      if (user) {readData()}
    }, [user])


    const writeToFirebase = async (input:{
      name: string,
      level: string,
      description: string
    }) => {
      try {
        const docRef = await setDoc(doc(db, "users", user.uid), input, { merge: true})
      } catch(e) {
        console.error(e)
      }
    }

    if (user) return (
      <>
        <Head>
          <title>{texts.header[locale]}</title>
        </Head>
        <main className="">
          <div className="flex">
            <SideBar />
            <div className="standard-background">
              <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl mx-3 lg:mx-auto my-10 shadow-lg lg:min-w-[48rem] flex flex-col">
                <h1 className="text-4xl font-bold text-dark-blue mx-3 mb-6 mt-7 text-center">
                  {texts.welcome[locale] + ", " + user.displayName}
                </h1>
                {enableEdit === false && 
                <> 
                  <div className="grid place-items-center grid-cols-2">
                    <label>{texts.name[locale]}</label>
                    <p>{name}</p>
                    <label>{texts.level[locale]}</label>
                    <p>{level}</p>
                    <label>{texts.description[locale]}</label>
                    <p>{description}</p>
                  </div>
                  <div className="mx-auto">
                    <button className="bg-dark-blue text-white py-2 px-4 rounded-full mt-6 hover:bg-blue-700 transition duration-500 shadow-lg mx-3" onClick={() => setEnableEdit(true)}>
                      {texts.edit[locale]}
                    </button>
                    <Link href="/submit">
                      <button className="bg-dark-blue text-white py-2 px-4 rounded-full mt-6 hover:bg-blue-700 transition duration-500 shadow-lg mx-3">
                        {texts.submitReview[locale]}
                      </button>
                    </Link>
                  </div>

                </> 
                }
                {enableEdit && 
                <> 
                  <div className="grid place-items-center grid-cols-2">
                    <label htmlFor='name'>{texts.name[locale]}</label>
                    <input type="text" id="name" className="mb-3" onChange={(x) => setName(x.target.value)} placeholder={name}/>
                    <label htmlFor='level'>{texts.level[locale]}</label>
                    <input type="text" id="level" className="mb-3" onChange={(x) => setLevel(x.target.value)} placeholder={level}/>
                    <label htmlFor='description'>{texts.description[locale]}</label>
                    <input type="text" id="description" className="mb-3" onChange={(x) => setDescription(x.target.value)} placeholder={description}/>
                  </div>
                  <button className="bg-dark-blue text-white py-2 px-4 rounded-full mt-6 hover:bg-blue-700 transition max-w-[100px] duration-500 shadow-lg mx-auto" onClick={() => {
                    setEnableEdit(false)
                    writeToFirebase({
                      name: name,
                      level: level,
                      description: description,
                    })
                    }}>
                      {texts.save[locale]}
                  </button>
                </> 
                }
              </div>        
            </div>
          </div>
        </main>
      </>
    )
    else return notLoggedIn()
  }