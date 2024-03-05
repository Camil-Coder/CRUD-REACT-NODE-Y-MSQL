import express from "express";
import configPuerto from "./configu/configPuerto.js";
import configDb from "./configu/configDb.js";
import myConn from "express-myconnection";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors  from "cors";
import rutaProduct from "./routes/rutaProducto.js";


//instancia con el servidor 
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(myConn(mysql,configDb.mysql,"single"));

app.listen(configPuerto.puerto,()=>{
    console.info(`http://localhost:${configPuerto.puerto}/`);
});

//rutas
app.use("/productos", rutaProduct);