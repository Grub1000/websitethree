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
import Collaborators from "./sections/Collaborators/Collaborators.tsx";
import Contact from "./sections/Contact/Contact.tsx";


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
                <Collaborators />
                <Contact />
            </main>
        </div>
    );
}