import { useState } from "react"
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";


function SearchPage() {
    const [activeTab, setActiveTab] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const { setContentType } = useContentStore();

    const handleTabClick = (tab) => {
        setActiveTab(tab)
        tab === "movie" ? setContentType("movie") : setContentType("tv");
        setResults([]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
            setResults(res.data.content);
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("Nothing found, make sure that you are searching under the right category")
            } else {
                toast.error("An error occurred please try again later");
            }

        }
    }
    console.log("results---------", results)
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="container px-4 py-8 mx-auto">
                <div className="flex mb-4 justify-center gap-3">
                    <button className={`py-2 px-4 rounded  ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("movie")}>Movies</button>
                    <button className={`py-2 px-4 rounded  ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("tv")}>TV Shows</button>
                    <button className={`py-2 px-4 rounded  ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("person")}>Person</button>
                </div>
                <form className="flex items-stretch gap-2 mb-8 max-w-2xl mx-auto" onSubmit={handleSubmit}>
                    <input type="text" className="w-full p-2 bg-gray-800 text-white rounded" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={"search for a " + activeTab} />
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                        <Search className="w-6 h-6" />
                    </button>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((result) => {
                        if (!result.poster_path && !result.profile_path) return null
                        return (
                            <div key={result.id} className="bg-gray-800 p-4 rounded">
                                {
                                    activeTab === "person" ? (
                                        <Link className="flex flex-col items-center">
                                            <img src={ORIGINAL_IMG_BASE_URL + result.profile_path} alt="img"
                                                className="max-h-96 mx-auto rounded" />
                                            <h2 className="mt-2 text-xl font-bold text-center">{result.name}</h2>
                                        </Link>


                                    ) : (


                                        <Link to={`/watch/` + result.id} flex flex-col items-center>
                                            <img src={ORIGINAL_IMG_BASE_URL + result.poster_path} alt="img"
                                                className="max-h-96 mx-auto rounded" />
                                            <h2 className="mt-2 text-xl font-bold text-center">{result?.name? result?.name && result.name.length < 15
                                                ? result.name
                                                : result?.name?.slice(0, 15) + "...." : result?.title && result.title.length < 15
                                                    ? result.title
                                                    : result?.title?.slice(0, 15) + "...." }</h2>
                                        </Link>



                                    )
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchPage
