
// Inter and JetBrains Mono Font Imports
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";

// Styling Imports
import "./styles/tokens.css";
import "./styles/globals.css";


// Section Component Imports
import Header from "./components/Header/Header.tsx"
import Hero from "./sections/Hero/Hero.tsx"
import CredibilityStrip from "./sections/CredibilityStrip/CredibilityStrip";
import ProductOverview from "./sections/ProductOverview/ProductOverview.tsx";
import Story from "./sections/Story/Story.tsx"
import GlobalArchitecture from "./sections/GlobalArchitecture/GlobalArchitecture.tsx";
import Features from "./sections/Features/Features.tsx";
import Integrations from "./sections/Integrations/Integrations";
import Metrics from "./sections/Metrics/Metrics";
import DeveloperTerminal from "./sections/DeveloperTerminal/DeveloperTerminal";
import Pricing from "./sections/Pricing/Pricing";
import Testimonials from "./sections/Testimonials/Testimonials";
import FAQ from "./sections/FAQ/FAQ";
import FinalCTA from "./sections/FinalCTA/FinalCTA";
import Footer from "./sections/Footer/Footer";



/**
 * Root component for the SaaS frontend template.
 *
 * The `.saas` wrapper scopes the template's global
 * visual system so that its typography, colors, and
 * shared styles do not affect the other templates.
 */

export default function SaaSApp(){
    return(
        <div className="saas">
            <Header/>
            <main className="saas__main">
                <Hero />
                <CredibilityStrip/>
                <ProductOverview />
                <Story/>
                <GlobalArchitecture/>
                <Features/>
                <Integrations />
                <Metrics />
                <DeveloperTerminal />
                <Pricing />
                <Testimonials/>
                <FAQ/>
                <FinalCTA/>
                <Footer/>
            </main>

        </div>
    

    )
}