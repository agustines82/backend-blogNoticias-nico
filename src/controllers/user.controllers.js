import UserModel from "../models/userSchema";
import { validationResult } from "express-validator";

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Usuarios no encontrados",
        });
    }
};

export const buscarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioBuscado = await UserModel.findById(id);
        res.status(200).json(usuarioBuscado);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Usuario no encontrado",
        });
    }
};

//le falta bycrytp
export const crearUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array(),
            });
        }
        const savingUser = new UserModel(req.body);
        await savingUser.save();
        res.status(201).json({
            mensaje: "El usuario se creó con exito",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "El usuario no se pudo guardar en la BD",
        });
    }
};

export const modificarUsuarios = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body);
        await UserModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            mensaje: "El usuario se edito con exito",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "Error al editar el usuario",
        });
    }
};

export const eliminarUsuarios = async (req, res) => {
    try {
        const id = req.params.id;
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({
            mensaje: "El usuario fue borrado",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "El usuario no fue borrado",
        });
    }
};
