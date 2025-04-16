"use client";

import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full">
      <div className="flex justify-between items-center bg-gray-800 text-white  px-8 py-6">
        <Link href="/">
          <h1 className="font-bold text-xl">Blog</h1>
        </Link>
        <ul className="font-bold text-xl">
          <Link href="/contact">
            <li>お問い合わせ</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
