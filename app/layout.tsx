"use client";

import { useState } from "react";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import Image from "next/image";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main className="bg-gray-100 min-h-screen flex flex-col items-center">
          <nav className="w-full bg-white h-16 flex items-center justify-center">
            <section className="flex items-center justify-between w-full px-4">
              <div className="flex items-center gap-3">
                <div className="animate-[spin_3s_linear_infinite]">
                  <Image
                    src="/logo.jpg"
                    alt="Logo of the Countries App"
                    width={48}
                    height={48}
                  />
                </div>
                <h1 className="font-bold text-2xl">Countries App</h1>
              </div>
              {/* Компонент поиска */}
              {/* <div className="flex items-center space-x-4">
                <input
                  type="text"
                  className="p-2 border rounded-lg w-64"
                  placeholder="Поиск страны..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div> */}
            </section>
          </nav>
          {/* Передаем поисковый запрос в дочерние компоненты */}
          {children && typeof children === "function" ? children(searchQuery) : children}
        </main>
      </body>
    </html>
  );
}
