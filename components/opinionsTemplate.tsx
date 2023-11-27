import SideBar from './sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from 'firebase/auth'
import Image from 'next/image';
import texts from '../texts/textsOpinionTemplates'


async function getSkiOpinionsOrAddSki(skiName: string) {
  const skiRef = doc(db, 'skis', skiName.replace("/",""));

  try {
    const docSnap = await getDoc(skiRef);
    if (docSnap.exists()) {
      return docSnap.data().opinions;
    } else {
      await setDoc(skiRef, { opinions: [] });
      return [];
    }
  } catch (error) {}
}

export default function Review(skiName: string, skiPhoto: string="") {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const { locale } = router 
  const [opinions, setOpinions] = useState([]);
  const [newOpinion, setNewOpinion] = useState('');
  const provider = new GoogleAuthProvider();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
  }

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    }
  }, [user])

  useEffect(() => {
    async function fetchOpinions() {
      try {
        const opinions = await getSkiOpinionsOrAddSki(skiName);
        setOpinions(opinions); 
      } catch (error){} 
      }
      fetchOpinions() 
    }, [skiName])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newOpinion.trim()) return;

    const skiRef = doc(db, 'skis', skiName);

    try {
      await updateDoc(skiRef, {
        opinions: arrayUnion({
          text: newOpinion,
          user: user.displayName,
          uid: user.uid,
          createdAt: new Date()
        })
      });
      setOpinions([...opinions, { text: newOpinion, user: user.displayName }]);
      setNewOpinion(''); 
    } catch (error) {
      console.error('Error adding opinion:', error);
    }
  };

  const deleteOpinion = async (index) => {
    // Get the opinion to delete
    const opinionToDelete = opinions[index];
    
    if (!opinionToDelete) return;
  
    // Reference to the Firestore document
    const skiRef = doc(db, 'skis', skiName);
    
    try {
      // Update the document by removing the opinion
      await updateDoc(skiRef, {
        opinions: arrayRemove(opinionToDelete)
      });
      
      // Update local state
      const updatedOpinions = opinions.filter((_, i) => i !== index);
      setOpinions(updatedOpinions);
    } catch (error) {
      console.error('Error deleting opinion:', error);
    }
  };

  return (
    <>
      <Head>
        <title>{skiName}</title>
        <meta name="description" content={texts.metaDescription[locale]}/>
      </Head>   
      <main className="">
        <div className="flex">
          <SideBar />
          <div className="standard-background">
            <div className="rounded-xl py-4 bg-opacity-90 bg-grey max-w-3xl lg:mx-auto mx-3 my-10 shadow-lg lg:min-w-[48rem]">
              <h1 className="text-4xl text-center font-bold text-dark-blue mx-3 mb-6 mt-7">
                    {skiName}
              </h1>
              {opinions.length === 0 ? (
                user ? (
                  <div className=' text-center'>
                    {texts.noOpinionsYet[locale]}
                  </div>
                ) : (
                  <div className=' text-center'>
                    {texts.noOpinionsYetLogin[locale]}
                  </div>
                )
              ) : (
                <div className="space-y-4 ">
                  {opinions.map((opinion, index) => (
                    <div key={index} className=" bg-white mx-2 lg:mx-4 rounded-lg p-4 shadow-md">
                      <article>
                        <header>
                          <h3 className="font-semibold">{opinion.user}</h3>
                        </header>
                        <section>
                          
                          <p>{locale === opinion.locale ? opinion.text : opinion.englishText ? opinion.englishText : opinion.text}</p>
                          {opinion.englishText && opinion.locale != locale && 
                          <p className="text-xs mt-4">{texts.translatedTextNote[locale]}</p>
                          }
                        </section>
                        { user?.uid === opinion.uid && ( 
                          <button
                            onClick={() => deleteOpinion(index)} 
                            className="text-red hover:text-dark-red"
                          >
                            {texts.deleteButton[locale]}
                          </button>
                        )}
                      </article>
                    </div>
                  ))}
                </div>
              )}
              {loggedIn ? ( 
                  <form className='flex flex-col py-4 px-2 lg:px-4' onSubmit={handleSubmit}>
                  <textarea
                    className='rounded-lg shadow-md'
                    value={newOpinion}
                    onChange={(e) => setNewOpinion(e.target.value)}
                    placeholder={texts.writeOpinionPlaceholder[locale]}
                    rows={4}
                    required
                  />
                  <button className='bg-dark-blue text-white mx-auto my-4 min-w-[200px] rounded-lg shadow-md' type="submit">
                    {texts.submitOpinionButton[locale]}
                  </button>
                </form>
              ) : (
                <div className='flex justify-center'>
                  <button 
                    className=' text-white text-center bg-dark-blue mx-auto my-4 min-w-[200px] p-3 rounded-lg shadow-md'
                    onClick={() => signIn()}
                    >
                      {texts.loginToSubmitButton[locale]}
                  </button>
                </div>
              )}
            </div>
            <div className="rounded-xl py-4 px-4 bg-opacity-90 bg-grey max-w-3xl mx-4 my-4 shadow-lg lg:min-w-[12rem]">
              <Image 
                src={"/skis/"+skiName.replace("/","")+".png"} alt={skiName + " photo"} width={800} height={400}
              />
            </div>
          </div>
        </div> 
      </main>
    </>
  )  
}