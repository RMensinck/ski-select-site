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
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from 'firebase/auth'
import texts from '../texts/textsOpinionTemplates'
import Head from 'next/head'
import { useRouter } from 'next/router'
import skis from '../components/allSkisFrontend.json'
import Image from 'next/image'
import { Disclosure, RadioGroup, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Card from '@/components/Card';


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

const brandsWithScrapedPhotos = [
  "Nordica"
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
          icon: selectedMood.value,
          ski: skiName
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
  }, [])

  let images = null
  if (brandsWithScrapedPhotos.includes(ski.brand)) {
    images = [
      {
        id: 0,
        name: 'Ski',
        src: `/skis/${ski.brand}/${ski.model}/${ski.model.replace(/[/_+]/g, '')}-0.png`,
        alt: `Picture of the ${ski.name} skis.`,
      },
      {
        id: 1,
        name: 'Ski',
        src: `/skis/${ski.brand}/${ski.model}/${ski.model.replace(/[/_+]/g, '')}-1.png`,
        alt: `Picture of the ${ski.name} skis.`,
      },
      {
        id: 2,
        name: 'Ski',
        src: `/skis/${ski.brand}/${ski.model}/${ski.model.replace(/[/_+]/g, '')}-2.png`,
        alt: `Picture of the ${ski.name} skis.`,
      },
      {
        id: 3,
        name: 'Ski',
        src: `/skis/${ski.brand}/${ski.model}/${ski.model.replace(/[/_+]/g, '')}-3.png`,
        alt: `Picture of the ${ski.name} skis.`,
      },
    ]
  }

  return (
    <>
    <Head>
      <title>{skiName + " " + texts.opinions[locale]}</title>
      <meta name="description" content={texts.metaDescription[locale]}/>
    </Head>
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <Card>
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-accent-color">{texts.opinions[locale]}</h2>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">{skiName + " " + texts.informationAndOpinions[locale]}</h1>
                {
                  ski.specs && ski.specs.format && ski.specs.format === "perLength" ? (
                    <>
                      { 'availableLengths' in ski.specs &&
                        <table className="mt-6 min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-text">{texts.availableLengths[locale]}</th>
                              {ski.specs.radiuses && <th className="px-3 py-3.5 text-left text-sm font-semibold text-text">{texts.radius[locale]}</th>}
                              {ski.specs.weights && <th className="px-3 py-3.5 text-left text-sm font-semibold text-text">{texts.weight[locale]}</th>}
                              {ski.specs.siteCuts && <th className="px-3 py-3.5 text-left text-sm font-semibold text-text">{texts.dimensions[locale]}</th>}
                              {ski.specs.recommendedMounting && <th className="px-3 py-3.5 text-left text-sm font-semibold text-text">{texts.recommendedMounting[locale]}</th>}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {Array.isArray(ski.specs.availableLengths) && ski.specs.availableLengths.map((length, index) => (
                              <tr key={index}>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-muted">{length}</td>
                                {ski.specs.radiuses && <td className="whitespace-nowrap px-3 py-4 text-sm text-text-muted">{ski.specs.radiuses[index]}</td>}
                                {ski.specs.weights && <td className="whitespace-nowrap px-3 py-4 text-sm text-text-muted">{ski.specs.weights[index]}</td>}
                                {ski.specs.siteCuts && <td className="whitespace-nowrap px-3 py-4 text-sm text-text-muted">{ski.specs.siteCuts[index]}</td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      }
                    </>
                  ) : (
                    <>
                      { Object.keys(ski.specs).length > 0 &&
                        <p className="mt-6 font-bold text-lg leading-8 text-text-muted">
                          {texts.details[locale]}
                        </p>
                      }
                      { 'dimensions' in ski.specs &&
                        <p className="text-lg leading-8 text-text-muted">
                          {texts.dimensions[locale] + ": " + ski.specs.dimensions}
                        </p>
                      }
                      { 'radius' in ski.specs &&
                        <p className="text-lg leading-8 text-text-muted">
                          {texts.radius[locale] + ": " + ski.specs.radius}
                        </p>
                      }
                      { 'weight' in ski.specs &&
                        <p className="text-lg leading-8 text-text-muted">
                          {texts.weight[locale] + ": " + ski.specs.weight}
                        </p>
                      }
                      { 'availableLengths' in ski.specs &&
                        <p className="text-lg leading-8 text-text-muted">
                          {texts.availableLengths[locale] + ": " + ski.specs.availableLengths}
                        </p>
                      }
                      { 'recommendedMounting' in ski.specs &&
                        <p className="text-lg leading-8 text-text-muted">
                          {texts.recommendedMounting[locale] + ": " + ski.specs.recommendedMounting}
                        </p>
                      }
                    </>
                  )
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
                <p className="mt-6 text-lg leading-8 text-text-muted">
                  {texts.body1[locale] + " " + skiName + " " + texts.body2[locale]}
                </p>
            
                {opinions.length === 0 &&
                  <p className=" text-lg leading-8 text-text-muted">
                  {texts.noOpinionsYet[locale]}
                </p>
                }
                {/* Opinion display */}
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-text-muted lg:max-w-none">
                  <ul role="list" className="space-y-6">
                    {opinions.map((opinion, opinionIndex) => (
                      <li key={opinion.createdAt} className="relative flex gap-x-4">
                        <div
                          className={classNames(
                            opinionIndex === opinions.length - 1 ? 'h-6' : '-bottom-6',
                            'absolute left-0 top-0 flex w-8 justify-center bg-bg'
                          )}
                        >
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
                        <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200 bg-bg-light">
                          <div className="flex justify-between gap-x-4">
                            <div className="py-0.5 text-base leading-5 text-text-muted">
                              <span className="font-medium text-text">{opinion.user}</span>
                            </div>
                            <time dateTime={opinion.createdAt} className="flex-none py-0.5 text-xs leading-5 text-text-muted">
                              {opinion.createdAt.toDate().toLocaleDateString()}
                            </time>
                          </div>
                          <p className="text-base leading-6 text-text-muted">{opinion.text}</p>
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
                        alt="Photo of the user"
                        className="h-6 w-6 flex-none rounded-full"
                      />
                      <form onSubmit={handleSubmit} className="relative flex-auto">
                        <div className="overflow-hidden rounded-lg pb-12 bg-bg-light shadow-sm">
                          <label htmlFor="comment" className="sr-only">
                            {texts.writeOpinionPlaceholder[locale]}
                          </label>
                          <textarea
                            rows={2}
                            name="comment"
                            id="comment"
                            className="block w-full resize-none border-0 bg-bg-light py-1.5 text-text placeholder:text-text-muted focus:ring-0 sm:text-sm sm:leading-6"
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
                                    <ListboxLabel className="sr-only">Your mood</ListboxLabel>
                                    <div className="relative">
                                      <ListboxButton className="relative -m-2.5 flex h-10 w-10 bg-bg items-center justify-center rounded-full text-text-muted">
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
                                      </ListboxButton>
                                      <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                      >
                                        <ListboxOptions
                                          className="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-bg-light py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm"
                                        >
                                          {moods.map((mood) => (
                                            <ListboxOption
                                              key={mood.value}
                                              className={({ active }) =>
                                                classNames(
                                                  active ? 'bg-gray-100' : 'bg-bg-light',
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
                                            </ListboxOption>
                                          ))}
                                        </ListboxOptions>
                                      </Transition>
                                    </div>
                                  </>
                                )}
                              </Listbox>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="rounded-md bg-bg-light px-2.5 py-1.5 text-sm font-semibold text-text shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
                          className="rounded-md bg-bg-light px-3.5 py-2.5 text-sm font-semibold text-text shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
          </Card>

          {/* Image(s) */}
          { 
            brandsWithScrapedPhotos.includes(ski.brand) ? (

            <TabGroup as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 w-full max-w-2xl block lg:max-w-none px-4">
                <TabList className="grid grid-cols-4 gap-6">
                  {images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-bg-light text-sm font-medium uppercase text-text hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img 
                              src={image.src} 
                              alt={image.alt} 
                              className="h-full w-full object-contain object-center" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-accent-color' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                {images.map((image) => (
                  <TabPanel key={image.id}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-contain object-center sm:rounded-lg"
                      height={700}
                      width={700}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
            ) : (
              <div className="sm:px-6 lg:px-0">
                <Image
                  src={`/skis/${skiName.replace(/[/_+]/g, '')}.png`}
                  alt="Product screenshot"
                  className=" px-4 sm:mt-60 sm:rotate-90 object-contain h-64"
                  height={500}
                  width={500}
                />
              </div>
            )
          }
        </div>
      </div>
    </div>
    </>
  )
}
