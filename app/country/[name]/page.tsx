import Image from "next/image";
import Link from "next/link";
import { Country } from "@/app/page";
import CountryCard from "../../components/country-card/CountryCard";


// ✅ Функция получения данных о стране по имени
async function getCountryByName(name: string): Promise<Country | null> {
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

// ✅ Функция получения соседних стран
async function getCountryBordersByName(name: string) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    if (!response.ok) throw new Error("Country not found");

    const [country] = await response.json();
    if (!country.borders || country.borders.length === 0) return [];

    const borderCodes = country.borders.join(",");
    const bordersResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
    if (!bordersResponse.ok) throw new Error("Failed to fetch border countries");

    const borderCountries: Country[] = await bordersResponse.json();

    return borderCountries.map((borderCountry) => ({
      name: borderCountry.name.common,
      rusName: borderCountry.translations?.rus?.common || borderCountry.name.common,
      flag: borderCountry.flags.svg,
      flagAlt: borderCountry.flags.alt || `Flag of ${borderCountry.name.common}`,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ✅ Основной компонент
export default async function CountryDetail({ params }: { params: { name: string } }) {

  if (!params || !params.name) {
    return <h1 className="text-3xl text-red-600 text-center mt-16">Invalid country name</h1>;
  }

  const decodedName = decodeURIComponent(params.name);
  const country = await getCountryByName(decodedName);
  const borderCountries = await getCountryBordersByName(decodedName);

  if (!country) {
    return <h1 className="text-3xl text-red-600 text-center mt-16">Country not found</h1>;
  }

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl font-bold text-center text-gray-800 mt-16">
        {country.translations?.rus?.official || country.name.common}
      </h1>

      <Link href="/" className="flex items-center py-2 gap-1">
        <Image src="/arrow.svg" alt="Go back home" width={24} height={24} />
        <h1 className="font-bold text-xl text-center mt-1">Back</h1>
      </Link>

      <article className="flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          {country.capital && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🏙️ Столица:</b> {country.capital}
            </h2>
          )}
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Регион: </b> {country.region} {country.subregion && `- ${country.subregion}`}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨‍👩‍👧‍👦 Население: </b> {new Intl.NumberFormat("ru-RU").format(country.population)}
          </h2>
          {country.languages && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🗣️ Язык: </b>{" "}
              {Object.values(country.languages).map((language) => (
                <span key={language} className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full">
                  {language}
                </span>
              ))}
            </h2>
          )}
        </section>
        <div className="relative h-48 my-2 md:h-auto w-96 shadow-md md:order-last order-first">
          <Image src={country.flags.svg} alt={country.flags.alt || `Flag of ${country.name.common}`} fill />
        </div>
      </article>

      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">Neighbour countries</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2">
          {borderCountries?.length > 0 ? (
            borderCountries.map((border) => <CountryCard key={border.name} {...border} />)
          ) : (
            <p className="text-gray-600 mt-4">No neighboring countries found.</p>
          )}
        </div>
      </section>
    </section>
  );
}
