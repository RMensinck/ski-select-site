import SideBar from '../components/sidebar';
import Head from 'next/head'
import texts from '../components/textsSubmit' 
import { useRouter } from 'next/router'
import titles from '../components/textsSingleReview'
import { useRef, useState } from 'react';
import useAutosizeTextArea from '@/components/AutosizeTextArea';
import { setDoc, getDoc, doc } from "firebase/firestore"
import { db } from '@/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth'

export default function Home() {
    const router = useRouter()
    const { locale } = router
    const [intro, setIntro] = useState("")
    const [pros, setPros] = useState("")
    const [cons, setCons] = useState("")
    const [conclusion, setConclusion] = useState("")
    const [title, setTitle] = useState("")
    const introAreaRef = useRef<HTMLTextAreaElement>(null)
    const prosAreaRef = useRef<HTMLTextAreaElement>(null)
    const consAreaRef = useRef<HTMLTextAreaElement>(null)
    const conclusionAreaRef = useRef<HTMLTextAreaElement>(null)
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)

    useAutosizeTextArea(introAreaRef.current, intro)
    useAutosizeTextArea(prosAreaRef.current, pros)
    useAutosizeTextArea(consAreaRef.current, cons)
    useAutosizeTextArea(conclusionAreaRef.current, conclusion)


    const handleIntroHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = event.target?.value;
      setIntro(val)
    }
    const handleProsHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = event.target?.value;
      setPros(val)
    }
    const handleConsHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = event.target?.value;
      setCons(val)
    }
    const handleConclusionHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = event.target?.value;
      setConclusion(val)
    }

    const logSubmission = async () => {
      const submission = {submission: {
        user: user.displayName,
        title: title,
        intro: intro,
        pros: pros,
        cons: cons,
        conclusion: conclusion
      }}
      
      try {
        const docRef = await setDoc(doc(db, "users", user.uid), submission, { merge: true})
      } catch(e) {
        console.error(e)
      }
      
    }

    return (
      <>
        <Head>
          <title>{texts.header[locale]}</title>
        </Head>
        <main className="">
          <div className="flex">
            <SideBar />
            <div className="standard-background">
              <div className="rounded-xl py-4 bg-opacity-50 bg-grey max-w-3xl mx-3 lg:mx-auto my-10 shadow-lg lg:min-w-[48rem]">
                <div className="grid place-items-center ">
                  <h1 className="text-4xl font-bold text-dark-blue mx-3 mb-6 mt-7">
                    {texts.title[locale]}
                  </h1>
                  <p className="mb-6 text-dark-blue mx-3">
                    {texts.body[locale]}
                  </p>
                  <p className="mb-6 text-dark-blue mx-3 px-6 text-center">
                    {texts.body2[locale]}
                  </p>
                </div>
              </div>
              <div className="rounded-xl py-4 bg-opacity-90 bg-grey max-w-3xl lg:mx-auto mx-3 my-10 shadow-lg lg:min-w-[48rem]">
                <div className="grid place-items-center">
                  <input type="text" className="review-submit-input text-4xl font-bold" placeholder={`[${titles.title[locale]}]`} onChange={(e) => setTitle(e.target?.value)} />
                  <h3 className="text-dark-blue mx-6 mb-2 font-bold text-center">{titles.intro[locale]}</h3>
                  <textarea 
                    onChange={handleIntroHeight} 
                    className="review-submit-input" 
                    placeholder={`[${texts.submitPrefix[locale] + titles.intro[locale]}]`} 
                    id="Intro input"
                    ref={introAreaRef}
                    rows={1}
                    value={intro}
                  />
                  <h3 className="text-dark-blue mx-6 mb-2 font-bold text-center">{titles.pros[locale]}</h3>
                  <textarea 
                    onChange={handleProsHeight} 
                    className="review-submit-input" 
                    placeholder={`[${texts.submitPrefix[locale] + titles.pros[locale]}]`}
                    id="Pros input"
                    ref={prosAreaRef}
                    rows={1}
                    value={pros}
                  />
                  <h3 className="text-dark-blue mx-6 mb-2 font-bold text-center">{titles.cons[locale]}</h3>
                  <textarea 
                    onChange={handleConsHeight} 
                    className="review-submit-input" 
                    placeholder={`[${texts.submitPrefix[locale] + titles.cons[locale]}]`}
                    id="Cons input"
                    ref={consAreaRef}
                    rows={1}
                    value={cons}
                  />
                  <h3 className="text-dark-blue mx-6 mb-2 font-bold text-center">{titles.conclusion[locale]}</h3>
                  <textarea 
                    onChange={handleConclusionHeight} 
                    className="review-submit-input" 
                    placeholder={`[${texts.submitPrefix[locale] + titles.conclusion[locale]}]`}
                    id="Conclusion input"
                    ref={conclusionAreaRef}
                    rows={1}
                    value={conclusion}
                  />
                  <button className="standard-button" onClick={() => logSubmission()}>
                    {texts.submitButton[locale]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  