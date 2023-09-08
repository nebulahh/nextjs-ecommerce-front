'use client'
import Link from 'next/link'
import { useState } from 'react'

import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs'

const TopHeader = () => {
  const [menuState, setMenuState] = useState(false)
  const navigation = [
    { title: 'CATEGORIES', path: '#' },
    { title: 'HOT OFFERS', path: '#' },
  ]
  return (
    <div className="border-b border-gray-200 sm:block">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex gap-1">
            <div className="header_top__icon_wrapper">
              <BsFacebook />
            </div>
            <div className="header_top__icon_wrapper">
              <BsTwitter />
            </div>
            <div className="header_top__icon_wrapper">
              <BsInstagram />
            </div>
            <div className="header_top__icon_wrapper">
              <BsLinkedin />
            </div>
          </div>
          <Link href={'/'}>
            <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
              Store
            </div>
          </Link>

          <div className="hidden lg:block text-gray-500 text-[12px]">
            <b>FREE SHIPPING</b> FOR ORDER OVER $55 THIS WEEK
          </div>

          <div className="flex lg:hidden items-center justify-between">
            <div
              className={`absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:hidden lg:border-none ${
                menuState
                  ? 'bg-white backdrop-filter bg-clip-padding bg-opacity-40 backdrop-blur-xl'
                  : 'hidden'
              }`}
            >
              <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                {navigation.map((item, idx) => (
                  <li key={idx}>
                    <Link className="navbar__link relative" href={item.path}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
              <button
                type="button"
                className="outline-none block lg:hidden text-black"
                onClick={() => setMenuState(!menuState)}
              >
                {menuState ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
