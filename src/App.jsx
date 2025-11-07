import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileImage from './assets/Profile_Picture.jpg';
import backgroundImage from './assets/background_image.jpg';
import shadowImage from './assets/Shadowmodel.png';
import shadowImage1 from './assets/Shadowmodel1.png';
import shadowImage2 from './assets/Shadowmodel2.png';
import wmkeckImage from './assets/WMKeckorbit.png';
import orbitImage from './assets/JNWorbit1.png';
import s2orbitImage from './assets/S2orbit.png';
import deformImage from './assets/Deform.png';
import pulsarImage from './assets/Pulsartiming.png';
import penroseImage from './assets/nullpenrose.png';




// --- Data extracted from CV (Expanded for detail pages) ---

const personalInfo = {
  name: "Parth Bambhaniya",
  title: "PhD | FAPESP Postdoctoral Fellow | IAG, University of São Paulo, Brazil",
  quote: "Every photon that escapes carries the truth of gravity",
  email: "parth.bambhaniya@usp.br",
  location: "São Paulo, Brazil",
  researchInterests: "Theoretical and Computational Astrophysics, Black Holes, Spacetime Singularities, General Relativity, Shadows and Accretion Disks, Plasma Astrophysics, MHD and GRMHD, Horizonless Compact Objects, Relativistic Orbits of S-stars, Pulsar Timing, Tidal Forces, Gravitational Collapse, Transients and Multi-messengers (Member of ASTRI Mini-Array).",
  links: {
    googleScholar: "https://scholar.google.com/citations?user=bfBJi04AAAAJ&hl=en",
    orcid: "https://orcid.org/0000-0001-8424-3357",
    inspireHEP: "https://inspirehep.net/authors/1757353?ui-citation-summary=true",
  }
};

const experienceData = [
  {
    duration: "2024-Present",
    role: "FAPESP Postdoctoral Fellow",
    institution: "IAG, University of São Paulo, Brazil, (Mentor: Elisabete M. de Gouveia Dal Pino)",
    description: "Project: High Energy Processes around Black Holes and Jets."
  },
  {
    duration: "2023-2024",
    role: "Postdoctoral Fellow",
    institution: "ICSC, Ahmedabad University, India, (Mentor: Pankaj S. Joshi)",
    description: "Project: Astrophysics of Black Holes and Spacetime Singularities."
  },
  {
    duration: "2018-2023",
    role: "Ph.D. in Physics (Astrophysics)",
    institution: "Charotar University of Science and Technology, India, (Supervisor: Pankaj S. Joshi)",
    description: "Thesis: A Study of Black Holes and Beyond: Shadows and Relativistic Orbits."
  },
  {
    duration: "2016-2018",
    role: "M.Sc. in Physics",
    institution: "M. K. Bhavnagar University, India",
    description: "Graduated with First Class Honors."
  },
  {
    duration: "2013-2016",
    role: "B.Sc. in Physics",
    institution: "M. K. Bhavnagar University, India",
    description: "Graduated with First Class with Distinction."
  }
];

const skillsData = {
  programming: ["C/C++", "Python", "FORTRAN", "Mathematica",],
  computational: [
    "PLUTO", "Athena++/AthenaK", "PyGRO", "Gammapy", "Brahma", "Einstein toolkit", "ipole"
  ],
  tools: ["LaTeX", "Crixet", "ParaView", "VisIt", "Linux", "Mac", "Windows"]
};

const fullPublicationsList = [
    // Published Articles
    { title: "Horizon-scale tests of gravity theories and fundamental physics from the Event Horizon Telescope image of Sagittarius A*", journal: "Class. Quant. Grav. 40, 2023, 165007.", doi:"https://doi.org/10.1088/1361-6382/acd97b", type: "published" },
    { title: "Imaging ultra-compact objects with radiative inefficient accretion flows", journal: "Astronomy and Astrophysics 682, 2024, A113.", doi:"https://doi.org/10.1051/0004-6361/202347941", type: "published" },
    { title: "Shadows and negative precession in non-Kerr spacetime", journal: "Phys. Rev. D 103, 2021, 084005.", doi:"https://doi.org/10.1103/PhysRevD.103.084005", type: "published" },
    { title: "Relativistic orbits of S2 star in the presence of scalar field", journal: "Eur. Phys. J. C, 84, 2024, 124.", doi:"https://doi.org/10.1140/epjc/s10052-024-12477-3", type: "published" },  
    { title: "Thin accretion disk in the Simpson-Visser black-bounce and wormhole spacetime", journal: "Phys. Rev. D 105, 2022, 023021.", doi:"https://doi.org/10.1103/PhysRevD.105.023021", type: "published" },
    { title: "Shadow of a Naked Singularity without Photon Sphere", journal: "Phys. Rev. D 102, 2020, 024022.", doi:"https://doi.org/10.1103/PhysRevD.102.024022", type: "published" },  
    { title: "Energy extraction from Janis-Newman-Winicour naked singularity", journal: "Phys. Rev. D 107, 2023, 064036.", doi:"https://doi.org/10.1103/PhysRevD.107.064036", type: "published" }, 
    { title: "Relativistic time delay analysis of pulsar signals near ultra-compact objects", journal: "Phys. Rev. D 110, 2024, 104026.", doi:"https://doi.org/10.1103/PhysRevD.110.104026", type: "published" },  
    { title: "Timelike geodesics in Naked Singularity and Black Hole Spacetimes", journal: "Phys. Rev. D 100, 2019, 124020.", doi:"https://doi.org/10.1103/PhysRevD.100.124020", type: "published" },  
    { title: "Precession of timelike bound orbits in Kerr spacetime", journal: "Eur. Phys. J. C 81, 2021, 205.", doi:"https://doi.org/10.1140/epjc/s10052-021-08997-x", type: "published" },
    { title: "Time Delay of Pulsar Signals in Astrophysical Black Hole Spacetimes", journal: "Phys. Dark. Univ. 49, 2025, 10203649.", doi:"https://doi.org/10.1016/j.dark.2025.102036", type: "published" }, 
    { title: "High Energy Particle Collisions in the vicinity of Naked Singularity", journal: "Phys. Dark. Univ. 50, 2025, 102101.", doi:"https://doi.org/10.1016/j.dark.2025.102101", type: "published" },
    { title: "Shadows and precession of orbits in rotating Janis-Newman-Winicour spacetime", journal: "Eur. Phys. J. C 82, 2022, 77.", doi:"https://doi.org/10.1140/epjc/s10052-022-10045-1", type: "published" },
    { title: "Rotational energy extraction from the Kerr black hole's mimickers", journal: "Universe 8. 2022, 571.", doi:"https://doi.org/10.3390/universe8110571", type: "published" },
    { title: "Lense-Thirring effect and precession of timelike geodesics in slowly rotating black hole and naked singularity spacetimes", journal: "Phys. Dark. Univ. 40, 2023, 101215.", doi:"https://doi.org/10.1016/j.dark.2023.101215", type: "published" },  
    { title: "Tidal forces in the Simpson-Visser black-bounce and wormhole spacetimes", journal: "Phys. Dark. Univ. 44, 2024, 101487.", doi:"https://doi.org/10.1016/j.dark.2024.101487", type: "published" },
    { title: "Tidal force effects and periodic orbits in null naked singularity spacetime", journal: "Chin. Phys. C 48, 2024, 11, 115108.", doi:"https://doi.org/10.1088/1674-1137/ad654f", type: "published" },
    { title: "On the interactions of black holes and cosmic strings", journal: "Phys. Dark. Univ. 46, 2024, 101553.", doi:"https://doi.org/10.1016/j.dark.2024.101553", type: "published" },
    { title: "Towards an Observational test of Black Hole versus Naked Singularity at the Galactic Center", journal: "Int. J. Mod. Phys. D. 28, 2019, 1930024.", doi:"https://doi.org/10.1142/S0218271819300246", type: "published" }, 
    { title: "Influence of primary hair and plasma on intensity distribution of black hole shadows", journal: "Eur. Phys. J. Plus 140, 2025, 23", doi:"https://doi.org/10.1140/epjp/s13360-024-05933-2", type: "published" },
    { title: "Retrograde Precession of Relativistic Orbits and the Quest for Charged Black Holes", journal: "Phys. Dark. Univ. 48, 2025, 101949.", doi:"https://doi.org/10.1016/j.dark.2025.101949", type: "published" }, 
    { title: "Shadow Formation Conditions Beyond the Kerr Black Hole Paradigm", journal: "Symmetry 17, 2025, 1384.", doi:"https://doi.org/10.3390/sym17091384", type: "published" },
   
    
    // Submitted/arXiv Articles
    { title: "A Study of Black Holes and Beyond: Shadows and Relativistic Orbits", journal: "arXiv:2406.01202 [gr-qc].", type: "submitted" },
    { title: "Timelike Geodesics in Naked Singularity and Black Hole Spacetimes II", journal: "arXiv:1909.08873 [gr-qc].", type: "submitted" },
    { title: "Probing the Shadow Image of the Sagittarius A* with Event Horizon Telescope", journal: "arXiv:2202.00588 [gr-qc].", type: "submitted" },
    { title: "Quasinormal Modes and Stability Analysis of the JMN-1 Naked Singularity", journal: "arXiv: 2504.01653 [gr-qc].", type: "submitted" }
];
const publicationsPreview = fullPublicationsList.filter(pub => pub.type === "published").slice(0, 9);

const achievementsData = [
  "FAPESP Postdoctoral Fellowship, Grant No. 2024/09383-4, IAG, Sao Paulo University, Brazil, 2024.",
  "All India Rank-107 in the National level Joint Entrance Screening Test (JEST) for Physics, 2018.",
  "Young Researcher Award by National Institute of Scholars, Bangalore, 2020.",
  "1st rank in the State level Minaxi-Lalit Science Award Test (M.Sc. Physics), 2018.",
  "The CHARUSAT Research paper Award for 'Precession of timelike bound orbits in Kerr spacetime', 2023.",
  "The CHARUSAT Research paper Award for 'Timelike bound orbits in the black hole and naked singularity spacetimes', 2022.", 
  "1st rank in the State level Minaxi-Lalit Science Award Test (M.Sc. Physics), 2017.",
  "1st rank in the State level Minaxi-Lalit Science Award Test (B.Sc. Physics), 2016."
];

const supervisedStudentsData = [
  { 
    name: "Akshat Pathrikar", 
    level: "M.Sc.", 
    topic: "M.Sc. project student at Ahmedabad University, Aug 2024-Mar 2025", 
    publication: "arXiv:2504.01653"
  },
  { 
    name: "Meet Vyas", 
    level: "B.Tech", 
    topic: "B.Tech project student at Ahmedabad University, Jan 2024-Jan 2025", 
    publication: "Phys. Dark. Univ. 48, 2025, 101949."
  },
  { 
    name: "Viraj Kalsariya", 
    level: "M.Sc.", 
    topic: "M.Sc. project student at Ahmedabad University, Jul 2023-Sep 2024", 
    publication: "Phys. Rev. D 110, 2024, 104026."
  },
  { 
    name: "Siddharth Madan", 
    level: "M.Sc.", 
    topic: "M.Sc. project student at Charusat University, Sep 2023-Jan 2024", 
    publication: "Chin. Phys. C 48, 115108 (2024)"
  },
  { 
    name: "Dhruv Arora", 
    level: "M.Sc.", 
    topic: "M.Sc. project student at Charusat University, Jan-May 2023", 
    publication: "Phys. Dark Univ. 44, 101487 (2024)"
  },
  { 
    name: "Kauntey Acharya", 
    level: "M.Sc.", 
    topic: "M.Sc. project student at Charusat University, Jan 2023-Jun 2024", 
    publication: "Phys. Rev. D 107, 2023, 064036; Phys. Dark. Univ. 50, 2025, 102101."
  },
  { 
    name: "Saurabh", 
    level: "M.Sc.", 
    topic: "M.Sc. project student at Charusat University, Aug 2021-Mar 2023", 
    publication: "A&A 682, 2024, A113"
  }
];

const conferencesData = [
  { 
    title: "High Energy Phenomena in Relativistic Outflows IX (HEPRO IX)", 
    location: "Rio de Janeiro, Brazil", 
    date: "4-8 Aug 2025", 
    type: "attended",
    role: "Poster Presentation"
  },
  { 
    title: "A. K. Raychaudhuri Centenary Year Conference", 
    location: "Institute of Mathematical Sciences (IMSc), Chennai", 
    date: "5-7 Oct 2023", 
    type: "attended",
    role: "Participant"
  },

  { 
    title: "The 21st BritGrav meeting", 
    location: "Relativity Group, University College Dublin, Ireland", 
    date: "12-16 Apr 2021", 
    type: "attended",
    role: "Oral presentation"
  },
  { 
    title: "11th Central European Relativity Seminar", 
    location: "Vienna, Austria", 
    date: "11-13 Feb 2021", 
    type: "attended",
    role: "Oral presentation"
  },
  { 
    title: "31st Meeting of the Indian Association for General Relativity and Gravitation (IAGRG)", 
    location: "IIT-Gandhinagar, Gujarat, India", 
    date: "19-20 Dec 2020", 
    type: "attended",
    role: "Participant"
  },
  { 
    title: "Virtual Conference of the Polish Society on Relativity 2020", 
    location: "Poland", 
    date: "24-26 Sep 2020", 
    type: "attended",
    role: "Participant"
  },
  
];

const workshopsData = [
    { 
    title: "International Workshop on Relativistic Astrophysics and Gravitation (online)", 
    location: "Astronomical Institute of Uzbekistan Academy of Sciences", 
    date: "12-14 May 2021", 
    type: "attended",
    role: "Participant"
  },
{ 
    title: "International Workshop on Astrophysics and Cosmology", 
    location: "ICC, CHARUSAT, Anand, Gujarat, India", 
    date: "20-24 Dec 2019", 
    type: "attended",
    role: "Oral Presentation"
  },
  {
    title: "International workshop on Astrophysics and Cosmology",
    location: "ICC, CHARUSAT",
    date: "20-24 December 2019",
    type: "organized",
    role: "Organizing committee member"
  }
];

const invitedTalksData = [
   {
    title: "Do We Really Know What's at the Center of Our Galaxy?",
    venue: "IAG-USP",
    location: "Sao Paulo, Brazil (YouTube)",
    date: "9th April, 2025",
    link: "https://www.youtube.com/live/2jt30CbMyOg?si=yF4wAk0sKv1VCVZC"
  },
  {
    title: "Are We Sure It's a Supermassive Black Hole at the Heart of Our Galaxy?",
    venue: "Astro and Cosmo meeting by ICTP-SAIFR",
    location: "Sao Paulo, Brazil (YouTube)",
    date: "4th April, 2025",
    link: "https://www.youtube.com/watch?v=ZzqTugWqMv0"
  },
  {
    title: "Invited for Podcast on Black holes and Naked Singularities",
    venue: "Physics for Students Channel, India",
    location: "Online (YouTube)",
    date: "25th May, 2025",
    link: "https://www.youtube.com/live/g6cCmQwWbUg"
  },
  {
    title: "Life of Stars and Black Holes",
    venue: "Atal Tinkering Lab Jeevanbharti",
    location: "Surat, India",
    date: "28th February, 2024"
  },
  {
    title: "Probing the Nature of Sgr A* at the Milky Way Galactic Center",
    venue: "Department of Physics, IIT-Bombay",
    location: "Mumbai, India",
    date: "11th May, 2022"
  }
];

// --- Routing Logic ---
// Theme toggle removed - using consistent dark theme with space background

const pageVariants = {
    initial: { opacity: 0, x: "-100vw" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100vw" },
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
};


// --- Reusable Animated Components ---
const AnimatedSection = ({ children, className = '', id = '' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.section id={id} ref={ref} initial="hidden" animate={controls} variants={variants} className={`py-20 px-4 md:px-8 ${className}`}>
      {children}
    </motion.section>
  );
};

// --- General UI Components ---

const Header = ({ setPage }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const navLinks = ["About", "Experience", "Skills", "Publications", "Achievements", "Contact"];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-slate-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={() => setPage('home')} className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">PB</a>
                <div className="hidden md:flex space-x-6 items-center">
                    {navLinks.map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setPage('home')} className="text-gray-300 hover:text-cyan-400 transition-colors">{link}</a>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl">
                            {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
                        </button>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                 <motion.div initial={{opacity:0, y: -20}} animate={{opacity:1, y: 0}} className="md:hidden py-4 bg-slate-900/95">
                    {navLinks.map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`} onClick={() => { setPage('home'); setIsMenuOpen(false); }} className="block text-center py-2 text-gray-300 hover:text-cyan-400 transition-colors">{link}</a>
                    ))}
                </motion.div>
            )}
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-slate-900/80 border-t border-slate-700 text-gray-400 py-6 relative">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
            </div>
        </footer>
    );
};


// --- Home Page Sections ---

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center text-white relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={backgroundImage} 
                    alt="Background" 
                    className="w-full h-full object-cover"
                />
                {/* Subtle dark overlay */}
                <div className="absolute inset-0 bg-slate-900/40"></div>
            </div>
            
            {/* Grid overlay for design effect */}
            <div className="absolute inset-0 bg-grid-slate-700/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] z-0"></div>
            
            <div className="container mx-auto px-6 text-center z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">{personalInfo.name}</h1>
                    <p className="text-lg md:text-2xl text-cyan-400 mb-8">{personalInfo.title}</p>
                    <p className="text-lg md:text-2xl text-white-400 mb-8">{personalInfo.quote}</p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="flex justify-center space-x-6 mb-8 text-3xl">
                            <a href={personalInfo.links.orcid} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-cyan-400 transition-colors" title="ORCID"><i className="ai ai-orcid"></i></a>
                            <a href={personalInfo.links.googleScholar} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-cyan-400 transition-colors" title="Google Scholar"><i className="ai ai-google-scholar"></i></a>
                            <a href={personalInfo.links.inspireHEP} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-cyan-400 transition-colors" title="INSPIRE-HEP"><i className="ai ai-inspire"></i></a>
                        </div>
                        <a href="#contact" className="bg-cyan-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30">Get in Touch</a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};


const About = () => {
  // array of images + captions (use the imports above)
  const researchImages = [
  { src: shadowImage2, caption: "Comparative shadow structure: Naked singularity vs Black hole" },
  { src: wmkeckImage, caption: "Astrometric data of S-star orbits" },
  { src: s2orbitImage, caption: "S2 star orbit around the Sgr A*" },
  { src: pulsarImage, caption: "Pulsar timing probes of spacetime curvature near compact objects" },
  { src: shadowImage, caption: "Shadow imaging model of horizonless compact objects" },
  { src: shadowImage1, caption: "Simulated thin accretion disks of Black Holes" },
  { src: orbitImage, caption: "Relativistic orbit simulation in naked singularity spacetime" },  
  { src: rvs2Image, caption: "Radial velocity curve of S2 star showing gravitational redshift" },
  { src: deformImage, caption: "Deformed shadow shape of non-Kerr black hole" },  
  { src: penroseImage, caption: "Penrose diagram for null naked singularity" },
  ];

  return (
    <AnimatedSection id="about" className="bg-slate-900/60 backdrop-blur-sm relative">
      <div className="container mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* Left: profile image */}
        <div className="md:col-span-1">
          <motion.div
            className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-slate-700 overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={profileImage} alt="Dr. Parthraj Bambhaniya" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Right: research interests + gallery */}
        <div className="md:col-span-2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-4">Research Interests</h2>
          <p className="text-gray-300 leading-relaxed mb-6">{personalInfo.researchInterests}</p>

          {/* Gallery title (optional) */}
          <h3 className="text-xl font-semibold text-white mb-4">Selected Research Visuals</h3>

          {/* Responsive image grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
  {researchImages.map((img, index) => (
    <div 
      key={index} 
      className="bg-slate-800/70 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition duration-300 flex flex-col items-center"
    >
      <div className="w-full h-64 flex items-center justify-center bg-black">
        <img 
          src={img.src} 
          alt={img.caption} 
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <p className="text-sm text-center text-cyan-300 mt-3 mb-3 px-3">{img.caption}</p>
    </div>
  ))}
</div>

      </div>
      </div>
    </AnimatedSection>
  );
};



const SectionWithMoreButton = ({ id, title, children, onMoreClick }) => {
    return (
        <AnimatedSection id={id} className="bg-slate-800/50 backdrop-blur-sm">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-white text-center mb-12">{title}</h2>
                {children}
                <div className="text-center mt-12">
                    <button onClick={onMoreClick} className="bg-transparent border-2 border-cyan-500 text-cyan-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                        View Full Details
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};


// --- Detail Page Components ---

const DetailPageLayout = ({ title, children, onBack }) => {
    return (
         <motion.div
            className="min-h-screen pt-24 relative"
            initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
        >
            {/* Background Image for detail pages */}
            <div className="fixed inset-0 z-0">
                <img 
                    src={backgroundImage} 
                    alt="Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/70"></div>
            </div>
            
            <div className="container mx-auto px-6 py-12 relative z-10">
                <button onClick={onBack} className="flex items-center text-cyan-400 mb-8 font-semibold hover:underline">
                    <i className="fa-solid fa-arrow-left mr-2"></i> Back to Main Page
                </button>
                <h1 className="text-4xl font-bold text-white mb-12 border-b-2 border-cyan-500/50 pb-4">{title}</h1>
                <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};


const ExperiencePage = ({ onBack }) => {
    return (
        <DetailPageLayout title="Research Experience & Education" onBack={onBack}>
            <div className="relative border-l-2 border-cyan-500/30 pl-8">
                {experienceData.map((item, index) => (
                    <div key={index} className="mb-10">
                        <div className="absolute -left-2 top-1 h-4 w-4 rounded-full bg-cyan-500"></div>
                        <p className="text-cyan-400 text-md font-semibold">{item.duration}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{item.role}</h3>
                        <p className="text-lg text-gray-400 mb-2">{item.institution}</p>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </DetailPageLayout>
    );
};


const PublicationsPage = ({ onBack }) => {
  return (
    <DetailPageLayout title="Complete Publication List" onBack={onBack}>
      <ol className="list-decimal space-y-6 pl-6">
        {fullPublicationsList.map((pub, index) => (
          <li key={index}>
            <h3 className="font-semibold text-white text-xl">{pub.title}</h3>
            <p className="text-cyan-400">{pub.journal}</p>

            {/* --- Add DOI link if available --- */}
            {pub.doi && (
              <p className="text-sm text-gray-300 mt-1">
                DOI:{" "}
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 hover:underline"
                >
                  {pub.doi}
                </a>
              </p>
            )}

            {/* --- Optional: Add arXiv link if present --- */}
            {pub.journal?.includes("arXiv") && (
              <p className="text-sm text-gray-300 mt-1">
                <a
                  href={`https://arxiv.org/abs/${pub.journal.match(/\d{4}\.\d{5}/)?.[0] || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 hover:underline"
                >
                  [View on arXiv]
                </a>
              </p>
            )}
          </li>
        ))}
      </ol>
    </DetailPageLayout>
  );
};



const AchievementsPage = ({ onBack }) => {
    return (
         <DetailPageLayout title="Notable Achievements" onBack={onBack}>
             <ul className="space-y-6">
                {achievementsData.map((item, index) => (
                    <li key={index} className="flex items-start space-x-4 p-4 bg-slate-800/50 rounded-lg">
                        <div className="text-cyan-400 text-2xl mt-1 flex-shrink-0 w-8 text-center"><i className="fa-solid fa-award"></i></div>
                        <p>{item}</p>
                    </li>
                ))}
            </ul>
        </DetailPageLayout>
    );
};

const SupervisedStudentsPage = ({ onBack }) => {
    return (
        <DetailPageLayout title="Supervised Students" onBack={onBack}>
            {supervisedStudentsData.length > 0 ? (
                <div className="space-y-6">
                    {supervisedStudentsData.map((student, index) => (
                        <div key={index} className="p-6 bg-slate-800/50 rounded-lg">
                            <h3 className="text-xl font-bold text-white">{student.name}</h3>
                            <p className="text-cyan-400">{student.level} Student • {student.year}</p>
                            <p className="mt-2 text-gray-300">{student.topic}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-300">Information to be added from CV.</p>
            )}
        </DetailPageLayout>
    );
};

const ConferencesWorkshopsPage = ({ onBack }) => {
    return (
        <DetailPageLayout title="Conferences & Workshops" onBack={onBack}>
            <div className="space-y-12">
                {/* Conferences Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/30 pb-2">Conferences</h2>
                    {conferencesData.length > 0 ? (
                        <div className="space-y-4">
                            {conferencesData.map((conf, index) => (
                                <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                                    <h3 className="font-semibold text-white text-lg">{conf.title}</h3>
                                    <p className="text-cyan-400">{conf.location} • {conf.date}</p>
                                    {conf.role && <p className="text-sm text-gray-400 mt-1">{conf.role}</p>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-300">Information to be added from CV.</p>
                    )}
                </div>

                {/* Workshops Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-cyan-500/30 pb-2">Workshops</h2>
                    {workshopsData.length > 0 ? (
                        <div className="space-y-4">
                            {workshopsData.map((workshop, index) => (
                                <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-white text-lg">{workshop.title}</h3>
                                            <p className="text-cyan-400">{workshop.location} • {workshop.date}</p>
                                            {workshop.role && <p className="text-sm text-gray-400 mt-1">{workshop.role}</p>}
                                        </div>
                                        {workshop.type === "organized" && (
                                            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">Organized</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-300">Information to be added from CV.</p>
                    )}
                </div>
            </div>
        </DetailPageLayout>
    );
};

const InvitedTalksPage = ({ onBack }) => {
    return (
        <DetailPageLayout title="Invited Talks" onBack={onBack}>
            {invitedTalksData.length > 0 ? (
                <div className="space-y-6">
                    {invitedTalksData.map((talk, index) => (
                        <div key={index} className="p-6 bg-slate-800/50 rounded-lg border-l-4 border-cyan-500">
                            <h3 className="text-xl font-bold text-white mb-2">{talk.title}</h3>
                            <p className="text-cyan-400 font-medium">{talk.venue}</p>
                            <p className="text-gray-400 mt-1">{talk.location} • {talk.date}</p>
                            {talk.link && (
                                <a href={talk.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm mt-2 inline-block hover:underline">
                                    Watch Recording <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-300">Information to be added from CV.</p>
            )}
        </DetailPageLayout>
    );
};



// --- Main Page Component ---
const MainPage = ({ setPage }) => {
    return (
        <>
            <Hero />
            <About />

            <SectionWithMoreButton id="experience" title="Research Experience" onMoreClick={() => setPage('experience')}>
                 <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-cyan-500/30 hidden md:block"></div>
                    {experienceData.slice(0, 3).map((item, index) => (
                        <motion.div key={index} className="mb-8 flex justify-between items-center w-full" initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}>
                            <div className="hidden md:block w-5/12"></div>
                            <div className="z-10 hidden md:flex items-center"><div className="bg-cyan-500 rounded-full h-4 w-4 shadow-lg shadow-cyan-500/50"></div></div>
                            <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-xl w-full md:w-5/12">
                                <p className="text-cyan-400 text-sm mb-1">{item.duration}</p>
                                <h3 className="text-xl font-bold text-white">{item.role}</h3>
                                <p className="text-gray-400">{item.institution}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </SectionWithMoreButton>

            <AnimatedSection id="skills" className="bg-slate-900/60 backdrop-blur-sm">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Technical Skills</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div className="bg-slate-800/70 p-6 rounded-lg shadow-lg" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                            <div className="flex items-center mb-4 text-cyan-400 text-2xl"><span className="w-10 text-center"><i className="fa-solid fa-microchip"></i></span><h3 className="text-xl font-bold text-white ml-3">Programming</h3></div>
                            <ul>{skillsData.programming.map(s => <li key={s} className="text-gray-300 mb-1 pl-2 border-l-2 border-slate-700">{s}</li>)}</ul>
                        </motion.div>
                         <motion.div className="bg-slate-800/70 p-6 rounded-lg shadow-lg" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                            <div className="flex items-center mb-4 text-cyan-400 text-2xl"><span className="w-10 text-center"><i className="fa-solid fa-atom"></i></span><h3 className="text-xl font-bold text-white ml-3">Computational</h3></div>
                            <ul>{skillsData.computational.map(s => <li key={s} className="text-gray-300 mb-1 pl-2 border-l-2 border-slate-700">{s}</li>)}</ul>
                        </motion.div>
                         <motion.div className="bg-slate-800/70 p-6 rounded-lg shadow-lg" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                            <div className="flex items-center mb-4 text-cyan-400 text-2xl"><span className="w-10 text-center"><i className="fa-solid fa-screwdriver-wrench"></i></span><h3 className="text-xl font-bold text-white ml-3">Tools</h3></div>
                            <ul>{skillsData.tools.map(s => <li key={s} className="text-gray-300 mb-1 pl-2 border-l-2 border-slate-700">{s}</li>)}</ul>
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>

          
<SectionWithMoreButton
  id="publications"
  title="Selected Publications"
  onMoreClick={() => setPage('publications')}
>
  <div className="space-y-6">
    {publicationsPreview.map((pub, index) => (
      <motion.div
        key={index}
        className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-cyan-500/20"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <h3 className="font-semibold text-white text-lg mb-1">{pub.title}</h3>
        <p className="text-cyan-400 text-sm inline">
          {pub.journal}
          {pub.doi && (
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-500 hover:underline ml-2"
            >
              [DOI]
            </a>
          )}
          {pub.journal?.includes("arXiv") && (
            <a
              href={`https://arxiv.org/abs/${pub.journal.match(/\d{4}\.\d{5}/)?.[0] || ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-500 hover:underline ml-2"
            >
              [arXiv]
            </a>
          )}
        </p>
      </motion.div>
    ))}
  </div>
</SectionWithMoreButton>




            <SectionWithMoreButton id="achievements" title="Notable Achievements" onMoreClick={() => setPage('achievements')}>
                 <div className="grid md:grid-cols-2 gap-6">
                    {achievementsData.slice(0, 4).map((item, index) => (
                        <motion.div key={index} className="flex items-start space-x-4 p-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                            <div className="text-cyan-400 mt-1 text-2xl w-8 text-center"><i className="fa-solid fa-award"></i></div>
                            <p className="text-gray-300">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </SectionWithMoreButton>

            {/* Academic Activities Grid */}
            <AnimatedSection id="academic-activities" className="bg-slate-900/60 backdrop-blur-sm">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Academic Activities</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Supervised Students */}
                        <motion.div 
                            className="bg-slate-800/70 p-6 rounded-lg shadow-lg cursor-pointer" 
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            onClick={() => setPage('students')}
                        >
                            <div className="flex items-center mb-4 text-cyan-400 text-3xl">
                                <span className="w-12 text-center"><i className="fa-solid fa-user-graduate"></i></span>
                                <h3 className="text-xl font-bold text-white ml-3">Supervised Students</h3>
                            </div>
                            <p className="text-gray-300 mb-4">Mentoring and guiding research students</p>
                            <button className="text-cyan-400 font-semibold hover:underline flex items-center">
                                View Details <i className="fa-solid fa-arrow-right ml-2"></i>
                            </button>
                        </motion.div>

                        {/* Conferences & Workshops */}
                        <motion.div 
                            className="bg-slate-800/70 p-6 rounded-lg shadow-lg cursor-pointer" 
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            onClick={() => setPage('conferences')}
                        >
                            <div className="flex items-center mb-4 text-cyan-400 text-3xl">
                                <span className="w-12 text-center"><i className="fa-solid fa-users"></i></span>
                                <h3 className="text-xl font-bold text-white ml-3">Conferences & Workshops</h3>
                            </div>
                            <p className="text-gray-300 mb-4">Participated and organized academic events</p>
                            <button className="text-cyan-400 font-semibold hover:underline flex items-center">
                                View Details <i className="fa-solid fa-arrow-right ml-2"></i>
                            </button>
                        </motion.div>

                        {/* Invited Talks */}
                        <motion.div 
                            className="bg-slate-800/70 p-6 rounded-lg shadow-lg cursor-pointer" 
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            onClick={() => setPage('talks')}
                        >
                            <div className="flex items-center mb-4 text-cyan-400 text-3xl">
                                <span className="w-12 text-center"><i className="fa-solid fa-microphone"></i></span>
                                <h3 className="text-xl font-bold text-white ml-3">Invited Talks</h3>
                            </div>
                            <p className="text-gray-300 mb-4">Presentations at institutions and conferences</p>
                            <button className="text-cyan-400 font-semibold hover:underline flex items-center">
                                View Details <i className="fa-solid fa-arrow-right ml-2"></i>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>
            
            <AnimatedSection id="contact" className="bg-slate-800/50 backdrop-blur-sm">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Science is never the outcome of individual effort. All publications reflect collaborations with remarkable colleagues, and it has been a privilege to work alongside them. Open to discussions on research, collaborations, and academic opportunities. Contact via email is warmly welcome.</p>
                    <motion.a href={`mailto:${personalInfo.email}`} className="inline-flex items-center bg-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <i className="fa-solid fa-envelope mr-3"></i> {personalInfo.email}
                    </motion.a>
                </div>
            </AnimatedSection>
        </>
    );
};


// --- Top-Level App Component ---
export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    // Inject Font Awesome stylesheet
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);

    // Add brand icons for ORCID (academicons)
    const academiconsLink = document.createElement('link');
    academiconsLink.rel = 'stylesheet';
    academiconsLink.href = 'https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css';
    document.head.appendChild(academiconsLink);

    return () => {
      document.head.removeChild(fontAwesomeLink);
      document.head.removeChild(academiconsLink);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch(page) {
        case 'home':
            return <MainPage setPage={setPage} />;
        case 'experience':
            return <ExperiencePage onBack={() => setPage('home')} />;
        case 'publications':
            return <PublicationsPage onBack={() => setPage('home')} />;
        case 'achievements':
            return <AchievementsPage onBack={() => setPage('home')} />;
        case 'students':
            return <SupervisedStudentsPage onBack={() => setPage('home')} />;
        case 'conferences':
            return <ConferencesWorkshopsPage onBack={() => setPage('home')} />;
        case 'talks':
            return <InvitedTalksPage onBack={() => setPage('home')} />;
        default:
            return <MainPage setPage={setPage} />;
    }
  }

  return (
    <div className="bg-slate-900 text-white font-sans leading-normal tracking-tight relative min-h-screen">
        {/* Global Background Image */}
        <div className="fixed inset-0 z-0">
            <img 
                src={backgroundImage} 
                alt="Space Background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/50"></div>
        </div>
        
        <style>{`
          .bg-grid-slate-700\\/30 { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-opacity='0.3' stroke='%23334155'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e"); }
          html { scroll-behavior: smooth; }
        `}</style>
        
        <div className="relative z-10">
            <Header page={page} setPage={setPage} />
            <main>
                <AnimatePresence mode="wait">
                    {renderPage()}
                </AnimatePresence>
            </main>
           <Footer />

            <p className="text-center text-xs text-gray-300 opacity-70 py-2 relative z-10">
              Background image courtesy: ESO /M. Kornmesser
            </p>
        </div>
    </div>
  )
}

