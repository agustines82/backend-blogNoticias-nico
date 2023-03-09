import { Router } from "express";
import { listarUsuarios, crearUsuario, buscarUsuario, modificarUsuarios, eliminarUsuarios } from "../controllers/user.controllers";
const router = Router();

router.route("/user").get(listarUsuarios).post(crearUsuario);
router.route("/user/:id").get(buscarUsuario).put(modificarUsuarios).delete(eliminarUsuarios);

export default router;
