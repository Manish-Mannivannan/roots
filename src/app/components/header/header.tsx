"use client"

import { usePathname } from 'next/navigation';
import MenuButton from "./menuButton";
import { searchButtonClick } from '../../familytree/searchModal';
import Image from 'next/image'

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <main className="navbar bg-base-100 w-11/12 rounded-xl items-start">
      <div className="navbar-start">
        <MenuButton />
      </div>
      <div className="navbar-center h-full relative flex items-center pt-4">
        <p
          className="text-4xl font-bold bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent"
        >
          Roots
        </p>
      </div>

      <div className="navbar-end pt-4">
        {pathname === '/familytree' && (
          <button className="btn btn-ghost btn-circle" onClick={searchButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10">
              <Image alt="Tailwind CSS Navbar component" src="/people/img1.png" className='rounded-full' fill/>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Header;

