"use client";
import { useState, useEffect } from "react";
import CountryCard from "./components/country-card/CountryCard";

export type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  translations: {
    rus?: {
      common: string;
      official: string;
    };
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  cca3: string;
};

async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchCountries() {
      const data = await getCountries();
      setCountries(data);
    }
    fetchCountries();
  }, []);

  // Фильтрация списка стран по русскому названию
  const filteredCountries = countries.filter((country) => {
    const rusName = country.translations.rus?.common || "";
    return rusName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <section className="flex flex-col items-center w-full">
      {/* Поле ввода для поиска на русском */}
      <input
        type="text"
        className="p-2 border rounded-lg w-64 mb-4"
        placeholder="Введите название страны"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 mt-4">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            name={country.name.common}
            rusName={country.translations.rus?.common || country.name.common}
            flag={country.flags.svg}
            flagAlt={country.flags.alt || "Флаг страны"}
          />
        ))}
      </section>
    </section>
  );
}
