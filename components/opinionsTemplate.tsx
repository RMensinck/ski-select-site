import SideBar from './sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'



async function getSkiOpinionsOrAddSki(skiName: string) {
  const skiRef = doc(db, 'skis', skiName);

  try {
    const docSnap = await getDoc(skiRef);

    if (docSnap.exists()) {
      console.log('Ski exists, retrieving opinions...');
      return docSnap.data().opinions;
    } else {
      console.log('Ski does not exist, adding to Firestore...');
      await setDoc(skiRef, { opinions: [] });
      return [];
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

export default function Review(skiName: string) {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const { locale } = router 
  const [opinions, setOpinions] = useState([]);
  const [newOpinion, setNewOpinion] = useState('');
  const provider = new GoogleAuthProvider();

  const signIn = async () => {
    const result = await signInWithRedirect(auth, provider)
  }

  useEffect(() => {
    async function fetchOpinions() {
      try {
        const opinions = await getSkiOpinionsOrAddSki(skiName);
        setOpinions(opinions); 
      } catch (error){
        console.error(error)
      } 
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
                    No opinions yet, write the first one!
                  </div>
                ) : (
                  <div className=' text-center'>
                  No opinions yet, log in with your google account write the first one!
                  </div>
                )
              ) : (
                <div className="space-y-4 ">
                  {opinions.map((opinion, index) => (
                    <div key={index} className=" bg-white mx-2 lg:mx-4 rounded-lg p-4 shadow-md">
                      <h3 className="font-semibold">{opinion.user}</h3>
                      <p>{opinion.text}</p>
                      {user.uid === opinion.uid && ( 
                        <button
                          onClick={() => deleteOpinion(index)} 
                          className="text-red hover:text-dark-red"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              

              {user ? ( 
                  <form className='flex flex-col py-4 px-2 lg:px-4' onSubmit={handleSubmit}>
                  <textarea
                    className='rounded-lg shadow-md'
                    value={newOpinion}
                    onChange={(e) => setNewOpinion(e.target.value)}
                    placeholder="Write your opinion here..."
                    rows={4}
                    required
                  />
                  <button className='bg-dark-blue text-white mx-auto my-4 min-w-[200px] rounded-lg shadow-md' type="submit">Submit Opinion</button>
                </form>
              ) : (
                <div className='flex justify-center'>
                  <button 
                    className=' text-white text-center bg-dark-blue mx-auto my-4 min-w-[200px] rounded-lg shadow-md'
                    onClick={() => signIn()}
                    >
                      Log in to submit!
                  </button>
                </div>

              )}




            </div>
          </div>
        </div> 
      </main>
    </>
  )  
}