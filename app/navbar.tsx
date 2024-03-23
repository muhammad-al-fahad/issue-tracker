"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import SkeletonLoading from "./components/Skeleton";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";

const Navbar = () => {
  const { status, data: session } = useSession();
  const currentPathname = usePathname();
  const [profileToggle, setProfileToggle] = useState<boolean>(false);

  let link = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex h-14 items-center px-5 mb-5 shadow-md shadow-gray-300/75 container justify-between mx-auto">
      <div className="flex items-center space-x-6">
        <Link href="/">
          <AiFillBug />
        </Link>
        <ul className="flex space-x-6">
          {link.map((item, index) => (
            <li
              key={index}
              className={`${
                currentPathname === item.href
                  ? "text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-700 transition-colors duration-200 ease-in-out"
              }`}
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {status === "unauthenticated" && (
        <button
          className="outline-none border-none rounded-md py-1 px-2 bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200 ease-in-out text-gray-50"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
      {status === "loading" && (
        <button className="outline-none border-none rounded-md py-1 px-2">
          <SkeletonLoading width="w-14" height="h-8" />
        </button>
      )}
      {status === "authenticated" && (
        <div className="w-10 h-10 rounded-full relative">
          {session.user ? (
            session.user.image && (
              <Image
                src={session.user.image}
                alt="User Picture"
                className="w-full h-full object-cover object-center cursor-pointer"
                onClick={() => setProfileToggle(!profileToggle)}
                width={100}
                height={100}
              />
            )
          ) : (
            <FaUser />
          )}
          {profileToggle && (
            <ul className="w-fit h-fit py-2 px-4 flex flex-col items-start justify-center rounded-lg border-none bg-slate-50 shadow-md shadow-gray-300 absolute top-14 right-0 z-10">
              <li className="p-2 w-full text-gray-500/70 border-b border-gray-300">
                {session.user?.email}
              </li>
              <li
                className="p-2 w-full cursor-pointer hover:bg-blue-600 hover:text-slate-50 transition-colors duration-200 ease-in-out"
                onClick={() => {
                  setProfileToggle(false);
                  signOut();
                }}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
