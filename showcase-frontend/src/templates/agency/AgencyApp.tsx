// Style Sheet Imports
import "./styles/tokens.css";
import "./styles/globals.css";


// Section and Component Imports
import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";
import StudioStatement from "./sections/StudioStatement/StudioStatement";
import SelectedWork from "./sections/SelectedWork/SelectedWork";
import Services from "./sections/Services/Services.tsx";
import About from "./sections/About/About.tsx";


export default function AgencyApp() {
    return (
        <div className="agency-app">
            <Header />
            <main className="agency-app__main">
                <Hero />
                <StudioStatement/>
                <SelectedWork/>
                <Services />
                <About />
            </main>
        </div>
    );
}