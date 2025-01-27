import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content"
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";


function ContentSlider({ category }) {
    const [content, setContent] = useState([]);
    const [showArrow, setShowArrow] = useState(false)
    const { contentType } = useContentStore();
    const sliderRef = useRef(null);

    const formatedCategory = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formatedContent = contentType === "movie" ? "Movies" : "TV Shows";

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

    useEffect(() => {
        const getContent = async () => {
            const response = await axios.get(`/api/v1/${contentType}/${category}`);
            setContent(response.data.category)
        }
        getContent();
    }, [contentType, category])
  console.log("category content-------------------",content);
    return (
        <div className='text-white relative px-5 md:px-20' onMouseEnter={() => setShowArrow(true)} onMouseLeave={() => setShowArrow(false)}>
            <h2 className="text-2xl font-bold mb-2">
                {formatedCategory} {formatedContent}
            </h2>
            <div className="flex space-x-4  overflow-x-hidden" ref={sliderRef}>
                {
                    content.map((item) => {
                        if(item.backdrop_path===null) return null
                        return (
                            <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                                <div className="rounded-lg overflow-hidden">
                                    <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt="img" className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
                                </div>
                                <p className="mt-2 text-center">{item.title || item.name}</p>
                            </Link>
                        )
                    })
                }
            </div>
            {showArrow && (
                <>
                    <button className="absolute top-28 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-opacity-75 text-white z-10"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button className="absolute top-28 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-opacity-75 text-white z-10"
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>

            )}
        </div>
    )
}

export default ContentSlider
