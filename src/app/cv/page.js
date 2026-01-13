'use client';

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import React, { useState } from 'react';
import DownloadButton from "@/components/cv/downloadBtn";

const initialCv = {
  name: "Ulises Rodriguez Candela",
  role: "Software Engineer | Information Security Engineer",
  // website: "ulises.io",
  linkedin: "linkedin.com/in/ulisescandela",
  aboutMe: "Results-oriented Software Engineer with 4+ years of experience delivering scalable web solutions and automating enterprise workflows. Proven expertise in the Python/JavaScript ecosystem (Django, React, Node.js) and Database Management. Driving continuous innovation at John Deere by developing security applications and optimizing asset management systems.",
  workExperience: [
    {
      company: "John Deere",
      position: "Information Security Engineer",
      location: "Monterrey, NL (Hybrid / Remote in Torreon, Coahuila)",
      startDate: "Mar 2023",
      endDate: "Present",
      description: [
        "Designed and developed full-stack internal security tools using Python (Django/Flask) and MySQL, improving asset visibility and network monitoring efficiency across the organization.",
        "Implemented containerization strategies using Docker to standardize development environments and accelerate deployment cycles in Linux RHEL servers.",
        "Architected and maintained automated workflows in ServiceNow, managing technical decisions for data integrity, configuration items management, business logic for workflows and catalog item optimization.",
        "Provided technical coaching and mentorship to team members on ServiceNow development best practices, enabling the team to independently deliver solutions for internal stakeholders.",
        "Collaborated with cross-functional teams to define system requirements, ensuring security principles in software development lifecycles.",
        "Managed observability and monitoring of critical assets."
      ]
    },
    {
      company: "HandCloud",
      position: "ServiceNow Developer",
      location: "Guadalajara, Jalisco (Remote)",
      startDate: "May 2022",
      endDate: "Mar 2023",
      description: [
        "Developed custom scoped applications within the ServiceNow platform to automate complex business processes, directly impacting operational efficiency.",
        "Created and optimized Javascript-based scripts (Client Scripts, Business Rules) and API integrations (REST/SOAP) to connect external systems.",
        "Led the technical design of catalog items and workflows, ensuring scalability and maintainability of the solution."
      ]
    },
    {
      company: "Quickapps",
      position: "Software Developer",
      location: "Torreon, Coahuila",
      startDate: "Sep 2021",
      endDate: "May 2022",
      description: [
        "Executed full-lifecycle web development using HTML5, CSS3, and JavaScript, ensuring responsive design and cross-browser compatibility.",
        "Engineered complex data migrations from Magento to Shopify, ensuring 100% data integrity for e-commerce clients.",
        "Developed backend logic and API integrations for Zoho CRM using Deluge and SQL, streamlining sales and finance operations."
      ]
    }
  ],
  education: [
    {
      degree: "Master's Degree in Information Technology Administration",
      institution: "Universidad Tecmilenio",
      location: "Torreon, Coahuila",
      startDate: "Sep 2022",
      endDate: "May 2024",
    },
    {
      degree: "Bachelor's of Science in Mechatronics Engineering",
      institution: "Tecnologico de La Laguna",
      location: "Torreon, Coahuila",
      startDate: "Aug 2017",
      endDate: "Dec 2021",
    }
  ],
  skills: {
    "Core Development": ["Python (Django, Flask)", "JavaScript (ES6+, Node.js)", "React", "Next.js", "SQL"],
    "Infrastructure & DevOps": ["Docker", "Linux RHEL", "Git", "GitHub"],
    "Systems & Design": ["Database Modeling (MySQL, Postgres)", "API Design (REST)"],
    "Enterprise Tools": ["ServiceNow Development", "Observability Platforms", "CRM"],
  },
  softSkills: {
    "Leadership & Communication": ["Technical Mentoring", "Cross-functional Collaboration", "Problem Solving"]
  }
}

export default function CVPage() {
  const [cv, setCv] = useState(initialCv);

  const handleUnlock = (data) => {
    setCv(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <>
      <div className="flex justify-between items-start px-10 sticky top-4 z-50 pointer-events-none print:hidden">
        <div className="pointer-events-auto">
          <Link href="/">
            <div className="flex flex-row gap-2 items-center bg-white text-blue-700 font-medium text-sm border border-gray-200 rounded-xl p-2.5 shadow-sm hover:shadow-lg transition-all duration-300 hover:cursor-pointer">
              <HiArrowLeft className="w-4 h-4" />
              <span className="text-sm">Return to home</span>
            </div>
          </Link>
        </div>
        <div className="pointer-events-auto">
           <DownloadButton onUnlock={handleUnlock} />
        </div>
      </div>
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-8 pt-8 pb-4 flex flex-col gap-2 border-b-2 border-gray-800 mb-6 print:pt-0 print:pb-1 print:mb-2 print:px-0 print:gap-1">
        <h1 className="text-5xl font-bold text-gray-900 uppercase tracking-wide print:text-2xl print:mb-0">{cv.name}</h1>
        <h2 className="text-2xl font-medium text-gray-700 print:text-lg print:mb-0">{cv.role}</h2>
        <div className="text-sm text-gray-600 flex flex-wrap gap-2 items-center print:text-xs print:mt-0">
          {[
            cv.email && <a href={`mailto:${cv.email}`} className="hover:text-blue-700">{cv.email}</a>,
            cv.website && <a href={`https://${cv.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">{cv.website}</a>,
            cv.phone && <span>{cv.phone}</span>,
            cv.linkedin && <a href={`https://${cv.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">{cv.linkedin}</a>,
            cv.address && <span>{cv.address}</span>,
          ].filter(Boolean).map((item, index, arr) => (
             <React.Fragment key={index}>
                {item}
                {index < arr.length - 1 && <span>|</span>}
             </React.Fragment>
          ))}
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      <div className="max-w-4xl mx-auto px-8 py-2 print:px-0 print:py-0 print:mb-1">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 mb-3 uppercase tracking-wider print:text-base print:mb-0.5">Professional Summary</h3>
        <p className="text-gray-800 leading-relaxed text-justify print:text-xs print:leading-tight">
          {cv.aboutMe}
        </p>
      </div>

      {/* SKILLS */}
      <div className="max-w-4xl mx-auto px-8 py-2 print:px-0 print:py-0 print:mb-1">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 mb-3 uppercase tracking-wider print:text-base print:mb-0.5">Technical Skills</h3>
        <Skills skills={cv.skills} />
        <div className="mt-2 print:mt-0.5">
           <Skills skills={cv.softSkills} />
        </div>
      </div>

      {/* PROFESSIONAL EXPERIENCE */}
      <div className="max-w-4xl mx-auto px-8 py-2 print:px-0 print:py-0 print:mb-1">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 mb-4 uppercase tracking-wider print:text-base print:mb-1">Professional Experience</h3>
        <div className="flex flex-col gap-6 print:gap-2">
          {cv.workExperience.map((workExperience, index) => (
            <WorkExperience key={index} {...workExperience} />
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      <div className="max-w-4xl mx-auto px-8 py-2 mb-12 print:px-0 print:py-0 print:mb-0">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 mb-4 uppercase tracking-wider print:text-base print:mb-1">Education</h3>
        <div className="flex flex-col gap-4 print:gap-1">
          {cv.education.map((education, index) => (
            <Education key={index} {...education} />
          ))}
        </div>
      </div>
    </>
  );
}

function Education({ degree, institution, location, startDate, endDate }) {
  return (
    <div>
      <div className="flex flex-row justify-between items-baseline w-full">
        <h4 className="font-bold text-gray-900 text-lg print:text-base">
          {institution} <span className="font-normal text-gray-600">- {location}</span>
        </h4>
        <span className="text-gray-600 font-medium text-sm text-right min-w-fit pl-4 print:text-xs">
          {startDate} - {endDate}
        </span>
      </div>
      <p className="italic text-gray-800 print:text-sm">{degree}</p>
    </div>
  );
}

function WorkExperience({ company, position, location, startDate, endDate, description }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-row justify-between items-baseline w-full mb-1 print:mb-0">
        <h4 className="font-bold text-gray-900 text-lg print:text-base">
          {company} <span className="font-normal text-gray-600">- {location}</span>
        </h4>
        <span className="text-gray-600 font-medium text-sm text-right min-w-fit pl-4 print:text-xs">
          {startDate} - {endDate}
        </span>
      </div>
      
      <p className="italic text-gray-800 font-medium mb-2 print:mb-0 print:text-sm">{position}</p>
      
      <ul className="list-disc ml-5 space-y-1 print:space-y-0.5">
        {description.map((item, index) => (
          <li key={index} className="text-gray-700 leading-snug pl-1 print:text-xs">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skills({ skills }) {
  return (
    <div className="flex flex-col gap-1 print:gap-0">
      {Object.entries(skills).map(([category, skillList]) => (
        <div key={category} className="flex flex-row items-baseline gap-2">
          <span className="font-bold text-gray-900 min-w-fit print:text-sm">{category}:</span>
          <span className="text-gray-800 print:text-xs">{skillList.join(", ")}</span>
        </div>
      ))}
    </div>
  );
}

// Remove separate SoftSkills component and use Skills for both to maintain consistency
// ...existing code...