
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
            </main>

        </div>
    

    )
}