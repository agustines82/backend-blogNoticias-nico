import { Router } from "express";
import { getNews, crearNews, verNews, modificarNews, eliminarNews } from "../controllers/news.controllers";
import { check } from "express-validator";

const router = Router();

router.route("/news").get(getNews).post(crearNews);
router.route("/news/:id").get(verNews).put(modificarNews).delete(eliminarNews);

export default router;
