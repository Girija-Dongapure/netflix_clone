import { fetchTmdb } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export async function searchPerson(req, res) {
    try {
        const { query } = req.params;
        const response = await fetchTmdb(`https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=1`);
        console.log("search person---------------------", response.results);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }


        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                }
            }
        })
        res.status(200).json({ success: true, content: response.results });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}
export async function searchMovie(req, res) {
    try {
        const { query } = req.params;
        const response = await fetchTmdb(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }


        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                }
            }
        })
        res.status(200).json({ success: true, content: response.results });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}
export async function searchTv(req, res) {
    try {
        const { query } = req.params;
        const response = await fetchTmdb(`https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`);
        console.log("search-----------------------", response.results[0]);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }


        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                }
            }
        })
        res.status(200).json({ success: true, content: response.results });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}

export async function searchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}
export async function removeItemFromsearchHistory(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: id,
                }
            }
        })
        res.status(200).json({ success: true, message: "item removed successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}