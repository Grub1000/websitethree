import "./SpaceHeader.css";


interface SpaceHeaderProps {
    name: string;

    activeTab:
        | "chat"
        | "documents";

    onTabChange: (
        tab: "chat" | "documents",
    ) => void;
}


function SpaceHeader({
    name,
    activeTab,
    onTabChange,
}: SpaceHeaderProps) {
    return (
        <div className="space-header">

            <div className="space-header-top">
                <div>
                    <p className="space-header-eyebrow">
                        Space
                    </p>

                    <h1>
                        {name}
                    </h1>
                </div>
            </div>


            <div className="space-tabs">

                <button
                    className={
                        activeTab === "chat"
                            ? "space-tab active"
                            : "space-tab"
                    }
                    onClick={() =>
                        onTabChange("chat")
                    }
                >
                    Chat
                </button>


                <button
                    className={
                        activeTab === "documents"
                            ? "space-tab active"
                            : "space-tab"
                    }
                    onClick={() =>
                        onTabChange(
                            "documents",
                        )
                    }
                >
                    Documents
                </button>

            </div>

        </div>
    );
}


export default SpaceHeader;