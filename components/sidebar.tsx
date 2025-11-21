import { Fragment } from 'react'
import { Disclosure, Menu, Transition, MenuButton, MenuItem, MenuItems, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import texts from '../texts/textsSidebar'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import Link from 'next/link'
import LanguageMenu from './LanguageMenu'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const router = useRouter()
  const { locale } = router 
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const provider = new GoogleAuthProvider();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider)
  }

  return (
    <Disclosure as="nav" className="bg-bg shadow-sm md:rounded-full md:mx-4 md:my-4 lg:max-w-6xl lg:mx-auto 2xl:max-w-7xl">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-color">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <img
                      className="h-8 w-auto"
                      src="/logo.svg"
                      alt="Pick-a-ski logo"
                    />                    
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link
                    href="/"
                    className={router.asPath === "/" ? "inline-flex items-center border-b-2 border-accent-color px-1 pt-1 text-sm font-medium text-text" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-text-muted hover:border-gray-300 hover:text-text"}
                  >
                    {texts.home[locale]}
                  </Link>
                  <Link
                    href="/pick-a-ski"
                    className={router.asPath === "/pick-a-ski" ? "inline-flex items-center border-b-2 border-accent-color px-1 pt-1 text-sm font-medium text-text" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-text-muted hover:border-gray-300 hover:text-text"}
                  >
                    Pick-a-ski
                  </Link>
                  {/* disable opinions}
                  <Link
                    href="/opinions"
                    className={router.asPath === "/opinions" ? "inline-flex items-center border-b-2 border-accent-color px-1 pt-1 text-sm font-medium text-text" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-text-muted hover:border-gray-300 hover:text-text"}
                  >
                    {texts.opinions[locale]}
                  </Link>
                  */}
                  <Link
                    href="/reviews"
                    className={router.asPath === "/reviews" ? "inline-flex items-center border-b-2 border-accent-color px-1 pt-1 text-sm font-medium text-text" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-text-muted hover:border-gray-300 hover:text-text"}
                  >
                    {texts.reviews[locale]}
                  </Link>
                  <Link
                    href="/articles"
                    className={router.asPath === "/articles" ? "inline-flex items-center border-b-2 border-accent-color px-1 pt-1 text-sm font-medium text-text" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-text-muted hover:border-gray-300 hover:text-text"}
                  >
                    {texts.articles[locale]}
                  </Link>
                  <Link
                    href="/mission"
                    className={router.asPath === "/mission" ? "inline-flex items-center border-b-2 border-accent-color px-1 pt-1 text-sm font-medium text-text" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-text-muted hover:border-gray-300 hover:text-text"}
                  >
                    {texts.mission[locale]}
                  </Link>
                  <Link
                    href="/contact"
                    className={router.asPath === "/contact" ? "inline-flex items-center border-b-2 border-accent-color px-1 pt-1 text-sm font-medium text-text" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-text-muted hover:border-gray-300 hover:text-text"}
                  >
                    {texts.contact[locale]}
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div
                  className=" z-50 inline-flex items-center border-b-2 border-transparent px-3 pt-1 text-sm font-medium"
                >
                  < LanguageMenu />
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-accent-color hover:bg-indigo-500 hover:shadow-xl px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => router.push('/opinions')}
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    {texts.shareOpinion[locale]}
                  </button>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {user ?
                          <img
                          className="h-8 w-8 rounded-full"
                          src={user.photoURL}
                          alt="Profile pictured of current user"
                          />
                          :
                          <UserCircleIcon className="h-8 w-8 rounded-full" aria-hidden="true" />
                        }
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >

                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-bg py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        { user ? 
                          <>
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? 'bg-bg-dark' : '',
                                  'block px-4 py-2 text-sm text-text'
                                )}
                              >
                                {texts.profile[locale]}
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                href="#"
                                onClick={() => signOut(auth)}
                                className={classNames(
                                  active ? 'bg-bg-dark' : '',
                                  'block px-4 py-2 text-sm text-text'
                                )}
                              >
                                {texts.logout[locale]}
                              </Link>
                            )}
                          </MenuItem> 
                          </>
                          :
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                href="#"
                                onClick={() => signIn()}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {texts.login[locale]}
                              </Link>
                            )}                  
                          </MenuItem>
                        }                        

                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <DisclosureButton
                as="a"
                href={`/${locale}`}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                {texts.home[locale]}
              </DisclosureButton>
              <DisclosureButton
                as="a"
                href={`/${locale}/pick-a-ski`}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                {texts.skiSelector[locale]}
              </DisclosureButton>
              {/* disable opinions
              <DisclosureButton
                as="a"
                href={`/${locale}/opinions`}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                {texts.opinions[locale]}
              </DisclosureButton>
              */}
              <DisclosureButton
                as="a"
                href={`/${locale}/reviews`}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                {texts.reviews[locale]}
              </DisclosureButton>
              <DisclosureButton
                as="a"
                href={`/${locale}/articles`}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                {texts.articles[locale]}
              </DisclosureButton>
              <DisclosureButton
                as="a"
                href={`/${locale}/mission`}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                {texts.mission[locale]}
              </DisclosureButton>
              <DisclosureButton
                as="a"
                href={`/${locale}/contact`}
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                {texts.contact[locale]}
              </DisclosureButton>
            </div>
            { user ?            
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.photoURL}
                    alt="current user profile picture"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.displayName}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <DisclosureButton
                  as="a"
                  href="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  {texts.profile[locale]}
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="#"
                  onClick={() => signOut(auth)}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  {texts.logout[locale]}
                </DisclosureButton>
              </div>
            </div>
            :
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="mt-3 space-y-1">
                <DisclosureButton
                  as="a"
                  href="#"
                  onClick={() => signInWithPopup(auth, provider)}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  {texts.login[locale]}
                </DisclosureButton>
              </div>
            </div>
            }
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
