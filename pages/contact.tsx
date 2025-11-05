import { BuildingOffice2Icon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { db } from '@/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import texts from '../texts/textsContact'
import { useEffect } from 'react';
import Card from '@/components/Card';

declare function gtag(...args: any[]): void;

const handleSubmit = async (event) => {
  event.preventDefault();

  const docRef = doc(db, 'contact form', "contact");
  const formData = {
    firstName: (document.getElementById('first-name') as HTMLInputElement).value,
    lastName: (document.getElementById('last-name') as HTMLInputElement).value,
    email: (document.getElementById('email') as HTMLInputElement).value,
    phoneNumber: (document.getElementById('phone-number') as HTMLInputElement).value,
    message: (document.getElementById('message') as HTMLTextAreaElement).value,
    createdAt: new Date()
  };

  try {
    await updateDoc(docRef, {
      messages: arrayUnion(formData)
    }); 
    (document.getElementById('first-name') as HTMLInputElement).value = '';
    (document.getElementById('last-name') as HTMLInputElement).value = '';
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('phone-number') as HTMLInputElement).value = '';
    (document.getElementById('message') as HTMLTextAreaElement).value = '';
  } catch (error) {
  }
};

export default function Contact() {
  const router = useRouter()
  const { locale } = router 

  useEffect(() => {
    gtag('event', 'Contact loaded')
  }, [])

  return (
    <>
      <Head>
        <title>{texts.header[locale]}</title>
        <meta name="description" content={texts.metaDescription[locale]}/>
      </Head>
      <div className="bg-bg-dark">
        <div className="grid max-w-7xl grid-cols-1 lg:grid-cols-2 mx-auto lg:gap-x-16">
          <Card className="my-4 mx-1 md:mx-32 md:my-16 lg:mx-0">
            <div className="relative lg:static">
              <div className=" max-w-xl  lg:max-w-lg">

                <h1 className="text-3xl font-bold tracking-tight text-text">{texts.title[locale]}</h1>
                <p className="mt-6 text-lg leading-8 text-text-muted">
                  {texts.body[locale]}
                </p>
                <dl className="mt-10 space-y-4 text-base leading-7 text-text-muted">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <BuildingOffice2Icon className="h-7 w-6 text-text-muted" aria-hidden="true" />
                    </dt>
                    <dd>
                      {texts.adres[locale]}
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <EnvelopeIcon className="h-7 w-6 text-text-muted" aria-hidden="true" />
                    </dt>
                    <dd>
                      <a className="hover:text-text" href="mailto:remco@pick-a-ski.com">
                        remco@pick-a-ski.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Card>
          <Card className="my-4 mx-1 md:mx-32 md:my-16 lg:mx-0">
            <form action="#" method="POST" className="" onSubmit={handleSubmit}>
              <div className=" max-w-xl lg:mr-0 lg:max-w-lg">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-text">
                      {texts.firstName[locale]}
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-text-muted focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-text">
                      {texts.lastName[locale]}
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-text-muted focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-text">
                      {texts.emailSender[locale]}
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-text-muted focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-text">
                      {texts.phone[locale]}
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="tel"
                        name="phone-number"
                        id="phone-number"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-text-muted focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-text">
                      {texts.message[locale]}
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-text shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-text-muted focus:ring-2 focus:ring-inset focus:ring-accent-color sm:text-sm sm:leading-6"
                        defaultValue={''}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-accent-color px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
                  >
                    {texts.send[locale]}
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}
