/*
 * ==========================================================================
 * PROJECT ARCHIVE
 * ==========================================================================
 *
 * SECTION 06 — YEARS / OF BUILDING.
 *
 * ANIMATION RESPONSIBILITIES
 * --------------------------------------------------------------------------
 *
 * NATIVE CSS:
 * - button hover/focus states
 * - underline / border sweeps
 * - icon-frame movement
 * - row hover treatment
 *
 * NATIVE BROWSER JAVASCRIPT:
 * - IntersectionObserver determines when the archive enters the viewport
 * - matchMedia detects reduced-motion preference
 * - requestAnimationFrame waits for React DOM updates after Show More
 *
 * REACT:
 * - show more / show less state
 * - expanded project state
 * - DOM refs
 * - animation lifecycle
 *
 * GSAP:
 * - timelines
 * - clipPath animation
 * - autoAlpha
 * - x / y transform conveniences
 * - stagger
 * - timeline position parameters
 * - gsap.context() scoping and cleanup
 *
 * IMPORTANT:
 * `x`, `y`, `autoAlpha`, `stagger`, timeline position parameters, and
 * gsap.context() are GSAP conveniences. They are NOT native CSS properties.
 *
 * No ScrollTrigger.
 * No scrub.
 * No scroll-jacking.
 * No continuous animation.
 */


import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";


import gsap from "gsap";


import {
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
    Minus,
    Plus,
} from "lucide-react";


/*
 * ==========================================================================
 * TECHNOLOGY ICONS
 * ==========================================================================
 */

import {
    SiApache,
    SiCss,
    SiDjango,
    SiGit,
    SiGithub,
    SiGoogle,
    SiHtml5,
    SiJavascript,
    SiJquery,
    SiLaravel,
    SiMysql,
    SiPhp,
    SiPython,
    SiReact,
    SiRedis,
    SiTensorflow,
    SiTypescript,
} from "react-icons/si";


import {
    FaBrain,
    FaCode,
    FaDatabase,
    FaEye,
    FaFileCode,
    FaFontAwesome,
    FaGear,
    FaJava,
    FaLaptopCode,
    FaNetworkWired,
    FaRobot,
    FaRoute,
    FaServer,
} from "react-icons/fa6";


import {
    VscJson,
    VscSymbolMethod,
} from "react-icons/vsc";


import "./ProjectArchive.css";


/*
 * ==========================================================================
 * PROJECT IMAGES
 * ==========================================================================
 */

import relayImage from "../../assets/images/projects/relay/Relay.png";
import ragspaceImage from "../../assets/images/projects/ragspace/RAGspace.png";
import resuscanImage from "../../assets/images/projects/resuscan/ResuScan.png";

import compSciImage from "../../assets/images/projects/archive/ComputerScienceCapstoneProjectImage.png";
import disasterRecoImage from "../../assets/images/projects/archive/DisasterRecoveryBotProjectImage.png";
import careerBotImage from "../../assets/images/projects/archive/ChatBotProjectImage.png";
import deliveryRouteImage from "../../assets/images/projects/archive/DeliveryRouteProjectImage.png";
import schedulingSysImage from "../../assets/images/projects/archive/SchedulingSystemImage.png";
import managementSysImage from "../../assets/images/projects/archive/ManagementSystemImage.png";
import advancedDataImage from "../../assets/images/projects/archive/AdvancedDataManagementImage.png";
import vdmImage from "../../assets/images/projects/archive/VDMDemoTranSmall.png";
import groappImage from "../../assets/images/projects/archive/ConfidentialScreensDarkResponsiveSmall.png";
import dijkstrasProImage from "../../assets/images/projects/archive/AlgoAppResponsiveSmall.png";
import fullstackgrubImage from "../../assets/images/projects/archive/FullstackgrubImage.png";
import socialMediaProImage from "../../assets/images/projects/archive/BeatBoxResponsiveSmall.png";
import merchStoreProImage from "../../assets/images/projects/archive/MerchStoreResponsiveSmall.png";
import taskAppImage from "../../assets/images/projects/archive/TaskAppResponsiveSmall.png";
import eSigProImage from "../../assets/images/projects/archive/EsignatureResponsiveSmall.png";


/*
 * ==========================================================================
 * TYPES
 * ==========================================================================
 */

type ProjectContext =
    | "ACADEMIC"
    | "PROFESSIONAL"
    | "INDEPENDENT";


type ProjectDestinationType =
    | "PROJECT"
    | "SOURCE"
    | "DEMO";


interface ProjectDestination {
    type: ProjectDestinationType;
    url: string;
}


interface ArchiveProject {
    index: string;
    title: string;
    category: string;
    context: ProjectContext;
    year: string;
    image: string;
    technologies: string[];
    description: string[];
    destination?: ProjectDestination;
}


interface TechnologyDefinition {
    icon: React.ComponentType<{
        className?: string;
        style?: React.CSSProperties;
    }>;

    color?: string;
}


/*
 * ==========================================================================
 * TECHNOLOGY DEFINITIONS
 * ==========================================================================
 *
 * Brand color appears ONLY on the icon.
 * Every technology name remains the same neutral color.
 */

const technologies: Record<string, TechnologyDefinition> = {

    "Typescript": {
        icon: SiTypescript,
        color: "#3178C6",
    },

    "Javascript": {
        icon: SiJavascript,
        color: "#F7DF1E",
    },

    "React": {
        icon: SiReact,
        color: "#61DAFB",
    },

    "ReactJS": {
        icon: SiReact,
        color: "#61DAFB",
    },

    "HTML": {
        icon: SiHtml5,
        color: "#E34F26",
    },

    "CSS": {
        icon: SiCss,
        color: "#663399",
    },

    "JQuery-Waypoints": {
        icon: SiJquery,
        color: "#0769AD",
    },

    "Responsive": {
        icon: FaLaptopCode,
    },

    "Fontawsome": {
        icon: FaFontAwesome,
        color: "#538DD7",
    },

    "Python": {
        icon: SiPython,
        color: "#3776AB",
    },

    "Django": {
        icon: SiDjango,
        color: "#44B78B",
    },

    "DRF": {
        icon: SiDjango,
        color: "#A30000",
    },

    "Django-Channels": {
        icon: SiDjango,
        color: "#44B78B",
    },

    "Laravel": {
        icon: SiLaravel,
        color: "#FF2D20",
    },

    "PHP": {
        icon: SiPhp,
        color: "#777BB4",
    },

    "Java": {
        icon: FaJava,
        color: "#E76F00",
    },

    "JavaFX": {
        icon: FaJava,
        color: "#E76F00",
    },

    "RESTapi": {
        icon: FaServer,
    },

    "WebSockets": {
        icon: FaNetworkWired,
    },

    "ASGI": {
        icon: FaServer,
    },

    "Daphne": {
        icon: FaServer,
    },

    "JWT-Auth": {
        icon: FaFileCode,
    },

    "MySQL": {
        icon: SiMysql,
        color: "#4479A1",
    },

    "SQL": {
        icon: FaDatabase,
    },

    "Qdrant": {
        icon: FaDatabase,
        color: "#DC244C",
    },

    "Redis": {
        icon: SiRedis,
        color: "#FF4438",
    },

    "Stored-Procedures": {
        icon: VscSymbolMethod,
    },

    "Triggers": {
        icon: FaGear,
    },

    "Functions": {
        icon: VscSymbolMethod,
    },

    "Data-Analysis": {
        icon: FaDatabase,
    },

    "Tensorflow": {
        icon: SiTensorflow,
        color: "#FF6F00",
    },

    "Machine Learning": {
        icon: FaBrain,
    },

    "Deep-Learning": {
        icon: FaBrain,
    },

    "Convolutional-Neural-Network": {
        icon: FaNetworkWired,
    },

    "Image-Recognition": {
        icon: FaEye,
    },

    "Defect-Detection": {
        icon: FaEye,
    },

    "AIML": {
        icon: FaBrain,
    },

    "Embeddings": {
        icon: FaNetworkWired,
    },

    "RAG": {
        icon: FaBrain,
    },

    "OpenAI": {
        icon: FaBrain,
    },

    "CoppeliaSim": {
        icon: FaRobot,
    },

    "Simulations": {
        icon: FaGear,
    },

    "Robotics": {
        icon: FaRobot,
    },

    "PandoraBots-Platform": {
        icon: FaRobot,
    },

    "SP-Algorithms": {
        icon: FaRoute,
    },

    "NN-Algorithms": {
        icon: FaRoute,
    },

    "Intellij-IDE": {
        icon: FaLaptopCode,
    },

    "Maven": {
        icon: FaGear,
    },

    "FXML": {
        icon: VscJson,
    },

    "Desktop-Application": {
        icon: FaLaptopCode,
    },

    "AWS": {
        icon: FaServer,
        color: "#FF9900",
    },

    "AWS-S3": {
        icon: FaServer,
        color: "#FF9900",
    },

    "AWS-EC2": {
        icon: FaServer,
        color: "#FF9900",
    },

    "Apache": {
        icon: SiApache,
        color: "#D22128",
    },

    "Apache2": {
        icon: SiApache,
        color: "#D22128",
    },

    "Google-OAuth": {
        icon: SiGoogle,
        color: "#4285F4",
    },

    "Git": {
        icon: SiGit,
        color: "#F05032",
    },

    "GitHub": {
        icon: SiGithub,
        color: "#F5F5F2",
    },
};


/*
 * ==========================================================================
 * PROJECT DATA
 * ==========================================================================
 *
 * This is the same data from the static archive version.
 */

const archiveProjects: ArchiveProject[] = [
    {
        index: "01",
        title: "RELAY",
        category: "FULL-STACK + REAL-TIME",
        context: "INDEPENDENT",
        year: "2026",
        image: relayImage,

        technologies: [
            "Typescript",
            "React",
            "Python",
            "DRF",
            "Django-Channels",
            "WebSockets",
            "Redis",
            "MySQL",
            "AWS-EC2",
            "ASGI",
            "Daphne",
            "Apache",
            "JWT-Auth",
            "Google-OAuth",
        ],

        description: [
            "Developed a full-stack real-time messaging platform with persistent direct conversations, live messaging, typing indicators, online presence, unread counts, delivery receipts, and read receipts.",
            "Built with React and TypeScript connected to a Django REST Framework and Django Channels backend, using MySQL for persistent application data, Redis as the real-time channel layer, and JWT authentication with Google OAuth.",
            "Designed a production WebSocket architecture using authenticated user-level and conversation-level connections, with Apache proxying secure WebSocket traffic to Daphne/ASGI on AWS EC2 while supporting responsive desktop and mobile chat interfaces.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://jorgeramirez.net/relay/",
        },
    },

    {
        index: "02",
        title: "RAGSPACE",
        category: "AI + FULL-STACK",
        context: "INDEPENDENT",
        year: "2026",
        image: ragspaceImage,

        technologies: [
            "Typescript",
            "React",
            "Python",
            "DRF",
            "MySQL",
            "AWS-S3",
            "Qdrant",
            "Embeddings",
            "RAG",
            "OpenAI",
        ],

        description: [
            "Developed a full-stack Retrieval-Augmented Generation platform for chatting with private document collections.",
            "Built a document pipeline using S3 storage, semantic embeddings, Qdrant vector search, reranking, and persistent conversations.",
            "Designed the system to return grounded responses with page-level source citations while separating application metadata, document storage, and vector data.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://jorgeramirez.net/ragspace/",
        },
    },

    {
        index: "03",
        title: "RESUSCAN",
        category: "FULL-STACK",
        context: "INDEPENDENT",
        year: "2026",
        image: resuscanImage,

        technologies: [
            "Typescript",
            "React",
            "Python",
            "DRF",
            "MySQL",
            "AWS-EC2",
            "AWS-S3",
            "Apache",
            "JWT-Auth",
        ],

        description: [
            "Developed a full-stack resume analysis and job-tracking platform using React, TypeScript, Django REST Framework, MySQL, and AWS.",
            "Implemented JWT authentication, resume analysis workflows, document management, and a persistent job-tracking system.",
            "Built the frontend as a React Router SPA and deployed the production application through Apache on AWS EC2.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://jorgeramirez.net/resuscan/",
        },
    },

    {
        index: "04",
        title: "COMPUTER SCIENCE CAPSTONE",
        category: "MACHINE LEARNING",
        context: "ACADEMIC",
        year: "2025",
        image: compSciImage,

        technologies: [
            "Tensorflow",
            "Convolutional-Neural-Network",
            "Python",
            "Machine Learning",
            "Image-Recognition",
            "Defect-Detection",
            "Deep-Learning",
        ],

        description: [
            "Developed a convolutional neural network for detecting defects in metal products using preprocessed and normalized image data.",
            "Built and trained the TensorFlow model using convolutional layers, ReLU activation, SoftMax classification, and Stochastic Gradient Descent with Momentum.",
            "Created an application that allows users to submit previously unseen product images and receive a prediction indicating whether the product contains a defect.",
        ],
    },

    {
        index: "05",
        title: "DISASTER RECOVERY ROBOT",
        category: "ROBOTICS",
        context: "ACADEMIC",
        year: "2025",
        image: disasterRecoImage,

        technologies: [
            "CoppeliaSim",
            "Simulations",
            "Python",
            "Robotics",
        ],

        description: [
            "Developed a simulated autonomous robot for real-time search-and-rescue operations using the CoppeliaSim robotics platform.",
            "Designed navigation logic using Python, motors, and sensor data to maneuver through a disaster-damaged office environment.",
            "Implemented an efficient exploration strategy that enables the robot to navigate obstacles and locate simulated disaster survivors.",
        ],

        destination: {
            type: "DEMO",
            url: "https://www.youtube.com/watch?v=yrlYvvaAcVM",
        },
    },

    {
        index: "06",
        title: "CAREER CHAT-BOT",
        category: "CONVERSATIONAL SYSTEM",
        context: "ACADEMIC",
        year: "2025",
        image: careerBotImage,

        technologies: [
            "PandoraBots-Platform",
            "AIML",
        ],

        description: [
            "Programmed an interactive career-advising chatbot using the Pandorabots platform and AIML.",
            "Designed conversational decision paths that ask users about their strengths, interests, and preferences.",
            "Uses the user's responses to recommend potential careers within the computing and technology fields.",
        ],
    },

    {
        index: "07",
        title: "DELIVERY ROUTE OPTIMIZATION",
        category: "ALGORITHMS",
        context: "ACADEMIC",
        year: "2025",
        image: deliveryRouteImage,

        technologies: [
            "Python",
            "SP-Algorithms",
            "NN-Algorithms",
        ],

        description: [
            "Designed an algorithmic delivery system that successfully routed 40 packages while satisfying package-specific deadlines and delivery constraints.",
            "Combined a Nearest-Neighbor approach with Dijkstra's shortest path algorithm to efficiently route delivery trucks throughout the simulated city.",
            "Completed all deliveries using only two trucks while keeping the combined travel distance under the required 140-mile limit.",
        ],

        destination: {
            type: "SOURCE",
            url: "https://github.com/Grub1000/University-C950-Solution",
        },
    },

    {
        index: "08",
        title: "SCHEDULING SYSTEM",
        category: "DESKTOP APPLICATION",
        context: "ACADEMIC",
        year: "2024",
        image: schedulingSysImage,

        technologies: [
            "Intellij-IDE",
            "Maven",
            "MySQL",
            "JavaFX",
            "Java",
            "FXML",
            "Desktop-Application",
        ],

        description: [
            "Designed and developed a JavaFX GUI scheduling application with complete appointment and customer management functionality.",
            "Implemented scheduling constraints including business-hour validation, appointment overlap prevention, and support for multiple time zones.",
            "Built an integrated login system, full CRUD functionality, database persistence, and reporting and analytics features.",
        ],

        destination: {
            type: "SOURCE",
            url: "https://github.com/Grub1000/University-C195-Solution",
        },
    },

    {
        index: "09",
        title: "MANAGEMENT SYSTEM",
        category: "DESKTOP APPLICATION",
        context: "ACADEMIC",
        year: "2024",
        image: managementSysImage,

        technologies: [
            "Intellij-IDE",
            "Maven",
            "JavaFX",
            "Java",
            "FXML",
            "Desktop-Application",
        ],

        description: [
            "Designed and developed a JavaFX inventory management application for managing parts and manufactured products.",
            "Implemented object relationships that associate products with the individual parts required to manufacture them.",
            "Built full CRUD functionality with dependency validation and warnings that prevent invalid part or product deletion.",
        ],

        destination: {
            type: "SOURCE",
            url: "https://github.com/Grub1000/University-C482-Solution",
        },
    },

    {
        index: "10",
        title: "DATA MANAGEMENT",
        category: "DATA + SQL",
        context: "ACADEMIC",
        year: "2024",
        image: advancedDataImage,

        technologies: [
            "SQL",
            "Stored-Procedures",
            "Triggers",
            "Functions",
            "Data-Analysis",
        ],

        description: [
            "Analyzed a relational database for a simulated DVD rental business to answer business questions such as which film categories generate the most revenue.",
            "Created complex SQL queries involving joins, grouping, aggregation, functions, triggers, and stored procedures.",
            "Transformed data distributed across multiple related tables into actionable business insights and reports.",
        ],

        destination: {
            type: "SOURCE",
            url: "https://github.com/Grub1000/University-D191-Solution",
        },
    },

    {
        index: "11",
        title: "PDF EDITOR PROJECT",
        category: "FULL-STACK",
        context: "INDEPENDENT",
        year: "2022",
        image: vdmImage,

        technologies: [
            "Laravel",
            "React",
            "MySQL",
            "PHP",
            "Javascript",
            "HTML",
            "CSS",
            "RESTapi",
            "Responsive",
        ],

        description: [
            "Created a demo version of the PDF editing software I originally developed while working at Greenstar.ca.",
            "Rebuilt the application using the same core technology stack with a redesigned frontend and a reduced feature set for demonstration purposes.",
            "Implemented authentication, a file-management dashboard, and an interactive PDF editing interface.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://vdm.fullstackgrub.com/",
        },
    },

    {
        index: "12",
        title: "LABELBUDDY / GROAPP",
        category: "COMMERCIAL SOFTWARE",
        context: "PROFESSIONAL",
        year: "2021",
        image: groappImage,

        technologies: [
            "Laravel",
            "React",
            "MySQL",
            "PHP",
            "Javascript",
            "HTML",
            "CSS",
            "RESTapi",
            "Responsive",
        ],

        description: [
            "Designed and developed LabelBuddy while working at Greenstar.ca, a software module that became part of the commercial GroApp platform.",
            "Built a variable-data-mapping PDF editor capable of manipulating text, shapes, barcode positions, and multiple barcode formats.",
            "Enabled businesses to save reusable projects and rapidly update packaging labels and encoded barcode values without recreating label designs.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://thegroapp.com/",
        },
    },

    {
        index: "13",
        title: "DIJKSTRA'S TRAVERSAL",
        category: "ALGORITHM VISUALIZATION",
        context: "INDEPENDENT",
        year: "2021",
        image: dijkstrasProImage,

        technologies: [
            "React",
            "Django",
            "SP-Algorithms",
            "Javascript",
            "Python",
            "HTML",
            "CSS",
        ],

        description: [
            "Developed an interactive visualization of Dijkstra's shortest path algorithm using React and Django.",
            "Allows users to dynamically place start and end nodes, draw obstacles, and visualize the algorithm finding the shortest available path.",
            "Built as an interactive way to explore and better understand shortest-path algorithms and graph traversal.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://www.fullstackgrub.com/algoapps/traverse/",
        },
    },

    {
        index: "14",
        title: "FULLSTACKGRUB.COM",
        category: "PORTFOLIO V2",
        context: "INDEPENDENT",
        year: "2021",
        image: fullstackgrubImage,

        technologies: [
            "Django",
            "React",
            "Apache2",
            "Javascript",
            "HTML",
            "CSS",
            "Fontawsome",
            "RESTapi",
            "Responsive",
        ],

        description: [
            "Designed and developed version 2.0 of my personal full-stack software development portfolio.",
            "Built with Django and React and deployed using an Apache2 web server.",
            "Served as the predecessor to the current version 3.0 of my portfolio.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://www.fullstackgrub.com/",
        },
    },

    {
        index: "15",
        title: "SOCIAL MEDIA PROJECT",
        category: "FULL-STACK",
        context: "INDEPENDENT",
        year: "2020",
        image: socialMediaProImage,

        technologies: [
            "Django",
            "JQuery-Waypoints",
            "AWS-S3",
            "MySQL",
            "Javascript",
            "Python",
            "HTML",
            "CSS",
            "Responsive",
        ],

        description: [
            "Developed a full-stack Django social media application featuring user accounts, customizable profiles, posts, and likes.",
            "Implemented infinite scrolling using jQuery Waypoints and Django pagination alongside full CRUD functionality.",
            "Integrated AWS S3 for scalable media storage, preventing large amounts of user-uploaded image data from being stored directly on the server.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://www.fullstackgrub.com/beatbox/",
        },
    },

    {
        index: "16",
        title: "MERCH STORE PROJECT",
        category: "E-COMMERCE",
        context: "INDEPENDENT",
        year: "2020",
        image: merchStoreProImage,

        technologies: [
            "ReactJS",
            "Django",
            "AWS-S3",
            "MySQL",
            "Javascript",
            "Python",
            "HTML",
            "CSS",
            "RESTapi",
            "Responsive",
        ],

        description: [
            "Developed a full-stack Django and React e-commerce mock-up featuring product browsing, search functionality, and a shopping cart.",
            "Created an in-house product search system to make navigating and locating products easier.",
            "Implemented an administrative mode that provides Create, Update, and Delete functionality for managing store products.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://www.fullstackgrub.com/merchstore/",
        },
    },

    {
        index: "17",
        title: "TASK APP",
        category: "FULL-STACK",
        context: "INDEPENDENT",
        year: "2020",
        image: taskAppImage,

        technologies: [
            "React",
            "Django",
            "AWS-S3",
            "MySQL",
            "Javascript",
            "Python",
            "HTML",
            "CSS",
            "RESTapi",
            "Responsive",
        ],

        description: [
            "Developed a full-stack task management application using Django and React.",
            "Implemented user authentication so each user can maintain their own persistent collection of tasks.",
            "Stored task data in a MySQL database so tasks remain available across sessions.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://www.fullstackgrub.com/taskapp/",
        },
    },

    {
        index: "18",
        title: "E-SIGNATURE PROJECT",
        category: "FRONTEND",
        context: "INDEPENDENT",
        year: "2020",
        image: eSigProImage,

        technologies: [
            "Javascript",
            "HTML",
            "CSS",
        ],

        description: [
            "Developed a lightweight front-end application to prototype an electronic signature field concept.",
            "Implemented the working proof of concept using JavaScript, HTML, and CSS.",
            "Completed the functional prototype in approximately 30 minutes.",
        ],

        destination: {
            type: "PROJECT",
            url: "https://www.fullstackgrub.com/formquixi/",
        },
    },
];


const INITIAL_PROJECT_COUNT = 6;


/*
 * ==========================================================================
 * TECHNOLOGY MARK
 * ==========================================================================
 */

function TechnologyMark({
    technology,
}: {
    technology: string;
}) {

    const definition = technologies[technology];

    const Icon = definition?.icon ?? FaCode;


    return (
        <li
            className="project-archive__technology"
            title={technology}
        >

            <span className="project-archive__technology-icon">

                <Icon
                    className="project-archive__technology-svg"
                    style={
                        definition?.color
                            ? { color: definition.color }
                            : undefined
                    }
                    aria-hidden="true"
                />

            </span>


            <span className="project-archive__technology-name text-mono">
                {technology}
            </span>

        </li>
    );
}


/*
 * ==========================================================================
 * PROJECT DETAILS
 * ==========================================================================
 */

function ProjectDetails({
    project,
}: {
    project: ArchiveProject;
}) {

    const detailsRef = useRef<HTMLDivElement>(null);


    /*
     * ----------------------------------------------------------------------
     * DETAIL REVEAL
     * ----------------------------------------------------------------------
     *
     * clipPath is a native CSS property.
     *
     * GSAP interpolates between the two clip-path values.
     *
     * This creates the "technical panel opening" effect without animating
     * layout height manually.
     */

    useLayoutEffect(() => {

        const details = detailsRef.current;


        if (!details) {
            return;
        }


        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (prefersReducedMotion) {
            return;
        }


        const context = gsap.context(() => {

            const timeline = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });


            /*
             * Outer panel:
             *
             * Reveal downward using CSS clip-path.
             */

            timeline.fromTo(
                details,
                {
                    clipPath: "inset(0 0 100% 0)",
                },
                {
                    clipPath: "inset(0 0 0% 0)",

                    duration: 0.65,

                    ease: "power4.inOut",

                    clearProps: "clipPath",
                }
            );


            /*
             * Screenshot:
             *
             * A second wipe creates visual separation between the panel
             * opening and the actual project image appearing.
             */

            timeline.fromTo(
                ".project-archive__details-image",
                {
                    clipPath: "inset(0 100% 0 0)",
                    scale: 1.035,
                },
                {
                    clipPath: "inset(0 0% 0 0)",
                    scale: 1,

                    duration: 0.7,

                    ease: "power4.inOut",

                    clearProps: "clipPath,transform",
                },
                "-=0.42"
            );


            /*
             * Content:
             *
             * `y` and `autoAlpha` are GSAP conveniences.
             */

            timeline.fromTo(
                ".project-archive__details-label",
                {
                    autoAlpha: 0,
                    y: 10,
                },
                {
                    autoAlpha: 1,
                    y: 0,

                    duration: 0.35,
                },
                "-=0.35"
            );


            timeline.fromTo(
                ".project-archive__details-point",
                {
                    autoAlpha: 0,
                    y: 12,
                },
                {
                    autoAlpha: 1,
                    y: 0,

                    duration: 0.4,
                    stagger: 0.07,
                },
                "-=0.2"
            );


            timeline.fromTo(
                ".project-archive__details-link",
                {
                    autoAlpha: 0,
                    x: -10,
                },
                {
                    autoAlpha: 1,
                    x: 0,

                    duration: 0.35,

                    clearProps: "transform,opacity,visibility",
                },
                "-=0.18"
            );

        }, details);


        return () => {
            context.revert();
        };

    }, []);


    return (
        <div
            className="project-archive__details"
            ref={detailsRef}
        >

            <div className="project-archive__details-layout">

                <div className="project-archive__details-visual">

                    <span
                        className="project-archive__details-corner project-archive__details-corner--top-left"
                        aria-hidden="true"
                    />

                    <span
                        className="project-archive__details-corner project-archive__details-corner--bottom-right"
                        aria-hidden="true"
                    />


                    <img
                        className="project-archive__details-image"
                        src={project.image}
                        alt={`${project.title} project preview`}
                        loading="lazy"
                    />

                </div>


                <div className="project-archive__details-content">

                    <div className="project-archive__details-heading">

                        <span className="project-archive__details-label text-mono">
                            ENGINEERING / NOTES
                        </span>


                        <span
                            className="project-archive__details-heading-line"
                            aria-hidden="true"
                        />

                    </div>


                    <ul className="project-archive__details-points">

                        {project.description.map((description) => (
                            <li
                                className="project-archive__details-point"
                                key={description}
                            >

                                <span
                                    className="project-archive__details-point-marker"
                                    aria-hidden="true"
                                />


                                <p className="project-archive__details-copy">
                                    {description}
                                </p>

                            </li>
                        ))}

                    </ul>


                    {project.destination && (
                        <a
                            className="project-archive__details-link"
                            href={project.destination.url}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <span
                                className="project-archive__details-link-background"
                                aria-hidden="true"
                            />


                            <span className="project-archive__details-link-label text-mono">

                                {project.destination.type === "SOURCE"
                                    ? "VIEW SOURCE"
                                    : project.destination.type === "DEMO"
                                        ? "VIEW DEMO"
                                        : "VIEW PROJECT"}

                            </span>


                            <span className="project-archive__details-link-icon-frame">

                                <ArrowUpRight
                                    className="project-archive__details-link-icon"
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                />

                            </span>

                        </a>
                    )}

                </div>

            </div>

        </div>
    );
}


/*
 * ==========================================================================
 * PROJECT ROW
 * ==========================================================================
 */

function ProjectRow({
    project,
    expanded,
    onToggle,
}: {
    project: ArchiveProject;
    expanded: boolean;
    onToggle: () => void;
}) {

    return (
        <article
            className={
                expanded
                    ? "project-archive__project project-archive__project--expanded"
                    : "project-archive__project"
            }
            data-project-index={project.index}
        >

            {/*
             * Decorative hover wash.
             *
             * CSS owns this interaction.
             */}

            <span
                className="project-archive__project-hover"
                aria-hidden="true"
            />


            {/*
             * GSAP animates this line across the project during the initial
             * archive reveal.
             */}

            <span
                className="project-archive__project-scan-line"
                aria-hidden="true"
            />


            <div className="project-archive__project-summary">

                <div className="project-archive__project-index">

                    <span className="project-archive__project-number text-mono">
                        {project.index}
                    </span>


                    <span className="project-archive__project-year text-mono">
                        / {project.year}
                    </span>

                </div>


                <div className="project-archive__project-identity">

                    <span className="project-archive__project-context text-mono">
                        {project.context}
                    </span>


                    {/*
                     * Wrapper allows the title to be clip-revealed without
                     * clipping the entire project row.
                     */}

                    <div className="project-archive__project-title-mask">

                        <h3 className="project-archive__project-title">

                            {project.title}

                            <span className="project-archive__project-title-mark">
                                .
                            </span>

                        </h3>

                    </div>

                </div>


                <div className="project-archive__project-category">

                    <span className="project-archive__project-category-label text-mono">
                        DISCIPLINE
                    </span>


                    <span className="project-archive__project-category-value text-mono">
                        {project.category}
                    </span>

                </div>


                <button
                    className="project-archive__project-toggle"
                    type="button"
                    onClick={onToggle}
                    aria-expanded={expanded}
                    aria-controls={`project-details-${project.index}`}
                >

                    <span
                        className="project-archive__project-toggle-background"
                        aria-hidden="true"
                    />


                    <span className="project-archive__project-toggle-label text-mono">
                        {expanded ? "CLOSE" : "VIEW DETAILS"}
                    </span>


                    <span className="project-archive__project-toggle-icon-frame">

                        {expanded ? (
                            <Minus
                                className="project-archive__project-toggle-icon"
                                aria-hidden="true"
                                strokeWidth={1.5}
                            />
                        ) : (
                            <Plus
                                className="project-archive__project-toggle-icon"
                                aria-hidden="true"
                                strokeWidth={1.5}
                            />
                        )}

                    </span>

                </button>

            </div>


            <ul
                className="project-archive__technologies"
                aria-label={`${project.title} technologies`}
            >

                {project.technologies.map((technology) => (
                    <TechnologyMark
                        technology={technology}
                        key={technology}
                    />
                ))}

            </ul>


            {expanded && (
                <div
                    className="project-archive__project-details"
                    id={`project-details-${project.index}`}
                >

                    <ProjectDetails project={project} />

                </div>
            )}

        </article>
    );
}


/*
 * ==========================================================================
 * PROJECT ARCHIVE
 * ==========================================================================
 */

function ProjectArchive() {

    const [showAllProjects, setShowAllProjects] =
        useState(false);


    const [expandedProject, setExpandedProject] =
        useState<string | null>(null);


    /*
     * ----------------------------------------------------------------------
     * REFS
     * ----------------------------------------------------------------------
     */

    const sectionRef =
        useRef<HTMLElement>(null);


    const archiveRef =
        useRef<HTMLDivElement>(null);


    const showMoreRef =
        useRef<HTMLDivElement>(null);


    /*
     * Mutable animation lifecycle flags.
     *
     * React state is intentionally unnecessary here because changing these
     * values should not cause another render.
     */

    const hasEnteredRef =
        useRef(false);


    const hasAnimatedShowMoreRef =
        useRef(false);


    /*
     * ----------------------------------------------------------------------
     * PROJECT VISIBILITY
     * ----------------------------------------------------------------------
     */

    const visibleProjects = showAllProjects
        ? archiveProjects
        : archiveProjects.slice(0, INITIAL_PROJECT_COUNT);


    /*
     * ----------------------------------------------------------------------
     * PROJECT DETAILS
     * ----------------------------------------------------------------------
     */

    const toggleProject = (projectIndex: string) => {

        setExpandedProject((currentProject) =>
            currentProject === projectIndex
                ? null
                : projectIndex
        );
    };


    /*
     * ----------------------------------------------------------------------
     * SHOW MORE / SHOW LESS
     * ----------------------------------------------------------------------
     */

    const toggleProjectVisibility = () => {

        if (showAllProjects) {

            const expandedIndex = expandedProject
                ? Number(expandedProject)
                : 0;


            if (expandedIndex > INITIAL_PROJECT_COUNT) {
                setExpandedProject(null);
            }


            setShowAllProjects(false);

            hasAnimatedShowMoreRef.current = false;


            /*
             * requestAnimationFrame is a native browser API.
             *
             * It waits until React has had an opportunity to commit the
             * shorter project list before restoring the viewport.
             */

            window.requestAnimationFrame(() => {

                showMoreRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });

            });


            return;
        }


        setShowAllProjects(true);
    };


    /*
     * ======================================================================
     * INITIAL SECTION ANIMATION
     * ======================================================================
     *
     * IntersectionObserver:
     * Native browser API.
     *
     * GSAP:
     * Handles the actual animation timeline.
     */

    useLayoutEffect(() => {

        const section = sectionRef.current;
        const archive = archiveRef.current;


        if (!section || !archive) {
            return;
        }


        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (prefersReducedMotion) {
            return;
        }


        let observer: IntersectionObserver | null = null;


        const context = gsap.context(() => {

            const initialRows =
                gsap.utils.toArray<HTMLElement>(
                    ".project-archive__project"
                );


            /*
             * --------------------------------------------------------------
             * INITIAL STATES
             * --------------------------------------------------------------
             */

            gsap.set(".project-archive__meta", {
                autoAlpha: 0,
                y: 12,
            });


            gsap.set(".project-archive__meta-line", {
                scaleX: 0,
                transformOrigin: "left center",
            });


            gsap.set(".project-archive__title-line-inner", {
                yPercent: 110,
            });


            gsap.set(".project-archive__introduction", {
                autoAlpha: 0,
                y: 18,
            });


            gsap.set(".project-archive__columns", {
                autoAlpha: 0,
            });


            gsap.set(initialRows, {
                autoAlpha: 0,
                y: 20,
            });


            gsap.set(
                ".project-archive__project-title",
                {
                    clipPath: "inset(0 100% 0 0)",
                }
            );


            gsap.set(
                ".project-archive__technology",
                {
                    autoAlpha: 0,
                    y: 6,
                }
            );


            gsap.set(
                ".project-archive__project-scan-line",
                {
                    scaleX: 0,
                    transformOrigin: "left center",
                }
            );


            gsap.set(".project-archive__more", {
                autoAlpha: 0,
                y: 14,
            });


            /*
             * --------------------------------------------------------------
             * VIEWPORT DETECTION
             * --------------------------------------------------------------
             */

            observer = new IntersectionObserver(
                ([entry]) => {

                    if (
                        !entry.isIntersecting ||
                        hasEnteredRef.current
                    ) {
                        return;
                    }


                    hasEnteredRef.current = true;


                    const timeline = gsap.timeline({
                        defaults: {
                            ease: "power3.out",
                        },
                    });


                    /*
                     * SECTION IDENTIFIER
                     */

                    timeline.to(
                        ".project-archive__meta",
                        {
                            autoAlpha: 1,
                            y: 0,

                            duration: 0.4,
                        }
                    );


                    timeline.to(
                        ".project-archive__meta-line",
                        {
                            scaleX: 1,

                            duration: 0.65,

                            ease: "power4.inOut",
                        },
                        "-=0.18"
                    );


                    /*
                     * TITLE CLIP REVEAL
                     *
                     * yPercent is a GSAP transform convenience.
                     */

                    timeline.to(
                        ".project-archive__title-line-inner",
                        {
                            yPercent: 0,

                            duration: 0.7,
                            stagger: 0.09,

                            ease: "power4.out",
                        },
                        "-=0.4"
                    );


                    /*
                     * INTRO COPY
                     */

                    timeline.to(
                        ".project-archive__introduction",
                        {
                            autoAlpha: 1,
                            y: 0,

                            duration: 0.5,
                        },
                        "-=0.42"
                    );


                    /*
                     * DESKTOP COLUMN INDEX
                     */

                    timeline.to(
                        ".project-archive__columns",
                        {
                            autoAlpha: 1,

                            duration: 0.35,
                        },
                        "-=0.25"
                    );


                    /*
                     * PROJECT ROWS
                     */

                    timeline.to(
                        initialRows,
                        {
                            autoAlpha: 1,
                            y: 0,

                            duration: 0.45,
                            stagger: 0.075,
                        },
                        "-=0.1"
                    );


                    /*
                     * PROJECT TITLE CLIP-PATHS
                     */

                    timeline.to(
                        ".project-archive__project-title",
                        {
                            clipPath: "inset(0 0% 0 0)",

                            duration: 0.5,
                            stagger: 0.055,

                            ease: "power4.out",

                            clearProps: "clipPath",
                        },
                        "-=0.55"
                    );


                    /*
                     * HORIZONTAL SCAN LINES
                     */

                    timeline.to(
                        ".project-archive__project-scan-line",
                        {
                            scaleX: 1,

                            duration: 0.45,
                            stagger: 0.055,

                            ease: "power3.inOut",
                        },
                        "-=0.5"
                    );


                    /*
                     * TECH MARKS
                     *
                     * A small stagger gives the technology stack some life
                     * without turning every icon into an individual event.
                     */

                    timeline.to(
                        ".project-archive__technology",
                        {
                            autoAlpha: 1,
                            y: 0,

                            duration: 0.28,
                            stagger: 0.012,

                            clearProps: "transform,opacity,visibility",
                        },
                        "-=0.42"
                    );


                    /*
                     * SHOW MORE CONTROL
                     */

                    timeline.to(
                        ".project-archive__more",
                        {
                            autoAlpha: 1,
                            y: 0,

                            duration: 0.4,

                            clearProps: "transform,opacity,visibility",
                        },
                        "-=0.1"
                    );


                    observer?.disconnect();
                },
                {
                    threshold: 0.1,
                }
            );


            observer.observe(archive);

        }, section);


        return () => {

            observer?.disconnect();

            context.revert();
        };

    }, []);


    /*
     * ======================================================================
     * SHOW MORE ANIMATION
     * ======================================================================
     *
     * Only projects 07–18 animate here.
     *
     * The first six have already participated in the initial timeline.
     */

    useLayoutEffect(() => {

        const section = sectionRef.current;


        if (
            !section ||
            !showAllProjects ||
            !hasEnteredRef.current ||
            hasAnimatedShowMoreRef.current
        ) {
            return;
        }


        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (prefersReducedMotion) {
            return;
        }


        hasAnimatedShowMoreRef.current = true;


        const context = gsap.context(() => {

            const newRows =
                archiveProjects
                    .slice(INITIAL_PROJECT_COUNT)
                    .map((project) =>
                        section.querySelector<HTMLElement>(
                            `[data-project-index="${project.index}"]`
                        )
                    )
                    .filter(
                        (
                            project
                        ): project is HTMLElement => Boolean(project)
                    );


            /*
             * Rows first.
             */

            gsap.fromTo(
                newRows,
                {
                    autoAlpha: 0,
                    y: 22,
                },
                {
                    autoAlpha: 1,
                    y: 0,

                    duration: 0.5,
                    stagger: 0.055,

                    ease: "power3.out",

                    clearProps: "transform,opacity,visibility",
                }
            );


            /*
             * Animate the contents of each newly created row independently.
             */

            newRows.forEach((row, rowIndex) => {

                const title =
                    row.querySelector(
                        ".project-archive__project-title"
                    );


                const technologies =
                    row.querySelectorAll(
                        ".project-archive__technology"
                    );


                const scanLine =
                    row.querySelector(
                        ".project-archive__project-scan-line"
                    );


                const delay =
                    0.08 + (rowIndex * 0.055);


                if (title) {

                    gsap.fromTo(
                        title,
                        {
                            clipPath: "inset(0 100% 0 0)",
                        },
                        {
                            clipPath: "inset(0 0% 0 0)",

                            duration: 0.5,
                            delay,

                            ease: "power4.out",

                            clearProps: "clipPath",
                        }
                    );
                }


                if (scanLine) {

                    gsap.fromTo(
                        scanLine,
                        {
                            scaleX: 0,
                            transformOrigin: "left center",
                        },
                        {
                            scaleX: 1,

                            duration: 0.45,
                            delay: delay + 0.06,

                            ease: "power3.inOut",
                        }
                    );
                }


                if (technologies.length > 0) {

                    gsap.fromTo(
                        technologies,
                        {
                            autoAlpha: 0,
                            y: 6,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,

                            duration: 0.25,
                            delay: delay + 0.12,
                            stagger: 0.012,

                            ease: "power2.out",

                            clearProps: "transform,opacity,visibility",
                        }
                    );
                }

            });

        }, section);


        return () => {
            context.revert();
        };

    }, [showAllProjects]);


    /*
     * ======================================================================
     * ESCAPE KEY
     * ======================================================================
     */

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {

            if (
                event.key === "Escape" &&
                expandedProject
            ) {
                setExpandedProject(null);
            }
        };


        window.addEventListener(
            "keydown",
            handleKeyDown
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [expandedProject]);


    return (
        <section
            className="project-archive"
            id="project-archive"
            ref={sectionRef}
            aria-labelledby="project-archive-title"
        >

            <div className="project-archive__container container">

                {/*
                 * ==========================================================
                 * SECTION META
                 * ==========================================================
                 */}

                <div className="project-archive__meta text-mono">

                    <div className="project-archive__meta-copy">

                        <span className="project-archive__section-index">
                            06 /
                        </span>


                        <span className="project-archive__section-label">
                            PROJECT ARCHIVE
                        </span>

                    </div>


                    <span
                        className="project-archive__meta-line"
                        aria-hidden="true"
                    />

                </div>


                {/*
                 * ==========================================================
                 * HEADER
                 * ==========================================================
                 */}

                <header className="project-archive__header">

                    <h2
                        className="project-archive__title"
                        id="project-archive-title"
                    >

                        <span className="project-archive__title-line">

                            <span className="project-archive__title-line-inner">
                                YEARS
                            </span>

                        </span>


                        <span className="project-archive__title-line">

                            <span className="project-archive__title-line-inner">

                                OF BUILDING

                                <span className="project-archive__title-mark">
                                    .
                                </span>

                            </span>

                        </span>

                    </h2>


                    <div className="project-archive__introduction">

                        <span className="project-archive__introduction-label text-mono">
                            18 PROJECTS / 2020 — 2026
                        </span>


                        <p className="project-archive__introduction-copy">
                            A broader engineering archive spanning production
                            systems, full-stack applications, machine learning,
                            algorithms, data systems, robotics, and earlier
                            experiments.
                        </p>

                    </div>

                </header>


                {/*
                 * ==========================================================
                 * ARCHIVE INDEX
                 * ==========================================================
                 */}

                <div
                    className="project-archive__index"
                    ref={archiveRef}
                >

                    <div
                        className="project-archive__columns"
                        aria-hidden="true"
                    >

                        <span className="project-archive__column-label project-archive__column-label--index text-mono">
                            INDEX / YEAR
                        </span>


                        <span className="project-archive__column-label project-archive__column-label--project text-mono">
                            PROJECT
                        </span>


                        <span className="project-archive__column-label project-archive__column-label--discipline text-mono">
                            DISCIPLINE
                        </span>


                        <span className="project-archive__column-label project-archive__column-label--action text-mono">
                            DETAILS
                        </span>

                    </div>


                    <div className="project-archive__list">

                        {visibleProjects.map((project) => (
                            <ProjectRow
                                project={project}
                                expanded={
                                    expandedProject === project.index
                                }
                                onToggle={() =>
                                    toggleProject(project.index)
                                }
                                key={project.index}
                            />
                        ))}

                    </div>

                </div>


                {/*
                 * ==========================================================
                 * SHOW MORE
                 * ==========================================================
                 */}

                <div
                    className="project-archive__more"
                    ref={showMoreRef}
                >

                    <div className="project-archive__more-rule" />


                    <button
                        className="project-archive__more-button"
                        type="button"
                        onClick={toggleProjectVisibility}
                        aria-expanded={showAllProjects}
                    >

                        <span
                            className="project-archive__more-button-background"
                            aria-hidden="true"
                        />


                        <span className="project-archive__more-content">

                            <span className="project-archive__more-eyebrow text-mono">

                                {showAllProjects
                                    ? "ARCHIVE / COMPLETE"
                                    : `${archiveProjects.length - INITIAL_PROJECT_COUNT} MORE PROJECTS`}

                            </span>


                            <span className="project-archive__more-label">

                                {showAllProjects
                                    ? "SHOW LESS"
                                    : "SHOW MORE PROJECTS"}

                            </span>

                        </span>


                        <span className="project-archive__more-icon-frame">

                            {showAllProjects ? (
                                <ChevronUp
                                    className="project-archive__more-icon"
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                />
                            ) : (
                                <ChevronDown
                                    className="project-archive__more-icon"
                                    aria-hidden="true"
                                    strokeWidth={1.5}
                                />
                            )}

                        </span>

                    </button>


                    <div className="project-archive__more-rule" />

                </div>

            </div>

        </section>
    );
}


export default ProjectArchive;