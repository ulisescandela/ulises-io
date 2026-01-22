// src/app/page.js
import Hero from '@/components/common/Hero';
import LatestPosts from '@/components/common/LatestPosts';
import Header from '@/components/layout/Header';

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
