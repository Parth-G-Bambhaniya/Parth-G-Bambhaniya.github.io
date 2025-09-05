import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- Data extracted from CV (Expanded for detail pages) ---

const personalInfo = {
  name: "Dr. Parthraj Bambhaniya",
  title: "FAPESP Postdoctoral Fellow | Astrophysicist",
  email: "parth.bambhaniya@usp.br",
  location: "São Paulo, Brazil",
  about: "A dedicated postdoctoral researcher with a strong background in theoretical, computational, and observational aspects of Black Holes and supermassive compact objects. My work focuses on exploring the fundamental physics of gravity through phenomena like black hole shadows, accretion disks, and relativistic orbits.",
  links: {
    googleScholar: "https://scholar.google.com/citations?user=your_id", // Replace with actual URL
    orcid: "https://orcid.org/0000-0001-8424-3357",
    inspireHEP: "https://inspirehep.net/authors/your_id", // Replace with actual URL
    linkedIn: "https://linkedin.com/in/your_username", // Replace with actual URL
  }
};

const experienceData = [
  {
    duration: "2024-Present",
    role: "FAPESP Postdoctoral Fellow",
    institution: "University of São Paulo (USP), Brazil",
    description: "Project: High Energy Processes around Black Holes and Jets."
  },
  {
    duration: "2023-2024",
    role: "Research Associate",
    institution: "Ahmedabad University, India",
    description: "Project: Astrophysics of Black holes and Spacetime Singularities."
  },
  {
    duration: "2018-2023",
    role: "Ph.D. in Physics (Astrophysics)",
    institution: "Charotar University of Science and Technology, India",
    description: "Thesis: A Study of Black Holes and Beyond."
  },
  {
    duration: "2016-2018",
    role: "M.Sc. in Physics",
    institution: "M. K. Bhavnagar University, India",
    description: "Graduated with First Class honors."
  },
  {
    duration: "2013-2016",
    role: "B.Sc. in Physics",
    institution: "M. K. Bhavnagar University, India",
    description: "Graduated with First Class with Distinction."
  }
];

const skillsData = {
  programming: ["C/C++", "Python", "FORTRAN", "Mathematica"],
  computational: ["Ray-tracing (Brahma code)", "Radiative Transfer Modeling", "MHD & GRHD Simulations (PLUTO, Athena++)", "Numerical Astrophysics"],
  tools: ["LaTeX", "Linux", "Mac OS", "Windows", "MS Office"]
};

const fullPublicationsList = [
    { title: "Retrograde Precession of Relativistic Orbits and the Quest for Charged Black Holes", journal: "Phys. Dark. Univ. 48, 2025, 101949." },
    { title: "Time Delay of Pulsar Signals in Astrophysical Black Hole Spacetimes", journal: "Phys. Dark. Univ. 49, 2025, 10203649." },
    { title: "Shadow Formation Conditions Beyond the Kerr Black Hole Paradigm", journal: "Symmetry (accepted)." },
    { title: "On the interactions of black holes and cosmic strings", journal: "Phys. Dark. Univ. 46, 2024, 101553." },
    { title: "Relativistic orbits of S2 star in the presence of scalar field", journal: "Eur. Phys. J. C, 84, 2024, 124." },
    { title: "Imaging ultra-compact objects with radiative inefficient accretion flows", journal: "Astronomy and Astrophysics 682, 2024, A113." },
    { title: "Horizon-scale tests of gravity theories and fundamental physics from the EHT image of Sagittarius A*", journal: "Class. Quant. Grav. 40, 2023, 165007." },
    { title: "Energy extraction from Janis-Newman-Winicour naked singularity", journal: "Phys. Rev. D 107, 2023, 064036." },
    { title: "Thin accretion disk in the Simpson-Visser black-bounce and wormhole spacetime", journal: "Phys. Rev. D 105, 2022, 023021." },
    { title: "Shadows and negative precession in non-Kerr spacetime", journal: "Phys. Rev. D 103, 2021, 084005." },
    { title: "Shadow of a Naked Singularity without Photon Sphere", journal: "Phys. Rev. D 102, 2020, 024022." },
    { title: "Timelike geodesics in Naked Singularity and Black Hole Spacetimes", journal: "Phys. Rev. D 100, 2019, 124020." }
];
const publicationsPreview = fullPublicationsList.slice(0, 5);

const achievementsData = [
  "FAPESP Postdoctoral Fellowship, Grant No. 2024/09383-4, IAG, Sao Paulo University, Brazil, 2024.",
  "The CHARUSAT Research paper Award for 'Precession of timelike bound orbits in Kerr spacetime', 2023.",
  "The CHARUSAT Research paper Award for 'Timelike bound orbits in the black hole and naked singularity spacetimes', 2022.",
  "Young Researcher Award by National Institute of Scholars, Bangalore, 2020.",
  "All India Rank-107 in the National level Joint Entrance Screening Test (JEST) for Physics, 2018.",
  "1st rank in the State level Minaxi-Lalit Science Award Test (M.Sc. Physics), 2018.",
  "1st rank in the State level Minaxi-Lalit Science Award Test (M.Sc. Physics), 2017.",
  "1st rank in the State level Minaxi-Lalit Science Award Test (B.Sc. Physics), 2016."
];

// --- Theme and Routing Logic ---

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return [theme, setTheme];
};

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

const Header = ({ theme, setTheme, setPage }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const navLinks = ["About", "Experience", "Skills", "Publications", "Achievements", "Contact"];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={() => setPage('home')} className="text-xl font-bold text-slate-800 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">PB</a>
                <div className="hidden md:flex space-x-6 items-center">
                    {navLinks.map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setPage('home')} className="text-slate-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">{link}</a>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 w-10 h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        {theme === 'dark' ? <i className="fa-solid fa-sun text-xl"></i> : <i className="fa-solid fa-moon text-xl"></i>}
                    </button>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 dark:text-white text-2xl">
                            {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
                        </button>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                 <motion.div initial={{opacity:0, y: -20}} animate={{opacity:1, y: 0}} className="md:hidden py-4 bg-slate-100/90 dark:bg-slate-900/90">
                    {navLinks.map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`} onClick={() => { setPage('home'); setIsMenuOpen(false); }} className="block text-center py-2 text-slate-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">{link}</a>
                    ))}
                </motion.div>
            )}
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-slate-200 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-800 text-gray-600 dark:text-gray-400 py-6">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
            </div>
        </footer>
    );
};


// --- Home Page Sections ---

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-700/40 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]"></div>
            <div className="container mx-auto px-6 text-center z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">{personalInfo.name}</h1>
                    <p className="text-lg md:text-2xl text-cyan-500 dark:text-cyan-400 mb-8">{personalInfo.title}</p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="flex justify-center space-x-6 mb-8 text-3xl">
                            <a href={personalInfo.links.orcid} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"><i className="ai ai-orcid"></i></a>
                            <a href={personalInfo.links.googleScholar} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"><i className="ai ai-google-scholar"></i></a>
                            <a href={personalInfo.links.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                        <a href="#contact" className="bg-cyan-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30 dark:shadow-cyan-500/20">Get in Touch</a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};


const About = () => {
    return (
        <AnimatedSection id="about" className="bg-slate-50 dark:bg-slate-800">
            <div className="container mx-auto grid md:grid-cols-3 gap-12 items-center">
                <div className="md:col-span-1">
                    <motion.div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden shadow-2xl" whileHover={{ scale: 1.05, rotate: 3 }} transition={{ type: "spring", stiffness: 300 }}>
                        <img src="https://placehold.co/400x400/e2e8f0/475569?text=PB" alt="Dr. Parthraj Bambhaniya" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
                <div className="md:col-span-2 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">About Me</h2>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{personalInfo.about}</p>
                </div>
            </div>
        </AnimatedSection>
    );
};


const SectionWithMoreButton = ({ id, title, children, onMoreClick }) => {
    return (
        <AnimatedSection id={id} className="bg-slate-100 dark:bg-slate-900">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">{title}</h2>
                {children}
                <div className="text-center mt-12">
                    <button onClick={onMoreClick} className="bg-transparent border-2 border-cyan-500 text-cyan-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105">
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
            className="min-h-screen pt-24"
            initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
        >
            <div className="container mx-auto px-6 py-12">
                <button onClick={onBack} className="flex items-center text-cyan-500 dark:text-cyan-400 mb-8 font-semibold hover:underline">
                    <i className="fa-solid fa-arrow-left mr-2"></i> Back to Main Page
                </button>
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-12 border-b-2 border-cyan-500/50 pb-4">{title}</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-gray-300">
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
                        <p className="text-cyan-500 dark:text-cyan-400 text-md font-semibold">{item.duration}</p>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{item.role}</h3>
                        <p className="text-lg text-slate-700 dark:text-gray-400 mb-2">{item.institution}</p>
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
                        <h3 className="font-semibold text-slate-800 dark:text-white text-xl">{pub.title}</h3>
                        <p className="text-cyan-500 dark:text-cyan-400">{pub.journal}</p>
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
                    <li key={index} className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="text-cyan-400 text-2xl mt-1 flex-shrink-0 w-8 text-center"><i className="fa-solid fa-award"></i></div>
                        <p>{item}</p>
                    </li>
                ))}
            </ul>
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
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full md:w-5/12">
                                <p className="text-cyan-500 dark:text-cyan-400 text-sm mb-1">{item.duration}</p>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{item.role}</h3>
                                <p className="text-slate-600 dark:text-gray-400">{item.institution}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </SectionWithMoreButton>

            <AnimatedSection id="skills" className="bg-slate-50 dark:bg-slate-800">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">Technical Skills</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow-lg" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                            <div className="flex items-center mb-4 text-cyan-400 text-2xl"><span className="w-10 text-center"><i className="fa-solid fa-microchip"></i></span><h3 className="text-xl font-bold text-slate-800 dark:text-white ml-3">Programming</h3></div>
                            <ul>{skillsData.programming.map(s => <li key={s} className="text-slate-600 dark:text-gray-300 mb-1 pl-2 border-l-2 border-slate-300 dark:border-slate-700">{s}</li>)}</ul>
                        </motion.div>
                         <motion.div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow-lg" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                            <div className="flex items-center mb-4 text-cyan-400 text-2xl"><span className="w-10 text-center"><i className="fa-solid fa-atom"></i></span><h3 className="text-xl font-bold text-slate-800 dark:text-white ml-3">Computational</h3></div>
                            <ul>{skillsData.computational.map(s => <li key={s} className="text-slate-600 dark:text-gray-300 mb-1 pl-2 border-l-2 border-slate-300 dark:border-slate-700">{s}</li>)}</ul>
                        </motion.div>
                         <motion.div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow-lg" whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                            <div className="flex items-center mb-4 text-cyan-400 text-2xl"><span className="w-10 text-center"><i className="fa-solid fa-screwdriver-wrench"></i></span><h3 className="text-xl font-bold text-slate-800 dark:text-white ml-3">Tools</h3></div>
                            <ul>{skillsData.tools.map(s => <li key={s} className="text-slate-600 dark:text-gray-300 mb-1 pl-2 border-l-2 border-slate-300 dark:border-slate-700">{s}</li>)}</ul>
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>

            <SectionWithMoreButton id="publications" title="Selected Publications" onMoreClick={() => setPage('publications')}>
                 <div className="space-y-6">
                    {publicationsPreview.map((pub, index) => (
                        <motion.div key={index} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-cyan-500/20" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                            <h3 className="font-semibold text-slate-800 dark:text-white text-lg">{pub.title}</h3>
                            <p className="text-cyan-500 dark:text-cyan-400 text-sm">{pub.journal}</p>
                        </motion.div>
                    ))}
                </div>
            </SectionWithMoreButton>

            <SectionWithMoreButton id="achievements" title="Notable Achievements" onMoreClick={() => setPage('achievements')}>
                 <div className="grid md:grid-cols-2 gap-6">
                    {achievementsData.slice(0, 4).map((item, index) => (
                        <motion.div key={index} className="flex items-start space-x-4 p-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                            <div className="text-cyan-500 dark:text-cyan-400 mt-1 text-2xl w-8 text-center"><i className="fa-solid fa-award"></i></div>
                            <p className="text-slate-600 dark:text-gray-300">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </SectionWithMoreButton>
            
            <AnimatedSection id="contact" className="bg-slate-50 dark:bg-slate-800">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Get In Touch</h2>
                    <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">I am always open to discussing new research, collaborations, or opportunities. Feel free to reach out to me via email.</p>
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
  const [theme, setTheme] = useTheme();
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
        default:
            return <MainPage setPage={setPage} />;
    }
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white font-sans leading-normal tracking-tight">
        <style>{`
          .bg-grid-slate-200 { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23e2e8f0'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e"); }
          .dark .dark\\:bg-grid-slate-700\\/40 { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-opacity='0.4' stroke='%23334155'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e"); }
          html { scroll-behavior: smooth; }
        `}</style>
        <Header theme={theme} setTheme={setTheme} page={page} setPage={setPage} />
        <main>
            <AnimatePresence mode="wait">
                {renderPage()}
            </AnimatePresence>
        </main>
        <Footer />
    </div>
  )
}

