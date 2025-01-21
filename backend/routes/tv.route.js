import express from "express";
import { getSimilarTvs, getTrendingTv, getTvByCategory, getTvDetails, getTvTrailer } from "../controler/tv.controler.js";

const router=express.Router();

router.get("/trending",getTrendingTv);
router.get("/:id/trailer",getTvTrailer);
router.get("/:id/details",getTvDetails);
router.get("/:id/similar",getSimilarTvs);
router.get("/:category",getTvByCategory);

export default router;