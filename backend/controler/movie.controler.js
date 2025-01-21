import { fetchTmdb } from "../services/tmdb.service.js";
export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchTmdb("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        console.log(data.results);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.status(200).json({ success: true, content: randomMovie })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getMovieTrailer(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);//i am not having movie trailer api
        console.log(data.results);
        res.status(200).json({ success: true, trailers: data.results })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        console.log(data);
        res.status(200).json({ success: true, details: data })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getSimilarMovies(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        console.log(data.results);
        res.status(200).json({ success: true, Similar: data.results })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getMoviesByCategory(req, res) {
    const { category } = req.params;//popular,top_rated,upcoming
    try {

        const data = await fetchTmdb(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);//i am not having movie details api
        console.log(data.results);
        res.status(200).json({ success: true, category: data.results })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
