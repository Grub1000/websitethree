import ServiceRow from "./ServiceRow.tsx";
import "./Services.css";


export type AgencyService = {
    id: string;
    number: string;
    title: string;
    description: string;
};


const services: AgencyService[] = [
    {
        id: "art-direction",
        number: "01",
        title: "Art Direction",
        description: "Visual systems / campaigns / identity",
    },
    {
        id: "digital-experiences",
        number: "02",
        title: "Digital Experiences",
        description: "Websites / interaction / digital products",
    },
    {
        id: "creative-development",
        number: "03",
        title: "Creative Development",
        description: "Frontend / experimentation / technology",
    },
    {
        id: "motion",
        number: "04",
        title: "Motion",
        description: "Movement / transitions / spatial storytelling",
    },
];


export default function Services() {
    return (
        <section
            className="agency-services"
            id="services"
            aria-labelledby="agency-services-title"
        >
            <div className="agency-services__container">
                <header className="agency-services__header">
                    <p className="agency-services__index">
                        04 — What We Do
                    </p>

                    <h2
                        className="agency-services__heading"
                        id="agency-services-title"
                    >
                        What We Do
                    </h2>

                    <p className="agency-services__label">
                        Services
                    </p>
                </header>


                {/*
                 * Each service is its own component because every row owns
                 * the same independent pointer + keyboard interaction.
                 *
                 * This is a useful component boundary rather than splitting
                 * static markup into components simply for abstraction.
                 */}
                <div className="agency-services__list">
                    {services.map((service) => (
                        <ServiceRow
                            key={service.id}
                            service={service}
                        />
                    ))}
                </div>


                <footer className="agency-services__footer">
                    <p className="agency-services__location">
                        Los Angeles — CA
                    </p>

                    <p className="agency-services__statement">
                        Independent creative development studio.
                    </p>
                </footer>
            </div>
        </section>
    );
}