import Header from "../../components/navigation/Header";
import Hero from "../../sections/hero/Hero.tsx"

import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page" id="top">
            <Header />

            <main className="home-page__main">
                {/* Portfolio sections will be composed here. */}
                <Hero />
            </main>
        </div>
    );
}

export default HomePage;