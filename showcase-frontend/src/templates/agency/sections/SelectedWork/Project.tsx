import type {
    AgencyProject,
} from "./SelectedWork";

type ProjectProps = {
    project: AgencyProject;
};

export default function Project({
    project,
}: ProjectProps) {
    return (
        <article
            className={`agency-project agency-project--${project.variant}`}
            id={project.id}
        >
            <header className="agency-project__header">
                <span className="agency-project__number">
                    {project.number}
                </span>

                <span className="agency-project__year">
                    {project.year}
                </span>
            </header>

            <div className="agency-project__composition">
                {/*
                 * REACT:
                 * React chooses which BEM modifier belongs to this project from
                 * the project data. React does NOT decide the actual color.
                 *
                 * CSS remains responsible for appearance through:
                 * --dark  = near-black ink
                 * --light = warm paper
                 *
                 * Keeping title contrast separate from project.variant prevents
                 * layout concerns such as "portrait" or "wide" from also becoming
                 * responsible for visual color decisions.
                 */}
                <h3
                    className={`agency-project__title agency-project__title--${project.titleTheme}`}
                >
                    {project.title}
                </h3>

                <figure className="agency-project__media">
                    <img
                        className="agency-project__image"
                        src={project.image}
                        alt={project.imageAlt}
                    />
                </figure>

                <ul
                    className="agency-project__disciplines"
                    role="list"
                >
                    {project.disciplines.map((discipline) => (
                        <li
                            className="agency-project__discipline"
                            key={discipline}
                        >
                            {discipline}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}