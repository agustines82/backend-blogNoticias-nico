import { Router } from "express";

const router = Router();

router.route("/news").get((req, res) => {
    res.send("prueba peticion get");
});

export default router;
