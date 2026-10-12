import "./styles/tokens.css";
import "./styles/globals.css";


export default function AnalyticsApp() {
    /*
     * This wrapper scopes ATLAS design tokens and global styles.
     *
     * We will introduce the persistent application shell, navigation,
     * and React Router routes once the foundation is in place.
     */
    return (
        <div className="analytics">
            <main className="analytics__main">
                <h1 className="analytics__title">
                    ATLAS
                </h1>

                <p className="analytics__description">
                    Operations Intelligence
                </p>
            </main>
        </div>
    );
}