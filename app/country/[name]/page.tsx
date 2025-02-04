import Image from "next/image";
import Link from "next/link";

async function getCountryByName(name: string) {
    const response  = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    const country = await response.json();
    return country[0];
}

export default async function CountryDetail({params: {name}} : {params: {name: string}}) {
    const country = await getCountryByName(name)
    return (
      <section className="flex flex-col container">
        <h1 className="text-5xl font-bold text-center text-gray-800 mt-16">
          {country.translations.rus.official}
        </h1>
        <Link href="/" className="flex items-center py-2 gap-1">
          <Image src="/arrow.svg" alt="go back home" width={24} height={24} />
          <h1 className="font-bold text-xl text-center mt-1">Back</h1>
        </Link>
        <article className=" flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl">
          <section>
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🏙️ Столица:</b>
            </h2>
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🗺️ Регион: </b>
            </h2>
            <h2 className="text-xl text-gray-800 mt-3">
              <b>👨‍👩‍👧‍👦 Население: </b>
            </h2>
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🗣️ Язык: </b>
            </h2>
          </section>
        </article>
      </section>
    );
}