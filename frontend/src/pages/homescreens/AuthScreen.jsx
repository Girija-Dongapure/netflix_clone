import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AuthScreen() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleFormSibmit = (e) => {
        e.preventDefault();
        navigate("/signup?email=" +email);
    }
    return (

        <div className=' hero-bg relative'>
            {/* {Header section}  */}
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>

                <img src="/netflix-logo.png" alt="logo" className='w-52' />

                <Link to={"/login"} className='text-white bg-red-600 rounded-md py-1 px-2'>Sign In</Link>
            </header>

            {/* hero section */}
            <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited movies, TV shows, and more</h1>
                <p className='text-lg mb-4'>Watch anywhere. Cancel anytime.</p>
                <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>
                <form className='flex flex-col md:flex-row gap-4 w-1/2'onSubmit={handleFormSibmit}>
                    <input type="email" className='w-full px-3 py-3 py-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2' placeholder='you@email.com' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className='bg-red-600 text-lg lg:text-xl px-2 lg:px-5  py-1 md:py-2 rounded flex justify-center items-center text-nowrap'>Get Started
                        <ChevronRight className='size-8  ' />
                    </button>
                </form>

            </div>
            {/* Seperator */}
            <div className='w-full bg-[#232323] h-2' aria-hidden="true" />

            {/* 1st section */}
            <div className='py-10 bg-black text-white'>
                <div className='flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-2'>
                    {/* left side */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-3xl md:text-4xl font-extrabold mb-4'>Enjoy on your Tv</h2>
                        <p className='text-md md:text-lg'>Watch on smart tvs, Platstation, xbox, chromecast, Apple Tv, Blu-ray players, and more.</p>

                    </div>
                    {/* right side */}
                    <div className='flex-1 relative'>
                        <img src="/tv.png" alt="tv logo" className='mt-4 z-20 relative' />
                        <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 ' playsInline autoPlay={true} loop muted>
                            <source src="hero-vid.m4v" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            {/* Seperator */}
            <div className='w-full bg-[#232323] h-2' aria-hidden="true" />
            {/* 2nd section */}
            <div className='py-10 bg-black text-white'>
                <div className='flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-2'>
                    {/* left side */}
                    <div className='flex-1 relative'>
                        <img src="/stranger-things-lg.png" alt="img" className='mt-2' />
                        <div className='flex items-center gap-2 md:p-1.5 absolute bottom-5 w-3/4 lg:w-1/2 h-24 border left-1/2 -translate-x-1/2 border-slate-500 rounded-md bg-black'>
                            <img src="/stranger-things-sm.png" alt="image" className='h-full ' />
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex flex-col gap-0 md:pr-2'>
                                    <span className='text-md  font-semibold'>Stranger Things</span>
                                    <span className='text-xs text-blue-500'>Downolading.....</span>
                                </div>
                                <img src="/download-icon.gif" alt="download" className='h-12' />
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-3xl md:text-4xl font-extrabold mb-4 text-balance'>Download your shows to watch offline</h2>
                        <p className='text-md md:text-lg'>Save your favorites easily and always have something to watch.</p>

                    </div>

                </div>
            </div>
            {/* Seperator */}
            <div className='w-full bg-[#232323] h-2' aria-hidden="true" />
            {/* 3rd section */}
            <div className='py-10 bg-black text-white'>
                <div className='flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-2'>
                    {/* left side */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-3xl md:text-4xl font-extrabold mb-4'>Watch everywhere</h2>
                        <p className='text-md md:text-lg'>Stream unlimited moviesand Tv shows on your phone, tablet, laptop and TV.</p>

                    </div>
                    {/* right side */}
                    <div className='flex-1 relative'>
                        <img src="/device-pile.png" alt="device image" className='mt-4 z-20 relative' />
                        <video className='absolute top-2 left-1/2 -translate-x-1/2  h-4/6 max-w-[63%]' playsInline autoPlay={true} loop muted>
                            <source src="video-devices.m4v" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            {/* Seperator */}
            <div className='w-full bg-[#232323] h-2' aria-hidden="true" />
            {/* 4th section */}
            <div className='py-10 bg-black text-white'>
                <div className='flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl mx-auto px-4 md:px-2'>
                    {/* left side */}
                    <div className='flex-1 '>
                        <img src="/kids.png" alt="img" className='mt-2' />
                    </div>

                    {/* right side */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-3xl md:text-4xl font-extrabold mb-4 text-balance'>Create Profiles for kids</h2>
                        <p className='text-md md:text-lg'>send kids on adventures with their favorite characters in a space made just for them--free with your membership.</p>

                    </div>

                </div>
            </div>

        </div>

    )
}

export default AuthScreen
