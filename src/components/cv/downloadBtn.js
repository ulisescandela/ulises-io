'use client'

import { useState } from 'react';
import { HiDownload } from "react-icons/hi";
import { getPrivateCVData } from '../../app/cv/actions';

export default function DownloadButton({ onUnlock }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const code = prompt("Please enter the download code to unlock private info and print:");
    
    if (!code) return;

    setLoading(true);
    try {
      const result = await getPrivateCVData(code);
      
      if (result.success) {
        if (onUnlock) {
          onUnlock(result.data);
          // Small delay to allow React to render the new data before printing
          setTimeout(() => {
            window.print();
          }, 100);
        } else {
            window.print();
        }
      } else {
        alert("Incorrect code. Access denied.");
      }
    } catch (error) {
      console.error("Error validating code:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={loading}
      className="flex flex-row gap-2 items-center text-white bg-blue-700 font-medium text-sm rounded-xl px-4 py-2.5 shadow-sm hover:shadow-lg hover:bg-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed print:hidden"
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <HiDownload className="w-4 h-4" />
      )}
      <span className="text-sm">Download CV</span>
    </button>
  );
}
