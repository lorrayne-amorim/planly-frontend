import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logowhite.png';
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../services/auth";

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-purple-800 to-purple-900 w-full shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <div className="hidden sm:flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'text-white font-medium'
                      : 'text-white/80 hover:text-white',
                    'text-sm px-3 py-2 rounded-md transition'
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="rounded-full bg-purple-700 p-1 text-white hover:bg-purple-600 transition focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Notificações</span>
              <BellIcon className="h-6 w-6" />
            </button>

            <Menu as="div" className="relative">
              <div>
                <MenuButton className="flex items-center rounded-full bg-purple-700 p-1 text-white hover:bg-purple-600 transition">
                  <FaUserCircle className="h-7 w-7" />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm ${active ? 'bg-purple-50 text-purple-700' : 'text-gray-800'
                        }`}
                    >
                      Seu perfil
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-purple-50 text-purple-700' : 'text-gray-800'
                        }`}
                    >
                      Sair
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-purple-900 text-white'
                  : 'text-white/80 hover:bg-purple-800 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}