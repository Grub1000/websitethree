import Header from "../../components/navigation/Header";
import Hero from "../../sections/hero/Hero.tsx"
import FeaturedProjects from "../../sections/featured-projects/FeaturedProjects.tsx";
// import BuildLog from "../../sections/build-log/BuildLog.tsx";
import About from "../../sections/about/About.tsx"
import TechnicalStack from "../../sections/technical-stack/TechnicalStack.tsx";
import Education from "../../sections/education/Education.tsx";


import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page" id="top">
            <Header />

            <main className="home-page__main">
                {/* Portfolio sections will be composed here. */}
                <Hero />
                <FeaturedProjects />
                {/* <BuildLog /> */}
                <About />
                <TechnicalStack />
                <Education />
            </main>
        </div>
    );
}

export default HomePage;