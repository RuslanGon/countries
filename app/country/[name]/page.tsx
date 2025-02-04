


export default async function CountryDetail({params: {name}} : {params: {name: string}}) {
    return (
        <section>
            <h1>{name}</h1>
        </section>
    )
}