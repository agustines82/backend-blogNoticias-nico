import { Router } from "express";

const router = Router();

router.route("/user").get((req, res) => {
    res.send("prueba peticion get");
});

export default router;
