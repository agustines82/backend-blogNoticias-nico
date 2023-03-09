import UserModel from "../models/userSchema";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    try {
        //validar datos con express-validator:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        //verificar email y password:
        const { email, pass } = req.body;
        //verificar email:
        let usuario = await UserModel.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                mensaje: "correo o password invalido - correo",
            });
        }
        //verificar si el password enviado es igual al password encriptado en la BD:
        const passwordValido = bcrypt.compareSync(pass, usuario.pass);
        if (!passwordValido) {
            return res.status(400).json({
                mensaje: "correo o password invalido - password",
            });
        }

        // const token = await generarJWT(usuario._id, usuario.email);
        return res.status(200).json({
            nombre: usuario.name,
            uid: usuario._id,
            mensaje: "El usuario existe",
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "usuario o contraseña invalido",
        });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        //validar datos con express-validator:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array(),
            });
        }

        //verificar si el email ya existe:
        let savingUser = await UserModel.findOne({ email: req.body.email });
        if (savingUser) {
            return res.status(400).json({
                mensaje: "ya existe un usuario con el email enviado",
            });
        }
        savingUser = new UserModel(req.body);

        //encriptar la contraseña:
        const saltos = bcrypt.genSaltSync();
        savingUser.pass = bcrypt.hashSync(req.body.pass, saltos);
        savingUser.repeatPass = bcrypt.hashSync(req.body.pass, saltos);

        //guardar el usuario en la BD:
        await savingUser.save();
        res.status(201).json({
            mensaje: "El usuario se creó con exito",
            usuario: savingUser.name,
            uid: savingUser._id,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "El usuario no se pudo guardar en la BD",
        });
    }
};

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
