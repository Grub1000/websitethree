// import { useRef } from 'react'

// import gsap from 'gsap'
// import {useGSAP} from '@gsap/react'

// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import './App.css'

// // import TestComponent from "./templates/commerce/TestComponent.tsx"
// import PencilJourney from './templates/saas/PencilJourney.tsx';

// // gsap.registerPlugin(useGSAP)

// // gsap.registerPlugin(ScrollTrigger)


// function App() {
//   const container = useRef<HTMLDivElement | null>(null);

//   // useGSAP(() => {
//   //   // gsap.to(container.current, {rotation: "360", duration: 3});
//   //   gsap.to(container.current, {
//   //     x: 300,
//   //     duration: 2,
//   //     scrollTrigger: {
//   //       trigger: container.current,      // The element that triggers the animation
//   //       start: "top 10%",     // When the top of the box hits 80% from the top of the viewport
//   //       end: "bottom 10%",   // When the bottom of the box hits 20% from the top of the viewport
//   //       markers: true,         // Adds visual debugging markers (remove in production)
//   //       scrub: true
//   //     }
//   //   })


//   //   gsap.to(container.current, {
//   //     x: -300,
//   //     duration: 2,
//   //     immediateRender: false,
//   //     scrollTrigger: {
//   //       trigger: container.current,      // The element that triggers the animation
//   //       start: "top -10%",     // When the top of the box hits 80% from the top of the viewport
//   //       end: "bottom -10%",   // When the bottom of the box hits 20% from the top of the viewport
//   //       markers: true,         // Adds visual debugging markers (remove in production)
//   //       scrub: true
//   //     }
//   //   })
//   // }, {scope: container})

//   return (
//     <>
//       <PencilJourney/>
//     </>
//   )
// }

// export default App



import { Routes, Route } from "react-router-dom";

import ShowcaseHome from "./showcase/ShowcaseHome.tsx";
import SaaSApp from "./templates/saas/SaaSApp.tsx";
// import AgencyApp from "./templates/agency/AgencyApp";
// import AnalyticsApp from "./templates/analytics/AnalyticsApp";
// import EcommerceApp from "./templates/ecommerce/EcommerceApp";
// import MobileApp from "./templates/mobile/MobileApp";

function App() {
    return (
        <Routes>
            <Route path="/showcase/" element={<ShowcaseHome />} />

            <Route path="/showcase/saas/*" element={<SaaSApp />} />
            {/* <Route path="/agency/*" element={<AgencyApp />} />
            <Route path="/analytics/*" element={<AnalyticsApp />} />
            <Route path="/ecommerce/*" element={<EcommerceApp />} />
            <Route path="/mobile/*" element={<MobileApp />} /> */}
        </Routes>
    );
}

export default App;