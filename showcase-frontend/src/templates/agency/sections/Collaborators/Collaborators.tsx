import "./Collaborators.css";


type Collaborator = {
    id: string;
    name: string;
    discipline: string;
    year: string;
};


const collaborators: Collaborator[] = [
    {
        id: "aurelia",
        name: "Aurelia",
        discipline: "Fashion / Culture",
        year: "2026",
    },
    {
        id: "mono-house",
        name: "Mono House",
        discipline: "Architecture",
        year: "2026",
    },
    {
        id: "atelier-n",
        name: "Atelier N",
        discipline: "Fashion",
        year: "2025",
    },
    {
        id: "form-24",
        name: "Form / 24",
        discipline: "Culture / Editorial",
        year: "2025",
    },
    {
        id: "studio-vela",
        name: "Studio Vela",
        discipline: "Design",
        year: "2025",
    },
    {
        id: "north-south",
        name: "North / South",
        discipline: "Hospitality",
        year: "2024",
    },
    {
        id: "maison-ora",
        name: "Maison Ora",
        discipline: "Fashion",
        year: "2024",
    },
    {
        id: "fieldwork",
        name: "Fieldwork",
        discipline: "Culture",
        year: "2023",
    },
];


export default function Collaborators() {
    return (
        <section
            className="agency-collaborators"
            aria-labelledby="agency-collaborators-title"
        >
            <div className="agency-collaborators__container">
                <header className="agency-collaborators__header">
                    <p className="agency-collaborators__index">
                        06 — Selected Collaborators
                    </p>

                    <p className="agency-collaborators__range">
                        2022—2026
                    </p>
                </header>


                {/*
                 * The visible section title intentionally reads more like an
                 * editorial headline than a conventional website heading.
                 *
                 * It also gives the section a clear h2 in the document
                 * hierarchy rather than relying only on the small metadata
                 * inside the header above.
                 */}
                <div className="agency-collaborators__intro">
                    <h2
                        className="agency-collaborators__title"
                        id="agency-collaborators-title"
                    >
                        Selected
                        <span className="agency-collaborators__title-serif">
                            collaborators.
                        </span>
                    </h2>

                    <p className="agency-collaborators__intro-copy">
                        A selection of studios, brands and people we've built
                        alongside.
                    </p>
                </div>


                {/*
                 * SEMANTIC LIST
                 *
                 * These entries are fundamentally a collection of related
                 * collaborators, so an unordered list communicates that
                 * relationship better than a collection of generic divs.
                 *
                 * role="list" preserves explicit list semantics in browsers
                 * where CSS list-style changes may otherwise affect how the
                 * structure is exposed to assistive technology.
                 */}
                <ul
                    className="agency-collaborators__list"
                    role="list"
                >
                    {collaborators.map((collaborator, index) => (
                        <li
                            className="agency-collaborators__item"
                            key={collaborator.id}
                        >
                            <div className="agency-collaborators__row">
                                <p className="agency-collaborators__number">
                                    {String(index + 1).padStart(2, "0")}
                                </p>

                                <h3 className="agency-collaborators__name">
                                    {collaborator.name}
                                </h3>

                                <p className="agency-collaborators__discipline">
                                    {collaborator.discipline}
                                </p>

                                <p className="agency-collaborators__year">
                                    {collaborator.year}
                                </p>
                            </div>


                            {/*
                             * This secondary line is always available in the
                             * document. On larger hover-capable screens it
                             * becomes part of the kinetic row treatment.
                             *
                             * It is decorative/supporting information rather
                             * than unique content, so the experience does not
                             * depend on discovering the hover state.
                             */}
                            <div className="agency-collaborators__detail">
                                <p className="agency-collaborators__detail-text">
                                    Selected collaboration
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>


                <footer className="agency-collaborators__footer">
                    <p className="agency-collaborators__count">
                        08 Collaborations
                    </p>

                    <p className="agency-collaborators__location">
                        Los Angeles — CA
                    </p>
                </footer>
            </div>
        </section>
    );
}