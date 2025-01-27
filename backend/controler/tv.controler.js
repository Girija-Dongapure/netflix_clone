import { fetchTmdb } from "../services/tmdb.service.js";
export async function getTrendingTv(req, res) {
    try {

        const data = await fetchTmdb("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        console.log(data.results);
        const randomTvShow = data.results[Math.floor(Math.random() * data.results?.length)];
        res.status(200).json({ success: true, content: randomTvShow })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getTvTrailer(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchTmdb(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);//i am not having movie trailer api
        console.log(data.results);
        res.status(200).json({ success: true, trailers: data.results })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchTmdb(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);//i am not having movie details api
        console.log(data);
        res.status(200).json({ success: true, details: data })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchTmdb(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);//i am not having movie details api
        console.log(data.results);
        res.status(200).json({ success: true, similar: data.results })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function getTvByCategory(req, res) {
    const { category } = req.params;//popular,top_rated,upcoming
    try {

        const data = await fetchTmdb(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);//i am not having movie details api
        console.log(data.results);
        res.status(200).json({ success: true, category: data.results })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
