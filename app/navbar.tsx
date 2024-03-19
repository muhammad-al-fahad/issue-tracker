'use client'

import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const currentPathname = usePathname();

    let link = [
        {
            name: 'Dashboard',
            href: '/'
        },
        {
            name: 'Issues',
            href: '/issues'
        }
    ]

  return (
    <nav className='flex space-x-6 h-14 items-center px-5 mb-5 shadow-md shadow-gray-300/75'>
        <Link href='/'>
            <AiFillBug />
        </Link>
        <ul className='flex space-x-6'>
            { link.map((item, index) => (
                <li key={index} className={`${currentPathname === item.href ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700 transition-colors duration-200 ease-in-out'}`}>
                    <Link href={item.href}>{item.name}</Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Navbar