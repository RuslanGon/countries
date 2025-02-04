import Image from "next/image";
import Link from "next/link";

async function getCountryByName(name: string) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    if (!response.ok) throw new Error("Country not found");
    const country = await response.json();
    return country[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function CountryDetail({ params }: { params: { name: string } }) {
  if (!params?.name) {
    return <h1 className="text-3xl text-red-600 text-center mt-16">Invalid country name</h1>;
  }

  const country = await getCountryByName(params.name);
  
  if (!country) {
    return <h1 className="text-3xl text-red-600 text-center mt-16">Country not found</h1>;
  }

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl font-bold text-center text-gray-800 mt-16">
        {country.translations?.rus?.official || country.name.common}
      </h1>
      <Link href="/" className="flex items-center py-2 gap-1">
        <Image src="/arrow.svg" alt="go back home" width={24} height={24} />
        <h1 className="font-bold text-xl text-center mt-1">Back</h1>
      </Link>
      <article className="flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🏙️ Столица:</b> {country.capital?.[0] || "Не указано"}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Регион: </b> {country.region || "Не указано"}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨‍👩‍👧‍👦 Население: </b> {country.population?.toLocaleString() || "Не указано"}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗣️ Язык: </b> {country.languages ? Object.values(country.languages).join(", ") : "Не указано"}
          </h2>
        </section>
      </article>
    </section>
  );
}
