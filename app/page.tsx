// import Image from "next/image";

import Image from "next/image";
import Link from "next/link";

type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string
    alt: string
  }
};

async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  console.log(data);
  return data;
}

export default async function Home() {
  const countries = await getCountries();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 mt-16">
      {countries.map((country) => (
        <>
        <Link href={`/country/${country.name.common}`}>
          <article className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl ">
            <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt || "Флаг не найден"}
            fill 
            className="object-cover"
          />
        </div>
            <h1 className="font-bold text-xl text-center mt-1">{country.name.common}</h1>
          </article>
          </Link>
        </>
      ))}
    </section>
  );
}
