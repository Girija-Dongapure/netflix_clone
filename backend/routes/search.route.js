import express from "express";
import { searchPerson, searchMovie, searchTv, searchHistory, removeItemFromsearchHistory } from "../controler/search.controler.js";
const router=express.Router();

router.get("/person/:query",searchPerson);
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);

router.get("/history",searchHistory);
router.delete("/history/:id",removeItemFromsearchHistory);

export default router;