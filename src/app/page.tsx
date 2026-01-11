'use client'
import Navbar from '@/components/Navbar';
import { Sparkle } from 'lucide-react';
import {motion} from "motion/react"

export default function Home() {
    return (
        <>
      <Navbar/>
      <main className='relative min-h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white overflow-hidden'>

      <div className='absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl'/>
        <div className='absolute top-1/2   -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl'/>
      <motion.div 
      initial={{}}
      animate={{}}
      transition={{}}
      className='relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center'
      >
        <div className='mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10'>
        <Sparkle/>
          </div>
          <div>
            Icognito
          </div>
      </motion.div>
      
      </main>
        </>
    );
}
