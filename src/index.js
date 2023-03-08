import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./database";

//instanciar express y configurar el puerto:
const app = express();
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
    console.log("Estoy en el puerto " + app.get("port"));
});

//midlewares:
app.use(cors()); //permite conexiones remotas
app.use(express.json()); //permite interpretar formato json
app.use(express.urlencoded({ extends: true })); //permite interpretar formato json
app.use(morgan("dev"));

//rutas
app.get("/prueba", (req, res) => {
    res.send("prueba peticion get");
});
