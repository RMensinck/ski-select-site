import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Button } from '@headlessui/react'
import "node_modules/flag-icons/css/flag-icons.min.css";
import {
  ChevronDownIcon,
} from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'


export default function Example() {
  const router = useRouter()
  const { locale } = router
  const changeLanguage = ( newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }
  const getFlagClass = (locale) => {
    switch (locale) {
      case 'en':
        return 'fi-gb'
      case 'nl':
        return 'fi-nl'
      case 'fr':
        return 'fi-fr'
      case 'de':
        return 'fi-de'
      case 'es':
        return 'fi-es'
      case 'pl':
        return 'fi-pl'
      case 'ja':
        return 'fi-jp'
      default:
        return 'fi-gb'
    }
  }
  return (
    //test
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-bg-light px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-bg-light">
          <span className={`fi ${getFlagClass(locale)} my-auto rounded`}></span>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-bg-light shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Button
              className="w-full group flex items-center px-4 py-2 text-sm text-text-muted data-[focus]:bg-bg data-[focus]:text-text data-[focus]:outline-none"
              onClick={() => changeLanguage('en')}
            >
              <span className="fi fi-gb my-auto rounded mr-3 text-gray-400"></span>
              English
            </Button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem >
            <Button
              className="w-full group flex items-center px-4 py-2 text-sm text-text-muted data-[focus]:bg-bg data-[focus]:text-text data-[focus]:outline-none"
              onClick={() => changeLanguage('nl')}
            >
              <span className="fi fi-nl my-auto rounded mr-3 text-gray-400"></span>
              Nederlands
            </Button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem >
            <Button
              className="w-full group flex items-center px-4 py-2 text-sm text-text-muted data-[focus]:bg-bg data-[focus]:text-text data-[focus]:outline-none"
              onClick={() => changeLanguage('de')}
            >
              <span className="fi fi-de my-auto rounded mr-3 text-gray-400"></span>
              Deutsch
            </Button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem >
            <Button
              className="w-full group flex items-center px-4 py-2 text-sm text-text-muted data-[focus]:bg-bg data-[focus]:text-text data-[focus]:outline-none"
              onClick={() => changeLanguage('fr')}
            >
              <span className="fi fi-fr my-auto rounded mr-3 text-gray-400"></span>
              Français
            </Button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem >
            <Button
              className="w-full group flex items-center px-4 py-2 text-sm text-text-muted data-[focus]:bg-bg data-[focus]:text-text data-[focus]:outline-none"
              onClick={() => changeLanguage('es')}
            >
              <span className="fi fi-es my-auto rounded mr-3 text-gray-400"></span>
              Español
            </Button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem >
            <Button
              className="w-full group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-bg data-[focus]:text-gray-900 data-[focus]:outline-none"
              onClick={() => changeLanguage('pl')}
            >
              <span className="fi fi-pl my-auto rounded mr-3 text-gray-400"></span>
              Polski
            </Button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem >
            <Button
              className="w-full group flex items-center px-4 py-2 text-sm text-text-muted data-[focus]:bg-bg data-[focus]:text-text data-[focus]:outline-none"
              onClick={() => changeLanguage('ja')}
            >
              <span className="fi fi-jp my-auto rounded mr-3 text-gray-400"></span>
              日本語
            </Button>
          </MenuItem>
        </div>

      </MenuItems>
    </Menu>
  )
}
