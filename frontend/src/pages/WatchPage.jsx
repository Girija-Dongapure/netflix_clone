import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import formatReleaseDate from '../utils/dateFunctions';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';


function WatchPage() {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [similarContent, setSimilarContent] = useState([])
    const [details, setDetails] = useState([])
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const { contentType } = useContentStore();
    const sliderRef = useRef(null)
    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailer`);
                setTrailers(res.data.trailers);

            } catch (error) {
                if (error.message.includes("404")) {
                    console.log("No TRailers Found");
                    setTrailers([])
                }
            }
        }
        getTrailers();
    }, [contentType, id])
    console.log("trailers---------------------", trailers);
    useEffect(() => {
        const getSimilar = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar);
                setLoading(false);

            } catch (error) {
                if (error.message.includes("404")) {
                    console.log("No TRailers Found");
                    setSimilarContent([])
                }
            }
        }
        getSimilar();
    }, [contentType, id])
    console.log(similarContent);
    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setDetails(res.data.details);

            } catch (error) {
                if (error.message.includes("404")) {
                    console.log("No TRailers Found");
                    setDetails([])
                }
            }
        }
        getDetails();
    }, [contentType, id])
    console.log(details);
    const handlePrev = () => {
        if (currentTrailerIdx > 0) {
            setCurrentTrailerIdx(currentTrailerIdx - 1)
        }

    }
    const handleNext = () => {
        console.log("--------------------", currentTrailerIdx)
        if (currentTrailerIdx < trailers.length - 1) {
            setCurrentTrailerIdx(currentTrailerIdx + 1)
            console.log(currentTrailerIdx)
        }
    }
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
        }
    }
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
        }
    }
    if (loading) return (
        <div className='min-h-screen bg-black p-10'>
            <WatchPageSkeleton />
        </div>
    )
    if (!details) return (
        <div className='bg-black text-white h-screen'>
            <div className='max-w-6xl mx-auto'>
                <Navbar />
                <div className='text-center mx-auto px-4 py-8 h-fullmt-40'>
                    <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Details not found</h2>
                </div>
            </div>
        </div>
    )
    return (
        <div className='bg-black min-h-screen text-white'>
            <div className='mx-auto container px-4 py-8 h-full'>
                <Navbar />
                {trailers.length > 0 &&
                    (<div className='flex justify-between items-center mb-3'>
                        <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : " "}`}
                            disabled={currentTrailerIdx === 0} onClick={handlePrev}>
                            <ChevronLeft size={24} />
                        </button>
                        <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? "cursor-not-allowed opacity-50" : " "}`}
                            disabled={currentTrailerIdx === trailers.length - 1} onClick={handleNext}>
                            <ChevronRight size={24} />
                        </button>
                    </div>)
                }
                <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
                    {trailers.length > 0 &&
                        <ReactPlayer controls={true} width={"100%"} height={"70vh"} className="mx-auto overflow-hidden rounded-lg"
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}

                        />
                    }
                    {trailers?.length == 0 && (
                        <h2 className='text-xl text-center mt-5'>
                            No trailers available for{" "}<span className='font-bold text-red-600'>{details?.name || details?.title}</span>
                        </h2>
                    )}
                </div>

                {/* movie details */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
                    <div className='mb-4 md:mb-0'>
                        <h2 className='text-balance text-5xl font-bold'>{details?.title || details?.name}</h2>
                        <p className='mt-2 text-lg'>
                            {formatReleaseDate(details?.release_date || details?.first_air_date)} |{" "} {details?.adult ? <span className='text-red-600'>18+</span> : <span className='text-green-600'>PG-13</span>}
                        </p>
                        <p className='mt-4 text-lg'>{details?.overview}</p>
                    </div>
                    <img src={ORIGINAL_IMG_BASE_URL + details?.poster_path} alt="img" className='max-h-[600px] rounded-md' />
                </div>

                {/* similar movies/tv shows */}
                {similarContent.length > 0 &&
                    (<div className='mt-12 max-w-5xl mx-auto relative'>
                        <h3 className='text-3xl font-bold mb-4'>Similar Movies/TV Shows</h3>

                        <div className='flex overflow-x-hidden gap-4 pb-4 group' ref={sliderRef}>
                            {similarContent.map((content) => {
                                if (content?.poster_path === null) return null
                                return (
                                    <Link key={content.id} to={`/watch/${content.id}`} className='w-52  flex-none'>
                                        <img src={SMALL_IMG_BASE_URL + content?.poster_path} alt="img" className='w-full h-auto rounded-md' />
                                        <h2 className='mt-2 text-lg text-center'>{content?.title ? content?.title && content.title.length < 15
                                            ? content.title
                                            : content?.title?.slice(0, 15) + "...." : content?.name && content.name.length < 15
                                            ? content.name
                                            : content?.name?.slice(0, 15) + "...."}</h2>
                                    </Link>
                                )
                            })}
                            <button className="absolute top-1/2 -translate-y-1/2  md:left-6 flex items-center justify-center size-8 rounded-full bg-red-500 hover:bg-opacity-75 text-white z-10"
                                onClick={scrollLeft}
                            >
                                <ChevronLeft size={20} className='text-white' />
                            </button>
                            <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-6 flex items-center justify-center size-8 rounded-full bg-red-500 hover:bg-opacity-75 text-white z-10"
                                onClick={scrollRight}
                            >
                                <ChevronRight size={20} className='text-white' />
                            </button>
                        </div>

                    </div>)
                }

            </div>
        </div>
    )
}

export default WatchPage
