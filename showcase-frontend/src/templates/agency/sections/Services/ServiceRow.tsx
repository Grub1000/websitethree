import type { AgencyService } from "./Services.tsx";


type ServiceRowProps = {
    service: AgencyService;
};


export default function ServiceRow({
    service,
}: ServiceRowProps) {
    return (
        <div className="agency-service">
            {/*
             * The service row is entirely readable without interaction.
             *
             * The large-screen hover treatment is decorative enhancement
             * only. CSS owns that interaction because it is simply changing
             * transforms and opacity rather than coordinating a complex
             * animation sequence.
             */}
            <div
                className="agency-service__content"
                tabIndex={0}
            >
                <div className="agency-service__title-group">
                    <h3 className="agency-service__title">
                        {service.title}
                    </h3>

                    <p className="agency-service__description">
                        {service.description}
                    </p>
                </div>

                <p className="agency-service__number">
                    {service.number}
                </p>
            </div>
        </div>
    );
}