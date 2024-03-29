// components/Navbar.tsx

import Link from "next/link";
import Image from "next/image";
import Logo from "~/images/icon-1024.png";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 py-4">
      <ul className="flex justify-evenly items-center">
        <li key={"logo"}>
          <Image src={Logo} width={50} height={50} alt="" />
        </li>
        <li key={"Shop"}>
          <Link
            href="/"
            className="text-white hover:text-indigo-300 px-10 py-2 border hover:border-indigo-500 rounded"
          >
            Home
          </Link>
        </li>
        <li key={"Reviews"}>
          <Link
            href="/reviews"
            className="text-white hover:text-indigo-300 px-10 py-2 border hover:border-indigo-500 rounded"
          >
            Reviews
          </Link>
        </li>
        <li key={"Create"}>
          <Link
            href="/create"
            className="text-white hover:text-indigo-300 px-10 py-2 border hover:border-indigo-500 rounded"
          >
            Create
          </Link>
        </li>
      </ul>
    </nav>
  );
}
