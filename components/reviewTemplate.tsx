import Head from 'next/head'
import { useRouter } from 'next/router'
import reviews from '../public/reviews/reviews.json'
import texts from '../texts/textsSingleReview'
import affiliateTexts from '../texts/textsAffiliateCard'
import { useEffect, useState, Fragment } from 'react';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react'
import Image from 'next/image';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage, db } from '../firebaseConfig';
import Card from '@/components/Card';
import ReactMarkdown from 'react-markdown';
import Particles from './Particles';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import AffiliateCard from './AffiliateCard';

declare function gtag(...args: any[]): void;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbs up', value: 'thumbsup', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-accent-color' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

async function getSkiOpinionsOrAddSki(skiName: string) {
  const skiRef = doc(db, 'skis', skiName.replace("/", ""));

  try {
    const docSnap = await getDoc(skiRef);
    if (docSnap.exists()) {
      return docSnap.data().opinions;
    } else {
      await setDoc(skiRef, { opinions: [] });
      return [];
    }
  } catch (error) { }
}

export default function Review(skiName: string) {
  const router = useRouter()
  const { locale } = router
  const review = reviews[skiName]
  const [firebaseImages, setFirebaseImages] = useState([])
  const [firebaseImagesLoading, setFirebaseImagesLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // Opinion-related state
  const [selectedMood, setSelectedMood] = useState(moods[4])
  const [opinions, setOpinions] = useState([])
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const provider = new GoogleAuthProvider();
  const [newOpinion, setNewOpinion] = useState('');

  // Check if this is the new v3 format
  const isV3Format = review.format_version === "v3"

  // Initialize content based on format
  const [shownContent, setShownContent] = useState(() => {
    if (isV3Format) {
      return review.reviews?.[locale] || review.markdown?.[review.originalLanguage]
    } else {
      return review.paragraphs?.[locale] || review.paragraphs?.[review.originalLanguage] || []
    }
  })

  const [showLanguageDisclaimer, setShowLanguageDisclaimer] = useState(false)

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
    } catch (error) {
      console.error('Error getting opinions:', error);
    }
  }

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
      fetchOpinions();
      setNewOpinion('');
    } catch (error) {
      console.error('Error adding opinion:', error);
    }
  };

  const deleteOpinion = async (index) => {
    console.log(index)
    let opinionToDelete = opinions[index];
    delete opinionToDelete.mood;

    if (!opinionToDelete) return;

    const skiRef = doc(db, 'skis', skiName);

    try {
      await updateDoc(skiRef, {
        opinions: arrayRemove(opinionToDelete)
      });

      const updatedOpinions = opinions.filter((_, i) => i !== index);
      setOpinions(updatedOpinions);
    } catch (error) {
      console.error('Error deleting opinion:', error);
    }
  };

  useEffect(() => {
    if (locale != review.originalLanguage) {
      setShowLanguageDisclaimer(true)
    }
    gtag('event', `review ${skiName} loaded`)
  }, [locale, review.originalLanguage, skiName])

  useEffect(() => {
    fetchOpinions()
  }, [skiName])

  useEffect(() => {
    const loadFirebaseImages = async () => {
      setFirebaseImagesLoading(true)
      const imagePromises = []

      // Create promises for first 10 images using Firebase SDK
      for (let i = 1; i <= 10; i++) {
        const imagePath = `skis/${review.brand}/${review.model}-${i}.webp`

        imagePromises.push(
          (async () => {
            try {
              const imageRef = ref(storage, imagePath);
              const url = await getDownloadURL(imageRef);
              return {
                id: i - 1,
                name: 'Ski',
                src: url,
                alt: `Picture of the ${review.brand} ${review.model} skis.`,
              };
            } catch (error) {
              console.log(`Image not found: ${imagePath}`);
              return null;
            }
          })()
        );
      }

      const results = await Promise.all(imagePromises)
      const validImages = results.filter(img => img !== null)
      console.log("Loaded Firebase images:", validImages);
      setFirebaseImages(validImages)
      setFirebaseImagesLoading(false)
    }

    loadFirebaseImages()
  }, [review])

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      // Create a unique filename
      const timestamp = Date.now()
      const fileName = `${review.brand}-${review.model}-user-${timestamp}.webp`
      const uploadPath = `user_uploads/${fileName}`

      // Create storage reference
      const storageRef = ref(storage, uploadPath)

      // Upload file
      await uploadBytes(storageRef, file)

      setUploadSuccess(true)
      setUploading(false)

      // Show success message
      setTimeout(() => {
        setUploadSuccess(false)
      }, 3000)

    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
      setUploading(false)
    }
  }

  const renderContent = () => {
    if (isV3Format) {
      // Check if markdown contains H1
      const hasH1 = typeof shownContent === 'string' && shownContent.includes('# ')

      return (
        <div className="max-w-xl text-base leading-7 text-text-muted lg:max-w-lg prose prose-lg max-w-none">
          {/* Render H1 title if markdown doesn't have one */}
          {!hasH1 && (
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl mb-6">
              {review.brand} {review.model}
            </h1>
          )}
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mt-6 mb-6" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-text mt-6" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-text mt-4" {...props} />,
              p: ({ node, ...props }) => <p className="mt-6 first:mt-0" {...props} />,
            }}
          >
            {typeof shownContent === 'string' ? shownContent : ''}
          </ReactMarkdown>
        </div>
      )
    } else {
      // Render old format with titles and paragraphs
      return (
        <div className="max-w-xl text-base leading-7 text-text-muted lg:max-w-lg">
          {/* Always show H1 for old format */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl mb-6">
            {review.brand} {review.model}
          </h1>
          {Array.isArray(shownContent) && shownContent.map((paragraph: string, index: number) => (
            <div key={index}>
              {review.titles && review.titles[locale] && review.titles[locale][index] && (
                <h2 className="mt-6 text-xl font-semibold text-text">
                  {review.titles[locale][index]}
                </h2>
              )}
              <p
                className={index === 0 ? "mt-0" : "mt-6"}
                key={index}
              >
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      )
    }
  }

  const trackAffiliateClick = async () => {
    try {
      const clickData = {
        timestamp: new Date(),
        path: router.asPath,
        locale: locale,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent
      }

      const affiliateRef = doc(db, 'affiliate clicks', 'clipstic')
      await updateDoc(affiliateRef, {
        clicks: arrayUnion(clickData)
      })

      gtag('event', 'affiliate_click', {
        'event_category': 'affiliate',
        'event_label': 'clipstic',
        'value': 1
      })
    } catch (error) {
      console.error('Error tracking affiliate click:', error)
    }
  }

  return (
    <>
      <Head>
        {review.meta_titles ? <meta name="title" content={review.meta_titles[locale]} /> : <title>{skiName + " " + texts.review[locale]}</title>}
        {review.meta_descriptions ? <meta name="description" content={review.meta_descriptions[locale]} /> : <meta name="description" content={texts.metaDescription[locale]} />}
      </Head>

      <div className=" overflow-hidden lg:overflow-visible">
        <Card className="md:mx-auto px-2 m-2">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10 lg:px-12">

            {/* Author info section */}
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="">
                <div className="lg:max-w-lg">
                  <div className="flex">
                    <div className="mr-4 h-10 w-10 rounded-full bg-bg-light overflow-hidden flex-shrink-0">
                      <Image
                        src={reviews[skiName].authorPicture}
                        alt="Picture of the review author"
                        className="h-full w-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>
                    <p className="self-center text-base font-semibold leading-7 text-accent-color">{texts.by[locale] + " " + reviews[skiName].author}</p>
                  </div>

                  {showLanguageDisclaimer &&
                    <p
                      className="mt-2 text-base leading-8 text-text-muted underline hover:cursor-pointer"
                      onClick={() => {
                        if (isV3Format) {
                          setShownContent(review.markdown?.[review.originalLanguage] || '')
                        } else {
                          setShownContent(review.paragraphs[review.originalLanguage])
                        }
                        setShowLanguageDisclaimer(false)
                      }}
                    >
                      {texts.originalLanguage1[locale] + " " + texts[review.originalLanguageFull][locale] + "."}
                    </p>
                  }
                </div>
              </div>
            </div>

            {/* Review content section */}
            <div className="lg:col-start-1 lg:row-start-2 lg:pr-8">
              {renderContent()}
            </div>

            {/* Images and Comments section - combined in same column */}
            <div className="lg:col-start-2 lg:row-start-2 lg:max-w-[900px] space-y-8">

              {/* Images section */}
              {firebaseImagesLoading ? (
                <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-color mx-auto mb-4"></div>
                    <p className="text-text-muted">Loading images...</p>
                  </div>
                </div>
              ) : firebaseImages.length > 0 ? (
                <Card className="bg-bg-light">
                  <TabGroup as="div" className="flex flex-col-reverse">
                    {/* Image selector */}
                    <div className="mx-auto mt-6 w-full max-w-2xl block lg:max-w-none px-4">
                      <TabList className="grid grid-cols-4 gap-6">
                        {firebaseImages.map((image) => (
                          <Tab
                            key={image.id}
                            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-text hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                          >
                            {({ selected }) => (
                              <>
                                <span className="sr-only">{image.name}</span>
                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                  <Image
                                    src={image.src}
                                    alt={image.alt}
                                    className="h-full w-full object-contain object-center"
                                    fill
                                    sizes="96px"
                                  />
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
                      {firebaseImages.map((image) => (
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
                </Card>
              ) : (
                <Card className="bg-bg-light relative overflow-hidden">
                  {/* Particles as background */}
                  <div className="absolute inset-0 w-full h-full">
                    <Particles
                      particleColors={['#ffffff', '#ffffff']}
                      particleCount={200}
                      particleSpread={10}
                      speed={0.1}
                      particleBaseSize={100}
                      moveParticlesOnHover={true}
                      alphaParticles={false}
                      disableRotation={false}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Content overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-96 p-8 text-center bg-white/10">
                    {uploadSuccess ? (
                      // Success state
                      <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-text mb-2">Upload Successful!</h3>
                        <p className="text-text-muted">Thank you for contributing an image of the {review.brand} {review.model}.</p>
                      </div>
                    ) : (
                      // Upload prompt
                      <>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-text mb-2">{texts.imagesHelp[locale]}</h3>
                        <p className="text-text-muted mb-6 max-w-sm">
                          {texts.imagesHelpBody[locale]} {review.brand} {review.model} skis.
                        </p>

                        <div className="w-full max-w-xs">
                          <label className="block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={uploading}
                              className="sr-only"
                            />
                            <div className={`cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors backdrop-blur-sm bg-white/50 ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                              }`}>
                              {uploading ? (
                                <div className="flex flex-col items-center">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-color mb-2"></div>
                                  <span className="text-sm text-text-muted">Uploading...</span>
                                </div>
                              ) : (
                                <>
                                  <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span className="text-sm font-medium text-accent-color">Upload Image</span>
                                  <span className="block text-xs text-text-muted mt-1">PNG, JPG, WEBP up to 5MB</span>
                                </>
                              )}
                            </div>
                          </label>
                        </div>

                        <p className="text-xs text-text-muted mt-4 max-w-sm">
                          {texts.imagesHelpDisclaimer[locale]}
                        </p>
                      </>
                    )}
                  </div>
                </Card>
              )}

              {/* Opinion section - now in same column as images */}
              <Card className="bg-bg-light">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text mb-6">Community Opinions</h3>

                  {/* Opinion display */}
                  <ul role="list" className="space-y-6 mb-8">
                    {opinions.map((opinion, opinionIndex) => (
                      <li key={opinion.createdAt} className="relative flex gap-x-4">
                        <div
                          className={classNames(
                            opinionIndex === opinions.length - 1 ? 'h-6' : '-bottom-6',
                            'absolute left-0 top-0 flex w-8 justify-center bg-bg-light'
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
                        <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200 bg-white">
                          <div className="flex justify-between gap-x-4">
                            <div className="py-0.5 text-base leading-5 text-text-muted">
                              <span className="font-medium text-text">{opinion.user}</span>
                            </div>
                            <time dateTime={opinion.createdAt} className="flex-none py-0.5 text-xs leading-5 text-text-muted">
                              {opinion.createdAt.toDate().toLocaleDateString()}
                            </time>
                          </div>
                          <p className="text-base leading-6 text-text-muted">{opinion.text}</p>
                          {user?.uid === opinion.uid && (
                            <button
                              onClick={() => deleteOpinion(opinionIndex)}
                              className="text-red-500 hover:text-red-700 text-sm mt-2"
                            >
                              Delete
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
                          <div className="overflow-hidden rounded-lg pb-12 bg-white shadow-sm ring-1 ring-inset ring-gray-200">
                            <label htmlFor="comment" className="sr-only">
                              Add your opinion
                            </label>
                            <textarea
                              rows={2}
                              name="comment"
                              id="comment"
                              className="block w-full resize-none border-0 border ring-1 ring-inset ring-gray-200 py-1.5 text-text placeholder:text-text-muted focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Share your thoughts about this ski..."
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
                                        <ListboxButton className="relative -m-2.5 flex h-10 w-10 bg-bg-light items-center justify-center rounded-full text-text-muted">
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
                                            className="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm"
                                          >
                                            {moods.map((mood) => (
                                              <ListboxOption
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
                              className="rounded-md bg-accent-color px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            >
                              Post
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : ( // If not logged in
                      <div className="mt-6 flex gap-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-accent-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                          onClick={signIn}
                        >
                          Log in to share your opinion!
                        </button>
                      </div>
                    )
                  }
                </div>

              </Card>
            </div>

          </div>
          {/* Affiliate Product Promotion */}
          <div className="lg:mx-20">
            <AffiliateCard
              productName={affiliateTexts.productName[locale]}
              description={affiliateTexts.description[locale]}
              affiliateUrl="https://25553a.myshopify.com?ref=4Io7TnpszTD5&mid=205&d=UE9QRkxZQkZBOEMyQUY="
              imageUrl="/brands/affiliates/clipstic2.webp"
              ctaText={affiliateTexts.ctaText[locale]}
              badgeText={affiliateTexts.badgeText[locale]}
              disclaimer=""
              onClick={trackAffiliateClick}
            />
          </div>
        </Card>
      </div>
    </>
  )
}