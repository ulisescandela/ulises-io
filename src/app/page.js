// src/app/page.js
import Hero from '@/components/common/hero';
import About from '@/components/common/about';
import Interests from '@/components/common/interests';
import LatestPosts from '@/components/common/latestPosts';
import Header from '@/components/layout/header';

export default function HomePage() {


  return (
    <>
      <Header />
      <main 
        className="pt-16 w-screen text-center text-white font-sans"
        // className='bg-[#020617]'
      >
        <Hero />
        {/* <About /> */}
        {/* <Interests /> */}
        <LatestPosts />
      </main>
    </>
  );
}
