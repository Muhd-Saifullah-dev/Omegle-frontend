'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Loader2, Sparkle, Video } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    transports: ['websocket'],
});
export default function Home() {
    const [status, setStatus] = useState('idle');
    const startChat = async () => {
        socket.emit('start');
        setStatus('waiting');
    };

    useEffect(()=>{
        socket.on("matched",({roomId})=>{
            console.log(roomId)
        })
        return ()=>{socket.off("matched")}
    },[])

    return (
        <>
            <Navbar />
            <main className="relative min-h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2   -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

                <AnimatePresence>
                    {status === 'idle' && (
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
                        >
                            <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                                <Sparkle />
                            </div>
                            <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
                                Incognito
                            </div>
                            <p className="text-zinc-400 max-w-md mb-8 text-sm sm:text-base">
                                Anonymous video conversation with stranger
                                worldwide.No sign-up.No identity.Just pure
                                connection
                            </p>

                            <motion.button
                                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-white to-zinc-200 text-black font-semibold text-lg shadow-xl"
                                whileHover={{ scale: 1.09 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={startChat}
                            >
                                <Video /> Start Anonymous Chat
                            </motion.button>
                        </motion.div>
                    )}



                    {status==="waiting" && 
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{duration:0.7}}
                    className='relative z-10 flex flex-col items-center justify-center min-h-screen gap-6'
                    >
                        <motion.div
                        animate={{rotate:360}}
                        transition={{repeat: Infinity,ease:"linear",duration:1.1}}
                        >
                            <Loader2 size={56}/>
                        </motion.div>
                        <motion.p
                        animate={{opacity:[0.4,1,0.4]}}
                        transition={{repeat:Infinity,ease:"linear",duration:1.1}}
                        className='text-lg sm:text-xl text-zinc-400'
                        >Matching You with someone new...</motion.p>
                    </motion.div>
                    }


                </AnimatePresence>
            </main>
            <Footer />
        </>
    );
}
