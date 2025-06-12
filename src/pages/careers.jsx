import React from "react";
import { Helmet } from "react-helmet-async";


const Careers = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen font-sans text-gray-800">
      
      {/* SEO Meta Tags for AGX International */}
      <Helmet>
        <title>Careers at AGX International | Global Job Opportunities & Internships</title>
        <meta
          name="description"
          content="Explore exciting career opportunities and rewarding internship programs at AGX International. Join our innovative global team of professionals and advance your career in technology, logistics, and beyond."
        />
        <meta
          name="keywords"
          content="AGX International careers, global job opportunities, tech jobs, logistics jobs, supply chain careers, software development jobs, internship programs, professional growth, innovative workplace, AGX International hiring, join AGX"
        />
        <link rel="canonical" href="https://www.yourwebsite.com/careers" />
      </Helmet>

      {/* Hero Section: Dynamic background image and title */}
      {/* bg-cover: Ensures the image covers the entire area, cropping if necessary to maintain aspect ratio.
          bg-center: Centers the image within the element.
          Adjust h-72 / h-80 / h-96 or use a custom height (e.g., h-[25rem]) to best frame your image.
          Ensure '/uploads/career.png' is the correct path relative to your public folder.
      */}
      <div 
        className="relative w-full h-80 md:h-60 lg:h-80 bg-cover bg-center flex items-center justify-center overflow-hidden" 
        style={{ backgroundImage: `url('/uploads/career.png')` }}
      >
        {/* Overlay for better text readability on top of the image */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
          Careers at AGX International
        </h1>
      </div>

      {/* Main Content Section: Description and Call-to-Action Buttons */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-10">
          AGX International is proud to be recognized as one of the most professional and forward-thinking workplaces.
          We are built on a foundation of continuous self-improvement and a solution-driven mindset.
          Working alongside our dynamic team of young and experienced professionals, you'll find
          ample **global job opportunities** and the chance to develop your skills, fostering both
          personal and professional growth within an **innovative workplace**.
        </p>

        {/* Buttons for Job and Internship Applications */}
        <div className="flex justify-center gap-6 mt-6 flex-wrap">
          <a
            href="https://forms.gle/YOUR_JOB_FORM_LINK" // <-- Replace with your actual Job Google Form URL
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Apply for a Job
          </a>
          <a
            href="https://forms.gle/YOUR_INTERNSHIP_FORM_LINK" // <-- Replace with your actual Internship Google Form URL
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Apply for Internship
          </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;