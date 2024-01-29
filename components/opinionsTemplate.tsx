import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { Fragment, useState, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from 'firebase/auth'
import texts from '../texts/textsOpinionTemplates'
import Head from 'next/head'
import { useRouter } from 'next/router'
import skis from '../components/allSkisFrontend.json'

declare function gtag(...args: any[]): void;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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




const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbs up', value: 'thumbsup', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-accent-color' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

export default function Example(skiName: string) {
  const [selectedMood, setSelectedMood] = useState(moods[4])
  const [opinions, setOpinions] = useState([])
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const provider = new GoogleAuthProvider();
  const [newOpinion, setNewOpinion] = useState('');
  const router = useRouter()
  const { locale } = router 
  const ski = skis.find(ski => ski.name === skiName)

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
  }
  
  async function fetchOpinions() {
    try {
      let opinions = await getSkiOpinionsOrAddSki(skiName);

      opinions = opinions.map(opinion => {
        let moodIndex = moods.findIndex(mood => mood.value === opinion.icon);
        if (moodIndex === -1) {
          moodIndex = 4; // Default to the mood at index 4 if no mood is present
        }
        return {
          ...opinion,
          mood: moods[moodIndex]
        };
      });

      opinions.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
      setOpinions(opinions);
    } catch (error){
      console.error('Error getting opinions:', error);
    } 
  }

  useEffect(() => {
    fetchOpinions() 
    }, [skiName])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newOpinion.trim()) return;

    const skiRef = doc(db, 'skis', skiName);
    const logRef = doc(db, 'allOpinions', 'allOpinions')
    try {
      await updateDoc(skiRef, {
        opinions: arrayUnion({
          text: newOpinion,
          user: user.displayName,
          uid: user.uid,
          createdAt: new Date(),
          icon: selectedMood.value
        })
      });
      await updateDoc(logRef, {
        opinions: arrayUnion({
          text: newOpinion,
          user: user.displayName,
          uid: user.uid,
          createdAt: new Date(),
          icon: selectedMood.value
        })
      });
      // setOpinions([...opinions, { text: newOpinion, user: user.displayName }]);
      fetchOpinions();
      setNewOpinion(''); 
    } catch (error) {
      console.error('Error adding opinion:', error);
    }
  };

  const deleteOpinion = async (index) => {
    // Get the opinion to delete
    console.log(index)
    let opinionToDelete = opinions[index];
    delete opinionToDelete.mood;
    
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

  useEffect(() => {
    gtag('event', `opinion ${skiName} loaded`)
  })

  return (
    <>
    <Head>
      <title>{skiName + " " + texts.opinions[locale]}</title>
      <meta name="description" content={texts.metaDescription[locale]}/>
    </Head>
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-accent-color">{texts.opinions[locale]}</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{skiName}</p>
              
              { ski.dimentions && ski.weight && ski.availableLengths && ski.radius &&
                <p className="mt-6 font-bold text-lg leading-8 text-gray-600">
                  {texts.details[locale]}
                </p>
              }
              { ski.dimentions &&
                <p className="text-lg leading-8 text-gray-600">
                  {texts.dimentions[locale] + ": " + ski.dimentions}
                </p>
              }
              { ski.radius &&
                <p className="text-lg leading-8 text-gray-600">
                  {texts.radius[locale] + ": " + ski.radius}
                </p>
              }
              { ski.weight &&
                <p className="text-lg leading-8 text-gray-600">
                  {texts.weight[locale] + ": " + ski.weight}
                </p>
              }
              { ski.availableLengths &&
                <p className="text-lg leading-8 text-gray-600">
                  {texts.availableLengths[locale] + ": " + ski.availableLengths}
                </p>
              }
              { ski.recommendedMounting &&
                <p className="text-lg leading-8 text-gray-600">
                  {texts.recommendedMounting[locale] + ": " + ski.recommendedMounting}
                </p>
              }
              {
                ski.reviewHref && 
                <button 
                  className="relative mt-4 inline-flex items-center gap-x-1.5 rounded-md bg-accent-color hover:bg-indigo-500 hover:shadow-xl px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => window.open(ski.reviewHref, "_blank")}
                >
                  {texts.seeReview[locale]}
                </button>
              }

              <p className="mt-6 text-lg leading-8 text-gray-600">
                {texts.body1[locale] + " " + skiName + " " + texts.body2[locale]}
              </p>
              
              {opinions.length === 0 &&
                <p className=" text-lg leading-8 text-gray-600">
                {texts.noOpinionsYet[locale]}
              </p>
              }

              {/* Opinion display */}
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">

                <ul role="list" className="space-y-6">
                  {opinions.map((opinion, opinionIndex) => (
                    <li key={opinion.createdAt} className="relative flex gap-x-4">
                      <div
                        className={classNames(
                          opinionIndex === opinions.length - 1 ? 'h-6' : '-bottom-6',
                          'absolute left-0 top-0 flex w-8 justify-center '
                        )}
                      >
                      <div className="w-px bg-gray-200" />
                      </div>
                        {opinion.mood &&
                          <div className="flex items-center z-10 ">
                            <div
                              className={classNames(
                                opinion.mood.bgColor,
                                'flex h-8 w-8 items-center justify-center rounded-full'
                              )}
                            >
                              <opinion.mood.icon
                                className={classNames(opinion.mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                                aria-hidden="true"
                              />
                            </div>
                          </div>

                        }

                      <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                        <div className="flex justify-between gap-x-4">
                          <div className="py-0.5 text-base leading-5 text-gray-500">
                            <span className="font-medium text-gray-900">{opinion.user}</span>
                          </div>
                          <time dateTime={opinion.createdAt} className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                            {opinion.createdAt.toDate().toLocaleDateString()}
                          </time>
                        </div>
                        <p className="text-base leading-6 text-gray-500">{opinion.text}</p>
                        { user?.uid === opinion.uid && ( 
                          <button
                            onClick={() => deleteOpinion(opinionIndex)} 
                            className="text-custom-red hover:text-dark-red text-sm"
                          >
                            {texts.deleteButton[locale]}
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* New comment form */}
                {
                  user ? (
                  <div className="mt-6 flex gap-x-3">
                    <img
                      src={user.photoURL}
                      alt=""
                      className="h-6 w-6 flex-none rounded-full bg-gray-50"
                    />
                    <form onSubmit={handleSubmit} className="relative flex-auto">
                      <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-accent-color">
                        <label htmlFor="comment" className="sr-only">
                          {texts.writeOpinionPlaceholder[locale]}
                        </label>
                        <textarea
                          rows={2}
                          name="comment"
                          id="comment"
                          className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder={texts.writeOpinionPlaceholder[locale]}
                          defaultValue={''}
                          required
                          onChange={(x) => setNewOpinion(x.target.value)}
                        />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                        <div className="flex items-center space-x-5">
                          <div className="flex items-center">
                            <Listbox value={selectedMood} onChange={setSelectedMood}>
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                                  <div className="relative">
                                    <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                      <span className="flex items-center justify-center">
                                        {selectedMood.value === null ? (
                                          <span>
                                            <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                            <span className="sr-only">Add your mood</span>
                                          </span>
                                        ) : (
                                          <span>
                                            <span
                                              className={classNames(
                                                selectedMood.bgColor,
                                                'flex h-8 w-8 items-center justify-center rounded-full'
                                              )}
                                            >
                                              <selectedMood.icon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                                            </span>
                                            <span className="sr-only">{selectedMood.name}</span>
                                          </span>
                                        )}
                                      </span>
                                    </Listbox.Button>

                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options 
                                        className="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm"
                                      >
                                        {moods.map((mood) => (
                                          <Listbox.Option
                                            key={mood.value}
                                            className={({ active }) =>
                                              classNames(
                                                active ? 'bg-gray-100' : 'bg-white',
                                                'relative cursor-default select-none px-3 py-2'
                                              )
                                            }
                                            value={mood}
                                          >
                                            <div className="flex items-center">
                                              <div
                                                className={classNames(
                                                  mood.bgColor,
                                                  'flex h-8 w-8 items-center justify-center rounded-full'
                                                )}
                                              >
                                                <mood.icon
                                                  className={classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                                                  aria-hidden="true"
                                                />
                                              </div>
                                              <span className="ml-3 block truncate font-medium">{mood.name}</span>
                                            </div>
                                          </Listbox.Option>
                                        ))}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </>
                              )}
                            </Listbox>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          {texts.submitOpinionButton[locale]}
                        </button>
                      </div>
                    </form>
                  </div>
                  ) : ( // If not logged in
                    <div className="mt-6 flex gap-x-3">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={signIn}
                     >
                        Log in to submit a opinion!
                      </button>
                    </div>
                  )
                }



              </dl>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0 h-screen">
            <img
              src={`/skis/${skiName.replace(/[/_]/g, '')}.png`}
              alt="Product screenshot"
              className=" px-4 sm:mt-60 sm:rotate-90 object-contain h-64"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
