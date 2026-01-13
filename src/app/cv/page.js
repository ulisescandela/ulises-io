import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import React from 'react';

const cv = {
  name: "Ulises Rodríguez Candela",
  // email: "ulisescandela99@gmail.com",
  role: "Software Engineer | Information Security Engineer",
  // phone: "+52 871 178 7067",
  // address: "Coahuila, México",
  website: "ulises.io",
  linkedin: "linkedin.com/in/ulisescandela",
  aboutMe: "Results-oriented Software Engineer with 4+ years of experience delivering scalable web solutions and automating enterprise workflows. Proven expertise in the Python/JavaScript ecosystem (Django, React, Node.js) and Database Design. Currently driving innovation at John Deere by developing security applications and optimizing asset management systems. Committed to efficient development workflows through Containerization (Docker).",
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
        "Architected and maintained automated workflows in ServiceNow, driving key technical decisions for incident management logic and catalog item optimization.",
        "Collaborated with cross-functional teams to define system requirements, ensuring 'Security by Design' principles in software development lifecycles.",
        "Managed observability and monitoring of critical assets, reducing incident response times through automated ticket solving scripts."
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
      position: "Software Developer JR",
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
    "Infrastructure & DevOps": ["Docker (Containerization)", "Linux RHEL", "Git"],
    "Systems & Design": ["System Design", "Database Modeling (MySQL, Postgres)", "API Design (REST)"],
    "Enterprise Tools": ["ServiceNow Development", "Observability Platforms", "Asset Management Tools"],
  },
  softSkills: {
    "Leadership & Communication": ["Technical Mentoring", "Cross-functional Collaboration", "Problem Solving", "English (Professional)"]
  }
}

// ...existing code...
export default function CVPage() {
  return (
    <>
      <Link href="/">
        <div className="flex flex-row gap-2 items-center mt-4 w-fit text-blue-700 font-medium text-sm ml-10 sticky top-10 bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-gray-300 hover:cursor-pointer print:hidden">
          <HiArrowLeft className="w-4 h-4" />
          <span className="text-sm">Return to home</span>
        </div>
      </Link>
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-8 pt-8 pb-4 flex flex-col gap-2 border-b-2 border-gray-800 mb-6">
        <h1 className="text-5xl font-bold text-gray-900 uppercase tracking-wide">{cv.name}</h1>
        <h2 className="text-2xl font-medium text-gray-700">{cv.role}</h2>
        <div className="text-sm text-gray-600 flex flex-wrap gap-2 items-center">
          {[
            cv.address && <span>{cv.address}</span>,
            cv.email && <a href={`mailto:${cv.email}`} className="hover:text-blue-700">{cv.email}</a>,
            cv.linkedin && <a href={`https://${cv.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">{cv.linkedin}</a>,
            cv.website && <a href={`https://${cv.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">{cv.website}</a>,
            cv.phone && <span>{cv.phone}</span>
          ].filter(Boolean).map((item, index, arr) => (
             <React.Fragment key={index}>
                {item}
                {index < arr.length - 1 && <span>|</span>}
             </React.Fragment>
          ))}
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      <div className="max-w-4xl mx-auto px-8 py-2">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 mb-3 uppercase tracking-wider">Professional Summary</h3>
        <p className="text-gray-800 leading-relaxed text-justify">
          {cv.aboutMe}
        </p>
      </div>

      {/* SKILLS */}
      <div className="max-w-4xl mx-auto px-8 py-2">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 mb-3 uppercase tracking-wider">Technical Skills</h3>
        <Skills skills={cv.skills} />
        <div className="mt-2">
           <Skills skills={cv.softSkills} />
        </div>
      </div>

      {/* PROFESSIONAL EXPERIENCE */}
      <div className="max-w-4xl mx-auto px-8 py-2">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 mb-4 uppercase tracking-wider">Professional Experience</h3>
        <div className="flex flex-col gap-6">
          {cv.workExperience.map((workExperience, index) => (
            <WorkExperience key={index} {...workExperience} />
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      <div className="max-w-4xl mx-auto px-8 py-2 mb-12">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 mb-4 uppercase tracking-wider">Education</h3>
        <div className="flex flex-col gap-4">
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
        <h4 className="font-bold text-gray-900 text-lg">
          {institution} <span className="font-normal text-gray-600">- {location}</span>
        </h4>
        <span className="text-gray-600 font-medium text-sm text-right min-w-fit pl-4">
          {startDate} – {endDate}
        </span>
      </div>
      <p className="italic text-gray-800">{degree}</p>
    </div>
  );
}

function WorkExperience({ company, position, location, startDate, endDate, description }) {
  return (
    <div>
      <div className="flex flex-row justify-between items-baseline w-full mb-1">
        <h4 className="font-bold text-gray-900 text-lg">
          {company} <span className="font-normal text-gray-600">- {location}</span>
        </h4>
        <span className="text-gray-600 font-medium text-sm text-right min-w-fit pl-4">
          {startDate} – {endDate}
        </span>
      </div>
      
      <p className="italic text-gray-800 font-medium mb-2">{position}</p>
      
      <ul className="list-disc ml-5 space-y-1">
        {description.map((item, index) => (
          <li key={index} className="text-gray-700 leading-snug pl-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skills({ skills }) {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(skills).map(([category, skillList]) => (
        <div key={category} className="flex flex-row items-baseline gap-2">
          <span className="font-bold text-gray-900 min-w-fit">{category}:</span>
          <span className="text-gray-800">{skillList.join(", ")}</span>
        </div>
      ))}
    </div>
  );
}

// Remove separate SoftSkills component and use Skills for both to maintain consistency
// ...existing code...