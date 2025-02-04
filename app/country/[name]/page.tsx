
async function getCountryByName(name: string) {
    const response  = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    const country = await response.json();
    return country[0];
}

export default async function CountryDetail({params: {name}} : {params: {name: string}}) {
    return (
        <section>
            <h1>{name}</h1>
        </section>
    )
}