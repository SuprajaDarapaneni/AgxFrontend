import React, { useState, useEffect } from 'react';
import { Eye, Home, Handshake } from 'lucide-react'; // Importing icons from lucide-react, added Handshake for values

// Language translation data
const translations = {
    en: {
        "heading-main": "Careers at AGX-International",
        "heading-sub": "Join Our Global Mission at AGX-International",
        "intro-title": "Join Our Global Mission at AGX-International",
        "intro-p1": "At AGX-International, we are driven by a passion to bridge international markets and deliver excellence in global trade. As a dynamic and rapidly growing import-export company based in Canada, we are always on the lookout for talented, ambitious, and passionate individuals to join our diverse team.",
        "intro-p2": "Whether you're an experienced professional or just starting your career, we offer a platform where your skills are valued, your ideas matter, and your growth is prioritized. Our work culture is rooted in collaboration, innovation, and integrity — empowering every team member to thrive in a competitive global market.",
        "vision-title": "Vision",
        "vision-text": "To become a globally respected trading company known for integrity, efficiency, and contribution to international business growth.",
        "mission-title": "Mission",
        "mission-text": "To simplify and strengthen global trade by providing reliable, efficient, and ethical import-export solutions to clients worldwide.",
        "values-title": "Our Values",
        "values-text": "We value a workplace built on trust, growth, diversity, collaboration, and a commitment to excellence. At AGX-International, every team member contributes to a culture that supports learning, innovation, and mutual success.",
        "why-work-title": "Why Work With Us?",
        "why-work-text-full": "At AGX-International, we offer more than just a job — we offer a pathway to global exposure, leadership development, and a culture rooted in collaboration and inclusion. We support your growth with hands-on experience, mentorship, and real-world challenges that prepare you for long-term success.",
        "apply-ready-title": "Ready to Apply?",
        "apply-ready-text": "Click the Apply Now button to submit your application via our job form. Our team will review your profile and get in touch if you’re a match.",
        "apply-button": "Apply Now",
        "apply-questions-text": "For any questions, reach out to us at:",
        "apply-email": "careers@agx-international.com"
    },
    fr: {
        "heading-main": "Carrières chez AGX-International",
        "heading-sub": "Rejoignez Notre Mission Mondiale chez AGX-International",
        "intro-title": "Rejoignez Notre Mission Mondiale chez AGX-International",
        "intro-p1": "Chez AGX-International, nous sommes animés par la passion de connecter les marchés internationaux et de fournir l'excellence dans le commerce mondial. En tant qu'entreprise d'import-export dynamique et en pleine croissance basée au Canada, nous sommes toujours à la recherche d'individus talentueux, ambitieux et passionnés pour rejoindre notre équipe diversifiée.",
        "intro-p2": "Que vous soyez un professionnel expérimenté ou que vous débutiez votre carrière, nous offrons une plateforme où vos compétences sont valorisées, vos idées comptent et votre croissance est une priorité. Notre culture de travail est ancrée dans la collaboration, l'innovation et l'intégrité — permettant à chaque membre de l'équipe de s'épanouir sur un marché mondial compétitif.",
        "vision-title": "Vision",
        "vision-text": "Devenir une société commerciale respectée mondialement, reconnue pour son intégrité, son efficacité et sa contribution à la croissance du commerce international.",
        "mission-title": "Mission",
        "mission-text": "Simplifier et renforcer le commerce mondial en fournissant des solutions d'import-export fiables, efficaces et éthiques à des clients du monde entier.",
        "values-title": "Nos Valeurs",
        "values-text": "Nous valorisons un environnement de travail fondé sur la confiance, la croissance, la diversité, la collaboration et un engagement envers l'excellence. Chez AGX-International, chaque membre de l'équipe contribue à une culture qui soutient l'apprentissage, l'innovation et le succès mutuel.",
        "why-work-title": "Pourquoi Travailler Avec Nous ?",
        "why-work-text-full": "Chez AGX-International, nous offrons plus qu'un simple emploi — nous offrons un cheminement vers une exposition mondiale, le développement du leadership et une culture enracinée dans la collaboration et l'inclusion. Nous soutenons votre croissance avec une expérience pratique, du mentorat et des défis réels qui vous préparent à un succès à long terme.",
        "apply-ready-title": "Prêt à Postuler ?",
        "apply-ready-text": "Cliquez sur le bouton Postuler maintenant pour soumettre votre candidature via notre formulaire d'emploi. Notre équipe examinera votre profil et vous contactera si vous correspondez.",
        "apply-button": "Postuler Maintenant",
        "apply-questions-text": "Pour toute question, contactez-us à :",
        "apply-email": "careers@agx-international.com"
    }
};

const App = () => {
    // State to manage the current language
    const [currentLang, setCurrentLang] = useState('en');

    // Function to get translated text based on the key and current language
    const getTranslatedText = (key) => {
        return translations[currentLang][key] || key;
    };

    // Effect to update document title and potentially other meta tags
    useEffect(() => {
        document.title = getTranslatedText("heading-main") + " - " + getTranslatedText("heading-sub");
    }, [currentLang]);

    // Handler for language switcher change
    const handleLanguageChange = (event) => {
        setCurrentLang(event.target.value);
    };

    return (
        <div className="text-gray-800 antialiased leading-normal tracking-wide bg-gray-50 min-h-screen flex flex-col">
            {/* Language Switcher */}
            <div className="relative flex justify-end p-4 bg-white shadow-sm">
                <select
                    id="language-switcher"
                    className="block appearance-none w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-full shadow leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    value={currentLang}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>

            <header className="relative bg-gradient-to-r from-pink-500 to-rose-600 text-white py-12 px-4 sm:px-8 lg:px-8 overflow-hidden">
                {/* Background Image */}
                {/* Assuming images are in the public/uploads folder */}
                <div className="absolute inset-0 bg-cover bg-center opacity-30"
                     style={{ backgroundImage: "url('/uploads/abstract-business-people-city-buildings.jpg')" }}
                     onError={(e) => e.target.style.backgroundImage = 'url(https://placehold.co/1920x600/808080/ffffff?text=Image+Unavailable)'}>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 rounded-lg p-2">
                        {getTranslatedText("heading-main")}
                    </h1>
                    <p className="text-lg md:text-xl font-light opacity-90 rounded-lg p-2">
                        {getTranslatedText("heading-sub")}
                    </p>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Section: Introduction */}
                <section className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8 transform transition duration-500 hover:scale-102">
                    <h2 className="text-2xl md:text-3xl font-bold text-rose-700 mb-3">
                        {getTranslatedText("intro-title")}
                    </h2>
                    <p className="text-base mb-2 leading-relaxed">
                        {getTranslatedText("intro-p1")}
                    </p>
                    <p className="text-base leading-relaxed">
                        {getTranslatedText("intro-p2")}
                    </p>
                </section>

                {/* Section: Vision, Mission, and Our Values - Combined and Compact */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Vision */}
                    <section className="bg-pink-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center transform transition duration-300 hover:shadow-lg">
                        <div className="flex items-center justify-center w-12 h-12 bg-pink-200 text-pink-700 rounded-full mb-3 shadow-inner">
                            <Eye className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-rose-600 mb-2">
                            {getTranslatedText("vision-title")}
                        </h3>
                        <p className="text-sm leading-relaxed">
                            {getTranslatedText("vision-text")}
                        </p>
                    </section>

                    {/* Mission */}
                    <section className="bg-fuchsia-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center transform transition duration-300 hover:shadow-lg">
                        <div className="flex items-center justify-center w-12 h-12 bg-fuchsia-200 text-fuchsia-700 rounded-full mb-3 shadow-inner">
                            <Home className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-fuchsia-600 mb-2">
                            {getTranslatedText("mission-title")}
                        </h3>
                        <p className="text-sm leading-relaxed">
                            {getTranslatedText("mission-text")}
                        </p>
                    </section>

                    {/* Our Values - now with an integrated image */}
                    <section className="bg-pink-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center transform transition duration-300 hover:shadow-lg">
                        <img src="/uploads/building-dreamy-setting.jpg"
                             alt="Building in dreamy setting"
                             className="w-24 h-24 object-cover rounded-full mb-4 shadow-md" // Small circular image
                             onError={(e) => e.target.src = 'https://placehold.co/96x96/808080/ffffff?text=Image'} />
                        <h3 className="text-lg font-semibold text-rose-700 mb-2">
                            {getTranslatedText("values-title")}
                        </h3>
                        <p className="text-sm leading-relaxed">
                            {getTranslatedText("values-text")}
                        </p>
                    </section>
                </div>

                {/* Section: Why Work With Us? - Image Left, Content Right */}
                <section className="bg-gray-100 p-6 md:p-8 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                    <img src="/uploads/business-people-partnership-support-team-urban-scene-concept.jpg"
                         alt="Business people collaborating in an urban scene"
                         className="w-48 h-48 object-cover rounded-xl mt-0 mb-4 md:mb-0 md:mr-8 shadow-md flex-shrink-0"
                         onError={(e) => e.target.src = 'https://placehold.co/192x192/808080/ffffff?text=Image'} />
                    <div className="flex-grow">
                        <h2 className="text-2xl md:text-3xl font-bold text-rose-700 mb-4">
                            {getTranslatedText("why-work-title")}
                        </h2>
                        {/* Content for Why Work With Us as a single paragraph */}
                        <p className="text-base leading-relaxed max-w-prose mx-auto md:mx-0">
                            {getTranslatedText("why-work-text-full")}
                        </p>
                    </div>
                </section>

                {/* Section: Ready to Apply? - Image Left, Content Right */}
                <section className="text-center bg-pink-100 text-gray-800 p-6 md:p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-start md:text-left">
                    <img src="/uploads/recruitment-hiring-career-job-emplyment-concept.jpg"
                         alt="Recruitment and hiring concept image"
                         className="w-48 h-48 object-cover rounded-xl mt-0 mb-4 md:mb-0 md:mr-8 shadow-md flex-shrink-0"
                         onError={(e) => e.target.src = 'https://placehold.co/192x192/808080/ffffff?text=Image'} />
                    <div className="flex-grow">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-rose-700">
                            {getTranslatedText("apply-ready-title")}
                        </h2>
                        <p className="text-base mb-4 leading-relaxed max-w-prose mx-auto md:mx-0">
                            {getTranslatedText("apply-ready-text")}
                        </p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeauobF3kVaZhvCE0-0uRmCfXPNPevepVNoYleN5CZdCQiLUQ/viewform?usp=header" target="_blank" rel="noopener noreferrer"
                           className="inline-block bg-rose-700 text-white hover:bg-rose-600 font-bold py-2 px-6 rounded-full text-base md:text-lg uppercase transition duration-300 transform hover:scale-105 shadow-lg">
                            {getTranslatedText("apply-button")}
                        </a>
                        <p className="text-sm mt-4 opacity-90">
                            {getTranslatedText("apply-questions-text")}
                        </p>
                        <a href="mailto:careers@agx-international.com" className="text-base font-medium text-rose-700 hover:underline">
                            {getTranslatedText("apply-email")}
                        </a>
                    </div>
                </section>

            </main>

             
        </div>
    );
};

export default App;
