import jwt from "jsonwebtoken";

const generarJWT = (uid, usuario) => {
    return new Promise((resolve, reject) => {
        // los datos
        const payload = { uid, usuario };
        // firmar el token
        jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {
                expiresIn: "2h",
            },
            (err, token) => {
                //si falla el generar el token
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                }
                // si esta bien el token
                resolve(token);
            }
        );
    });
};

export default generarJWT;
